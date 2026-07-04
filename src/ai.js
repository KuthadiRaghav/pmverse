// Optional live-AI layer: a user-supplied Anthropic API key upgrades
// stakeholder chats and coaching from the in-browser model to Claude.
// Calls go directly from the browser (no server in this app).

const KEY_STORAGE = 'pmverse_anthropic_key_v1';
const MODEL = 'claude-opus-4-8';

export function getApiKey() {
  try { return localStorage.getItem(KEY_STORAGE) || ''; } catch { return ''; }
}

export function setApiKey(key) {
  try {
    if (key) localStorage.setItem(KEY_STORAGE, key.trim());
    else localStorage.removeItem(KEY_STORAGE);
  } catch { /* storage unavailable */ }
}

export function hasApiKey() {
  return !!getApiKey();
}

// Check if Chrome's Built-in AI is available
export function hasWindowAi() {
  return typeof window !== 'undefined' && (!!window.ai?.languageModel || !!window.ai?.createTextSession);
}

// Returns the assistant text, or throws. messages: [{role, content}]
export async function claudeComplete({ system, messages, maxTokens = 400 }) {
  const key = getApiKey();
  if (!key) throw new Error('no api key');
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Claude API ${res.status}: ${detail.slice(0, 200)}`);
  }
  const data = await res.json();
  return (data.content || [])
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
}

// Generate completion using Chrome's Built-in AI (window.ai)
export async function windowAiComplete({ system, messages }) {
  if (!hasWindowAi()) throw new Error('window.ai is not available');
  
  // Format history into a single prompt for local AI since some versions don't support message arrays
  let prompt = `${system}\n\n`;
  for (const m of messages) {
    prompt += `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}\n`;
  }
  prompt += 'Assistant:';
  
  // Try the newer languageModel API first, then fallback to older createTextSession
  let session;
  try {
    if (window.ai.languageModel) {
      session = await window.ai.languageModel.create({ systemPrompt: system });
    } else if (window.ai.createTextSession) {
      session = await window.ai.createTextSession();
    }
    
    if (!session) throw new Error('Could not create AI session');
    
    // the newer API uses prompt(), older used prompt() as well
    const response = await session.prompt(prompt);
    
    if (session.destroy) session.destroy();
    
    return response.trim();
  } catch (err) {
    if (session && session.destroy) session.destroy();
    throw new Error(`window.ai failed: ${err.message}`);
  }
}

const COACH_SYSTEM = `You are the Product Coach inside PMverse, a product-management
simulator. You will receive a summary of a player's case playthrough: the case,
their decision, the evidence they gathered and missed, and their decision memo
(if written). Write a short personalized coaching note addressed to "you":
one sentence on the decision, one or two on how they ran discovery (name what
they specifically missed), and one concrete thing to do differently next case.
Under 130 words. Plain text, candid, specific, never sycophantic.`;

export async function coachDebrief(summary) {
  const args = {
    system: COACH_SYSTEM,
    messages: [{ role: 'user', content: summary }],
  };
  
  if (hasApiKey()) {
    try {
      return await claudeComplete({ ...args, maxTokens: 600 });
    } catch { /* fallback */ }
  }
  
  if (hasWindowAi()) {
    try {
      return await windowAiComplete(args);
    } catch (err) {
      console.warn('window.ai coach failed:', err);
    }
  }
  
  throw new Error('No AI provider available');
}
