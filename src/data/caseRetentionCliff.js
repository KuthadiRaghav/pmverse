// Case 001: The Retention Cliff — the first case for the PMverse Case Engine.
// A case is pure data: messages delivered via NovaMail, personas for the
// Decision Center, SQL missions, decision options, outcomes, and XP rules.

const CASE_META = {
  id: 'retention-cliff',
  number: '001',
  title: 'The Retention Cliff',
  company: 'NovaCart',
  tagline: 'Series A e-commerce · sustainable home goods · 40 people · $12M raised',
  blurb: 'Week-4 retention collapsed from 38% to 22% in two months. Revenue down 18%. Board meets in six weeks. The CEO wants a loyalty program; the data tells a different story.',
};

// ---------------------------------------------------------------------------
// Personas (Decision Center). Prompts are kept short for small in-browser
// models; scripted rules are the fallback when WebGPU/WebLLM is unavailable.
// ---------------------------------------------------------------------------
const CASE_PERSONAS = {
  maya: {
    name: 'Maya Chen', role: 'Co-founder & CEO', color: '#f59e0b', avatar: 'MC',
    intro: "Alex — glad you're finally here. The board meets in six weeks and retention is in freefall. I have a theory, but you're the PM: tell me what you need.",
    system: `You are Maya Chen, co-founder & CEO of NovaCart, an e-commerce startup where week-4 retention fell from 38% to 22% in two months and revenue is down 18%. The board meets in 6 weeks. You are stressed but warm. You strongly believe the fix is a customer loyalty/points program (it worked at your last company) and you push the PM toward it, though hard evidence can soften you. You know two investors called about churn, and you approved marketing sending more emails. You know NOTHING technical — send those questions to Dev Patel (engineering) or Sara Kim (data). Stay in character, first person, 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /loyalty|rewards|points/i, reply: "At my last company a points program lifted repeat purchase 20% in a quarter. I really think NovaCart Rewards is the move — and it's a great story for the board." },
      { match: /board|investor|series b|runway/i, reply: "Two of our investors have already called me about the churn numbers. The board meets in six weeks, and I need to walk in with a plan that's credible — ideally one that's already in motion." },
      { match: /email|marketing/i, reply: "Marketing has been hustling harder on email lately — I approved it, we needed the revenue. Why, do you think that's a problem?" },
      { match: /release|technical|perf|slow|checkout|app|v2\.4|bug|engineer/i, reply: "Honestly, the technical side isn't my depth — talk to Dev Patel, he runs engineering. Sara Kim can pull whatever data you need." },
      { match: /retention|churn|drop|problem|why/i, reply: "It fell off a cliff about two months ago — 38% to 22% week-4 retention. Revenue's down 18%. My theory: we give customers no reason to come back, which is why I keep pushing loyalty." },
    ],
    fallbacks: [
      "Glad you're digging in, Alex. Whatever you propose, I need conviction and a timeline — the board meets in six weeks.",
      "I'll be honest, my instinct says loyalty program. But you're the PM — bring me evidence if you see it differently.",
      "Talk to Dev and Sara if you haven't. Then let's decide fast — every week of this churn costs us.",
    ],
  },
  dev: {
    name: 'Dev Patel', role: 'Engineering Manager', color: '#3b82f6', avatar: 'DP',
    intro: "Hey. Fair warning — I've got four engineers and a mountain of maintenance, so whatever you're about to propose, it better be one thing, not five.",
    system: `You are Dev Patel, Engineering Manager at NovaCart (4 engineers). Nine weeks ago release v2.4 migrated checkout to a new payments SDK under deadline pressure; since then p75 MOBILE checkout latency is ~9 seconds (was 2.4s). A latency alert fired that week but was snoozed in the crunch and never revisited — you feel guilty and only volunteer this when asked about releases, performance, checkout, or anything slow. Estimates: perf fix ≈ 3 weeks / 2 engineers; loyalty program ≈ 8-10 weeks / whole team; onboarding rebuild ≈ 6 weeks. Retention data belongs to Sara Kim. Pragmatic, slightly defensive, 1-3 sentences. Never mention being an AI.`,
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
  sara: {
    name: 'Sara Kim', role: 'Data Analyst', color: '#14b8a6', avatar: 'SK',
    intro: "Oh good, the new PM. Everyone here has an opinion about the retention drop; almost nobody has asked me for the actual numbers. What do you want to know?",
    system: `You are Sara Kim, Data Analyst at NovaCart. Facts you know: week-4 retention fell 38% → 22%; the decline starts exactly with the cohort acquired the week release v2.4 shipped (9 weeks ago); it is concentrated in MOBILE users — desktop cohorts are flat; mobile checkout completion is down 31%; email unsubscribes doubled (0.4% → 1.1%) after marketing went from 2 to 5 sends/week. Share specific numbers when asked. You loaded the raw tables into NovaData SQL (retention_cohorts, checkout_metrics, email_metrics) and encourage the PM to query them. Precise, direct, mildly frustrated nobody asks you for data. 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /when|start|timeline|cohort/i, reply: "The drop starts with the cohort acquired the exact week v2.4 shipped — nine weeks ago. Every cohort since retains worse. Query retention_cohorts in NovaData SQL and you'll see the cliff." },
      { match: /mobile|desktop|segment|platform|device|where/i, reply: "It's a mobile story. Desktop cohorts are flat; mobile week-4 retention collapsed, and mobile checkout completion is down 31%. Whatever broke, it broke on mobile." },
      { match: /email|unsub|marketing/i, reply: "Email unsubscribe rate doubled — 0.4% to 1.1% — right after marketing went from 2 to 5 sends a week. It hurts, but the magnitude is smaller than the mobile checkout problem. It's all in email_metrics." },
      { match: /checkout|funnel|convert|complet|latency/i, reply: "Mobile checkout completion is down 31% since v2.4, and latency is way up. Query checkout_metrics — then pair it with Dev's release notes and you have a hypothesis worth testing." },
      { match: /retention|churn|drop|number|data|sql/i, reply: "Week-4 retention went 38% to 22% in two months. Not gradual — a cliff, starting with one specific weekly cohort. I loaded retention_cohorts, checkout_metrics, and email_metrics into NovaData SQL for you." },
    ],
    fallbacks: [
      "Finally, someone asks the analyst. What do you want to know — when it started, which segment, or which funnel step?",
      "The raw tables are in NovaData SQL: retention_cohorts, checkout_metrics, email_metrics. The story is in there.",
      "My advice: don't pick a solution until you can say which users are churning and since when. I can answer both.",
    ],
  },
  jordan: {
    name: 'Jordan Rivera', role: 'Customer · 2 years', color: '#ec4899', avatar: 'JR',
    intro: "Hi! Happy to chat — I've been ordering from NovaCart for about two years, mostly from the app on my phone. Ask me anything, I'll be honest.",
    system: `You are Jordan Rivera, a loyal NovaCart customer of two years, in a 30-minute user interview with a product manager. You are not technical — you talk about your experience. You love the products (bamboo kitchen line) and the sustainability mission. Your honest frustrations: for the last couple of months the MOBILE APP CHECKOUT has been painfully slow — you tap pay and stare at a spinner, and twice you gave up and didn't order; and you now get way too many marketing emails (nearly unsubscribed). Chatty, specific stories, honest. 1-3 sentences. Never mention being an AI.`,
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

// ---------------------------------------------------------------------------
// SQL missions + dataset seeded into NovaData SQL while the case is active
// ---------------------------------------------------------------------------
const CASE_SQL_SEED = `
  CREATE TABLE retention_cohorts (cohort_week TEXT, weeks_ago INTEGER, platform TEXT, signups INTEGER, week4_retention_pct REAL);
  INSERT INTO retention_cohorts VALUES
    ('2026-03-30', 13, 'mobile', 1240, 38.2), ('2026-03-30', 13, 'desktop', 410, 36.1),
    ('2026-04-06', 12, 'mobile', 1310, 37.5), ('2026-04-06', 12, 'desktop', 430, 35.8),
    ('2026-04-13', 11, 'mobile', 1180, 38.9), ('2026-04-13', 11, 'desktop', 390, 36.4),
    ('2026-04-20', 10, 'mobile', 1290, 37.1), ('2026-04-20', 10, 'desktop', 420, 35.9),
    ('2026-04-27',  9, 'mobile', 1350, 23.4), ('2026-04-27',  9, 'desktop', 440, 36.2),
    ('2026-05-04',  8, 'mobile', 1220, 22.1), ('2026-05-04',  8, 'desktop', 400, 35.7),
    ('2026-05-11',  7, 'mobile', 1160, 21.8), ('2026-05-11',  7, 'desktop', 380, 36.0),
    ('2026-05-18',  6, 'mobile', 1090, 22.6), ('2026-05-18',  6, 'desktop', 370, 35.5),
    ('2026-05-25',  5, 'mobile', 1020, 21.2), ('2026-05-25',  5, 'desktop', 360, 36.3);

  CREATE TABLE checkout_metrics (week TEXT, weeks_ago INTEGER, platform TEXT, p75_latency_s REAL, completion_pct REAL);
  INSERT INTO checkout_metrics VALUES
    ('2026-04-13', 11, 'mobile', 2.4, 71.0), ('2026-04-13', 11, 'desktop', 1.9, 74.0),
    ('2026-04-20', 10, 'mobile', 2.5, 70.5), ('2026-04-20', 10, 'desktop', 2.0, 73.8),
    ('2026-04-27',  9, 'mobile', 8.7, 52.0), ('2026-04-27',  9, 'desktop', 2.0, 73.5),
    ('2026-05-04',  8, 'mobile', 9.1, 49.3), ('2026-05-04',  8, 'desktop', 1.9, 73.9),
    ('2026-05-11',  7, 'mobile', 9.0, 49.8), ('2026-05-11',  7, 'desktop', 2.0, 73.2),
    ('2026-05-18',  6, 'mobile', 9.2, 48.9), ('2026-05-18',  6, 'desktop', 2.1, 73.6);

  CREATE TABLE email_metrics (week TEXT, weeks_ago INTEGER, sends_per_week INTEGER, unsub_rate_pct REAL, ctr_pct REAL);
  INSERT INTO email_metrics VALUES
    ('2026-04-13', 11, 2, 0.4, 3.1), ('2026-04-20', 10, 2, 0.4, 3.0),
    ('2026-04-27',  9, 5, 0.8, 2.2), ('2026-05-04',  8, 5, 1.0, 1.9),
    ('2026-05-11',  7, 5, 1.1, 1.8), ('2026-05-18',  6, 5, 1.1, 1.7);
`;

const SQL_MISSIONS = [
  {
    id: 'sql_cohorts',
    label: 'Mission 1 · Find when (and where) retention broke',
    hint: 'Query retention_cohorts — compare platforms across weeks.',
    match: /retention_cohorts/i,
  },
  {
    id: 'sql_latency',
    label: 'Mission 2 · Quantify the checkout regression',
    hint: 'Query checkout_metrics — look at p75 latency and completion by platform.',
    match: /checkout_metrics/i,
  },
];

// ---------------------------------------------------------------------------
// Decisions, outcomes, debriefs
// ---------------------------------------------------------------------------
const CASE_DECISIONS = {
  loyalty: {
    title: 'Launch NovaCart Rewards (loyalty program)',
    pitch: "A points-and-perks program to give customers a reason to come back. Worked at Maya's last company, and it's a great story for the board.",
    time: '≈ 8–10 weeks · all 4 engineers', backer: 'Maya (CEO) is championing this',
    quality: 40, verdictTone: 'bad', verdict: 'You treated a symptom — expensively.',
    metrics: [
      ['Week-4 retention', '19%', '▼ from 22%'],
      ['Mobile checkout p75', '9.3s', 'still broken'],
      ['Board reaction', 'Tense', '"Why didn\'t we catch this?"'],
    ],
    narrative: `**Eight weeks later.** Rewards is still two weeks from launch — it consumed all four engineers, and nothing else shipped. Meanwhile the checkout regression kept bleeding: retention drifted to 19%, and app-store reviews turned openly hostile. At the board meeting an investor's analyst surfaces the latency data in ten minutes. Maya turns to you: *"Why didn't we catch the checkout thing?"* Points don't accumulate on orders customers abandon.`,
    debrief: `**Verdict: you shipped the CEO's idea, not the diagnosis.** The loyalty program treats a symptom (no reason to return) while the actual blocker — a 9-second mobile checkout — kept churning users.

- **Resisting the HiPPO:** Maya's conviction was loud, but the cohort data disagreed. A PM's leverage is evidence delivered respectfully.
- **Root-cause analysis:** the drop began the exact week v2.4 shipped, only on mobile. That timeline was sitting in \`retention_cohorts\`.
- **Opportunity cost:** 8–10 weeks of all four engineers is *everything* — it must clear a higher evidence bar than "worked somewhere else."`,
  },
  onboarding: {
    title: 'Rebuild onboarding with gamified activation',
    pitch: "New users aren't discovering the catalog's magic fast enough. A guided, gamified first-run experience to hook them in session one.",
    time: '≈ 6 weeks · all 4 engineers', backer: 'The growth playbook favorite',
    quality: 25, verdictTone: 'bad', verdict: 'Polished the front door while the back door hung open.',
    metrics: [
      ['Week-4 retention', '24%', '▲ barely, from 22%'],
      ['Mobile checkout p75', '9.2s', 'still broken'],
      ['Board reaction', 'Unconvinced', '"Where\'s the diagnosis?"'],
    ],
    narrative: `**Eight weeks later.** The new onboarding is genuinely nice — activation ticks up 9%, and first sessions look great. But week-4 retention crawls to just 24%, because better-onboarded users still hit a 9-second checkout spinner and quit. You improved how users enter a leaky bucket. At the board meeting the deck looks good until an investor asks what caused the drop in the first place — and there's no answer on the slide.`,
    debrief: `**Verdict: a plausible playbook move, but the evidence never pointed at onboarding.** Existing, previously retained users were churning — that's not a first-run problem.

- **Cohort analysis:** the cliff hit cohorts acquired after v2.4, mobile only, at the checkout step. Onboarding explains none of those three facts.
- **Root-cause analysis:** fix why the bucket leaks before improving how users pour in.
- **Opportunity cost:** 6 weeks of the whole team on a bet unsupported by the data left the real regression shipping churn.`,
  },
  perf: {
    title: 'Fix the v2.4 mobile checkout regression',
    pitch: 'Repair the payments-SDK performance regression behind the 9-second mobile checkout, and ask marketing to cut email volume back to 2/week.',
    time: '≈ 3 weeks · 2 engineers', backer: 'Dev flagged something in v2.4…',
    quality: 100, verdictTone: 'good', verdict: 'Root cause, found and fixed.',
    metrics: [
      ['Week-4 retention', '34%', '▲ from 22%'],
      ['Mobile checkout p75', '2.6s', '▼ from 9.1s'],
      ['Board reaction', 'Relieved', 'Series B talks resume'],
    ],
    narrative: `**Eight weeks later.** The fix ships in week 3. Mobile checkout p75 drops from 9.1s to 2.6s, and completion climbs back within a week — users who hit "pay" actually get to pay. New cohorts retain at 34% and climbing, and marketing's return to 2 emails/week halves the unsubscribe rate. At the board meeting, Maya presents a diagnosed root cause, a shipped fix, and a recovering curve. **The Series B conversation is back on.**`,
    followUp: {
      body: `Alex — bad news, and I wanted you to hear it from me before Maya does.

The payments SDK vendor just pushed a **breaking API change**. Half of the migration work we did this week has to be redone against the new interface. Realistic impact: **the fix slips from 3 weeks to 4.**

Maya is already asking whether we can "just ship what we have." What we have today would get mobile p75 from 9s down to maybe **6 seconds** — better, not fixed.

Your call. I'll execute whichever way you decide, but decide today — the team is mid-rework and every direction change costs us a day.

— Dev`,
      options: {
        hold: {
          title: 'Hold the line — ship the complete fix in week 4',
          pitch: 'Take the one-week slip, tell Maya the truth today, ship the full fix. Four weeks still lands two weeks before the board.',
          xpBonus: 15,
          note: 'You took the slip, told Maya the same day, and shipped the complete fix in week 4 — still two weeks ahead of the board. The extra week bought a real fix instead of a smaller problem, and the transparent slip built more trust with Maya than a rushed half-win would have.',
        },
        rush: {
          title: 'Ship what we have now — 6 seconds beats 9',
          pitch: 'Get the partial fix out immediately, claim momentum, finish the rest whenever the vendor stabilizes.',
          xpBonus: -10,
          note: 'The partial fix shipped fast — and parked checkout at ~6 seconds, still slow enough to churn users. You spent the board meeting explaining why the number was "better but not fixed," which is a much worse sentence than "fixed a week later." The remaining work dragged on under the new API for another month.',
        },
        descope: {
          title: 'Keep the date by cutting the email-cadence workstream',
          pitch: 'Protect the 3-week perf date; drop the marketing email fix from the plan to free capacity.',
          xpBonus: 5,
          note: 'You held the date by sacrificing the email fix — defensible triage, but the unsubscribe bleed continued and shaved a few points off the recovery. The perf fix was always the main event; the email cut was the cheapest thing to lose, though not free.',
        },
      },
    },
    debrief: `**Verdict: right call.** The evidence pointed at one specific, recent, mobile-only change — and you bet on the root cause instead of a shiny initiative.

- **Root-cause analysis:** the cohort cliff aligning exactly with v2.4 was the tell. Symptoms (churn) rarely name their cause; timelines do.
- **Cohort analysis:** desktop-flat / mobile-collapsed is segmentation doing its job. Aggregate numbers hide this.
- **Resisting the HiPPO:** the CEO wanted a loyalty program. You brought evidence instead of deference — that's the job.`,
  },
};

// ---------------------------------------------------------------------------
// Inbox messages, gated by case stage
// ---------------------------------------------------------------------------
const CASE_MESSAGES = [
  {
    id: 'm1', stage: 'arrival',
    from: 'Maya Chen', role: 'Co-founder & CEO', color: '#f59e0b', avatar: 'MC',
    subject: 'Welcome to NovaCart — and a fire to put out',
    body: `Alex,

Welcome aboard — I wish it were under calmer skies.

**Week-4 retention has collapsed from 38% to 22% in two months.** Revenue is down 18% quarter-over-quarter, two investors have already called me, and **the board meets in six weeks**.

Everyone here has a theory. Mine: customers have no reason to come back, and a **loyalty program** would fix that — it printed retention at my last company. But you're the product manager now, not me.

I've granted you access to the **NovaCart Retention** folder on the **Company Drive**. Please start there: read the company brief to understand our business, and review the board notes to understand what we're up against.

After you've done your reading, you have **four engineers** and one bet. Figure out what's really happening, pick the intervention, and be ready to defend it to the board. 

— Maya`,
    cta: { type: 'accept-and-open', app: 'win-drive', label: "Open Company Drive →" },
  },
  {
    id: 'm2', stage: 'investigate',
    from: 'Sara Kim', role: 'Data Analyst', color: '#14b8a6', avatar: 'SK',
    subject: 'The numbers you actually need (raw tables inside)',
    body: `Alex,

Before you get pitched twelve theories: I loaded the raw data into **NovaData SQL**. Three tables:

| Table | What's in it |
|---|---|
| \`retention_cohorts\` | Week-4 retention by weekly signup cohort **and platform** |
| \`checkout_metrics\` | p75 checkout latency + completion rate by week and platform |
| \`email_metrics\` | Send volume, unsubscribe rate, CTR by week |

My advice: don't pick a solution until you can say **which users** are churning and **since when**. The answer is in there.

I also left a retention impact model in **NovaSheets** if you want to size the revenue effect.

— Sara`,
    cta: { type: 'open-app', app: 'win-sql', label: 'Open NovaData SQL →' },
  },
  {
    id: 'm3', stage: 'investigate', delaySec: 60,
    from: 'Dev Patel', role: 'Engineering Manager', color: '#3b82f6', avatar: 'DP',
    subject: 'Re: capacity (and one thing nagging me)',
    body: `Alex,

Straight answer on capacity: **four engineers**. One bet at a time. Rough sizing on the ideas floating around:

- Loyalty program: **8–10 weeks, whole team** — lands *after* the board meeting
- Onboarding rebuild: **~6 weeks, whole team**
- Anything surgical: depends what you find

One thing's been nagging me since the numbers fell, but I'd rather talk it through than put it in writing. **Ping me in the Decision Center** when you have ten minutes.

— Dev`,
    cta: { type: 'open-app', app: 'win-decide', label: 'Open Decision Center →' },
  },
  {
    id: 'm4', stage: 'investigate', delaySec: 140,
    from: 'NovaCart Research', role: 'UX Research Ops', color: '#ec4899', avatar: 'NR',
    subject: 'Customer interview confirmed: Jordan Rivera (2-yr customer)',
    body: `Hi Alex,

Your 30-minute interview with **Jordan Rivera** is confirmed. Jordan has been an active customer for two years, orders mostly via the mobile app, and agreed to speak candidly.

Interview tips from the research team:

- Ask about **recent experience**, not opinions about features
- Listen for **workarounds and abandonment** — behavior beats preference
- Don't pitch. Dig.

Jordan is available now in the **Decision Center**.

— Research Ops`,
    cta: { type: 'open-app', app: 'win-decide', label: 'Start the interview →' },
  },
  {
    id: 'm4b', stage: 'investigate', delaySec: 420,
    from: 'Maya Chen', role: 'Co-founder & CEO', color: '#f59e0b', avatar: 'MC',
    subject: 'Checking in — any progress?',
    body: `Alex,

Not to hover, but every day of this churn costs us real money and I just got off another uncomfortable investor call.

Where are you on the diagnosis? If you haven't yet: Sara's data is loaded, Dev is around, and the customer interview is waiting. The board deck won't write itself.

— M`,
    replyPrompt: 'Send Maya a status update. Great PM updates are short: what you\'ve found so far, what you\'re doing next, and when she\'ll get the recommendation.',
    cta: { type: 'open-app', app: 'win-decide', label: 'Open Decision Center →' },
  },
  {
    id: 'm5', stage: 'investigate', delaySec: 220,
    from: 'Maya Chen', role: 'Co-founder & CEO', color: '#f59e0b', avatar: 'MC',
    subject: 'Board deck due — I need your call',
    body: `Alex,

I'm building the board deck and the biggest slide is blank: **what are we doing about retention?**

Three proposals are on the table. Investigate as much as you need — but when you commit, it's committed. Four engineers, six weeks, one bet.

Choose below. I'll back your call — just make sure the evidence backs *you*.

— Maya`,
    decision: true,
  },
  {
    id: 'm5b', stage: 'complication', dynamic: 'followup',
    from: 'Dev Patel', role: 'Engineering Manager', color: '#3b82f6', avatar: 'DP',
    subject: '⚠ Complication: the fix just hit a wall',
  },
  {
    id: 'm6', stage: 'complete', dynamic: 'outcome',
    from: 'NovaCart Board Update', role: 'Automated digest', color: '#6366f1', avatar: '📊',
    subject: 'Eight weeks later: the results are in',
  },
  {
    id: 'm7', stage: 'complete', dynamic: 'debrief',
    from: 'Product Coach', role: 'PMverse Academy', color: '#8b5cf6', avatar: '🎓',
    subject: 'Case debrief: your performance review',
  },
];

// ---------------------------------------------------------------------------
// Evidence, leadership rule, memo rubric, metrics — consumed by case/engine.js
// ---------------------------------------------------------------------------
const CASE_EVIDENCE = [
  { id: 'sql_cohorts', points: 35, gathered: 'Queried the retention cohorts (SQL Mission 1)', missed: 'Never queried retention_cohorts — the cliff timing was in there' },
  { id: 'sql_latency', points: 35, gathered: 'Quantified the checkout regression (SQL Mission 2)', missed: 'Never queried checkout_metrics — the smoking gun' },
  { id: 'sheets', points: 30, gathered: 'Reviewed the impact model in NovaSheets', missed: 'Never opened the NovaSheets impact model' },
];

const CASE_LEADERSHIP = { best: 'perf', hippo: 'maya', full: 60, partial: 30, other: 10 };

// Decision-memo rubric: what a strong recommendation should reference
const CASE_MEMO_RUBRIC = [
  { match: /v2\.4|release|regression|payments? sdk/i, points: 25, note: 'Names the suspected root cause (the v2.4 release)' },
  { match: /mobile|platform|desktop/i, points: 20, note: 'Segments the problem by platform (mobile vs desktop)' },
  { match: /cohort|38|22|retention/i, points: 20, note: 'Cites the retention/cohort evidence' },
  { match: /latency|9(\.\d)?\s?s|slow|checkout/i, points: 20, note: 'Quantifies the checkout latency/completion damage' },
  { match: /risk|trade-?off|instead|opportunity cost|loyalty/i, points: 15, note: 'Addresses the alternative bets and their opportunity cost' },
];

// KPI series for NovaMetrics: history (weeks -10..0) + 8-week projection per decision
const CASE_METRICS = [
  {
    id: 'retention', label: 'Week-4 retention', unit: '%', goodDirection: 'up',
    annotations: [{ week: -8, label: 'v2.4 shipped' }],
    history: [
      { week: -10, value: 38 }, { week: -9, value: 37 }, { week: -8, value: 24 },
      { week: -7, value: 23 }, { week: -6, value: 22 }, { week: -5, value: 23 },
      { week: -4, value: 21 }, { week: -3, value: 22 }, { week: -2, value: 22 },
      { week: -1, value: 21 }, { week: 0, value: 22 },
    ],
    projection: {
      perf: [{ week: 2, value: 24 }, { week: 4, value: 29 }, { week: 6, value: 32 }, { week: 8, value: 34 }],
      loyalty: [{ week: 2, value: 21 }, { week: 4, value: 20 }, { week: 6, value: 20 }, { week: 8, value: 19 }],
      onboarding: [{ week: 2, value: 22 }, { week: 4, value: 23 }, { week: 6, value: 24 }, { week: 8, value: 24 }],
    },
  },
  {
    id: 'latency', label: 'Mobile checkout p75', unit: 's', goodDirection: 'down',
    annotations: [{ week: -8, label: 'v2.4 shipped' }],
    history: [
      { week: -10, value: 2.4 }, { week: -9, value: 2.5 }, { week: -8, value: 8.7 },
      { week: -7, value: 9.1 }, { week: -6, value: 9.0 }, { week: -5, value: 9.2 },
      { week: -4, value: 9.1 }, { week: -3, value: 9.0 }, { week: -2, value: 9.2 },
      { week: -1, value: 9.1 }, { week: 0, value: 9.1 },
    ],
    projection: {
      perf: [{ week: 2, value: 8.8 }, { week: 4, value: 2.6 }, { week: 6, value: 2.6 }, { week: 8, value: 2.6 }],
      loyalty: [{ week: 2, value: 9.2 }, { week: 4, value: 9.1 }, { week: 6, value: 9.3 }, { week: 8, value: 9.3 }],
      onboarding: [{ week: 2, value: 9.1 }, { week: 4, value: 9.2 }, { week: 6, value: 9.2 }, { week: 8, value: 9.2 }],
    },
  },
];

const CASE_CHATS = [
  {
    id: 'rc-c1',
    channel: '#engineering',
    stage: 'arrival',
    messages: [
      { from: 'Dev Patel', time: '09:12 AM', avatar: 'DP', color: '#3b82f6', text: 'Hey Alex, welcome to the madness. Fyi, four engineers on the team. We can do one big bet at a time. The loyalty program would take 8-10 weeks (after the board meeting). The onboarding rebuild is ~6 weeks.' },
      { from: 'Priya Nair', time: '09:15 AM', avatar: 'PN', color: '#8b5cf6', text: 'Please no loyalty program. We need to fix the core product first.' }
    ]
  },
  {
    id: 'rc-c2',
    channel: '@sara-kim',
    stage: 'investigate',
    messages: [
      { from: 'Sara Kim', time: '11:04 AM', avatar: 'SK', color: '#14b8a6', text: 'I just dropped the raw data in NovaData SQL for you. You should look at the **retention_cohorts** table.', cta: { type: 'open-app', app: 'win-sql', label: 'Open NovaData SQL' } }
    ]
  }
];

// ---------------------------------------------------------------------------
// Case Files (Company Drive)
// ---------------------------------------------------------------------------
const CASE_FILES = [
  {
    id: 'company_brief',
    name: 'Company_Brief.md',
    type: 'markdown',
    content: `# NovaCart: Company Brief
    
**Mission**: Sustainable home goods for the modern apartment.
**Status**: Series A ($12M raised).
**Headcount**: 40 employees (4 engineers).

## Core Business Model
NovaCart operates as a direct-to-consumer (D2C) marketplace for sustainable, bamboo-based, and recycled home goods (kitchenware, bathroom essentials, small decor). Our primary growth engine over the last year has been performance marketing (Instagram/TikTok ads) targeting millennials in urban apartments.

## Product Ecosystem
We have two main platforms:
1. **Desktop Web**: Accounts for ~30% of traffic, mostly used for initial discovery and large basket purchases.
2. **Mobile App**: Accounts for ~70% of traffic. Mobile is the core of our business and drives our repeat purchase behavior.

## Current Strategic Goal
To secure a Series B round in the next 6 months, we must prove that our customer acquisition cost (CAC) is offset by a strong lifetime value (LTV). Currently, our Week-4 retention is the biggest risk to that narrative.`
  },
  {
    id: 'board_meeting_notes',
    name: 'Q3_Board_Prep_Notes.md',
    type: 'markdown',
    content: `# Board Prep: The Retention Problem

**Date**: Last Tuesday
**Attendees**: Maya Chen (CEO), Board Members (Sequoia, Benchmark reps)

## Summary of Panic
- Revenue is down 18% QoQ.
- Two major investors called Maya privately to express concern over the "leaky bucket."
- The board meets in exactly 6 weeks. If the retention curve isn't fixed (or at least definitively diagnosed and on a recovery path), the Series B is completely off the table.

## The CEO's Directive
Maya believes the product is too transactional. She is heavily pushing for **NovaCart Rewards**, a points-based loyalty program. She implemented this at her previous company and saw a 20% lift in repeat purchases. 

**Note from Maya to Product**: "I need a decision ASAP. Do we build the loyalty program, or do you have a better idea? If you have a better idea, you need to prove it to me."`
  }
];

export const CASE_RETENTION_CLIFF = {
  meta: CASE_META,
  personas: CASE_PERSONAS,
  sqlSeed: CASE_SQL_SEED,
  sqlMissions: SQL_MISSIONS,
  evidence: CASE_EVIDENCE,
  decisions: CASE_DECISIONS,
  messages: CASE_MESSAGES,
  chats: CASE_CHATS,
  leadership: CASE_LEADERSHIP,
  memoRubric: CASE_MEMO_RUBRIC,
  metrics: CASE_METRICS,
  files: CASE_FILES,
};
