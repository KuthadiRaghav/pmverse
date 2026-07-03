import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { useCase } from '../case/CaseContext';
import ReactMarkdown from 'react-markdown';

export default function NovaChat() {
  const { theme } = useTheme();
  const { caseDef, state, markChatRead } = useCase();
  const [activeChannelId, setActiveChannelId] = useState(null);

  const dark = theme === 'dark';
  const c = {
    bg: dark ? '#1a1d21' : '#ffffff',
    panel: dark ? '#222529' : '#f8f9fa',
    border: dark ? '#3f4144' : '#e5e7eb',
    text: dark ? '#d1d2d3' : '#1d1c1d',
    textMuted: dark ? '#ababad' : '#616061',
    accent: dark ? '#1164A3' : '#1164A3', // Slack blue
    accentText: '#ffffff',
    hover: dark ? '#2c3035' : '#f2f2f2',
    activeChannel: dark ? '#1164A3' : '#1164A3',
    mention: dark ? '#1d9bd1' : '#0b4d6b',
  };

  const chats = caseDef?.chats || [];
  
  // Filter chats by current case stage
  const visibleChats = chats.filter(ch => {
    if (ch.stage === 'investigate' && state.stage === 'arrival') return false;
    if (ch.stage === 'decide' && state.stage !== 'decide') return false;
    return true;
  });

  const activeChannel = visibleChats.find(ch => ch.id === activeChannelId) || visibleChats[0];

  const handleSelectChannel = (ch) => {
    setActiveChannelId(ch.id);
    if (!state.readChats?.includes(ch.id)) {
      markChatRead(ch.id);
    }
  };

  // If first channel is auto-selected but not read
  React.useEffect(() => {
    if (activeChannel && !state.readChats?.includes(activeChannel.id)) {
      markChatRead(activeChannel.id);
    }
  }, [activeChannel, state.readChats, markChatRead]);

  const handleCta = (cta) => {
    if (cta.type === 'open-app') {
      const event = new CustomEvent('pmverse:open-app', { detail: cta.app });
      window.dispatchEvent(event);
    }
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', backgroundColor: c.bg, color: c.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* Sidebar (Channels & DMs) */}
      <div style={{ width: '260px', backgroundColor: '#3F0E40', color: '#d1d2d3', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontWeight: 900, fontSize: '18px', color: '#fff' }}>NovaChat</div>
          <div style={{ fontSize: '13px', marginTop: '4px', opacity: 0.8 }}>Lumenly Workspace</div>
        </div>
        
        <div style={{ padding: '12px 0', flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '0 16px', fontSize: '13px', fontWeight: 600, opacity: 0.7, marginBottom: '4px' }}>Channels</div>
          {visibleChats.filter(c => c.channel.startsWith('#')).map(ch => {
            const isActive = activeChannel?.id === ch.id;
            const isUnread = !state.readChats?.includes(ch.id);
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChannel(ch)}
                style={{
                  width: '100%', textAlign: 'left', padding: '4px 16px', cursor: 'pointer',
                  backgroundColor: isActive ? '#1164A3' : 'transparent',
                  color: isActive ? '#fff' : (isUnread ? '#fff' : '#cacad0'),
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}
              >
                <span style={{ fontWeight: isUnread ? 700 : 500 }}>{ch.channel}</span>
                {isUnread && <span style={{ width: '18px', height: '18px', backgroundColor: '#E01E5A', color: '#fff', fontSize: '11px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</span>}
              </button>
            );
          })}

          <div style={{ padding: '0 16px', fontSize: '13px', fontWeight: 600, opacity: 0.7, marginTop: '24px', marginBottom: '4px' }}>Direct Messages</div>
          {visibleChats.filter(c => c.channel.startsWith('@')).map(ch => {
            const isActive = activeChannel?.id === ch.id;
            const isUnread = !state.readChats?.includes(ch.id);
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChannel(ch)}
                style={{
                  width: '100%', textAlign: 'left', padding: '4px 16px', cursor: 'pointer',
                  backgroundColor: isActive ? '#1164A3' : 'transparent',
                  color: isActive ? '#fff' : (isUnread ? '#fff' : '#cacad0'),
                  border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                }}
              >
                <span style={{ fontWeight: isUnread ? 700 : 500 }}>{ch.channel}</span>
                {isUnread && <span style={{ width: '18px', height: '18px', backgroundColor: '#E01E5A', color: '#fff', fontSize: '11px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      {activeChannel ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Header */}
          <div style={{ padding: '16px 24px', borderBottom: `1px solid ${c.border}`, backgroundColor: c.bg, fontWeight: 800, fontSize: '16px' }}>
            {activeChannel.channel}
          </div>
          
          {/* Messages Feed */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {activeChannel.messages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '4px', backgroundColor: m.color || c.accent, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
                  {m.avatar || m.from[0]}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '15px' }}>{m.from}</span>
                    <span style={{ fontSize: '12px', color: c.textMuted }}>{m.time}</span>
                  </div>
                  <div style={{ fontSize: '15px', lineHeight: 1.46, marginTop: '2px', color: c.text }}>
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <p style={{ margin: 0, padding: 0 }} {...props} />,
                        strong: ({node, ...props}) => <strong style={{ fontWeight: 700 }} {...props} />
                      }}
                    >
                      {m.text}
                    </ReactMarkdown>
                  </div>
                  {m.cta && (
                    <button
                      onClick={() => handleCta(m.cta)}
                      style={{
                        marginTop: '8px',
                        padding: '6px 12px',
                        backgroundColor: c.bg,
                        border: `1px solid ${c.border}`,
                        borderRadius: '4px',
                        color: c.text,
                        fontWeight: 600,
                        fontSize: '13px',
                        cursor: 'pointer'
                      }}
                    >
                      {m.cta.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Fake Input Area */}
          <div style={{ padding: '0 24px 24px 24px' }}>
            <div style={{ border: `1px solid ${c.border}`, borderRadius: '8px', padding: '12px', color: c.textMuted, fontSize: '14px', backgroundColor: c.bg }}>
              Message {activeChannel.channel}...
            </div>
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted }}>
          No messages found.
        </div>
      )}
    </div>
  );
}
