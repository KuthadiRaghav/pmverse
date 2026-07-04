import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { useCase } from '../case/CaseContext';
import { INTERVIEWER } from '../case/engine';
import { hasApiKey, claudeComplete, hasWindowAi, windowAiComplete } from '../ai';
import { CreateMLCEngine } from '@mlc-ai/web-llm';

// Decision Center: talk to the case's stakeholders. Uses an in-browser LLM
// (WebGPU) grounded in each persona's hidden knowledge; falls back to the
// persona's scripted responses when WebGPU/WebLLM is unavailable.

const MODEL_ID = 'Phi-3-mini-4k-instruct-q4f16_1-MLC';

// Singleton to prevent multiple downloads during hot reloads
let enginePromise = null;
let engineInstance = null;
let engineFailed = false;

function scriptedReply(persona, history, userText) {
  for (const rule of persona.scripted) {
    if (rule.match.test(userText)) return rule.reply;
  }
  const userTurns = history.filter((m) => m.role === 'user').length;
  return persona.fallbacks[userTurns % persona.fallbacks.length];
}

export default function DecisionCenter() {
  const { theme } = useTheme();
  const { caseDef, state: caseState, addChatMessage } = useCase();
  const [activeId, setActiveId] = useState(() => Object.keys(caseDef?.personas || {})[0] || 'maya');
  const [inputText, setInputText] = useState('');
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [mode, setMode] = useState(hasWindowAi() ? 'window-ai' : engineInstance ? 'webgpu' : engineFailed ? 'scripted' : 'standby');
  const [streaming, setStreaming] = useState(null); // in-flight assistant text
  const [isGenerating, setIsGenerating] = useState(false);

  const chatEndRef = useRef(null);
  // Case stakeholders + the always-available Interview Mode persona
  const personas = { ...(caseDef?.personas || {}), interviewer: INTERVIEWER };
  const persona = personas[activeId];
  const history = caseState.chats[activeId] || [];

  useEffect(() => {
    if (!persona) {
      setActiveId(Object.keys(caseDef?.personas || {})[0] || 'maya');
    }
  }, [persona, caseDef]);

  useEffect(() => {
    return () => {
      // Unload WebLLM to free GPU memory when closed
      const cleanup = async () => {
        if (enginePromise) {
          try {
            const engine = await enginePromise;
            await engine.unload();
          } catch(e) {}
        } else if (engineInstance) {
          try {
            await engineInstance.unload();
          } catch(e) {}
        }
        enginePromise = null;
        engineInstance = null;
        engineFailed = false;
      };
      cleanup();
    };
  }, []);

  const dark = theme === 'dark';
  const c = {
    bg: dark ? '#0d1117' : '#ffffff',
    panel: dark ? '#161b22' : '#f3f4f6',
    border: dark ? '#30363d' : '#e5e7eb',
    text: dark ? '#c9d1d9' : '#111827',
    dim: dark ? '#8b949e' : '#6b7280',
    userBubble: dark ? '#238636' : '#3b82f6',
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history.length, streaming, activeId]);

  const initEngine = async () => {
    if (engineInstance || enginePromise || engineFailed) return;
    setIsLoadingModel(true);
    try {
      enginePromise = CreateMLCEngine(MODEL_ID, {
        initProgressCallback: (p) => {
          setLoadingProgress(Math.round(p.progress * 100));
          setLoadingText(p.text);
        },
      });
      engineInstance = await enginePromise;
      enginePromise = null;
      setMode('webgpu');
    } catch (err) {
      console.warn('WebLLM unavailable, using scripted stakeholders:', err.message);
      engineFailed = true;
      enginePromise = null;
      setMode('scripted');
    }
    setIsLoadingModel(false);
  };

  const handleSend = async () => {
    const userText = inputText.trim();
    if (!userText || isGenerating || isLoadingModel) return;

    const personaId = activeId;
    const p = personas[personaId];
    const priorHistory = caseState.chats[personaId] || [];
    setInputText('');
    addChatMessage(personaId, { role: 'user', content: userText });
    setIsGenerating(true);

    // Tier 1: live Claude when the player supplied an API key (Career app → Settings)
    if (hasApiKey()) {
      try {
        const text = await claudeComplete({
          system: p.system,
          messages: [
            ...priorHistory.slice(-8).map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userText },
          ],
          maxTokens: 300,
        });
        addChatMessage(personaId, { role: 'assistant', content: text || '…' });
        setIsGenerating(false);
        return;
      } catch (err) {
        console.warn('Claude call failed, falling back to local model:', err.message);
      }
    }

    // Tier 2: Chrome's built-in window.ai
    if (hasWindowAi()) {
      try {
        const text = await windowAiComplete({
          system: p.system,
          messages: [
            ...priorHistory.slice(-6).map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userText },
          ],
        });
        addChatMessage(personaId, { role: 'assistant', content: text || '…' });
        setIsGenerating(false);
        return;
      } catch (err) {
        console.warn('window.ai call failed, falling back to WebLLM/script:', err.message);
      }
    }

    // Tier 3: WebLLM (In-Browser GPU model download)
    if (!engineInstance && !engineFailed) {
      await initEngine();
    }

    if (engineInstance) {
      try {
        const contextMessages = [
          { role: 'system', content: p.system },
          ...priorHistory.slice(-6).map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: userText },
        ];
        const chunks = await engineInstance.chat.completions.create({
          messages: contextMessages,
          stream: true,
          max_tokens: 220,
        });
        let text = '';
        setStreaming('');
        for await (const chunk of chunks) {
          text += chunk.choices[0]?.delta?.content || '';
          setStreaming(text);
        }
        setStreaming(null);
        addChatMessage(personaId, { role: 'assistant', content: text.trim() || '…' });
        setIsGenerating(false);
        return;
      } catch (err) {
        console.warn('WebLLM generation failed, falling back to script:', err.message);
        setStreaming(null);
      }
    }

    // Scripted fallback — small delay so it reads like a reply, not an echo
    const reply = scriptedReply(p, priorHistory, userText);
    setTimeout(() => {
      addChatMessage(personaId, { role: 'assistant', content: reply });
      setIsGenerating(false);
    }, 650);
  };

  const interviewedIds = Object.keys(caseDef?.personas || {}).filter(
    (id) => (caseState.chats[id] || []).filter((m) => m.role === 'user').length >= 2
  );

  if (!persona) return null;

  return (
    <div style={{ flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: c.bg, color: c.text }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: 'bold' }}>Decision Center · Stakeholders</div>
        <div style={{ fontSize: '12px', color: hasApiKey() ? '#2ea043' : mode === 'window-ai' || mode === 'webgpu' ? '#2ea043' : c.dim }}>
          {hasApiKey() ? '● Claude (API key)' : mode === 'window-ai' ? '● Local Chrome AI' : mode === 'webgpu' ? '● WebGPU Active' : mode === 'scripted' ? '◦ Scripted mode' : '○ WebGPU Standby'}
        </div>
      </div>

      {/* Persona tabs */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${c.border}`, backgroundColor: c.panel }}>
        {Object.entries(personas).map(([id, p]) => {
          const active = id === activeId;
          return (
            <button
              key={id}
              onClick={() => setActiveId(id)}
              style={{
                flex: 1, padding: '10px 8px', border: 'none', cursor: 'pointer',
                backgroundColor: active ? c.bg : 'transparent',
                borderBottom: active ? `2px solid ${p.color}` : '2px solid transparent',
                color: c.text, fontSize: '12px', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '4px',
              }}
            >
              <span style={{
                width: '30px', height: '30px', borderRadius: '50%', backgroundColor: p.color,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', fontWeight: 700,
              }}>{p.avatar}</span>
              <span style={{ fontWeight: active ? 700 : 400 }}>
                {p.name.split(' ')[0]}
                {interviewedIds.includes(id) && <span style={{ color: '#2ea043' }}> ✓</span>}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Bubble c={c} role="assistant">{persona.intro}</Bubble>
        {history.map((msg, i) => (
          <Bubble key={i} c={c} role={msg.role}>{msg.content}</Bubble>
        ))}
        {streaming !== null && <Bubble c={c} role="assistant">{streaming || '…'}</Bubble>}
        {isGenerating && streaming === null && (
          <div style={{ fontSize: '12px', color: c.dim, fontStyle: 'italic' }}>
            {persona.name.split(' ')[0]} is typing…
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Model loading */}
      {isLoadingModel && (
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${c.border}`, backgroundColor: c.panel, fontSize: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span>Downloading in-browser AI (Phi-3) — first time only…</span>
            <span>{loadingProgress}%</span>
          </div>
          <div style={{ width: '100%', height: '4px', backgroundColor: c.border, borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: `${loadingProgress}%`, height: '100%', backgroundColor: '#2f81f7', transition: 'width 0.2s' }} />
          </div>
          <div style={{ fontSize: '10px', color: c.dim, marginTop: '4px' }}>{loadingText}</div>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: '12px 16px', borderTop: `1px solid ${c.border}`, display: 'flex', gap: '8px' }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Ask ${persona.name.split(' ')[0]} a question…`}
          disabled={isGenerating || isLoadingModel}
          style={{
            flex: 1, padding: '11px 12px', borderRadius: '8px',
            border: `1px solid ${c.border}`, backgroundColor: c.bg, color: c.text,
            outline: 'none', opacity: isGenerating || isLoadingModel ? 0.5 : 1,
          }}
        />
        <button
          onClick={handleSend}
          disabled={isGenerating || isLoadingModel}
          style={{
            padding: '0 20px', borderRadius: '8px', backgroundColor: c.userBubble,
            color: '#fff', border: 'none', fontWeight: 'bold',
            cursor: isGenerating || isLoadingModel ? 'not-allowed' : 'pointer',
            opacity: isGenerating || isLoadingModel ? 0.5 : 1,
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

function Bubble({ c, role, children }) {
  const isUser = role === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '85%', padding: '11px 14px', borderRadius: '14px',
        backgroundColor: isUser ? c.userBubble : c.panel,
        color: isUser ? '#fff' : c.text,
        border: isUser ? 'none' : `1px solid ${c.border}`,
        lineHeight: 1.5, fontSize: '14px', whiteSpace: 'pre-wrap',
      }}>
        {children}
      </div>
    </div>
  );
}
