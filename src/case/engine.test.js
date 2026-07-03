import { describe, it, expect } from 'vitest';
import {
  initialState, computeXP, xpTotal, xpMax, rankFor, gradeMemo,
  caseReport, evidenceAudit, evidenceCoverage, processNote, RANKS, XP_DIMS,
} from './engine';

// Minimal but complete case definition for engine math
const DEF = {
  meta: { id: 'test-case', number: '099', title: 'Test Case', company: 'TestCo', tagline: 'tag', blurb: 'blurb' },
  personas: {
    boss: { name: 'Boss', role: 'CEO', color: '#fff', avatar: 'B', intro: 'hi', system: 's', scripted: [], fallbacks: ['f'] },
    eng: { name: 'Eng', role: 'EM', color: '#fff', avatar: 'E', intro: 'hi', system: 's', scripted: [], fallbacks: ['f'] },
  },
  evidence: [
    { id: 'ev1', points: 40, gathered: 'got ev1', missed: 'missed ev1' },
    { id: 'ev2', points: 60, gathered: 'got ev2', missed: 'missed ev2' },
  ],
  decisions: {
    good: {
      title: 'Good call', pitch: 'p', time: 't', backer: 'b', quality: 100,
      verdictTone: 'good', verdict: 'v', metrics: [['m', '1', 'd']], narrative: 'n', debrief: 'db',
      followUp: {
        body: 'complication',
        options: {
          wise: { title: 'Wise', pitch: 'p', xpBonus: 15, note: 'n' },
          panic: { title: 'Panic', pitch: 'p', xpBonus: -10, note: 'n' },
        },
      },
    },
    bad: {
      title: 'Bad call', pitch: 'p', time: 't', backer: 'b', quality: 25,
      verdictTone: 'bad', verdict: 'v', metrics: [['m', '1', 'd']], narrative: 'n', debrief: 'db',
    },
  },
  messages: [{ id: 'm1', stage: 'arrival', from: 'Boss', role: 'CEO', color: '#fff', avatar: 'B', subject: 's', body: 'b' }],
  leadership: { best: 'good', hippo: 'boss', full: 60, partial: 30, other: 10 },
  memoRubric: [
    { match: /root cause/i, points: 50, note: 'names root cause' },
    { match: /tradeoff/i, points: 50, note: 'names tradeoffs' },
  ],
  metrics: [],
};

function playedState(overrides = {}) {
  const s = initialState(DEF);
  return { ...s, ...overrides };
}

describe('initialState', () => {
  it('builds evidence and chat maps from the case def, plus the interviewer', () => {
    const s = initialState(DEF);
    expect(s.evidence).toEqual({ ev1: false, ev2: false });
    expect(Object.keys(s.chats).sort()).toEqual(['boss', 'eng', 'interviewer']);
    expect(s.stage).toBe('arrival');
    expect(s.stageAt.arrival).toBeGreaterThan(0);
  });
});

describe('computeXP', () => {
  it('scores a full playthrough correctly', () => {
    const chats = {
      boss: [{ role: 'user', content: 'q1' }, { role: 'user', content: 'q2' }],
      eng: [{ role: 'user', content: 'q1' }, { role: 'user', content: 'q2' }],
      interviewer: [{ role: 'user', content: 'should not count' }],
    };
    const s = playedState({ chats, evidence: { ev1: true, ev2: true }, decision: 'good' });
    const xp = computeXP(DEF, s);
    expect(xp.Discovery).toBe(40);       // 2 personas × 20
    expect(xp.Analytics).toBe(100);      // 40 + 60
    expect(xp.Strategy).toBe(100);       // quality, no follow-up chosen yet
    expect(xp.Leadership).toBe(60);      // best decision + hippo interviewed
    expect(xp.Communication).toBe(20);   // 4 user messages × 5 (interviewer excluded)
    expect(xpTotal(xp)).toBe(320);
  });

  it('applies follow-up bonuses and penalties to Strategy', () => {
    const base = playedState({ decision: 'good' });
    expect(computeXP(DEF, { ...base, followUpChoice: 'wise' }).Strategy).toBe(115);
    expect(computeXP(DEF, { ...base, followUpChoice: 'panic' }).Strategy).toBe(90);
  });

  it('gives partial leadership for the best decision without confronting the hippo', () => {
    const s = playedState({ decision: 'good' });
    expect(computeXP(DEF, s).Leadership).toBe(30);
  });

  it('xpMax accounts for the largest follow-up bonus', () => {
    expect(xpMax(DEF).Strategy).toBe(115);
    expect(xpMax(DEF).Analytics).toBe(100);
  });
});

describe('rankFor', () => {
  it('maps totals onto the ladder', () => {
    expect(rankFor(0)).toBe('Associate PM');
    expect(rankFor(139)).toBe('Associate PM');
    expect(rankFor(140)).toBe('Product Manager');
    expect(rankFor(280)).toBe('Senior PM');
    expect(rankFor(420)).toBe('Group PM');
    expect(rankFor(560)).toBe('VP of Product');
  });

  it('ladder is sorted descending by threshold', () => {
    const mins = RANKS.map(([m]) => m);
    expect([...mins].sort((a, b) => b - a)).toEqual(mins);
  });
});

describe('gradeMemo', () => {
  it('returns null for an empty memo', () => {
    expect(gradeMemo(DEF, playedState())).toBeNull();
  });

  it('grades against the rubric', () => {
    const a = gradeMemo(DEF, playedState({ memo: 'The root cause is X and the tradeoff is Y.' }));
    expect(a.grade).toBe('A');
    expect(a.points).toBe(100);
    const c = gradeMemo(DEF, playedState({ memo: 'The root cause is X.' }));
    expect(c.points).toBe(50);
    expect(c.misses).toContain('names tradeoffs');
  });
});

describe('evidence coverage and process notes', () => {
  it('computes coverage over personas + evidence', () => {
    const s = playedState({
      chats: { boss: [{ role: 'user', content: 'a' }, { role: 'user', content: 'b' }], eng: [], interviewer: [] },
      evidence: { ev1: true, ev2: false },
    });
    expect(evidenceCoverage(DEF, s)).toBeCloseTo(0.5); // 1 of 2 personas + 1 of 2 evidence
  });

  it('writes a process note only at the extremes', () => {
    const thorough = playedState({
      decision: 'good',
      chats: {
        boss: [{ role: 'user', content: 'a' }, { role: 'user', content: 'b' }],
        eng: [{ role: 'user', content: 'a' }, { role: 'user', content: 'b' }],
        interviewer: [],
      },
      evidence: { ev1: true, ev2: true },
    });
    expect(processNote(DEF, thorough)).toMatch(/evidence trail/i);
    const blind = playedState({ decision: 'bad' });
    expect(processNote(DEF, blind)).toMatch(/instinct/i);
  });
});

describe('caseReport', () => {
  it('is null before a decision and complete after', () => {
    expect(caseReport(DEF, playedState())).toBeNull();
    const report = caseReport(DEF, playedState({ decision: 'good', memo: 'root cause and tradeoff' }));
    expect(report.markdown).toContain('# Case Report — Test Case');
    expect(report.markdown).toContain('Coach grade: A');
    expect(report.filename).toBe('case-099-report.md');
  });
});

describe('evidenceAudit', () => {
  it('splits gathered vs missed', () => {
    const s = playedState({ evidence: { ev1: true, ev2: false } });
    const audit = evidenceAudit(DEF, s);
    expect(audit.gathered).toContain('got ev1');
    expect(audit.missed).toContain('missed ev2');
    expect(audit.gathered.length + audit.missed.length).toBe(4); // 2 personas + 2 evidence
  });
});

describe('XP_DIMS', () => {
  it('stays stable — UI and reports render these five', () => {
    expect(XP_DIMS).toEqual(['Discovery', 'Analytics', 'Strategy', 'Leadership', 'Communication']);
  });
});
