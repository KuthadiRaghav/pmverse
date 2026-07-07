// Case Engine core: case-agnostic scoring, grading, and artifact generation.
// A case definition supplies: meta, personas, evidence[], decisions, messages,
// sqlSeed, sqlMissions, leadership rule, memoRubric, metrics. The engine turns
// (caseDef, state) into XP, grades, audits, and portfolio artifacts.

export const XP_DIMS = ['Discovery', 'Analytics', 'Strategy', 'Leadership', 'Communication'];

// Cumulative across all cases (each case maxes ~400)
export const RANKS = [
  [700, 'Nova'],
  [560, 'VP of Product'],
  [420, 'Group PM'],
  [280, 'Senior PM'],
  [140, 'Product Manager'],
  [0, 'Associate PM'],
];

export function storageKey(caseId) {
  return `pmverse_case_${caseId.replace(/-/g, '_')}_v1`;
}

export function initialState(caseDef) {
  return {
    stage: 'arrival',
    decision: null,
    memo: '',
    evidence: Object.fromEntries(caseDef.evidence.map((e) => [e.id, false])),
    chats: Object.fromEntries([...Object.keys(caseDef.personas), 'interviewer'].map((id) => [id, []])),
    readIds: [],
    readChats: [],
    replies: {},
    channelPosts: {},
    // Wall-clock timestamps per stage entry — drives real-time message drip
    stageAt: { arrival: Date.now() },
  };
}

export function interviewedIds(caseDef, state) {
  return Object.keys(caseDef.personas).filter(
    (id) => (state.chats[id] || []).filter((m) => m.role === 'user').length >= 2
  );
}

export function computeXP(caseDef, state) {
  const interviewed = interviewedIds(caseDef, state);
  const questions = Object.entries(state.chats)
    .filter(([id]) => id !== 'interviewer')
    .reduce((n, [, msgs]) => n + msgs.filter((m) => m.role === 'user').length, 0);
  const analytics = caseDef.evidence.reduce(
    (sum, e) => sum + (state.evidence[e.id] ? e.points : 0), 0
  );
  const d = state.decision ? caseDef.decisions[state.decision] : null;
  const L = caseDef.leadership;
  let leadership = 0;
  if (state.decision) {
    leadership = state.decision === L.best
      ? (interviewed.includes(L.hippo) ? L.full : L.partial)
      : L.other;
  }
  // Follow-up complications (multi-decision arcs) adjust Strategy
  let followUpBonus = 0;
  if (d?.followUp && state.followUpChoice) {
    followUpBonus = d.followUp.options[state.followUpChoice]?.xpBonus || 0;
  }
  return {
    Discovery: Math.min(interviewed.length, 4) * 20,
    Analytics: analytics,
    Strategy: d ? Math.max(0, d.quality + followUpBonus) : 0,
    Leadership: leadership,
    Communication: Math.min(questions * 5, 60),
  };
}

// How thoroughly did the player investigate before deciding? 0..1
export function evidenceCoverage(caseDef, state) {
  const interviewed = interviewedIds(caseDef, state).length;
  const personaCount = Object.keys(caseDef.personas).length;
  const evidenceHits = caseDef.evidence.filter((e) => state.evidence[e.id]).length;
  const total = personaCount + caseDef.evidence.length;
  return total ? (interviewed + evidenceHits) / total : 0;
}

// Outcome paragraph reflecting process quality, not just the decision
export function processNote(caseDef, state) {
  const cov = evidenceCoverage(caseDef, state);
  const good = caseDef.decisions[state.decision]?.verdictTone === 'good';
  if (cov >= 0.8) {
    return good
      ? 'Because you walked in with the full evidence trail — the data, the interviews, the timeline — the rollout met almost no internal resistance. People argue with opinions; they rarely argue with receipts.'
      : 'The strange part: you had gathered most of the evidence, and it pointed elsewhere. The investigation was strong; the conclusion ignored it. That gap between what you knew and what you chose is the thing to sit with.';
  }
  if (cov <= 0.4) {
    return good
      ? 'You got the right answer on thin evidence — instinct carried you this time. Worth noticing: with so little gathered, this outcome was closer to a coin flip than it felt. The next case may not be so forgiving.'
      : 'You decided early, on instinct, with most of the evidence still ungathered. The answer was sitting in the data and in conversations you never had — which is exactly how confident wrong calls usually happen.';
  }
  return null; // middling coverage: no note
}

export function xpTotal(xp) {
  return XP_DIMS.reduce((a, k) => a + xp[k], 0);
}

export function rankFor(total) {
  return RANKS.find(([min]) => total >= min)[1];
}

export function xpMax(caseDef) {
  const maxFollowUp = Math.max(0, ...Object.values(caseDef.decisions).map((d) =>
    d.followUp ? Math.max(...Object.values(d.followUp.options).map((o) => o.xpBonus || 0)) : 0
  ));
  return {
    Discovery: 80,
    Analytics: caseDef.evidence.reduce((s, e) => s + e.points, 0),
    Strategy: 100 + maxFollowUp,
    Leadership: caseDef.leadership.full,
    Communication: 60,
  };
}

export function evidenceAudit(caseDef, state) {
  const interviewed = interviewedIds(caseDef, state);
  const gathered = [];
  const missed = [];
  for (const [id, p] of Object.entries(caseDef.personas)) {
    (interviewed.includes(id) ? gathered : missed).push(
      interviewed.includes(id)
        ? `Interviewed ${p.name} (${p.role})`
        : `Never really interviewed ${p.name} (${p.role})`
    );
  }
  for (const e of caseDef.evidence) {
    (state.evidence[e.id] ? gathered : missed).push(state.evidence[e.id] ? e.gathered : e.missed);
  }
  return { gathered, missed };
}

// ---------------------------------------------------------------------------
// Decision memo grading — rubric-based, evidence-aware
// ---------------------------------------------------------------------------
export function gradeMemo(caseDef, state) {
  const memo = (state.memo || '').trim();
  if (!memo) return null;
  const hits = [];
  const misses = [];
  let points = 0;
  for (const rule of caseDef.memoRubric) {
    if (rule.match.test(memo)) { points += rule.points; hits.push(rule.note); }
    else misses.push(rule.note);
  }
  const max = caseDef.memoRubric.reduce((s, r) => s + r.points, 0);
  const pct = points / max;
  const grade = pct >= 0.8 ? 'A' : pct >= 0.6 ? 'B' : pct >= 0.4 ? 'C' : 'D';
  return { grade, points, max, hits, misses };
}

// ---------------------------------------------------------------------------
// Reply grading — a case-independent communication rubric. Teaches the PM
// craft of the professional email: acknowledge, commit, be concrete, be brief.
// ---------------------------------------------------------------------------
export function gradeReply(text) {
  const raw = (text || '').trim();
  if (!raw) return null;
  const words = raw.split(/\s+/).length;
  const lower = raw.toLowerCase();
  const checks = [
    { ok: /\b(thanks|thank you|understood|got it|appreciate|noted|clear)\b/i.test(raw), label: 'Acknowledges the sender' },
    { ok: /\b(i'?ll|i will|plan to|next|first|start|by (end of|eod|friday|monday|tomorrow|the)|within|timeline|update you|report back)\b/i.test(lower), label: 'Commits to a concrete next step or timeline' },
    { ok: /\b(data|interview|dev|sara|maya|priya|kayla|raj|tom|elena|diane|marisol|marcus|checkout|retrieval|inventory|root cause|evidence|investigate|diagnos)\w*/i.test(lower), label: 'References something specific to the situation' },
    { ok: words >= 18 && words <= 130, label: 'Right length — substantive but not a wall of text' },
    { ok: !/[A-Z]{6,}/.test(raw) && !/!!!/.test(raw), label: 'Professional tone (no shouting)' },
  ];
  const points = checks.filter((c) => c.ok).length;
  const max = checks.length;
  const grade = points >= 5 ? 'A' : points >= 4 ? 'B' : points >= 3 ? 'C' : 'D';
  return { grade, points, max, checks };
}

// ---------------------------------------------------------------------------
// Artifact generation — derived from state, no separate storage needed
// ---------------------------------------------------------------------------
export function caseReport(caseDef, state) {
  if (!state.decision) return null;
  const d = caseDef.decisions[state.decision];
  const xp = computeXP(caseDef, state);
  const audit = evidenceAudit(caseDef, state);
  const memoGrade = gradeMemo(caseDef, state);
  const lines = [
    `# Case Report — ${caseDef.meta.title}`,
    ``,
    `**Company:** ${caseDef.meta.company} (${caseDef.meta.tagline})`,
    `**Role:** Product Manager  ·  **Case:** ${caseDef.meta.number}`,
    ``,
    `## Situation`,
    caseDef.meta.blurb,
    ``,
    `## Decision`,
    `**${d.title}** — ${d.pitch}`,
    ``,
    `## Outcome (8 weeks later)`,
    ...d.metrics.map(([label, value, delta]) => `- **${label}:** ${value} (${delta})`),
    ``,
    d.narrative.replace(/\*\*/g, '**'),
    ``,
    `## Evidence trail`,
    ...audit.gathered.map((g) => `- ✓ ${g}`),
    ...audit.missed.map((m) => `- ✗ ${m}`),
  ];
  if (state.memo) {
    lines.push('', '## Decision memo (written before committing)', state.memo);
    if (memoGrade) {
      lines.push('', `**Coach grade: ${memoGrade.grade}** (${memoGrade.points}/${memoGrade.max} rubric points)`);
    }
  }
  const replies = Object.entries(state.replies || {});
  if (replies.length) {
    lines.push('', '## Stakeholder replies');
    for (const [mid, text] of replies) {
      const g = gradeReply(text);
      lines.push('', `> ${text}`, `*Communication grade: ${g.grade} (${g.points}/${g.max})*`);
    }
  }
  lines.push(
    '', '## Performance',
    ...XP_DIMS.map((k) => `- ${k}: ${xp[k]} XP`),
    `- **Total: ${xpTotal(xp)} / 400 XP**`
  );
  return {
    id: `report-${caseDef.meta.id}`,
    type: 'Case Report',
    title: `${caseDef.meta.title} — Case Report`,
    filename: `case-${caseDef.meta.number}-report.md`,
    markdown: lines.join('\n'),
  };
}

// ---------------------------------------------------------------------------
// Achievement badges — derived from play history across all cases + academy.
// ---------------------------------------------------------------------------
export function computeBadges(caseList, states, academy = {}) {
  const decided = caseList.filter((c) => states[c.meta.id]?.decision);
  const bestCalls = decided.filter((c) => caseList.find((x) => x.meta.id === c.meta.id) && states[c.meta.id].decision === c.leadership.best);
  const fullSweeps = decided.filter((c) => evidenceCoverage(c, states[c.meta.id]) >= 0.85);
  const memoA = decided.filter((c) => { const g = gradeMemo(c, states[c.meta.id]); return g && g.grade === 'A'; });
  const hippoWins = decided.filter((c) => states[c.meta.id].decision === c.leadership.best && interviewedIds(c, states[c.meta.id]).includes(c.leadership.hippo));
  const anyReply = caseList.some((c) => Object.keys(states[c.meta.id]?.replies || {}).length);
  const sprintA = Object.values(academy.sprints || {}).some((s) => s.grade === 'A');

  const defs = [
    { id: 'first-case', icon: '🎬', name: 'First Case Closed', desc: 'Complete your first case', earned: decided.length >= 1 },
    { id: 'root-cause', icon: '🔍', name: 'Root-Cause Finder', desc: 'Pick the best call on a case', earned: bestCalls.length >= 1 },
    { id: 'hippo', icon: '🦛', name: 'Resisted the HiPPO', desc: 'Beat the CEO\'s pet idea with evidence', earned: hippoWins.length >= 1 },
    { id: 'thorough', icon: '🧭', name: 'Did the Work', desc: 'Gather 85%+ of the evidence before deciding', earned: fullSweeps.length >= 1 },
    { id: 'writer', icon: '✍️', name: 'Clear Communicator', desc: 'Earn an A on a decision memo', earned: memoA.length >= 1 },
    { id: 'replied', icon: '📮', name: 'Inbox Zero Hero', desc: 'Reply to a stakeholder email', earned: anyReply },
    { id: 'analyst', icon: '📊', name: 'Data-Driven', desc: 'Complete a Design Sprint with an A', earned: sprintA },
    { id: 'streak-3', icon: '🔥', name: 'On a Roll', desc: 'Reach a 3-day streak', earned: (academy.streak || 0) >= 3 },
    { id: 'trilogy', icon: '🏆', name: 'The Trilogy', desc: 'Complete all three cases', earned: decided.length >= 3 },
    { id: 'flawless', icon: '💎', name: 'Flawless Run', desc: 'Best call + full evidence + A memo on one case', earned: decided.some((c) => { const s = states[c.meta.id]; const g = gradeMemo(c, s); return s.decision === c.leadership.best && evidenceCoverage(c, s) >= 0.85 && g && g.grade === 'A'; }) },
  ];
  return defs;
}

// ---------------------------------------------------------------------------
// Global Company Health — derived from decisions across all cases
// ---------------------------------------------------------------------------
export function computeCompanyHealth(caseList, states) {
  let history = [{ week: 0, dau: 100000, nps: 45, mrr: 500000, label: 'Start' }];
  let current = { dau: 100000, nps: 45, mrr: 500000 };
  let week = 0;

  for (const c of caseList) {
    const s = states[c.meta.id];
    if (s && s.decision) {
      week += 8; // Each case represents an 8-week cycle
      const d = c.decisions[s.decision];
      const quality = d.quality; // 0 to 100
      let followUpBonus = 0;
      if (d.followUp && s.followUpChoice) {
        followUpBonus = d.followUp.options[s.followUpChoice]?.xpBonus || 0;
      }
      const totalQuality = quality + followUpBonus;
      
      const dauDelta = (totalQuality - 60) * 1500;
      const npsDelta = (totalQuality - 60) / 4;
      const mrrDelta = (totalQuality - 60) * 6000;

      current = {
        dau: Math.round(Math.max(0, current.dau + dauDelta)),
        nps: Math.round(Math.max(-100, Math.min(100, current.nps + npsDelta))),
        mrr: Math.round(Math.max(0, current.mrr + mrrDelta)),
      };

      history.push({ 
        week, 
        dau: current.dau, 
        nps: current.nps, 
        mrr: current.mrr, 
        label: `Case ${c.meta.number}: ${d.title.substring(0, 25)}...` 
      });
    }
  }
  return { current, history };
}

// ---------------------------------------------------------------------------
// Global interviewer persona (Interview Mode in the Decision Center)
// ---------------------------------------------------------------------------
export const INTERVIEWER = {
  name: 'Sam Chen', role: 'Hiring Manager · Interview Mode', color: '#6366f1', avatar: 'SC',
  noXp: true,
  intro: "Thanks for making time — I'm Sam, hiring for a Senior PM role. This is practice: I'll ask real interview questions, you answer as you would in the room. Ready when you are.",
  system: `You are Sam Chen, a rigorous but fair hiring manager conducting a product management interview. Ask ONE question at a time drawn from: product sense (improve/design a product), execution (metrics, tradeoffs, debugging a metric drop), behavioral (conflict, failure, influence), and strategy. After each candidate answer, give one sentence of sharp, specific feedback (what was strong, what was missing — e.g. no structure, no metrics, jumped to solutions), then ask the next question or a probing follow-up. Never answer for the candidate. 2-4 sentences per turn. Never mention being an AI.`,
  scripted: [
    { match: /ready|start|yes|begin|hi|hello/i, reply: "Let's start with product sense: pick a product you use daily and tell me one thing you'd improve, who it's for, and how you'd measure success." },
    { match: /metric|dau|retention|revenue|measure|kpi/i, reply: "Good that you're quantifying. Follow-up: your chosen metric moves up 10% but a counter-metric drops — support tickets spike. Walk me through how you'd investigate before celebrating." },
    { match: /user|customer|persona|segment/i, reply: "You're anchoring on the user — good instinct. Now the execution test: your top feature just launched and adoption is 4% after two weeks against a 20% target. What are your first three moves?" },
    { match: /conflict|disagree|stakeholder|push ?back|ceo|exec/i, reply: "Tell me about a real time you disagreed with someone senior about product direction. What did you do, and what happened? I'm listening for evidence over deference." },
    { match: /fail|mistake|wrong|learn/i, reply: "Appreciate the honesty — strong candidates own failures with specifics. Next: how would you decide between two roadmap bets when the data supports both? Walk me through your framework." },
  ],
  fallbacks: [
    "Let me probe: can you make that answer more concrete — a specific user, a specific metric, a specific tradeoff?",
    "Decent structure. Now compress it: give me the 30-second version a distracted executive would remember.",
    "Here's a harder one: you have 4 engineers and 6 weeks, and three stakeholders each insist their feature is critical. How do you decide — and how do you deliver the two 'no's?",
  ],
};
