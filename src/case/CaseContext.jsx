import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { CASES, CASE_LIST, DEFAULT_CASE_ID } from '../data/caseRegistry';
import {
  storageKey, initialState, computeXP, xpTotal, rankFor, caseReport, computeCompanyHealth
} from './engine';
import { recordActivity } from '../academyProgress';
import { playChime } from '../soundEngine';
import { useAuth } from '../auth/AuthContext';
import { useMemo } from 'react';
import { db } from '../firebase';

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
  const { currentUser } = useAuth();
  const playerName = currentUser?.displayName?.split(' ')[0] || 'Alex';
  const evaluateId = new URLSearchParams(window.location.search).get('evaluate');

  const [customCaseDef, setCustomCaseDef] = useState(null);
  const [states, setStates] = useState(loadAllStates);

  useEffect(() => {
    if (!evaluateId) return;
    async function loadCustom() {
      try {
        const { getDoc, doc } = await import('firebase/firestore');
        const snap = await getDoc(doc(db, 'customCases', evaluateId));
        if (snap.exists()) {
          const def = snap.data();
          setCustomCaseDef(def);
          setStates(prev => ({ ...prev, [def.meta.id]: initialState(def) }));
        }
      } catch (err) {
        console.error("Failed to load custom case", err);
      }
    }
    loadCustom();
  }, [evaluateId]);

  const { transformedCaseList, transformedCases } = useMemo(() => {
    function replaceNameDeep(obj) {
      if (typeof obj === 'string') {
        return obj.replace(/\bAlex( Morgan)?\b/g, (match) => {
          if (match === 'Alex Morgan') return currentUser?.displayName || 'Alex Morgan';
          return playerName;
        });
      }
      if (Array.isArray(obj)) {
        return obj.map(item => replaceNameDeep(item));
      }
      if (obj !== null && typeof obj === 'object') {
        const newObj = {};
        for (const key in obj) {
          if (typeof obj[key] === 'function') {
            newObj[key] = obj[key];
          } else {
            newObj[key] = replaceNameDeep(obj[key]);
          }
        }
        return newObj;
      }
      return obj;
    }
    const tList = CASE_LIST.map(c => replaceNameDeep(c));
    if (customCaseDef) {
      tList.push(replaceNameDeep(customCaseDef));
    }
    const tCases = Object.fromEntries(tList.map(c => [c.meta.id, c]));
    return { transformedCaseList: tList, transformedCases: tCases };
  }, [playerName, currentUser?.displayName, customCaseDef]);

  const [caseId, setCaseId] = useState(() => {
    if (evaluateId) return evaluateId;
    try {
      const saved = localStorage.getItem(ACTIVE_KEY);
      return saved && CASES[saved] ? saved : DEFAULT_CASE_ID;
    } catch { return DEFAULT_CASE_ID; }
  });

  useEffect(() => {
    if (evaluateId && customCaseDef && caseId !== evaluateId) {
      setCaseId(evaluateId);
    }
  }, [evaluateId, customCaseDef, caseId]);
  const [now, setNow] = useState(Date.now());
  const [toasts, setToasts] = useState([]);

  const caseDef = transformedCases[caseId] || transformedCases[DEFAULT_CASE_ID];
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
  const totalXP = transformedCaseList.reduce(
    (sum, c) => sum + xpTotal(computeXP(c, states[c.meta.id])), 0
  );
  const rank = rankFor(totalXP);
  const artifacts = transformedCaseList
    .map((c) => caseReport(c, states[c.meta.id]))
    .filter(Boolean);

  const companyHealth = computeCompanyHealth(transformedCaseList, states);

  // ----- Leaderboard Sync -----
  useEffect(() => {
    const syncLeaderboard = async () => {
      if (!currentUser || currentUser.uid === 'mock-uid' || !db) return;
      try {
        let total = 0;
        const dims = { Discovery: 0, Analytics: 0, Strategy: 0, Leadership: 0, Communication: 0 };
        transformedCaseList.forEach(c => {
          const st = states[c.meta.id];
          // We only sync XP for cases that are 'complete'
          if (st && st.stage === 'complete') {
            const caseXP = computeXP(c, st);
            total += xpTotal(caseXP);
            Object.keys(dims).forEach(k => {
              if (caseXP[k]) dims[k] += caseXP[k];
            });
          }
        });
        
        const { doc, setDoc, serverTimestamp } = await import('firebase/firestore');
        if (evaluateId) {
          await setDoc(doc(db, 'candidateSessions', `${currentUser.uid}_${evaluateId}`), {
            uid: currentUser.uid,
            displayName: currentUser.displayName || playerName,
            totalXP: total,
            dimensions: dims,
            caseId: evaluateId,
            updatedAt: serverTimestamp()
          }, { merge: true });
        } else {
          await setDoc(doc(db, 'users', currentUser.uid), {
            displayName: currentUser.displayName || playerName,
            totalXP: total,
            dimensions: dims,
            updatedAt: serverTimestamp()
          }, { merge: true });
        }
      } catch (e) {
        console.error("Leaderboard sync failed", e);
      }
    };
    
    // Debounce the sync
    const t = setTimeout(syncLeaderboard, 3000);
    return () => clearTimeout(t);
  }, [totalXP, currentUser, playerName, transformedCaseList, states]);

  // ----- progression gates: case N unlocks when case N-1 is decided.
  // A case you've already started or finished never re-locks (e.g. after
  // replaying an earlier case).
  const unlockedCaseIds = transformedCaseList
    .filter((c, i) =>
      i === 0 ||
      !!states[transformedCaseList[i - 1].meta.id].decision ||
      !!states[c.meta.id].decision ||
      states[c.meta.id].stage !== 'arrival'
    )
    .map((c) => c.meta.id);

  // ----- actions -----
  const switchCase = (id) => {
    if (transformedCases[id] && unlockedCaseIds.includes(id)) setCaseId(id);
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

  const addDynamicXP = (personaId, xp) => {
    update((s) => ({
      ...s,
      dynamicXP: { 
        ...(s.dynamicXP || {}), 
        [personaId]: Math.min(20, Math.max(-20, (s.dynamicXP?.[personaId] || 0) + xp))
      },
    }));
  };

  const setMemo = (text) => update((s) => ({ ...s, memo: text }));

  const setAiCoach = (text) => update((s) => ({ ...s, aiCoach: text }));

  const saveReply = (messageId, text) => {
    recordActivity();
    update((s) => ({ ...s, replies: { ...(s.replies || {}), [messageId]: text } }));
  };

  const addChannelPost = (channelId, message) => {
    if (message.role === 'user') recordActivity();
    update((s) => ({
      ...s,
      channelPosts: { ...(s.channelPosts || {}), [channelId]: [...(s.channelPosts?.[channelId] || []), message] },
    }));
  };

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
    caseDef, caseId, caseList: transformedCaseList, states, unlockedCaseIds,
    state, visibleMessages, unreadCount, unreadChatCount, visibleChats,
    xp, caseTotal, totalXP, rank, artifacts, companyHealth,
    toasts, dismissToast,
    switchCase, acceptCase, recordEvidence, addChatMessage, addDynamicXP, setMemo, setAiCoach, saveReply, addChannelPost,
    decide, chooseFollowUp, markRead, markChatRead, resetCase, openApp,
  };

  return <CaseContext.Provider value={value}>{children}</CaseContext.Provider>;
}

