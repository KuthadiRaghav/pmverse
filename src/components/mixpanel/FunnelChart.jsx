import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTokens } from '../../theme';
import { EmptyState } from '../../ui';

export default function FunnelChart({ data }) {
  const t = useTokens();

  if (!data || data.length === 0) {
    return <EmptyState icon="🔻" title="No events selected" body="Add events in the query builder to build a funnel." />;
  }

  // Find max value to determine dropoff percentages
  const maxDesktop = Math.max(...data.map(d => d.desktop || 0));
  const maxMobile = Math.max(...data.map(d => d.mobile || 0));
  const maxTotal = maxDesktop + maxMobile;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '8px', padding: '12px', color: t.text, fontSize: '13px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <div style={{ fontWeight: 700, marginBottom: '8px', borderBottom: `1px solid ${t.border}`, paddingBottom: '4px' }}>{label}</div>
          {payload.map((entry, index) => {
            const raw = entry.value;
            const max = entry.dataKey === 'desktop' ? maxDesktop : maxMobile;
            const pct = max > 0 ? Math.round((raw / max) * 100) : 0;
            return (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', gap: '24px', marginBottom: '4px' }}>
                <span style={{ color: entry.color, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color }} />
                  {entry.name}
                </span>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontWeight: 700 }}>{raw.toLocaleString()}</span>
                  <span style={{ color: t.dim, marginLeft: '8px', fontSize: '11px' }}>({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>Conversion Funnel</h2>
        <p style={{ margin: 0, marginTop: '4px', color: t.dim, fontSize: '14px' }}>Overall conversion rate: {maxTotal > 0 ? Math.round(((data[data.length - 1].desktop + data[data.length - 1].mobile) / maxTotal) * 100) : 0}%</p>
      </div>
      
      <div style={{ flexGrow: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid stroke={t.border} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke={t.dim} fontSize={12} tickLine={false} axisLine={false} tick={{ fill: t.text, fontWeight: 600 }} />
            <YAxis stroke={t.dim} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => val.toLocaleString()} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: t.panelAlt, opacity: 0.4 }} />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 600, color: t.text }} />
            
            <Bar dataKey="mobile" name="Mobile" fill={t.accent} radius={[4, 4, 0, 0]} maxBarSize={120} />
            <Bar dataKey="desktop" name="Desktop" fill={t.good} radius={[4, 4, 0, 0]} maxBarSize={120} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
