// Case Engine core: case-agnostic scoring, grading, and artifact generation.
// A case definition supplies: meta, personas, evidence[], decisions, messages,
// sqlSeed, sqlMissions, leadership rule, memoRubric, metrics. The engine turns
// (caseDef, state) into XP, grades, audits, and portfolio artifacts.

export const XP_DIMS = ['Discovery', 'Analytics', 'Strategy', 'Leadership', 'Communication'];

// Cumulative across all cases (each case maxes ~400)
export const RANKS = [
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
