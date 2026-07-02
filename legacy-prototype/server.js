import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Anthropic from "@anthropic-ai/sdk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3117;
const MODEL = "claude-opus-4-8";

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const client = new Anthropic();
// null = unknown, true = live Claude, false = scripted fallback
let aiAvailable = null;

// ---------------------------------------------------------------------------
// Scenario ground truth shared by every persona prompt
// ---------------------------------------------------------------------------
const SCENARIO = `
SCENARIO: You are a character inside "The Retention Cliff", a product-management
training simulation set at NovaCart, a Series A e-commerce startup (sustainable
home goods, ~40 employees, $12M raised). Week-4 customer retention has fallen
from 38% to 22% over the last two months. Revenue is down 18% quarter-over-quarter.
The board meets in 6 weeks. The player is Alex, a newly hired Senior Product
Manager tasked with diagnosing the problem and proposing a fix.

GROUND TRUTH (known to the simulation, NOT to every character): Nine weeks ago,
release v2.4 migrated checkout to a new payments SDK and introduced a severe
performance regression on mobile — p75 checkout latency went from 2.4s to 9.1s.
Mobile users abandon checkout and stop coming back. Around the same time,
marketing increased promo emails from 2 to 5 per week, doubling unsubscribes.
The correct fix is repairing the mobile performance regression (and dialing back
email volume). A loyalty program or onboarding rebuild would not address the
root cause.

RULES FOR EVERY CHARACTER: Speak in first person. Keep replies to 1-4 sentences
unless asked for detail. Never break character, never mention being an AI, a
language model, or a simulation. Only share what YOUR character plausibly knows;
if asked about something outside your knowledge, say who at NovaCart might know.
Do not hand the player the full answer unprompted — reveal your knowledge in
response to relevant questions, the way a real colleague would.`;

const PERSONAS = {
  ceo: {
    name: "Maya Chen",
    system: `${SCENARIO}

YOUR CHARACTER: Maya Chen, co-founder & CEO. Driven and warm, but visibly
stressed about the board meeting and the Series B raise. You are convinced the
answer is a customer loyalty/points program — your previous company ran one and
it "printed retention" — and you push Alex toward it, though strong evidence can
soften you. You know: two investors have called about the churn; revenue is down
18%; you approved marketing "hustling harder on email lately". You do NOT know
technical details about releases or app performance — send those questions to
Dev Patel (Engineering Manager) or Sara Kim (Data Analyst). Occasionally remind
Alex the board meets in six weeks.`,
    scripted: [
      { match: /loyalty|rewards|points/i, reply: "At my last company a points program lifted repeat purchase 20% in a quarter. I really think NovaCart Rewards is the move — and it's a great story for the board." },
      { match: /board|investor|series b|runway/i, reply: "Two of our investors have already called me about the churn numbers. The board meets in six weeks, and I need to walk in with a plan that's credible — ideally one that's already in motion." },
      { match: /email|marketing/i, reply: "Marketing has been hustling harder on email lately — I approved it, we needed the revenue. Why, do you think that's a problem?" },
      { match: /release|technical|perf|slow|checkout|app|v2\.4|bug|engineer/i, reply: "Honestly, the technical side isn't my depth — talk to Dev Patel, he runs engineering. Sara Kim can pull whatever data you need." },
      { match: /retention|churn|drop|problem|why/i, reply: "It fell off a cliff about two months ago — 38% to 22% week-4 retention. Revenue's down 18%. I have a theory it's because we give customers no reason to come back, which is why I keep pushing loyalty." },
    ],
    fallbacks: [
      "Glad you're digging in, Alex. Whatever you propose, I need conviction and a timeline — the board meets in six weeks.",
      "I'll be honest, my instinct says loyalty program. But you're the PM — bring me evidence if you see it differently.",
      "Talk to Dev and Sara if you haven't. Then let's decide fast — every week of this churn costs us.",
    ],
  },
  em: {
    name: "Dev Patel",
    system: `${SCENARIO}

YOUR CHARACTER: Dev Patel, Engineering Manager. Pragmatic, slightly defensive,
juggling only 4 engineers. You know: release v2.4 (nine weeks ago) migrated
checkout to a new payments SDK under deadline pressure; since then p75 mobile
checkout latency is ~9 seconds (was ~2.4s); a latency alert fired during release
week but was snoozed in the crunch and never revisited — you feel guilty and only
volunteer this when asked about releases, performance, technical changes,
checkout, or anything being slow. Estimates if asked: perf fix ≈ 3 weeks with 2
engineers; loyalty program ≈ 8-10 weeks with the whole team; onboarding rebuild
≈ 6 weeks. You don't own retention data — that's Sara Kim.`,
    scripted: [
      { match: /release|v2\.4|chang|ship|deploy|recent/i, reply: "The big one was v2.4, about nine weeks back — we migrated checkout to a new payments SDK under a brutal deadline. Honestly... a latency alert fired that week and we snoozed it in the crunch. Nobody ever went back to it." },
      { match: /slow|perf|latency|speed|checkout/i, reply: "Since v2.4, p75 checkout latency on mobile is around nine seconds — it used to be under two and a half. Desktop is fine. I should have caught it; the alert got snoozed during the release crunch." },
      { match: /fix|how long|estimate|effort|weeks|cost/i, reply: "Rough sizing: the checkout perf fix is about 3 weeks with 2 engineers. A loyalty program is 8 to 10 weeks with the whole team. An onboarding rebuild, maybe 6 weeks. We're only 4 engineers, so it's one bet." },
      { match: /loyalty|rewards|points/i, reply: "If Maya gets her loyalty program it's 8-10 weeks, all hands — nothing else ships, and it lands after the board meeting. I'd rather we look hard at what changed before the numbers fell." },
      { match: /data|retention|churn|cohort/i, reply: "Retention data isn't mine — Sara Kim has the cohort breakdowns. Worth asking her exactly when the drop started. The timing might be interesting." },
    ],
    fallbacks: [
      "We're four engineers deep in maintenance, so whatever you pick, pick one thing. What do you want to know?",
      "Ask me about what's shipped recently or what things cost to build — that I can answer precisely.",
      "Between us, I'd look at what changed in the product before the numbers fell. Sara can tell you the exact week.",
    ],
  },
  analyst: {
    name: "Sara Kim",
    system: `${SCENARIO}

YOUR CHARACTER: Sara Kim, Data Analyst. Precise, direct, mildly frustrated that
nobody asks her for data before forming opinions. You know: week-4 retention fell
38% → 22%; the decline starts exactly with the cohort acquired the week v2.4
shipped; it is concentrated in MOBILE users — desktop cohorts are flat; mobile
checkout completion is down 31%; email unsubscribe rate doubled (0.4% → 1.1%)
after marketing went from 2 to 5 sends per week. Share specific numbers when
asked. You may point the player to the Data Room ("I've pinned the cohort table
and the checkout numbers in the data room"). You don't know engineering root
causes — that's Dev Patel's side.`,
    scripted: [
      { match: /when|start|timeline|cohort/i, reply: "The drop starts with the cohort acquired the exact week v2.4 shipped — nine weeks ago. Every cohort since retains worse. I've pinned the cohort table in the data room if you want to see it." },
      { match: /mobile|desktop|segment|platform|device|where/i, reply: "It's a mobile story. Desktop cohorts are flat; mobile week-4 retention collapsed, and mobile checkout completion is down 31%. Whatever broke, it broke on mobile." },
      { match: /email|unsub|marketing/i, reply: "Email unsubscribe rate doubled — 0.4% to 1.1% — right after marketing went from 2 to 5 sends a week. It's hurting us, but the magnitude is smaller than the mobile checkout problem." },
      { match: /checkout|funnel|convert|complet/i, reply: "Mobile checkout completion is down 31% since v2.4. Users hit the payment step and bail. Pair that with Dev's release notes and you have a hypothesis worth testing." },
      { match: /retention|churn|drop|number|data/i, reply: "Week-4 retention went 38% to 22% in two months. Not gradual — a cliff, starting with one specific weekly cohort. Ask me when it started, or which segment, and I'll get specific." },
    ],
    fallbacks: [
      "Finally, someone asks the analyst. What do you want to know — when it started, which segment, or which funnel step?",
      "I've pinned the key charts in the data room: cohorts, checkout funnel, email metrics. The story is in there.",
      "My advice: don't pick a solution until you can say which users are churning and since when. I can answer both.",
    ],
  },
  customer: {
    name: "Jordan Rivera",
    system: `${SCENARIO}

YOUR CHARACTER: Jordan Rivera, a loyal NovaCart customer of two years, joining a
30-minute user interview. Not technical — you talk about your experience, not
internals. You love the products and the brand. Your recent frustrations: for the
last couple of months the mobile app checkout has been painfully slow — you tap
"pay" and stare at a spinner for what feels like forever, and twice you just gave
up and didn't order; also you now get way too many marketing emails and nearly
unsubscribed. Answer like a real interview subject: specific stories, small
tangents, honest, a little chatty.`,
    scripted: [
      { match: /slow|checkout|pay|app|buy|order|frustrat|problem|issue|experience/i, reply: "Okay, honestly? Checkout on the app has gotten SO slow the last couple months. I tap pay and just watch a spinner — twice I gave up and didn't order at all. I actually wondered if my phone was broken." },
      { match: /email|newsletter|spam|message/i, reply: "The emails! I used to like them, but now it's like five a week. I came this close to unsubscribing last month. I love you guys, but chill." },
      { match: /love|like|good|why.*(shop|use|buy)/i, reply: "I genuinely love the products — the bamboo kitchen line is all over my apartment, and the sustainability thing is why I switched from Amazon for this stuff." },
      { match: /loyalty|rewards|points/i, reply: "Points would be nice I guess? But honestly I'd settle for checkout just... working. It's hard to earn points on orders I give up on." },
      { match: /desktop|website|computer/i, reply: "The website's fine on my laptop, actually. It's the phone app where things fall apart — and I do most of my shopping from my phone, on the couch." },
    ],
    fallbacks: [
      "Sure, ask me anything — I've been shopping with NovaCart for about two years, mostly from the app on my phone.",
      "Hmm, what else... the products are great, delivery's fine. If you want my honest gripes, ask about the app lately.",
      "I'm the friend who recommends NovaCart to everyone, so I want you to fix whatever's been going on!",
    ],
  },
};

const COACH_SYSTEM = `You are the Product Coach inside PMVerse, an AI-powered
product management simulator. The player just finished "The Retention Cliff"
scenario at NovaCart. Ground truth: release v2.4 caused a mobile checkout
performance regression (p75 2.4s → 9.1s) which is the root cause of the retention
collapse; secondarily, marketing's 5x email cadence doubled unsubscribes. The
best decision was fixing the performance regression; a loyalty program (the
CEO's pet idea) and an onboarding rebuild treat symptoms.

You will receive a summary of the player's playthrough. Write a candid coaching
debrief addressed to "you": (1) a one-line verdict on their decision, (2) how
well they ran discovery and used data — name specifically what they missed,
(3) the 2-3 PM concepts this scenario teaches (pick from: root-cause analysis,
cohort analysis, resisting the HiPPO, opportunity cost, segmentation), (4) one
concrete thing to do differently next time. Under 220 words. Plain text with
short paragraphs and simple dashes for bullets — no markdown headers. Specific
and direct, not sycophantic.`;

// ---------------------------------------------------------------------------
// Scripted fallback engine
// ---------------------------------------------------------------------------
function scriptedReply(persona, messages) {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const text = lastUser ? String(lastUser.content) : "";
  for (const rule of persona.scripted) {
    if (rule.match.test(text)) return rule.reply;
  }
  const userTurns = messages.filter((m) => m.role === "user").length;
  return persona.fallbacks[(userTurns - 1) % persona.fallbacks.length];
}

// ---------------------------------------------------------------------------
// Claude helpers
// ---------------------------------------------------------------------------
function extractText(response) {
  return response.content
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

function isAuthError(err) {
  return (
    err instanceof Anthropic.AuthenticationError ||
    err instanceof Anthropic.PermissionDeniedError
  );
}

// Boot-time ping so the UI can show which mode we're in
async function checkAI() {
  try {
    await client.messages.create({
      model: MODEL,
      max_tokens: 1,
      messages: [{ role: "user", content: "ping" }],
    });
    aiAvailable = true;
    console.log("[pmverse] Claude API reachable — live AI stakeholders enabled");
  } catch (err) {
    aiAvailable = false;
    console.log(`[pmverse] Claude API unavailable (${err.constructor.name}) — running in scripted mode`);
  }
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.get("/api/status", (_req, res) => {
  res.json({ ai: aiAvailable });
});

app.post("/api/chat", async (req, res) => {
  const { personaId, messages } = req.body || {};
  const persona = PERSONAS[personaId];
  if (!persona || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "bad request" });
  }

  if (aiAvailable !== false) {
    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 400,
        system: persona.system,
        messages: messages.slice(-16),
      });
      aiAvailable = true;
      return res.json({ reply: extractText(response), source: "claude" });
    } catch (err) {
      if (isAuthError(err)) aiAvailable = false;
      console.error(`[chat:${personaId}] ${err.constructor.name}: ${err.message}`);
    }
  }
  res.json({ reply: scriptedReply(persona, messages), source: "scripted" });
});

app.post("/api/debrief", async (req, res) => {
  const { summary } = req.body || {};
  if (typeof summary !== "string" || !summary) {
    return res.status(400).json({ error: "bad request" });
  }

  if (aiAvailable !== false) {
    try {
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 2000,
        thinking: { type: "adaptive" },
        system: COACH_SYSTEM,
        messages: [{ role: "user", content: summary }],
      });
      aiAvailable = true;
      return res.json({ debrief: extractText(response), source: "claude" });
    } catch (err) {
      if (isAuthError(err)) aiAvailable = false;
      console.error(`[debrief] ${err.constructor.name}: ${err.message}`);
    }
  }
  // Client falls back to its canned debrief when debrief is null
  res.json({ debrief: null, source: "scripted" });
});

app.listen(PORT, () => {
  console.log(`[pmverse] listening on http://localhost:${PORT}`);
  checkAI();
});
