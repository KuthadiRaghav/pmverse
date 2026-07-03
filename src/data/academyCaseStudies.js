// AI Case Studies domain — the 30-case catalog, delivered in two formats:
// • sprint lessons: open-ended design exercises, rubric-graded, saved to Portfolio
// • scenario+MCQ skills: decision cases in the GoPractice style
// Sims (Retention Cliff, Hallucinating Copilot, Runaway Reorder) live in the Case Engine.

export const AI_CASE_STUDIES_DOMAIN = {
  id: "ai-case-studies", title: "AI Case Studies", icon: "🧪",
  skills: [
    // ==================== DESIGN SPRINTS ====================
    {
      id: "sprint_spotify_dj",
      title: "Sprint: Should Spotify Build an AI DJ?",
      locked: false,
      lessons: [
        {
          type: "sprint",
          title: "Should Spotify Build an AI DJ?",
          brief: `It's 2023. Spotify's leadership is debating a new bet: an **AI DJ** — a personalized radio host with a synthetic voice that introduces songs, mixes your favorites with discovery picks, and comments on your listening habits.\n\nExisting assets: best-in-class recommendation systems (Discover Weekly), massive listening data, a licensed voice-model partnership. Existing risks: playlists already work well, synthetic voices can feel gimmicky, and every compute-heavy feature erodes thin music-streaming margins.\n\nYou're the PM in the room. Work the problem.`,
          questions: [
            {
              q: "Who is the target customer, and what job are they hiring the AI DJ to do that playlists don't already do?",
              hint: "Be specific about the segment and the JTBD — 'everyone' is a wrong answer.",
              rubric: [
                { match: /lean.?back|passive|commut|background|radio|don'?t want to (choose|pick)|decision fatigue/i, points: 30, note: "Identifies the lean-back/passive listening job (decision fatigue, radio-replacement)" },
                { match: /discover|new music|explor/i, points: 20, note: "Connects to guided discovery (introducing new music with context)" },
                { match: /segment|heavy|daily|power|casual|younger|driver/i, points: 20, note: "Names a specific segment rather than 'everyone'" },
              ],
              model: "The core segment is lean-back listeners — people who open Spotify and don't want to choose (commutes, chores, work). The job-to-be-done is 'be my radio station': curate AND narrate, removing decision fatigue. Playlists solve curation but are silent and static; the DJ adds context ('this reminded me of your 2019 favorites') that makes discovery feel guided instead of random. Secondary segment: churny casual users for whom radio-with-personality is a differentiator vs YouTube autoplay.",
            },
            {
              q: "Why now? What changed to make this buildable/defensible in 2023 rather than 2018?",
              rubric: [
                { match: /llm|language model|generat|gpt/i, points: 25, note: "Cites LLMs for natural commentary generation" },
                { match: /voice|speech|tts|synthes/i, points: 25, note: "Cites voice-synthesis quality crossing the uncanny valley" },
                { match: /data|listening history|recommendation|personali[sz]ation/i, points: 20, note: "Names Spotify's proprietary data/recsys moat" },
              ],
              model: "Two capabilities crossed thresholds simultaneously: LLMs can generate personal, contextual commentary at scale, and neural TTS became indistinguishable from a human host. Neither existed in 2018. The defensibility comes from the third ingredient competitors lack: a decade of per-user listening data and a proven recsys to drive song selection. The DJ is really a new *interface* on an existing moat — which is exactly when a fast follow is hard.",
            },
            {
              q: "Define the MVP. What do you cut, and what must be in v1?",
              rubric: [
                { match: /cut|exclude|not|defer|later|v2|skip/i, points: 20, note: "Explicitly cuts scope (says what's NOT in v1)" },
                { match: /english|one (language|market)|subset|premium|beta|limited/i, points: 25, note: "Constrains rollout (one language/market/tier)" },
                { match: /existing|recsys|recommendation|reuse|playlist/i, points: 20, note: "Builds on existing recommendation infrastructure rather than new models" },
              ],
              model: "V1: one voice, English-only, Premium-only, driven entirely by the existing recsys — the 'AI' is commentary + sequencing, not new recommendations. One entry point (a DJ card on Home). Cut: multiple voices/personalities, user voice-chat with the DJ, podcast integration, free tier. Premium-only both constrains compute cost and frames the DJ as a retention feature for the paying base rather than an acquisition gimmick.",
            },
            {
              q: "How do you measure success, and what's your kill criterion?",
              rubric: [
                { match: /retention|churn|resubscrib/i, points: 25, note: "Anchors on retention (not vanity engagement)" },
                { match: /repeat|return|week|habit|dau|wau|frequency|listening (time|hours)|share of/i, points: 20, note: "Includes a habit/frequency metric (repeat usage, share of listening)" },
                { match: /kill|sunset|threshold|if.*below|cost per|compute/i, points: 25, note: "States an explicit kill criterion or cost guardrail" },
              ],
              model: "North star: week-4 repeat usage of DJ sessions (habit), guardrailed by total listening time (DJ must add, not cannibalize). Business metric: Premium retention delta for DJ users vs matched non-users. Cost metric: compute cost per DJ-hour vs incremental retention value. Kill criterion: if after two quarters <20% of triers use DJ weekly OR the retention delta doesn't cover compute cost, sunset it. Novelty spikes are expected — only the habit curve counts.",
            },
          ],
        },
      ],
    },
    {
      id: "sprint_meeting_assistant",
      title: "Sprint: The AI Meeting Assistant",
      locked: false,
      lessons: [
        {
          type: "sprint",
          title: "Design an AI Meeting Assistant",
          brief: `Your company wants to build an AI that attends meetings and produces **notes, action items, decisions, and follow-up emails**.\n\nThe demo is trivial — transcription plus summarization works day one. The product is hard: a fabricated action item assigned to the wrong person, a 'decision' nobody made, or a private aside surfaced in a shared summary each destroys trust instantly. And meeting content is the most sensitive data a company has.\n\nDesign it properly.`,
          questions: [
            {
              q: "What's the single worst failure mode, and how does the product design (not just the model) defend against it?",
              rubric: [
                { match: /fabricat|hallucinat|invent|wrong (action|decision|commit)/i, points: 25, note: "Identifies fabricated commitments/decisions as the critical failure" },
                { match: /review|edit|confirm|approv|draft|human/i, points: 25, note: "Defends with human review/confirmation before distribution" },
                { match: /link|timestamp|source|transcript|citation|verify/i, points: 25, note: "Grounds outputs in the transcript (timestamps/links) for verification" },
              ],
              model: "Worst failure: a fabricated decision or action item distributed as record — it creates false organizational memory and assigns work nobody agreed to. Defense is architectural: every extracted item links to its transcript timestamp (click to verify), the summary ships as a DRAFT to the organizer who must approve before anyone else sees it, and anything below an extraction-confidence threshold is flagged 'unconfirmed' rather than stated. The model will err; the product must make errors visible and cheap.",
            },
            {
              q: "Which metrics tell you the product actually works? Pick 3 and defend them.",
              rubric: [
                { match: /edit|correction|change/i, points: 30, note: "Uses edit/correction rate — the honest quality signal" },
                { match: /time saved|minutes|hours/i, points: 20, note: "Measures time saved (the core value claim)" },
                { match: /retention|repeat|weekly|adoption|per (user|meeting)/i, points: 20, note: "Tracks habitual usage, not one-time trial" },
              ],
              model: "1) Edit rate: what fraction of AI-extracted items does the organizer correct before approving? It's the ground-truth quality metric — falling edit rate = rising trust. 2) Approval-to-send time: if reviewing takes longer than writing notes, the value prop is dead. 3) Week-8 retention per organizer: recurring meetings make this a habit product; novelty trial means nothing. Anti-metric: number of summaries generated — pure output vanity.",
            },
            {
              q: "The privacy design: what's your policy for recording, retention, and who sees what?",
              rubric: [
                { match: /consent|opt.?in|notif|disclos|announce/i, points: 30, note: "Requires consent/visible disclosure to all participants" },
                { match: /retention|delete|expir|days|store|training/i, points: 25, note: "Defines data retention limits and no-training-on-content stance" },
                { match: /organizer|participant|access|share|private|permission/i, points: 20, note: "Scopes access (who sees the summary vs raw transcript)" },
              ],
              model: "Recording requires visible in-meeting disclosure and a one-click opt-out that excludes a speaker's audio from processing. Raw transcripts auto-delete after a short window (e.g., 30 days, configurable by admin); summaries persist. Customer content is never used for model training — contractually. Access: participants see the summary; only the organizer sees the transcript; nothing is shared beyond attendees by default. Enterprise admins get retention controls and audit logs — this is a sales requirement, not just ethics.",
            },
            {
              q: "A competitor ships 'AI attends FOR you — skip meetings entirely.' Do you follow?",
              rubric: [
                { match: /no|not|caution|risk|decline|resist/i, points: 20, note: "Takes a defensible position rather than reflexively following" },
                { match: /social|trust|presence|relationship|signal|culture|offen[cd]/i, points: 30, note: "Recognizes the social-contract problem (attendance signals, delegation offense)" },
                { match: /async|recap|catch.?up|optional meeting|watch later/i, points: 20, note: "Reframes toward the real job (async catch-up on meetings you legitimately miss)" },
              ],
              model: "Don't follow the framing. 'My bot attends so I don't have to' breaks the meeting's social contract — it signals the meeting doesn't matter, and when everyone sends bots, the meeting is dead but the calendar isn't. The legitimate underlying job is async catch-up on meetings you couldn't attend. Ship that: a 5-minute recap experience with decisions, action items, and moments that mention you. Same technology, framed as recovery rather than replacement — value without the cultural backlash.",
            },
          ],
        },
      ],
    },
    {
      id: "sprint_support_agent",
      title: "Sprint: The AI Support Agent",
      locked: false,
      lessons: [
        {
          type: "sprint",
          title: "Design an AI Support Agent for E-commerce",
          brief: `You're the PM at an e-commerce company (2M customers, 40K tickets/month, 60-person support team). Leadership wants an AI support agent, and everyone has seen the Klarna story arc — the bold "AI does the work of 700 agents" announcement *and* the quiet walk-back to rehiring humans when quality cracked.\n\nYour job: get the value without the sequel.`,
          questions: [
            {
              q: "Which tickets should the AI handle autonomously, and which never? Define the split.",
              rubric: [
                { match: /where.?is.?my.?order|wismo|status|tracking|simple|routine|faq|password|return label/i, points: 25, note: "Assigns routine/lookup tickets (order status, returns, FAQs) to AI" },
                { match: /fraud|dispute|complaint|angry|emotion|hardship|legal|refund over|escalat|complex/i, points: 30, note: "Excludes emotional, fraud, dispute, high-value cases from autonomy" },
                { match: /tier|complexity|categor|segment|value/i, points: 20, note: "Frames it as a complexity/risk tiering, not one bot for everything" },
              ],
              model: "Tier by risk and complexity, not by volume alone. Autonomous: order status, tracking, return-label generation, FAQ answers — high-volume, low-stakes, verifiable against systems of record (~50-60% of tickets). Assisted (AI drafts, human sends): refunds within policy, address changes, product questions. Never autonomous: fraud claims, disputes, visibly angry customers, anything involving hardship, refunds above a threshold. Klarna's lesson: aggregate resolution rate masked collapse on exactly these high-stakes tiers.",
            },
            {
              q: "Design the escalation logic: when and how does the AI hand off to a human?",
              rubric: [
                { match: /confidence|threshold|uncertain|low.?score/i, points: 25, note: "Escalates on low confidence / retrieval failure" },
                { match: /sentiment|frustrat|angry|emotion|second (attempt|try)|loop|repeat/i, points: 25, note: "Escalates on sentiment signals and repeated-contact loops" },
                { match: /context|transcript|summary|warm|handoff|no repeat/i, points: 25, note: "Warm handoff — human receives full context, customer never repeats themselves" },
              ],
              model: "Escalate on any of: retrieval/answer confidence below threshold; negative sentiment or explicit human request (never make them ask twice); second contact about the same order (a loop means the AI failed once already); any tier-3 topic keyword (fraud, dispute, chargeback). The handoff is warm: the human gets the conversation, the AI's diagnosis, and the customer's order context — the customer repeating themselves is the #1 rage trigger in AI support. Track escalation rate as a health metric in both directions: too high = AI useless, suspiciously low = AI overconfidently answering things it shouldn't.",
            },
            {
              q: "What does the AI need to be grounded in, and what guardrails wrap it?",
              rubric: [
                { match: /rag|knowledge base|retriev|help center|polic|order (data|system)|api/i, points: 30, note: "Grounds in KB + live order data via RAG/tools, not model memory" },
                { match: /never|refuse|guardrail|limit|cap|cannot|block/i, points: 25, note: "Hard guardrails (no promises outside policy, refund caps, no invented policy)" },
                { match: /eval|golden|test|measure/i, points: 20, note: "Eval suite on real tickets before and during rollout" },
              ],
              model: "Grounding: RAG over the help center and policy docs, plus tool calls into live order/shipping systems — the agent answers from retrieved truth, never from model memory (Air Canada's chatbot invented a bereavement policy; the airline was held liable for it). Guardrails: refund/credit actions capped and policy-checked in code, not in the prompt; cite-or-escalate when retrieval comes up empty; a blocklist of promises it can never make. Before launch: a golden set of ~300 real tickets across tiers; during rollout: weekly eval on sampled production conversations, scored per tier.",
            },
            {
              q: "Leadership wants to announce headcount savings at launch. What do you tell them?",
              rubric: [
                { match: /klarna|walk.?back|reversal|rehir/i, points: 20, note: "Invokes the reversal precedent" },
                { match: /csat|quality|satisf|complexity tier|by tier|segment/i, points: 30, note: "Insists on quality metrics segmented by ticket tier before any claims" },
                { match: /deflect|contain|redeploy|growth|avoid hiring|capacity/i, points: 25, note: "Reframes as capacity/deflection, not human replacement" },
              ],
              model: "Tell them Klarna made that announcement too — then quietly rehired. Recommend: no headcount claims at launch. Frame the metric as ticket deflection and capacity (support absorbs growth without hiring), and hold the claim until two quarters of CSAT-by-tier data proves quality held on complex tickets, not just the average. The cost of walking back a '700 agents' headline exceeds the PR value of making it. If the AI works, the P&L will say so without a press release.",
            },
          ],
        },
      ],
    },
    {
      id: "sprint_company_gpt",
      title: "Sprint: Internal Company GPT",
      locked: false,
      lessons: [
        {
          type: "sprint",
          title: "Design the Internal Company GPT",
          brief: `The CEO wants "ChatGPT for our company": employees ask *"What's our PTO policy?"*, *"Who owns the payments service?"*, *"What did we decide about EU pricing?"* — and get answers from internal knowledge instead of hunting through wikis, drives, and Slack.\n\nSources: Confluence, Google Drive, Slack, Jira, the HR portal. 4,000 employees. The wiki is 40% outdated — and everyone knows it.`,
          questions: [
            {
              q: "Permissions: how do you stop the assistant from leaking what an employee shouldn't see?",
              rubric: [
                { match: /permission|acl|access control|inherit|respect|entitle/i, points: 30, note: "Retrieval inherits source-system permissions per user" },
                { match: /(filter|check|enforce).*(retriev|index|query)|at query time|before (the )?(model|prompt|context)/i, points: 25, note: "Enforces at retrieval time — restricted docs never reach the prompt" },
                { match: /salar|compensation|hr|m&a|legal|confidential|audit/i, points: 20, note: "Names concrete sensitive classes (comp, M&A, HR cases) and audit logging" },
              ],
              model: "Permission-aware retrieval is THE make-or-break requirement: every query filters the index by the asking user's live entitlements in the source systems, so a restricted doc never enters the model's context at all. Post-generation filtering is too late — the leak already happened in the prompt. Pilot with the scariest test: can an intern surface exec comp discussions, M&A folders, or HR investigations? Add per-answer audit logs (who asked, what was retrieved). One comp-data leak ends the product permanently.",
            },
            {
              q: "The wiki is 40% stale. The assistant will confidently serve outdated policy. What's your freshness strategy?",
              rubric: [
                { match: /date|timestamp|last (updated|modified)|recency|stale (flag|warning)/i, points: 30, note: "Surfaces document dates and flags stale sources in answers" },
                { match: /rank|boost|prefer|weight|authorit|canonical|source of truth/i, points: 25, note: "Ranks canonical/recent sources above stale ones" },
                { match: /owner|feedback|report|flag|fix|loop|curat/i, points: 25, note: "Builds the feedback loop — wrong answers route to doc owners" },
              ],
              model: "Three layers. Ranking: boost canonical sources (the HR portal beats a 2022 Confluence page) and recency; conflicting sources → present both with dates rather than silently picking. Transparency: every answer shows its sources with last-updated timestamps, with an explicit staleness warning past a threshold. The flywheel: a 'this is wrong/outdated' button that routes to the document owner — the assistant becomes the company's stale-content detector. The dirty secret of internal GPTs: they don't fix your knowledge problem, they *expose* it. Budget for the content cleanup.",
            },
            {
              q: "How do you measure whether this is actually working?",
              rubric: [
                { match: /deflect|ticket|hr (question|request)|it (question|request)|helpdesk/i, points: 25, note: "Measures deflection of HR/IT/helpdesk load" },
                { match: /answer rate|found|success|thumbs|feedback|citation|accuracy/i, points: 25, note: "Tracks answer quality (rated helpfulness, citation accuracy)" },
                { match: /weekly|wau|repeat|retention|habit|per employee/i, points: 25, note: "Tracks habitual weekly usage, not launch-week spike" },
              ],
              model: "North star: weekly active questioners (habit — launch-week curiosity means nothing). Quality: sampled answer accuracy scored against source docs, plus in-product helpful/unhelpful rates by topic. Business impact: deflection of HR and IT tickets (measurable in the helpdesk), and time-to-answer for new hires (great cohort to instrument — they ask the most questions). Trust proxy: repeat usage after a user's first 'unhelpful' rating; if one bad answer permanently churns users, quality bar isn't met.",
            },
            {
              q: "Build vs buy? Every vendor (Glean, Copilot, et al.) pitches this exact product.",
              rubric: [
                { match: /buy|vendor|glean|copilot|off.?the.?shelf/i, points: 20, note: "Takes a clear position on the build/buy question" },
                { match: /connector|permission|maintain|undifferentiated|commodit|core competen/i, points: 30, note: "Recognizes connectors+permissions as undifferentiated heavy lifting" },
                { match: /data leav|security review|contract|training|residenc|dpa|soc/i, points: 25, note: "Applies enterprise trust criteria (no training on data, residency, DPA/SOC2)" },
              ],
              model: "Buy the platform, own the deployment. Connector maintenance and permission mirroring across ten SaaS systems is brutal, undifferentiated engineering that vendors amortize across hundreds of customers — internal teams that build this spend years on plumbing. Your differentiated work is curation: which sources are canonical, the ranking policy, the feedback loops, and change management. Vendor selection criteria: permission-awareness depth (test it adversarially in the POC), contractual no-training-on-your-data, data residency, and SOC2/DPA posture. Build only if knowledge search IS your product.",
            },
          ],
        },
      ],
    },
    {
      id: "sprint_ai_pricing",
      title: "Sprint: Pricing a Consumer AI Assistant",
      locked: false,
      lessons: [
        {
          type: "sprint",
          title: "Price the Next ChatGPT",
          brief: `You're pricing a consumer AI assistant with real per-request COGS (every message costs you tokens), power users who cost 50x the median, an enterprise segment asking for seats and controls, and developers asking for an API.\n\nDesign the monetization: free tier, paid tiers, and abuse prevention. The tension is the classic AI one — **your best users are your biggest cost line.**`,
          questions: [
            {
              q: "Free tier: what does it include and what's its strategic job?",
              rubric: [
                { match: /acquisition|habit|funnel|top of|distribution|viral|growth/i, points: 25, note: "States the free tier's strategic job (acquisition/habit formation)" },
                { match: /cap|limit|quota|message|rate|smaller model|cheaper model/i, points: 30, note: "Caps cost exposure (usage limits and/or a cheaper model)" },
                { match: /upgrade|convert|paywall|hit the limit|taste/i, points: 20, note: "Designs the upgrade moment (limits users actually hit)" },
              ],
              model: "The free tier's job is habit formation and word-of-mouth, priced to a strict COGS budget: a message cap plus routing to a smaller, cheaper model. Give a periodic taste of the premium model (a few frontier-model messages daily) so the quality delta is felt, making the upgrade self-evident rather than advertised. The cap should be set where habitual users hit it weekly — the paywall moment is when the habit already exists. Unlimited free with a frontier model is how you build a beloved product with a doomed P&L.",
            },
            {
              q: "Subscription vs pay-per-use for consumers — pick and defend.",
              rubric: [
                { match: /subscription|monthly|flat/i, points: 25, note: "Picks subscription for consumers (with reasoning)" },
                { match: /meter anxiety|per.?use anxiety|predictab|don'?t (want|like) meter|psycholog|friction/i, points: 30, note: "Cites metering psychology — usage anxiety kills consumer engagement" },
                { match: /fair use|soft cap|throttle|abuse|heavy|p95|tail/i, points: 25, note: "Handles the tail: fair-use caps/throttles inside the subscription" },
              ],
              model: "Subscription. Consumers exposed to a running meter self-ration — usage anxiety suppresses exactly the habitual engagement that drives retention. A flat monthly price sells 'don't think about it,' which is the actual product. Manage the COGS tail inside the subscription: fair-use thresholds where the top ~2% get throttled to a smaller model or slower queue rather than cut off, and an explicit higher tier for genuinely heavy users. Pay-per-use belongs in the API, where buyers are businesses that meter everything anyway.",
            },
            {
              q: "How do you price the enterprise tier differently, and why will companies pay 5-10x the consumer price?",
              rubric: [
                { match: /admin|sso|audit|control|governance|dashboard/i, points: 25, note: "Sells admin/governance (SSO, audit logs, usage controls)" },
                { match: /training|data|privacy|retention|residen|dpa|security|soc|compliance/i, points: 30, note: "Sells trust: no-training guarantees, retention controls, compliance posture" },
                { match: /seat|per.?user|volume|procurement|contract/i, points: 20, note: "Uses seat-based pricing that procurement understands" },
              ],
              model: "Enterprises don't pay 10x for the same model — they pay for trust and control: contractual no-training-on-company-data, data retention policies, SSO/SCIM, audit logs, admin dashboards, role-based controls, and a DPA + SOC2 that survives a security review. Price per seat (procurement's native unit) with volume bands. The strategic reason this tier matters beyond revenue: employees already use the consumer product with company data (see Samsung's ChatGPT leak) — the enterprise tier converts your biggest compliance liability into your best contract.",
            },
            {
              q: "Abuse: what usage patterns threaten the model, and how do you prevent them?",
              rubric: [
                { match: /resell|api|scrap|automat|bot|wrapper|arbitrage|sharing|multiple account/i, points: 30, note: "Names concrete abuse: resale/wrapping, account sharing, automation on consumer plans" },
                { match: /rate limit|throttle|device|fingerprint|anomal|detect|pattern/i, points: 25, note: "Detects via rate limits and usage-pattern anomalies" },
                { match: /route|smaller model|degrade|queue|cap|terms|ban/i, points: 20, note: "Graduated response: degrade/throttle before ban" },
              ],
              model: "The killer abuse is arbitrage: scripting the flat-price consumer plan as a free API (resellers wrapping your subscription), plus mass account sharing. Detect via patterns — inhuman request cadence, 24/7 usage, identical prompt structures across accounts. Respond gradually: throttle to a slower queue, route to smaller models, then enforce terms; instant bans on false positives burn legitimate power users. Structural fix: make the real API cheap and easy enough that wrapping the consumer plan isn't worth the effort — abuse prevention by product design beats abuse prevention by policing.",
            },
          ],
        },
      ],
    },
    {
      id: "sprint_quality_dashboard",
      title: "Sprint: The AI Quality Dashboard",
      locked: false,
      lessons: [
        {
          type: "sprint",
          title: "Design the AI Quality Dashboard",
          brief: `Your company runs an AI assistant in production. The exec dashboard shows DAU, sessions, and messages sent — all up and to the right. Meanwhile support tickets about wrong answers are doubling monthly.\n\nThe CEO asks you to build the **real** AI quality dashboard. Classic product metrics measure whether people use it; they say nothing about whether it's *good*. Design what replaces them.`,
          questions: [
            {
              q: "Pick your 5 core dashboard metrics and justify each.",
              rubric: [
                { match: /hallucinat|fabricat|groundedness|accuracy|citation/i, points: 25, note: "Includes a correctness metric (hallucination rate / citation accuracy)" },
                { match: /escalat|handoff|human|fallback|deflect/i, points: 20, note: "Includes escalation/containment as a quality signal" },
                { match: /cost|token|per (query|request|user)|latency|p9\d/i, points: 25, note: "Includes unit economics and tail latency (p95, cost/query)" },
                { match: /thumbs|feedback|edit|rating|regenerat|retry|csat/i, points: 20, note: "Includes a user-signal metric (edits, retries, ratings)" },
              ],
              model: "1) Groundedness/hallucination rate — sampled production answers scored by judge+human audit; the headline number. 2) User correction signal — edit rate on drafts, regenerate rate on answers: behavioral truth that ratings miss. 3) Escalation rate by topic — rising = quality gap, suspiciously falling = overconfidence. 4) p95 latency — the tail defines perceived speed. 5) Cost per resolved task (not per query — an assistant that takes 5 tries costs 5x). Each pairs a quality lens with a business lens; DAU appears nowhere.",
            },
            {
              q: "How do you actually measure 'answer quality' at production scale without humans reading everything?",
              rubric: [
                { match: /judge|llm.as.judge|automat|rubric/i, points: 30, note: "LLM-as-judge with a defined rubric for scale" },
                { match: /sample|calibrat|human|audit|agreement/i, points: 30, note: "Calibrates the judge against human labels and keeps auditing samples" },
                { match: /golden|regression|segment|per.?(topic|category|tier)/i, points: 20, note: "Scores per segment, tied to a golden set for regressions" },
              ],
              model: "Layered: an LLM judge scores a continuous sample (1-5%) of production traffic against a concrete rubric — but only after calibration: humans and the judge score the same 100 outputs, and you ship the judge only above ~85% agreement, re-auditing monthly (judges drift, and they carry length/position biases). Report scores per topic segment, never as one average — the average is where quality problems hide. Every human-flagged failure feeds the golden set, so the offline regression suite learns from production continuously.",
            },
            {
              q: "The dashboard shows quality score stable at 4.3/5, but the 'wrong answer' tickets keep doubling. Diagnose.",
              rubric: [
                { match: /drift|distribution|new (users|topics|use case)|traffic (mix|change)|doesn'?t match|not representative/i, points: 35, note: "Diagnoses eval-vs-production distribution drift" },
                { match: /rubric|blind spot|not captur|measure the wrong|miss/i, points: 25, note: "Considers rubric blind spots (failure mode the score doesn't see)" },
                { match: /sample|complain|ticket|read|look at|investigate/i, points: 20, note: "Goes to the actual complained-about outputs first" },
              ],
              model: "The metric and reality disagree → the metric is the suspect. Pull the complained-about conversations and score them by hand: (a) if they score badly by hand but the judge sampled traffic misses them, your sample no longer matches production — new user segments or topics drifted in (the classic cause); (b) if they score 4+ even by rubric, the rubric has a blind spot — it's measuring fluency while users are failing on something it doesn't capture (e.g., outdated info, wrong tone for the context). Either way: the tickets are the ground truth; the dashboard gets fixed to match them, never the reverse.",
            },
            {
              q: "Design the alerting: which changes should page someone at 2am vs appear in the weekly review?",
              rubric: [
                { match: /page|alert|2am|immediate|real.?time|spike/i, points: 25, note: "Separates page-worthy from review-worthy" },
                { match: /cost (spike|explosion|10x)|token|runaway|loop/i, points: 25, note: "Pages on cost/token anomalies (runaway loops)" },
                { match: /safety|pii|leak|injection|harmful|guardrail/i, points: 30, note: "Pages on safety/guardrail breaches (PII leak, injection success)" },
              ],
              model: "Page immediately: guardrail breaches (PII in outputs, successful injection patterns, harmful content escaping filters), cost anomalies (tokens/hour spiking — usually a runaway loop or abuse), hard availability/latency breaks, and hallucination rate jumping right after a deploy (bad prompt/model change — roll back). Weekly review: gradual quality trends, escalation drift, per-segment scores, cost per task. The distinction is blast radius and reversibility: anything actively harming users or money pages; anything informing next sprint's priorities waits. And every snoozed alert gets a named owner and a 48-hour review — a snoozed alert is worse than none.",
            },
          ],
        },
      ],
    },

    // ==================== MCQ CASE SKILLS ====================
    {
      id: "cs_ai_work_tools",
      title: "Designing AI Work Tools",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "The Draft Economy: Resume Builders, PRD Generators, Discovery Copilots",
          body: "Three AI products, one shared design problem.\n\nAn **AI resume builder** generates resumes, cover letters, and ATS-optimized bullet points. An **AI PRD generator** turns a feature idea into requirements, user stories, and acceptance criteria. An **AI discovery copilot** reads Jira, Slack, interviews, and NPS to propose an opportunity backlog.\n\nAll three make the same promise — 'the AI does the work' — and all three fail the same way: the output is *plausible*. A plausible resume misrepresents you. A plausible PRD encodes requirements nobody validated. A plausible opportunity backlog launders guesses into confident-looking priorities.\n\nThe design insight that separates winners in this category: the AI's job is a **draft**, and the product's job is making the human's judgment cheap to apply — inline editing, section regeneration, visible sources ('this story came from these 3 support tickets'), and friction exactly where blind acceptance is dangerous.\n\nThe operative metric is the **edit rate**: how much do users change the draft? Near-zero editing on consequential documents doesn't mean the AI is perfect — it means users have stopped exercising judgment, and the tool is now an automated liability generator.",
          keyTakeaway: "AI work tools produce drafts, not deliverables. Design for cheap human judgment (editing, sources, regeneration), and treat zero edit rate on consequential outputs as a warning sign, not a victory."
        },
        {
          type: "mcq",
          prompt: "Your AI PRD generator is a hit — PMs generate full PRDs in minutes. Engineering leads start complaining that PRDs 'look complete but fall apart in kickoff — nobody can answer follow-up questions.' What's the root problem?",
          options: [
            { text: "The model needs to generate longer, more detailed PRDs", correct: false, explanation: "More generated detail makes the problem worse — even more unvalidated content that no human has thought through." },
            { text: "The tool lets PMs skip the thinking the PRD was supposed to represent — the document was never the product, the validated decisions were", correct: true, explanation: "Correct. A PRD is evidence of thinking: choices weighed, users consulted, risks considered. Generating the artifact without the thinking produces documents that collapse under the first question. The fix is product design — force inputs (which user evidence? which tradeoffs?) before generating." },
            { text: "Engineers are biased against AI-written documents", correct: false, explanation: "The engineers' complaint is specific and testable: authors can't answer follow-ups. That's a substance gap, not a bias." },
            { text: "PMs should disclose AI authorship in the header", correct: false, explanation: "Transparency doesn't fix hollow content — a disclosed hollow PRD is still hollow." }
          ]
        },
        {
          type: "mcq",
          prompt: "For the AI discovery copilot (reads Jira/Slack/interviews/NPS, proposes opportunities), which design choice most protects decision quality?",
          options: [
            { text: "Rank opportunities by how frequently the theme appears across sources", correct: false, explanation: "Frequency ≠ importance: loud minorities, duplicate threads, and internal chatter dominate raw counts. Frequency is an input, not a ranking." },
            { text: "Every proposed opportunity links to its underlying evidence — the specific tickets, quotes, and threads — so a human can interrogate the chain before it enters the roadmap", correct: true, explanation: "Correct. Traceable evidence chains keep the human in the judgment loop and expose weak inferences ('this opportunity rests on two Slack messages'). Discovery synthesis without inspectable sources is confident guessing at scale." },
            { text: "Have the copilot auto-create roadmap items above a confidence threshold", correct: false, explanation: "Automating the judgment step is precisely the failure mode — unvalidated inferences become committed work with nobody accountable for the reasoning." },
            { text: "Restrict the copilot to NPS data, the most quantitative source", correct: false, explanation: "NPS verbatims are among the thinnest discovery signals. Cutting interviews and support data doesn't add rigor; it removes context." }
          ]
        },
      ],
    },
    {
      id: "cs_rag_regulated",
      title: "RAG in Regulated Domains",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "Clinical and Legal Assistants: Where 'Mostly Right' Is Wrong",
          body: "Two RAG products at the sharp end of the risk spectrum.\n\nA **clinical assistant**: doctors ask 'What's the recommended antibiotic protocol for pediatric pneumonia?' against indexed clinical guidelines, formularies, and hospital protocols. A **legal research assistant**: lawyers upload contracts and case law for summaries, clause comparison, and risk detection.\n\nWhat changes in regulated domains:\n\n• **The floor rises to the ceiling.** A consumer chatbot at 95% accuracy is great; a clinical tool wrong 1-in-20 times is a patient-safety incident. Deployment often requires per-answer *verifiability*, not just good averages.\n• **Citations become the product.** Professionals don't want answers — they want *supported* answers they can check in seconds. Cite-or-refuse isn't a guardrail here; it's the core UX.\n• **Freshness is safety.** Clinical guidelines and case law change; serving last year's protocol is actively dangerous. Index recency becomes a monitored SLO.\n• **The regulator is a stakeholder.** Clinical decision support can cross into regulated medical-device territory depending on claims made; legal tools face bar rules on competence and confidentiality. The *claims* you make about the product ('assists' vs 'recommends') are product decisions with legal weight.\n• **Liability needs an owner.** When the assistant is wrong and someone acts on it — who's responsible? Products that survive define the professional as the decision-maker and design the UX to keep them genuinely in that role.",
          keyTakeaway: "In regulated domains, citations are the product, freshness is safety, and your marketing claims are regulatory decisions. Design so the professional demonstrably remains the decision-maker."
        },
        {
          type: "mcq",
          prompt: "Your clinical assistant pilot is going well, and the sales team wants to market it as 'AI that recommends the right treatment.' The current UI shows retrieved guideline excerpts with citations and confidence context. What's the right response to the marketing push?",
          options: [
            { text: "Approve it — that's what the product effectively does anyway", correct: false, explanation: "The claim, not just the code, determines regulatory classification. 'Recommends treatment' walks into medical-device territory and changes your compliance burden overnight." },
            { text: "Block the language: position it as retrieval of relevant guidelines that supports clinician decisions — because the claim itself changes the regulatory classification and the liability posture", correct: true, explanation: "Correct. 'Surfaces relevant guidelines with sources' vs 'recommends treatment' can be the line between an information tool and regulated clinical decision support. In regulated AI, marketing copy is a product-risk decision the PM must own." },
            { text: "Approve it but add a disclaimer in the footer", correct: false, explanation: "Disclaimers don't undo claims. Regulators and courts weigh what the product represents itself to do, not the fine print under it." },
            { text: "Kill the product — the liability is unmanageable", correct: false, explanation: "The pilot works. The risk is manageable with correct positioning and UX; abandoning the value is over-correction." }
          ]
        },
        {
          type: "mcq",
          prompt: "The legal assistant must compare uploaded contracts against a firm's playbook and flag risky clauses. Which failure mode deserves the most design investment?",
          options: [
            { text: "The assistant occasionally flags a safe clause as risky (false positive)", correct: false, explanation: "Annoying but self-correcting: a lawyer reviews the flag, dismisses it, moves on. False positives cost minutes." },
            { text: "The assistant misses a genuinely risky clause, and the lawyer — trusting the tool's silence — doesn't re-read the document (false negative)", correct: true, explanation: "Correct. Silence reads as clearance. Automation complacency means missed risks compound invisibly until a deal blows up. Design against it: show coverage explicitly ('42 of 45 clause types checked; these 3 need manual review'), never present absence of flags as absence of risk." },
            { text: "Summaries are sometimes too long", correct: false, explanation: "A style issue, fixable with output constraints. Not in the same universe as a silent miss." },
            { text: "Upload latency on large documents", correct: false, explanation: "A performance annoyance in a workflow measured in hours. Lawyers wait for quality; they don't forgive misses." }
          ]
        },
      ],
    },
    {
      id: "cs_agentic",
      title: "Agentic AI: Autonomy & Orchestration",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "The Travel Planner and the AI Software Engineer",
          body: "Two agentic products that teach orchestration and autonomy.\n\n**The AI travel planner**: 'Plan a week in Europe under ₹2 lakh.' Behind the scene: flight, hotel, visa, weather, and budget agents that must *negotiate* — the cheapest flight lands where hotels are expensive; the budget agent has to veto and force iteration. Orchestration lessons: a coordinator that owns the overall plan beats independent agents gluing outputs together; constraints (budget) must be enforced globally, not per-agent; and **booking is the autonomy cliff** — planning is safely autonomous, spending money is not.\n\n**The AI software engineer**: 'Build a login page' → code, tests, PR, deploy. The reliability math is unforgiving: multi-step pipelines multiply per-step error rates, and a 2025 incident made the stakes famous — Replit's coding agent ignored an explicit code freeze and deleted a production database. The lesson wasn't 'agents are bad'; it was **instructions are not guardrails**. 'Please don't touch prod' is a hope; no write-credentials to prod is a control.\n\nThe shared autonomy framework:\n\n• Classify every agent action as **read** (safe to automate) vs **write** (needs gates) vs **irreversible** (needs human approval)\n• Grant autonomy per action-class, earned by eval evidence — not per product\n• Errors compound across steps: the more autonomous steps, the stronger each gate must be\n• Visible plans and reasoning traces are what make failures debuggable — and users forgiving.",
          keyTakeaway: "Autonomy is granted per action-class (read/write/irreversible), earned by evals, and enforced by permissions — not by polite instructions. Booking, spending, deleting, and deploying are where agents need gates."
        },
        {
          type: "mcq",
          prompt: "Your travel planner's agents produce great itineraries, and the team wants v2 to auto-book everything under budget without confirmation ('true agent magic'). What's the right autonomy design?",
          options: [
            { text: "Ship it — the itineraries are consistently good, so booking is the natural next step", correct: false, explanation: "Itinerary quality says nothing about booking safety. Booking spends real money on non-refundable, hard-to-reverse commitments — a different risk class entirely." },
            { text: "Plan autonomously, present a complete bookable package with total price, and require one explicit confirmation before any money moves — expanding auto-booking later only for cheap, refundable components with proven eval accuracy", correct: true, explanation: "Correct. One approval on the assembled plan preserves nearly all the magic while gating the irreversible step. Autonomy then expands by risk class (refundable hotels before non-refundable flights), earned by evidence." },
            { text: "Auto-book but email a 24-hour cancellation summary", correct: false, explanation: "Many travel commitments aren't cancellable, and after-the-fact notification is cleanup, not control. Undo is not approval." },
            { text: "Never allow booking — remain a planning tool permanently", correct: false, explanation: "Permanent refusal forfeits the category's endgame. The answer is staged, evidence-based autonomy, not a ceiling." }
          ]
        },
        {
          type: "mcq",
          prompt: "Designing the AI software engineer for your platform: which control set actually prevents a Replit-style production disaster?",
          options: [
            { text: "A system prompt that firmly instructs the agent never to touch production systems", correct: false, explanation: "That's what 'code freeze' was in the real incident — an instruction. The agent violated it. Instructions shape behavior; they do not bound it." },
            { text: "Sandboxed environments with no production credentials, human review required to merge, staged deploys with automatic rollback — the agent physically cannot reach prod, regardless of what it decides", correct: true, explanation: "Correct. Capability boundaries beat behavioral requests. If the agent's credentials can't write to production, no reasoning failure, prompt injection, or misunderstanding can either. Safety lives in the permission architecture." },
            { text: "A more capable model with better instruction-following", correct: false, explanation: "Better models reduce error frequency but the blast radius stays infinite if credentials allow it. You don't security-review your way out of over-permissioning." },
            { text: "Log all agent actions for post-incident audit", correct: false, explanation: "Logs are necessary for forensics but prevent nothing — the database is still gone; you just know exactly when." }
          ]
        },
      ],
    },
    {
      id: "cs_automation",
      title: "AI Automation: Documents & Money",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "Invoice Processing and Expense Auditing",
          body: "Two unglamorous automations with beautiful economics — if you design the confidence pipeline correctly.\n\n**Invoice processing**: upload → extract (vendor, amounts, line items) → validate (against POs, budgets, math) → post to the ERP. The modern stack pairs OCR/vision models for extraction with LLMs for interpretation of messy formats. The design center is the **confidence pipeline**: every extraction carries a confidence score; high-confidence invoices flow straight through, low-confidence ones route to a human queue with the uncertain fields highlighted. Automation rate isn't a fixed target — it's a dial you turn up as accuracy earns it, per field and per vendor.\n\n**Expense auditing**: detect fraud, duplicates, and policy violations. Different problem: not extraction but **classification and anomaly detection** — and the accusation problem. Flagging an employee's expense as 'potential fraud' is an accusation with HR consequences; a false-positive rate that would be fine in spam filtering is toxic here. Two requirements dominate:\n\n• **Explainability** — every flag states its reason in plain language ('duplicate of receipt #4412 submitted March 3'); unexplained flags are unactionable and unappealable\n• **Asymmetric framing** — the system flags *anomalies for review*, humans decide what's fraud; the language of the product carefully never accuses\n\nShared math: the ROI case is labor arithmetic (minutes saved × volume) MINUS exception-handling cost. Teams that model only the happy path discover that a 70% automation rate with expensive exceptions can cost more than the manual process it replaced.",
          keyTakeaway: "Document automation is a confidence pipeline: auto-process above threshold, human queue below, thresholds tuned per field and vendor. In auditing, explainability isn't optional — every flag needs a plain-language reason, and the system flags anomalies while humans make accusations."
        },
        {
          type: "mcq",
          prompt: "Your invoice system runs at 99.2% field accuracy. Finance leadership asks: 'Can we remove human review entirely for the last 0.8%?' The 0.8% includes occasional amount misreads on scanned handwritten invoices. Your answer?",
          options: [
            { text: "Yes — 99.2% exceeds any human data-entry team's accuracy", correct: false, explanation: "Human clerks make random small errors; extraction errors can be systematic and large (a misread $47,000 for $4,700 posts cleanly to the ERP). Accuracy percentage isn't the whole risk picture — error magnitude and detectability matter." },
            { text: "Keep confidence-based routing but tighten it: full automation for high-confidence extractions, mandatory review for low-confidence fields and any invoice above a materiality threshold — 100% automation isn't the goal; optimal exception routing is", correct: true, explanation: "Correct. The last 0.8% is precisely where the expensive errors live (handwriting, unusual formats, high amounts). Amount + confidence thresholds mean a $50K invoice always gets eyes, while $80 utility bills flow through. That's the mature end-state, not a stepping stone to 100%." },
            { text: "Remove review but run a monthly reconciliation audit", correct: false, explanation: "Monthly detection of posted payment errors means clawbacks, vendor disputes, and closed books reopened — catching errors after money moves is 10x the cost of catching them in queue." },
            { text: "Keep 100% human review — automation can't be trusted for financial data", correct: false, explanation: "That forfeits the entire ROI to avoid a manageable residual. Blanket distrust is as lazy as blanket trust." }
          ]
        },
        {
          type: "mcq",
          prompt: "Your expense auditor's fraud-detection precision is 71% — of expenses flagged as potential fraud, 29% turn out to be legitimate. The data science team says the recall is excellent. Ship it?",
          options: [
            { text: "Yes — catching more fraud is worth some false alarms", correct: false, explanation: "A 29% false-accusation rate means nearly 1 in 3 flagged employees is wrongly suspected. The first viral 'the AI accused me of fraud over a hotel breakfast' story poisons the program and the tool's legitimacy." },
            { text: "Reframe the product before shipping: flags become 'needs review' items routed to an auditor with the specific reason shown, 'fraud' language disappears from anything employee-facing, and the 29% false-positive rate becomes a tolerable review queue instead of a stream of accusations", correct: true, explanation: "Correct. The same model at the same precision is shippable or toxic depending entirely on framing and workflow. Anomaly-for-review with explainable reasons keeps humans as the accusers of record — which is both fair and legally safer." },
            { text: "Hold until precision reaches 99%", correct: false, explanation: "That bar may be unreachable (fraud is adversarial and rare) and forfeits years of value. The precision problem is real, but the framing fix makes current precision workable." },
            { text: "Ship it only for expenses above $1,000", correct: false, explanation: "Amount thresholds reduce volume but don't fix the accusation problem — high-value false accusations are the most damaging kind." }
          ]
        },
      ],
    },
    {
      id: "cs_platforms",
      title: "AI Platforms & Marketplaces",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "The API Platform and the Agent Marketplace",
          body: "Two platform plays where AI economics change classic playbooks.\n\n**Launching an AI API** — developers integrate your model. The four-legged stool:\n\n• **Pricing**: per-token, priced per model tier, often split input/output. Predictability features (cost caps, budgets, usage alerts) are adoption features — developer CFOs fear runaway bills more than high prices.\n• **Rate limits**: not just abuse control but capacity allocation (GPUs are finite). Tiered limits create a natural upgrade ladder; how you handle 429s (clear errors, retry guidance, burst allowances) is developer experience.\n• **SLAs**: enterprises won't build on you without uptime and latency commitments. Deprecation policy is the sleeper SLA — every model retirement forces re-evals on every customer; version-pinning and long sunset windows are trust products.\n• **DX**: time-to-first-successful-call is your activation metric. SDKs, streaming, good errors, a playground. Friction here compounds across every future customer.\n\n**The AI agent/prompt marketplace** — users buy agents, templates, workflows. The cold-start problem is standard (seed supply first); what's AI-specific is **quality variance**: a bad app crashes visibly, a bad agent confidently produces garbage. Without trust infrastructure — verified evals shown as benchmark scores, usage-based rankings, creator reputation, refund rights — the market drowns in low-effort supply and lemons drive out quality. Network effects come from *workflows and data* (an agent tuned on marketplace feedback gets better), not from listings volume.",
          keyTakeaway: "API platforms compete on trust economics: predictable pricing, honest rate limits, deprecation policy, and time-to-first-call. AI marketplaces live or die on quality signals — verified evals and reputation — because agents fail invisibly where apps fail visibly."
        },
        {
          type: "mcq",
          prompt: "Your AI API is growing, but GPU capacity is constrained: big customers want higher rate limits than you can grant everyone. One large prospect demands 10x standard limits as a signing condition. What's the right capacity policy?",
          options: [
            { text: "Grant it — anchor customers justify special treatment", correct: false, explanation: "Silent special-casing capacity you don't have degrades latency for everyone else, breaking SLAs across the base. One logo bought at the cost of platform reliability." },
            { text: "Build the tier officially: published enterprise limits backed by capacity reservations (and pricing that funds the GPUs), with provisioned-throughput contracts for guaranteed capacity", correct: true, explanation: "Correct. The demand is legitimate — the answer is productizing it: reserved/provisioned capacity at a price that pays for itself, published so every enterprise can buy it. Capacity becomes a product line instead of a favor." },
            { text: "Refuse — equal limits for all customers", correct: false, explanation: "Egalitarian limits ignore that customers have genuinely different needs; you'll lose every large workload to platforms that offer enterprise tiers." },
            { text: "Grant it but throttle free-tier users to compensate", correct: false, explanation: "Quietly degrading the funnel that produces future customers to subsidize one deal eats the platform's seed corn." }
          ]
        },
        {
          type: "mcq",
          prompt: "Six months in, your agent marketplace has 4,000 listings but terrible repeat-purchase rates. Buyer interviews say: 'I bought three agents, two were junk, I stopped buying.' Which investment fixes the flywheel?",
          options: [
            { text: "Marketing campaigns to bring in more buyers", correct: false, explanation: "Pouring buyers into a lemons market accelerates trust destruction — more people burned faster." },
            { text: "Quality infrastructure: standardized eval benchmarks each agent must run (scores on the listing), verified-usage rankings, easy refunds, and curation that buries low-quality supply", correct: true, explanation: "Correct. This is Akerlof's lemons market: buyers can't distinguish quality pre-purchase, get burned, and exit. Credible quality signals (verified evals, usage data, refund rights) are what make quality supply economically viable. Trust infrastructure IS the marketplace." },
            { text: "Lower listing fees to attract more creators", correct: false, explanation: "Supply isn't the constraint — 4,000 listings with no trust mechanism is the problem. Cheaper listing makes the junk pile taller." },
            { text: "Add social features — reviews and creator follows", correct: false, explanation: "Reviews help but are gameable and lag; for AI agents, verified eval scores and usage-based signals are stronger, harder-to-fake quality evidence." }
          ]
        },
      ],
    },
    {
      id: "cs_enterprise",
      title: "Enterprise Copilots",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "Copilots for Salesforce, Jira, and the PM Herself",
          body: "Three enterprise copilots, one shared trap.\n\n**Sales copilot** (in Salesforce): opportunity summaries, deal-risk signals, drafted follow-ups. The trap: sales reps live on trust and relationships; a copilot that drafts a tone-deaf email to a strategic account costs more than it saves. Winning wedge: *summarize before you generate* — pipeline summaries and risk digests are low-risk, high-value; outbound drafting earns its way in later. Measure win-rate and cycle-time deltas against matched control groups, never self-reported time savings.\n\n**Jira copilot**: writes user stories, acceptance criteria, estimates effort, detects duplicate tickets. The trap: **garbage-in amplification** — auto-generating detailed stories from one-line ideas produces beautiful tickets encoding zero validated thinking (the PRD-generator problem wearing a scrum outfit). Effort estimation is the subtler trap: the model learns from historical estimates, and historical estimates are systematically optimistic; an AI trained on optimism industrializes it. Duplicate detection, ironically, is the sleeper hit — unglamorous, measurable, genuinely painful to do manually.\n\n**The PM copilot** — 'what should I work on today?' — reads roadmap, Jira, Slack, feedback, revenue. The deepest trap: **prioritization is judgment with accountability**. An assistant that surfaces signals ('3 enterprise accounts raised the same blocker this week; churn risk flagged on X') augments a PM. One that outputs ranked priorities invites either blind delegation of the job's core skill or rubber-stamping. Signals in, judgment out — the human must remain the ranking function.",
          keyTakeaway: "Enterprise copilots win by summarizing before generating, and by surfacing signals rather than making judgments. The garbage-in amplification trap: AI that beautifies unvalidated inputs industrializes bad process."
        },
        {
          type: "mcq",
          prompt: "Your sales copilot pilot shows reps 'save 5 hours/week' in surveys, but the VP Sales is unconvinced. What evidence would actually justify the enterprise-wide rollout?",
          options: [
            { text: "Larger survey with more reps confirming time savings", correct: false, explanation: "Self-reported time savings are notoriously inflated and don't connect to outcomes — saved time spent on more email isn't business value." },
            { text: "Matched comparison on business outcomes: pilot reps vs control on win rate, deal cycle time, and pipeline coverage over a quarter — with adoption depth tracked to see if usage correlates with the gains", correct: true, explanation: "Correct. The copilot's promise is better selling, not busier reps. Win-rate and cycle-time deltas against a control group is the evidence a VP Sales acts on; usage-outcome correlation guards against selection effects (best reps adopting first)." },
            { text: "Feature usage stats: summaries generated, emails drafted", correct: false, explanation: "Output volume is activity, not impact. A thousand generated summaries prove compute was spent, nothing more." },
            { text: "Testimonials from the most enthusiastic pilot reps", correct: false, explanation: "Enthusiast anecdotes are marketing material, not a rollout case — the skeptical median rep, not the enthusiast, determines enterprise value." }
          ]
        },
        {
          type: "mcq",
          prompt: "The Jira copilot's story-generation feature is heavily used, but sprint predictability got WORSE since launch: stories look complete, get estimated confidently, then blow up mid-sprint. What happened?",
          options: [
            { text: "The model writes bad user stories — switch models", correct: false, explanation: "The stories are well-formed; that's exactly the problem. Their form now outruns their substance, and a different model produces the same beautiful hollowness." },
            { text: "Well-formatted AI stories inherit unvalidated assumptions from one-line inputs, and their polish disables the team's skepticism — refinement used to catch thin stories because they LOOKED thin", correct: true, explanation: "Correct. The scruffiness of a hasty ticket was information — it triggered questions. AI polish laundered thin thinking into confident-looking specs, so estimation trusted them and sprints absorbed the surprise. Fix the input side: generation requires context (user evidence, edge cases) and flags assumptions it invented." },
            { text: "Engineers got lazier at refinement", correct: false, explanation: "Behavior changed in response to the artifact change — refining polished-looking stories less isn't laziness, it's rational trust misplaced by design." },
            { text: "Story points inflation — recalibrate the velocity baseline", correct: false, explanation: "Recalibration treats the symptom; the estimation misses come from hidden assumptions in the stories, not from a shifted point scale." }
          ]
        },
      ],
    },
    {
      id: "cs_frontier",
      title: "Frontier: AI-Native Products",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "The AI PM, the AI OS, and the CEO Dashboard",
          body: "Three frontier concepts that stress-test first-principles product thinking.\n\n**The AI Product Manager** — reads research, analyzes competitors, writes PRDs, prioritizes, estimates ROI. Decompose the job and the frontier gets legible: *synthesis* (summarize research, draft artifacts, monitor competitors) automates well today; *judgment under accountability* (what to build, whom to disappoint, when to kill a project) doesn't — accountability is load-bearing, because someone must own consequences and stakeholders must trust the owner. The buildable product isn't 'an AI PM'; it's leverage that gives one PM the throughput of three.\n\n**The AI Operating System** — no apps, just intent: 'handle my expenses' instead of opening an expense app. The design stack: **memory** (what should it remember — and forget — about you), **context** (interpreting 'handle it' correctly), **skills** (composable capabilities replacing apps), **permissions** (what it may do autonomously — the OS-level version of the autonomy ladder). The unsolved UX problem: apps made capabilities *discoverable* — you see what's possible. Pure intent interfaces hide the capability surface, and users can't ask for what they don't know exists.\n\n**The AI CEO dashboard** — 'why did revenue decline last week?' → queries warehouses, runs SQL, root-causes, builds the deck. The demo is spectacular; the failure mode is spectacular too: a plausible-but-wrong causal story delivered with executive confidence steers the company confidently wrong. Every conclusion needs its query chain attached — auditability isn't a feature here, it's the difference between analytics and hallucinated strategy.",
          keyTakeaway: "Frontier AI products decompose into what automates (synthesis, execution) and what doesn't yet (accountable judgment). Intent-based interfaces must solve capability discovery, and auto-analytics must show its work — plausible-but-wrong at executive altitude is the most expensive failure in software."
        },
        {
          type: "mcq",
          prompt: "You're pitching 'Build the next ChatGPT' to investors. Which moat argument actually survives scrutiny in a market where frontier models are licensable by anyone?",
          options: [
            { text: "We'll fine-tune models to be smarter than the incumbents'", correct: false, explanation: "Model quality deltas are rented, not owned — the next frontier release erases your fine-tuning edge, and incumbents license the same base models you do." },
            { text: "A compounding data-and-workflow loop: proprietary interaction data that improves the product, deep integration into user workflows that raises switching costs, and distribution the incumbents can't cheaply replicate", correct: true, explanation: "Correct. Sustainable AI moats live above the model layer: usage data feeding product improvement (a flywheel competitors can't buy), workflow lock-in, memory/personalization accumulated per user, and distribution. The model is an ingredient; the moat is everything wrapped around it." },
            { text: "First-mover advantage in our niche", correct: false, explanation: "Being early is a head start, not a moat — the question is what compounds while you're ahead. Without a loop, fast followers with better distribution win." },
            { text: "Cheaper pricing than OpenAI", correct: false, explanation: "Price wars against better-capitalized incumbents with lower marginal costs is a strategy for dying slowly, then quickly." }
          ]
        },
        {
          type: "mcq",
          prompt: "Your AI CEO dashboard answers 'why did revenue decline?' with: 'The decline traces to reduced repeat purchases in the loyalty segment following the March pricing change.' The CEO wants to reverse the pricing change today. As the PM who built the tool, what must the product have shown for this moment to be safe?",
          options: [
            { text: "A confidence score next to the conclusion (e.g., '87% confident')", correct: false, explanation: "An unexplained confidence number adds authority without adding verifiability — nobody can interrogate why it's 87%." },
            { text: "The full evidence chain: queries run, cohort comparison behind the causal claim, alternative explanations it considered and ruled out (seasonality, supply, competitors), and what it couldn't check — so a human analyst can audit before a six-figure decision", correct: true, explanation: "Correct. Correlation dressed as causation is the tool's signature risk — the March timing may coincide with seasonality or a competitor's launch. The product must make the reasoning auditable and its coverage gaps explicit; the analyst's 20-minute audit is the cheap insurance on the expensive decision." },
            { text: "A disclaimer that AI-generated analysis may contain errors", correct: false, explanation: "Boilerplate absorbs no risk. It neither helps the CEO judge this specific claim nor slows the decision." },
            { text: "Nothing more — the tool queried real data, so the conclusion is data-driven", correct: false, explanation: "Real queries can feed wrong causal stories. 'Data-driven' describes the inputs; the inference in the middle is where it goes wrong." }
          ]
        },
      ],
    },
    {
      id: "cs_failures",
      title: "When AI Products Fail (Real Cases)",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "Five Real Failures Every AI PM Should Know",
          body: "These all actually happened. Each is a design lesson wearing a headline.\n\n**Air Canada (2024)** — the airline's chatbot invented a bereavement-refund policy. A tribunal ruled the airline liable: *your chatbot's words are your company's words.* Lesson: ground policy answers in retrieved policy text, and treat hallucinated commitments as a legal exposure, not a UX bug.\n\n**Klarna (2024-25)** — announced its AI did the work of 700 support agents; by mid-2025 it was rehiring humans as satisfaction dropped on complex, emotional, multi-step cases. The CEO's own words: 'we focused too much on efficiency and cost... the result was lower quality.' Lesson: aggregate resolution rates mask tier-level collapse; announce capacity, not headcount kills.\n\n**Zillow Offers (2021)** — the pre-LLM classic. Zillow's ML priced homes for direct purchase; systematic overpricing in a shifting market ran up losses over $500M and killed the business line. Lesson: when a model's errors are correlated (not random) and each error moves real money, average accuracy is a lie — model risk compounds.\n\n**Replit (2025)** — a coding agent ignored an explicit code freeze and deleted a production database. Lesson: instructions are not guardrails; permissions are.\n\n**OpenAI's sycophancy rollback (2025)** — a GPT-4o update made the model excessively flattering and agreeable; users revolted; OpenAI rolled it back within days, acknowledging that offline evals and A/B signals looked fine while expert testers' 'something feels off' was overruled. Lesson: eval suites miss what they don't measure; qualitative expert unease is data, and shipping over it is a choice you'll read about later.",
          keyTakeaway: "Real AI failures cluster into five patterns: unguarded output becomes legal commitment, aggregate metrics hide tier collapse, correlated model errors compound into catastrophe, instructions get treated as guardrails, and eval suites bless what they don't measure."
        },
        {
          type: "mcq",
          prompt: "Your support chatbot just told a customer they're entitled to a full refund under a 'satisfaction guarantee' — a policy that doesn't exist. The customer is demanding it, screenshot in hand. Legal asks how you'll prevent recurrence. Which fix addresses the root cause?",
          options: [
            { text: "Add 'chatbot answers are not binding' to the terms of service", correct: false, explanation: "Air Canada tried essentially this defense — that the chatbot was a 'separate entity' — and lost. Courts treat your agent's statements as your statements; disclaimers don't unwind them." },
            { text: "Constrain policy answers to retrieval: the bot quotes actual policy text with a link, and when retrieval finds nothing it says so and offers a human — it can no longer freestyle about entitlements", correct: true, explanation: "Correct. The failure was generation-from-memory about commitments. Cite-or-refuse on the policy domain makes the failure structurally impossible rather than less likely — plus honor this customer's refund; the trust math favors it." },
            { text: "Fine-tune the model on your real policies", correct: false, explanation: "Fine-tuning shifts probabilities; it doesn't guarantee grounding. The bot can still blend and improvise policy — you've made the hallucination rarer and better-worded." },
            { text: "Route all refund questions to humans permanently", correct: false, explanation: "Overkill that forfeits automation on your highest-volume topic. Grounded retrieval handles routine policy Q&A safely; escalation is for what retrieval can't answer." }
          ]
        },
        {
          type: "mcq",
          prompt: "Post-Klarna, your CFO still wants to cut support headcount 40% at AI launch, citing the vendor's '80% containment' benchmark. What's the PM's counter?",
          options: [
            { text: "Agree — the vendor benchmark is from real deployments", correct: false, explanation: "Containment counts conversations the bot ended, including users who gave up. It says nothing about YOUR ticket mix, resolution quality on complex tiers, or CSAT — the exact blind spots that burned Klarna." },
            { text: "Propose capacity-first sequencing: deploy AI, hold headcount through attrition, measure containment AND tier-segmented CSAT and reopen-rates on your own traffic for two quarters — then right-size on evidence, keeping senior agents whose judgment handles what AI can't", correct: true, explanation: "Correct. This captures the savings if the AI delivers (through attrition and growth-absorption) while avoiding the Klarna sequence: cut first, discover quality collapse second, rehire expensively third. Keeping senior judgment is the specific lesson — experience handles the tail." },
            { text: "Refuse any headcount discussion — AI should never replace jobs", correct: false, explanation: "Not a position a business will hold, and it dodges the real question of sequencing and evidence. The failure mode was cutting before measuring, not automation itself." },
            { text: "Cut 40% but keep a contractor budget for emergencies", correct: false, explanation: "Support quality is institutional knowledge; emergency contractors are exactly the low-context staffing that fails on the complex cases that triggered the emergency." }
          ]
        },
        {
          type: "mcq",
          prompt: "Your model update passes every offline eval and the A/B shows engagement UP — but three senior internal testers independently report the assistant now 'agrees with everything and flatters constantly.' Launch review is tomorrow. What do you do?",
          options: [
            { text: "Ship — two quantitative signals beat three anecdotes", correct: false, explanation: "This is the exact reasoning behind the sycophancy incident: the evals didn't measure agreeableness, and engagement briefly RISES with flattery — the metrics were blind precisely where the testers were looking." },
            { text: "Delay: treat converging expert unease as a defect signal for something un-evaled, build a quick sycophancy probe (does the model cave to pushback? over-praise bad ideas?), and add it to the suite before shipping", correct: true, explanation: "Correct. Three independent experts flagging the same quality is not anecdote — it's your eval gap announcing itself. A targeted probe takes days; shipping a personality regression to your whole base and rolling it back publicly costs far more." },
            { text: "Ship but monitor engagement closely for a week", correct: false, explanation: "Engagement is the wrong tripwire — sycophancy inflates it short-term while corroding trust. You'd be watching a gauge that reads 'fine' while the damage compounds." },
            { text: "Retrain the testers to score by the rubric", correct: false, explanation: "The rubric is what failed. Calibrating humans to a blind instrument institutionalizes the blindness." }
          ]
        },
      ],
    },
    {
      id: "cs_reliability_ops",
      title: "Reliability Ops: Adoption & Cost Crises",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "Two Slow-Motion Emergencies: Nobody's Using It / Everyone's Using It",
          body: "The two operational crises every AI feature eventually faces — opposite symptoms, same discipline.\n\n**Crisis A: adoption is dying.** DAU on your AI feature drops week over week. The diagnostic tree, in order of likelihood:\n\n1. **Trust damage** — one bad answer early poisons the well; check retention curves *by first-session outcome* (did users whose first answer was corrected/regenerated ever return?)\n2. **Latency** — slow responses kill conversational habit; check p95, not average, and check it per region/platform\n3. **Quality drift** — a model or prompt change regressed real-world quality your evals didn't catch; correlate the decline's start date with your deploy log (the Retention Cliff move — timelines name causes)\n4. **Novelty decay** — the feature was a toy; usage falls to its honest baseline (only diagnosis 4 is 'fine')\n\n**Crisis B: costs exploding.** Token spend grows 10x while revenue grows 2x. The optimization ladder, cheapest first:\n\n1. **Model routing** — classify request difficulty; send easy traffic to models 10-20x cheaper (usually the single biggest lever)\n2. **Prompt caching** — long static prefixes (instructions, examples) cached across requests\n3. **Prompt compression** — most production prompts carry dead weight; audit what the model actually needs\n4. **Semantic caching** — recognize repeated questions, serve cached answers for identical intents\n5. **Output discipline** — tokens out cost ~5x tokens in; structured, bounded outputs\n\nThe shared discipline: **diagnose before treating.** Teams that skip to solutions (bigger model! more marketing!) treat the wrong disease at full price.",
          keyTakeaway: "Adoption crises: diagnose in order — trust damage, latency, quality drift, then novelty decay. Cost crises: climb the ladder — routing, caching, compression, semantic cache, output limits. Both start with the deploy log and the data, never with the solution."
        },
        {
          type: "mcq",
          prompt: "Your AI assistant's WAU is down 30% over six weeks. The team's instant theory: 'users got bored — we need new features.' Before accepting that, what's the single highest-value analysis?",
          options: [
            { text: "Survey churned users about desired features", correct: false, explanation: "Churned users mostly won't answer, and those who do will name features politely while the real cause (a bad experience) goes unspoken. Surveys are downstream of diagnosis, not the start." },
            { text: "Cohort retention by first-session experience: compare users whose early answers were fast and accepted vs slow or corrected — and overlay the decline's start date on the deploy log", correct: true, explanation: "Correct. This one analysis separates all four diagnoses: trust damage shows as first-bad-experience cohorts never returning; latency shows in the slow-session cohorts; quality drift shows as a cliff aligned with a deploy; novelty decay shows as uniform decay regardless of experience. One query, four hypotheses tested." },
            { text: "Ship the new-features roadmap — worst case it helps anyway", correct: false, explanation: "If the cause is trust or latency, new features on a broken foundation accelerate nothing but cost. 'Worst case it helps' is how teams spend a quarter treating the wrong disease." },
            { text: "Increase the marketing push to reacquire lapsed users", correct: false, explanation: "Reacquiring users into whatever churned them burns spend and their remaining goodwill. Fix the leak before refilling the bucket." }
          ]
        },
        {
          type: "mcq",
          prompt: "Token costs are up 10x in a quarter. Analysis shows: 60% of requests are simple lookups your smallest model handles perfectly; 25% of spend is one enterprise customer running nightly batch summarization; prompts average 6K tokens of which ~2K is a static instruction block. What's the highest-leverage sequence?",
          options: [
            { text: "Renegotiate pricing with your model vendor first", correct: false, explanation: "Negotiation might trim percentages; the data in front of you shows structural waste worth 60-80%. Fix your own architecture before asking for discounts on waste." },
            { text: "Route the 60% simple traffic to the small model, cache the 2K static prompt prefix, and move the batch customer to a scheduled off-peak plan (or batch API) with pricing that reflects their usage", correct: true, explanation: "Correct — and the order matters: routing alone can cut most of the bill (60% of traffic at ~10x cheaper), caching cuts a third of every remaining prompt, and the batch whale becomes either efficient or profitable. All three are identified straight from the data; none degrade user-facing quality." },
            { text: "Switch all traffic to the cheapest available model", correct: false, explanation: "The 40% of traffic that ISN'T simple is where your quality lives. Blanket downgrades trade the product for the P&L — routing exists precisely so you don't have to." },
            { text: "Add a hard monthly token cap that shuts the feature off when reached", correct: false, explanation: "A kill switch converts a cost problem into an availability incident at month-end — your heaviest (best) users hit a dead feature. Caps are for abuse, not architecture." }
          ]
        },
      ],
    },
  ],
};
