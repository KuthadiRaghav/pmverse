import React from 'react';
import { useTokens } from '../../theme';
import { Button, Segmented, SectionLabel } from '../../ui';

export default function QueryBuilder({ mixpanelDef, query, setQuery, onCompute }) {
  const t = useTokens();
  
  if (!mixpanelDef) return null;
  
  const { events, properties } = mixpanelDef;
  
  const addEvent = (e) => {
    if (!query.events.includes(e.target.value)) {
      setQuery({ ...query, events: [...query.events, e.target.value] });
    }
    e.target.value = '';
  };
  
  const removeEvent = (index) => {
    const newEvents = [...query.events];
    newEvents.splice(index, 1);
    setQuery({ ...query, events: newEvents });
  };

  return (
    <div style={{ width: '320px', flexShrink: 0, borderRight: `1px solid ${t.border}`, backgroundColor: t.panel, display: 'flex', flexDirection: 'column' }}>
      
      {/* Chart Type Selector */}
      <div style={{ padding: '20px', borderBottom: `1px solid ${t.border}` }}>
        <SectionLabel>Analysis Type</SectionLabel>
        <Segmented 
          value={query.type} 
          onChange={(val) => setQuery({ ...query, type: val })}
          options={[
            { value: 'insights', label: '📈 Insights' },
            { value: 'funnel', label: '🔻 Funnels' },
            { value: 'retention', label: '📅 Retention' }
          ]}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}
        />
      </div>
      
      {/* Event Selection */}
      <div style={{ padding: '20px', borderBottom: `1px solid ${t.border}`, flexGrow: 1, overflowY: 'auto' }}>
        <SectionLabel>{query.type === 'funnel' ? 'Funnel Steps' : 'Events'}</SectionLabel>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {query.events.map((ev, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', backgroundColor: t.bg, border: `1px solid ${t.border}`, borderRadius: '8px', padding: '8px 12px' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '4px', backgroundColor: t.accentSoft, color: t.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, marginRight: '12px' }}>
                {String.fromCharCode(65 + i)}
              </div>
              <div style={{ flexGrow: 1, fontSize: '13px', fontWeight: 600 }}>{ev}</div>
              <button onClick={() => removeEvent(i)} style={{ background: 'none', border: 'none', color: t.dim, cursor: 'pointer', fontSize: '16px' }}>&times;</button>
            </div>
          ))}
        </div>
        
        <select 
          onChange={addEvent} 
          style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px dashed ${t.border}`, backgroundColor: 'transparent', color: t.text, fontSize: '13px', outline: 'none', cursor: 'pointer' }}
          value=""
        >
          <option value="" disabled>+ Add Event</option>
          {events.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
        
        <div style={{ marginTop: '24px' }}>
          <SectionLabel>Breakdown By</SectionLabel>
          <select 
            value={query.breakdown}
            onChange={(e) => setQuery({ ...query, breakdown: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.bg, color: t.text, fontSize: '13px', outline: 'none' }}
          >
            <option value="">None</option>
            {properties.map(p => (
              <optgroup label={p} key={p}>
                <option value={`${p}: Desktop`}>{p}: Desktop</option>
                <option value={`${p}: Mobile`}>{p}: Mobile</option>
              </optgroup>
            ))}
          </select>
        </div>
        
        <div style={{ marginTop: '24px' }}>
          <SectionLabel>Date Range</SectionLabel>
          <select 
            value={query.dateRange}
            onChange={(e) => setQuery({ ...query, dateRange: e.target.value })}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1px solid ${t.border}`, backgroundColor: t.bg, color: t.text, fontSize: '13px', outline: 'none' }}
          >
            <option value="Last 4 Weeks">Last 4 Weeks</option>
            <option value="Last 8 Weeks">Last 8 Weeks</option>
            <option value="Last 12 Weeks">Last 12 Weeks</option>
          </select>
        </div>
      </div>
      
      <div style={{ padding: '20px', borderTop: `1px solid ${t.border}` }}>
        <Button onClick={onCompute} style={{ width: '100%', justifyContent: 'center' }}>
          Compute
        </Button>
      </div>
    </div>
  );
}
