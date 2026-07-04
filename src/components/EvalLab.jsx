import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useTheme } from '../ThemeContext';
import { useTokens } from '../theme';

// Eval Lab — hands-on evals for PMs. The player writes a grader function and
// runs it against a labelled dataset of AI outputs, seeing precision/recall
// exactly like a real eval harness. This is the AI-PM curriculum made runnable.

// Labelled dataset: a support bot's answers. shouldFlag = it hallucinated a
// policy/number not grounded in the allowed facts.
const ALLOWED_FACTS = `Allowed facts the bot may state:
- Standard return window is 30 days.
- Refunds go to the original payment method in 5-7 business days.
- Free shipping over $50.
- Support hours are 9am-6pm ET.`;

const SAMPLES = [
  { id: 1, q: 'How long do I have to return this?', a: 'You have 30 days from delivery to return your order.', shouldFlag: false },
  { id: 2, q: 'Can I get a refund?', a: 'Absolutely! We offer a lifetime money-back guarantee, no questions asked.', shouldFlag: true },
  { id: 3, q: 'When will my refund arrive?', a: 'Refunds are issued to your original payment method within 5-7 business days.', shouldFlag: false },
  { id: 4, q: 'Do you price match competitors?', a: 'Yes — we match any competitor price and give you an extra 20% off.', shouldFlag: true },
  { id: 5, q: 'Is shipping free?', a: 'Shipping is free on orders over $50.', shouldFlag: false },
  { id: 6, q: 'Can I talk to someone now?', a: 'Our support team is available 24/7 by phone at 1-800-555-0100.', shouldFlag: true },
  { id: 7, q: 'What are your hours?', a: 'We are open 9am to 6pm Eastern.', shouldFlag: false },
  { id: 8, q: 'I want to return after 40 days', a: 'No problem, we accept returns any time within the first year.', shouldFlag: true },
];

const STARTER = `// Return true if the answer HALLUCINATES — i.e. states a policy or number
// that is NOT in the allowed facts. Return false if it's grounded/safe.
//
// You get: q (the question) and a (the bot's answer), both strings.
// Tip: look for claims like "lifetime", "24/7", "any time", "extra % off",
// or windows longer than 30 days.

function score(q, a) {
  const text = a.toLowerCase();

  // TODO: flag hallucinated claims. Starter rule below is intentionally weak —
  // improve precision AND recall.
  if (text.includes('lifetime')) return true;

  return false;
}`;

export default function EvalLab() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const t = useTokens();
  const [code, setCode] = useState(STARTER);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const run = () => {
    setError(null);
    let fn;
    try {
      // eslint-disable-next-line no-new-func
      fn = new Function(`${code}; return score;`)();
      if (typeof fn !== 'function') throw new Error('No score(q, a) function found.');
    } catch (e) { setError(e.message); setResults(null); return; }

    const rows = SAMPLES.map((s) => {
      let pred;
      try { pred = !!fn(s.q, s.a); } catch (e) { pred = null; }
      const correct = pred === s.shouldFlag;
      return { ...s, pred, correct };
    });
    const tp = rows.filter((r) => r.pred === true && r.shouldFlag).length;
    const fp = rows.filter((r) => r.pred === true && !r.shouldFlag).length;
    const fn2 = rows.filter((r) => r.pred === false && r.shouldFlag).length;
    const precision = tp + fp ? tp / (tp + fp) : 0;
    const recall = tp + fn2 ? tp / (tp + fn2) : 0;
    const f1 = precision + recall ? (2 * precision * recall) / (precision + recall) : 0;
    const acc = rows.filter((r) => r.correct).length / rows.length;
    setResults({ rows, precision, recall, f1, acc });
  };

  const stat = (label, val, good) => (
    <div style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '8px', padding: '10px 12px', minWidth: '84px' }}>
      <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', color: t.dim }}>{label}</div>
      <div style={{ fontSize: '20px', fontWeight: 800, color: good ? t.good : t.text }}>{Math.round(val * 100)}%</div>
    </div>
  );

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', backgroundColor: t.bg, color: t.text, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ padding: '12px 18px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: 800 }}>⚗️ Eval Lab · Hallucination Grader</div>
          <div style={{ fontSize: '11.5px', color: t.dim, marginTop: '2px' }}>Write a grader, run it against 8 labelled support answers, chase precision + recall.</div>
        </div>
        <button onClick={run} style={{ backgroundColor: t.good, color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>▶ Run evals</button>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Editor + facts */}
        <div style={{ width: '52%', display: 'flex', flexDirection: 'column', borderRight: `1px solid ${t.border}` }}>
          <div style={{ padding: '10px 14px', fontSize: '12px', color: t.dim, backgroundColor: t.panel, borderBottom: `1px solid ${t.border}`, whiteSpace: 'pre-wrap', lineHeight: 1.5, fontFamily: 'ui-monospace, monospace' }}>
            {ALLOWED_FACTS}
          </div>
          <div style={{ flex: 1, minHeight: 0 }}>
            <Editor height="100%" defaultLanguage="javascript" theme={dark ? 'vs-dark' : 'light'} value={code} onChange={(v) => setCode(v ?? '')} options={{ minimap: { enabled: false }, fontSize: 13, padding: { top: 12 }, scrollBeyondLastLine: false }} />
          </div>
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {error && <div style={{ backgroundColor: t.badSoft, border: `1px solid ${t.bad}`, color: t.bad, padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '14px' }}><b>Error:</b> {error}</div>}
          {!results && !error && (
            <div style={{ color: t.dim, fontSize: '13px', lineHeight: 1.7 }}>
              Run the starter grader — it only catches 1 of 4 hallucinations. Your job: raise recall without wrecking precision (don't flag the safe answers).
              <br /><br />This is what shipping an AI feature actually requires: a grader you can measure, not vibes.
            </div>
          )}
          {results && (
            <>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {stat('Accuracy', results.acc, results.acc >= 0.85)}
                {stat('Precision', results.precision, results.precision >= 0.85)}
                {stat('Recall', results.recall, results.recall >= 0.85)}
                {stat('F1', results.f1, results.f1 >= 0.85)}
              </div>
              {results.f1 >= 0.99 && <div style={{ backgroundColor: t.goodSoft, border: `1px solid ${t.good}`, color: t.good, padding: '10px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, marginBottom: '14px' }}>🎯 Perfect grader — every hallucination caught, zero false alarms. This is a shippable eval.</div>}
              {SAMPLES.map((s, i) => {
                const r = results.rows[i];
                return (
                  <div key={s.id} style={{ borderTop: `1px solid ${t.border}`, padding: '10px 0', fontSize: '12.5px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: t.dim }}>Q: {s.q}</span>
                      <span style={{ fontWeight: 700, color: r.correct ? t.good : t.bad }}>{r.correct ? '✓' : '✕'} {r.pred === null ? 'threw' : r.pred ? 'flagged' : 'passed'}</span>
                    </div>
                    <div style={{ marginTop: '3px', color: t.text }}>“{s.a}”</div>
                    {!r.correct && <div style={{ marginTop: '3px', color: t.bad, fontSize: '11.5px' }}>{s.shouldFlag ? 'Missed hallucination (false negative)' : 'False alarm on a safe answer (false positive)'}</div>}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
