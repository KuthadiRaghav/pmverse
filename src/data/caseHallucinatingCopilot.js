// Case 002: The Hallucinating Copilot — an AI-startup case that exercises the
// Evals / RAG / guardrails curriculum. Same schema as Case 001.

const CASE_META = {
  id: 'hallucinating-copilot',
  number: '002',
  title: 'The Hallucinating Copilot',
  company: 'Lumenly',
  tagline: 'Series B legal-tech AI · contract copilot for law firms · $9M ARR',
  blurb: 'Your AI copilot fabricated a case citation in a client memo at your biggest account ($400K ARR). The renewal is in five weeks, a competitor is circling, and the CEO wants to swap in the newest frontier model and announce it today.',
};

const CASE_PERSONAS = {
  ceo: {
    name: 'Marcus Webb', role: 'CEO', color: '#f59e0b', avatar: 'MW',
    intro: "This citation thing has Harlow & Price ready to walk — $400K, our logo account. The new frontier model dropped last week and it benchmarks 15% better. I say we swap it in and tell them we've fixed it. Tell me why I'm wrong — fast.",
    system: `You are Marcus Webb, CEO of Lumenly, a legal-tech AI startup. Your copilot fabricated a case citation at Harlow & Price, your biggest account ($400K ARR, renewal in 5 weeks). You believe swapping to the newest frontier model (benchmarks 15% better) and announcing it will save the deal — fast, decisive, great story. You are impatient and sales-driven but respect evidence. You don't know the technical details of retrieval or evals — Priya Nair (ML lead) does. You know: the account exec says a competitor is in the building; the board is watching this renewal. Stay in character, first person, 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /model|swap|frontier|upgrade|benchmark/i, reply: "The new model benchmarks 15% higher on reasoning — that has to help. We swap it this week, we tell Harlow & Price it's fixed, deal saved. Unless you can show me why that's wrong." },
      { match: /renewal|deal|account|harlow|customer|churn/i, reply: "$400K ARR and our reference logo. Their managing partner told our AE that one more fabricated citation and they're done. We have five weeks. Whatever you propose has to land inside that window." },
      { match: /eval|test|golden|measure/i, reply: "Evals, sure — Priya keeps saying that word. If you two want tests, fine, but I need something I can TELL the customer this month, not a measurement project." },
      { match: /retriev|rag|index|grounding|technical|why|cause/i, reply: "The technical root cause is Priya's department — I genuinely don't know. What I know is the symptom: our product lied to a lawyer, in writing, with confidence." },
      { match: /citation|fabricat|hallucinat|incident/i, reply: "The copilot cited 'Harmon v. Delacroix 2019' in a client memo. The case doesn't exist. An associate caught it before it went to court — barely. That's the nightmare scenario for a legal product." },
    ],
    fallbacks: [
      "Five weeks to renewal. Whatever you're investigating, investigate it fast.",
      "My instinct says swap the model and control the story. But you're the PM — bring me something better if you have it.",
      "Talk to Priya about the technical side and Elena at Harlow & Price if you want the customer's temperature. Then decide.",
    ],
  },
  ml: {
    name: 'Priya Nair', role: 'ML Lead', color: '#3b82f6', avatar: 'PN',
    intro: "Before you ask: no, the new model won't fix it. Sit down, I'll show you why — or better, query the data yourself. It's all in NovaData SQL.",
    system: `You are Priya Nair, ML Lead at Lumenly. You KNOW the root cause of the fabricated citations: two months ago the firm expanded into two new practice areas (maritime law, IP litigation) and nobody indexed those document corpora into the RAG system — retrieval hit rate there is ~12% vs ~85% elsewhere. When retrieval returns nothing, the model improvises citations — there is no groundedness guardrail forcing it to cite-or-refuse. There is also NO eval suite: nobody can measure whether any change helps. You believe a model swap without evals is russian roulette and may make things worse. Fix = index the missing corpora (1 week), add cite-or-refuse grounding (1 week), build a golden-set eval (1 week, in parallel). You loaded copilot_incidents and retrieval_metrics into NovaData SQL. Precise, a bit weary of being ignored, 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /model|swap|frontier|upgrade/i, reply: "A new model changes the improviser, not the fact that it's improvising. Fabrications happen where retrieval returns nothing — the model fills the silence. Swap models without fixing retrieval and you get differently-worded fabrications." },
      { match: /cause|why|root|hallucinat|fabricat/i, reply: "Query copilot_incidents — fabrications cluster in maritime and IP litigation, the two practice areas we added two months ago. Nobody indexed those corpora. Retrieval hit rate there is 12%. The model is answering from nothing." },
      { match: /retriev|rag|index|hit rate|corpus/i, reply: "retrieval_metrics tells the story: 85% hit rate in indexed practice areas, 12% in the new ones. Indexing the missing corpora is about a week of work. It's the least glamorous fix and the only one that addresses the cause." },
      { match: /eval|test|golden|measure/i, reply: "We have no eval suite — zero. That's why I can't even tell you if the new model is better or worse on OUR tasks. A 100-contract golden set takes a week and makes every future change measurable. I've been asking for two months." },
      { match: /guardrail|grounding|cite|refuse/i, reply: "Right now nothing forces the model to ground its answers. Add cite-or-refuse: every citation must come from a retrieved source, or the copilot says it can't find one. Lawyers respect 'I don't know' — they sue over confident fiction." },
      { match: /how long|time|estimate|week/i, reply: "Index the corpora: one week. Grounding guardrail: one week. Golden-set evals: one week, parallel. Three weeks total, well inside the renewal window — with eval numbers we can show the customer." },
    ],
    fallbacks: [
      "The data's in NovaData SQL: copilot_incidents and retrieval_metrics. Two queries and you'll see it.",
      "I'll say it again for the record: no model swap without an eval suite. We'd be flying blind into our biggest renewal.",
      "Ask me about the root cause, the fix timeline, or why the model swap won't work. I have receipts for all three.",
    ],
  },
  ae: {
    name: 'Tom Iyer', role: 'Account Executive', color: '#14b8a6', avatar: 'TI',
    intro: "You're the PM? Good. I need something concrete for Harlow & Price by Friday's call, or I'm walking into a renewal meeting with 'trust us' as my pitch.",
    system: `You are Tom Iyer, Account Executive at Lumenly who owns the Harlow & Price account ($400K ARR, renewal in 5 weeks). You know: the managing partner is furious but doesn't actually want to switch — ripping out the copilot would be painful for their associates who love the drafting speed; the competitor (Casewright) is pitching them but their product has no legal-specific features; what the partner actually asked for is 'prove to me this can't happen again.' You need something concrete and credible to present, not marketing spin — they're lawyers, they'll cross-examine it. Direct, deal-focused, 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /customer|harlow|partner|want|ask/i, reply: "The managing partner's exact words: 'Prove to me this can't happen again.' Not 'promise' — prove. They're lawyers; they want evidence, process, receipts. Spin will make it worse." },
      { match: /competitor|casewright|switch|leave/i, reply: "Casewright is pitching them hard, but honestly? Their product is generic. The partner doesn't want to switch — associates love our drafting speed. He wants a reason to stay. Give me one." },
      { match: /announce|swap|model|fix/i, reply: "If I announce 'we upgraded the AI model' they'll ask 'how do you know it's better?' in the first minute. If we can't answer with data, we're worse off than saying nothing." },
      { match: /renewal|deal|timeline|when|friday/i, reply: "Renewal signature is in five weeks, and I have a check-in call every Friday. Best thing you can give me: a concrete remediation plan this week, and measurable proof before signature." },
      { match: /incident|citation|fabricat/i, reply: "The fabricated citation went into a client memo. An associate caught it at 11pm before a filing. The partner showed it to me printed out — he keeps it on his desk. That's what we're up against." },
    ],
    fallbacks: [
      "Five weeks. Weekly check-ins. What do I tell them Friday?",
      "Lawyers don't buy adjectives. Whatever the fix is, I need it to be demonstrable.",
      "Talk to Priya if you haven't — she kept muttering about retrieval something. If she's got the answer, get it to me in English.",
    ],
  },
  customer: {
    name: 'Elena Vasquez', role: 'Senior Associate · Harlow & Price', color: '#ec4899', avatar: 'EV',
    intro: "I'm the one who caught the fake citation, so yes — I have opinions. But I should say up front: I use your copilot every single day, and going back to drafting without it would genuinely hurt.",
    system: `You are Elena Vasquez, senior associate at Harlow & Price, the law firm customer. You caught the fabricated citation ('Harmon v. Delacroix 2019' — doesn't exist) at 11pm before a filing. You are angry about the incident but you LOVE the copilot's drafting speed — it saves you 8-10 hours a week; going back would hurt. What would restore your trust: visible sources — every citation linked to the actual retrieved document so you can verify in one click; and honesty — you'd rather the tool say 'I can't find a case for this' than invent one. The fabrications you've seen were in maritime matters (a newer practice area for your firm). Not technical; speaks from experience. Candid, sharp, 1-3 sentences. Never mention being an AI.`,
    scripted: [
      { match: /incident|citation|caught|fabricat|hallucinat/i, reply: "Harmon v. Delacroix, 2019. Perfect formatting, plausible court, confident summary — and completely invented. I only caught it because I'd worked a similar matter and didn't recognize the case. At 11pm. Before a filing." },
      { match: /trust|fix|stay|prove|again/i, reply: "Show me the source. If every citation linked to the actual document it came from, I'd verify in one click and we'd be fine. And if there's no source? Say so. I'd rather hear 'I can't find one' than get fiction." },
      { match: /love|value|speed|use|daily|drafting/i, reply: "Honestly? It saves me 8, maybe 10 hours a week on first drafts. Nobody at the firm wants to give that up — that's why the partners are angry instead of gone. There's a version of this where you keep us for years." },
      { match: /maritime|ip|practice|area|where|pattern/i, reply: "Now that you ask — every weird output I've seen was in maritime matters. Our newer practice area. Contract drafting in our bread-and-butter areas has been rock solid. Does that mean something?" },
      { match: /competitor|casewright|switch/i, reply: "Casewright took us to lunch. Their demo was generic — it doesn't know a charterparty from a lease. If you fix the trust problem, there's no contest. If you don't, the partners will pick 'safe and worse' over 'fast and scary.'" },
    ],
    fallbacks: [
      "Ask me anything — I'm the daily user AND the one who caught the failure, so I've got both sides.",
      "The summary version: love the speed, can't trust the citations, show me sources and we're friends again.",
      "One more thing worth knowing: the fabrications weren't random. Ask me where they showed up.",
    ],
  },
};

const CASE_SQL_SEED = `
  CREATE TABLE copilot_incidents (week TEXT, weeks_ago INTEGER, practice_area TEXT, incident_type TEXT, count INTEGER);
  INSERT INTO copilot_incidents VALUES
    ('2026-05-11', 7, 'corporate', 'fabricated_citation', 0), ('2026-05-11', 7, 'maritime', 'fabricated_citation', 3), ('2026-05-11', 7, 'ip_litigation', 'fabricated_citation', 2),
    ('2026-05-18', 6, 'corporate', 'fabricated_citation', 1), ('2026-05-18', 6, 'maritime', 'fabricated_citation', 4), ('2026-05-18', 6, 'ip_litigation', 'fabricated_citation', 3),
    ('2026-05-25', 5, 'corporate', 'fabricated_citation', 0), ('2026-05-25', 5, 'maritime', 'fabricated_citation', 5), ('2026-05-25', 5, 'ip_litigation', 'fabricated_citation', 2),
    ('2026-06-01', 4, 'corporate', 'fabricated_citation', 0), ('2026-06-01', 4, 'maritime', 'fabricated_citation', 6), ('2026-06-01', 4, 'ip_litigation', 'fabricated_citation', 4),
    ('2026-06-08', 3, 'corporate', 'fabricated_citation', 1), ('2026-06-08', 3, 'maritime', 'fabricated_citation', 7), ('2026-06-08', 3, 'ip_litigation', 'fabricated_citation', 4),
    ('2026-06-15', 2, 'corporate', 'fabricated_citation', 0), ('2026-06-15', 2, 'maritime', 'fabricated_citation', 8), ('2026-06-15', 2, 'ip_litigation', 'fabricated_citation', 5);

  CREATE TABLE retrieval_metrics (practice_area TEXT, docs_in_corpus INTEGER, docs_indexed INTEGER, retrieval_hit_rate_pct REAL, added_when TEXT);
  INSERT INTO retrieval_metrics VALUES
    ('corporate', 48200, 47900, 86.4, '2024 launch'),
    ('employment', 21400, 21100, 84.9, '2024 launch'),
    ('real_estate', 15800, 15600, 83.1, '2025 Q1'),
    ('maritime', 9400, 610, 12.2, '9 weeks ago'),
    ('ip_litigation', 12100, 980, 13.8, '9 weeks ago');
`;

const SQL_MISSIONS = [
  {
    id: 'sql_incidents',
    label: 'Mission 1 · Find where fabrications concentrate',
    hint: 'Query copilot_incidents — group by practice_area.',
    match: /copilot_incidents/i,
  },
  {
    id: 'sql_retrieval',
    label: 'Mission 2 · Check retrieval coverage by practice area',
    hint: 'Query retrieval_metrics — compare hit rates and when each corpus was added.',
    match: /retrieval_metrics/i,
  },
];

const CASE_EVIDENCE = [
  { id: 'sql_incidents', points: 50, gathered: 'Located the fabrication clusters (SQL Mission 1)', missed: 'Never queried copilot_incidents — the cluster pattern was the first clue' },
  { id: 'sql_retrieval', points: 50, gathered: 'Found the retrieval coverage gap (SQL Mission 2)', missed: 'Never queried retrieval_metrics — the 12% hit rate was the smoking gun' },
];

const CASE_DECISIONS = {
  swap: {
    title: 'Emergency-swap to the new frontier model, announce the fix',
    pitch: "The newest model benchmarks 15% better. Swap it in this week, tell Harlow & Price the AI has been upgraded, control the narrative before the Friday call.",
    time: '≈ 1 week · announce immediately', backer: 'Marcus (CEO) is championing this',
    quality: 30, verdictTone: 'bad', verdict: 'You changed the improviser, not the improvisation.',
    metrics: [
      ['Fabrications / week', '11', '▼ barely, from 13'],
      ['Retrieval hit rate (new areas)', '12%', 'unchanged'],
      ['Harlow & Price renewal', 'Lost', 'churned at signature'],
    ],
    narrative: `**Eight weeks later.** The swap shipped in four days and the announcement went out. Ten days later a maritime associate found another fabricated citation — differently worded, same disease, because retrieval still returned nothing in the unindexed practice areas. Having been told it was fixed, the partner treated the second incident as a broken promise rather than a bug. **Harlow & Price signed with Casewright** — not because the competitor was better, but because you'd spent your credibility on a fix you couldn't measure. Priya's eval suite, built afterward in the postmortem, showed the new model actually fabricated *slightly more* in low-retrieval conditions.`,
    debrief: `**Verdict: you shipped the CEO's narrative, not the diagnosis.** The fabrications were a retrieval problem wearing a model costume — every signal pointed there.

- **RAG failure diagnosis:** fabrications clustered exactly where retrieval hit rate was 12%. When retrieval returns nothing, models improvise; a smarter model improvises more fluently.
- **The model-upgrade ritual:** you swapped models with zero eval coverage — no golden set, no per-segment scores. 'Better on benchmarks' is not 'better on your task.'
- **Trust economics:** announcing an unverified fix converted a product bug into a broken promise. Customers forgive bugs; they churn over betrayals.`,
  },
  ground: {
    title: 'Fix retrieval coverage + cite-or-refuse grounding + golden-set evals',
    pitch: "Index the two missing practice-area corpora, add a guardrail forcing every citation to link a retrieved source (or refuse), and build a 100-contract eval suite to prove it — then show Harlow & Price the numbers.",
    time: '≈ 3 weeks · ML team + 1 engineer', backer: 'Priya has been asking for this for two months',
    quality: 100, verdictTone: 'good', verdict: 'Root cause fixed, and now you can prove it.',
    metrics: [
      ['Fabrications / week', '0', '▼ from 13'],
      ['Retrieval hit rate (new areas)', '84%', '▲ from 12%'],
      ['Harlow & Price renewal', 'Signed', '+ 2-year extension'],
    ],
    narrative: `**Eight weeks later.** The corpora indexed in week one took new-area retrieval from 12% to 84%. The cite-or-refuse guardrail shipped in week two — every citation now links its source document, and when nothing grounds an answer the copilot says so. The eval suite came together in parallel: 120 real contract tasks, fabrication rate tracked per practice area. At the renewal meeting, Tom didn't present promises — he presented the eval dashboard: **zero fabricated citations in three weeks, verifiable sources on every claim.** Elena demoed the one-click source check herself. The partner signed a two-year extension and asked whether the eval report could be a quarterly deliverable. **It's now in the contract — and in the sales deck.**`,
    debrief: `**Verdict: right call.** You treated a trust crisis with the only currency lawyers accept: evidence.

- **RAG failure diagnosis:** you found the 12% hit rate and fixed retrieval instead of blaming the model. Grounding turned 'trust us' into 'verify us.'
- **Evals as product strategy:** the golden set didn't just gate the fix — it became a customer-facing proof artifact and a sales asset. Quality you can measure is quality you can sell.
- **Resisting the HiPPO:** the CEO's swap-and-announce was faster and louder. You brought receipts instead — and the receipts closed the renewal.`,
  },
  review: {
    title: 'Human-review layer: counsel checks every output before delivery',
    pitch: "Put a human in the loop: every copilot output is reviewed by Lumenly's internal legal team before the customer sees it. Zero fabrications reach clients, starting today.",
    time: '≈ 1 week to stand up · ongoing cost', backer: 'The board member who used to be a litigator',
    quality: 45, verdictTone: 'bad', verdict: 'You bought safety by selling the product\'s soul.',
    metrics: [
      ['Fabrications reaching clients', '0', 'humans catch them'],
      ['Median response time', '9 hrs', '▲ from 40 seconds'],
      ['Harlow & Price renewal', 'Lost', 'churned on latency'],
    ],
    narrative: `**Eight weeks later.** The review layer worked — no fabrication reached a client. It also turned a 40-second drafting copilot into a 9-hour document service, because two staff attorneys became the bottleneck for every output at every customer. Elena's team stopped using it within a fortnight — 'by the time it comes back I've written it myself.' Usage at Harlow & Price fell 71%, and at the renewal meeting the partner's question wasn't about trust, it was **'why are we paying $400K for something my associates stopped opening?'** The root cause — 12% retrieval in the new practice areas — was still there, now hidden behind a human shield you can't afford to scale.`,
    debrief: `**Verdict: a defensible instinct that destroyed the value proposition.** Human review is a bridge tactic, not a fix — and you deployed it as the fix.

- **Speed WAS the product:** Elena told you it saved her 8-10 hours a week. A 9-hour review loop deleted the reason customers paid.
- **Symptom vs root cause:** the fabrications still happen; humans just intercept them. The 12% retrieval hit rate never got fixed — you added cost instead of removing cause.
- **Where human-in-the-loop belongs:** on irreversible, high-stakes actions during a remediation window — not as a permanent tax on every interaction of a speed product.`,
  },
};

const CASE_MESSAGES = [
  {
    id: 'm1', stage: 'arrival',
    from: 'Marcus Webb', role: 'CEO', color: '#f59e0b', avatar: 'MW',
    subject: 'Code red: Harlow & Price — fabricated citation',
    body: `Alex,

I'll keep this short because we don't have long.

Our copilot **invented a case citation** — *Harmon v. Delacroix, 2019*, doesn't exist — in a client memo at **Harlow & Price**. An associate caught it at 11pm before it went into a court filing. The managing partner is furious. **$400K ARR, our reference logo, renewal in five weeks**, and Casewright is already taking them to lunch.

The new frontier model dropped last week — benchmarks 15% better on reasoning. My plan: **swap it in this week and tell them we've fixed it.** Fast, decisive, controls the story.

Priya keeps saying it's not the model. Tom needs something for his Friday call. Elena — the associate who caught it — agreed to talk to you.

You're the PM. Figure out what's actually true and make the call. But make it inside five weeks.

— Marcus`,
    cta: { type: 'accept', label: "Reply: On it →" },
  },
  {
    id: 'm2', stage: 'investigate',
    from: 'Priya Nair', role: 'ML Lead', color: '#3b82f6', avatar: 'PN',
    subject: 'Before anyone swaps anything — look at this data',
    body: `Alex,

Marcus wants to swap models. Before that happens, I loaded two tables into **NovaData SQL**:

| Table | What's in it |
|---|---|
| \`copilot_incidents\` | Fabricated-citation incidents by week and **practice area** |
| \`retrieval_metrics\` | RAG index coverage and **hit rate** per practice area |

Run both. Pay attention to **which practice areas** the fabrications cluster in, and **when those corpora were added**. Then come find me in the Decision Center — there's context that isn't in the tables.

One number as a teaser: retrieval hit rate in our newest practice areas is **12%**. Twelve.

— Priya`,
    cta: { type: 'open-app', app: 'win-sql', label: 'Open NovaData SQL →' },
  },
  {
    id: 'm3', stage: 'investigate', delaySec: 90,
    from: 'Tom Iyer', role: 'Account Executive', color: '#14b8a6', avatar: 'TI',
    subject: 'What I need for Friday (and what the partner actually said)',
    body: `Alex —

Context from the account before you decide anything:

- The managing partner's exact words: **"Prove to me this can't happen again."** Prove. They're lawyers — they cross-examine adjectives.
- Casewright is pitching them, but the associates **love our drafting speed**. The partner is looking for a reason to *stay*, not a reason to leave.
- I have a check-in call **every Friday** until renewal. Give me something concrete and credible.

If your plan is an announcement without evidence, tell me now so I can start updating my resume.

— Tom`,
    cta: { type: 'open-app', app: 'win-decide', label: 'Talk to Tom →' },
  },
  {
    id: 'm4', stage: 'investigate', delaySec: 170,
    from: 'Lumenly Research', role: 'Customer interview', color: '#ec4899', avatar: 'LR',
    subject: 'Interview confirmed: Elena Vasquez (the associate who caught it)',
    body: `Hi Alex,

**Elena Vasquez** — the Harlow & Price senior associate who caught the fabricated citation — agreed to a candid 30 minutes. Notes from scheduling:

- She's angry about the incident but made a point of saying she **uses the copilot daily**
- She hinted the weird outputs follow a **pattern** — worth digging into where she's seen them
- Interview tip: ask what would restore her trust, not whether she's upset

She's available now in the **Decision Center**.

— Research Ops`,
    cta: { type: 'open-app', app: 'win-decide', label: 'Start the interview →' },
  },
  {
    id: 'm5', stage: 'investigate', delaySec: 260,
    from: 'Marcus Webb', role: 'CEO', color: '#f59e0b', avatar: 'MW',
    subject: 'Decision time — what do I greenlight?',
    body: `Alex,

Board call in an hour and Tom's Friday check-in is coming. Three plans are on my desk. Pick one — and before you commit, **write me the two-paragraph version of your recommendation** like you'd defend it to the board: what we do, why it's the right call, what evidence backs it.

Whatever you choose, you own it.

— Marcus`,
    decision: true,
  },
  {
    id: 'm6', stage: 'complete', dynamic: 'outcome',
    from: 'Lumenly Board Update', role: 'Automated digest', color: '#6366f1', avatar: '📊',
    subject: 'Eight weeks later: the renewal verdict',
  },
  {
    id: 'm7', stage: 'complete', dynamic: 'debrief',
    from: 'Product Coach', role: 'PMverse Academy', color: '#8b5cf6', avatar: '🎓',
    subject: 'Case debrief: your performance review',
  },
];

const CASE_LEADERSHIP = { best: 'ground', hippo: 'ceo', full: 60, partial: 30, other: 10 };

const CASE_MEMO_RUBRIC = [
  { match: /retriev|rag|index|corpus|coverage|12\s?%/i, points: 25, note: 'Names the root cause (retrieval coverage gap)' },
  { match: /maritime|ip|practice area|cluster|new area/i, points: 20, note: 'Cites the incident clustering evidence' },
  { match: /ground|cite|source|refuse|guardrail/i, points: 20, note: 'Proposes grounding/citation verification' },
  { match: /eval|golden|measure|prove|test/i, points: 20, note: 'Includes evals as proof for the customer' },
  { match: /model swap|frontier|benchmark|risk|instead/i, points: 15, note: 'Addresses why the model swap fails' },
];

const CASE_METRICS = [
  {
    id: 'fabrications', label: 'Fabricated citations / week', unit: '', goodDirection: 'down',
    history: [
      { week: -7, value: 5 }, { week: -6, value: 8 }, { week: -5, value: 7 },
      { week: -4, value: 10 }, { week: -3, value: 12 }, { week: -2, value: 13 },
      { week: -1, value: 12 }, { week: 0, value: 13 },
    ],
    projection: {
      swap: [{ week: 2, value: 12 }, { week: 4, value: 11 }, { week: 6, value: 12 }, { week: 8, value: 11 }],
      ground: [{ week: 2, value: 6 }, { week: 4, value: 1 }, { week: 6, value: 0 }, { week: 8, value: 0 }],
      review: [{ week: 2, value: 12 }, { week: 4, value: 13 }, { week: 6, value: 12 }, { week: 8, value: 12 }],
    },
  },
  {
    id: 'hitrate', label: 'Retrieval hit rate — new practice areas', unit: '%', goodDirection: 'up',
    history: [
      { week: -7, value: 12 }, { week: -6, value: 12 }, { week: -5, value: 13 },
      { week: -4, value: 12 }, { week: -3, value: 12 }, { week: -2, value: 12 },
      { week: -1, value: 13 }, { week: 0, value: 12 },
    ],
    projection: {
      swap: [{ week: 2, value: 12 }, { week: 4, value: 13 }, { week: 6, value: 12 }, { week: 8, value: 12 }],
      ground: [{ week: 2, value: 61 }, { week: 4, value: 84 }, { week: 6, value: 84 }, { week: 8, value: 85 }],
      review: [{ week: 2, value: 12 }, { week: 4, value: 12 }, { week: 6, value: 13 }, { week: 8, value: 12 }],
    },
  },
];

const CASE_CHATS = [
  {
    id: 'hc-c1',
    channel: '#legal-eng',
    stage: 'arrival',
    messages: [
      { from: 'Priya Nair', time: '11:32 PM', avatar: 'PN', color: '#8b5cf6', text: 'I told you guys it was the retrieval system. The frontier model is fine, it just can\'t read a database.' },
      { from: 'Tom Iyer', time: '11:45 PM', avatar: 'TI', color: '#10b981', text: 'Priya, we don\'t have time to re-index the entire litigation database before the Friday call. Marcus wants a swap.' }
    ]
  },
  {
    id: 'hc-c2',
    channel: '@elena-vasquez',
    stage: 'investigate',
    messages: [
      { from: 'Elena Vasquez', time: '08:15 AM', avatar: 'EV', color: '#f59e0b', text: 'Alex, I\'m free to talk about the Harlow & Price memo whenever you are. Just ping me in the Decision Center.', cta: { type: 'open-app', app: 'win-decide', label: 'Open Decision Center' } }
    ]
  }
];

export const CASE_HALLUCINATING_COPILOT = {
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
