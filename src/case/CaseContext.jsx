import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { CASES, CASE_LIST, DEFAULT_CASE_ID } from '../data/caseRegistry';
import {
  storageKey, initialState, computeXP, xpTotal, rankFor, caseReport,
} from './engine';
import { recordActivity } from '../academyProgress';
import { playChime } from '../soundEngine';

// The Case Engine context: multi-case state (per-case persistence), the active
// case definition, XP (per-case and cumulative), derived artifacts, real-time
// message drip, toast notifications, and case progression gates.

const ACTIVE_KEY = 'pmverse_active_case_v1';
const CaseContext = createContext(null);
export const useCase = () => useContext(CaseContext);

// arrival → investigate → (complication, if the chosen decision has a followUp) → complete
const STAGE_RANK = { arrival: 0, investigate: 1, complication: 2, complete: 3 };

function loadCaseState(caseDef) {
  const base = initialState(caseDef);
  try {
    const raw = localStorage.getItem(storageKey(caseDef.meta.id));
    if (!raw) return base;
    const saved = JSON.parse(raw);
    return {
      ...base,
      ...saved,
      evidence: { ...base.evidence, ...(saved.evidence || {}) },
      chats: { ...base.chats, ...(saved.chats || {}) },
      // Old saves have no stage timestamps: backfill with 0 so nothing is hidden
      stageAt: saved.stageAt || { arrival: 0, investigate: 0, complication: 0, complete: 0 },
    };
  } catch {
    return base;
  }
}

function loadAllStates() {
  return Object.fromEntries(CASE_LIST.map((c) => [c.meta.id, loadCaseState(c)]));
}

export function CaseProvider({ children }) {
  const [caseId, setCaseId] = useState(() => {
    try {
      const saved = localStorage.getItem(ACTIVE_KEY);
      return saved && CASES[saved] ? saved : DEFAULT_CASE_ID;
    } catch { return DEFAULT_CASE_ID; }
  });
  const [states, setStates] = useState(loadAllStates);
  const [now, setNow] = useState(Date.now());
  const [toasts, setToasts] = useState([]);

  const caseDef = CASES[caseId];
  const state = states[caseId];

  // Drip clock — cheap 5s tick so delayed messages surface without interaction
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(t);
  }, []);

  // Persist the active case's state and the active-case pointer
  useEffect(() => {
    try {
      localStorage.setItem(storageKey(caseId), JSON.stringify(states[caseId]));
      localStorage.setItem(ACTIVE_KEY, caseId);
    } catch { /* storage unavailable — play session-only */ }
  }, [states, caseId]);

  const update = (fn) =>
    setStates((all) => ({ ...all, [caseId]: fn(all[caseId]) }));

  // ----- message visibility: stage gate + drip delay + follow-up relevance -----
  const stageReached = (stage) => STAGE_RANK[stage] <= STAGE_RANK[state.stage];
  const dripped = (m) => {
    if (!m.delaySec) return true;
    const enteredAt = state.stageAt?.[m.stage] ?? 0;
    return now - enteredAt >= m.delaySec * 1000;
  };
  const followUpDef = state.decision ? caseDef.decisions[state.decision]?.followUp : null;
  const visibleMessages = caseDef.messages.filter((m) => {
    if (!stageReached(m.stage)) return false;
    if (m.dynamic === 'followup' && !followUpDef) return false;
    return dripped(m);
  });
  const unreadCount = visibleMessages.filter((m) => !state.readIds.includes(m.id)).length;

  const visibleChats = (caseDef.chats || []).filter(
    (c) => stageReached(c.stage) && dripped(c)
  );
  const unreadChatCount = visibleChats.filter((c) => !state.readChats?.includes(c.id)).length;

  // ----- toasts: fire when a message newly becomes visible (drip or stage change) -----
  const pushToast = (toast) => {
    playChime();
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, ...toast }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 7000);
  };
  const dismissToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const prevVisibleRef = useRef(null);
  const visibleIdsKey = visibleMessages.map((m) => m.id).join(',');
  const visibleChatIdsKey = visibleChats.map((c) => c.id).join(',');
  useEffect(() => {
    const prev = prevVisibleRef.current;
    prevVisibleRef.current = {
      caseId,
      ids: visibleMessages.map((m) => m.id),
      chatIds: visibleChats.map((c) => c.id),
    };
    if (!prev || prev.caseId !== caseId) return; // initial mount or case switch: no toasts
    for (const m of visibleMessages.filter((x) => !prev.ids.includes(x.id))) {
      pushToast({ icon: '📥', title: `New mail from ${m.from}`, body: m.subject, appId: 'win-mail' });
    }
    for (const ch of visibleChats.filter((x) => !prev.chatIds.includes(x.id))) {
      pushToast({ icon: '💬', title: `New messages in ${ch.channel}`, body: ch.messages[0]?.text?.slice(0, 70) || '', appId: 'win-chat' });
    }
  }, [visibleIdsKey, visibleChatIdsKey, caseId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ----- XP / rank / artifacts -----
  const xp = computeXP(caseDef, state);
  const caseTotal = xpTotal(xp);
  const totalXP = CASE_LIST.reduce(
    (sum, c) => sum + xpTotal(computeXP(c, states[c.meta.id])), 0
  );
  const rank = rankFor(totalXP);
  const artifacts = CASE_LIST
    .map((c) => caseReport(c, states[c.meta.id]))
    .filter(Boolean);

  // ----- progression gates: case N unlocks when case N-1 is decided.
  // A case you've already started or finished never re-locks (e.g. after
  // replaying an earlier case).
  const unlockedCaseIds = CASE_LIST
    .filter((c, i) =>
      i === 0 ||
      !!states[CASE_LIST[i - 1].meta.id].decision ||
      !!states[c.meta.id].decision ||
      states[c.meta.id].stage !== 'arrival'
    )
    .map((c) => c.meta.id);

  // ----- actions -----
  const switchCase = (id) => {
    if (CASES[id] && unlockedCaseIds.includes(id)) setCaseId(id);
  };

  const acceptCase = () => {
    recordActivity();
    update((s) => (s.stage === 'arrival'
      ? { ...s, stage: 'investigate', stageAt: { ...s.stageAt, investigate: Date.now() } }
      : s));
  };

  const recordEvidence = (key) => {
    update((s) =>
      key in s.evidence && !s.evidence[key]
        ? { ...s, evidence: { ...s.evidence, [key]: true } }
        : s
    );
    recordActivity();
  };

  const addChatMessage = (personaId, message) => {
    update((s) => ({
      ...s,
      chats: { ...s.chats, [personaId]: [...(s.chats[personaId] || []), message] },
    }));
    if (message.role === 'user') recordActivity();
  };

  const setMemo = (text) => update((s) => ({ ...s, memo: text }));

  const setAiCoach = (text) => update((s) => ({ ...s, aiCoach: text }));

  const decide = (decisionId) => {
    recordActivity();
    update((s) => {
      if (s.decision) return s;
      const hasFollowUp = !!caseDef.decisions[decisionId]?.followUp;
      const nextStage = hasFollowUp ? 'complication' : 'complete';
      return {
        ...s, decision: decisionId, stage: nextStage,
        stageAt: { ...s.stageAt, [nextStage]: Date.now() },
      };
    });
  };

  const chooseFollowUp = (optionId) => {
    recordActivity();
    update((s) =>
      s.followUpChoice || s.stage !== 'complication'
        ? s
        : { ...s, followUpChoice: optionId, stage: 'complete', stageAt: { ...s.stageAt, complete: Date.now() } }
    );
  };

  const markRead = (id) =>
    update((s) => (s.readIds.includes(id) ? s : { ...s, readIds: [...s.readIds, id] }));

  const markChatRead = (id) =>
    update((s) => (s.readChats?.includes(id) ? s : { ...s, readChats: [...(s.readChats || []), id] }));

  const resetCase = () => {
    try { localStorage.removeItem(storageKey(caseId)); } catch { /* noop */ }
    setStates((all) => ({ ...all, [caseId]: initialState(caseDef) }));
  };

  const openApp = (appId) =>
    window.dispatchEvent(new CustomEvent('pmverse:open-app', { detail: appId }));

  const value = {
    caseDef, caseId, caseList: CASE_LIST, states, unlockedCaseIds,
    state, visibleMessages, unreadCount, unreadChatCount, visibleChats,
    xp, caseTotal, totalXP, rank, artifacts,
    toasts, dismissToast,
    switchCase, acceptCase, recordEvidence, addChatMessage, setMemo, setAiCoach,
    decide, chooseFollowUp, markRead, markChatRead, resetCase, openApp,
  };

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}
