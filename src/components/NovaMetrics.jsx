import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
  ResponsiveContainer, Legend, Brush, AreaChart, Area, BarChart, Bar
} from 'recharts';
import { useCase } from '../case/CaseContext';
import { useTokens } from '../theme';
import { Segmented, SectionLabel, EmptyState } from '../ui';
import QueryBuilder from './mixpanel/QueryBuilder';
import FunnelChart from './mixpanel/FunnelChart';
import CohortTable from './mixpanel/CohortTable';

// NovaMetrics — the consequence engine made visible. Benchmark: Amplitude/Mixpanel.
// If the case provides a `mixpanel` definition, it boots into advanced event analytics mode.
// Otherwise, it falls back to the legacy KPI tracking dashboard.

export default function NovaMetrics() {
  const t = useTokens();
  const { caseDef, state, companyHealth } = useCase();
  
  // Legacy State
  const metrics = caseDef.metrics || [];
  const decision = state.decision;
  const decisionDef = decision ? caseDef.decisions[decision] : null;
  const [focus, setFocus] = useState('all');
  
  // Mixpanel State
  const isMixpanel = !!caseDef.mixpanel;
  const [query, setQuery] = useState({
    type: 'funnel',
    events: [],
    breakdown: '',
    dateRange: 'Last 4 Weeks'
  });
  const [queryResult, setQueryResult] = useState(null);

  const handleCompute = () => {
    if (isMixpanel && caseDef.mixpanel.query) {
      setQueryResult({
        type: query.type,
        data: caseDef.mixpanel.query(query.type, query)
      });
    }
  };

  // --- LEGACY RENDER (For cases without Mixpanel data) ---
  const renderLegacyMetrics = () => {
    const buildSeries = (metric) => {
      const rows = metric.history.map((p) => ({ week: p.week, actual: p.value }));
      if (decision && metric.projection[decision]) {
        rows[rows.length - 1].projected = rows[rows.length - 1].actual;
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
      if (state.stage === 'arrival') {
        return (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: t.bg }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📈</div>
            <div style={{ fontSize: '16px', fontWeight: 600, color: t.text, marginBottom: '8px' }}>Metrics dashboard offline.</div>
            <div style={{ fontSize: '14px', marginBottom: '24px', maxWidth: '300px', textAlign: 'center', lineHeight: 1.5, color: t.dim }}>
              The data team is waiting for you to accept your first project before spinning up your dashboards.
            </div>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('pmverse:open-app', { detail: 'win-mail' }))}
              style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#8957e5', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}
            >
              Open NovaMail
            </button>
          </div>
        );
      }
      return <EmptyState icon="📈" title="No metrics for this case" body="This case doesn't track quantitative KPIs." />;
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
      <div style={{ height: '100%', overflowY: 'auto', backgroundColor: t.bg, color: t.text, padding: '20px 24px', boxSizing: 'border-box' }}>
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
            <SectionLabel>Global Company Health</SectionLabel>
            {/* Global health cards rendering omitted for brevity, uses same as before */}
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
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, 1fr)`, gap: '12px', marginBottom: '20px' }}>
              {metrics.map((m) => {
                const { now, proj, improved } = summary(m);
                return (
                  <div key={m.id} onClick={() => setFocus(m.id)} style={{ cursor: 'pointer', backgroundColor: t.panel, border: `1px solid ${focus === m.id ? t.accent : t.border}`, borderRadius: '12px', padding: '14px 16px' }}>
                    <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', color: t.dim, marginBottom: '6px' }}>{m.label}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '24px', fontWeight: 800 }}>{now}{m.unit}</span>
                      {proj !== null && <span style={{ fontSize: '13px', fontWeight: 700, color: improved ? t.good : t.bad }}>{proj}{m.unit}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
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
  };

  // --- MIXPANEL RENDER ---
  const renderMixpanel = () => {
    let Visualization = <EmptyState icon="📊" title="No query computed" body="Add events on the left and click Compute." />;
    
    if (queryResult) {
      if (queryResult.type === 'funnel') Visualization = <FunnelChart data={queryResult.data} />;
      else if (queryResult.type === 'retention') Visualization = <CohortTable data={queryResult.data} />;
      else if (queryResult.type === 'insights') {
         Visualization = (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>Insights</h2>
                <p style={{ margin: 0, marginTop: '4px', color: t.dim, fontSize: '14px' }}>Event frequency over time.</p>
              </div>
              <div style={{ flexGrow: 1, minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={queryResult.data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                    <CartesianGrid stroke={t.border} strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" stroke={t.dim} fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke={t.dim} fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '8px', color: t.text }} />
                    <Legend wrapperStyle={{ fontSize: '13px', fontWeight: 600, color: t.text }} />
                    {query.events.map((ev, idx) => {
                       const colors = [t.accent, t.good, t.warn, t.info, '#9333ea'];
                       const color = colors[idx % colors.length];
                       return <Line key={ev} name={ev} type="monotone" dataKey={ev} stroke={color} strokeWidth={3} dot={{ r: 4, fill: color }} />;
                    })}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
         );
      }
    }

    return (
      <div style={{ display: 'flex', height: '100%', width: '100%', backgroundColor: t.bg, color: t.text, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        {/* Left Sidebar: Query Builder */}
        <QueryBuilder 
          mixpanelDef={caseDef.mixpanel} 
          query={query} 
          setQuery={setQuery} 
          onCompute={handleCompute} 
        />
        
        {/* Right Canvas: Visualization */}
        <div style={{ flexGrow: 1, padding: '32px', overflowY: 'auto' }}>
          {Visualization}
        </div>
      </div>
    );
  };

  return isMixpanel ? renderMixpanel() : renderLegacyMetrics();
}
