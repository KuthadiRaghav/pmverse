import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
  ResponsiveContainer, Legend, Brush, AreaChart, Area
} from 'recharts';
import { useCase } from '../case/CaseContext';
import { useTokens } from '../theme';
import { Segmented, SectionLabel, EmptyState } from '../ui';

// NovaMetrics — the consequence engine made visible. Benchmark: Amplitude.
// Company KPIs: history up to decision day (week 0), then the projection
// produced by the committed decision. Focus mode, KPI cards, event
// annotations, and a range brush make it feel like a real analytics tool.

export default function NovaMetrics() {
  const t = useTokens();
  const { caseDef, state, companyHealth } = useCase();
  const metrics = caseDef.metrics || [];
  const decision = state.decision;
  const decisionDef = decision ? caseDef.decisions[decision] : null;
  const [focus, setFocus] = useState('all');

  const buildSeries = (metric) => {
    const rows = metric.history.map((p) => ({ week: p.week, actual: p.value }));
    if (decision && metric.projection[decision]) {
      const last = metric.history[metric.history.length - 1];
      rows.push({ week: last.week, actual: last.value, projected: last.value });
      for (const p of metric.projection[decision]) rows.push({ week: p.week, projected: p.value });
    }
    return rows;
  };

  const summary = (m) => {
    const now = m.history[m.history.length - 1].value;
    const proj = decision && m.projection[decision] ? m.projection[decision][m.projection[decision].length - 1].value : null;
    const improved = proj !== null && (m.goodDirection === 'up' ? proj > now : proj < now);
    return { now, proj, improved };
  };

  if (metrics.length === 0) {
    return <EmptyState icon="📈" title="No metrics for this case" body="This case doesn't track quantitative KPIs. Head to NovaMail to keep working it." />;
  }

  const shown = focus === 'all' ? metrics : metrics.filter((m) => m.id === focus);

  const renderChart = (m, tall) => {
    const data = buildSeries(m);
    const { now, proj, improved } = summary(m);
    return (
      <div style={{ width: '100%', height: tall ? 320 : 190 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 8, right: 12, bottom: tall ? 0 : 0, left: -14 }}>
            <CartesianGrid stroke={t.border} strokeDasharray="3 3" />
            <XAxis dataKey="week" type="number" domain={['dataMin', 'dataMax']} stroke={t.dim} fontSize={11} tickFormatter={(w) => `w${w}`} allowDuplicatedCategory={false} />
            <YAxis stroke={t.dim} fontSize={11} domain={['auto', 'auto']} />
            <Tooltip contentStyle={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '8px', color: t.text, fontSize: '12px' }} labelFormatter={(w) => `Week ${w}`} />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            <ReferenceLine x={0} stroke={t.accent} strokeDasharray="4 4" label={{ value: 'decision', fill: t.accent, fontSize: 10, position: 'top' }} />
            {(m.annotations || []).map((a) => (
              <ReferenceLine key={a.week} x={a.week} stroke={t.warn} strokeDasharray="2 4"
                label={{ value: a.label, fill: t.warn, fontSize: 9, position: 'insideTopLeft' }} />
            ))}
            <Line type="monotone" dataKey="actual" name="actual" stroke={t.info} strokeWidth={2} dot={{ r: 2 }} connectNulls={false} />
            {decision && <Line type="monotone" dataKey="projected" name="after your decision" stroke={improved ? t.good : t.bad} strokeWidth={2} strokeDasharray="6 3" dot={{ r: 2 }} connectNulls={false} />}
            {tall && <Brush dataKey="week" height={20} stroke={t.border} fill={t.panel} tickFormatter={(w) => `w${w}`} />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div style={{ height: '100%', overflowY: 'auto', backgroundColor: t.bg, color: t.text, padding: '20px 24px', boxSizing: 'border-box', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 800 }}>📈 {caseDef.meta.company} — Company Metrics</div>
          <div style={{ fontSize: '12.5px', color: t.dim, marginTop: '3px' }}>
            {decision ? <>Impact of your decision: <b style={{ color: t.text }}>{decisionDef.title}</b></> : 'History to today (week 0). Commit a decision in NovaMail to project impact.'}
          </div>
        </div>
        <Segmented
          value={focus}
          onChange={setFocus}
          options={[
            { value: 'all', label: 'Overview' }, 
            ...metrics.map((m) => ({ value: m.id, label: m.label.length > 22 ? m.label.slice(0, 20) + '…' : m.label })),
            { value: 'global', label: '🌐 Global Health' }
          ]}
        />
      </div>

      {focus === 'global' ? (
        <>
          <SectionLabel>Global Company Health (Consequences of your decisions)</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            <div style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: t.dim, marginBottom: '6px' }}>Monthly Active Users</div>
              <div style={{ fontSize: '24px', fontWeight: 800 }}>{companyHealth.current.dau.toLocaleString()}</div>
            </div>
            <div style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: t.dim, marginBottom: '6px' }}>Net Promoter Score</div>
              <div style={{ fontSize: '24px', fontWeight: 800 }}>{companyHealth.current.nps}</div>
            </div>
            <div style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '14px 16px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: t.dim, marginBottom: '6px' }}>Monthly Recurring Rev.</div>
              <div style={{ fontSize: '24px', fontWeight: 800 }}>${(companyHealth.current.mrr / 1000).toFixed(0)}k</div>
            </div>
          </div>
          
          <div style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>Global Trajectory (DAU)</div>
            <div style={{ width: '100%', height: 320 }}>
              <ResponsiveContainer>
                <AreaChart data={companyHealth.history} margin={{ top: 8, right: 12, bottom: 0, left: 10 }}>
                  <defs>
                    <linearGradient id="colorDAU" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={t.accent} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={t.accent} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke={t.border} strokeDasharray="3 3" />
                  <XAxis dataKey="week" stroke={t.dim} fontSize={11} tickFormatter={(w) => `w${w}`} />
                  <YAxis stroke={t.dim} fontSize={11} domain={['auto', 'auto']} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '8px', color: t.text, fontSize: '12px' }} labelFormatter={(w) => `Week ${w}`} />
                  <Area type="monotone" dataKey="dau" name="DAU" stroke={t.accent} fillOpacity={1} fill="url(#colorDAU)" />
                  {companyHealth.history.map((a) => (
                    a.week > 0 ? <ReferenceLine key={a.week} x={a.week} stroke={t.warn} strokeDasharray="2 4" label={{ value: a.label, fill: t.warn, fontSize: 9, position: 'insideTopLeft' }} /> : null
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* KPI summary cards */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, 1fr)`, gap: '12px', marginBottom: '20px' }}>
            {metrics.map((m) => {
              const { now, proj, improved } = summary(m);
              return (
                <div key={m.id} onClick={() => setFocus(m.id)} style={{ cursor: 'pointer', backgroundColor: t.panel, border: `1px solid ${focus === m.id ? t.accent : t.border}`, borderRadius: '12px', padding: '14px 16px' }}>
                  <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: t.dim, marginBottom: '6px' }}>{m.label}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '24px', fontWeight: 800 }}>{now}{m.unit}</span>
                    {proj !== null && (
                      <span style={{ fontSize: '13px', fontWeight: 700, color: improved ? t.good : t.bad }}>
                        {improved ? '▲' : '▼'} {proj}{m.unit}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: t.dim, marginTop: '2px' }}>{proj !== null ? 'now → week 8' : 'current'}</div>
                </div>
              );
            })}
          </div>

          <SectionLabel>{focus === 'all' ? 'All metrics' : 'Focused view · drag the brush to zoom'}</SectionLabel>
          {shown.map((m) => (
            <div key={m.id} style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '12px', padding: '14px 16px', marginBottom: '16px' }}>
              <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '6px' }}>{m.label}</div>
              {renderChart(m, focus !== 'all')}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
