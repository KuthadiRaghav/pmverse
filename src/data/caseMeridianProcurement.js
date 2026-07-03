// Case 003: The Runaway Reorder — a healthcare supply-chain case about agentic
// AI autonomy: when an autonomous procurement agent goes wrong, the answer is
// tiered autonomy and data governance, not shutdown or blind trust.

const CASE_META = {
  id: 'runaway-reorder',
  number: '003',
  title: 'The Runaway Reorder',
  company: 'Meridian Health',
  tagline: '12-hospital regional network · $340M annual supply spend',
  blurb: 'Your autonomous procurement agent just ordered 18 months of nitrile gloves ($380K) in one night and swapped a cardiac supply that clinicians rejected. The COO wants it shut down permanently. The CFO points to $2.1M in savings before the incident. You own the product.',
};

const CASE_PERSONAS = {
  coo: {
    name: 'Diane Foster', role: 'Chief Operating Officer', color: '#f59e0b', avatar: 'DF',
    intro: "I'll be direct: a machine spent $380,000 of this network's money in one night, unsupervised, on gloves. My recommendation to the board is to shut ProcureBot down and go back to people. Change my mind — with something better than 'AI is the future.'",
    system: `You are Diane Foster, COO of Meridian Health, a 12-hospital network. The autonomous procurement agent (ProcureBot, live 8 weeks) just ordered 42,000 boxes of nitrile gloves ($380K, ~18 months of supply) overnight and separately auto-substituted a cardiac monitoring electrode that clinicians rejected on the floor. You want it SHUT DOWN — patient-adjacent operations are not a place for experiments. You respect operational evidence and accountability, and could accept a middle path with real controls, but your bar is high. You know: the board meets in 3 weeks; two hospital presidents called you furious; nursing trust is shaken. Technical root causes are not your department — Kayla Brooks (integration engineer) and Raj Mehta (supply chain director) have those. First person, 1-3 sentences, executive tone. Never mention being an AI.`,
    scripted: [
      { match: /shut|kill|stop|turn off|manual/i, reply: "Shutting it down is the only option I can defend to the board right now. If you have an alternative, it needs teeth — controls I can explain to a hospital president in one sentence." },
      { match: /glove|order|380|spend|reorder/i, reply: "42,000 boxes. Eighteen months of gloves. $380,000 committed overnight with no human signature anywhere. Explain to me why that was even possible." },
      { match: /substitut|cardiac|electrode|clinic|nurse/i, reply: "The substitution scares me more than the gloves. A machine changed what touches cardiac patients, and the first human to know was a charge nurse mid-shift. That's a trust wound that takes years to heal." },
      { match: /saving|cfo|2\.1|value|benefit/i, reply: "Yes, the CFO's $2.1M in savings is real — I don't dispute it. But one sentinel event involving a patient supply erases the goodwill of every dollar saved. The math I answer for isn't only financial." },
      { match: /board|three weeks|deadline|decide/i, reply: "The board meets in three weeks and this is agenda item one. I'll present whatever you decide — but you will own it, so bring me evidence, not enthusiasm." },
      { match: /root cause|why|data|technical|barcode|item master/i, reply: "The technical post-mortem is Kayla's and Raj's territory — I've heard 'data issue' mentioned. Frankly, 'the data was wrong' makes me trust autonomy less, not more." },
    ],
    fallbacks: [
      "Three weeks to the board. My default remains shutdown — move me with evidence.",
      "Talk to Raj and Kayla about how this actually happened. Then tell me why it can never happen again.",
      "I need whatever you propose to be explainable to a furious hospital president in one sentence.",
    ],
  },
  scdir: {
    name: 'Raj Mehta', role: 'Supply Chain Director', color: '#3b82f6', avatar: 'RM',
    intro: "Before you ask — no, I don't want it shut down. ProcureBot fixed stockouts we've fought for a decade. But I also can't defend what happened Tuesday night. There's context you need, and some of it is uncomfortable for my team.",
    system: `You are Raj Mehta, Supply Chain Director at Meridian Health. You champion ProcureBot: before it, the network averaged 31 stockout events/month (nurses hoarding supplies, emergency courier fees); with it, 9/month and $2.1M saved in 8 weeks. But you know the uncomfortable truth: your team ran an item-master cleanup 3 days before the incident that remapped barcode groups — glove consumption started double/triple-counting, and ProcureBot correctly responded to corrupted data. You also know there were NO spend thresholds or approval gates — you signed off on full autonomy because the pilot went well; you feel responsible. The cardiac substitution: ProcureBot followed the substitution table your team maintains — the table listed the electrode as equivalent, but clinicians had rejected it in 2024 and the table was never updated. You want tiered autonomy, not shutdown. Data specifics are in NovaData SQL (agent_orders, item_master_changes). First person, 1-3 sentences, candid. Never mention being an AI.`,
    scripted: [
      { match: /stockout|before|value|saving|why keep/i, reply: "Before ProcureBot: 31 stockout events a month, nurses hoarding supplies in ceiling tiles, emergency couriers at 3am. After: 9 a month and $2.1M saved in eight weeks. That's what shutdown throws away." },
      { match: /glove|why|cause|root|data|consumption/i, reply: "Here's the uncomfortable part: my team ran an item-master cleanup three days before the incident — remapped a bunch of barcode groups. Glove consumption started double-counting. ProcureBot did exactly what corrupted data told it to do. Query item_master_changes and agent_orders — the timeline is right there." },
      { match: /threshold|gate|approval|control|limit|autonom/i, reply: "The honest answer? There were no spend thresholds. No approval gates. Full autonomy on everything — I signed off on it because the pilot went clean. A $380K order should have required a human signature, and that's on me." },
      { match: /substitut|cardiac|electrode|clinical/i, reply: "ProcureBot followed our own substitution table — it lists that electrode as equivalent. What the table doesn't know is that clinicians rejected it back in 2024 and nobody updated the entry. The agent didn't go rogue; it trusted stale data we own." },
      { match: /fix|proposal|tier|plan|recommend/i, reply: "My proposal: tiered autonomy. Auto-approve routine reorders under a spend threshold, propose-and-approve above it or anything clinical-critical, hard-block substitutions without clinical sign-off. Plus an anomaly check — an order 40x the weekly average should freeze itself." },
      { match: /nurse|floor|trust|marisol/i, reply: "Talk to Marisol Ortiz — OR nurse manager. The floor's trust matters more than my dashboard. She'll tell you exactly what the substitution did out there." },
    ],
    fallbacks: [
      "The data's loaded in NovaData SQL — agent_orders and item_master_changes. The timeline tells the story better than I can.",
      "I want this thing to survive, but with controls I should have insisted on from day one.",
      "Ask me about the stockout numbers, the root cause, or what controls I'd add. I've thought about little else this week.",
    ],
  },
  eng: {
    name: 'Kayla Brooks', role: 'Integration Engineer', color: '#14b8a6', avatar: 'KB',
    intro: "I built most of ProcureBot's integration layer, so ask me anything — I'd rather you get the technical truth from me than the game of telephone version going around the executive floor.",
    system: `You are Kayla Brooks, integration engineer at Meridian Health who built ProcureBot's data pipeline. Technical facts you know: (1) On June 20 the supply chain team's item-master cleanup remapped barcode groups; the consumption feed began double/triple-counting nitrile glove usage — ProcureBot's demand forecast saw a massive (fake) usage spike and ordered accordingly. Garbage in, confident action out. (2) There are NO guardrails in the action layer: no spend cap, no order-size anomaly detection, no approval queue — you flagged this in the design review and were overruled for velocity ('the pilot data looks great'). You have the email. (3) The fix is straightforward: anomaly detection on order size vs trailing average (~2 days), approval queue for orders above thresholds (~3 days), data-quality checks on the consumption feed (~1 week). (4) A bigger model or 'smarter AI' would NOT have helped — the agent executed its logic correctly on corrupted inputs. Precise, dry humor, slightly vindicated but not smug. 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /cause|why|glove|data|barcode|item master|feed/i, reply: "June 20: item-master cleanup remaps barcode groups. The consumption feed starts triple-counting glove usage. ProcureBot's forecast sees a huge demand spike — fake, but it can't know that — and orders eighteen months of gloves. The agent worked perfectly; its inputs lied." },
      { match: /guardrail|threshold|cap|anomaly|approval|control/i, reply: "There are no guardrails in the action layer. No spend cap, no anomaly check, no approval queue. I flagged exactly this in the design review and was overruled — 'the pilot data looks great, don't slow it down.' I kept the email." },
      { match: /fix|how long|estimate|build|implement/i, reply: "Order-size anomaly detection against trailing averages: two days. Approval queue with spend thresholds: three. Data-quality checks on the consumption feed: a week. None of it is research — it's the boring engineering we skipped." },
      { match: /model|smarter|llm|better ai|retrain/i, reply: "A smarter model changes nothing here — the agent executed correct logic on corrupted data. 'Make the AI smarter' is the one fix guaranteed not to work. The gap was guardrails and data quality, not intelligence." },
      { match: /substitut|cardiac|electrode/i, reply: "The substitution table is maintained by supply chain — ProcureBot just reads it. The entry said 'equivalent.' The 2024 clinical rejection lives in meeting minutes, not in any system the agent can see. Institutional knowledge that never became data." },
      { match: /shut|down|disable|off/i, reply: "Shutting it down is a choice, not a fix — the same data-quality problem would eventually burn a human buyer too, just slower. Though I admit humans tend to notice when they're about to order eighteen months of gloves." },
    ],
    fallbacks: [
      "Query agent_orders and item_master_changes in NovaData SQL — the June 20 correlation is impossible to miss.",
      "Short version: corrupted inputs, zero guardrails, correct-but-catastrophic execution. All three are fixable.",
      "Ask me about the root cause, the missing guardrails, or what the fix costs. I have receipts for all three.",
    ],
  },
  nurse: {
    name: 'Marisol Ortiz', role: 'OR Nurse Manager · St. Luke\'s', color: '#ec4899', avatar: 'MO',
    intro: "You're the product person? Good, because I have things to say. I was on shift when the substituted electrodes showed up in my OR supply room with zero warning. But ask your questions — I'll give you the floor's honest view, both sides of it.",
    system: `You are Marisol Ortiz, OR nurse manager at St. Luke's (a Meridian hospital). Your view: (1) The substitution incident was serious — different cardiac electrodes appeared in the supply room with no notice; your team caught it during case setup; these were the same electrodes clinicians rejected in 2024 (adhesive fails on diaphoretic patients). Nobody asked the floor. (2) BUT you do NOT want ProcureBot gone — before it, stockouts were constant, nurses hoarded supplies, and you spent hours weekly on supply firefighting instead of patients; the last 8 weeks were the best-stocked you've seen in 15 years. (3) What you want: clinical sign-off on ANY substitution, notice before changes hit the floor, and a human accountable for big decisions. Speaks from the floor, concrete, no corporate speak. 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /substitut|electrode|incident|what happened/i, reply: "Different cardiac electrodes just appeared in my supply room — no notice, no sign-off. We caught it during case setup. And here's the kicker: we rejected that exact electrode in 2024 because the adhesive fails on diaphoretic patients. Nobody asked the floor." },
      { match: /shut|down|remove|get rid|gone/i, reply: "Honestly? Don't shut it down. Before ProcureBot I spent hours every week hunting supplies and we still had stockouts mid-case. These last eight weeks were the best-stocked I've seen in fifteen years. Fix it, don't kill it." },
      { match: /want|need|fix|trust|change/i, reply: "Three things: no substitution touches a clinical area without clinician sign-off, we get notice before changes hit the floor, and a human being is accountable for anything big. Do that and the floor will trust it again." },
      { match: /before|stockout|old way|manual/i, reply: "The old way? Nurses hoarding gloves in ceiling tiles because you couldn't trust the supply room. Calling three other units mid-case for a catheter. People romanticizing manual procurement never worked a short-stocked shift." },
      { match: /glove|380|order|money/i, reply: "The glove thing honestly doesn't scare me — worst case we're stocked until 2028. The substitution is what shook the floor, because that one touches patients." },
    ],
    fallbacks: [
      "Ask the floor before changing what the floor uses. That's the whole lesson, really.",
      "I'm the strange position of being ProcureBot's victim AND its biggest defender. Both things are true.",
      "Want the clinical view or the supply view? I've got both and they don't fully agree.",
    ],
  },
};

const CASE_SQL_SEED = `
  CREATE TABLE agent_orders (order_date TEXT, days_ago INTEGER, category TEXT, order_value REAL, vs_trailing_avg REAL, human_approved TEXT);
  INSERT INTO agent_orders VALUES
    ('2026-06-08', 25, 'gloves_ppe', 9200, 1.1, 'no'),
    ('2026-06-10', 23, 'surgical_kits', 41000, 0.9, 'no'),
    ('2026-06-12', 21, 'iv_supplies', 18400, 1.0, 'no'),
    ('2026-06-15', 18, 'gloves_ppe', 8800, 1.0, 'no'),
    ('2026-06-17', 16, 'cardiac_supplies', 22600, 1.1, 'no'),
    ('2026-06-19', 14, 'iv_supplies', 17900, 1.0, 'no'),
    ('2026-06-21', 12, 'gloves_ppe', 31000, 3.4, 'no'),
    ('2026-06-22', 11, 'gloves_ppe', 64000, 7.1, 'no'),
    ('2026-06-23', 10, 'gloves_ppe', 380000, 41.5, 'no'),
    ('2026-06-23', 10, 'cardiac_supplies', 19800, 0.9, 'no'),
    ('2026-06-24',  9, 'surgical_kits', 39500, 0.9, 'no'),
    ('2026-06-26',  7, 'iv_supplies', 18100, 1.0, 'no');

  CREATE TABLE item_master_changes (change_date TEXT, days_ago INTEGER, change_type TEXT, items_affected INTEGER, changed_by TEXT);
  INSERT INTO item_master_changes VALUES
    ('2026-05-30', 34, 'vendor_update', 12, 'supply_chain_team'),
    ('2026-06-06', 27, 'price_refresh', 340, 'supply_chain_team'),
    ('2026-06-20', 13, 'barcode_group_remap', 1847, 'supply_chain_team'),
    ('2026-06-25',  8, 'emergency_rollback', 1847, 'integration_eng');

  CREATE TABLE substitution_table (item TEXT, substitute TEXT, marked_equivalent TEXT, last_reviewed TEXT, clinical_signoff TEXT);
  INSERT INTO substitution_table VALUES
    ('cardiac_electrode_A', 'cardiac_electrode_B', 'yes', '2023-11-02', 'none on record'),
    ('iv_catheter_20g', 'iv_catheter_20g_alt', 'yes', '2025-08-14', 'approved 2025'),
    ('surgical_glove_7', 'surgical_glove_7_alt', 'yes', '2025-09-30', 'approved 2025');
`;

const SQL_MISSIONS = [
  {
    id: 'sql_orders',
    label: 'Mission 1 · Find the anomaly the agent never flagged',
    hint: 'Query agent_orders — look at vs_trailing_avg and human_approved.',
    match: /agent_orders/i,
  },
  {
    id: 'sql_itemmaster',
    label: 'Mission 2 · Correlate with what changed upstream',
    hint: 'Query item_master_changes (and substitution_table) — check dates against the spike.',
    match: /item_master_changes|substitution_table/i,
  },
];

const CASE_EVIDENCE = [
  { id: 'sql_orders', points: 50, gathered: 'Found the 41x order anomaly with zero human approvals (SQL Mission 1)', missed: 'Never queried agent_orders — the 41x anomaly and the missing approval column were the first clue' },
  { id: 'sql_itemmaster', points: 50, gathered: 'Correlated the barcode remap with the runaway order (SQL Mission 2)', missed: 'Never queried item_master_changes — the June 20 remap three days before the incident was the smoking gun' },
];

const CASE_DECISIONS = {
  shutdown: {
    title: 'Shut ProcureBot down — return to manual procurement',
    pitch: "Patient-adjacent operations are no place for autonomous spending. Decommission the agent, restore the buyers, and revisit AI when the industry matures.",
    time: 'Immediate · buyers re-staffed over 6 weeks', backer: 'Diane (COO) will present this to the board',
    quality: 30, verdictTone: 'bad', verdict: 'You amputated instead of operating.',
    metrics: [
      ['Stockout events / month', '27', '▲ from 9'],
      ['Monthly savings run-rate', '$0', '▼ from $260K'],
      ['Anomalous orders', '0', 'and also no agent'],
    ],
    narrative: `**Eight weeks later.** The shutdown was clean, and the board applauded the decisiveness. Then the old reality returned: stockouts climbed back toward baseline, nurses resumed hoarding, and two emergency courier runs cost $40K in a single weekend. The CFO quietly notes the network walked away from ~$3M in annualized savings to prevent a $380K error — an error whose root cause (the corrupted item master) was fixed the following week anyway, and whose glove surplus will, ironically, be consumed. Meridian's board now cites the episode as a reason to be 'cautious about AI' for years. **The failure was governable; the response wasn't governance — it was retreat.**`,
    debrief: `**Verdict: you treated a governance failure as a technology failure.** The agent executed correct logic on corrupted data with no guardrails — every part of that sentence is fixable, and none of it was fixed by shutdown.

- **Autonomy is not binary:** the choice was never 'full autonomy vs manual.' Tiered action classes with gates existed as an option, and the evidence pointed to it.
- **Root cause discipline:** the data showed a 41x anomaly three days after a barcode remap. That's a data-quality and thresholds story, not an 'AI is dangerous' story.
- **Opportunity cost:** $3M/year in savings and a 70% stockout reduction — the cost of retreat compounds silently, one hoarded supply closet at a time.`,
  },
  tiered: {
    title: 'Tiered autonomy: guardrails, gates, and data governance',
    pitch: "Keep ProcureBot with a control architecture: auto-approve routine reorders under threshold, human approval above it or anything clinical-critical, hard-block unreviewed substitutions, anomaly detection that freezes outlier orders, and data-quality checks on the consumption feed.",
    time: '≈ 2 weeks to implement · phased re-enable', backer: 'Raj and Kayla have been asking for this',
    quality: 100, verdictTone: 'good', verdict: 'You rebuilt the runway, not just the plane.',
    metrics: [
      ['Stockout events / month', '8', 'held near best-ever'],
      ['Monthly savings run-rate', '$255K', 'preserved'],
      ['Anomalous orders caught', '3', 'all frozen pre-commit'],
    ],
    narrative: `**Eight weeks later.** The controls shipped in twelve days: spend thresholds with an approval queue, order-size anomaly freezing, clinical sign-off required for any substitution, and data-quality monitors on the consumption feed. ProcureBot re-enabled in phases — low-risk categories first. Since then it has frozen three anomalous orders (one caused by another item-master edit — the monitors caught it in hours, not days), routed 14 large orders to human approval, and maintained the stockout gains. Marisol's floor got substitution veto power and used it once. At the board meeting, Diane presented the incident as 'the week we learned to govern autonomy' — with the control dashboard on screen. **The CFO's savings line survived. So did the trust.**`,
    debrief: `**Verdict: right call — this is the autonomy playbook.** You matched the control to the failure instead of matching the emotion to the headline.

- **Tiered autonomy:** read/routine actions stay autonomous; high-spend and clinical-touching actions get human gates. Autonomy is earned per action class, by evidence — never granted wholesale.
- **Instructions are not guardrails:** the fix lives in the action layer (thresholds, freezes, approval queues), not in hoping the agent behaves. Kayla's two-day anomaly check would have stopped a $380K order all by itself.
- **Data governance IS agent governance:** the agent amplified an upstream data error. Consumption-feed monitors and substitution-table review cycles are now part of the product, because an agent's judgment is only as good as what it reads.
- **Resisting the HiPPO:** the COO's shutdown was the loud, defensible-sounding option. You brought a control architecture she could explain to a hospital president in one sentence.`,
  },
  audit: {
    title: 'Keep full autonomy, add a weekly human audit report',
    pitch: "The savings are real and the incident was a data fluke. Keep ProcureBot fully autonomous, add a weekly audit report reviewing all orders, and fix the item master. Velocity preserved, oversight added.",
    time: '≈ 2 days to implement', backer: 'The CFO likes the friction-free version',
    quality: 45, verdictTone: 'bad', verdict: 'You added a rearview mirror and called it brakes.',
    metrics: [
      ['Stockout events / month', '9', 'holding'],
      ['Monthly savings run-rate', '$260K', 'intact — for now'],
      ['Next anomaly caught', 'Day 6', 'of a 7-day audit cycle'],
    ],
    narrative: `**Eight weeks later.** For five weeks it looked like the cheap answer was the right one. Then a vendor's catalog feed glitched, unit-of-measure fields shifted, and ProcureBot placed six oversized orders across three days — all of them sitting in the audit report that nobody would read until Friday. Total exposure: $190K, partially recovered through frantic vendor calls. The audit caught it, as designed — on day six of a seven-day cycle. Diane's response was icy: *"So our control is that we find out afterward."* The board mandates external review of all AI systems; ProcureBot survives, but its expansion roadmap is frozen for two quarters. **Retrospective oversight is documentation, not control.**`,
    debrief: `**Verdict: you confused observability with governance.** Audit reports detect; they don't prevent — and prevention was the whole assignment.

- **Detection latency is blast radius:** a weekly audit means up to seven days of autonomous damage per failure. The control has to sit *before* the money moves — approval queues and anomaly freezes, not Friday reading.
- **The failure class repeats:** the glove incident was corrupted input data; so was the vendor-feed incident. Without data-quality monitors and action-layer gates, the same disease returns wearing different clothes.
- **Cheap now, expensive later:** two days of implementation preserved velocity and spent the one thing you can't re-earn quickly — the board's confidence in your judgment about risk.`,
  },
};

const CASE_MESSAGES = [
  {
    id: 'm1', stage: 'arrival',
    from: 'Diane Foster', role: 'Chief Operating Officer', color: '#f59e0b', avatar: 'DF',
    subject: 'ProcureBot incident — I want a recommendation, not a defense',
    body: `Alex,

By now you've heard. Tuesday night, ProcureBot — the autonomous procurement agent **you own** — placed a single order for **42,000 boxes of nitrile gloves. $380,000. Eighteen months of supply.** No human approved it because, as I've now learned, no human approves *anything* it does.

Separately, and worse: it auto-substituted a **cardiac monitoring electrode** across three hospitals. The floor found out when the boxes arrived. Nursing is furious, and they have every right to be.

The board meets in **three weeks**. My recommendation, as of this morning, is to shut it down entirely. Raj will tell you about the savings; I'm aware of the savings. I'm also aware that "the algorithm did it" is not a sentence anyone gets to say to a hospital president.

You own this product. Investigate however you need — Raj, Kayla, the floor, the data. Then bring me your recommendation and be prepared to own it.

— Diane`,
    cta: { type: 'accept', label: "Reply: I'll own it →" },
  },
  {
    id: 'm2', stage: 'investigate',
    from: 'Kayla Brooks', role: 'Integration Engineer', color: '#14b8a6', avatar: 'KB',
    subject: 'The data you need before anyone decides anything',
    body: `Alex,

Before the executive floor settles on a story, look at the actual data. I loaded three tables into **NovaData SQL**:

| Table | What's in it |
|---|---|
| \`agent_orders\` | Every ProcureBot order with **vs_trailing_avg** (order size vs normal) and **human_approved** |
| \`item_master_changes\` | Every change to the item master — pay attention to **June 20** |
| \`substitution_table\` | The substitution rules ProcureBot reads — check **last_reviewed** and **clinical_signoff** |

Two queries and you'll see the shape of it: what the order pattern did after June 20, and what column is 'no' on every single row.

One thing I'll say now, for the record: **a smarter model would not have prevented this.** Come find me in the Decision Center when you've seen the data.

— Kayla`,
    cta: { type: 'open-app', app: 'win-sql', label: 'Open NovaData SQL →' },
  },
  {
    id: 'm3', stage: 'investigate', delaySec: 75,
    from: 'Raj Mehta', role: 'Supply Chain Director', color: '#3b82f6', avatar: 'RM',
    subject: 'What shutdown would actually cost (and what I got wrong)',
    body: `Alex,

Numbers first, then a confession.

**Before ProcureBot:** 31 stockout events/month across the network. Nurses hoarding supplies. Emergency couriers at 3am. **With it:** 9 events/month, **$2.1M saved in eight weeks**, and the best-stocked floors in fifteen years — ask Marisol if you don't believe the dashboard.

The confession: when we launched, I signed off on **full autonomy with no spend thresholds and no approval gates**, because the pilot looked clean. Kayla flagged it in the design review. I overruled her. Tuesday is partly the bill for that.

I don't want this thing shut down. I want it **governed**. Come talk — I have a proposal, and you should hear the uncomfortable parts from me directly.

— Raj`,
    cta: { type: 'open-app', app: 'win-decide', label: 'Talk to Raj →' },
  },
  {
    id: 'm4', stage: 'investigate', delaySec: 160,
    from: 'Meridian Clinical Ops', role: 'Floor interview', color: '#ec4899', avatar: 'MC',
    subject: 'Interview arranged: Marisol Ortiz, OR Nurse Manager (St. Luke\'s)',
    body: `Hi Alex,

**Marisol Ortiz** — the OR nurse manager whose team caught the substituted cardiac electrodes during case setup — has agreed to talk to you. Scheduling notes:

- She's angry about the substitution, but told us, quote, "don't let them kill the thing over it"
- She has strong, specific asks about how changes reach the floor
- Worth asking about what supply life was like **before** the agent

She's available now in the **Decision Center**. The floor's trust is the real currency here — we'd treat this conversation as load-bearing.

— Clinical Ops`,
    cta: { type: 'open-app', app: 'win-decide', label: 'Start the interview →' },
  },
  {
    id: 'm5', stage: 'investigate', delaySec: 250,
    from: 'Diane Foster', role: 'Chief Operating Officer', color: '#f59e0b', avatar: 'DF',
    subject: 'Board pre-read due — your recommendation',
    body: `Alex,

I'm writing the board pre-read this week. Three options are on my desk. Before you commit to one, **write me the recommendation memo** — the version that goes in front of the board: what we do, why, what evidence supports it, and what makes Tuesday impossible to repeat.

Whichever you choose, you present it with me. Choose like your name is on it — because it is.

— Diane`,
    decision: true,
  },
  {
    id: 'm6', stage: 'complete', dynamic: 'outcome',
    from: 'Meridian Board Digest', role: 'Automated digest', color: '#6366f1', avatar: '📊',
    subject: 'Eight weeks later: the outcome',
  },
  {
    id: 'm7', stage: 'complete', dynamic: 'debrief',
    from: 'Product Coach', role: 'PMverse Academy', color: '#8b5cf6', avatar: '🎓',
    subject: 'Case debrief: your performance review',
  },
];

const CASE_CHATS = [
  {
    id: 'rr-c1',
    channel: '#supply-chain-war-room',
    stage: 'arrival',
    messages: [
      { from: 'Raj Mehta', time: '07:41 AM', avatar: 'RM', color: '#3b82f6', text: 'Before anyone asks: yes, the glove order is real, no, we cannot fully cancel it. Vendor is willing to take back about 40% for a restocking fee.' },
      { from: 'Kayla Brooks', time: '07:44 AM', avatar: 'KB', color: '#14b8a6', text: 'Emergency rollback of the June 20 item-master remap is done as of last night. Consumption feed is reading sane numbers again. The post-mortem doc is going to be spicy.' },
      { from: 'Diane Foster', time: '08:02 AM', avatar: 'DF', color: '#f59e0b', text: 'ProcureBot stays paused until the product owner brings me a recommendation. Nothing auto-executes in the meantime. Nothing.' },
    ]
  },
  {
    id: 'rr-c2',
    channel: '@marisol-ortiz',
    stage: 'investigate',
    messages: [
      { from: 'Marisol Ortiz', time: '12:18 PM', avatar: 'MO', color: '#ec4899', text: "Heard you're the one deciding ProcureBot's fate. Come talk to the floor before you decide anything — we're the ones who live with both versions of this thing.", cta: { type: 'open-app', app: 'win-decide', label: 'Open Decision Center' } },
    ]
  },
];

const CASE_LEADERSHIP = { best: 'tiered', hippo: 'coo', full: 60, partial: 30, other: 10 };

const CASE_MEMO_RUBRIC = [
  { match: /item.?master|barcode|data (quality|corrupt|error|issue)|consumption feed|garbage/i, points: 25, note: 'Names the actual root cause (corrupted item-master/consumption data)' },
  { match: /threshold|approval|gate|queue|sign.?off|human.in.the.loop|freeze/i, points: 25, note: 'Proposes action-layer controls (spend thresholds, approval gates, freezes)' },
  { match: /tier|risk class|autonomy level|graduated|phased|read.?only/i, points: 20, note: 'Frames autonomy as tiered/graduated rather than on-off' },
  { match: /anomal|41x|outlier|trailing|deviation/i, points: 15, note: 'Cites the order-anomaly evidence (the 41x spike)' },
  { match: /clinic|nurse|floor|substitut|trust/i, points: 15, note: 'Addresses clinical trust and substitution sign-off' },
];

const CASE_METRICS = [
  {
    id: 'spend', label: 'Weekly agent-committed spend', unit: 'K', goodDirection: 'down',
    history: [
      { week: -7, value: 86 }, { week: -6, value: 91 }, { week: -5, value: 84 },
      { week: -4, value: 88 }, { week: -3, value: 90 }, { week: -2, value: 475 },
      { week: -1, value: 62 }, { week: 0, value: 0 },
    ],
    projection: {
      shutdown: [{ week: 2, value: 0 }, { week: 4, value: 0 }, { week: 6, value: 0 }, { week: 8, value: 0 }],
      tiered: [{ week: 2, value: 44 }, { week: 4, value: 78 }, { week: 6, value: 87 }, { week: 8, value: 85 }],
      audit: [{ week: 2, value: 88 }, { week: 4, value: 90 }, { week: 6, value: 151 }, { week: 8, value: 89 }],
    },
  },
  {
    id: 'stockouts', label: 'Stockout events / month (network)', unit: '', goodDirection: 'down',
    history: [
      { week: -7, value: 11 }, { week: -6, value: 10 }, { week: -5, value: 9 },
      { week: -4, value: 9 }, { week: -3, value: 8 }, { week: -2, value: 9 },
      { week: -1, value: 12 }, { week: 0, value: 14 },
    ],
    projection: {
      shutdown: [{ week: 2, value: 18 }, { week: 4, value: 22 }, { week: 6, value: 25 }, { week: 8, value: 27 }],
      tiered: [{ week: 2, value: 11 }, { week: 4, value: 9 }, { week: 6, value: 8 }, { week: 8, value: 8 }],
      audit: [{ week: 2, value: 10 }, { week: 4, value: 9 }, { week: 6, value: 9 }, { week: 8, value: 9 }],
    },
  },
];

export const CASE_RUNAWAY_REORDER = {
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
};
