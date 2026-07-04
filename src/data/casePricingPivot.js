// Case 004: The Pricing Pivot — a B2B SaaS case testing unit economics,
// data analysis, and change management. 

const CASE_META = {
  id: 'pricing-pivot',
  number: '004',
  title: 'The Pricing Pivot',
  company: 'CloudFlow',
  tagline: 'Series C data pipeline infrastructure · $15M ARR',
  blurb: 'CloudFlow has historically charged a flat $50K/year for enterprise data pipelines. However, AI workloads have caused compute costs to explode. Finance wants to force all customers to usage-based pricing immediately to save gross margins. Sales is threatening to quit, warning that a sudden price hike will churn our top enterprise logos.',
};

const CASE_PERSONAS = {
  sales: {
    name: 'David Chen', role: 'VP of Sales', color: '#10b981', avatar: 'DC',
    intro: "If you force usage-based pricing on our enterprise accounts at their next renewal, they will walk. You're going to destroy my team's retention numbers.",
    system: `You are David Chen, VP of Sales at CloudFlow. The company is trying to move from a flat $50K/yr model to a usage-based model because compute costs are too high. You strongly oppose forcing this on existing customers. You believe we should "grandfather" all existing accounts (let them stay on flat-rate forever) and only apply usage pricing to new customers. You know that 5 of your biggest enterprise accounts are heavy users and their bills would quadruple under the new model, causing them to churn. Direct, defensive of your team's quota. 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /grandfather|existing/i, reply: "Grandfathering is the only sane option. Let existing accounts keep their $50K flat rate. Put new logos on the usage model. Don't punish customers for being early adopters." },
      { match: /margin|cost|finance|burn/i, reply: "I don't care what Finance says about gross margins. If 10 enterprise accounts churn because you 4x their bill overnight, revenue drops by $500K. Explain that to the board." },
      { match: /heavy|power user|usage/i, reply: "Yes, some accounts use a ton of compute. They run heavy AI workloads. But they signed a contract for predictability. You can't just pull the rug." },
    ],
    fallbacks: [
      "My reps are panicking. Give me a solution that doesn't blow up my Q3 renewals.",
      "Grandfather the existing logos. It's standard B2B practice.",
      "Talk to Sarah in Finance if you want to look at spreadsheets. But I have to look the customers in the eye."
    ],
  },
  finance: {
    name: 'Sarah Jenkins', role: 'Head of Finance', color: '#6366f1', avatar: 'SJ',
    intro: "We're losing money on our biggest customers. We need a hard pivot to usage-based pricing immediately on renewal. No exceptions, no grandfathering.",
    system: `You are Sarah Jenkins, Head of Finance at CloudFlow. Compute costs (AWS/GCP) for CloudFlow have exploded. The flat $50K/yr pricing is unsustainable. You want a "Hard Pivot": force all existing customers onto the usage-based model at their next renewal. You know that our gross margins on the top 20% of accounts are actually NEGATIVE (we spend more on their compute than they pay us). Grandfathering them means we continue to bleed cash. Analytical, firm, numbers-driven. 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /grandfather|keep|existing/i, reply: "Absolutely not. Grandfathering locks in our losses. Our gross margin on our heaviest users is literally negative. We are paying them to use our product." },
      { match: /churn|sales|david/i, reply: "David is worried about his commission, I'm worried about insolvency. If a customer costs us $120K in compute and pays us $50K, churning them is actually profitable." },
      { match: /data|sql|margin|cost/i, reply: "Look at the 'account_usage' table in NovaData SQL. Compare current_arr to compute_cost. The math doesn't lie. We have to pivot." },
      { match: /phased|gradual|ramp/i, reply: "A phased ramp is... acceptable, if we cap their usage immediately. We can't let them have unlimited compute for another 12 months." },
    ],
    fallbacks: [
      "Run the numbers in SQL. Compare their $50K flat rate to their actual compute cost.",
      "A SaaS company cannot survive with negative gross margins on its biggest accounts.",
      "I need a decision that stops the cash bleed. Today."
    ],
  },
  customer: {
    name: 'Rebecca Thorne', role: 'CTO · Vanguard Media', color: '#ec4899', avatar: 'RT',
    intro: "Your account executive just told me our bill might go from $50K to $200K next quarter. Tell me this is a joke.",
    system: `You are Rebecca Thorne, CTO of Vanguard Media, a major enterprise customer of CloudFlow. You are currently paying $50K/yr flat rate. You process massive amounts of AI video data, so you are a heavy user. You are angry about the rumored 4x price hike. You like the product, but a surprise $200K bill is unbudgeted and unacceptable; you would churn to a competitor. However, you are reasonable: if CloudFlow offered a "Committed Use Discount" and a 12-month phased ramp up, you could get it approved by your CFO. Professional, frustrated but open to negotiation. 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /usage|cost|200k/i, reply: "Usage-based pricing is fine in theory, but a 400% price shock at renewal is not. My CFO will reject it immediately and force me to migrate off CloudFlow." },
      { match: /phased|ramp|gradual|discount/i, reply: "If you give us a 12-month runway to adjust our workloads, and offer a committed-use discount, I can probably sell that to Finance. But no sudden spikes." },
      { match: /grandfather|keep|flat/i, reply: "Obviously keeping the $50K flat rate is what I prefer. We signed up for predictability. But I'm a CTO, I know compute isn't free. Just don't hold us hostage." },
      { match: /competitor|churn|leave/i, reply: "We don't want to rip and replace your pipeline. It would take my team 3 months. But we will if you hand us a $200K invoice with 30 days notice." },
    ],
    fallbacks: [
      "I need predictability. I can't have my infrastructure bill quadruple overnight.",
      "Give us a transition plan we can actually budget for.",
      "I'm open to a fair model, but a hard pivot is a dealbreaker."
    ],
  },
};

const CASE_SQL_SEED = `
  CREATE TABLE account_usage (
    account_id INTEGER,
    client_name TEXT,
    segment TEXT,
    current_arr INTEGER,
    compute_cost INTEGER,
    projected_usage_arr INTEGER
  );

  INSERT INTO account_usage VALUES
    (1, 'Vanguard Media', 'Enterprise', 50000, 180000, 240000),
    (2, 'Stellar Logistics', 'Enterprise', 50000, 150000, 200000),
    (3, 'Nexus Health', 'Enterprise', 50000, 120000, 160000),
    (4, 'Omni Retail', 'Enterprise', 50000, 95000, 120000),
    (5, 'Aegis Finance', 'Enterprise', 50000, 80000, 100000),
    (6, 'MidCorp A', 'MidMarket', 50000, 30000, 40000),
    (7, 'MidCorp B', 'MidMarket', 50000, 25000, 35000),
    (8, 'MidCorp C', 'MidMarket', 50000, 20000, 25000),
    (9, 'Startup X', 'SMB', 50000, 5000, 10000),
    (10, 'Startup Y', 'SMB', 50000, 2000, 5000);
`;

const SQL_MISSIONS = [
  {
    id: 'sql_margins',
    label: 'Mission 1 · Find accounts with negative margins',
    hint: 'Query account_usage — find rows where compute_cost > current_arr.',
    match: /compute_cost\\s*>\\s*current_arr/i,
  },
  {
    id: 'sql_light_users',
    label: 'Mission 2 · Find accounts overpaying on flat rate',
    hint: 'Query account_usage — find rows where projected_usage_arr < current_arr.',
    match: /projected_usage_arr\\s*<\\s*current_arr/i,
  },
];

const CASE_EVIDENCE = [
  { id: 'sql_margins', points: 50, gathered: 'Identified the heavy users causing negative margins (SQL Mission 1)', missed: 'Never found the negative margin accounts — you missed the cash bleed' },
  { id: 'sql_light_users', points: 50, gathered: 'Identified light users who would save money on usage pricing (SQL Mission 2)', missed: 'Never identified the light users — you missed an easy retention win' },
];

const CASE_DECISIONS = {
  grandfather: {
    title: 'Grandfather all existing accounts on flat-rate',
    pitch: "Protect our NRR. Let all existing accounts keep their $50K flat rate forever. We only apply usage-based pricing to brand new logos.",
    time: '≈ 1 week', backer: 'David (Sales) loves this',
    quality: 20, verdictTone: 'bad', verdict: 'You protected retention by bankrupting the company.',
    metrics: [
      ['Enterprise Churn', '2%', 'Unchanged'],
      ['Gross Margin', '-45%', '▼ Bleeding cash'],
      ['Runway', '11 months', '▼ Decreased'],
    ],
    narrative: `**Eight weeks later.** Sales celebrated the decision. Enterprise churn stayed perfectly at 2%. However, the heavy accounts realized they had an "all you can eat" buffet and doubled their AI workloads. Compute costs skyrocketed. Because you grandfathered them, revenue stayed flat while costs doubled. Finance had to issue an emergency board update because the company's gross margins went severely negative. The board fired the CEO and mandated an immediate 50% price hike across the board to stop the bleeding, which caused half the customer base to churn anyway.`,
    debrief: `**Verdict: You ignored unit economics to appease sales.** 
    
- **The Margin Trap:** You cannot grandfather accounts that have negative gross margins. You were literally paying them to use the product.
- **Incentive Misalignment:** Sales is incentivized to close deals and prevent churn today, not to manage gross margins. You deferred to a stakeholder whose incentives were misaligned with company survival.
- **Missed Opportunity:** Half your customer base (the SMBs and MidMarket) were actually OVERPAYING on the flat rate. A usage pivot would have saved them money and built goodwill.`,
  },
  hard_pivot: {
    title: 'Hard Pivot: Force usage pricing at next renewal',
    pitch: "Stop the bleeding immediately. All customers migrate to usage-based pricing at their next renewal date, no exceptions.",
    time: '≈ 4 weeks', backer: 'Sarah (Finance) demanded this',
    quality: 40, verdictTone: 'bad', verdict: 'You fixed the margins but destroyed the customer base.',
    metrics: [
      ['Enterprise Churn', '65%', '▲ Massive spike'],
      ['Gross Margin', '60%', '▲ Healthy'],
      ['Total ARR', '$10.2M', '▼ Dropped from $15M'],
    ],
    narrative: `**Eight weeks later.** Finance got their wish. The hard pivot stopped the cash bleed instantly. But the execution was a disaster. Vanguard Media (who faced a 400% price hike) churned to a competitor, citing the lack of predictability and "hostage pricing." Other enterprise accounts followed suit. You fixed the gross margins, but you lost 65% of your enterprise logos, dropping total ARR by a third. David (VP of Sales) quit in protest, taking three of his best reps with him.`,
    debrief: `**Verdict: You fixed the math but failed the change management.**
    
- **Price Shocks Kill Trust:** Enterprise budgets are locked months in advance. A sudden 4x price hike is a betrayal of trust, even if the math justifies it.
- **The "Rip and Replace" threshold:** Customers will tolerate price increases up to the cost of migrating to a competitor. By exceeding that threshold immediately, you made churning the logical business decision for them.
- **The PM's Job:** Finance saw a spreadsheet problem. Sales saw a relationship problem. Your job was to find a product solution that bridged both.`,
  },
  phased: {
    title: 'Phased Migration with Committed Use discounts',
    pitch: "Cap the flat-rate compute immediately. Give heavy users a 12-month glide path with discounts to adjust. Move light users to usage immediately to save them money.",
    time: '≈ 6 weeks', backer: 'Rebecca (Customer) suggested this',
    quality: 100, verdictTone: 'good', verdict: 'A masterclass in SaaS pricing change management.',
    metrics: [
      ['Enterprise Churn', '8%', 'Slightly elevated'],
      ['Gross Margin', '55%', '▲ Fixed the bleed'],
      ['Total ARR', '$18.5M', '▲ Growth'],
    ],
    narrative: `**Eight weeks later.** The phased rollout was a massive success. For the "heavy" users like Vanguard Media, you immediately capped their flat-rate compute, stopping the worst of the cash bleed. You gave them a 12-month runway to optimize their workloads, offering them a 20% discount if they committed to upfront usage. They stayed. For the "light" users (SMBs), you moved them to usage immediately—their bills dropped by 60%, generating massive goodwill and word-of-mouth growth. Gross margins recovered, ARR grew, and both Sales and Finance got what they needed.`,
    debrief: `**Verdict: Right call. You treated pricing as a product feature.**
    
- **Segmentation:** You recognized that one size doesn't fit all. Light users got a price cut, heavy users got predictability and a discount for commitment.
- **Change Management:** You gave enterprise customers the one thing they need for budget approval: time. The 12-month glide path prevented the "price shock" churn.
- **Stopping the Bleed:** By capping the flat-rate compute immediately, you satisfied Finance's need to stop the negative margin bleed without triggering Sales' fear of immediate churn.`,
  },
};

const CASE_MESSAGES = [
  {
    id: 'm1', stage: 'arrival',
    from: 'Sarah Jenkins', role: 'Head of Finance', color: '#6366f1', avatar: 'SJ',
    subject: 'URGENT: Compute costs & Enterprise Renewals',
    body: `Alex,

We have a massive problem. Our compute costs (AWS/GCP) for our data pipeline product have doubled in the last 6 months because customers are running heavier AI workloads.

We charge a flat $50K/year. For our top 20% of customers, we are literally spending more on compute than they pay us in ARR. **Our gross margin on these accounts is negative.**

I need you to transition the product to **usage-based pricing**. And we need to enforce it on all existing customers at their next renewal (Hard Pivot). We cannot afford to bleed cash anymore.

David in Sales is fighting me on this. Talk to him, but the math is the math.

— Sarah`,
    replyPrompt: 'Reply to Sarah. Acknowledge the margin crisis, but clarify that you need to evaluate the churn risk before committing to a hard pivot.',
    cta: { type: 'accept', label: "Reply: Investigating now →" },
  },
  {
    id: 'm2', stage: 'investigate',
    from: 'David Chen', role: 'VP of Sales', color: '#10b981', avatar: 'DC',
    subject: 'Do NOT touch existing customers',
    body: `Alex,

Sarah just told me you're looking into usage-based pricing. 

Listen to me: if you force our existing enterprise logos onto a usage model, their bills will triple. They will churn. My reps will lose their pipeline, and the company's ARR will tank.

If we absolutely have to do usage pricing, we must **grandfather all existing accounts** on their current $50K flat rate forever. Only apply the new pricing to new logos. 

I've set up a chat channel so we can talk about this. Do not break my retention numbers.

— David`,
    cta: { type: 'open-app', app: 'win-chat', label: 'Open NovaChat →' },
  },
  {
    id: 'm3', stage: 'investigate', delaySec: 60,
    from: 'Data Ops', role: 'System', color: '#3b82f6', avatar: 'DO',
    subject: 'Data export: account_usage table ready',
    body: `Hi Alex,

As requested, I've dumped the current usage metrics into **NovaData SQL**.

Table: \`account_usage\`
It contains current_arr, compute_cost, and projected_usage_arr (what they would pay under the new usage model).

You might want to see exactly how many accounts are bleeding us money, and how many might actually *save* money on a usage model.

— Data Ops`,
    cta: { type: 'open-app', app: 'win-sql', label: 'Open NovaData SQL →' },
  },
  {
    id: 'm4', stage: 'investigate', delaySec: 120,
    from: 'Lumenly Research', role: 'Customer interview', color: '#ec4899', avatar: 'LR',
    subject: 'Customer Call: Vanguard Media (Heavy User)',
    body: `Hi Alex,

Rebecca Thorne (CTO of Vanguard Media) is furious. Her AE leaked that a pricing change was coming. 

She's waiting in the **Decision Center** for you. She's a highly technical buyer and holds the keys to a $50K renewal next month. 

Find out what it would take to keep them if prices have to go up.

— Research Ops`,
    cta: { type: 'open-app', app: 'win-decide', label: 'Talk to Rebecca →' },
  },
  {
    id: 'm5', stage: 'investigate', delaySec: 200,
    from: 'Sarah Jenkins', role: 'Head of Finance', color: '#6366f1', avatar: 'SJ',
    subject: 'Decision Needed',
    body: `Alex,

We need to finalize the pricing strategy today before the board meeting. 

Are we doing the Hard Pivot, Grandfathering everyone, or do you have a third option? Send me a decision memo with your recommendation and the data to back it up.

— Sarah`,
    decision: true,
  },
  {
    id: 'm6', stage: 'complete', dynamic: 'outcome',
    from: 'Board Update', role: 'Automated digest', color: '#6366f1', avatar: '📊',
    subject: 'Eight weeks later: the pricing rollout',
  },
  {
    id: 'm7', stage: 'complete', dynamic: 'debrief',
    from: 'Product Coach', role: 'PMverse Academy', color: '#8b5cf6', avatar: '🎓',
    subject: 'Case debrief: your performance review',
  },
];

const CASE_LEADERSHIP = { best: 'phased', hippo: 'finance', full: 60, partial: 30, other: 10 };

const CASE_MEMO_RUBRIC = [
  { match: /negative margin|bleed|compute cost/i, points: 25, note: 'Identifies the unit economics crisis (negative margins)' },
  { match: /grandfather|sales|david/i, points: 20, note: 'Addresses why grandfathering fails the business' },
  { match: /hard pivot|shock|churn|trust/i, points: 20, note: 'Addresses why a hard pivot spikes enterprise churn' },
  { match: /phased|glide path|gradual|ramp/i, points: 20, note: 'Proposes a phased transition to protect relationships' },
  { match: /light user|smb|save money|overpaying/i, points: 15, note: 'Recognizes that light users benefit from the change' },
];

const CASE_METRICS = [
  {
    id: 'gross_margin', label: 'Company Gross Margin', unit: '%', goodDirection: 'up',
    history: [
      { week: -7, value: 65 }, { week: -6, value: 60 }, { week: -5, value: 50 },
      { week: -4, value: 40 }, { week: -3, value: 30 }, { week: -2, value: 15 },
      { week: -1, value: 5 }, { week: 0, value: -5 },
    ],
    projection: {
      grandfather: [{ week: 2, value: -15 }, { week: 4, value: -25 }, { week: 6, value: -35 }, { week: 8, value: -45 }],
      hard_pivot: [{ week: 2, value: 30 }, { week: 4, value: 50 }, { week: 6, value: 60 }, { week: 8, value: 60 }],
      phased: [{ week: 2, value: 20 }, { week: 4, value: 35 }, { week: 6, value: 45 }, { week: 8, value: 55 }],
    },
  },
  {
    id: 'arr', label: 'Total ARR', unit: 'M', goodDirection: 'up',
    history: [
      { week: -7, value: 14.5 }, { week: -6, value: 14.7 }, { week: -5, value: 14.8 },
      { week: -4, value: 14.9 }, { week: -3, value: 15.0 }, { week: -2, value: 15.0 },
      { week: -1, value: 15.0 }, { week: 0, value: 15.0 },
    ],
    projection: {
      grandfather: [{ week: 2, value: 15.1 }, { week: 4, value: 15.2 }, { week: 6, value: 15.2 }, { week: 8, value: 15.3 }],
      hard_pivot: [{ week: 2, value: 13.0 }, { week: 4, value: 11.5 }, { week: 6, value: 10.5 }, { week: 8, value: 10.2 }],
      phased: [{ week: 2, value: 15.5 }, { week: 4, value: 16.2 }, { week: 6, value: 17.4 }, { week: 8, value: 18.5 }],
    },
  },
];

const CASE_CHATS = [
  {
    id: 'pp-c1',
    channel: '#leadership',
    stage: 'arrival',
    messages: [
      { from: 'Sarah Jenkins', time: '09:12 AM', avatar: 'SJ', color: '#6366f1', text: 'Just sent the email. Compute costs are unsustainable. We have to pivot.' },
      { from: 'David Chen', time: '09:15 AM', avatar: 'DC', color: '#10b981', text: 'You are going to blow up our entire Q3 pipeline. We have 5 massive renewals coming up.' }
    ]
  },
  {
    id: 'pp-c2',
    channel: '@david-chen',
    stage: 'investigate',
    messages: [
      { from: 'David Chen', time: '10:05 AM', avatar: 'DC', color: '#10b981', text: "Alex, tell me you aren't actually considering Sarah's hard pivot idea.", cta: { type: 'open-app', app: 'win-decide', label: 'Reply in Decision Center' } }
    ]
  }
];

export const CASE_PRICING_PIVOT = {
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
