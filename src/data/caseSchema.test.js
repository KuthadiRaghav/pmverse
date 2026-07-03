import { describe, it, expect } from 'vitest';
import { CASE_LIST, CASES, DEFAULT_CASE_ID } from './caseRegistry';

// Schema validator for every registered case. Cases are convention-held data;
// this test is the convention, written down. A Case 004 that breaks any of
// these rules fails CI instead of failing at runtime.

const VALID_STAGES = ['arrival', 'investigate', 'complication', 'complete'];

describe.each(CASE_LIST.map((c) => [c.meta.id, c]))('case %s', (_id, c) => {
  it('has complete meta', () => {
    for (const field of ['id', 'number', 'title', 'company', 'tagline', 'blurb']) {
      expect(c.meta[field], `meta.${field}`).toBeTruthy();
    }
  });

  it('has complete personas', () => {
    expect(Object.keys(c.personas).length).toBeGreaterThanOrEqual(3);
    for (const [pid, p] of Object.entries(c.personas)) {
      for (const field of ['name', 'role', 'color', 'avatar', 'intro', 'system']) {
        expect(p[field], `personas.${pid}.${field}`).toBeTruthy();
      }
      expect(Array.isArray(p.scripted), `personas.${pid}.scripted`).toBe(true);
      expect(p.fallbacks.length, `personas.${pid}.fallbacks`).toBeGreaterThan(0);
      for (const rule of p.scripted) {
        expect(rule.match, `personas.${pid} scripted rule regex`).toBeInstanceOf(RegExp);
        expect(rule.reply, `personas.${pid} scripted rule reply`).toBeTruthy();
      }
    }
  });

  it('has SQL missions whose evidence ids exist', () => {
    expect(c.sqlSeed).toMatch(/CREATE TABLE/);
    const evidenceIds = c.evidence.map((e) => e.id);
    for (const m of c.sqlMissions) {
      expect(m.match).toBeInstanceOf(RegExp);
      expect(evidenceIds, `mission ${m.id} must be an evidence item`).toContain(m.id);
    }
  });

  it('has well-formed evidence', () => {
    for (const e of c.evidence) {
      expect(e.points).toBeGreaterThan(0);
      expect(e.gathered).toBeTruthy();
      expect(e.missed).toBeTruthy();
    }
  });

  it('has well-formed decisions', () => {
    const ids = Object.keys(c.decisions);
    expect(ids.length).toBeGreaterThanOrEqual(2);
    for (const [did, d] of Object.entries(c.decisions)) {
      for (const field of ['title', 'pitch', 'time', 'backer', 'verdict', 'narrative', 'debrief']) {
        expect(d[field], `decisions.${did}.${field}`).toBeTruthy();
      }
      expect(typeof d.quality).toBe('number');
      expect(['good', 'bad']).toContain(d.verdictTone);
      expect(d.metrics.length).toBeGreaterThan(0);
      for (const row of d.metrics) expect(row.length).toBe(3);
      if (d.followUp) {
        expect(d.followUp.body).toBeTruthy();
        expect(Object.keys(d.followUp.options).length).toBeGreaterThanOrEqual(2);
        for (const [oid, o] of Object.entries(d.followUp.options)) {
          expect(o.title, `followUp.${oid}.title`).toBeTruthy();
          expect(o.note, `followUp.${oid}.note`).toBeTruthy();
          expect(typeof o.xpBonus).toBe('number');
        }
      }
    }
    // Exactly one strongest option per case
    expect(Object.values(c.decisions).filter((d) => d.verdictTone === 'good').length).toBe(1);
  });

  it('has coherent messages', () => {
    const ids = new Set();
    for (const m of c.messages) {
      expect(ids.has(m.id), `duplicate message id ${m.id}`).toBe(false);
      ids.add(m.id);
      expect(VALID_STAGES, `message ${m.id} stage`).toContain(m.stage);
      expect(m.from && m.subject, `message ${m.id} from/subject`).toBeTruthy();
      if (!m.dynamic && !m.decision) expect(m.body, `message ${m.id} body`).toBeTruthy();
      if (m.cta?.type === 'open-app') expect(m.cta.app).toMatch(/^win-/);
    }
    // The engine's dynamic renderers must have their delivery messages
    expect(c.messages.some((m) => m.dynamic === 'outcome')).toBe(true);
    expect(c.messages.some((m) => m.dynamic === 'debrief')).toBe(true);
    expect(c.messages.some((m) => m.decision)).toBe(true);
    // If any decision carries a followUp, a complication-stage message must exist
    if (Object.values(c.decisions).some((d) => d.followUp)) {
      expect(c.messages.some((m) => m.stage === 'complication' && m.dynamic === 'followup')).toBe(true);
    }
  });

  it('has a valid leadership rule and memo rubric', () => {
    expect(Object.keys(c.decisions)).toContain(c.leadership.best);
    expect(Object.keys(c.personas)).toContain(c.leadership.hippo);
    expect(c.decisions[c.leadership.best].verdictTone).toBe('good');
    expect(c.memoRubric.length).toBeGreaterThanOrEqual(3);
    for (const r of c.memoRubric) {
      expect(r.match).toBeInstanceOf(RegExp);
      expect(r.points).toBeGreaterThan(0);
      expect(r.note).toBeTruthy();
    }
  });

  it('has metrics whose projections cover every decision', () => {
    for (const metric of c.metrics) {
      expect(metric.history.length).toBeGreaterThan(3);
      expect(['up', 'down']).toContain(metric.goodDirection);
      for (const did of Object.keys(c.decisions)) {
        expect(metric.projection[did], `metric ${metric.id} missing projection for decision ${did}`).toBeTruthy();
      }
    }
  });

  it('drip delays only appear on post-arrival messages', () => {
    for (const m of c.messages) {
      if (m.delaySec) expect(m.stage).not.toBe('arrival');
    }
  });
});

describe('registry', () => {
  it('ids are unique and the default exists', () => {
    const ids = CASE_LIST.map((c) => c.meta.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(CASES[DEFAULT_CASE_ID]).toBeTruthy();
  });

  it('case numbers are sequential', () => {
    expect(CASE_LIST.map((c) => c.meta.number)).toEqual(
      CASE_LIST.map((_, i) => String(i + 1).padStart(3, '0'))
    );
  });
});
