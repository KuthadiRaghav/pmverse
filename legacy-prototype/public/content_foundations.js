const FOUNDATIONS_CONTENT = [
  {
    id: "agile",
    title: "Agile & Scrum",
    locked: false,
    lessons: [
      {
        type: "teach",
        title: "The Agile Manifesto",
        body: "Agile is a mindset born from the 2001 Agile Manifesto, signed by 17 software practitioners who were frustrated with heavyweight, documentation-driven processes.\n\nThe manifesto declares four core values:\n\n1. **Individuals and interactions** over processes and tools\n2. **Working software** over comprehensive documentation\n3. **Customer collaboration** over contract negotiation\n4. **Responding to change** over following a plan\n\nImportantly, the items on the right still have value — but the items on the left are valued MORE.\n\nBehind these values are 12 principles, including:\n• Deliver working software frequently (weeks, not months)\n• Welcome changing requirements, even late in development\n• Business people and developers must work together daily\n• Build projects around motivated individuals and trust them\n• The best architectures and designs emerge from self-organizing teams\n• At regular intervals, the team reflects and adjusts\n\nAgile is NOT a specific methodology — it's an umbrella philosophy. Scrum, Kanban, XP, and others are frameworks that implement Agile principles.",
        keyTakeaway: "Agile is a mindset prioritizing individuals, working software, collaboration, and adaptability — Scrum and Kanban are frameworks that implement it."
      },
      {
        type: "mcq",
        prompt: "Which of the following is a core value of the Agile Manifesto?",
        options: [
          {
            text: "Comprehensive documentation over working software",
            correct: false,
            explanation: "This is the reverse of an Agile value. The manifesto values working software OVER comprehensive documentation."
          },
          {
            text: "Responding to change over following a plan",
            correct: true,
            explanation: "Correct! This is one of the four core values. Agile teams embrace change as a competitive advantage rather than rigidly sticking to an upfront plan."
          },
          {
            text: "Contract negotiation over customer collaboration",
            correct: false,
            explanation: "This is backwards. Agile values customer collaboration OVER contract negotiation, emphasizing ongoing partnership rather than rigid agreements."
          },
          {
            text: "Processes and tools over individuals and interactions",
            correct: false,
            explanation: "This is the opposite of an Agile value. The manifesto prioritizes individuals and interactions OVER processes and tools."
          }
        ]
      },
      {
        type: "teach",
        title: "Scrum Roles: The Three Pillars",
        body: "Scrum defines exactly three roles — no more, no less. Each has distinct responsibilities and boundaries:\n\n**Product Owner (PO)**\n• Owns the Product Backlog and is the single source of truth for what to build\n• Prioritizes items based on business value, user needs, and stakeholder input\n• Writes or refines User Stories and acceptance criteria\n• Says YES or NO to whether work meets the Definition of Done\n• Represents the voice of the customer to the team\n\n**Scrum Master (SM)**\n• Serves the team as a servant-leader, NOT a project manager\n• Facilitates Scrum ceremonies and removes impediments\n• Coaches the team on Agile practices and self-organization\n• Shields the team from external distractions and scope creep\n• Helps the organization adopt Scrum effectively\n\n**Development Team**\n• Cross-functional group of 3-9 professionals who do the actual work\n• Self-organizing — they decide HOW to accomplish the sprint goal\n• No sub-titles (no 'lead developer' or 'senior tester') within Scrum\n• Collectively accountable for delivering a potentially shippable increment every sprint\n\nKey insight: The PO decides WHAT to build, the Dev Team decides HOW to build it, and the Scrum Master ensures the process works smoothly.",
        keyTakeaway: "Scrum has three roles: Product Owner (what to build), Development Team (how to build), and Scrum Master (process guardian and servant-leader)."
      },
      {
        type: "mcq",
        prompt: "A stakeholder asks the development team to add a feature mid-sprint. Who should they go to first?",
        options: [
          {
            text: "The Scrum Master, who can add it to the current sprint",
            correct: false,
            explanation: "The Scrum Master facilitates the process but doesn't own the backlog or prioritization. They would redirect this request to the Product Owner."
          },
          {
            text: "The Development Team lead, who can evaluate feasibility",
            correct: false,
            explanation: "In Scrum, there are no titles or hierarchy within the Dev Team. More importantly, backlog prioritization is the Product Owner's responsibility."
          },
          {
            text: "The Product Owner, who manages the Product Backlog",
            correct: true,
            explanation: "Correct! The Product Owner is the single authority on what goes into the backlog and how it's prioritized. They'll decide whether this feature warrants disrupting the current sprint or should be added to the backlog for a future sprint."
          },
          {
            text: "The entire team during the next standup",
            correct: false,
            explanation: "Standups are for the Dev Team to sync on progress, not for stakeholders to introduce new requirements. The proper channel is through the Product Owner."
          }
        ]
      },
      {
        type: "teach",
        title: "Scrum Ceremonies: The Rhythm of a Sprint",
        body: "Scrum operates in fixed-length iterations called Sprints (typically 1-4 weeks). Each sprint has four formal ceremonies:\n\n**1. Sprint Planning** (Start of sprint)\n• Timebox: Up to 8 hours for a 4-week sprint\n• The team selects items from the Product Backlog and commits to a Sprint Goal\n• Stories are broken into tasks and estimated\n• Output: Sprint Backlog (selected items + plan for delivering them)\n\n**2. Daily Standup / Daily Scrum** (Every day)\n• Timebox: 15 minutes MAX\n• Each team member answers three questions:\n  — What did I do yesterday?\n  — What will I do today?\n  — Are there any blockers?\n• It's a sync meeting, NOT a status report to management\n\n**3. Sprint Review** (End of sprint)\n• Timebox: Up to 4 hours for a 4-week sprint\n• The team DEMOS working software to stakeholders\n• Stakeholders give feedback that may influence the Product Backlog\n• It's about WHAT was built\n\n**4. Sprint Retrospective** (After the review)\n• Timebox: Up to 3 hours for a 4-week sprint\n• The team reflects: What went well? What didn't? What can improve?\n• Produces actionable improvement items for the next sprint\n• It's about HOW the team worked together\n\nRemember: Review = inspect the product. Retro = inspect the process.",
        keyTakeaway: "Scrum has four ceremonies: Sprint Planning (commit to work), Daily Standup (sync), Sprint Review (demo the product), and Retrospective (improve the process)."
      },
      {
        type: "mcq",
        prompt: "What is the primary purpose of a Sprint Retrospective?",
        options: [
          {
            text: "To demo completed features to stakeholders",
            correct: false,
            explanation: "That's the Sprint Review. The Review focuses on WHAT was built and gathers stakeholder feedback on the product increment."
          },
          {
            text: "To plan the work for the next sprint",
            correct: false,
            explanation: "That's Sprint Planning. Planning happens at the start of each sprint to select backlog items and create the sprint backlog."
          },
          {
            text: "To reflect on the team's process and identify improvements",
            correct: true,
            explanation: "Correct! The Retrospective is about inspecting HOW the team worked — what went well, what didn't, and what actionable changes to make. It's the engine of continuous improvement in Scrum."
          },
          {
            text: "To update the Product Backlog with new requirements",
            correct: false,
            explanation: "Backlog refinement is an ongoing activity owned by the Product Owner. The Retro focuses on team process, not product requirements."
          }
        ]
      },
      {
        type: "teach",
        title: "User Stories & Definition of Done",
        body: "**User Stories** are the primary way Agile teams capture requirements. They follow a specific format:\n\n\"As a [type of user], I want [an action], so that [a benefit].\"\n\nExamples:\n• As a shopper, I want to filter products by price, so that I can find items within my budget.\n• As an admin, I want to export user data as CSV, so that I can analyze it in spreadsheets.\n\nGood user stories follow the INVEST criteria:\n• **I**ndependent — can be developed in any order\n• **N**egotiable — details are discussed, not dictated\n• **V**aluable — delivers value to the user or business\n• **E**stimable — small enough to estimate with reasonable confidence\n• **S**mall — can be completed within a single sprint\n• **T**estable — has clear acceptance criteria\n\n**Definition of Done (DoD)** is the team's shared agreement on what 'complete' means. A typical DoD includes:\n• Code written and peer-reviewed\n• Unit tests written and passing\n• Integration tests passing\n• Documentation updated\n• Deployed to staging environment\n• Product Owner has accepted the story\n\nThe DoD prevents the 'it works on my machine' problem and ensures quality is consistent.",
        keyTakeaway: "User Stories capture requirements in 'As a... I want... So that...' format, while the Definition of Done ensures every team member agrees on what 'complete' means."
      },
      {
        type: "mcq",
        prompt: "Which of the following is the BEST example of a well-written User Story?",
        options: [
          {
            text: "Implement the search API endpoint with Elasticsearch",
            correct: false,
            explanation: "This is a technical task, not a User Story. It specifies implementation details (Elasticsearch) and lacks the user perspective, desired action, and business benefit."
          },
          {
            text: "As a user, I want the system to be fast",
            correct: false,
            explanation: "This violates the INVEST criteria — it's not Testable (what does 'fast' mean?) and not Small (performance is a broad concern). Good stories have specific, measurable acceptance criteria."
          },
          {
            text: "As a hiring manager, I want to schedule interviews from the candidate profile, so that I can streamline my recruitment workflow",
            correct: true,
            explanation: "Correct! This follows the format perfectly: specific user role (hiring manager), clear action (schedule interviews from candidate profile), and tangible benefit (streamline recruitment workflow). It's testable, small, and valuable."
          },
          {
            text: "The login page should look better",
            correct: false,
            explanation: "This is vague, not in User Story format, and fails the INVEST criteria — it's not Testable ('better' is subjective), not Estimable, and doesn't articulate user value."
          }
        ]
      },
      {
        type: "teach",
        title: "Estimation: Story Points & Velocity",
        body: "Agile teams estimate effort using **Story Points** rather than hours. Story points measure relative complexity, effort, and uncertainty.\n\n**How Story Points Work:**\n• Teams use the Fibonacci sequence: 1, 2, 3, 5, 8, 13, 21\n• A '1' is the simplest possible story. Other stories are estimated RELATIVE to it.\n• A '5' isn't five times as hard as a '1' — it's relatively more complex\n• Stories above 13 should be broken down (they're too uncertain)\n\n**Common Estimation Techniques:**\n• **Planning Poker**: Each team member privately picks a card, then all reveal simultaneously. Differences are discussed until consensus.\n• **T-Shirt Sizing**: Quick estimation using S, M, L, XL categories, later mapped to points.\n\n**Velocity** is the team's average story points completed per sprint.\n• Calculate by averaging the last 3-5 sprints\n• Use velocity to forecast: 'At 30 points/sprint, our 90-point backlog will take ~3 sprints'\n• Velocity is a TEAM metric, never used to compare individuals\n• New teams need 3-4 sprints to establish a reliable velocity\n\n**Important:** Velocity is descriptive, not prescriptive. Managers should NEVER pressure teams to increase velocity — that just leads to point inflation.",
        keyTakeaway: "Story Points measure relative complexity using Fibonacci numbers, and Velocity (average points per sprint) helps teams forecast delivery — never use it to compare teams or pressure performance."
      },
      {
        type: "mcq",
        prompt: "A team's velocity over the last four sprints was 24, 28, 22, and 26. They have 75 story points remaining in the backlog. What's the best estimate for how many sprints are needed?",
        options: [
          {
            text: "2 sprints",
            correct: false,
            explanation: "Average velocity is (24+28+22+26)/4 = 25 points/sprint. 75 ÷ 25 = 3 sprints. Two sprints would only cover about 50 points."
          },
          {
            text: "3 sprints",
            correct: true,
            explanation: "Correct! Average velocity = (24+28+22+26)/4 = 25 points per sprint. 75 remaining points ÷ 25 velocity = 3 sprints. This is a forecast, not a guarantee — new stories or changing priorities could affect the actual timeline."
          },
          {
            text: "4 sprints",
            correct: false,
            explanation: "With an average velocity of 25 points/sprint, 75 points would take 3 sprints (75÷25=3). Four sprints overestimates by one sprint."
          },
          {
            text: "It's impossible to estimate from this data",
            correct: false,
            explanation: "While estimates are never perfect, 4 sprints of data is sufficient to calculate a meaningful average velocity and make a reasonable forecast."
          }
        ]
      },
      {
        type: "teach",
        title: "Product Backlog vs Sprint Backlog",
        body: "Scrum maintains two distinct backlogs, and understanding the difference is critical:\n\n**Product Backlog**\n• A living, ordered list of EVERYTHING the product might need\n• Owned and prioritized by the Product Owner\n• Contains user stories, bugs, technical debt, spikes, and improvements\n• Constantly refined — items near the top are detailed, items at the bottom are vague\n• Never 'complete' — it evolves as long as the product exists\n• Only ONE Product Backlog per product (even with multiple teams)\n\n**Sprint Backlog**\n• A subset of the Product Backlog selected for the current sprint\n• Owned by the Development Team\n• Includes the selected stories PLUS the team's plan for delivering them (tasks)\n• Fixed during the sprint — no new items added without the team's consent\n• Includes a Sprint Goal that gives coherence to the selected items\n\n**Backlog Refinement (Grooming)**\n• An ongoing activity (not a ceremony) where the team:\n  — Adds detail and acceptance criteria to stories\n  — Estimates stories using story points\n  — Splits large stories into smaller ones\n  — Re-prioritizes based on new information\n• Should consume no more than 10% of the team's capacity\n\nThink of it this way: the Product Backlog is the 'wish list,' and the Sprint Backlog is the 'commitment list' for the next 1-4 weeks.",
        keyTakeaway: "The Product Backlog is the PO's evolving master list of all work; the Sprint Backlog is the Dev Team's committed plan for a single sprint — selected from the top of the Product Backlog."
      },
      {
        type: "mcq",
        prompt: "During a sprint, a critical production bug is discovered. What should happen?",
        options: [
          {
            text: "Add it directly to the Sprint Backlog — bugs always take priority",
            correct: false,
            explanation: "Even critical bugs shouldn't be unilaterally added. The Sprint Backlog belongs to the Dev Team, and changes require negotiation — possibly removing another item to maintain the sprint's capacity."
          },
          {
            text: "Wait until the next Sprint Planning to address it",
            correct: false,
            explanation: "For a critical production bug, waiting could cause significant user impact. While sprint integrity matters, the PO and team need to evaluate urgency and potentially adjust the current sprint."
          },
          {
            text: "The Product Owner and team negotiate — they may swap it in for another item or abort the sprint if necessary",
            correct: true,
            explanation: "Correct! The PO evaluates urgency while the team assesses impact on the sprint. They might swap a lower-priority item out to make room, or in extreme cases, the PO can cancel the sprint entirely and re-plan."
          },
          {
            text: "The Scrum Master decides whether to include it based on team capacity",
            correct: false,
            explanation: "The Scrum Master doesn't make prioritization decisions — that's the Product Owner's domain. The SM facilitates the conversation but doesn't have authority over what work gets done."
          }
        ]
      }
    ]
  },
  {
    id: "kanban",
    title: "Kanban",
    locked: false,
    lessons: [
      {
        type: "teach",
        title: "What is Kanban?",
        body: "Kanban (看板) is a Japanese word meaning 'visual signal' or 'card.' It originated at Toyota in the 1940s as a scheduling system for just-in-time manufacturing and was adapted for software development in the 2000s by David Anderson.\n\nUnlike Scrum, Kanban is NOT a framework — it's a METHOD for managing and improving work. Its core philosophy is:\n\n**Start with what you do now.**\nKanban doesn't prescribe roles, ceremonies, or time-boxes. Instead, it overlays on your existing process and helps you improve it incrementally.\n\n**The Six Core Practices of Kanban:**\n1. **Visualize the workflow** — Make all work visible on a board\n2. **Limit Work in Progress (WIP)** — Cap how many items are active at each stage\n3. **Manage flow** — Monitor and optimize how work moves through the system\n4. **Make policies explicit** — Document rules for how work enters, moves, and exits\n5. **Implement feedback loops** — Regular reviews and metrics-driven improvements\n6. **Improve collaboratively, evolve experimentally** — Small, incremental changes\n\nKanban is especially popular for:\n• Operations and support teams with unpredictable work\n• Teams doing continuous delivery\n• Teams transitioning from traditional to Agile approaches\n• Any team that wants to optimize flow without adopting a prescribed framework",
        keyTakeaway: "Kanban is a visual method for managing work that focuses on limiting work-in-progress and optimizing flow — it overlays your existing process rather than replacing it."
      },
      {
        type: "mcq",
        prompt: "What is the fundamental difference between Kanban and Scrum?",
        options: [
          {
            text: "Kanban uses a board; Scrum doesn't",
            correct: false,
            explanation: "Both Kanban and Scrum teams commonly use boards. Scrum boards (task boards) visualize sprint work. The board is a tool, not the differentiator."
          },
          {
            text: "Kanban is a continuous flow method; Scrum uses fixed-length iterations (sprints)",
            correct: true,
            explanation: "Correct! This is the core structural difference. Kanban has no prescribed time-boxes — work flows continuously. Scrum organizes work into fixed sprints with planning, review, and retro ceremonies built around each cycle."
          },
          {
            text: "Kanban is for software teams; Scrum is for business teams",
            correct: false,
            explanation: "Both methods are used across industries including software, marketing, HR, and operations. Neither is limited to a specific type of team."
          },
          {
            text: "Kanban doesn't allow estimation; Scrum requires it",
            correct: false,
            explanation: "Kanban doesn't prohibit estimation — many Kanban teams do estimate. And while Scrum commonly uses story points, the Scrum Guide doesn't mandate a specific estimation technique."
          }
        ]
      },
      {
        type: "teach",
        title: "Kanban Board Structure",
        body: "A Kanban board is a visual representation of your workflow. Each column represents a stage in your process, and cards move left to right as work progresses.\n\n**Basic Board Structure:**\n\n| Backlog | To Do | In Progress | Code Review | Testing | Done |\n|---------|-------|-------------|-------------|---------|------|\n| Card 1  | Card 3| Card 5      | Card 7      | Card 8  | Card 9|\n| Card 2  | Card 4| Card 6      |             |         | Card 10|\n\n**Key Elements of a Card:**\n• Title and description of the work item\n• Assignee (who's working on it)\n• Priority or class of service (expedite, standard, etc.)\n• Due date or SLA deadline\n• Blockers (visually flagged, often in red)\n• Type tag (feature, bug, chore, spike)\n\n**Column Design Principles:**\n• Columns should map to your ACTUAL workflow stages, not an ideal process\n• Each column can be split into 'Doing' and 'Done' sub-columns to make handoffs visible\n• A 'Blocked' lane (horizontal swimlane) highlights stalled items\n• Some boards use swimlanes to separate work by team, priority, or project\n\n**The 'Done' column** should reflect genuinely completed work (deployed, accepted by user) — not just 'code complete.' This keeps the board honest about true throughput.",
        keyTakeaway: "A Kanban board maps your real workflow into visible columns, with cards representing work items that flow left-to-right — making bottlenecks and progress instantly visible to everyone."
      },
      {
        type: "teach",
        title: "WIP Limits: The Heart of Kanban",
        body: "**Work in Progress (WIP) Limits** are the single most important Kanban practice. A WIP limit caps the number of items allowed in a column at any time.\n\n**Why WIP Limits Matter:**\n• Multitasking is a productivity killer — context switching costs 20-40% of productive time\n• Without WIP limits, teams start many items but finish few (high lead time)\n• WIP limits force teams to FINISH work before STARTING new work\n• They expose bottlenecks by creating visible queues\n\n**How to Set WIP Limits:**\n• Start with: WIP limit = number of people working in that stage + 1 buffer\n• Example: 3 developers → In Progress WIP limit of 4\n• Adjust based on observation — too high means no flow improvement; too low means idle time\n• You want a slight constraint — enough to feel it, not enough to constantly block\n\n**What Happens When a Column Hits Its WIP Limit:**\n• NO new work enters that column\n• Team members from that stage help clear bottlenecks downstream\n• This encourages swarming — multiple people finishing one item instead of everyone starting new ones\n\n**The Key Insight:** Limiting WIP paradoxically INCREASES throughput. By focusing on fewer items, you reduce context switching, find bugs faster, deliver to customers sooner, and get feedback earlier.\n\nLittle's Law proves this mathematically:\nLead Time = WIP ÷ Throughput\n\nReduce WIP → Reduce Lead Time (with constant throughput).",
        keyTakeaway: "WIP limits cap how many items can be in each stage — they force the team to finish before starting, reduce context switching, expose bottlenecks, and paradoxically increase throughput."
      },
      {
        type: "mcq",
        prompt: "A Kanban board's 'Testing' column has a WIP limit of 3, and there are already 3 items there. A developer just finished coding a new feature. What should they do?",
        options: [
          {
            text: "Move it to Testing anyway — their work is done",
            correct: false,
            explanation: "Violating WIP limits defeats the purpose of Kanban. The limit exists to prevent bottlenecks from growing and to force the team to address flow problems."
          },
          {
            text: "Help the testing team clear one of their items, then move the new feature in",
            correct: true,
            explanation: "Correct! This is exactly how Kanban is designed to work. When a downstream column is at capacity, upstream team members should 'swarm' — help finish existing work before adding new items. This improves flow and builds cross-functional skills."
          },
          {
            text: "Add it to a buffer column between Dev and Testing",
            correct: false,
            explanation: "Adding buffer columns is a common anti-pattern that hides bottlenecks rather than solving them. The pain of hitting the WIP limit is the signal that the team needs to address flow issues."
          },
          {
            text: "Raise the WIP limit to 4 to accommodate the new item",
            correct: false,
            explanation: "Increasing WIP limits every time they're hit removes all the benefits. The discomfort of hitting a limit is a feature, not a bug — it surfaces systemic problems that need solving."
          }
        ]
      },
      {
        type: "teach",
        title: "Pull System vs Push System",
        body: "Kanban uses a **Pull System**, which is fundamentally different from the traditional Push System used in most organizations.\n\n**Push System (Traditional):**\n• Work is assigned to people by a manager or project plan\n• Each stage pushes completed work to the next stage regardless of capacity\n• Creates inventory pile-ups and bottlenecks\n• Teams feel overwhelmed because work keeps arriving\n• Example: A PM assigns 10 features to the dev team with a deadline\n\n**Pull System (Kanban):**\n• Workers PULL new items only when they have capacity\n• Work moves to the next stage only when that stage has room (under WIP limit)\n• Naturally prevents overloading and bottlenecks\n• Team members choose work, increasing ownership and engagement\n• Example: A developer finishes a feature and pulls the next highest-priority item from 'To Do'\n\n**Why Pull Systems Work Better:**\n• They respect actual team capacity rather than assumed capacity\n• They create a smooth, sustainable flow of work\n• They reduce lead time because items don't sit waiting in queues\n• They improve quality because workers aren't rushing through overloaded stages\n\n**The Pull Signal:**\nIn manufacturing, Toyota used physical cards (kanban cards) as pull signals. In software, the pull signal is simply an open slot in the next column — visible on the Kanban board.\n\nA simple test: if someone asks 'What should I work on next?' and the answer is 'pull the top item from the ready column,' you have a pull system.",
        keyTakeaway: "In a Pull system, workers take on new work when they have capacity (respecting WIP limits), unlike Push systems where work is assigned regardless of capacity — this prevents overload and bottlenecks."
      },
      {
        type: "mcq",
        prompt: "Which of the following best describes a 'pull system' in Kanban?",
        options: [
          {
            text: "The team lead assigns the most urgent tasks to available developers",
            correct: false,
            explanation: "This is a Push system — a manager is pushing work to the team. In a pull system, the worker decides when to take new work, not the manager."
          },
          {
            text: "Stakeholders pull features from the backlog directly into development",
            correct: false,
            explanation: "Stakeholders don't bypass the workflow. In Kanban, work enters the system through the backlog and is pulled through stages by the team members doing the work."
          },
          {
            text: "Team members take the next highest-priority item only when they have capacity",
            correct: true,
            explanation: "Correct! A pull system means workers pull work when they're ready, governed by WIP limits. This respects actual capacity and prevents overloading any stage of the workflow."
          },
          {
            text: "Automated pipelines pull code from version control into production",
            correct: false,
            explanation: "While CI/CD pipelines do 'pull' code, this describes a deployment mechanism, not the Kanban pull system concept. Kanban's pull system is about how humans manage workflow."
          }
        ]
      },
      {
        type: "teach",
        title: "Lead Time, Cycle Time & Flow Metrics",
        body: "Kanban teams optimize delivery speed using two critical flow metrics:\n\n**Lead Time:**\n• Measured from when a request is MADE to when it's DELIVERED\n• Includes wait time in the backlog before work begins\n• This is what the CUSTOMER cares about — how long from asking to receiving\n• Formula: Lead Time = Date Delivered − Date Requested\n\n**Cycle Time:**\n• Measured from when work BEGINS to when it's DELIVERED\n• Excludes backlog wait time — only the active working period\n• This is what the TEAM controls — how efficiently they process work\n• Formula: Cycle Time = Date Delivered − Date Work Started\n\n**The Relationship:**\nLead Time = Backlog Wait Time + Cycle Time\n\nA customer reports a bug on Monday → it enters the backlog → a developer starts on Wednesday → it's deployed Friday.\n• Lead Time = 4 days (Monday to Friday)\n• Cycle Time = 2 days (Wednesday to Friday)\n• Backlog Wait = 2 days (Monday to Wednesday)\n\n**Other Important Metrics:**\n• **Throughput**: Number of items completed per unit of time (e.g., 12 features/week)\n• **Work Item Age**: How long a currently in-progress item has been active (early warning for stale items)\n\n**Little's Law** ties them together:\nAvg. Lead Time = Avg. WIP ÷ Avg. Throughput\n\nThis means reducing WIP directly reduces lead time if throughput stays constant.",
        keyTakeaway: "Lead Time measures total customer wait (request to delivery), Cycle Time measures active working time (start to delivery) — reducing WIP reduces both, as proven by Little's Law."
      },
      {
        type: "mcq",
        prompt: "A feature request was submitted on June 1. Development started on June 5. It was deployed on June 9. What are the Lead Time and Cycle Time?",
        options: [
          {
            text: "Lead Time: 4 days, Cycle Time: 4 days",
            correct: false,
            explanation: "Lead Time is from request (June 1) to delivery (June 9) = 8 days. Cycle Time is from work started (June 5) to delivery (June 9) = 4 days. Lead Time includes the backlog wait."
          },
          {
            text: "Lead Time: 8 days, Cycle Time: 4 days",
            correct: true,
            explanation: "Correct! Lead Time = June 9 − June 1 = 8 days (the customer's experience). Cycle Time = June 9 − June 5 = 4 days (the team's active working time). The 4-day difference is backlog wait time."
          },
          {
            text: "Lead Time: 8 days, Cycle Time: 8 days",
            correct: false,
            explanation: "Cycle Time only counts from when work BEGINS, not from when the request was submitted. Work started June 5, so Cycle Time is June 9 − June 5 = 4 days."
          },
          {
            text: "Lead Time: 4 days, Cycle Time: 8 days",
            correct: false,
            explanation: "This reverses the metrics. Lead Time is always ≥ Cycle Time because Lead Time includes the backlog wait time that Cycle Time excludes."
          }
        ]
      },
      {
        type: "teach",
        title: "Cumulative Flow Diagrams (CFDs)",
        body: "A **Cumulative Flow Diagram (CFD)** is Kanban's most powerful visualization tool. It's a stacked area chart showing how many items are in each workflow stage over time.\n\n**How to Read a CFD:**\n• The X-axis is time (days/weeks)\n• The Y-axis is the number of work items\n• Each colored band represents a workflow stage (Backlog, In Progress, Testing, Done)\n• The bands stack on top of each other, with 'Done' at the bottom\n\n**What It Tells You:**\n\n1. **Throughput**: The slope of the 'Done' band — steeper means faster delivery\n2. **WIP**: The vertical distance between 'In Progress' and 'Done' bands — wider means more WIP\n3. **Lead Time**: The horizontal distance between when an item enters the top band and when it reaches 'Done'\n4. **Bottlenecks**: If a band is widening, work is piling up at that stage\n5. **Stability**: Parallel, evenly-spaced bands indicate smooth, predictable flow\n\n**Warning Signs on a CFD:**\n• A band rapidly widening → that stage is a bottleneck\n• 'Done' band flattening → delivery has stalled\n• Bands converging → upcoming starvation (nothing in the pipeline)\n• Large gap between top and bottom → high WIP and long lead times\n\nCFDs are retrospective tools — they show trends over weeks or months. Use them in regular reviews to make data-driven process improvements.",
        keyTakeaway: "Cumulative Flow Diagrams visualize work distribution across stages over time — widening bands signal bottlenecks, and the horizontal distance between bands reveals lead time."
      },
      {
        type: "teach",
        title: "Kanban vs Scrum: Choosing the Right Approach",
        body: "Both Kanban and Scrum implement Agile principles, but they suit different contexts:\n\n**Use Scrum When:**\n• You're building a new product with defined milestones\n• The team is new to Agile and needs structure\n• Stakeholders expect regular, predictable deliveries\n• Work can be batched into coherent sprint goals\n• You need dedicated roles (PO, SM) to drive change\n\n**Use Kanban When:**\n• Work arrives unpredictably (support tickets, ops tasks)\n• You need continuous delivery without waiting for sprint boundaries\n• The team is already performing well and needs optimization, not structure\n• You can't commit to fixed-length iterations (maintenance teams)\n• You want to improve without disrupting your current process\n\n**Key Differences:**\n\n| Aspect | Scrum | Kanban |\n|--------|-------|--------|\n| Iterations | Fixed sprints (1-4 weeks) | Continuous flow |\n| Roles | PO, SM, Dev Team | No prescribed roles |\n| Change | No mid-sprint changes | Priorities can change anytime |\n| Metrics | Velocity (points/sprint) | Lead time, cycle time |\n| Planning | Sprint Planning event | Continuous replenishment |\n| WIP limits | Implicit (sprint capacity) | Explicit per column |\n\n**Scrumban:** Many teams blend both — using Scrum's sprint cadence with Kanban's WIP limits and flow metrics. This hybrid is called Scrumban and is increasingly popular.",
        keyTakeaway: "Choose Scrum for structured product development with predictable cadence; choose Kanban for continuous flow with unpredictable work — or blend both with Scrumban."
      },
      {
        type: "mcq",
        prompt: "A DevOps team handles production incidents, deployment requests, and infrastructure tasks that arrive unpredictably throughout the day. Which approach is MOST suitable?",
        options: [
          {
            text: "Scrum with 1-week sprints to stay agile",
            correct: false,
            explanation: "Even short sprints impose a planning-review-retro cycle that doesn't fit unpredictable, interrupt-driven work. The team can't meaningfully plan a sprint when they don't know what incidents will arrive."
          },
          {
            text: "Kanban with WIP limits and priority-based pull",
            correct: true,
            explanation: "Correct! Kanban is ideal for interrupt-driven work where tasks arrive unpredictably. WIP limits prevent overload, the pull system lets the team manage flow, and there's no sprint boundary preventing urgent items from being addressed immediately."
          },
          {
            text: "Waterfall with detailed runbooks for each incident type",
            correct: false,
            explanation: "Waterfall is a sequential, phase-based approach unsuited for reactive operational work. Runbooks are useful but they're documentation, not a workflow management method."
          },
          {
            text: "No framework — just handle tasks as they come in",
            correct: false,
            explanation: "Without any structure, the team risks overload, invisible bottlenecks, and unpredictable delivery. Kanban provides lightweight structure (board + WIP limits) without the overhead of prescribed ceremonies."
          }
        ]
      }
    ]
  },
  {
    id: "sdlc",
    title: "SDLC",
    locked: false,
    lessons: [
      {
        type: "teach",
        title: "What is the SDLC?",
        body: "The **Software Development Life Cycle (SDLC)** is the structured process that teams follow to plan, create, test, and deploy software. It provides a framework for producing high-quality software in a predictable, efficient manner.\n\n**Core SDLC Phases (regardless of methodology):**\n\n1. **Planning & Requirements** — What problem are we solving? What does the user need?\n2. **Design** — How will we build it? Architecture, data models, UI wireframes\n3. **Implementation (Coding)** — Write the actual software\n4. **Testing** — Verify it works correctly and meets requirements\n5. **Deployment** — Release it to users\n6. **Maintenance** — Fix bugs, add features, keep it running\n\n**Why SDLC Matters for PMs:**\n• It frames your entire product timeline and resource planning\n• Different SDLC models drastically affect how you interact with engineering\n• Understanding where you are in the cycle helps you set stakeholder expectations\n• It determines when requirements can change and at what cost\n\n**Common SDLC Models:**\n• **Waterfall** — Sequential, phase-gated\n• **Agile** — Iterative, incremental\n• **V-Model** — Waterfall with parallel testing\n• **Spiral** — Risk-driven, iterative prototyping\n• **DevOps** — Continuous integration of development and operations\n\nEvery software product goes through these phases — the difference is HOW and in WHAT ORDER.",
        keyTakeaway: "The SDLC defines the phases every software product goes through — from planning to maintenance. The chosen SDLC model (Waterfall, Agile, etc.) determines how these phases are sequenced and repeated."
      },
      {
        type: "mcq",
        prompt: "Which SDLC phase is MOST concerned with defining 'what' the software should do rather than 'how' it should be built?",
        options: [
          {
            text: "Design",
            correct: false,
            explanation: "Design addresses HOW to build the solution — architecture, data models, and technical approaches. The 'what' has already been defined before design begins."
          },
          {
            text: "Implementation",
            correct: false,
            explanation: "Implementation is the coding phase where the team builds the software. It addresses 'how' at the most granular level — writing actual code."
          },
          {
            text: "Requirements & Planning",
            correct: true,
            explanation: "Correct! Requirements and Planning define WHAT the software should do — user needs, business goals, functional specs, and acceptance criteria. This is where the PM has the most influence."
          },
          {
            text: "Testing",
            correct: false,
            explanation: "Testing verifies that what was built meets the requirements. It's a validation phase, not a definition phase."
          }
        ]
      },
      {
        type: "teach",
        title: "Waterfall vs Agile: Two Philosophies",
        body: "**Waterfall Model:**\nInvented by Winston Royce in 1970, Waterfall is a linear, sequential approach where each phase must be completed before the next begins.\n\nRequirements → Design → Implementation → Testing → Deployment → Maintenance\n\n**Characteristics:**\n• Heavy upfront documentation and planning\n• Requirements are 'frozen' early — changes are expensive\n• Testing happens AFTER all coding is complete\n• The customer sees the product only at the end\n• Clear milestones and phase gates for management oversight\n\n**When Waterfall Works:**\n• Regulated industries (medical devices, aviation) requiring traceability\n• Fixed-price contracts with well-defined scope\n• Projects with stable, well-understood requirements\n• Hardware-software integration where rework is extremely costly\n\n**Agile Model:**\nAgile delivers software in small, iterative increments (sprints/iterations). Each increment includes planning, design, coding, and testing.\n\n**Characteristics:**\n• Requirements evolve throughout the project\n• Working software is delivered every 1-4 weeks\n• Continuous customer feedback shapes the product\n• Testing is integrated throughout, not a separate phase\n• Embraces change as a competitive advantage\n\n**The Fundamental Tradeoff:**\n• Waterfall offers PREDICTABILITY — you know exactly what you'll get (but not if users will want it)\n• Agile offers ADAPTABILITY — you discover what users want (but the final scope emerges over time)\n\nMost modern software teams use Agile, but Waterfall persists where regulatory compliance or contractual obligations demand upfront specification.",
        keyTakeaway: "Waterfall is sequential with frozen requirements and late testing; Agile is iterative with evolving requirements and continuous testing — choose based on how well you can predict requirements upfront."
      },
      {
        type: "mcq",
        prompt: "A hospital is building software for an MRI machine that must meet FDA regulatory requirements with full traceability. Which SDLC model is MOST appropriate?",
        options: [
          {
            text: "Agile with 2-week sprints for fast iteration",
            correct: false,
            explanation: "While Agile can be adapted for regulated environments (SAFe, for example), pure Agile's evolving requirements and informal documentation often don't meet FDA traceability requirements for medical devices."
          },
          {
            text: "Kanban for continuous delivery of features",
            correct: false,
            explanation: "Kanban's continuous flow model doesn't naturally produce the phase-gated documentation and formal verification records that FDA compliance requires for medical device software."
          },
          {
            text: "Waterfall or V-Model with formal phase gates and documentation",
            correct: true,
            explanation: "Correct! Medical device software under FDA regulation requires rigorous documentation, traceability from requirements to test cases, and formal phase reviews. Waterfall and V-Model provide this structure naturally."
          },
          {
            text: "No formal methodology — just ship and iterate based on user feedback",
            correct: false,
            explanation: "Medical device software requires regulatory approval before it can be used on patients. There's no 'ship and iterate' option — FDA Class II/III devices need pre-market clearance or approval."
          }
        ]
      },
      {
        type: "teach",
        title: "The V-Model: Testing at Every Level",
        body: "The **V-Model** (Verification and Validation Model) is an extension of Waterfall that emphasizes testing. It maps each development phase to a corresponding testing phase, forming a 'V' shape.\n\n**Left Side (Development/Verification):**\n1. Requirements Analysis → defines WHAT to build\n2. System Design → defines the architecture\n3. Module Design → defines individual components\n4. Coding → implements the components\n\n**Right Side (Testing/Validation):**\n4. Unit Testing ← validates individual components (maps to Module Design)\n5. Integration Testing ← validates component interactions (maps to System Design)\n6. System Testing ← validates the whole system (maps to Requirements)\n7. Acceptance Testing ← validates user/business needs (maps to Business Requirements)\n\n**Key V-Model Principles:**\n• Test planning begins in PARALLEL with each development phase, not after coding\n• Each left-side phase has a direct right-side testing counterpart\n• Defects are caught earlier because test cases are designed alongside requirements\n• It provides complete traceability: every requirement has a corresponding test\n\n**V-Model vs Waterfall:**\n• Waterfall treats testing as a single phase after coding\n• V-Model makes testing a PARALLEL activity that starts on day one\n• V-Model is still sequential — you can't iterate back easily\n• V-Model is better at catching defects early through early test design\n\nThe V-Model is common in aerospace, defense, automotive, and medical software where exhaustive testing and documentation are mandatory.",
        keyTakeaway: "The V-Model pairs each development phase with a corresponding testing phase — Unit, Integration, System, and Acceptance testing — ensuring test planning starts early, not after coding."
      },
      {
        type: "teach",
        title: "CI/CD Pipelines: From Code to Production",
        body: "**CI/CD** stands for Continuous Integration / Continuous Delivery (or Deployment). It automates the process of getting code changes from a developer's laptop to production.\n\n**Continuous Integration (CI):**\n• Developers merge code to the main branch frequently (at least daily)\n• Each merge triggers an automated build and test suite\n• Broken builds are fixed immediately — it's the team's top priority\n• Catches integration issues early when they're cheap to fix\n• Tools: GitHub Actions, Jenkins, CircleCI, GitLab CI\n\n**Continuous Delivery (CD):**\n• Every code change that passes CI is automatically deployable to production\n• Deployment requires a manual approval step (one-click deploy)\n• The product is ALWAYS in a releasable state\n• Release decisions become business decisions, not technical ones\n\n**Continuous Deployment (also CD):**\n• Takes it one step further — every passing change is automatically deployed to production\n• No manual approval required\n• Requires robust monitoring, feature flags, and rollback capability\n• Companies like Netflix and Amazon deploy thousands of times per day\n\n**A Typical CI/CD Pipeline:**\n1. Developer pushes code → triggers pipeline\n2. Build: Compile code, install dependencies\n3. Test: Run unit tests, integration tests, linting\n4. Security Scan: Check for vulnerabilities\n5. Stage: Deploy to staging environment\n6. Acceptance: Run end-to-end tests on staging\n7. Deploy: Release to production (manually or automatically)\n8. Monitor: Watch for errors, performance regression\n\n**Why PMs Should Care:**\nCI/CD directly affects how quickly you can ship features, fix bugs, and respond to user feedback. It's the technical backbone of Agile delivery.",
        keyTakeaway: "CI/CD automates the path from code to production: CI ensures code always integrates cleanly, Continuous Delivery makes it always deployable, and Continuous Deployment ships every change automatically."
      },
      {
        type: "mcq",
        prompt: "What is the key difference between Continuous Delivery and Continuous Deployment?",
        options: [
          {
            text: "Continuous Delivery includes automated testing; Continuous Deployment doesn't",
            correct: false,
            explanation: "Both require automated testing. In fact, Continuous Deployment requires MORE rigorous automated testing because there's no human gate before production."
          },
          {
            text: "Continuous Delivery requires manual approval to deploy; Continuous Deployment does not",
            correct: true,
            explanation: "Correct! In Continuous Delivery, the code is always deployable but a human decides when to release. In Continuous Deployment, every change that passes the pipeline goes straight to production automatically."
          },
          {
            text: "Continuous Deployment is only for small companies; Continuous Delivery is for enterprises",
            correct: false,
            explanation: "Netflix, Amazon, and Google all use Continuous Deployment at massive scale. Company size isn't the determining factor — it's the maturity of testing, monitoring, and rollback systems."
          },
          {
            text: "They are the same thing — the terms are interchangeable",
            correct: false,
            explanation: "They are distinctly different. Delivery means 'always ready to deploy' (manual trigger). Deployment means 'automatically deployed' (no manual trigger). This distinction has significant implications for release management."
          }
        ]
      },
      {
        type: "teach",
        title: "Technical Debt: The Hidden Cost",
        body: "**Technical Debt** is a metaphor coined by Ward Cunningham: just as financial debt accrues interest, shortcuts in code accrue maintenance costs over time.\n\n**Types of Technical Debt:**\n\n1. **Deliberate & Prudent** — 'We know this isn't ideal, but shipping now and refactoring later is the right business call.'\n2. **Deliberate & Reckless** — 'We don't have time for best practices.' (This is the dangerous kind)\n3. **Inadvertent & Prudent** — 'Now we've learned more, we realize a better approach exists.'\n4. **Inadvertent & Reckless** — 'We didn't know what we were doing.' (Often from junior teams)\n\n**Common Sources:**\n• Skipping tests to meet a deadline\n• Copy-pasting code instead of creating reusable components\n• Using outdated libraries or frameworks\n• Poor documentation (or none at all)\n• Hard-coded values and magic numbers\n• Monolithic architecture that should be decomposed\n\n**Why PMs Must Care:**\n• Tech debt slows feature development — what took 2 days now takes 2 weeks\n• It increases bug rates and system instability\n• It makes hiring harder — good engineers avoid codebases drowning in debt\n• It's invisible to stakeholders until it's too late\n\n**Managing Tech Debt as a PM:**\n• Allocate 15-20% of sprint capacity for ongoing tech debt reduction\n• Make tech debt visible in the backlog with clear business impact\n• Frame refactoring in business terms: 'Reducing page load time from 5s to 1s will decrease bounce rate by 30%'\n• Treat tech debt like financial debt — some is strategic, too much is crippling",
        keyTakeaway: "Technical debt is the cumulative cost of code shortcuts — PMs should allocate 15-20% of capacity for reduction and make it visible by framing it in business impact terms."
      },
      {
        type: "mcq",
        prompt: "Your engineering lead says: 'We need to spend two sprints refactoring the payment module before adding new features.' As a PM, what's the best response?",
        options: [
          {
            text: "Refuse — stakeholders are expecting new features and we can't afford to slow down",
            correct: false,
            explanation: "Ignoring tech debt is like ignoring financial debt — interest accumulates. If the payment module is fragile, adding features on top will be slower and riskier, eventually causing bigger delays."
          },
          {
            text: "Understand the business impact of the tech debt and negotiate a balanced approach — perhaps 50% refactoring + 50% features over the two sprints",
            correct: true,
            explanation: "Correct! A good PM quantifies the impact ('How much slower is feature development because of this?'), negotiates a balanced plan, and communicates transparently with stakeholders about why some capacity is going to foundational improvements."
          },
          {
            text: "Let engineering decide — it's a technical matter, not a product one",
            correct: false,
            explanation: "While the technical details are engineering's domain, the PM is responsible for balancing user needs, business goals, and technical health. Prioritization is a shared responsibility."
          },
          {
            text: "Agree immediately — engineers know best about code quality",
            correct: false,
            explanation: "Blindly agreeing without understanding the business tradeoff isn't good PM practice. The PM should understand the scope, negotiate the approach, and ensure stakeholders are informed."
          }
        ]
      },
      {
        type: "teach",
        title: "Code Reviews & QA Processes",
        body: "**Code Reviews** and **Quality Assurance (QA)** are the gatekeepers of software quality. As a PM, you won't write code, but understanding these processes helps you plan realistic timelines.\n\n**Code Reviews:**\n• Every code change is reviewed by at least one other developer before merging\n• Reviewers check for: correctness, readability, security, performance, and adherence to standards\n• Reviews typically take 30 minutes to 2 hours per pull request\n• They serve dual purposes: catching bugs AND spreading knowledge across the team\n\n**PM Implications of Code Reviews:**\n• Factor review time into estimates — a '3-day feature' is really 3 days coding + 1 day review + fix cycles\n• Large pull requests (500+ lines) are harder to review — encourage small, frequent merges\n• Review bottlenecks can stall the entire team if only 1-2 people are reviewers\n\n**QA Processes:**\n\n1. **Unit Testing** — Developers test individual functions/methods (automated)\n2. **Integration Testing** — Test how components work together (automated)\n3. **End-to-End (E2E) Testing** — Simulate real user workflows through the entire system (automated)\n4. **Manual QA / Exploratory Testing** — Human testers explore edge cases and usability\n5. **Regression Testing** — Verify that new changes didn't break existing features\n6. **Performance Testing** — Load testing, stress testing, latency benchmarks\n7. **Security Testing** — Penetration testing, vulnerability scanning\n\n**The Testing Pyramid:**\nMany unit tests (fast, cheap) → Fewer integration tests → Few E2E tests (slow, expensive)\n\nInverting this pyramid (lots of E2E, few unit tests) leads to slow, brittle test suites — a common anti-pattern called the 'ice cream cone.'",
        keyTakeaway: "Code reviews add 20-30% to development time but catch bugs early and spread knowledge. QA follows a testing pyramid: many fast unit tests at the base, few slow E2E tests at the top."
      },
      {
        type: "teach",
        title: "Release Management & Feature Flags",
        body: "**Release Management** is the process of planning, scheduling, and controlling software deployments. It bridges the gap between 'the code works' and 'users have it.'\n\n**Release Strategies:**\n\n1. **Big Bang Release** — Ship everything at once on a release date\n   • High risk, high coordination, long testing cycles\n   • Common in Waterfall and enterprise environments\n\n2. **Rolling Release** — Deploy to a subset of servers at a time\n   • Reduces risk — if something breaks, only a fraction of users are affected\n   • Easy to stop mid-rollout\n\n3. **Blue-Green Deployment** — Run two identical production environments\n   • Deploy to 'green' while 'blue' serves traffic, then swap\n   • Instant rollback by swapping back\n\n4. **Canary Release** — Deploy to a small percentage of users first\n   • Monitor metrics (errors, latency, conversions)\n   • Gradually increase traffic if everything looks good\n   • Named after the 'canary in a coal mine' concept\n\n**Feature Flags (Feature Toggles):**\nFeature flags decouple DEPLOYMENT from RELEASE. Code is deployed to production but hidden behind a toggle.\n\n**Benefits:**\n• Ship code anytime without exposing unfinished features\n• A/B test features with specific user segments\n• Instant 'kill switch' — disable a broken feature without redeploying\n• Gradual rollouts: 1% → 10% → 50% → 100% of users\n\n**PM Use Cases for Feature Flags:**\n• Beta test with select customers before general availability\n• Coordinate marketing launch independently from code deployment\n• Run experiments and measure impact before full rollout\n• Quickly disable a feature causing customer complaints\n\n**Warning:** Feature flags create complexity. Old, unused flags should be cleaned up regularly to avoid 'flag debt.'",
        keyTakeaway: "Feature flags separate deployment from release — code ships to production hidden behind toggles, enabling gradual rollouts, A/B testing, and instant kill switches without redeployment."
      },
      {
        type: "mcq",
        prompt: "Your team wants to test a new checkout flow with 5% of users before rolling it out to everyone. Which approach should you use?",
        options: [
          {
            text: "Blue-Green deployment — switch 5% of servers to the new version",
            correct: false,
            explanation: "Blue-Green deployments swap entire environments, not percentages of users. You'd need to route specific users to the new environment, which adds complexity. Feature flags are simpler for user-level targeting."
          },
          {
            text: "Feature flag with a percentage-based rollout targeting 5% of users",
            correct: true,
            explanation: "Correct! A feature flag lets you deploy the new checkout code to all servers but only expose it to 5% of users. You can monitor conversion rates and errors, then gradually increase the percentage or instantly disable it if problems arise."
          },
          {
            text: "Deploy to a staging environment and have 5% of the team test it",
            correct: false,
            explanation: "Internal testing on staging doesn't give you real user behavior data. The goal is to test with actual users in production to validate the feature's impact on real metrics like conversion rate."
          },
          {
            text: "Big Bang release with a rollback plan if things go wrong",
            correct: false,
            explanation: "A Big Bang release to 100% of users defeats the purpose of gradual testing. Rolling back an entire release is far more disruptive than simply toggling off a feature flag."
          }
        ]
      },
      {
        type: "mcq",
        prompt: "In the Testing Pyramid, which type of test should you have the MOST of?",
        options: [
          {
            text: "End-to-End (E2E) tests that simulate complete user workflows",
            correct: false,
            explanation: "E2E tests sit at the TOP of the pyramid — you should have the fewest of these. They're slow, expensive to maintain, and brittle. Over-relying on E2E tests creates the 'ice cream cone' anti-pattern."
          },
          {
            text: "Unit tests that verify individual functions and methods",
            correct: true,
            explanation: "Correct! Unit tests form the BASE of the Testing Pyramid. They're fast (milliseconds), cheap to write, easy to maintain, and give precise feedback on what's broken. A healthy codebase has thousands of unit tests."
          },
          {
            text: "Integration tests that check how components interact",
            correct: false,
            explanation: "Integration tests sit in the MIDDLE of the pyramid. You need a moderate number — more than E2E tests but fewer than unit tests. They verify that components work together correctly."
          },
          {
            text: "Manual exploratory tests performed by QA engineers",
            correct: false,
            explanation: "Manual testing is valuable for edge cases and usability but doesn't scale. It's not part of the automated Testing Pyramid and should complement — not replace — automated tests."
          }
        ]
      }
    ]
  }
];
