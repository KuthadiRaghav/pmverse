const STRATEGY_CONTENT = [
  {
    id: "prioritization",
    title: "Prioritization Frameworks",
    locked: false,
    lessons: [
      {
        type: "teach",
        title: "RICE Scoring",
        body: "RICE is a prioritization framework developed at Intercom that scores initiatives on four dimensions: Reach, Impact, Confidence, and Effort.\n\nReach measures how many users will be affected in a given time period (e.g., 500 users per quarter). Impact estimates the effect on each user, typically scored on a scale from 0.25 (minimal) to 3 (massive). Confidence reflects how certain you are in your estimates, expressed as a percentage (100% = high, 50% = low). Effort is the total person-months required.\n\nThe formula is: RICE Score = (Reach × Impact × Confidence) / Effort\n\nRICE works well because it forces PMs to be explicit about assumptions. A feature with huge impact but low confidence scores lower than a moderate-impact feature with high confidence — which is often the right call.\n\nCommon pitfalls include inflating confidence scores to game the system, ignoring the 'Reach' component for pet features, and not revisiting scores as new data emerges.\n\nRICE is best used for comparing a backlog of 10–30 candidates, not for strategic bets where qualitative judgment matters more.",
        keyTakeaway: "RICE quantifies prioritization by multiplying Reach × Impact × Confidence and dividing by Effort — forcing PMs to make assumptions explicit and comparable."
      },
      {
        type: "mcq",
        prompt: "A feature has Reach = 1000, Impact = 2, Confidence = 80%, and Effort = 4 person-months. What is its RICE score?",
        options: [
          { text: "400", correct: true, explanation: "RICE = (1000 × 2 × 0.8) / 4 = 1600 / 4 = 400. The confidence percentage is converted to a decimal before multiplication." },
          { text: "500", correct: false, explanation: "This would result from using Confidence as 1.0 (100%). The actual confidence is 80%, so you multiply by 0.8." },
          { text: "200", correct: false, explanation: "This would result from forgetting to include Impact in the numerator. All four factors must be used." },
          { text: "320", correct: false, explanation: "Double-check the formula: (Reach × Impact × Confidence) / Effort. Make sure you're not misapplying the division." }
        ]
      },
      {
        type: "teach",
        title: "The Kano Model",
        body: "The Kano Model, created by Professor Noriaki Kano in the 1980s, classifies product features based on how they influence customer satisfaction.\n\nThere are five categories:\n\n1. Must-Be (Basic) — Features customers expect. Their presence doesn't delight, but their absence causes frustration. Example: a login page on a SaaS app.\n\n2. Performance (One-Dimensional) — More is better. Customer satisfaction scales linearly with how well these are implemented. Example: page load speed.\n\n3. Attractive (Delighters) — Unexpected features that create disproportionate satisfaction. Customers don't miss them if absent, but love them when present. Example: Spotify Wrapped.\n\n4. Indifferent — Features that don't affect satisfaction either way. Building these is pure waste.\n\n5. Reverse — Features that actually reduce satisfaction for some segments when present.\n\nTo apply Kano, you survey users with paired questions: 'How would you feel if this feature existed?' and 'How would you feel if it didn't?' The combination of answers reveals the category.\n\nCritically, Kano categories shift over time. Yesterday's delighter becomes today's must-be (e.g., smartphone GPS).",
        keyTakeaway: "The Kano Model categorizes features into Must-Be, Performance, Attractive, Indifferent, and Reverse — revealing that not all features contribute equally to satisfaction."
      },
      {
        type: "mcq",
        prompt: "In the Kano Model, which category describes features that customers expect as baseline — their absence causes dissatisfaction but their presence doesn't increase satisfaction?",
        options: [
          { text: "Must-Be (Basic)", correct: true, explanation: "Must-Be features are table stakes. Customers assume they'll be present, so they don't create delight — but missing them causes immediate frustration." },
          { text: "Performance", correct: false, explanation: "Performance features scale linearly — more is better. They're not about baseline expectations." },
          { text: "Attractive (Delighters)", correct: false, explanation: "Delighters are unexpected features that create disproportionate satisfaction. They're the opposite of baseline expectations." },
          { text: "Indifferent", correct: false, explanation: "Indifferent features don't affect satisfaction either way. Must-Be features definitely affect it when absent." }
        ]
      },
      {
        type: "teach",
        title: "MoSCoW Method",
        body: "MoSCoW is a prioritization technique that sorts requirements into four buckets: Must Have, Should Have, Could Have, and Won't Have (this time).\n\nMust Have — Non-negotiable requirements. Without these, the product or release fails. They represent the minimum usable subset. A useful test: 'If we ship without this, is the release pointless?'\n\nShould Have — Important but not critical. The product works without them, but they deliver significant value. They're typically included unless there's a time crunch.\n\nCould Have — Nice-to-haves. These improve the experience but are the first to be cut when resources are tight.\n\nWon't Have (this time) — Explicitly out of scope for this release, but acknowledged as valuable for the future. This category is crucial — it shows stakeholders you've heard them without committing.\n\nThe key discipline is limiting Must Haves to roughly 60% of capacity. If everything is a Must Have, nothing is.\n\nMoSCoW works best for release planning and sprint scoping. It's less useful for long-term strategic prioritization because it doesn't factor in effort or quantitative impact.\n\nThe 'Won't Have' category is politically powerful — it lets you say 'not now' instead of 'no,' preserving stakeholder relationships.",
        keyTakeaway: "MoSCoW sorts requirements into Must/Should/Could/Won't Have — keep Must Haves under 60% of capacity, and use 'Won't Have (this time)' to manage expectations without burning bridges."
      },
      {
        type: "mcq",
        prompt: "Your team has capacity for 100 story points this sprint. According to MoSCoW best practices, what's the maximum that should be allocated to 'Must Have' items?",
        options: [
          { text: "About 60 story points", correct: true, explanation: "MoSCoW recommends limiting Must Haves to ~60% of capacity, leaving room for Should Have and Could Have items and absorbing inevitable surprises." },
          { text: "100 story points — Must Haves should fill capacity", correct: false, explanation: "If Must Haves consume all capacity, there's no room for Should Haves or unexpected work. This also suggests your Must Haves aren't truly minimal." },
          { text: "About 25 story points", correct: false, explanation: "Only 25% on Must Haves would leave too much critical functionality undelivered. Must Haves are non-negotiable." },
          { text: "About 80 story points", correct: false, explanation: "80% leaves very little room for important Should Have items or any scope changes. The 60% guideline provides healthier buffer." }
        ]
      },
      {
        type: "teach",
        title: "Value vs Effort Matrix",
        body: "The Value vs Effort matrix (also called Impact vs Effort or 2×2 prioritization) is the simplest and most widely used prioritization tool. You plot initiatives on a two-axis grid:\n\nX-axis: Effort (low → high)\nY-axis: Value (low → high)\n\nThis creates four quadrants:\n\n• Quick Wins (high value, low effort) — Do these first. They deliver outsized ROI with minimal investment.\n\n• Big Bets (high value, high effort) — Strategic projects worth planning carefully. Break them into smaller deliverables.\n\n• Fill-Ins (low value, low effort) — Do these only when the team has idle capacity. Don't let them crowd out Quick Wins.\n\n• Money Pits (low value, high effort) — Avoid or eliminate. If stakeholders push for these, ask them to justify the value.\n\nThe framework's power is its simplicity — anyone can understand and participate in the exercise. It works well in workshops with cross-functional stakeholders.\n\nHowever, it has real limitations: estimating 'value' and 'effort' as single dimensions can be reductive. Hidden dependencies, learning opportunities, and strategic positioning don't fit neatly on these axes.\n\nPro tip: Use relative sizing (T-shirt sizes) rather than precise estimates to avoid false precision.",
        keyTakeaway: "The Value vs Effort matrix creates four quadrants — prioritize Quick Wins first, plan Big Bets carefully, fill in low-effort items opportunistically, and ruthlessly avoid Money Pits."
      },
      {
        type: "teach",
        title: "Opportunity Scoring (Ulwick's ODI)",
        body: "Opportunity Scoring, rooted in Tony Ulwick's Outcome-Driven Innovation (ODI) framework, flips traditional prioritization on its head. Instead of scoring features, you score customer outcomes — the jobs customers are trying to get done.\n\nThe process works in three steps:\n\n1. Identify customer outcomes — What are customers trying to achieve? Frame these as measurable outcome statements: 'Minimize the time it takes to [action]' or 'Reduce the likelihood of [undesired outcome].'\n\n2. Survey customers on two dimensions:\n   • Importance: How important is this outcome? (1–10)\n   • Satisfaction: How satisfied are you with current solutions? (1–10)\n\n3. Calculate the Opportunity Score:\n   Opportunity = Importance + max(Importance – Satisfaction, 0)\n\nOutcomes that are highly important but poorly satisfied represent the biggest opportunities. Scores above 15 are 'underserved' (gold mines). Scores below 10 are 'overserved' (potential areas to cut).\n\nThe beauty of ODI is that it grounds prioritization in customer reality rather than internal assumptions. It prevents you from over-investing in outcomes customers already consider solved.\n\nODI works best for strategic product planning and new market entry, not sprint-level task prioritization.",
        keyTakeaway: "Opportunity Scoring identifies where customer importance is high but satisfaction is low — these underserved outcomes are your biggest product opportunities."
      },
      {
        type: "mcq",
        prompt: "In Ulwick's Opportunity Scoring, a customer outcome scores Importance = 9 and Satisfaction = 3. What is the Opportunity Score?",
        options: [
          { text: "15", correct: true, explanation: "Opportunity = Importance + max(Importance – Satisfaction, 0) = 9 + max(9 – 3, 0) = 9 + 6 = 15. This is at the threshold of 'underserved' — a strong opportunity." },
          { text: "12", correct: false, explanation: "You might get this by simply adding the two numbers. The formula adds Importance to the gap between Importance and Satisfaction." },
          { text: "6", correct: false, explanation: "This is just the difference (9 – 3). The full formula adds the Importance score back to the gap." },
          { text: "18", correct: false, explanation: "This would result from doubling the Importance score. The formula caps the gap at max(Importance – Satisfaction, 0), it doesn't double anything." }
        ]
      },
      {
        type: "teach",
        title: "Story Mapping & North Star Metric",
        body: "Story Mapping, created by Jeff Patton, is a visual prioritization technique that arranges user stories along two axes: the horizontal axis represents the user journey (left to right), and the vertical axis represents priority (top to bottom).\n\nThe top row ('backbone') shows the major activities in the user's workflow. Below each activity, you stack the tasks and stories needed, ordered by priority. Drawing a horizontal line across the map defines your MVP — everything above the line ships first.\n\nStory mapping prevents a common failure mode: building deep functionality in one area while ignoring the end-to-end journey. It ensures your MVP is 'a mile wide and an inch deep' rather than the reverse.\n\nThe North Star Metric, on the other hand, is the single metric that best captures the core value your product delivers. It serves as a prioritization compass — features that move the North Star get priority.\n\nExamples:\n• Spotify: Time spent listening\n• Airbnb: Nights booked\n• Slack: Messages sent in team channels\n\nA good North Star Metric has three properties: it correlates with revenue, reflects customer value, and is measurable. It's not a vanity metric (total signups) but a value metric (active usage).\n\nUsing both together is powerful: Story Mapping defines what to build; the North Star Metric validates whether it was worth building.",
        keyTakeaway: "Story Mapping ensures your MVP covers the full user journey (wide and shallow), while a North Star Metric provides a single compass for ongoing prioritization decisions."
      },
      {
        type: "teach",
        title: "OKRs for Prioritization",
        body: "OKRs (Objectives and Key Results) aren't just a goal-setting framework — they're a powerful prioritization filter.\n\nAn Objective is a qualitative, ambitious, and inspiring goal. Key Results are 2–5 quantitative outcomes that measure progress toward the Objective.\n\nExample:\nObjective: Become the go-to tool for remote team collaboration\nKR1: Increase weekly active teams from 5,000 to 12,000\nKR2: Improve team activation rate from 30% to 55%\nKR3: Reduce average time-to-first-value from 3 days to 4 hours\n\nFor prioritization, OKRs work as a filter: if a proposed feature doesn't meaningfully contribute to a current Key Result, it goes to the backlog. This prevents scope creep and stakeholder-driven detours.\n\nThe discipline of writing OKRs forces you to distinguish between output (ship a feature) and outcome (change a metric). PMs who write output-focused OKRs like 'Launch the redesign' miss the point — the OKR should be 'Increase task completion rate by 20%.'\n\nOKR cadence matters too. Quarterly OKRs provide focus without becoming stale. Annual OKRs are too slow for product teams; weekly ones are too reactive.\n\nCritical rule: Limit to 3–5 Objectives per quarter. If everything is a priority, nothing is.",
        keyTakeaway: "OKRs act as a prioritization filter — if a feature doesn't move a Key Result, it waits. Focus on outcomes (metrics changed) not outputs (features shipped), with 3–5 objectives per quarter max."
      },
      {
        type: "mcq",
        prompt: "Which of the following is the best example of a well-written Key Result for product prioritization?",
        options: [
          { text: "Increase 7-day retention from 35% to 50%", correct: true, explanation: "This is outcome-focused, specific, measurable, and time-bound. It tells you what success looks like without prescribing how to achieve it." },
          { text: "Launch the new onboarding flow by March 15", correct: false, explanation: "This is an output, not an outcome. It describes a deliverable rather than the impact that deliverable should create." },
          { text: "Make the product more user-friendly", correct: false, explanation: "This is vague and not measurable. A Key Result needs a specific metric and target value." },
          { text: "Conduct 20 user interviews", correct: false, explanation: "This is an activity, not an outcome. It measures effort rather than impact. What should those interviews lead to?" }
        ]
      },
      {
        type: "teach",
        title: "Feature Audits & Saying No",
        body: "Feature audits examine your existing product to identify what to keep, improve, or kill. Not all prioritization is about what to build next — sometimes the highest-leverage move is removing what shouldn't be there.\n\nRun a feature audit by analyzing usage data across your feature set:\n• High adoption, high frequency — Core features. Protect and polish these.\n• High adoption, low frequency — Situational features. Maintain but don't over-invest.\n• Low adoption, high frequency — Power user features. Consider whether they serve your core audience.\n• Low adoption, low frequency — Candidates for removal. They add complexity without value.\n\nRemoving features is one of the hardest things a PM does. Every feature has at least one passionate user who will complain. But feature bloat increases maintenance cost, cognitive load for users, and onboarding friction.\n\nSaying no effectively requires three things:\n\n1. Criteria transparency — When stakeholders understand your prioritization criteria, 'no' becomes 'it didn't score high enough on our framework' rather than 'I don't like your idea.'\n\n2. Alternatives — 'No, but here's what we could do instead' preserves the relationship.\n\n3. Data — 'No, because our data shows X' is harder to argue with than 'No, because I think so.'\n\nThe best PMs don't say no — they make the framework say no.",
        keyTakeaway: "Feature audits identify what to remove (low adoption + low frequency), and effective 'no's rely on transparent criteria, alternative suggestions, and data — let the framework say no for you."
      },
      {
        type: "mcq",
        prompt: "During a feature audit, you discover a feature with low adoption and low usage frequency. What is the recommended action?",
        options: [
          { text: "Consider removing or sunsetting it — it's likely adding complexity without sufficient value", correct: true, explanation: "Low adoption + low frequency features are prime candidates for removal. They increase maintenance burden and cognitive load without meaningful user benefit." },
          { text: "Invest heavily in marketing it to increase adoption", correct: false, explanation: "Throwing marketing at a feature users don't find valuable wastes resources. First validate whether the feature solves a real problem." },
          { text: "Redesign it completely with a bigger engineering investment", correct: false, explanation: "Redesigning before validating demand is risky. The feature may be solving a problem nobody has." },
          { text: "Leave it as is — every feature adds value", correct: false, explanation: "This is the feature bloat mindset. Unused features add maintenance cost, slow releases, and increase user cognitive load." }
        ]
      },
      {
        type: "teach",
        title: "Prioritization Anti-Patterns",
        body: "Even with great frameworks, prioritization fails when certain anti-patterns take hold:\n\n1. HiPPO (Highest Paid Person's Opinion) — The CEO's pet feature jumps the queue without meeting any prioritization criteria. Counter this by socializing your framework early and making the criteria visible.\n\n2. Squeaky Wheel — The loudest customer or stakeholder gets priority. But vocal users aren't representative users. Counter this with quantitative data on how many users share the concern.\n\n3. Recency Bias — The last customer call, support ticket, or competitor launch disproportionately influences priorities. Counter with a structured intake process that batches and evaluates requests periodically.\n\n4. Sunk Cost Fallacy — Continuing a failing initiative because 'we've already invested so much.' The investment is gone regardless. Evaluate based on future expected value, not past cost.\n\n5. Pet Feature Syndrome — PMs prioritize features they personally want, disguised as user needs. Counter by requiring evidence (user research, data) for every item above a certain effort threshold.\n\n6. Everything Is P0 — When all items are high priority, you have no prioritization. Force-rank your top 5 and accept that #6 waits.\n\n7. Framework Shopping — Switching frameworks whenever the current one produces uncomfortable results. Pick one framework and commit for at least a full quarter.\n\nThe antidote to all anti-patterns is disciplined consistency: pick a framework, apply it honestly, and revisit scores when new evidence arrives — not when politics demand it.",
        keyTakeaway: "Common prioritization anti-patterns include HiPPO, Squeaky Wheel, Recency Bias, and Sunk Cost Fallacy — the antidote is disciplined, consistent application of your chosen framework with honest data."
      }
    ]
  },
  {
    id: "roadmapping",
    title: "Roadmapping",
    locked: false,
    lessons: [
      {
        type: "teach",
        title: "Now/Next/Later Roadmaps",
        body: "The Now/Next/Later roadmap is a time-horizon framework that replaces rigid Gantt charts with flexible buckets of commitment.\n\nNow — Work currently in progress or committed for the very near term (this sprint or this month). Highest confidence. Defined at the feature or story level.\n\nNext — Work planned for the near future (next 1–3 months). Medium confidence. Defined at the initiative or theme level, not granular features.\n\nLater — Work on the horizon (3+ months out). Low confidence. Defined at the strategic theme or problem-space level.\n\nThis structure communicates a crucial truth: certainty decreases as you look further into the future. Unlike date-based roadmaps, it doesn't create false promises about when something will ship in Q3.\n\nThe Now/Next/Later format works brilliantly for:\n• Startup environments with high uncertainty\n• Communicating to executives who want strategic direction without committing to dates\n• Agile teams that re-plan frequently\n\nTo build one, start with your product vision and strategy, then map your current and planned initiatives into the three buckets. Review and shift items forward (Later → Next → Now) as confidence increases.\n\nKey rule: Items should get more specific as they move from Later to Now. A 'Later' item like 'Improve onboarding' becomes a 'Now' item like 'Implement interactive product tour for new users.'",
        keyTakeaway: "Now/Next/Later roadmaps communicate decreasing certainty over time — items in 'Now' are specific and committed, while 'Later' items are strategic themes that will be refined as they move forward."
      },
      {
        type: "mcq",
        prompt: "What is the primary advantage of a Now/Next/Later roadmap over a date-based Gantt chart?",
        options: [
          { text: "It communicates that certainty decreases over time, avoiding false date commitments", correct: true, explanation: "Now/Next/Later explicitly signals that future items are less defined and less certain, setting appropriate expectations with stakeholders." },
          { text: "It allows you to plan more features in advance", correct: false, explanation: "The advantage isn't about quantity of planning — it's about honestly representing the decreasing confidence in future plans." },
          { text: "It eliminates the need for prioritization", correct: false, explanation: "You still need to prioritize what goes in each bucket. The framework changes how you communicate, not whether you prioritize." },
          { text: "It guarantees faster delivery of features", correct: false, explanation: "The format doesn't affect delivery speed. It affects how honestly you communicate timelines and certainty to stakeholders." }
        ]
      },
      {
        type: "teach",
        title: "Outcome-Based vs Feature-Based Roadmaps",
        body: "The shift from feature-based to outcome-based roadmaps is one of the most important evolutions in modern product management.\n\nFeature-based roadmaps list specific features with delivery dates: 'Ship dark mode in Q2, add CSV export in Q3.' They feel concrete and satisfying but create several problems:\n\n• They lock teams into solutions before validating the problem\n• They become a contract — stakeholders treat them as promises\n• They measure success by output (did we ship it?) not outcome (did it work?)\n\nOutcome-based roadmaps frame items as problems to solve or metrics to move: 'Reduce time-to-first-value for new users' or 'Increase monthly active rate by 15%.' The team then has the autonomy to discover the best solution.\n\nOutcome-based roadmaps are harder to create because they require strategic clarity. You need to know what outcomes matter and be comfortable with ambiguity about the specific solution.\n\nIn practice, most effective roadmaps are hybrid: outcome-based for the 'Next' and 'Later' horizons, with feature-level detail for 'Now' items where the team has already done discovery work.\n\nThe litmus test: Can your roadmap survive a pivot in solution without being rewritten? If yes, it's outcome-based. If not, it's feature-based.",
        keyTakeaway: "Outcome-based roadmaps focus on problems to solve and metrics to move, giving teams solution autonomy — use them for future horizons and reserve feature-level detail for committed near-term work."
      },
      {
        type: "teach",
        title: "Theme-Based Roadmaps & Release Planning",
        body: "Theme-based roadmaps organize work around strategic themes rather than individual features or outcomes. A theme is a high-level area of investment that groups related initiatives.\n\nExample themes:\n• 'Enterprise Readiness' — SSO, audit logs, role-based access, compliance certifications\n• 'Collaboration' — real-time co-editing, commenting, @mentions, activity feeds\n• 'Performance & Reliability' — page load optimization, uptime improvements, monitoring\n\nThemes connect individual features to strategic priorities, making it easy for executives and cross-functional partners to understand where investment is going without getting lost in feature-level detail.\n\nA strong theme-based roadmap typically has 3–5 themes per quarter, with each theme weighted by percentage of team capacity (e.g., Enterprise Readiness: 40%, Collaboration: 30%, Tech Debt: 20%, Exploration: 10%).\n\nRelease planning complements roadmapping by defining what ships together. A release is a coherent set of features that creates a meaningful step for users. Good release planning considers:\n\n• Dependencies between features\n• Marketing and launch readiness\n• User migration and communication needs\n• Risk — don't put all high-risk items in one release\n\nThe best releases tell a story: 'This release makes our product enterprise-ready' is more compelling than 'This release ships 7 unrelated features.'",
        keyTakeaway: "Theme-based roadmaps group features under 3–5 strategic themes weighted by capacity, and good release planning bundles features into coherent narratives rather than arbitrary collections."
      },
      {
        type: "mcq",
        prompt: "A PM is building a theme-based roadmap for next quarter. Which approach best reflects the framework?",
        options: [
          { text: "Define 3–5 strategic themes, allocate a percentage of team capacity to each, and list initiatives under each theme", correct: true, explanation: "This captures the essence of theme-based roadmapping: strategic grouping with explicit capacity allocation, giving stakeholders clarity on where investment goes." },
          { text: "List every feature the team plans to ship with specific delivery dates", correct: false, explanation: "This is a feature-based roadmap with date commitments, not a theme-based approach." },
          { text: "Create a single prioritized backlog ordered by RICE score", correct: false, explanation: "A prioritized backlog is a useful tool but isn't a roadmap. It lacks strategic grouping and time-horizon communication." },
          { text: "Ask each stakeholder what they want and add all requests to the roadmap", correct: false, explanation: "This is stakeholder-driven roadmapping, which typically produces an unfocused, overcommitted roadmap without strategic coherence." }
        ]
      },
      {
        type: "teach",
        title: "Quarterly Planning",
        body: "Quarterly planning is the ritual that translates strategy into execution. It's where roadmap themes become sprint-ready work.\n\nA strong quarterly planning process has five phases:\n\n1. Reflect — What did we learn last quarter? Which bets paid off? Which didn't? Review metrics against OKRs. This prevents repeating mistakes and celebrates what worked.\n\n2. Align on Strategy — Confirm or adjust the product vision and strategic themes. Has the competitive landscape shifted? Are there new company priorities? This is the time to absorb those changes.\n\n3. Set OKRs — Define 3–5 objectives with measurable key results for the quarter. These become the filter for everything else.\n\n4. Scope Initiatives — Brainstorm, evaluate, and select the initiatives most likely to move the key results. Use your prioritization framework (RICE, Value/Effort, etc.) here.\n\n5. Staff and Sequence — Assign teams or individuals to initiatives, identify dependencies, and sequence work to maximize learning and minimize blocked time.\n\nCommon quarterly planning mistakes:\n• Planning for 100% capacity — Leave 20% buffer for bugs, production issues, and opportunities\n• Ignoring dependencies — Map cross-team dependencies explicitly\n• Skipping the reflection phase — This guarantees you'll repeat last quarter's mistakes\n• Over-committing to stakeholders — Present plans as 'high confidence' and 'lower confidence' items\n\nThe output should be a one-page plan that anyone in the company can understand.",
        keyTakeaway: "Effective quarterly planning follows five phases — Reflect, Align, Set OKRs, Scope Initiatives, Staff & Sequence — and always reserves 20% capacity buffer for unplanned work."
      },
      {
        type: "teach",
        title: "Communicating Roadmaps to Different Audiences",
        body: "A roadmap is only as good as how well it's communicated. Different audiences need different views of the same roadmap.\n\nExecutives / Board — They want strategic direction and business impact. Show themes, outcomes, and how the roadmap connects to company goals. Hide feature-level detail. Use the language of revenue, growth, and market position. Format: 1-page summary with 3–5 themes.\n\nEngineering — They want clarity on what to build and technical constraints. Show initiatives with enough detail to start technical planning, plus dependencies and sequencing. Format: Theme-based roadmap with linked epics/stories.\n\nSales & Customer Success — They want to know what's coming so they can set customer expectations. Show features and rough timelines, with clear caveats about what's committed vs. tentative. Never share internal dates externally. Format: Customer-facing release timeline with 'committed' and 'planned' labels.\n\nCustomers — They want to know you're solving their problems. Show directional themes and recently shipped improvements. Never share dates or promise specific features. Format: Public changelog + directional blog posts.\n\nKey principles for all audiences:\n• Lead with 'why' before 'what'\n• Use visual formats — humans process images faster than text\n• Always distinguish between committed and exploratory items\n• Update regularly — a stale roadmap erodes trust faster than no roadmap",
        keyTakeaway: "Tailor roadmap communication to each audience — executives need strategic themes, engineering needs actionable detail, sales needs customer-safe timelines, and always distinguish committed from exploratory."
      },
      {
        type: "mcq",
        prompt: "When sharing roadmap information with the sales team, which practice is most appropriate?",
        options: [
          { text: "Share features with rough timelines, clearly distinguishing committed items from tentative plans", correct: true, explanation: "Sales needs to set customer expectations accurately. Showing what's committed vs. planned helps them sell without overpromising on unconfirmed features." },
          { text: "Share the full internal roadmap with exact engineering delivery dates", correct: false, explanation: "Internal dates are estimates that often change. Sharing them externally creates promises that may be broken, damaging customer trust." },
          { text: "Only share features after they've shipped to avoid any risk", correct: false, explanation: "This is too conservative — sales needs forward-looking information to handle customer objections and close deals. Just manage the level of commitment." },
          { text: "Let sales determine which features to build based on customer requests", correct: false, explanation: "Sales input is valuable, but letting sales drive the roadmap produces a collection of one-off customer requests rather than a strategic product." }
        ]
      },
      {
        type: "teach",
        title: "Roadmap Anti-Patterns",
        body: "Recognizing roadmap anti-patterns is as important as knowing the right approaches. Here are the most damaging ones:\n\n1. The Feature Factory Roadmap — A list of features with no strategic narrative. Teams ship features endlessly but can't articulate why. Fix: Start with outcomes, then identify features.\n\n2. The Everything Roadmap — Contains every request from every stakeholder. Nothing is deprioritized. The roadmap is 3 pages long and no one reads it. Fix: Limit to 3–5 themes. Force trade-offs.\n\n3. The Fantasy Roadmap — Ambitious plans with no connection to team capacity. 6 months of work crammed into 3 months. Fix: Validate scope against actual velocity data.\n\n4. The Stale Roadmap — Created once and never updated. It's Q3 and the roadmap still shows Q1 plans. Fix: Review and update monthly at minimum.\n\n5. The Date-Driven Roadmap — Every item has a specific delivery date, creating false precision. One delay cascades into stakeholder disappointment. Fix: Use time horizons (Now/Next/Later) instead of dates.\n\n6. The Solution-First Roadmap — Lists solutions ('build a chatbot') without stating the problem ('reduce support ticket volume'). Fix: Every roadmap item should start with a problem or outcome statement.\n\n7. The Hidden Roadmap — Exists only in the PM's head or a private document. Stakeholders don't know the plan. Fix: Share publicly and review in regular forums.\n\nThe overarching principle: A roadmap is a communication tool, not a project plan. If it's not changing how people make decisions, it's not working.",
        keyTakeaway: "Deadly roadmap anti-patterns include Feature Factory (no strategy), Fantasy (ignoring capacity), and Date-Driven (false precision) — a roadmap is a communication tool, not a project plan."
      },
      {
        type: "teach",
        title: "Discovery vs Delivery & Managing Expectations",
        body: "Product work operates in two modes: Discovery and Delivery. Your roadmap should reflect both.\n\nDiscovery is about finding the right thing to build. It involves user research, prototyping, experiments, and validation. Discovery work is inherently uncertain — you don't know what you'll learn.\n\nDelivery is about building the thing right. It involves engineering, design implementation, testing, and shipping. Delivery work is more predictable (though never perfectly so).\n\nA healthy roadmap shows both: 'Now' items are in delivery mode. 'Next' items may be split between late-stage discovery and early delivery. 'Later' items are in discovery or pre-discovery.\n\nThe biggest roadmap mistake is putting items straight into delivery without discovery. You end up building confidently in the wrong direction.\n\nManaging expectations is the meta-skill that makes roadmaps work:\n\n• Underpromise, overdeliver — Commit to less than you think you can do. Shipping early is celebrated; shipping late is punished.\n\n• Communicate changes proactively — When priorities shift, tell stakeholders before they ask. 'We decided to shift focus because of X' is better than being caught off-guard.\n\n• Use confidence levels — Label items as 'High confidence,' 'Medium confidence,' or 'Exploring.' This sets expectations without committing.\n\n• Show your reasoning — When you deprioritize something, share the framework and data that drove the decision. People accept 'no' better when they understand 'why.'",
        keyTakeaway: "Healthy roadmaps balance Discovery (finding the right thing to build) with Delivery (building it right) — manage expectations by using confidence levels and communicating changes proactively."
      },
      {
        type: "mcq",
        prompt: "A PM has an initiative in the 'Next' column of their Now/Next/Later roadmap. What should the current state of that initiative ideally be?",
        options: [
          { text: "In late-stage discovery or early delivery — the problem is validated and the team is converging on a solution", correct: true, explanation: "'Next' items should have progressed through initial discovery. The problem should be validated and the solution taking shape, preparing for delivery when the item moves to 'Now.'" },
          { text: "Fully designed and ready for engineering to start building immediately", correct: false, explanation: "This would mean no discovery happened, or it was done too far in advance. Solutions designed too early may be based on outdated assumptions." },
          { text: "Just an idea with no validation — it's too early for any research", correct: false, explanation: "That level of uncertainty belongs in the 'Later' bucket. 'Next' items should have some discovery work completed." },
          { text: "Already in production with users accessing it", correct: false, explanation: "If it's already live, it belongs in 'Now' or is completed work. 'Next' indicates planned future work." }
        ]
      },
      {
        type: "teach",
        title: "When to Pivot Your Roadmap",
        body: "Knowing when to pivot your roadmap is one of the most consequential judgment calls a PM makes. Pivoting too often creates whiplash. Pivoting too late wastes months.\n\nSignals that a pivot is needed:\n\n• Metrics aren't moving — You've shipped several initiatives against an outcome and the needle hasn't budged. The hypothesis may be wrong.\n\n• Market shift — A competitor launches something that changes the game, or a regulatory change invalidates your approach.\n\n• Discovery reveals a bigger opportunity — User research surfaces a more impactful problem than the one you planned to solve.\n\n• Customer churn signals — Your core users are leaving for reasons your roadmap doesn't address.\n\n• Internal strategic shift — The company changes direction (new market, new business model, acquisition). Your roadmap must follow.\n\nHow to pivot well:\n\n1. Gather evidence — Don't pivot on gut feeling. Compile the data that supports the change.\n\n2. Assess sunk cost honestly — What have you already invested? What's the switching cost? Never continue just because you've already started.\n\n3. Communicate the narrative — 'We learned X, which means Y, so we're shifting to Z.' Frame it as learning, not failure.\n\n4. Preserve trust — Acknowledge the impact on stakeholders and teams. A pivot is disruptive — treat it with the seriousness it deserves.\n\n5. Update artifacts — Change the roadmap, OKRs, and backlog immediately. Stale documents that contradict the new direction create confusion.\n\nRemember: the roadmap serves the strategy. When the strategy changes, the roadmap must follow without hesitation.",
        keyTakeaway: "Pivot your roadmap when metrics stall, markets shift, or discovery reveals bigger opportunities — always lead with evidence, communicate the narrative of what you learned, and update all artifacts immediately."
      }
    ]
  }
];

const GROWTH_CONTENT = [
  {
    id: "growth_loops",
    title: "Growth Loops & Funnels",
    locked: false,
    lessons: [
      {
        type: "teach",
        title: "AARRR Pirate Metrics",
        body: "AARRR (Pirate Metrics), created by Dave McClure, is the foundational framework for understanding user lifecycle and growth. It breaks the customer journey into five stages:\n\nAcquisition — How do users find you? Channels include organic search, paid ads, social media, referrals, and content marketing. Key metrics: traffic, sign-ups, cost per acquisition (CPA).\n\nActivation — Do users have a great first experience? This is the 'aha moment' where users first experience your product's core value. Key metrics: completion of onboarding, time-to-first-value, activation rate.\n\nRetention — Do users come back? This is the most critical stage. Without retention, acquisition is a leaky bucket. Key metrics: Day 1/7/30 retention, churn rate, DAU/MAU ratio.\n\nRevenue — How do you make money from users? This includes conversion to paid, average revenue per user (ARPU), and lifetime value (LTV). Key metrics: conversion rate, ARPU, LTV, payback period.\n\nReferral — Do users tell others? Organic word-of-mouth and structured referral programs. Key metrics: Net Promoter Score (NPS), viral coefficient (K-factor), referral rate.\n\nThe power of AARRR is sequential diagnosis: you optimize from the bottom of the funnel up. Fix retention before investing in acquisition — there's no point pouring users into a leaky bucket.\n\nA common mistake is obsessing over Acquisition while ignoring Activation. If users sign up but never experience value, your growth engine is broken at the foundation.",
        keyTakeaway: "AARRR maps the user lifecycle across Acquisition, Activation, Retention, Revenue, and Referral — always optimize from the bottom up, fixing retention before scaling acquisition."
      },
      {
        type: "mcq",
        prompt: "According to the AARRR framework, which stage should you optimize FIRST if you notice high sign-up numbers but low sustained usage?",
        options: [
          { text: "Retention — users are signing up but not coming back, indicating a leaky bucket", correct: true, explanation: "High sign-ups with low sustained usage means your retention is broken. Fix the leaky bucket before pouring more users in through acquisition." },
          { text: "Acquisition — double down on sign-up channels to compensate for drop-off", correct: false, explanation: "More acquisition into a broken retention funnel just means more users churning. You're spending money to lose users faster." },
          { text: "Revenue — quickly monetize the users you have before they leave", correct: false, explanation: "Aggressive monetization of users who aren't retained will accelerate churn, not fix it." },
          { text: "Referral — get existing users to invite friends to increase volume", correct: false, explanation: "Asking unretained users to refer friends means you're spreading a product that doesn't retain. This damages your brand." }
        ]
      },
      {
        type: "teach",
        title: "Growth Loops vs Funnels",
        body: "Traditional growth thinking uses funnels: a linear sequence where users enter at the top and convert through stages. Funnels are useful for measurement but have a fundamental flaw — they treat growth as a one-directional flow.\n\nGrowth loops, pioneered by Reforge, reframe growth as a circular, self-reinforcing system. The output of one loop cycle becomes the input for the next.\n\nAnatomy of a growth loop:\n1. New user joins (input)\n2. User takes a valuable action\n3. That action generates an output (content, data, referral, revenue)\n4. The output attracts or enables more new users (back to step 1)\n\nExamples of growth loops:\n\n• User-Generated Content Loop (Pinterest): User joins → pins content → content is indexed by Google → new users discover via search → they join.\n\n• Viral Loop (WhatsApp): User joins → invites contacts to chat → contacts join to reply → they invite their contacts.\n\n• Paid Loop (subscription SaaS): User joins → subscribes → revenue funds advertising → ads attract new users → they subscribe.\n\nWhy loops beat funnels:\n• Loops compound — each cycle makes the next one stronger\n• Loops are sustainable — they don't require ever-increasing external input\n• Loops reveal the actual growth engine — not just the stages\n\nThe best products have multiple interlocking loops. Uber has a cross-side network effect loop (more drivers → shorter wait times → more riders → more drivers) and a paid loop (revenue funds driver incentives).",
        keyTakeaway: "Growth loops are self-reinforcing cycles where each user's actions generate outputs that attract more users — unlike linear funnels, loops compound over time and reveal your true growth engine."
      },
      {
        type: "teach",
        title: "Viral Coefficient & Network Effects",
        body: "The viral coefficient (K-factor) measures how many new users each existing user brings in. The formula is:\n\nK = i × c\n\nWhere:\n• i = number of invitations sent per user\n• c = conversion rate of those invitations\n\nIf K > 1, you have viral growth — each user brings in more than one new user, creating exponential growth. If K = 0.5, each user brings half a new user — growth is additive, not viral.\n\nEven a K of 0.3–0.5 is valuable — it amplifies your other growth channels by 30–50%. Pure viral growth (K > 1) is extremely rare and usually temporary.\n\nNetwork effects are related but different. A product has network effects when it becomes more valuable as more people use it.\n\nTypes of network effects:\n\n• Direct (same-side) — Each additional user makes the product more valuable for all users. Example: a phone network.\n\n• Indirect (cross-side) — More users on one side attract more users on the other side. Example: more Uber riders attract more drivers, and vice versa.\n\n• Data network effects — More users generate more data, which improves the product for everyone. Example: Google Search gets better with more queries.\n\n• Protocol network effects — The product becomes a standard. Example: Slack in workplace communication.\n\nNetwork effects create defensible moats, but they also have a cold-start problem — the product isn't valuable until enough users are on it. The solution is often a single-player mode that provides value even without the network.",
        keyTakeaway: "Viral coefficient (K = invites × conversion rate) measures organic user acquisition power, while network effects create lasting moats — both need a cold-start strategy to reach critical mass."
      },
      {
        type: "mcq",
        prompt: "Your app's users send an average of 4 invitations each, and 15% of invited people sign up. What is your viral coefficient (K-factor)?",
        options: [
          { text: "0.6", correct: true, explanation: "K = i × c = 4 × 0.15 = 0.6. This means each user brings in 0.6 new users on average. Not viral (K < 1), but still a meaningful amplifier of your other growth channels." },
          { text: "1.5", correct: false, explanation: "This would require a much higher invitation rate or conversion rate. K = 4 × 0.15 = 0.6, not 1.5." },
          { text: "0.15", correct: false, explanation: "This is just the conversion rate (c). The K-factor multiplies invitations sent (i) by conversion rate (c)." },
          { text: "4.15", correct: false, explanation: "The formula is multiplication (K = i × c), not addition. 4 × 0.15 = 0.6." }
        ]
      },
      {
        type: "teach",
        title: "Activation Rate & Onboarding Optimization",
        body: "Activation rate measures the percentage of new users who reach the 'aha moment' — the point where they first experience your product's core value. It's arguably the most important growth metric because it sits at the junction of acquisition and retention.\n\nDefining your activation event requires identifying what behavior correlates with long-term retention. This is done through correlation analysis:\n• Slack found that teams sending 2,000+ messages were much more likely to retain\n• Facebook found that users who added 7+ friends in 10 days retained dramatically better\n• Dropbox found that users who uploaded at least one file retained at higher rates\n\nYour activation event should be specific, measurable, and achievable within a reasonable timeframe.\n\nOnboarding optimization focuses on removing friction between sign-up and activation:\n\n1. Reduce time-to-value — Get users to the 'aha moment' as fast as possible. Every extra step is a drop-off point.\n\n2. Progressive disclosure — Don't show everything at once. Reveal features as users need them.\n\n3. Guided first experience — Use checklists, tooltips, or interactive tours to guide users to the activation event. But don't force them — let users opt out.\n\n4. Remove sign-up friction — Do you really need their company name at sign-up? Every field reduces conversion.\n\n5. Show value before asking for investment — Let users experience the product before requiring a credit card, profile setup, or commitment.\n\n6. Personalize onboarding — Ask one key question ('What's your goal?') and tailor the experience. A designer and a developer don't need the same onboarding in Figma.",
        keyTakeaway: "Activation rate measures users who reach the 'aha moment' — optimize onboarding by reducing time-to-value, using progressive disclosure, and removing every unnecessary step between sign-up and first value."
      },
      {
        type: "mcq",
        prompt: "Through data analysis, you find that users who complete 3 key actions within their first week retain at 4x the rate of those who don't. What should you do with this insight?",
        options: [
          { text: "Define these 3 actions as your activation event and optimize onboarding to guide users toward completing them quickly", correct: true, explanation: "When you identify behaviors that correlate with retention, they become your activation milestones. Onboarding should be designed to guide users to these specific actions." },
          { text: "Force all users to complete these 3 actions before they can access the product", correct: false, explanation: "Forcing actions creates friction and resentment. Users should be guided, not gated. Some users may find value through different paths." },
          { text: "Ignore it — correlation doesn't imply causation", correct: false, explanation: "While true that correlation isn't causation, this signal is strong enough (4x retention) to act on. Run experiments to validate, but don't ignore it." },
          { text: "Email users after 30 days reminding them to complete these actions", correct: false, explanation: "Day 30 is far too late. The first week is critical. Onboarding should surface these actions immediately, not a month later." }
        ]
      },
      {
        type: "teach",
        title: "Referral Programs & the Flywheel Model",
        body: "Referral programs are structured mechanisms that incentivize existing users to invite new ones. When designed well, they're one of the most cost-effective acquisition channels.\n\nAnatomy of a great referral program:\n\n1. Double-sided incentives — Reward both the referrer and the referred. Dropbox gave 500MB to both parties. One-sided referrals have dramatically lower conversion.\n\n2. Aligned incentives — The reward should be product-related (extra storage, credit, premium features) rather than generic (gift cards). Product-related rewards attract users who actually want your product.\n\n3. Frictionless sharing — One click to share via link, email, or social. Don't make users copy a referral code and explain how to use it.\n\n4. Visible progress — Show users how many referrals they've made and what they've earned. Gamification elements (progress bars, milestones) increase engagement.\n\n5. Timely prompts — Ask for referrals at moments of delight, not during onboarding. After a user completes a successful task is ideal.\n\nThe Flywheel Model (popularized by Amazon and Jim Collins) extends this thinking. Instead of a funnel with an endpoint, the flywheel is a self-reinforcing cycle where momentum builds with each revolution:\n\nAmazon's flywheel: Lower prices → more customers → more sellers → more selection → better experience → more customers → leverage for lower prices → repeat.\n\nThe key insight: every part of the flywheel strengthens every other part. Your job is to identify the flywheel in your business and reduce friction at each stage.\n\nUnlike a funnel that you push users through, a flywheel accumulates energy. Early revolutions are hard. Later revolutions are nearly effortless.",
        keyTakeaway: "Effective referral programs use double-sided, product-aligned incentives with frictionless sharing — the Flywheel Model extends this by creating self-reinforcing cycles where momentum compounds over time."
      },
      {
        type: "teach",
        title: "The Sean Ellis Test & Product-Market Fit",
        body: "The Sean Ellis Test is the most widely used proxy for product-market fit. It asks users a single question:\n\n'How would you feel if you could no longer use this product?'\n\nResponse options:\n• Very disappointed\n• Somewhat disappointed\n• Not disappointed\n• N/A — I no longer use it\n\nThe benchmark: if 40%+ of active users say 'very disappointed,' you likely have product-market fit. Below 40%, you have work to do.\n\nWhy this works: Users who would be 'very disappointed' have integrated your product into their workflow. They've found irreplaceable value. This is a leading indicator of retention and organic growth.\n\nHow to use the Sean Ellis Test effectively:\n\n1. Survey active users — Don't ask churned users or brand new sign-ups. Target users who've used the product enough to form an opinion (typically 2+ weeks of active use).\n\n2. Segment results — Your overall score might be 30%, but a specific persona might be at 60%. This tells you who your product is for.\n\n3. Follow up — Ask 'very disappointed' users what they love. Ask 'not disappointed' users what's missing. This qualitative data is gold.\n\n4. Track over time — Run the survey quarterly. Watch whether the percentage trends up or down as you make changes.\n\nThe Sean Ellis Test is a diagnostic, not a goal in itself. If you're below 40%, focus on deepening value for your most engaged users rather than broadening features for everyone.",
        keyTakeaway: "The Sean Ellis Test measures product-market fit by asking if users would be 'very disappointed' without your product — 40%+ means likely PMF, and segment analysis reveals who you're truly building for."
      },
      {
        type: "mcq",
        prompt: "You run the Sean Ellis Test and 28% of users say they'd be 'very disappointed' without your product. What is the most appropriate next step?",
        options: [
          { text: "Segment the results to find which user group scores above 40%, then double down on serving that segment", correct: true, explanation: "Even with an overall score below 40%, specific segments may have found strong product-market fit. Identifying and focusing on these segments is the fastest path to improving overall PMF." },
          { text: "Pivot the product entirely since you're below the 40% benchmark", correct: false, explanation: "28% isn't a disaster — it means you're partially there. Pivoting throws away what's working. Segment first to understand where you do have fit." },
          { text: "Scale marketing spend to increase user volume", correct: false, explanation: "Scaling before you have product-market fit means scaling a leaky bucket. More users will churn because the core value isn't strong enough." },
          { text: "Add more features to increase the overall percentage", correct: false, explanation: "Adding features without understanding which users value what leads to bloat. The answer is in the segmentation, not in more features." }
        ]
      },
      {
        type: "teach",
        title: "Product-Led Growth (PLG)",
        body: "Product-Led Growth (PLG) is a business methodology where the product itself is the primary driver of user acquisition, activation, retention, and expansion. Instead of relying on sales teams or marketing campaigns, the product sells itself.\n\nCore PLG principles:\n\n1. Try before you buy — Users experience value before paying. Free trials, freemium tiers, or open-source models remove the purchase barrier.\n\n2. Self-serve onboarding — Users can sign up, configure, and get value without talking to a human. This dramatically lowers customer acquisition cost (CAC).\n\n3. Viral mechanics built in — The product naturally spreads through usage. When you share a Figma file, recipients see Figma in action.\n\n4. Data-driven conversion — Usage data identifies sales-ready accounts. When a team hits usage limits or adopts broadly, sales steps in (product-qualified leads, or PQLs).\n\nPLG companies typically have lower CAC, faster time-to-revenue, and higher net dollar retention than sales-led peers.\n\nThe PLG funnel:\nVisitor → Free user → Activated user → Paying user → Expanded user → Advocate\n\nNotably, PLG doesn't eliminate sales — it transforms sales into an expansion motion rather than initial acquisition. Slack, Zoom, and Notion all layer sales on top of PLG for enterprise deals.\n\nPLG isn't right for every product. It works best when:\n• The value can be experienced without customization\n• The target user can self-serve\n• The product has natural viral or network properties\n• The price point allows self-serve purchasing",
        keyTakeaway: "Product-Led Growth uses the product itself as the primary growth engine — users experience value before paying, onboard without sales, and the product spreads through natural usage."
      },
      {
        type: "teach",
        title: "Freemium vs Free Trial",
        body: "Choosing between Freemium and Free Trial is one of the most consequential growth model decisions a PM makes. Both let users try before buying, but they work very differently.\n\nFreemium gives users a permanently free version with limited features or capacity. Conversion to paid unlocks premium capabilities.\n\nFree Trial gives users full access for a limited time (7, 14, or 30 days), after which they must pay to continue.\n\nWhen to choose Freemium:\n• Your product has network effects (more free users = more value for paid users)\n• Free users generate value you can monetize (data, content, virality)\n• The conversion rate is low but the market is huge (e.g., Spotify: ~4% conversion, 600M+ users)\n• The marginal cost of serving free users is near zero\n\nWhen to choose Free Trial:\n• The full product experience is needed to demonstrate value\n• Serving free users is expensive (compute, storage, support)\n• Your market is smaller but high-value (enterprise SaaS)\n• You need faster conversion cycles\n\nHybrid models exist: reverse trial (start with full features, downgrade to free after trial ends) combines the urgency of a trial with the safety net of freemium.\n\nKey metrics to track:\n• Freemium: free-to-paid conversion rate, time-to-conversion, feature adoption gaps\n• Free Trial: trial start rate, trial-to-paid conversion rate, optimal trial length\n\nA common mistake is making the free tier too generous (no reason to upgrade) or too restrictive (users can't experience enough value to want more).",
        keyTakeaway: "Choose Freemium when you have network effects and low marginal costs; choose Free Trial when full access is needed to demonstrate value — the free tier must be generous enough to hook but limited enough to convert."
      },
      {
        type: "mcq",
        prompt: "A SaaS product has strong network effects, near-zero marginal cost per user, and a very large addressable market. Which monetization model is most appropriate?",
        options: [
          { text: "Freemium — the network effects and large market make free users strategically valuable", correct: true, explanation: "Network effects mean free users add value for paid users. Near-zero marginal cost means free users are cheap to serve. A large market means even a small conversion rate generates significant revenue." },
          { text: "Free Trial — time pressure will drive faster conversions", correct: false, explanation: "Free trials work well for smaller, higher-value markets. With network effects, you want to maximize the free user base because each user makes the product more valuable." },
          { text: "No free offering — charge from day one to maximize revenue", correct: false, explanation: "Without a free tier, you lose the network effect advantage. Fewer users means less value for everyone, reducing the willingness to pay." },
          { text: "Freemium with a very restrictive free tier", correct: false, explanation: "An overly restrictive free tier undermines the network effect. If free users can't contribute meaningfully, they're not adding value that attracts paid users." }
        ]
      },
      {
        type: "teach",
        title: "Expansion Revenue",
        body: "Expansion revenue is additional revenue earned from existing customers beyond their initial purchase. It's the most efficient form of revenue growth because the customer acquisition cost is already paid.\n\nTypes of expansion revenue:\n\n1. Upselling — Moving customers to a higher-priced plan. This works when usage naturally grows beyond the current tier's limits. Example: Slack charges per active user, so as teams grow, revenue grows.\n\n2. Cross-selling — Selling additional products or features to existing customers. Example: HubSpot customers starting with Marketing Hub adding Sales Hub.\n\n3. Usage-based expansion — Revenue that grows automatically as customers use more. Example: AWS charges based on compute and storage consumed.\n\n4. Seat expansion — Revenue growing as more team members adopt the product within an organization.\n\nThe key metric is Net Dollar Retention (NDR), also called Net Revenue Retention:\nNDR = (Starting MRR + Expansion – Contraction – Churn) / Starting MRR\n\nAn NDR above 100% means you're growing revenue from your existing customer base even without adding new customers. Best-in-class SaaS companies hit 120–140% NDR.\n\nNDR > 100% means your business can grow even with zero new customer acquisition — a remarkably powerful position.\n\nTo drive expansion revenue:\n• Design tier structures that align with growing usage\n• Track usage patterns to identify expansion-ready accounts\n• Build features that become more valuable as teams grow\n• Use product-qualified expansion signals (approaching limits, adding users) to trigger outreach\n\nExpansion revenue is the hidden engine behind the most successful SaaS businesses. It's cheaper than acquisition, more predictable than new sales, and compounds over time.",
        keyTakeaway: "Expansion revenue (upsells, cross-sells, usage growth) from existing customers is the most efficient growth lever — Net Dollar Retention above 100% means the business grows even without new customers."
      }
    ]
  },
  {
    id: "experimentation",
    title: "Experimentation",
    locked: false,
    lessons: [
      {
        type: "teach",
        title: "A/B Testing Fundamentals",
        body: "A/B testing (split testing) is the gold standard for making data-driven product decisions. It involves randomly splitting users into two groups — Control (A, the current experience) and Treatment (B, the variant) — and measuring which performs better on a predefined metric.\n\nAnatomy of a well-designed A/B test:\n\n1. Hypothesis — State what you believe and why. 'We believe that simplifying the checkout flow from 3 steps to 1 will increase purchase completion by 15% because user research shows drop-off at step 2.'\n\n2. Primary metric — The single metric you're trying to move. Don't optimize for multiple metrics simultaneously or you'll get conflicting results.\n\n3. Sample size — Calculate before you start. Running a test on too few users produces unreliable results. Running on too many wastes time.\n\n4. Duration — Run tests long enough to capture weekly cycles (minimum 1–2 business weeks). Don't stop a test early because it 'looks significant.'\n\n5. Randomization — Users must be randomly assigned to groups. If your control group is desktop users and your treatment is mobile users, any difference could be caused by the device, not the change.\n\n6. Single variable — Change one thing at a time. If you change the button color AND the copy AND the layout, you can't attribute the result to any specific change.\n\nCommon A/B testing mistakes:\n• Peeking — Checking results repeatedly and stopping when they look good. This inflates false positive rates.\n• Multiple comparisons — Testing 10 variants increases the chance of a false positive to ~40%.\n• Survivorship bias — Only measuring users who completed the flow, ignoring those who abandoned.",
        keyTakeaway: "A/B testing compares a Control to a single Treatment with random user assignment — always set your hypothesis, primary metric, and sample size before starting, and never stop early based on peeking."
      },
      {
        type: "mcq",
        prompt: "You're running an A/B test and after 3 days (planned duration: 14 days), the treatment group shows a statistically significant improvement. What should you do?",
        options: [
          { text: "Continue running the test for the full 14 days to account for weekly cycles and avoid peeking bias", correct: true, explanation: "Stopping early because results 'look significant' inflates false positive rates (the peeking problem). Weekly cycles, novelty effects, and sample size requirements mean you need the full duration." },
          { text: "Stop the test immediately and ship the winning variant to save time", correct: false, explanation: "Early significance is often a mirage. Short durations miss weekly patterns (weekday vs. weekend behavior) and the result may regress as more data comes in." },
          { text: "Restart the test because something must be wrong — real improvements take longer", correct: false, explanation: "There's nothing inherently wrong with early positive signals. You should simply continue the test as planned and evaluate at the predetermined end date." },
          { text: "Add more variants to test other ideas simultaneously", correct: false, explanation: "Adding variants mid-test invalidates the statistical setup. Each variant needs its own sample size calculation from the start." }
        ]
      },
      {
        type: "teach",
        title: "Multivariate Testing",
        body: "Multivariate testing (MVT) extends A/B testing by testing multiple variables simultaneously and measuring how they interact.\n\nIn an A/B test, you test one variable (button color: red vs. blue). In a multivariate test, you test multiple variables at once (button color × button text × button size), creating many combinations.\n\nExample:\n• Button color: Red, Blue\n• Button text: 'Buy Now', 'Add to Cart'\n• Button size: Small, Large\n\nThis creates 2 × 2 × 2 = 8 combinations. Each combination is a unique variant.\n\nAdvantages of MVT:\n• Reveals interaction effects — Maybe 'Buy Now' works better with blue buttons but 'Add to Cart' works better with red buttons. An A/B test would miss this.\n• More efficient than sequential A/B tests — Instead of running 3 separate A/B tests, you run one MVT.\n\nDisadvantages of MVT:\n• Requires massive traffic — 8 variants need 8x the sample size of a simple A/B test. Most products don't have enough traffic.\n• Harder to analyze — Interaction effects can be confusing, and not all combinations are meaningful.\n• Risk of false discoveries — More comparisons mean more chances for false positives.\n\nWhen to use MVT:\n• You have very high traffic (millions of monthly visitors)\n• You suspect interaction effects between variables\n• The changes are small and contained (UI elements on a single page)\n\nWhen to use A/B testing instead:\n• Traffic is limited\n• You're testing a significant product change\n• You want clear, simple results\n\nIn practice, A/B testing covers 90% of experimentation needs. Reserve MVT for high-traffic optimization scenarios.",
        keyTakeaway: "Multivariate testing examines multiple variables and their interactions simultaneously — it's more powerful than A/B testing but requires massive traffic and creates complex analysis challenges."
      },
      {
        type: "teach",
        title: "Statistical Significance & Minimum Detectable Effect",
        body: "Statistical significance tells you whether an observed difference between groups is likely real or due to random chance.\n\nKey concepts:\n\n• p-value — The probability of seeing a result this extreme (or more) if there's actually no real difference. Convention: p < 0.05 means the result is statistically significant (less than 5% chance it's due to noise).\n\n• Significance level (α) — The threshold for your p-value, typically 0.05. This means you accept a 5% false positive rate (Type I error).\n\n• Statistical power (1 – β) — The probability of detecting a real effect when one exists. Convention: 80% power. This means you accept a 20% false negative rate (Type II error).\n\n• Confidence interval — A range likely containing the true effect. A 95% CI of [2%, 8%] means the true lift is likely between 2% and 8%.\n\nMinimum Detectable Effect (MDE) is the smallest improvement you care about detecting. It directly determines your required sample size.\n\nMDE trade-offs:\n• Smaller MDE → Need more users → Test runs longer → More precise\n• Larger MDE → Need fewer users → Test runs faster → Miss smaller improvements\n\nHow to choose MDE: Think about business impact. If a 1% improvement in conversion adds $100K/year in revenue, detecting 1% is worth the larger sample. If it adds $1K, detecting 5% is sufficient.\n\nSample size formula (simplified):\nn ≈ 16 × σ² / MDE²\n\nwhere σ is the standard deviation of your metric. In practice, use online sample size calculators.\n\nRule of thumb: Cutting MDE in half requires 4x the sample size.",
        keyTakeaway: "Statistical significance (p < 0.05) guards against false positives, while MDE determines the smallest effect worth detecting — halving MDE requires 4x the sample size, so choose it based on business impact."
      },
      {
        type: "mcq",
        prompt: "You want to detect a 2% improvement in conversion rate with your A/B test. Your colleague argues you should detect 1% to be more precise. How does this affect the required sample size?",
        options: [
          { text: "The sample size roughly quadruples — detecting half the MDE requires approximately 4x the users", correct: true, explanation: "Sample size is inversely proportional to MDE squared. Halving the MDE (2% → 1%) means MDE² is quartered, so you need ~4x the sample." },
          { text: "The sample size doubles", correct: false, explanation: "The relationship isn't linear. Because sample size scales with 1/MDE², halving MDE quadruples the requirement, not doubles it." },
          { text: "The sample size stays the same — MDE doesn't affect sample size", correct: false, explanation: "MDE is one of the primary determinants of sample size. A smaller MDE always requires more data." },
          { text: "The sample size is reduced because you're looking for a smaller effect", correct: false, explanation: "It's the opposite — detecting smaller effects is harder and requires more data, not less." }
        ]
      },
      {
        type: "teach",
        title: "Bayesian vs Frequentist Approaches",
        body: "There are two philosophical approaches to analyzing experiments: Frequentist and Bayesian. Each has different strengths.\n\nFrequentist (traditional A/B testing):\n• Asks: 'If there's no real difference, how likely is this result?'\n• Uses p-values and confidence intervals\n• Requires fixed sample sizes determined before the test\n• You cannot peek at results and stop early\n• Clear, binary decision: significant or not\n• Industry standard for regulatory and scientific settings\n\nBayesian:\n• Asks: 'Given the data I've observed, what's the probability that B is better than A?'\n• Uses prior beliefs updated with observed data to produce posterior probabilities\n• You can peek at results at any time and make decisions\n• Outputs intuitive results: 'There's a 93% probability that variant B is better'\n• Adapts naturally as more data arrives\n• Better for fast-moving product teams\n\nPractical differences:\n\nWith a Frequentist test, you might hear: 'The result is statistically significant at p = 0.03.' This means there's a 3% chance of seeing this result if the variants were actually the same.\n\nWith a Bayesian test, you might hear: 'There's a 95% probability that variant B improves conversion by 2–6%.' This directly answers the question PMs care about.\n\nBayesian is better when:\n• You need to make fast decisions\n• You want to peek at results without invalidating the test\n• You prefer probabilistic answers ('85% chance of improvement') over binary ones ('significant/not significant')\n\nFrequentist is better when:\n• You need rigorous, defensible results\n• You have enough traffic to run full-duration tests\n• Regulatory or scientific standards require it\n\nMany modern experimentation platforms (Optimizely, Amplitude) now support Bayesian analysis by default.",
        keyTakeaway: "Frequentist testing gives binary significant/not-significant decisions with no peeking, while Bayesian testing provides probability statements ('93% chance B is better') and allows checking results anytime."
      },
      {
        type: "mcq",
        prompt: "Which statement accurately describes the Bayesian approach to experimentation?",
        options: [
          { text: "It produces a probability that one variant is better than another, and allows checking results at any point during the test", correct: true, explanation: "Bayesian analysis outputs posterior probabilities (e.g., '92% chance B is better') and its math is valid at any sample size, allowing flexible peeking without inflating error rates." },
          { text: "It requires fixed sample sizes and prohibits looking at results before the test ends", correct: false, explanation: "This describes the Frequentist approach. Bayesian methods update beliefs continuously as data arrives and don't require pre-fixed sample sizes." },
          { text: "It only outputs p-values to determine statistical significance", correct: false, explanation: "p-values are a Frequentist concept. Bayesian methods output posterior probabilities and credible intervals instead." },
          { text: "It requires no prior assumptions and works purely from the observed data", correct: false, explanation: "Bayesian methods explicitly incorporate prior beliefs (priors) and update them with observed data. The use of priors is a defining feature." }
        ]
      },
      {
        type: "teach",
        title: "Guardrail Metrics & Feature Flags",
        body: "Guardrail metrics are metrics you monitor during an experiment to ensure you're not causing unintended harm while optimizing your primary metric.\n\nExamples:\n• Primary metric: Increase add-to-cart rate\n• Guardrail metrics: Overall revenue per session, page load time, support ticket volume\n\nYou might successfully increase add-to-cart rate by making the button enormous and aggressive — but if it increases support tickets and reduces revenue per session, the 'win' is actually a loss.\n\nTypes of guardrails:\n• Business guardrails — Revenue, LTV, NPS. Ensure you're not winning a metric at the expense of the business.\n• Technical guardrails — Page load time, error rates, crash rates. Ensure the change doesn't degrade performance.\n• User experience guardrails — Session duration, pages per session, bounce rate. Ensure users aren't confused or frustrated.\n\nFeature flags are the infrastructure that makes safe experimentation possible. A feature flag is a toggle that enables or disables a feature for specific users without deploying new code.\n\nFeature flags enable:\n1. Gradual rollouts — Ship to 1% of users, then 10%, then 50%, then 100%. If something breaks at 10%, roll back instantly.\n2. Targeted releases — Enable features for specific segments (beta testers, enterprise customers, specific geographies).\n3. Kill switches — Disable a broken feature in production without redeploying.\n4. Experiment infrastructure — Route users to Control or Treatment groups.\n\nFeature flag hygiene matters: remove flags after experiments conclude. Stale flags create technical debt and confusion. A codebase with 500 active feature flags is a maintenance nightmare.",
        keyTakeaway: "Guardrail metrics prevent optimizing one metric at the expense of others, while feature flags enable safe gradual rollouts and instant rollbacks — always clean up flags after experiments end."
      },
      {
        type: "teach",
        title: "Gradual Rollouts & Risk Management",
        body: "Gradual rollouts (progressive delivery) release a feature to an increasing percentage of users over time. This is the safety net between experimentation and full launch.\n\nA typical rollout cadence:\n\n1. Internal dogfooding (0.01%) — Team members use the feature first. Catches obvious bugs and UX issues.\n\n2. Beta/Canary (1–5%) — Small set of real users, often opted-in or randomly selected. Monitor error rates, performance, and user behavior closely.\n\n3. Limited availability (10–25%) — Broader exposure. Run statistical analysis to detect metric movements. This is where A/B test results become reliable.\n\n4. General availability (50%+) — If metrics look healthy and guardrails are green, ramp to 50%, then 100%.\n\n5. Full launch (100%) — Remove the feature flag and make it the default experience.\n\nAt each stage, define explicit go/no-go criteria:\n• Go: Error rate < 0.5%, primary metric neutral or positive, all guardrails green\n• No-go: Any guardrail breached, error rate spike, negative user feedback pattern\n\nAutomatic rollback triggers add another safety layer. If error rates exceed a threshold, the system automatically disables the feature without human intervention.\n\nGradual rollouts change how PMs think about launches. Instead of 'big bang' releases with high risk, every launch is a controlled, reversible experiment.\n\nThe psychological shift is important too: teams are more willing to take bold product bets when they know the blast radius is limited and rollback is instant.",
        keyTakeaway: "Gradual rollouts progress from dogfooding → canary → limited → general availability, with explicit go/no-go criteria at each stage — this makes bold product bets safe by limiting blast radius."
      },
      {
        type: "mcq",
        prompt: "During a gradual rollout at 5% of users, you notice error rates are slightly elevated but your primary metric shows a strong positive result. What should you do?",
        options: [
          { text: "Investigate the error rate increase before expanding further — guardrail violations take precedence over primary metric improvements", correct: true, explanation: "Guardrail metrics exist precisely for this situation. A positive primary metric doesn't justify degraded reliability. Investigate and fix the errors before increasing the blast radius." },
          { text: "Immediately roll out to 100% to capitalize on the positive primary metric", correct: false, explanation: "Elevated error rates at 5% could become critical at 100%. The whole point of gradual rollouts is catching issues at low blast radius." },
          { text: "Roll back immediately and cancel the feature", correct: false, explanation: "If errors are only 'slightly elevated,' investigation is warranted before cancellation. The feature may have merit — you just need to fix the errors." },
          { text: "Increase to 50% to see if the error rate normalizes with more data", correct: false, explanation: "Expanding a rollout to diagnose an error is backwards — you're increasing risk to gather information you could get through investigation at the current level." }
        ]
      },
      {
        type: "teach",
        title: "Novelty Effect & Simpson's Paradox",
        body: "Two statistical traps that can invalidate your experiment results: the Novelty Effect and Simpson's Paradox.\n\nThe Novelty Effect occurs when users engage more with a new feature simply because it's new, not because it's better. Engagement spikes initially, then regresses to a lower level as the novelty wears off.\n\nHow to detect it:\n• Run experiments for longer durations (3–4 weeks instead of 1–2)\n• Segment by new vs. returning users in the treatment group\n• Plot the treatment effect over time — if it declines steadily, novelty is likely inflating results\n• Compare cohorts: users who first saw the variant in week 1 vs. week 2\n\nThe inverse — the Change Aversion effect — also exists. Users initially resist change, producing artificially negative results that improve as they adapt.\n\nSimpson's Paradox occurs when a trend that appears in overall data reverses when the data is split into subgroups.\n\nClassic example:\n• Overall: Treatment B has higher conversion than Treatment A\n• Mobile users: Treatment A has higher conversion\n• Desktop users: Treatment A has higher conversion\n\nHow is this possible? If Treatment B was disproportionately shown to mobile users (who convert at higher baseline rates), the overall number favors B even though A is better for every segment.\n\nSimpson's Paradox arises from uneven group composition. The fix is to ensure balanced randomization across key segments and always segment your analysis by platform, geography, user type, and other important dimensions.\n\nBoth traps share a lesson: surface-level experiment results can be deeply misleading. Always dig one layer deeper.",
        keyTakeaway: "The Novelty Effect inflates early results because users engage with change itself, while Simpson's Paradox reverses conclusions when subgroups have uneven composition — always segment your analysis and run tests long enough."
      }
    ]
  }
];
