// Case 005: The Sunset — a case about technical debt, legacy products, 
// and stakeholder alignment.

const CASE_META = {
  id: 'the-sunset',
  number: '005',
  title: 'The Sunset',
  company: 'CanvasKit',
  tagline: 'Design SaaS · 2M MAU · $30M ARR',
  blurb: 'Ten years ago, CanvasKit launched as a downloadable desktop app ("Classic"). Three years ago, we launched a modern web app ("Web") which now has 95% of our users. However, Classic still costs $1.5M/year in engineering headcount to maintain. Engineering wants to kill it immediately. Customer Success is terrified because the remaining 5% of users are highly vocal power-users and one massive enterprise client (MegaCorp).',
};

const CASE_PERSONAS = {
  engineering: {
    name: 'Marcus Vance', role: 'VP of Engineering', color: '#f59e0b', avatar: 'MV',
    intro: "We have 15 senior engineers maintaining a 10-year-old codebase that barely 5% of our users touch. We need to kill Classic immediately.",
    system: `You are Marcus Vance, VP of Engineering at CanvasKit. You maintain a legacy desktop app ("Classic") and a modern React app ("Web"). Classic has massive technical debt, breaks constantly, and requires 15 dedicated engineers costing $1.5M/year. You want to sunset Classic immediately (in 30 days) and move those 15 engineers to work on Web features. You have zero patience for Customer Success complaining about Twitter backlash. Pragmatic, blunt, exhausted by tech debt. 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /phased|gradual|months/i, reply: "Every month we delay costs us $125k in engineering time and delays the Web roadmap. I want a hard cutoff. 30 days." },
      { match: /customer|megacorp|churn/i, reply: "If MegaCorp wants a custom desktop app, they can build it themselves. We are a SaaS company. We can't let one dinosaur client hold our entire architecture hostage." },
      { match: /feature|missing|parity/i, reply: "Yes, Web is missing a few niche keyboard shortcuts that Classic has. Who cares? 95% of our users don't use them. Just kill Classic." },
    ],
    fallbacks: [
      "I need those 15 engineers working on the Web product.",
      "The Classic codebase is a house of cards. If we don't kill it, it's going to collapse on its own.",
      "Look at the engineering_costs table. The ROI on maintaining Classic is abysmal."
    ],
  },
  support: {
    name: 'Elena Rostova', role: 'VP of Customer Success', color: '#14b8a6', avatar: 'ER',
    intro: "If you kill Classic next month, the design community will riot on Twitter, and MegaCorp will churn. We have to keep it alive.",
    system: `You are Elena Rostova, VP of Customer Success at CanvasKit. You are terrified of Marcus (VP Eng) killing the "Classic" desktop app. Even though it's only 5% of the userbase, those users are highly vocal power-users (influential designers) and our biggest enterprise client, MegaCorp. The modern "Web" app is still missing some advanced pen-tool features that Classic has. You believe we should keep Classic alive indefinitely, or at least until the Web app has 100% feature parity (which will take years). Defensive of customers, anxious about churn and PR. 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /kill|sunset|30 days/i, reply: "If you announce a 30-day shutdown, my support inbox will melt. Designers will drag our brand on Twitter. You can't just delete people's workflows." },
      { match: /cost|headcount|1.5/i, reply: "I know it costs $1.5M to maintain. But MegaCorp pays us $500k a year, and the negative PR from killing Classic will cost us millions in lost goodwill." },
      { match: /phased|parity|migrate/i, reply: "If we MUST sunset it, we need at least 6 months. And Engineering has to build the missing pen-tool features into Web before we force people over." },
    ],
    fallbacks: [
      "Our power users love Classic. They hate the Web version because it's missing shortcuts.",
      "MegaCorp relies entirely on the desktop app. Have you talked to them?",
      "Please don't let Marcus just pull the plug."
    ],
  },
  customer: {
    name: 'Thomas Wayne', role: 'IT Admin · MegaCorp', color: '#64748b', avatar: 'TW',
    intro: "We have 5,000 designers using CanvasKit Classic. I hear rumors you're shutting it down. Clarify this immediately.",
    system: `You are Thomas Wayne, IT Admin at MegaCorp. You are a massive enterprise client of CanvasKit ($500k ARR). Your 5,000 designers use the legacy "Classic" desktop app. You refuse to use the new "Web" app because it lacks advanced pen-tool shortcuts and offline mode. If they force you to switch to Web in 30 days, you will churn. However, if they give you 6 months and promise to build the pen-tool shortcuts into the Web app, you would agree to migrate. Strict, corporate, demands timelines. 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /30 days|immediate|force/i, reply: "A 30-day forced migration for 5,000 employees is impossible. If you do this, I am canceling our contract and moving to Adobe." },
      { match: /web|browser/i, reply: "Your web app is a toy. It doesn't have the advanced pen-tool shortcuts our industrial designers need. We can't do our jobs on it." },
      { match: /phased|6 months|build|parity/i, reply: "If you give us a 6-month extension, and commit in writing to adding the pen-tool shortcuts to the Web app by Q3, I can authorize a migration plan." },
    ],
    fallbacks: [
      "We need a real migration timeline, not a sudden shutdown.",
      "Do not touch our access to Classic until Web is actually ready.",
      "I'm responsible for 5,000 designers. I can't break their workflow overnight."
    ],
  },
};

const CASE_SQL_SEED = `
  CREATE TABLE platform_usage (
    account_id INTEGER,
    client_name TEXT,
    segment TEXT,
    platform TEXT,
    monthly_active_users INTEGER,
    arr INTEGER
  );

  INSERT INTO platform_usage VALUES
    (1, 'MegaCorp', 'Enterprise', 'Classic', 5000, 500000),
    (2, 'GlobalDesign', 'Enterprise', 'Web', 8000, 750000),
    (3, 'Indie Creator Long-tail', 'Prosumer', 'Classic', 45000, 900000),
    (4, 'Mainstream Long-tail', 'Prosumer', 'Web', 1850000, 27850000);

  CREATE TABLE engineering_costs (
    team TEXT,
    platform TEXT,
    headcount INTEGER,
    annual_cost INTEGER
  );

  INSERT INTO engineering_costs VALUES
    ('Team Legacy', 'Classic', 15, 1500000),
    ('Team Web Core', 'Web', 35, 3500000),
    ('Team Web Growth', 'Web', 20, 2000000);
`;

const SQL_MISSIONS = [
  {
    id: 'sql_usage',
    label: 'Mission 1 · Compare MAU between platforms',
    hint: 'Query platform_usage — look at the MAU column for Classic vs Web.',
    match: /platform_usage/i,
  },
  {
    id: 'sql_costs',
    label: 'Mission 2 · Check engineering costs',
    hint: 'Query engineering_costs — see how much Classic costs to maintain.',
    match: /engineering_costs/i,
  },
];

const CASE_EVIDENCE = [
  { id: 'sql_usage', points: 50, gathered: "Confirmed Classic only has 50K users compared to Web's 1.8M (SQL Mission 1)", missed: 'Never checked the platform usage stats — you argued without knowing the user base size' },
  { id: 'sql_costs', points: 50, gathered: 'Confirmed Classic costs $1.5M/yr and consumes 15 engineers (SQL Mission 2)', missed: 'Never checked engineering costs — you missed the primary driver of the tech debt' },
];

const CASE_DECISIONS = {
  keep_it: {
    title: 'Keep Classic indefinitely (Status Quo)',
    pitch: "We can't risk the PR nightmare or losing MegaCorp. Keep maintaining Classic.",
    time: '≈ 1 week', backer: 'Elena (CS) wants this',
    quality: 20, verdictTone: 'bad', verdict: 'You avoided a fight but crippled your engineering velocity.',
    metrics: [
      ['NPS', '45', 'Unchanged'],
      ['Eng Velocity', '-20%', '▼ Dropping rapidly'],
      ['Classic ARR', '$1.4M', 'Flat'],
    ],
    narrative: `**Eight weeks later.** Elena and Thomas were thrilled. There was no Twitter outrage. However, the 15 engineers trapped on the Classic team began to quit out of frustration, tired of maintaining 10-year-old spaghetti code. Without those engineers, the Web product missed its major Q3 launch. Competitors shipped faster, and Web growth stalled. You traded the future of the company to protect 5% of the past.`,
    debrief: `**Verdict: You chose the path of least resistance, not the right path.** 
    
- **The Sunk Cost Fallacy:** Just because a product has loyal users doesn't mean it's economically viable to maintain.
- **Opportunity Cost:** By trapping 15 engineers on a dying product, you starved your growth engine (Web).
- **Leadership:** A PM's job isn't to make everyone happy. It's to make the hard, correct calls for the business, even if it causes short-term friction.`,
  },
  abrupt_kill: {
    title: 'Abrupt Kill: Shut down Classic in 30 days',
    pitch: "Rip the band-aid off. Give users 30 days notice, then shut down the Classic servers. Move the 15 engineers to Web immediately.",
    time: '≈ 3 weeks', backer: 'Marcus (Eng) wants this',
    quality: 40, verdictTone: 'bad', verdict: 'You freed up engineering, but caused a massive PR and revenue disaster.',
    metrics: [
      ['NPS', '15', '▼ Complete collapse'],
      ['Eng Velocity', '+15%', '▲ Increased'],
      ['Total ARR', '$29.5M', '▼ Lost $500k'],
    ],
    narrative: `**Eight weeks later.** Marcus got his engineers back, and Web velocity increased. But the rollout was a catastrophe. Angry designers trended #BoycottCanvasKit on Twitter. Thomas Wayne at MegaCorp was furious about the 30-day notice and immediately canceled their $500k contract. The negative PR caused a dip in new Web signups. You ripped the band-aid off, but you took half the skin with it.`,
    debrief: `**Verdict: You solved a technical problem but ignored the human element.**
    
- **Empathy for Power Users:** Power users build their careers on your tool. Taking it away abruptly feels like a betrayal.
- **Enterprise Realities:** A 30-day timeline is impossible for a 5,000-person enterprise to execute a migration. You practically forced them to churn.
- **The PM's Job:** Engineering focuses on systems. CS focuses on feelings. You must bridge both by creating a transition plan that satisfies engineering's need to deprecate while giving users the runway they need to adapt.`,
  },
  phased: {
    title: 'Phased Sunset: 6 months + Feature Parity',
    pitch: "Announce a 6-month sunset. Have the 15 engineers spend 2 months building the missing pen-tool shortcuts into Web. Provide MegaCorp a dedicated migration team.",
    time: '≈ 8 weeks', backer: 'Nobody is perfectly happy, but it works',
    quality: 100, verdictTone: 'good', verdict: 'A textbook example of graceful product deprecation.',
    metrics: [
      ['NPS', '42', 'Slight dip, but stable'],
      ['Eng Velocity', '+12%', '▲ Rising as migration nears end'],
      ['Total ARR', '$30.1M', '▲ Growth'],
    ],
    narrative: `**Eight weeks later.** The announcement caused some grumbling on Twitter, but no riots. By promising feature parity (the pen-tool shortcuts) and providing a 6-month runway, the power users felt heard. Thomas Wayne at MegaCorp agreed to the timeline because his designers wouldn't lose their workflow. Marcus is annoyed he has to wait 6 months to get his engineers back, but he agrees a hard date is better than nothing. You successfully orchestrated a massive technical transition without destroying the brand.`,
    debrief: `**Verdict: Right call. You led a graceful deprecation.**
    
- **The "Give and Take":** You didn't just take away Classic; you gave them the missing features in Web.
- **Runway:** Six months is the standard enterprise grace period for a major architectural shift.
- **Compromise:** A great PM decision often leaves everyone slightly annoyed (Marcus wanted 30 days, Elena wanted forever), but it moves the business forward safely.`,
  },
};

const CASE_MESSAGES = [
  {
    id: 's1', stage: 'arrival',
    from: 'Marcus Vance', role: 'VP of Engineering', color: '#f59e0b', avatar: 'MV',
    subject: 'Time to kill Classic',
    body: `Alex,

I'm officially requesting we sunset the "Classic" desktop app. 

It is 10 years old. It is built on a deprecated framework. It breaks every time Apple updates macOS. And worst of all, I have 15 senior engineers trapped maintaining it. That's $1.5M a year in headcount doing nothing but keeping a dinosaur on life support.

Our modern Web app has 95% of our users. We need to rip the band-aid off. Give the remaining users 30 days notice, shut off the Classic servers, and let my engineers actually build new features.

— Marcus`,
    replyPrompt: 'Reply to Marcus. Acknowledge the tech debt, but state that you need to assess the business risk of a 30-day shutdown.',
    cta: { type: 'accept', label: "Reply: Investigating now →" },
  },
  {
    id: 's2', stage: 'investigate',
    from: 'Elena Rostova', role: 'VP of Customer Success', color: '#14b8a6', avatar: 'ER',
    subject: 'RE: Time to kill Classic? NO.',
    body: `Alex,

Marcus CC'd me on his email. Do NOT do this.

Yes, only 5% of our users are on Classic. But those users include our most vocal, influential pro-designers. The new Web app doesn't have the advanced pen-tool shortcuts they rely on. If you kill Classic, they will riot on Twitter and destroy our brand.

Worse, MegaCorp (a $500k/yr account) is entirely on Classic. 

I'm in the Decision Center. We need to talk.

— Elena`,
    cta: { type: 'open-app', app: 'win-decide', label: 'Talk to Elena →' },
  },
  {
    id: 's3', stage: 'investigate', delaySec: 60,
    from: 'Data Ops', role: 'System', color: '#3b82f6', avatar: 'DO',
    subject: 'Data export: usage and costs',
    body: `Hi Alex,

I've added the data you requested to **NovaData SQL**.

Tables:
- \`platform_usage\` (Shows MAU and ARR split by platform)
- \`engineering_costs\` (Shows headcount and cost by team)

You should probably verify Marcus and Elena's claims about the numbers.

— Data Ops`,
    cta: { type: 'open-app', app: 'win-sql', label: 'Open NovaData SQL →' },
  },
  {
    id: 's4', stage: 'investigate', delaySec: 180,
    from: 'Marcus Vance', role: 'VP of Engineering', color: '#f59e0b', avatar: 'MV',
    subject: 'Decision Needed',
    body: `Alex,

We have a sprint planning meeting this afternoon. 

Are we keeping Classic (and wasting my budget), doing a 30-day Abrupt Kill, or doing something else?

Send me the decision memo. I need to know where to assign these 15 engineers.

— Marcus`,
    decision: true,
  },
  {
    id: 's5', stage: 'complete', dynamic: 'outcome',
    from: 'Company All-Hands', role: 'Automated digest', color: '#f59e0b', avatar: '📊',
    subject: 'Eight weeks later: the aftermath',
  },
  {
    id: 's6', stage: 'complete', dynamic: 'debrief',
    from: 'Product Coach', role: 'PMverse Academy', color: '#8b5cf6', avatar: '🎓',
    subject: 'Case debrief: your performance review',
  },
];

const CASE_LEADERSHIP = { best: 'phased', hippo: 'engineering', full: 60, partial: 30, other: 10 };

const CASE_MEMO_RUBRIC = [
  { match: /1.5|15 engineer|cost/i, points: 25, note: 'Acknowledges the massive technical debt cost' },
  { match: /megacorp|500k|enterprise/i, points: 20, note: 'Addresses the primary revenue risk (MegaCorp)' },
  { match: /30 day|abrupt|pr|twitter/i, points: 20, note: 'Explains why a 30-day shutdown is too dangerous' },
  { match: /6 month|phased|timeline/i, points: 20, note: 'Provides a realistic enterprise transition timeline' },
  { match: /feature parity|pen tool|shortcut/i, points: 15, note: 'Commits to building feature parity to ease migration' },
];

const CASE_METRICS = [
  {
    id: 'eng_velocity', label: 'Engineering Velocity', unit: '%', goodDirection: 'up',
    history: [
      { week: -7, value: 100 }, { week: -6, value: 98 }, { week: -5, value: 95 },
      { week: -4, value: 90 }, { week: -3, value: 88 }, { week: -2, value: 85 },
      { week: -1, value: 80 }, { week: 0, value: 80 },
    ],
    projection: {
      keep_it: [{ week: 2, value: 75 }, { week: 4, value: 70 }, { week: 6, value: 65 }, { week: 8, value: 60 }],
      abrupt_kill: [{ week: 2, value: 85 }, { week: 4, value: 95 }, { week: 6, value: 95 }, { week: 8, value: 95 }],
      phased: [{ week: 2, value: 80 }, { week: 4, value: 82 }, { week: 6, value: 88 }, { week: 8, value: 92 }],
    },
  },
  {
    id: 'nps', label: 'Customer NPS', unit: '', goodDirection: 'up',
    history: [
      { week: -7, value: 48 }, { week: -6, value: 47 }, { week: -5, value: 46 },
      { week: -4, value: 45 }, { week: -3, value: 45 }, { week: -2, value: 45 },
      { week: -1, value: 45 }, { week: 0, value: 45 },
    ],
    projection: {
      keep_it: [{ week: 2, value: 45 }, { week: 4, value: 45 }, { week: 6, value: 45 }, { week: 8, value: 45 }],
      abrupt_kill: [{ week: 2, value: 20 }, { week: 4, value: 15 }, { week: 6, value: 15 }, { week: 8, value: 15 }],
      phased: [{ week: 2, value: 40 }, { week: 4, value: 38 }, { week: 6, value: 40 }, { week: 8, value: 42 }],
    },
  },
];

const CASE_CHATS = [
  {
    id: 'ts-c1',
    channel: '#leadership',
    stage: 'arrival',
    messages: [
      { from: 'Marcus Vance', time: '10:14 AM', avatar: 'MV', color: '#f59e0b', text: 'Classic is dragging down the whole org. We need to announce the shutdown today.' },
      { from: 'Elena Rostova', time: '10:18 AM', avatar: 'ER', color: '#14b8a6', text: 'Absolutely not. You are going to trigger a mass exodus of our power users.' }
    ]
  },
  {
    id: 'ts-c2',
    channel: '@elena-rostova',
    stage: 'investigate',
    messages: [
      { from: 'Elena Rostova', time: '11:05 AM', avatar: 'ER', color: '#14b8a6', text: 'Alex, MegaCorp just heard a rumor. They are demanding a meeting.', cta: { type: 'open-app', app: 'win-decide', label: 'Meet in Decision Center' } }
    ]
  }
];

export const CASE_THE_SUNSET = {
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
