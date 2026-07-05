import React from 'react';
import { useTokens } from '../../theme';
import { EmptyState } from '../../ui';

export default function CohortTable({ data }) {
  const t = useTokens();

  if (!data || data.length === 0) {
    return <EmptyState icon="📅" title="No cohort data" body="Adjust your query to view retention cohorts." />;
  }

  // Calculate heatmap color based on retention percentage
  const getCellColor = (pct) => {
    if (pct === undefined || pct === null) return 'transparent';
    if (pct === 100) return t.accent; // Day 0 is solid
    
    // Scale opacity based on retention (e.g. 0-100 maps to 0.1-0.9 opacity)
    const opacity = Math.max(0.1, Math.min(0.9, pct / 100));
    
    // Convert hex accent to rgba
    let hex = t.accent.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getTextColor = (pct) => {
    if (pct === undefined || pct === null) return t.dim;
    return pct > 60 ? '#fff' : t.text;
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>Retention Cohorts</h2>
        <p style={{ margin: 0, marginTop: '4px', color: t.dim, fontSize: '14px' }}>Percentage of users who return on or after a specific day.</p>
      </div>
      
      <div style={{ flexGrow: 1, overflow: 'auto', border: `1px solid ${t.border}`, borderRadius: '12px', backgroundColor: t.panel }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '13px' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, backgroundColor: t.panelAlt, textAlign: 'left', position: 'sticky', top: 0, left: 0, zIndex: 10, minWidth: '100px' }}>Cohort</th>
              <th style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, backgroundColor: t.panelAlt, position: 'sticky', top: 0, zIndex: 9 }}>Users</th>
              <th style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, backgroundColor: t.panelAlt, position: 'sticky', top: 0, zIndex: 9 }}>Day 0</th>
              <th style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, backgroundColor: t.panelAlt, position: 'sticky', top: 0, zIndex: 9 }}>Day 7</th>
              <th style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, backgroundColor: t.panelAlt, position: 'sticky', top: 0, zIndex: 9 }}>Day 14</th>
              <th style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, backgroundColor: t.panelAlt, position: 'sticky', top: 0, zIndex: 9 }}>Day 21</th>
              <th style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, backgroundColor: t.panelAlt, position: 'sticky', top: 0, zIndex: 9 }}>Day 28</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, backgroundColor: t.bg, fontWeight: 700, textAlign: 'left', position: 'sticky', left: 0, zIndex: 8 }}>{row.cohort}</td>
                <td style={{ padding: '12px 16px', borderBottom: `1px solid ${t.border}`, borderRight: `1px solid ${t.border}`, color: t.dim }}>{row.size ? row.size.toLocaleString() : '-'}</td>
                
                {/* Pad array to 5 days if needed, or map what we have */}
                {[0, 1, 2, 3, 4].map(dayIdx => {
                  const pct = row.retention[dayIdx];
                  const hasData = pct !== undefined;
                  
                  // Visual indicator of the "cliff"
                  const isCliff = dayIdx === 4 && pct < 25;
                  
                  return (
                    <td key={dayIdx} style={{ 
                      padding: '12px 16px', 
                      borderBottom: `1px solid ${t.border}`, 
                      borderRight: dayIdx < 4 ? `1px solid ${t.border}` : 'none',
                      backgroundColor: getCellColor(pct),
                      color: getTextColor(pct),
                      fontWeight: hasData ? 700 : 400,
                      position: 'relative'
                    }}>
                      {hasData ? `${pct}%` : '-'}
                      {isCliff && <div style={{ position: 'absolute', top: '2px', right: '4px', fontSize: '16px' }}>📉</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
