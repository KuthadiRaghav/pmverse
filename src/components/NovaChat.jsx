import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { useCase } from '../case/CaseContext';
import { hasApiKey, claudeComplete, hasWindowAi, windowAiComplete } from '../ai';
import ReactMarkdown from 'react-markdown';

// NovaChat — Slack-style workspace. Channels carry the case's ambient story,
// and the player can post: a relevant stakeholder replies in-character
// (Claude when an API key is set, otherwise the persona's scripted voice).

// Which persona should answer in this channel?
function responderFor(caseDef, channel) {
  const personas = caseDef?.personas || {};
  const entries = Object.entries(personas);
  // DM channel: @first-last → match by name
  if (channel.channel.startsWith('@')) {
    const handle = channel.channel.slice(1).replace(/-/g, ' ').toLowerCase();
    const hit = entries.find(([, p]) => p.name.toLowerCase() === handle || p.name.toLowerCase().startsWith(handle.split(' ')[0]));
    if (hit) return hit[1];
  }
  // Channel: whoever last spoke and is a known persona
  const authors = [...channel.messages].reverse().map((m) => m.from);
  for (const a of authors) {
    const hit = entries.find(([, p]) => p.name === a);
    if (hit) return hit[1];
  }
  return entries[0]?.[1] || null;
}

function scriptedReply(persona, history, userText) {
  for (const rule of persona.scripted || []) {
    if (rule.match.test(userText)) return rule.reply;
  }
  const fb = persona.fallbacks || ['Let me get back to you on that.'];
  return fb[history.length % fb.length];
}

export default function NovaChat() {
  const { theme } = useTheme();
  const { caseDef, state, markChatRead, addChannelPost } = useCase();
  const [activeChannelId, setActiveChannelId] = useState(null);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const feedRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileView, setMobileView] = useState('list');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dark = theme === 'dark';
  const c = {
    bg: dark ? '#1a1d21' : '#ffffff',
    panel: dark ? '#222529' : '#f8f9fa',
    border: dark ? '#3f4144' : '#e5e7eb',
    text: dark ? '#d1d2d3' : '#1d1c1d',
    textMuted: dark ? '#ababad' : '#616061',
    accent: '#1164A3',
  };

  const chats = caseDef?.chats || [];
  const visibleChats = chats.filter((ch) => {
    if (ch.stage === 'investigate' && state.stage === 'arrival') return false;
    if (ch.stage === 'decide' && state.stage !== 'decide') return false;
    return true;
  });
  const activeChannel = visibleChats.find((ch) => ch.id === activeChannelId) || visibleChats[0];
  const posts = (activeChannel && state.channelPosts?.[activeChannel.id]) || [];

  const handleSelectChannel = (ch) => {
    setActiveChannelId(ch.id);
    if (!state.readChats?.includes(ch.id)) markChatRead(ch.id);
    setMobileView('detail');
  };

  useEffect(() => {
    if (activeChannel && !state.readChats?.includes(activeChannel.id)) markChatRead(activeChannel.id);
  }, [activeChannel, state.readChats, markChatRead]);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [posts.length, pending, activeChannelId]);

  const handleCta = (cta) => {
    if (cta.type === 'open-app') window.dispatchEvent(new CustomEvent('pmverse:open-app', { detail: cta.app }));
  };

  const send = async () => {
    const text = input.trim();
    if (!text || pending || !activeChannel) return;
    const channelId = activeChannel.id;
    const responder = responderFor(caseDef, activeChannel);
    setInput('');
    addChannelPost(channelId, { role: 'user', from: 'You', avatar: 'Y', color: '#8957e5', text, time: nowTime() });
    if (!responder) return;
    setPending(true);

    const priorHistory = state.channelPosts?.[channelId] || [];
    let reply = null;
    const sysPrompt = `${responder.system}\n\nYou are chatting in the team channel "${activeChannel.channel}". Keep it to 1-2 sentences, casual workplace-chat tone.`;
    const msgs = [
      ...priorHistory.slice(-6).map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text })),
      { role: 'user', content: text },
    ];

    if (hasApiKey()) {
      try {
        reply = await claudeComplete({
          system: sysPrompt,
          messages: msgs,
          maxTokens: 160,
        });
      } catch { /* fall through to next */ }
    }
    
    if (!reply && hasWindowAi()) {
      try {
        reply = await windowAiComplete({
          system: sysPrompt,
          messages: msgs,
        });
      } catch (err) { 
        console.warn('window.ai fallback failed:', err);
      }
    }

    if (!reply) reply = scriptedReply(responder, priorHistory, text);
    setTimeout(() => {
      addChannelPost(channelId, { role: 'assistant', from: responder.name, avatar: responder.avatar, color: responder.color, text: reply, time: nowTime() });
      setPending(false);
    }, hasApiKey() || hasWindowAi() ? 0 : 550);
  };

  const allMessages = activeChannel ? [...activeChannel.messages.map((m) => ({ ...m, _static: true })), ...posts] : [];

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', backgroundColor: c.bg, color: c.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Sidebar */}
      {(!isMobile || mobileView === 'list') && (
      <div style={{ width: isMobile ? '100%' : '240px', backgroundColor: '#3F0E40', color: '#d1d2d3', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontWeight: 900, fontSize: '18px', color: '#fff' }}>NovaChat</div>
          <div style={{ fontSize: '13px', marginTop: '4px', opacity: 0.8 }}>{caseDef?.meta?.company} Workspace</div>
        </div>
        <div style={{ padding: '12px 0', flex: 1, overflowY: 'auto' }}>
          {['#', '@'].map((prefix) => (
            <div key={prefix}>
              <div style={{ padding: '0 16px', fontSize: '13px', fontWeight: 600, opacity: 0.7, margin: prefix === '@' ? '20px 0 4px' : '0 0 4px' }}>
                {prefix === '#' ? 'Channels' : 'Direct Messages'}
              </div>
              {visibleChats.filter((ch) => ch.channel.startsWith(prefix)).map((ch) => {
                const isActive = activeChannel?.id === ch.id;
                const isUnread = !state.readChats?.includes(ch.id);
                return (
                  <button key={ch.id} onClick={() => handleSelectChannel(ch)}
                    style={{ width: '100%', textAlign: 'left', padding: '5px 16px', cursor: 'pointer', backgroundColor: isActive ? '#1164A3' : 'transparent', color: isActive ? '#fff' : (isUnread ? '#fff' : '#cacad0'), border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ fontWeight: isUnread ? 700 : 500 }}>{ch.channel}</span>
                    {isUnread && <span style={{ width: '16px', height: '16px', backgroundColor: '#E01E5A', color: '#fff', fontSize: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>1</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Main */}
      {(!isMobile || mobileView === 'detail') && (
      activeChannel ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div style={{ padding: '14px 24px', borderBottom: `1px solid ${c.border}`, backgroundColor: c.bg, fontWeight: 800, fontSize: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isMobile && (
              <button onClick={() => setMobileView('list')} style={{ background: 'none', border: 'none', color: c.accent, fontSize: '14px', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                ← Back
              </button>
            )}
            {activeChannel.channel}
          </div>

          <div ref={feedRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
            {allMessages.map((m, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', marginBottom: '18px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '4px', backgroundColor: m.color || c.accent, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
                  {m.avatar || (m.from || '?')[0]}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontWeight: 800, fontSize: '15px' }}>{m.from}</span>
                    <span style={{ fontSize: '12px', color: c.textMuted }}>{m.time}</span>
                  </div>
                  <div style={{ fontSize: '15px', lineHeight: 1.46, marginTop: '2px', color: c.text }}>
                    <ReactMarkdown components={{ p: ({ node, ...props }) => <p style={{ margin: 0 }} {...props} />, strong: ({ node, ...props }) => <strong style={{ fontWeight: 700 }} {...props} /> }}>
                      {m.text}
                    </ReactMarkdown>
                  </div>
                  {m.cta && (
                    <button onClick={() => handleCta(m.cta)} style={{ marginTop: '8px', padding: '6px 12px', backgroundColor: c.bg, border: `1px solid ${c.border}`, borderRadius: '4px', color: c.text, fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                      {m.cta.label}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {pending && (
              <div style={{ fontSize: '13px', color: c.textMuted, fontStyle: 'italic', paddingLeft: '48px' }}>
                {responderFor(caseDef, activeChannel)?.name?.split(' ')[0]} is typing…
              </div>
            )}
          </div>

          {/* Real input */}
          <div style={{ padding: '0 24px 20px' }}>
            <div style={{ border: `1px solid ${c.border}`, borderRadius: '8px', display: 'flex', alignItems: 'center', backgroundColor: c.bg }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
                placeholder={`Message ${activeChannel.channel}`}
                disabled={pending}
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', color: c.text, fontSize: '14px', padding: '12px 14px', fontFamily: 'inherit' }}
              />
              <button onClick={send} disabled={pending || !input.trim()} style={{ margin: '6px', padding: '7px 14px', borderRadius: '6px', border: 'none', cursor: pending || !input.trim() ? 'not-allowed' : 'pointer', backgroundColor: input.trim() ? '#007a5a' : c.panel, color: input.trim() ? '#fff' : c.textMuted, fontWeight: 700, fontSize: '13px' }}>
                Send
              </button>
            </div>
            {(!hasApiKey() && !hasWindowAi()) && (
              <div style={{ fontSize: '11px', color: c.textMuted, marginTop: '6px' }}>
                Replies use each colleague's scripted voice. Add an API key in Career for live Claude chat, or use Chrome with built-in AI.
              </div>
            )}
            {(hasWindowAi() && !hasApiKey()) && (
              <div style={{ fontSize: '11px', color: '#2ea043', marginTop: '6px' }}>
                ● Local Chrome AI Active
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.textMuted }}>
          No channels yet — accept the case in NovaMail to meet the team.
        </div>
      )
      )}
    </div>
  );
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
