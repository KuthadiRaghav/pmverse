import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
  ResponsiveContainer, Legend,
} from 'recharts';
import { useCase } from '../case/CaseContext';
import { useTokens } from '../theme';

// NovaMetrics: the consequence engine made visible. Company KPIs from the
// active case — history up to "decision day" (week 0), then the projection
// produced by whichever decision the player committed.

export default function NovaMetrics() {
  const c = useTokens();
  const { caseDef, state } = useCase();
  const metrics = caseDef.metrics || [];
  const decision = state.decision;
  const decisionDef = decision ? caseDef.decisions[decision] : null;

  const buildSeries = (metric) => {
    const rows = metric.history.map((p) => ({ week: p.week, actual: p.value }));
    if (decision && metric.projection[decision]) {
      const last = metric.history[metric.history.length - 1];
      rows.push({ week: last.week, actual: last.value, projected: last.value });
      for (const p of metric.projection[decision]) {
        rows.push({ week: p.week, projected: p.value });
      }
    }
    return rows;
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', backgroundColor: c.bg, color: c.text, padding: '20px 24px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '4px', fontSize: '18px', fontWeight: 700 }}>
        📈 {caseDef.meta.company} — Company Metrics
      </div>
      <div style={{ fontSize: '12.5px', color: c.dim, marginBottom: '18px' }}>
        {decision
          ? <>Showing the impact of your decision: <b style={{ color: c.text }}>{decisionDef.title}</b> (weeks 1–8 after commit)</>
          : 'History up to today (week 0). Commit a decision in NovaMail to see its impact projected here.'}
      </div>

      {metrics.length === 0 && (
        <div style={{ color: c.dim, fontSize: '13px' }}>This case has no tracked metrics.</div>
      )}

      {metrics.map((m) => {
        const data = buildSeries(m);
        const lastActual = m.history[m.history.length - 1].value;
        const lastProjected = decision && m.projection[decision]
          ? m.projection[decision][m.projection[decision].length - 1].value
          : null;
        const improved = lastProjected !== null &&
          (m.goodDirection === 'up' ? lastProjected > lastActual : lastProjected < lastActual);
        return (
          <div key={m.id} style={{ backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '12px', padding: '16px 18px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>{m.label}</span>
              <span style={{ fontSize: '13px', color: c.dim }}>
                now: <b style={{ color: c.text }}>{lastActual}{m.unit}</b>
                {lastProjected !== null && (
                  <> → wk 8: <b style={{ color: improved ? c.good : c.bad }}>{lastProjected}{m.unit}</b></>
                )}
              </span>
            </div>
            <div style={{ width: '100%', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 10, bottom: 0, left: -15 }}>
                  <CartesianGrid stroke={c.border} strokeDasharray="3 3" />
                  <XAxis dataKey="week" stroke={c.dim} fontSize={11}
                    label={{ value: 'weeks (0 = decision day)', position: 'insideBottomRight', offset: -2, fill: c.dim, fontSize: 10 }} />
                  <YAxis stroke={c.dim} fontSize={11} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{ backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '8px', color: c.text, fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <ReferenceLine x={0} stroke={c.accent} strokeDasharray="4 4"
                    label={{ value: 'decision', fill: c.accent, fontSize: 10, position: 'top' }} />
                  <Line type="monotone" dataKey="actual" name="actual" stroke={c.info} strokeWidth={2} dot={{ r: 2 }} connectNulls={false} />
                  {decision && (
                    <Line type="monotone" dataKey="projected" name="after your decision" stroke={improved ? c.good : c.bad} strokeWidth={2} strokeDasharray="6 3" dot={{ r: 2 }} connectNulls={false} />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
