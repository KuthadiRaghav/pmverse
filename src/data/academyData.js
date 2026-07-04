import { FINANCE_SKILLS } from './academyFinance';

import { AI_ERA_DOMAINS } from './academyAIEra';
import { AI_CASE_STUDIES_DOMAIN } from './academyCaseStudies';

export const ACADEMY_DOMAINS = [
  AI_CASE_STUDIES_DOMAIN,
  ...AI_ERA_DOMAINS,
  {
    id: "foundations", title: "Product Foundations", icon: "🏗️",
    skills: [
  {
    id: "agile",
    title: "Agile & Scrum",
    locked: false,
    lessons: [
      {
        type: "video",
        title: "Introduction to Agile",
        description: "A quick 5-minute primer on the Agile mindset and how it compares to Waterfall.",
        url: "https://www.youtube.com/embed/Z9QbYZh1YSk",
        keyTakeaway: "Agile is iterative and focuses on delivering value quickly."
      },
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
]
  },
  {
    id: "discovery", title: "Product Discovery", icon: "🔎",
    skills: [
  // ──────────────────────────────────────────────────────────
  // SKILL 1 — Hypothesis Testing  (12 lessons)
  // ──────────────────────────────────────────────────────────
  {
    id: "hypothesis",
    title: "Hypothesis Testing",
    locked: false,
    lessons: [
      // Lesson 1 — Teach
      {
        type: "teach",
        title: "Why Hypotheses Matter in Product",
        body:
          "Most failed products don't fail because of bad engineering — they fail because teams build the wrong thing.\n\n" +
          "A hypothesis is a testable statement about reality. In product management it usually takes the form:\n\n" +
          "\"We believe that [doing X] for [audience Y] will result in [outcome Z]. We will know this is true when we see [measurable signal].\"\n\n" +
          "Hypotheses force clarity. They replace vague opinions ('users will love this feature') with something you can actually prove or disprove.\n\n" +
          "Without a hypothesis you're just shipping and hoping. With one, you're running an experiment — and every experiment, pass or fail, generates learning.",
        keyTakeaway:
          "A hypothesis turns an opinion into a testable statement, replacing hope with evidence-driven product development."
      },

      // Lesson 2 — Teach
      {
        type: "teach",
        title: "Null vs Alternative Hypothesis",
        body:
          "Every experiment has two competing statements:\n\n" +
          "• Null Hypothesis (H₀): The default assumption — no effect, no difference. Example: 'Changing the CTA color has no impact on sign-up rate.'\n\n" +
          "• Alternative Hypothesis (H₁): Your belief that something does change. Example: 'A green CTA will increase sign-ups by at least 5%.'\n\n" +
          "Your goal is to gather enough evidence to reject H₀ in favor of H₁. If you can't reject H₀, you haven't proven it true — you simply don't have enough evidence against it.\n\n" +
          "This framework matters because it protects you from confirmation bias. You don't start by trying to prove your idea is right — you start by assuming it has no effect and see whether the data disagrees.\n\n" +
          "In practice, PMs rarely write out formal H₀/H₁ statements, but the mental model is invaluable: always ask, 'What would the world look like if this change had zero impact?'",
        keyTakeaway:
          "The null hypothesis assumes no effect; your job is to collect enough evidence to reject it, not to confirm what you already believe."
      },

      // Lesson 3 — MCQ
      {
        type: "mcq",
        prompt:
          "Your team redesigns the onboarding flow and sign-up rates stay flat. A colleague says, 'The new design doesn't work.' Using hypothesis-testing language, what actually happened?",
        options: [
          {
            text: "The alternative hypothesis was proven false",
            correct: false,
            explanation:
              "You can never 'prove' a hypothesis false in classical testing — you simply fail to find evidence against the null."
          },
          {
            text: "We failed to reject the null hypothesis",
            correct: true,
            explanation:
              "Correct. Flat results mean the data didn't provide sufficient evidence to reject H₀. The redesign may still have an effect that wasn't detected — perhaps the sample was too small or the test duration too short."
          },
          {
            text: "The null hypothesis was confirmed true",
            correct: false,
            explanation:
              "Failing to reject H₀ is not the same as confirming it. Absence of evidence is not evidence of absence."
          },
          {
            text: "The experiment was invalid and should be discarded",
            correct: false,
            explanation:
              "A test with flat results can still be perfectly valid. It simply means the effect size, if any, wasn't large enough to detect."
          }
        ]
      },

      // Lesson 4 — Teach
      {
        type: "teach",
        title: "Painted Door Tests",
        body:
          "A Painted Door test (also called a 'fake door' test) is the fastest way to measure demand for a feature that doesn't exist yet.\n\n" +
          "How it works:\n" +
          "1. Add a button, menu item, or link for the proposed feature inside your live product.\n" +
          "2. When a user clicks it, show a message: 'Thanks for your interest! This feature is coming soon.'\n" +
          "3. Measure the click-through rate (CTR).\n\n" +
          "If 0.2% of users click, demand is low. If 8% click, you have a strong signal worth investing in.\n\n" +
          "Key benefits:\n" +
          "• Measures real behavior, not stated preferences.\n" +
          "• Takes hours to build, not weeks.\n" +
          "• Works on live traffic, so the signal is authentic.\n\n" +
          "Watch out for:\n" +
          "• Trust erosion — if you do this too often, users may feel tricked. Keep the 'coming soon' message friendly and honest.\n" +
          "• False negatives — a poorly worded label or bad placement can kill CTR regardless of actual demand.",
        keyTakeaway:
          "Painted Door tests let you gauge real user demand for a feature by measuring clicks on a placeholder — before writing a single line of feature code."
      },

      // Lesson 5 — Teach
      {
        type: "teach",
        title: "Wizard of Oz Tests",
        body:
          "In a Wizard of Oz test, users interact with what looks like a working product — but behind the scenes, a human is manually doing the work.\n\n" +
          "Classic example: Zappos founder Nick Swinmurn posted photos of shoes from local stores online. When someone ordered, he bought the shoes at full price and shipped them himself. Users thought they were buying from an e-commerce site; in reality, one person was the entire 'backend.'\n\n" +
          "When to use a Wizard of Oz test:\n" +
          "• The technical solution is expensive or uncertain.\n" +
          "• You need to test whether users want the outcome, not the mechanism.\n" +
          "• You can serve a small number of users manually without breaking.\n\n" +
          "Limitations:\n" +
          "• Doesn't scale — manual operations become painful fast.\n" +
          "• Tests desirability, not feasibility. You still need to figure out if it can be built.\n" +
          "• Ethical gray area if users don't know a human is behind the curtain.\n\n" +
          "The core insight: validate that users want the value before investing in the tech that delivers it.",
        keyTakeaway:
          "Wizard of Oz tests deliver a real user experience powered by humans behind the scenes, validating desirability before building the technology."
      },

      // Lesson 6 — MCQ
      {
        type: "mcq",
        prompt:
          "A startup wants to test whether busy professionals will pay for AI-generated meal plans. They build a landing page where users enter dietary preferences and receive a personalized plan by email — but a nutritionist actually writes each plan manually. What type of test is this?",
        options: [
          {
            text: "Painted Door test",
            correct: false,
            explanation:
              "A Painted Door test measures intent (clicks) but doesn't deliver the actual value. Here, users receive a real meal plan."
          },
          {
            text: "Wizard of Oz test",
            correct: true,
            explanation:
              "Exactly. The user experience appears automated (AI-generated), but a human is secretly fulfilling the service. This validates demand and willingness to pay before investing in the AI engine."
          },
          {
            text: "A/B test",
            correct: false,
            explanation:
              "An A/B test compares two variants. This scenario has a single experience with a hidden manual process — a classic Wizard of Oz."
          },
          {
            text: "Concierge MVP",
            correct: false,
            explanation:
              "Close — but in a Concierge MVP the user knows a human is helping them. In Wizard of Oz, the manual process is hidden behind what looks like a product."
          }
        ]
      },

      // Lesson 7 — Teach
      {
        type: "teach",
        title: "Concierge MVPs",
        body:
          "A Concierge MVP is similar to Wizard of Oz — you manually deliver the service — but with one key difference: the user knows a human is doing the work.\n\n" +
          "Example: Before building its recommendation algorithm, a personal finance startup might pair each early user with a human advisor who manually reviews spending and sends weekly tips via email. Users understand they're getting human help; the startup learns what advice actually moves the needle.\n\n" +
          "Why be transparent?\n" +
          "• You build trust and a deeper relationship with early adopters.\n" +
          "• Users give richer feedback because they know they're helping shape the product.\n" +
          "• No ethical concerns about deception.\n\n" +
          "What you're testing:\n" +
          "• Does the user value the outcome enough to engage (and pay)?\n" +
          "• What workflows and data do you need to eventually automate?\n\n" +
          "How to transition: Once you spot patterns in the manual work (the same three email templates, the same spending categories), you start automating — one piece at a time. The Concierge MVP becomes the spec for your real product.\n\n" +
          "Rule of thumb: Use Concierge when learning how to deliver value. Use Wizard of Oz when testing whether users want the value at all.",
        keyTakeaway:
          "Concierge MVPs openly use humans to deliver value, building trust and uncovering the workflows you'll later automate."
      },

      // Lesson 8 — Teach
      {
        type: "teach",
        title: "A/B Testing Basics",
        body:
          "An A/B test (split test) randomly divides your users into two groups:\n\n" +
          "• Control (A): The existing experience.\n" +
          "• Variant (B): The new experience.\n\n" +
          "You measure the same metric for both groups over the same period and compare results.\n\n" +
          "Key ingredients of a good A/B test:\n" +
          "1. One variable at a time — Change only the element you're testing (headline, button color, pricing). Otherwise you can't attribute results.\n" +
          "2. Random assignment — Users must be randomly bucketed. If power users all land in Group B, your results are meaningless.\n" +
          "3. Sufficient sample size — Too few users = noisy data. Use a sample-size calculator before you start.\n" +
          "4. Pre-defined success metric — Decide what 'winning' means before you launch. Moving the goalposts after the test is p-hacking.\n" +
          "5. Run until significance — Don't peek at results early and call it. Let the test reach statistical significance.\n\n" +
          "Common pitfalls:\n" +
          "• Testing too many variants at once (multivariate without the math).\n" +
          "• Ending the test on a 'good day' instead of waiting for significance.\n" +
          "• Ignoring novelty effects — early lifts that fade as users get used to the change.",
        keyTakeaway:
          "A/B tests compare a control and variant with random assignment; change one variable, pick your metric upfront, and wait for statistical significance."
      },

      // Lesson 9 — MCQ
      {
        type: "mcq",
        prompt:
          "You launch an A/B test on Monday. By Wednesday, Variant B shows a 12% lift in conversions. Your VP asks you to ship Variant B immediately. What should you do?",
        options: [
          {
            text: "Ship it — 12% is a strong lift",
            correct: false,
            explanation:
              "A large lift early on doesn't mean it's real. Small sample sizes can produce wild swings that vanish with more data."
          },
          {
            text: "Wait until the test reaches statistical significance and the pre-defined sample size",
            correct: true,
            explanation:
              "Correct. Early results are noisy. You should run the test until it reaches the sample size you calculated upfront and achieves the agreed significance threshold (usually p < 0.05)."
          },
          {
            text: "End the test and start a new one with more variants",
            correct: false,
            explanation:
              "Ending a test prematurely wastes the data you've already gathered and doesn't solve the significance problem."
          },
          {
            text: "Average the daily lifts to get a reliable number",
            correct: false,
            explanation:
              "Averaging daily snapshots is not how statistical significance works. You need the full test to run its course to draw valid conclusions."
          }
        ]
      },

      // Lesson 10 — Teach
      {
        type: "teach",
        title: "Statistical Significance & Sample Size",
        body:
          "Statistical significance tells you how confident you can be that the difference you observe is real and not due to random chance.\n\n" +
          "The standard threshold is p < 0.05, meaning there's less than a 5% probability the result occurred by chance alone.\n\n" +
          "Sample size is the number of observations you need to detect a meaningful effect. It depends on three factors:\n\n" +
          "1. Baseline conversion rate — If your current rate is 2%, you need far more users to detect a change than if it's 30%.\n" +
          "2. Minimum Detectable Effect (MDE) — The smallest improvement you care about. Detecting a 0.5% lift requires a huge sample; a 10% lift requires far fewer.\n" +
          "3. Statistical power (1 − β) — Usually set to 80%. This is the probability of detecting a true effect when one exists.\n\n" +
          "Practical tips:\n" +
          "• Use an online sample-size calculator (Evan Miller's is excellent) before launching any test.\n" +
          "• If your product has low traffic, test bigger changes. You'll never have enough data to detect a 1% lift with 500 daily visitors.\n" +
          "• Run tests for full weeks to avoid day-of-week bias.\n\n" +
          "Remember: significance ≠ importance. A 0.3% lift can be statistically significant with a huge sample but not worth the engineering effort.",
        keyTakeaway:
          "Calculate your required sample size before launching a test — it depends on baseline rate, minimum detectable effect, and desired statistical power."
      },

      // Lesson 11 — Teach
      {
        type: "teach",
        title: "Type I & Type II Errors and Marty Cagan's 4 Big Risks",
        body:
          "Two ways an experiment can mislead you:\n\n" +
          "• Type I Error (False Positive): You conclude the change works, but it actually doesn't. You ship a feature that adds no real value.\n" +
          "• Type II Error (False Negative): You conclude the change doesn't work, but it actually does. You kill a valuable feature too soon.\n\n" +
          "Lowering one error type raises the other. The standard trade-off: set α = 0.05 (5% false positive rate) and β = 0.20 (20% false negative rate).\n\n" +
          "These statistical risks map neatly onto Marty Cagan's 4 Big Risks every product must address:\n\n" +
          "1. Value Risk — Will customers buy/use it? (Test with Painted Doors, Wizard of Oz, Concierge MVPs.)\n" +
          "2. Usability Risk — Can customers figure out how to use it? (Test with prototype and usability testing.)\n" +
          "3. Feasibility Risk — Can engineering build it? (Technical spikes, proofs of concept.)\n" +
          "4. Business Viability Risk — Does it work for the business? (Unit economics, legal review, stakeholder alignment.)\n\n" +
          "A disciplined PM tests all four risks, not just value. The cheapest order: Value → Usability → Feasibility → Viability.",
        keyTakeaway:
          "Type I errors ship useless features; Type II errors kill good ones. Address Cagan's 4 Big Risks — value, usability, feasibility, viability — in the cheapest order possible."
      },

      // Lesson 12 — MCQ
      {
        type: "mcq",
        prompt:
          "Your team identifies that the riskiest assumption for a new AI feature is: 'Users trust AI-generated financial advice enough to act on it.' According to Riskiest Assumption Testing (RAT), what should you do first?",
        options: [
          {
            text: "Build the full AI model and run a beta program",
            correct: false,
            explanation:
              "RAT says to test the riskiest assumption with the cheapest experiment possible. Building the full model is the most expensive option."
          },
          {
            text: "Survey users about their attitudes toward AI in finance",
            correct: false,
            explanation:
              "Surveys measure stated preferences, not real behavior. People often say they'd trust AI but don't act on it. You need a behavioral signal."
          },
          {
            text: "Design the cheapest experiment that directly tests whether users act on AI-generated advice",
            correct: true,
            explanation:
              "Correct. RAT says: identify your riskiest assumption, then design the fastest, cheapest test that produces behavioral evidence. For example, a Wizard of Oz test where a human writes the advice but presents it as AI-generated, then measure action rate."
          },
          {
            text: "De-risk feasibility first by confirming the AI model can be built",
            correct: false,
            explanation:
              "The riskiest assumption here is about user trust (value risk), not feasibility. RAT says to tackle the biggest risk first, regardless of category."
          }
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // SKILL 2 — Validation Methods  (10 lessons)
  // ──────────────────────────────────────────────────────────
  {
    id: "validation",
    title: "Validation Methods",
    locked: false,
    lessons: [
      // Lesson 1 — Teach
      {
        type: "teach",
        title: "Customer Interviews & The Mom Test",
        body:
          "Customer interviews are the bedrock of product validation — but most PMs do them wrong.\n\n" +
          "Rob Fitzpatrick's 'The Mom Test' lays out three rules for conversations that produce truthful signal:\n\n" +
          "1. Talk about their life, not your idea.\n" +
          "   Bad: 'Would you use an app that tracks your habits?'\n" +
          "   Good: 'Walk me through what happened the last time you tried to build a new habit.'\n\n" +
          "2. Ask about specifics in the past, not hypotheticals about the future.\n" +
          "   Bad: 'Would you pay $10/month for this?'\n" +
          "   Good: 'What solutions have you already paid for? How much did you spend?'\n\n" +
          "3. Talk less, listen more.\n" +
          "   Your job is to extract information, not to pitch. Aim for a 20/80 talk-to-listen ratio.\n\n" +
          "The name comes from the idea that even your mom would give you useful data if you ask the right questions — because you're not asking her to validate your idea, you're asking about her real behavior and pain.\n\n" +
          "After every interview, write down the three most surprising things you heard. If nothing surprised you, your questions weren't good enough.",
        keyTakeaway:
          "The Mom Test: ask about real past behavior, not hypothetical futures. If your mom can't give you a wrong answer, you're asking the right questions."
      },

      // Lesson 2 — MCQ
      {
        type: "mcq",
        prompt:
          "You're interviewing a potential user for a meal-planning app. Which question best follows The Mom Test principles?",
        options: [
          {
            text: "Would you use an app that plans your meals for the week?",
            correct: false,
            explanation:
              "This asks about a hypothetical future and invites a polite 'sure!' It violates The Mom Test because it's about your idea, not their life."
          },
          {
            text: "Tell me about the last time you struggled to decide what to cook for dinner.",
            correct: true,
            explanation:
              "Perfect. This asks about a specific past event in their life. Their answer reveals real pain points, current workarounds, and emotional intensity — all without mentioning your product."
          },
          {
            text: "On a scale of 1-10, how much do you hate meal planning?",
            correct: false,
            explanation:
              "Rating scales in interviews are weak. They produce a number but no context, no stories, and no insight into actual behavior."
          },
          {
            text: "Our app uses AI to generate meal plans. Does that sound useful?",
            correct: false,
            explanation:
              "This pitches your solution and asks for approval. Social pressure will push most people toward 'yes' regardless of their true feelings."
          }
        ]
      },

      // Lesson 3 — Teach
      {
        type: "teach",
        title: "Jobs-to-be-Done (JTBD)",
        body:
          "Jobs-to-be-Done is a framework that reframes product thinking from 'what features do users want?' to 'what job is the user hiring this product to do?'\n\n" +
          "The canonical example: People don't buy a quarter-inch drill because they want a drill. They buy it because they want a quarter-inch hole. And they want the hole because they want to hang a shelf. And they want the shelf because they want an organized room. The deeper you go, the more durable the insight.\n\n" +
          "The JTBD statement format:\n" +
          "\"When I [situation], I want to [motivation], so I can [desired outcome].\"\n\n" +
          "Example: 'When I get home tired from work, I want to get a healthy dinner on the table in under 20 minutes, so I can feel like a good parent without spending my whole evening cooking.'\n\n" +
          "Key concepts:\n" +
          "• Functional jobs — The practical task (cook dinner).\n" +
          "• Emotional jobs — How the user wants to feel (competent parent).\n" +
          "• Social jobs — How the user wants to be seen (health-conscious).\n\n" +
          "JTBD shifts your competitive set. A meal-planning app doesn't just compete with other meal-planning apps — it competes with takeout, meal kits, asking a spouse, and skipping dinner entirely.\n\n" +
          "Use JTBD interviews to uncover jobs: 'Tell me about the last time you [switched to/bought/started using] [product]. What was going on in your life?'",
        keyTakeaway:
          "JTBD asks what job a user 'hires' your product to do — covering functional, emotional, and social dimensions — and reveals your true competitive landscape."
      },

      // Lesson 4 — Teach
      {
        type: "teach",
        title: "Surveys vs Interviews",
        body:
          "Surveys and interviews are complementary tools. Knowing when to use each is a core PM skill.\n\n" +
          "Use INTERVIEWS when you need:\n" +
          "• Depth — understanding why users behave a certain way.\n" +
          "• Discovery — exploring a problem space you don't yet understand.\n" +
          "• Nuance — capturing emotions, workarounds, and context.\n" +
          "• Small samples (5–15 users can surface 80% of key themes).\n\n" +
          "Use SURVEYS when you need:\n" +
          "• Breadth — measuring how widespread a behavior or preference is.\n" +
          "• Quantification — 'What % of users experience this pain?'\n" +
          "• Prioritization — ranking features or problems across a large base.\n" +
          "• Statistical confidence — large sample sizes (100+).\n\n" +
          "The ideal sequence:\n" +
          "1. Start with 8-10 interviews to discover themes and language.\n" +
          "2. Use those themes to write well-worded survey questions.\n" +
          "3. Deploy the survey to hundreds of users to quantify findings.\n" +
          "4. Follow up with more interviews to dig into surprising survey results.\n\n" +
          "Common mistakes:\n" +
          "• Surveying before you understand the problem (you'll ask the wrong questions).\n" +
          "• Using interviews when you need a number ('70% of users want X').\n" +
          "• Leading survey questions: 'How much do you love our new feature?' → 'How would you rate your experience with Feature X?'",
        keyTakeaway:
          "Interview first to discover themes, then survey to quantify them. Interviews reveal the 'why,' surveys reveal the 'how many.'"
      },

      // Lesson 5 — MCQ
      {
        type: "mcq",
        prompt:
          "You have a hunch that users are frustrated with your product's export feature, but you're not sure what specifically is wrong. You have access to 2,000 active users. What's the best first step?",
        options: [
          {
            text: "Send a survey to all 2,000 users asking them to rate the export feature",
            correct: false,
            explanation:
              "You don't know what's wrong yet, so you can't write good survey questions. A rating scale won't tell you why users are frustrated."
          },
          {
            text: "Interview 8-10 users who recently used the export feature to understand their pain points",
            correct: true,
            explanation:
              "Correct. Start with interviews to discover the specific problems. Then use those insights to design a targeted survey you can send to all 2,000 users for quantification."
          },
          {
            text: "A/B test a completely redesigned export feature",
            correct: false,
            explanation:
              "You're skipping discovery entirely. Without understanding the problem, you might redesign the wrong thing."
          },
          {
            text: "Check analytics to see if anyone uses the export feature at all",
            correct: false,
            explanation:
              "Analytics are helpful context, but they won't explain the 'why' behind user frustration. Interviews are the right discovery tool here."
          }
        ]
      },

      // Lesson 6 — Teach
      {
        type: "teach",
        title: "Fake Door Tests & Smoke Tests",
        body:
          "Fake Door tests and Smoke tests are demand-validation experiments you can run before building anything.\n\n" +
          "FAKE DOOR TEST (also called Painted Door):\n" +
          "• Place a button, link, or menu item for a non-existent feature in your live product.\n" +
          "• When clicked, show 'Coming soon — join the waitlist!'\n" +
          "• Metric: Click-through rate (CTR) and waitlist sign-ups.\n" +
          "• Best for: Testing demand inside an existing product with real traffic.\n\n" +
          "SMOKE TEST:\n" +
          "• Create a standalone landing page, ad campaign, or explainer video for a product that doesn't exist yet.\n" +
          "• Drive traffic via ads, social media, or community posts.\n" +
          "• Metric: Sign-up rate, email captures, or even pre-orders.\n" +
          "• Best for: Testing demand for a new product or startup idea before writing code.\n\n" +
          "The famous Dropbox smoke test: Drew Houston created a 3-minute demo video of Dropbox before the product worked. The waitlist went from 5,000 to 75,000 overnight — massive demand validation with zero product.\n\n" +
          "Key difference: Fake Doors test features within an existing product. Smoke Tests test entirely new product ideas from scratch.\n\n" +
          "Both share a philosophy: measure real commitment (clicks, sign-ups, dollars) — not stated interest.",
        keyTakeaway:
          "Fake doors test feature demand inside your product; smoke tests validate new product ideas externally. Both measure real user commitment before building."
      },

      // Lesson 7 — Teach
      {
        type: "teach",
        title: "Landing Page MVPs & Prototype Testing",
        body:
          "A Landing Page MVP is a single web page that describes your product's value proposition and includes a call-to-action (sign up, pre-order, join waitlist).\n\n" +
          "Anatomy of a strong landing page MVP:\n" +
          "• Headline: One sentence that captures the core value.\n" +
          "• Subheadline: Who it's for and why they should care.\n" +
          "• Visual: Screenshot, mockup, or short video.\n" +
          "• Social proof: Testimonials, logos, or user counts (if available).\n" +
          "• CTA: One clear action — 'Get Early Access', 'Pre-order Now'.\n\n" +
          "Measure: Visitor-to-signup conversion rate. Industry benchmark for early-stage products is 2-5%; above 10% is a strong signal.\n\n" +
          "PROTOTYPE TESTING goes one step deeper:\n" +
          "• Build a clickable prototype (Figma, Framer, InVision) that simulates the product experience.\n" +
          "• Recruit 5-8 users and observe them using the prototype.\n" +
          "• Key question: Can they complete the core task without help?\n\n" +
          "Prototype testing validates usability and flow, not just demand. It answers: 'Even if users want this, can they figure it out?'\n\n" +
          "Combine both: Drive traffic to a landing page (demand validation), then funnel interested users into prototype testing sessions (usability validation).",
        keyTakeaway:
          "Landing pages validate demand via conversion rates; prototypes validate usability by observing whether users can complete core tasks."
      },

      // Lesson 8 — MCQ
      {
        type: "mcq",
        prompt:
          "You created a landing page MVP for a new product and drove 1,000 visitors via ads. 45 people signed up for the waitlist (4.5% conversion). What can you conclude?",
        options: [
          {
            text: "The product will definitely succeed — 4.5% is above the industry benchmark",
            correct: false,
            explanation:
              "A landing page validates demand signal, not product success. You still need to validate usability, feasibility, and business viability."
          },
          {
            text: "There is a reasonable signal of demand, but you need to validate other risks before building",
            correct: true,
            explanation:
              "Correct. 4.5% is a solid demand signal. But demand alone doesn't guarantee success — you must also test usability (can users figure it out?), feasibility (can you build it?), and viability (does the business model work?)."
          },
          {
            text: "4.5% is too low to proceed — you need at least 10%",
            correct: false,
            explanation:
              "4.5% is actually above the 2-5% benchmark for early-stage landing pages. It's a meaningful signal of interest worth investigating further."
          },
          {
            text: "You should immediately start building the full product",
            correct: false,
            explanation:
              "Jumping to building after a single demand signal is premature. Validate usability with prototypes and check feasibility and viability first."
          }
        ]
      },

      // Lesson 9 — Teach
      {
        type: "teach",
        title: "Usability Testing & Design Sprints",
        body:
          "USABILITY TESTING answers: 'Can users accomplish their goal with this design?'\n\n" +
          "The standard process:\n" +
          "1. Define 3-5 key tasks (e.g., 'Find and purchase a gift card').\n" +
          "2. Recruit 5 representative users (Jakob Nielsen showed 5 users find ~85% of usability problems).\n" +
          "3. Ask users to think aloud while attempting each task.\n" +
          "4. Observe silently — don't help, don't explain, don't lead.\n" +
          "5. Note where users hesitate, get confused, or fail.\n\n" +
          "Metrics: Task completion rate, time-on-task, error rate, and qualitative confusion points.\n\n" +
          "DESIGN SPRINTS (Google Ventures model) compress months of work into 5 days:\n" +
          "• Monday: Map the problem and choose a target.\n" +
          "• Tuesday: Sketch competing solutions.\n" +
          "• Wednesday: Decide on the best solution.\n" +
          "• Thursday: Build a realistic prototype.\n" +
          "• Friday: Test with 5 real users.\n\n" +
          "The magic of a design sprint is the forcing function. Instead of debating for weeks, you go from problem to user feedback in 5 days.\n\n" +
          "Design sprints are ideal when:\n" +
          "• The team is stuck in analysis paralysis.\n" +
          "• The stakes are high (new product, major pivot).\n" +
          "• Cross-functional alignment is needed (design, eng, business).",
        keyTakeaway:
          "Test with 5 users to find 85% of usability issues. Use Design Sprints to go from problem to tested prototype in just 5 days."
      },

      // Lesson 10 — Teach
      {
        type: "teach",
        title: "Assumption Mapping",
        body:
          "Every product idea sits on a pile of assumptions. Assumption Mapping makes them explicit and prioritizes which to test first.\n\n" +
          "How to create an assumption map:\n\n" +
          "Step 1: Brain-dump all assumptions.\n" +
          "Gather your team and list everything you're assuming to be true:\n" +
          "• 'Users care about this problem.'\n" +
          "• 'They'll pay $15/month.'\n" +
          "• 'We can get this data legally.'\n" +
          "• 'Our ML model can achieve 90% accuracy.'\n" +
          "• 'Users will share this with friends.'\n\n" +
          "Step 2: Plot on a 2×2 matrix.\n" +
          "• X-axis: How much evidence do we have? (None → Strong)\n" +
          "• Y-axis: How critical is this to success? (Nice-to-have → Must-be-true)\n\n" +
          "Step 3: Prioritize.\n" +
          "• Top-left quadrant (high criticality, low evidence) = TEST THESE FIRST.\n" +
          "• Top-right (high criticality, high evidence) = Monitor but don't test.\n" +
          "• Bottom-left (low criticality, low evidence) = Ignore for now.\n" +
          "• Bottom-right (low criticality, high evidence) = Safe to assume.\n\n" +
          "Step 4: Design experiments for top-left assumptions.\n" +
          "For each one, pick the cheapest validation method: interview, survey, fake door, prototype, Wizard of Oz, or landing page.\n\n" +
          "Assumption mapping connects all the validation methods you've learned into a strategic prioritization framework. It ensures you're not just testing — you're testing the right things first.",
        keyTakeaway:
          "Map assumptions on a criticality-vs-evidence matrix. Test the top-left quadrant first — high stakes, low evidence — using the cheapest method available."
      }
    ]
  }
]
  },
  {
    id: "analytics", title: "Product Analytics", icon: "📊",
    skills: [
  {
    id: "retention",
    title: "Retention & Cohorts",
    locked: false,
    lessons: [
      // Lesson 1 — Teach
      {
        type: "teach",
        title: "Why Retention Is the King of Metrics",
        body:
          "Acquisition gets the headlines. Retention builds the business.\n\n" +
          "Here's the math: If you acquire 1,000 users per month but only retain 10%, you'll have a revolving door — 900 new faces every month and a product that never compounds in value.\n\n" +
          "If you retain 40%, your active user base grows every single month. After 12 months, you have ~5,500 active users instead of ~1,000.\n\n" +
          "Retention matters because:\n" +
          "1. It validates product-market fit. If people keep coming back, the product delivers real value.\n" +
          "2. It drives sustainable growth. Retained users generate word-of-mouth, content, and network effects.\n" +
          "3. It improves unit economics. Acquiring a new user costs 5-25x more than retaining an existing one.\n" +
          "4. It's the denominator of LTV. Lifetime Value = ARPU × Average Lifespan. Retention extends lifespan.\n\n" +
          "Brian Balfour (Reforge) puts it bluntly: 'If you have a retention problem, nothing else matters. Growth is just filling a leaky bucket.'\n\n" +
          "The first question a smart investor asks isn't 'How many users do you have?' It's 'What does your retention curve look like?'",
        keyTakeaway:
          "Retention is the truest signal of product-market fit. Without it, growth is just filling a leaky bucket."
      },

      // Lesson 2 — Teach
      {
        type: "teach",
        title: "N-Day vs Unbounded Retention",
        body:
          "There are two fundamental ways to measure retention:\n\n" +
          "N-DAY RETENTION (also called 'bounded' or 'classic' retention):\n" +
          "• Measures whether a user returns on exactly Day N after their first use.\n" +
          "• Example: Day 7 retention = % of users who were active on exactly Day 7.\n" +
          "• Strict and precise — great for daily-use products (social media, games, messaging).\n" +
          "• Downside: Misses users who come back on Day 6 or Day 8 — they count as 'churned.'\n\n" +
          "UNBOUNDED RETENTION (also called 'rolling' or 'return on or after'):\n" +
          "• Measures whether a user returns on Day N or any day after.\n" +
          "• Example: Day 7 unbounded retention = % of users active on Day 7 or later.\n" +
          "• More forgiving — better for products used weekly or irregularly (e-commerce, travel, utilities).\n" +
          "• Downside: Can overstate retention because it counts any future activity.\n\n" +
          "Which to choose?\n" +
          "• Daily-use products (Slack, Instagram): Use N-Day.\n" +
          "• Weekly/monthly products (Airbnb, Zillow): Use Unbounded or Week-N.\n" +
          "• Subscription products (Netflix, Spotify): Use monthly subscription renewal rate.\n\n" +
          "Many teams track both: N-Day for precision and unbounded for a 'floor' of retained users.",
        keyTakeaway:
          "N-Day retention checks exact-day return (strict); unbounded retention checks return on-or-after Day N (forgiving). Choose based on your product's natural usage frequency."
      },

      // Lesson 3 — MCQ
      {
        type: "mcq",
        prompt:
          "You're the PM for an online travel booking app. Users typically book trips a few times per year. Which retention metric is most appropriate?",
        options: [
          {
            text: "Day 1 retention (N-Day)",
            correct: false,
            explanation:
              "Day 1 retention is for daily-use products. Nobody books travel two days in a row — this metric would show near-zero retention and mislead you."
          },
          {
            text: "Unbounded retention or Month-N retention",
            correct: true,
            explanation:
              "Correct. Travel booking is infrequent by nature. Unbounded or monthly-interval retention captures whether users come back over weeks or months, matching the product's natural usage cadence."
          },
          {
            text: "DAU/MAU stickiness ratio",
            correct: false,
            explanation:
              "DAU/MAU measures daily engagement intensity. For an infrequent-use product like travel, this ratio would be misleadingly low even for a healthy product."
          },
          {
            text: "Day 7 retention (N-Day)",
            correct: false,
            explanation:
              "Weekly retention is better than daily, but still too frequent for a product used a few times per year. Monthly or unbounded intervals fit the travel use case."
          }
        ]
      },

      // Lesson 4 — Teach
      {
        type: "teach",
        title: "Cohort Analysis",
        body:
          "A cohort is a group of users who share a common characteristic — usually their sign-up date.\n\n" +
          "Cohort analysis tracks how each group behaves over time, instead of mixing all users into a single average.\n\n" +
          "Why this matters — a simple example:\n" +
          "Your overall Day 30 retention is 15%. Sounds stable. But when you break it by cohort:\n" +
          "• January cohort: 20% Day 30 retention.\n" +
          "• February cohort: 15%.\n" +
          "• March cohort: 10%.\n" +
          "Retention is declining — and the overall average hid it because older cohorts still have higher numbers.\n\n" +
          "How to build a cohort table:\n" +
          "• Rows = Cohorts (grouped by sign-up week or month).\n" +
          "• Columns = Time periods since sign-up (Week 0, Week 1, Week 2 …).\n" +
          "• Cells = % of the cohort still active in that period.\n\n" +
          "What to look for:\n" +
          "1. Improving cohorts — Later cohorts retain better → your product improvements are working.\n" +
          "2. Flattening curves — A cohort's retention stops declining → you've found a core group.\n" +
          "3. Anomalies — One cohort retains much better/worse → what happened that week? (Feature launch? Marketing channel change? Bug?)\n\n" +
          "Cohort analysis is the most important analytical skill a PM can have. It separates growth narratives from growth reality.",
        keyTakeaway:
          "Cohort analysis groups users by sign-up date and tracks their behavior over time — revealing trends that overall averages hide."
      },

      // Lesson 5 — Teach
      {
        type: "teach",
        title: "Retention Curves",
        body:
          "A retention curve is a line chart showing the % of a cohort that remains active over time. The shape of the curve tells you everything about your product's health.\n\n" +
          "THREE CURVE SHAPES:\n\n" +
          "1. Flattening curve (good) 📈→📊\n" +
          "   Steep initial drop, then flattens into a horizontal line.\n" +
          "   Meaning: You lose casual users early, but a core group sticks around forever.\n" +
          "   Example: A productivity tool loses tourists but retains power users at 25%.\n\n" +
          "2. Declining curve (bad) 📉\n" +
          "   Steady, continuous decline toward zero.\n" +
          "   Meaning: No core user base. The product doesn't deliver lasting value.\n" +
          "   Action: You have a product-market fit problem. Go back to discovery.\n\n" +
          "3. Smiling curve (great) 📈\n" +
          "   Initial drop, then the curve bends upward.\n" +
          "   Meaning: Users who leave come back (resurrection). Usually driven by external triggers (seasonal demand, notification campaigns, network effects).\n" +
          "   Example: Tax software usage dips after April but rises again next year.\n\n" +
          "Key benchmarks (Day 30 retention):\n" +
          "• Social apps: 20-30% is good.\n" +
          "• SaaS B2B: 40-60% is good.\n" +
          "• E-commerce: 20-35% is good.\n" +
          "• Gaming: 5-10% is typical.\n\n" +
          "The single most important question: Does the curve flatten? If yes, you have a retainable product. If not, no amount of acquisition will save you.",
        keyTakeaway:
          "A healthy retention curve flattens — it means you've found a core user base. A curve that keeps declining signals a product-market fit problem."
      },

      // Lesson 6 — MCQ
      {
        type: "mcq",
        prompt:
          "You plot retention curves for three cohorts and notice that each new cohort's curve flattens at a higher percentage than the previous one. What does this tell you?",
        options: [
          {
            text: "Your product improvements are working — newer users retain better",
            correct: true,
            explanation:
              "Correct. Rising flattening points across cohorts mean your product changes (onboarding improvements, feature additions, bug fixes) are successfully improving long-term retention for new users."
          },
          {
            text: "You're acquiring higher-quality users from better marketing channels",
            correct: false,
            explanation:
              "This is one possible explanation but not the only one. The pattern could also be driven by product improvements. You'd need to check if the marketing channels actually changed."
          },
          {
            text: "The data is biased because newer cohorts have had less time to churn",
            correct: false,
            explanation:
              "The flattening point means the curve has stabilized — users who remain at that point tend to stay. If the curve hadn't flattened yet for newer cohorts, this concern would be valid."
          },
          {
            text: "You should stop making product changes since retention is already improving",
            correct: false,
            explanation:
              "Improving retention is a reason to keep investing in what's working, not to stop. Identify which changes drove the improvement and double down."
          }
        ]
      },

      // Lesson 7 — Teach
      {
        type: "teach",
        title: "Activation Metrics & the Aha Moment",
        body:
          "Activation is the moment a new user first experiences your product's core value. It's the bridge between sign-up and retention.\n\n" +
          "The 'Aha Moment' is the specific action (or set of actions) most correlated with long-term retention.\n\n" +
          "Famous Aha Moments:\n" +
          "• Facebook: Add 7 friends in 10 days.\n" +
          "• Dropbox: Put 1 file in 1 folder.\n" +
          "• Slack: Send 2,000 team messages.\n" +
          "• Twitter (early): Follow 30 users.\n\n" +
          "How to find your Aha Moment:\n" +
          "1. List all actions a new user can take in their first session/week.\n" +
          "2. For each action, compare retention of users who did it vs. didn't.\n" +
          "3. The action with the biggest retention gap is your Aha Moment candidate.\n" +
          "4. Validate with cohort analysis — does driving more users to that action actually improve retention?\n\n" +
          "Important: Correlation ≠ causation. Maybe users who add 7 friends retain because they're inherently more social — not because adding friends causes retention. Run experiments: if you nudge users toward the action and retention improves, you've found a causal lever.\n\n" +
          "Once identified, your entire onboarding flow should be designed to push users toward the Aha Moment as fast as possible — with the fewest steps and least friction.",
        keyTakeaway:
          "The Aha Moment is the action most correlated with retention. Find it via data, validate causation via experiments, then optimize onboarding to drive users there fast."
      },

      // Lesson 8 — Teach
      {
        type: "teach",
        title: "Churn Prediction",
        body:
          "Churn prediction identifies users who are likely to leave before they actually leave — giving you a window to intervene.\n\n" +
          "Leading indicators of churn (varies by product):\n" +
          "• Declining session frequency — weekly user drops to biweekly.\n" +
          "• Declining session depth — user visits fewer pages, completes fewer actions.\n" +
          "• Feature disengagement — user stops using key features they previously relied on.\n" +
          "• Support ticket surge — frustration spikes often precede churn.\n" +
          "• Failed actions — errors, failed payments, broken workflows.\n\n" +
          "Building a simple churn model:\n" +
          "1. Define 'churned' — for your product, what counts as gone? (No login in 30 days? Subscription cancelled?)\n" +
          "2. Label historical users as churned or retained.\n" +
          "3. Identify features that differ between the two groups (login frequency, feature usage, time since last action).\n" +
          "4. Build a predictive model (even a simple logistic regression works for v1).\n" +
          "5. Score active users daily and flag high-risk accounts.\n\n" +
          "Intervention playbook:\n" +
          "• High risk + high value → Personal outreach (CSM call, PM email).\n" +
          "• High risk + medium value → Automated re-engagement (targeted email, in-app nudge).\n" +
          "• High risk + low value → Light touch (push notification, discount offer).\n\n" +
          "The goal isn't to prevent all churn — some users aren't your target audience. Focus on saving users who could become power users.",
        keyTakeaway:
          "Churn prediction identifies at-risk users through declining engagement signals, giving you a window to intervene with targeted re-engagement before they leave."
      },

      // Lesson 9 — MCQ
      {
        type: "mcq",
        prompt:
          "Your churn model flags a segment of users whose session frequency dropped from daily to twice a week. They still use the product but less intensely. What's the best first step?",
        options: [
          {
            text: "Send them a discount code to re-engage",
            correct: false,
            explanation:
              "Discounts address price sensitivity, not declining engagement. These users are still active — the issue is likely about product value, not cost."
          },
          {
            text: "Investigate what changed — check if they stopped using a specific feature or if a product change coincided with the drop",
            correct: true,
            explanation:
              "Correct. Before intervening, understand why engagement declined. Did a feature break? Did a redesign disrupt their workflow? Was there a competitor launch? Diagnosis before prescription."
          },
          {
            text: "Remove them from the churn-risk list since they're still using the product",
            correct: false,
            explanation:
              "Declining frequency is one of the strongest churn predictors. A user going from daily to twice weekly is exhibiting classic pre-churn behavior."
          },
          {
            text: "Send them a survey asking why they're using the product less",
            correct: false,
            explanation:
              "Surveys can be useful, but checking your own data (feature usage, error logs, product changes) is faster and doesn't burden the user. Start with data, then talk to users."
          }
        ]
      },

      // Lesson 10 — Teach
      {
        type: "teach",
        title: "DAU/MAU Stickiness & Engagement Loops",
        body:
          "DAU/MAU STICKINESS RATIO:\n" +
          "DAU/MAU = Daily Active Users ÷ Monthly Active Users.\n\n" +
          "This ratio tells you what fraction of your monthly users visit every day.\n" +
          "• 50%+ → World-class stickiness (WhatsApp, Instagram).\n" +
          "• 20-30% → Good for most SaaS and productivity tools.\n" +
          "• 10-20% → Typical for e-commerce and content platforms.\n" +
          "• Below 10% → Users aren't forming a habit around your product.\n\n" +
          "Limitation: DAU/MAU is meaningless for products with naturally low frequency (travel booking, tax software). Only use for products where daily use is realistic.\n\n" +
          "ENGAGEMENT LOOPS:\n" +
          "An engagement loop is a self-reinforcing cycle that brings users back:\n\n" +
          "1. Trigger → An internal motivation or external cue that prompts a visit.\n" +
          "   Examples: Push notification, email digest, social obligation ('someone commented on your post').\n\n" +
          "2. Action → The user does something valuable.\n" +
          "   Examples: Posts a photo, sends a message, completes a task.\n\n" +
          "3. Reward → The user gets value from the action.\n" +
          "   Examples: Likes on a post, reply from a friend, progress bar filling up.\n\n" +
          "4. Investment → The user puts something in that makes the product more valuable for their next visit.\n" +
          "   Examples: Adding friends, creating content, customizing preferences, uploading data.\n\n" +
          "The investment step is crucial — it creates switching costs and makes each subsequent loop more rewarding. Products with strong engagement loops retain users without relying on discounts or tricks.",
        keyTakeaway:
          "DAU/MAU measures daily habit strength. Engagement loops (trigger → action → reward → investment) are the mechanism that drives stickiness."
      },

      // Lesson 11 — Teach
      {
        type: "teach",
        title: "Power User Curves",
        body:
          "A Power User Curve (also called an L-shaped or activity histogram) shows the distribution of how many days per month each user is active.\n\n" +
          "How to build one:\n" +
          "• X-axis: Number of days active in a 28-day period (1 to 28).\n" +
          "• Y-axis: % of total users.\n" +
          "• Each bar = what fraction of your user base was active exactly that many days.\n\n" +
          "THREE SHAPES TO RECOGNIZE:\n\n" +
          "1. 'Smile' shape (L-shaped with right bump) 😊\n" +
          "   Most users are at 1-2 days, but a meaningful bump at 20-28 days.\n" +
          "   Meaning: You have a healthy power-user segment alongside casual users.\n" +
          "   Action: Understand what makes power users different. Can you move casual users toward power usage?\n\n" +
          "2. Left-skewed (steep L) 📉\n" +
          "   Almost all users are at 1-3 days. No right-side bump.\n" +
          "   Meaning: No one is forming a daily habit. You have tourists, not residents.\n" +
          "   Action: Rethink your core loop. Why isn't anyone coming back daily?\n\n" +
          "3. Right-skewed (most users at 15-28 days) 📈\n" +
          "   Rare and wonderful. Most of your base uses the product almost daily.\n" +
          "   Meaning: Exceptional engagement. You've nailed product-market fit.\n" +
          "   Example: Messaging apps (WhatsApp, Slack) often show this.\n\n" +
          "Power user curves are more informative than DAU/MAU because they show the full distribution, not just the average. Two products can have the same DAU/MAU but wildly different distributions.\n\n" +
          "Track this monthly: Is the right-side bump growing? Then you're building a habit-forming product.",
        keyTakeaway:
          "Power user curves show the full distribution of engagement intensity. Look for a right-side bump (power users) and track whether it grows over time."
      },

      // Lesson 12 — MCQ
      {
        type: "mcq",
        prompt:
          "You plot a power user curve for your productivity app and see a steep L-shape: 60% of users are active 1-2 days/month, with almost no one above 10 days. Your DAU/MAU is 8%. What should you prioritize?",
        options: [
          {
            text: "Increase top-of-funnel acquisition to grow DAU",
            correct: false,
            explanation:
              "Adding more users to a leaky bucket won't help. The core problem is that almost no one is forming a usage habit. More acquisition just means more 1-2 day users."
          },
          {
            text: "Investigate what the rare 10+ day users do differently and design the product to push more users toward that behavior",
            correct: true,
            explanation:
              "Correct. The small group of frequent users has found value that the majority hasn't. Study their behavior (feature usage, activation path, use case) and engineer the product to guide more users toward that same value. This is the Aha Moment approach applied to engagement."
          },
          {
            text: "Launch a push notification campaign to remind users to open the app daily",
            correct: false,
            explanation:
              "Notifications can help, but if users aren't finding value when they do open the app, you'll just train them to ignore your notifications. Fix the value proposition first."
          },
          {
            text: "Accept that 8% DAU/MAU is normal for productivity apps and focus on monetization",
            correct: false,
            explanation:
              "8% DAU/MAU is below the 20-30% benchmark for productivity tools. Accepting poor retention and focusing on monetization would amplify a flawed foundation."
          }
        ]
      }
    ]
  }
]
  },
  {
    id: "engineering", title: "Engineering", icon: "⚙️",
    skills: [
  {
    id: "opp_cost",
    title: "Opportunity Cost",
    locked: false,
    lessons: [
      {
        type: "teach",
        title: "The RICE Framework",
        body: "Every product team faces the same challenge: too many ideas, not enough time. The RICE framework helps you score and prioritize features objectively.\n\nRICE stands for:\n• Reach — How many users will this impact in a given time period?\n• Impact — How much will this move the needle per user? (Scored 0.25 to 3)\n• Confidence — How sure are you about your estimates? (Expressed as a percentage)\n• Effort — How many person-months will this take?\n\nThe formula: RICE Score = (Reach × Impact × Confidence) / Effort\n\nExample: A feature that reaches 5,000 users/quarter, has high impact (3), you're 80% confident, and it takes 2 person-months → Score = (5000 × 3 × 0.8) / 2 = 6,000.\n\nRICE forces you to quantify gut feelings. It doesn't replace judgment — it structures it. The real power is in comparing scores across features, not the absolute numbers.\n\nCommon pitfall: Teams inflate Confidence scores. Be honest. If you haven't validated demand, your confidence should be 50% or lower.",
        keyTakeaway: "RICE = (Reach × Impact × Confidence) / Effort — it turns subjective prioritization into a structured, comparable score."
      },
      {
        type: "mcq",
        prompt: "Feature A has: Reach = 10,000, Impact = 2, Confidence = 80%, Effort = 4 person-months. What is its RICE score?",
        options: [
          { text: "4,000", correct: true, explanation: "RICE = (10,000 × 2 × 0.8) / 4 = 16,000 / 4 = 4,000. You correctly applied the formula." },
          { text: "16,000", correct: false, explanation: "You forgot to divide by Effort. RICE = (Reach × Impact × Confidence) / Effort = 16,000 / 4 = 4,000." },
          { text: "5,000", correct: false, explanation: "Check your math. (10,000 × 2 × 0.8) = 16,000. Dividing by 4 gives 4,000, not 5,000." },
          { text: "40,000", correct: false, explanation: "It looks like you used Confidence as 8 instead of 0.8. Remember, 80% confidence = 0.8 in the formula." }
        ]
      },
      {
        type: "teach",
        title: "ICE Scoring: The Simpler Alternative",
        body: "ICE scoring is RICE's leaner cousin. It's faster to apply but trades precision for speed.\n\nICE stands for:\n• Impact — How much will this move the key metric? (1–10 scale)\n• Confidence — How sure are you? (1–10 scale)\n• Ease — How easy is this to implement? (1–10 scale)\n\nThe formula: ICE Score = Impact × Confidence × Ease\n\nUnlike RICE, ICE doesn't require estimating Reach separately — it's baked into Impact. This makes it faster but more subjective.\n\nWhen to use ICE over RICE:\n• Early-stage products where you lack reliable reach data\n• Growth experiments where you're running many small tests\n• Hackathons or sprint planning where speed matters\n\nICE was popularized by Sean Ellis (GrowthHackers) for prioritizing growth experiments. The key discipline: score independently before discussing as a team. Otherwise, anchoring bias takes over.\n\nPro tip: Average ICE scores across 3–5 team members to reduce individual bias. If scores diverge wildly, that's a signal you need more data, not more debate.",
        keyTakeaway: "ICE = Impact × Confidence × Ease (each 1–10). It's faster than RICE and ideal for growth experiments, but more subjective."
      },
      {
        type: "mcq",
        prompt: "Your growth team is running 20 small experiments this quarter and needs to prioritize quickly. Which framework is the better fit?",
        options: [
          { text: "ICE — it's faster and designed for high-volume experiment prioritization", correct: true, explanation: "ICE was built for exactly this use case. When running many experiments, the speed of ICE (three simple 1–10 scores) outweighs RICE's precision advantage." },
          { text: "RICE — you should always use the most rigorous framework available", correct: false, explanation: "RICE is more rigorous, but estimating Reach for 20 experiments is time-consuming. ICE's speed advantage matters when you're testing at volume." },
          { text: "Neither — just go with your gut for experiments", correct: false, explanation: "Even lightweight prioritization beats no prioritization. ICE adds structure without slowing you down." },
          { text: "Use both frameworks and average the scores", correct: false, explanation: "RICE and ICE use different scales, so averaging them is meaningless. Pick one framework and apply it consistently." }
        ]
      },
      {
        type: "teach",
        title: "WSJF: Weighted Shortest Job First",
        body: "WSJF comes from SAFe (Scaled Agile Framework) and is built on a powerful economic insight: the cost of delay.\n\nWSJF = Cost of Delay / Job Duration\n\nCost of Delay captures three components:\n1. User-Business Value — How much value does this deliver to users and the business?\n2. Time Criticality — Does this become less valuable if delayed? (e.g., seasonal features, competitive threats)\n3. Risk Reduction / Opportunity Enablement — Does this reduce risk or unlock future opportunities?\n\nEach component is scored using relative sizing (Fibonacci-like: 1, 2, 3, 5, 8, 13, 20). Then:\nCost of Delay = User-Business Value + Time Criticality + Risk Reduction\n\nWhy WSJF works: It naturally prioritizes high-value, time-sensitive, short-duration work. A small feature with high time criticality will score above a large feature with moderate value.\n\nExample: A compliance deadline feature (Time Criticality = 20) with moderate value (5) and low risk reduction (2), taking 3 sprints → WSJF = 27/3 = 9. Compare this against a large feature (value 13, time criticality 2, risk 3) taking 8 sprints → WSJF = 18/8 = 2.25.\n\nThe compliance feature wins — as it should.",
        keyTakeaway: "WSJF = Cost of Delay / Job Duration. It prioritizes items that are valuable, time-sensitive, and quick to deliver."
      },
      {
        type: "mcq",
        prompt: "Two features are competing for engineering time:\n\nFeature X: Value = 8, Time Criticality = 13, Risk Reduction = 5, Duration = 2 sprints\nFeature Y: Value = 13, Time Criticality = 3, Risk Reduction = 8, Duration = 8 sprints\n\nUsing WSJF, which should you build first?",
        options: [
          { text: "Feature X (WSJF = 13)", correct: true, explanation: "Feature X: CoD = 8 + 13 + 5 = 26, WSJF = 26/2 = 13. Feature Y: CoD = 13 + 3 + 8 = 24, WSJF = 24/8 = 3. Feature X has a much higher WSJF score due to its time criticality and short duration." },
          { text: "Feature Y — it has higher total value", correct: false, explanation: "Feature Y has higher User-Business Value (13 vs 8), but WSJF accounts for duration. Feature Y's long duration (8 sprints) dramatically lowers its score: 24/8 = 3 vs 26/2 = 13." },
          { text: "Feature Y — it has higher Cost of Delay", correct: false, explanation: "Actually, Feature X has a slightly higher Cost of Delay (26 vs 24). But even if they were equal, Feature X's shorter duration would give it a higher WSJF score." },
          { text: "They're roughly equal — do either one", correct: false, explanation: "Feature X scores 13 vs Feature Y's 3. That's a 4x difference — not roughly equal. WSJF heavily favors shorter, time-critical work." }
        ]
      },
      {
        type: "teach",
        title: "Technical Debt as Opportunity Cost",
        body: "Technical debt isn't just an engineering problem — it's a product strategy problem. Every sprint spent working around bad architecture is a sprint not spent on new value.\n\nThink of technical debt like financial debt:\n• Principal — The original shortcut or compromise\n• Interest — The ongoing tax on velocity (slower deploys, more bugs, longer onboarding)\n• Default — When the system becomes so fragile that progress effectively stops\n\nOpportunity cost of technical debt manifests in three ways:\n1. Velocity Tax — Features that should take 2 days take 2 weeks because of workarounds\n2. Missed Windows — You can't ship fast enough to capture a market opportunity\n3. Talent Drain — Good engineers leave teams mired in legacy systems\n\nAs a PM, you need to quantify this. Don't ask engineers 'How bad is the tech debt?' Instead ask:\n• 'If we fixed this, how much faster could we ship Feature X?'\n• 'How many production incidents last quarter were caused by this system?'\n• 'What's the onboarding cost for new engineers in this area?'\n\nThe Ward Cunningham framing: 'Shipping first-time code is like going into debt. A little debt speeds development. But debt left unpaid compounds, and eventually all development goes toward paying interest.'\n\nRule of thumb: Allocate 15–20% of each sprint to debt reduction. Treat it as a non-negotiable investment, not a nice-to-have.",
        keyTakeaway: "Technical debt is a product strategy issue, not just an engineering one. Quantify it by measuring its impact on velocity, incidents, and missed opportunities."
      },
      {
        type: "mcq",
        prompt: "Your team's deployment time has increased from 30 minutes to 4 hours over the past year due to accumulated technical debt. Stakeholders are pressuring you to ship a new feature instead of fixing the pipeline. What's the strongest PM argument for addressing the debt?",
        options: [
          { text: "Every deploy costs 3.5 extra engineering hours — over 50 deploys/quarter, that's 175 hours of lost feature development capacity", correct: true, explanation: "Quantifying the opportunity cost in terms of lost engineering hours makes the trade-off concrete. 175 hours/quarter is roughly one full-time engineer — that's a powerful argument." },
          { text: "The engineers are unhappy and might leave", correct: false, explanation: "While talent retention is a valid concern, it's not the strongest argument. Executives respond better to quantified productivity loss than morale arguments." },
          { text: "It's best practice to keep deployment times low", correct: false, explanation: "Best practices don't win budget battles. Quantifying the specific cost — lost hours, delayed features — is far more persuasive." },
          { text: "We should wait until the pipeline completely breaks before fixing it", correct: false, explanation: "Waiting for a crisis is the most expensive option. The interest on technical debt compounds — fixing it later always costs more." }
        ]
      },
      {
        type: "teach",
        title: "Build vs Buy: The Hidden Opportunity Costs",
        body: "Build vs Buy is one of the highest-stakes opportunity cost decisions a PM makes. The wrong choice can waste months of engineering time — or lock you into a vendor that doesn't fit.\n\nFramework for Build vs Buy decisions:\n\n1. Is this a core differentiator?\n• If YES → Lean toward Build. Your competitive advantage should not depend on a vendor.\n• If NO → Lean toward Buy. Don't reinvent commodity infrastructure.\n\n2. Total Cost of Ownership (TCO) over 3 years:\n• Build: Development cost + maintenance + infrastructure + opportunity cost of engineers not building other things\n• Buy: License fees + integration cost + customization + switching cost + vendor risk\n\n3. Time to Value:\n• Buy is almost always faster to initial value\n• Build gives you more control over long-term trajectory\n\n4. Strategic Flexibility:\n• Build: Full control, but you own all maintenance\n• Buy: Faster start, but you're constrained by the vendor's roadmap\n\nCommon mistakes:\n• Underestimating Build maintenance costs (rule of thumb: maintenance = 2–3x initial build cost over 5 years)\n• Underestimating Buy customization costs (vendors show the demo, not the edge cases)\n• Not considering the opportunity cost of engineers building commodity features\n\nAmazon's 'two pizza team' rule helps here: If a bought solution lets a two-pizza team focus on differentiating work, it's usually the right call.",
        keyTakeaway: "Build what differentiates you, buy everything else. Always compare 3-year TCO including maintenance, integration, and the opportunity cost of engineering time."
      },
      {
        type: "teach",
        title: "MVP Scoping and Opportunity Cost",
        body: "The art of MVP scoping is the art of maximizing learning while minimizing opportunity cost.\n\nThe Opportunity Cost Lens on MVP:\n• Every feature you add to an MVP delays learning by days or weeks\n• Every feature you cut risks missing a critical insight\n• The goal is finding the minimum scope that tests your riskiest assumption\n\nEric Ries' Build-Measure-Learn loop only works if Build is fast. Here's how to scope ruthlessly:\n\n1. List your assumptions from riskiest to least risky\n2. Your MVP should test assumption #1 — nothing else\n3. For each proposed feature, ask: 'Does this help us validate or invalidate our riskiest assumption?'\n4. If no → Cut it. If yes → Include it.\n\nThe Wizard of Oz MVP: Before building anything, can you simulate the experience manually? Zappos started by photographing shoes at local stores and fulfilling orders by hand. The opportunity cost of building inventory management before validating demand would have been catastrophic.\n\nThe Concierge MVP: Do things that don't scale. A PM at Food on the Table personally created meal plans for users before building the algorithm. She validated willingness to pay with zero engineering.\n\nThe Landing Page MVP: Before a single line of code, test demand with a landing page and a signup form. If nobody signs up, you've saved months of engineering effort.\n\nRemember: The biggest opportunity cost is building the wrong product perfectly.",
        keyTakeaway: "An MVP should test your riskiest assumption with minimum scope. The biggest opportunity cost isn't a missing feature — it's building the wrong product."
      },
      {
        type: "mcq",
        prompt: "You're launching a new B2B analytics product. Your riskiest assumption is that mid-market companies will pay $500/month for automated reporting. What's the best MVP approach?",
        options: [
          { text: "A landing page with pricing and a 'Request Demo' button to measure sign-up intent", correct: true, explanation: "This directly tests willingness to pay with near-zero engineering cost. If mid-market companies won't even click 'Request Demo' at $500/month, you've invalidated the assumption before writing any code." },
          { text: "Build a full reporting engine with 3 integrations and offer a free trial", correct: false, explanation: "This takes months and tests everything except your riskiest assumption (willingness to pay). Free trials don't validate pricing — they validate interest, which is a different question." },
          { text: "Build a basic version with one integration and price it at $100/month to reduce risk", correct: false, explanation: "Pricing at $100 when your assumption is about $500 doesn't test the actual assumption. You'll learn that people pay $100 — which tells you nothing about $500." },
          { text: "Conduct 50 user interviews asking if they'd pay $500/month", correct: false, explanation: "Stated intent ('I would pay...') is notoriously unreliable. A landing page measures revealed intent — what people actually do, not what they say they'd do." }
        ]
      },
      {
        type: "teach",
        title: "Engineering Capacity and Opportunity Cost",
        body: "Engineering capacity is your scarcest resource. Every hour has an opportunity cost, and PMs who ignore this build bloated products that ship late.\n\nKey concepts:\n\nCapacity ≠ Headcount\n• A 10-person team doesn't have 10 engineers' worth of capacity\n• Account for: meetings, code reviews, on-call, tech debt, onboarding, context switching\n• Rule of thumb: Effective capacity ≈ 60–70% of theoretical capacity\n\nContext Switching Tax:\n• Engineers who work on 3+ projects simultaneously lose 40% of their productive time\n• The opportunity cost of multitasking is invisible but massive\n• Gerald Weinberg's research: Each additional project reduces productive time by 20%\n\nThe Throughput vs Utilization Trap:\n• 100% utilization = 0% throughput for new requests\n• Like a highway: at 100% capacity, traffic stops\n• Optimal utilization for knowledge work: 70–85%\n• The remaining 15–30% isn't waste — it's the capacity to respond to opportunities\n\nAs a PM, protect your team's capacity by:\n1. Saying no to 'small asks' that accumulate into large distractions\n2. Batching similar work to reduce context switching\n3. Building slack into sprint plans for unexpected discoveries\n4. Tracking velocity trends, not just sprint commitments",
        keyTakeaway: "Effective engineering capacity is 60–70% of headcount. Context switching and 100% utilization destroy throughput — protect slack to preserve the ability to seize opportunities."
      },
      {
        type: "mcq",
        prompt: "Your engineering team of 8 is working on 2 major projects and handling on-call rotation. A VP asks you to add a 'quick' third project. According to Weinberg's research on context switching, what's the likely impact?",
        options: [
          { text: "Each engineer loses ~20% more productive time, reducing effective capacity to roughly 40% per project", correct: true, explanation: "Weinberg's research shows each additional project costs ~20% in context switching. Going from 2 to 3 projects means 60% productive time split 3 ways = ~20% per project, down from ~40% per project with 2 projects." },
          { text: "Minimal impact — engineers are professionals who can manage multiple workstreams", correct: false, explanation: "Context switching costs are cognitive, not motivational. Even the best engineers lose significant time when they have to constantly reload mental models for different codebases." },
          { text: "A 5% productivity decrease — context switching is overblown", correct: false, explanation: "Research consistently shows 15–25% productivity loss per additional project. The impact is much larger than most people intuit because mental model loading is expensive." },
          { text: "No impact if you just hire 2 more engineers", correct: false, explanation: "Brook's Law: adding engineers to a late project makes it later. New engineers take 3–6 months to ramp up, and they increase communication overhead for existing team members." }
        ]
      },
      {
        type: "teach",
        title: "Two-Way vs One-Way Door Decisions (Bezos)",
        body: "Jeff Bezos introduced one of the most powerful mental models for decision-making at Amazon: the concept of one-way and two-way doors.\n\nOne-Way Doors (Type 1 decisions):\n• Irreversible or nearly irreversible\n• High stakes, high switching cost\n• Examples: Choosing a database architecture, signing a 3-year vendor contract, launching in a new market, killing a product\n• These deserve careful analysis, broad input, and deliberate decision-making\n\nTwo-Way Doors (Type 2 decisions):\n• Easily reversible\n• Low cost of being wrong\n• Examples: Changing button color, adjusting pricing tiers, A/B test variations, feature flag rollouts\n• These should be made quickly by individuals or small teams\n\nThe critical insight: Most decisions are two-way doors, but organizations treat them like one-way doors.\n\nThis creates massive opportunity cost:\n• A decision that takes 3 weeks of committee review but could be reversed in a day has 3 weeks of opportunity cost baked in\n• Bezos: 'Most decisions should probably be made with somewhere around 70% of the information you wish you had'\n\nAs a PM, classify every decision:\n• Is this reversible? → Two-way door → Decide fast, iterate based on data\n• Is this irreversible? → One-way door → Invest in analysis, get alignment\n\nThe meta-lesson: The cost of slow decision-making on reversible decisions is almost always higher than the cost of being wrong.",
        keyTakeaway: "Most decisions are two-way doors (reversible) and should be made quickly. Reserve careful deliberation for one-way doors (irreversible). Slow decision-making on reversible choices is itself an opportunity cost."
      },
      {
        type: "mcq",
        prompt: "Your team is debating whether to change the onboarding flow. The VP of Design wants a 4-week research study before making any changes. You have a feature flag system that can roll changes back instantly. How should you classify and handle this decision?",
        options: [
          { text: "Two-way door — run a quick A/B test with a feature flag and measure results in 1–2 weeks", correct: true, explanation: "With feature flags, onboarding changes are instantly reversible — a classic two-way door. A 4-week study creates unnecessary opportunity cost when you can test and learn in real-time." },
          { text: "One-way door — onboarding impacts all new users, so extensive research is warranted", correct: false, explanation: "Impact ≠ irreversibility. While onboarding is important, the feature flag makes it reversible. You can test with a small percentage of users and roll back if metrics decline." },
          { text: "Skip the decision and keep the current onboarding", correct: false, explanation: "Avoiding the decision is itself a decision — and it has opportunity cost. If the current onboarding is underperforming, every day of inaction costs you potential conversions." },
          { text: "Compromise with a 2-week research study", correct: false, explanation: "A shorter study is better than 4 weeks, but it still misses the point. With feature flags, real user data from an A/B test is more valuable than any research study, and you get it faster." }
        ]
      },
      {
        type: "teach",
        title: "Saying No to Stakeholders",
        body: "The most important word in a PM's vocabulary is 'No' — but how you say it determines whether you build trust or burn bridges.\n\nWhy saying no is an opportunity cost decision:\n• Every 'yes' to a stakeholder request is a 'no' to something else on the roadmap\n• The hidden cost isn't just engineering time — it's focus, momentum, and strategic coherence\n• Warren Buffett: 'The difference between successful people and really successful people is that really successful people say no to almost everything'\n\nFramework for saying no effectively:\n\n1. Validate the Problem (not the solution)\n'I understand that sales cycle times are a real pain point. Let me make sure I understand the problem deeply.'\n\n2. Show the Trade-Off\n'If we build this, here's what we'd need to delay: [specific features with specific impact]. Are you comfortable with that trade-off?'\n\n3. Offer Alternatives\n'We can't build a custom dashboard, but we can configure Looker to show those metrics by next week. Would that solve the immediate need?'\n\n4. Defer with Data\n'I want to validate demand first. If we see 10+ customers requesting this in the next 30 days, we'll prioritize it for Q3.'\n\n5. Escalate Transparently\n'This request conflicts with our Q2 OKR commitment to reduce churn. I'd like to bring this trade-off to the leadership team for a decision.'\n\nNever say 'No, because we're busy.' Always say 'Yes, and here's what it costs.' Let stakeholders make the trade-off decision with full information.",
        keyTakeaway: "Every 'yes' has an opportunity cost. Say no by showing trade-offs, offering alternatives, and letting stakeholders decide with full information."
      },
      {
        type: "mcq",
        prompt: "The Head of Sales insists on a custom CRM integration that would take 6 weeks of engineering time. Your team is mid-sprint on a churn-reduction feature projected to save $200K ARR. What's the best PM response?",
        options: [
          { text: "Show the trade-off: 'Building this delays our churn fix by 6 weeks, risking $200K ARR. Can we explore a Zapier integration as a faster alternative?'", correct: true, explanation: "This validates their need, quantifies the trade-off, and offers an alternative — the trifecta of saying no effectively. The stakeholder can now make an informed decision." },
          { text: "Say yes to keep the relationship strong — sales is critical to revenue", correct: false, explanation: "Saying yes to avoid conflict is how roadmaps become wish lists. The churn-reduction feature has a quantified $200K impact — giving that up without discussion is poor stewardship." },
          { text: "Say 'We don't have capacity right now' and move on", correct: false, explanation: "This provides no information for the stakeholder to work with. They'll just escalate. Showing the specific trade-off is more respectful and more effective." },
          { text: "Add it to the backlog and hope they forget about it", correct: false, explanation: "The 'hope they forget' strategy destroys trust. Sales leaders don't forget. Be transparent about trade-offs and timelines instead." }
        ]
      }
    ]
  }
]
  },
  {
    id: "finance", title: "Corporate Finance", icon: "💵",
    skills: FINANCE_SKILLS
  },
  {
    id: "leadership", title: "Leadership", icon: "👑",
    skills: [
  {
    id: "root_cause",
    title: "Root Cause Analysis",
    locked: false,
    lessons: [
      {
        type: "teach",
        title: "The 5 Whys (Toyota Production System)",
        body: "The 5 Whys technique was developed by Sakichi Toyoda and became a cornerstone of the Toyota Production System. It's deceptively simple: ask 'Why?' five times to drill past symptoms to root causes.\n\nExample — E-commerce checkout drop-off:\n1. Why are users abandoning checkout? → The page takes 8 seconds to load.\n2. Why does the page take 8 seconds? → It makes 12 API calls synchronously.\n3. Why are there 12 synchronous API calls? → The checkout was built as a monolith without caching.\n4. Why wasn't caching implemented? → The original team prioritized shipping speed over performance.\n5. Why was performance deprioritized? → There was no performance SLA in the product requirements.\n\nRoot cause: Missing performance requirements in the product spec.\nAction: Add performance SLAs (e.g., 'P95 page load < 2 seconds') to all future PRDs.\n\nKey principles:\n• Don't stop at the first satisfying answer — keep going\n• Each 'Why' should lead to a factual answer, not speculation\n• The root cause should be something you can act on\n• You might need more or fewer than exactly 5 iterations\n\nCommon pitfalls:\n• Stopping too early (treating symptoms as causes)\n• Branching into multiple causal chains without following each one\n• Accepting vague answers ('bad communication') — demand specifics\n• Drifting into blame ('Because John made a mistake') — focus on systems, not people\n\nThe 5 Whys works best for simple-to-moderate problems with a single causal chain. For complex, multi-factor problems, use Fishbone diagrams (covered next).",
        keyTakeaway: "Ask 'Why?' repeatedly to move from symptoms to root causes. Stop when you reach a cause you can act on. Focus on systems, not people."
      },
      {
        type: "mcq",
        prompt: "Your mobile app's crash rate spiked 300% after the latest release. You run a 5 Whys analysis:\n1. Why did crashes spike? → A null pointer exception in the payment flow.\n2. Why was there a null pointer? → The API response format changed.\n3. Why did the format change? → The backend team updated the API without notification.\n\nWhat's the best next 'Why' to ask?",
        options: [
          { text: "'Why was the API updated without notifying the mobile team?' — this probes the communication/process gap", correct: true, explanation: "This is the right next question because it moves from a technical failure to a process failure. The answer will likely reveal either a missing API change notification process, missing contract testing, or no cross-team dependency tracking." },
          { text: "'Why didn't the app handle the null gracefully?' — the app should be defensive", correct: false, explanation: "While defensive coding is good practice, this branches into a parallel causal chain rather than continuing down the primary one. Address this separately, but first understand why the API change went unnoticed." },
          { text: "'Who on the backend team made the change?' — we need accountability", correct: false, explanation: "The 5 Whys focuses on systems and processes, not individuals. Finding 'who' leads to blame culture, not to systemic improvements. Ask 'Why was it possible to change the API without notification?' instead." },
          { text: "Stop here — you've found the root cause (no notification)", correct: false, explanation: "You've found a proximate cause, not the root cause. You need to understand WHY notifications didn't happen. Is there no process? Was the process bypassed? You're at 'Why #3' — keep going." }
        ]
      },
      {
        type: "teach",
        title: "Fishbone Diagrams (Ishikawa)",
        body: "When a problem has multiple potential causes across different categories, the Fishbone diagram (also called Ishikawa diagram, after Kaoru Ishikawa) organizes your thinking visually.\n\nStructure:\n• The 'head' of the fish is the problem statement\n• Each 'bone' is a category of potential causes\n• Each category has specific contributing factors\n\nThe classic 6M categories (from manufacturing, adapted for product):\n1. Methods — Processes, workflows, and procedures\n2. Machines — Tools, software, infrastructure\n3. Materials — Data, content, inputs\n4. Measurements — Metrics, KPIs, and how you track\n5. Manpower — People, skills, capacity, training\n6. Mother Nature — External environment, market conditions, regulations\n\nFor product teams, consider these adapted categories:\n1. Product — UX, features, performance\n2. Process — Development workflow, communication, handoffs\n3. People — Skills, staffing, training\n4. Technology — Architecture, tooling, infrastructure\n5. Data — Quality, availability, interpretation\n6. External — Market, competition, regulations\n\nHow to use it:\n1. Write the problem on the right side\n2. Draw the main categories as branches\n3. Brainstorm specific causes under each category\n4. Use dot-voting to prioritize the most likely causes\n5. Investigate the top-voted causes with data\n\nFishbone diagrams are team exercises. The value is in structured brainstorming — capturing causes that no individual would think of alone. Run them on a whiteboard with 4–6 people from different functions.",
        keyTakeaway: "Fishbone diagrams organize potential causes into categories, making them ideal for complex problems with multiple contributing factors. Use them as team brainstorming exercises."
      },
      {
        type: "teach",
        title: "Symptom vs Root Cause",
        body: "The most common mistake in problem-solving is treating symptoms as root causes. This leads to 'whack-a-mole' management — you fix one symptom, and two more appear.\n\nSymptom: An observable effect of an underlying problem.\nRoot Cause: The fundamental reason the problem exists.\n\nExamples:\n\n| Symptom | Root Cause |\n|---------|------------|\n| High customer churn | Poor onboarding → users never reach 'aha moment' |\n| Slow feature delivery | Excessive tech debt → 60% of time spent on workarounds |\n| Low NPS scores | Support response time is 48 hours → users feel ignored |\n| Engineers leaving | No career growth framework → top performers hit a ceiling |\n| Missed revenue targets | Wrong ICP definition → sales pursuing low-value segments |\n\nHow to distinguish symptoms from root causes:\n\n1. The Recurrence Test: If you fix it and it comes back, you treated a symptom.\n2. The 'So What' Test: If you can ask 'So what causes that?' and get a deeper answer, you're at a symptom.\n3. The Control Test: Can you directly act on this? Root causes are actionable; symptoms are not.\n4. The Upstream Test: Is this the effect of something else? If yes, it's a symptom.\n\nPM trap: Stakeholders often come to you with symptoms framed as solutions. 'We need a new dashboard' is a symptom (of what?). 'We need to reduce churn' is a symptom (of what?). Your job is to keep asking until you find the cause you can actually fix.\n\nTreat the disease, not the fever.",
        keyTakeaway: "Symptoms are observable effects; root causes are underlying reasons. Use the Recurrence, So What, Control, and Upstream tests to distinguish between them. Treating symptoms leads to whack-a-mole management."
      },
      {
        type: "mcq",
        prompt: "Your SaaS product's trial-to-paid conversion rate dropped from 15% to 8%. The Head of Sales says: 'We need to extend the free trial from 14 to 30 days.' Is this addressing a symptom or a root cause?",
        options: [
          { text: "Symptom — extending the trial assumes the problem is time, but you haven't determined why users aren't converting in 14 days", correct: true, explanation: "Correct. Low conversion is the symptom. The root cause might be: users don't reach the aha moment, the trial doesn't showcase the right features, the ICP changed, or pricing is misaligned. Extending the trial treats the symptom without diagnosing the cause." },
          { text: "Root cause — users clearly need more time to evaluate the product", correct: false, explanation: "How do you know they need more time? Have you checked whether users who are active for 14 days convert at a higher rate? Many users who don't convert in 14 days simply never engage deeply — more time won't help." },
          { text: "It depends on the product — some products genuinely need longer trials", correct: false, explanation: "While some products do need longer trials, you should validate this with data before assuming it. Check engagement patterns: are active trial users converting? If active users aren't converting, the problem isn't time." },
          { text: "This is both a symptom and a root cause", correct: false, explanation: "Something is either a cause or an effect — it can't be both at the same level of analysis. Trial length might be a contributing factor, but calling it a root cause without investigation is premature." }
        ]
      },
      {
        type: "teach",
        title: "First Principles Thinking",
        body: "First principles thinking strips away assumptions and conventions to reveal the fundamental truths of a problem. It's how you avoid being trapped by 'how things have always been done.'\n\nElon Musk's battery example:\n• Convention: 'Battery packs cost $600/kWh — that's just what they cost.'\n• First principles: 'What are batteries made of? Cobalt, nickel, lithium, carbon, polymer separators, a steel can. What do those materials cost on the London Metal Exchange? $80/kWh.'\n• Conclusion: The 7.5x markup represents manufacturing inefficiency, not fundamental cost.\n\nHow to apply first principles as a PM:\n\n1. Identify your assumptions\n'We need a mobile app because everyone has a mobile app.'\n\n2. Break down the problem to fundamentals\n'What job is the user actually trying to do? Where are they when they need to do it? What device do they have available?'\n\n3. Rebuild from the ground up\n'Users need to check their delivery status while away from their desk. They always have their phone. They need a notification + a 2-screen flow. A PWA with push notifications might serve this better than a native app.'\n\nFirst principles vs analogy-based thinking:\n• Analogy: 'Uber did X, so we should do X' (fast but potentially wrong)\n• First principles: 'What's the fundamental problem, and what's the optimal solution?' (slower but more likely to find breakthroughs)\n\nWhen to use first principles:\n• When entering a new market where conventions might not apply\n• When incremental improvements aren't working\n• When a competitor has disrupted the status quo\n• When the standard approach feels 'off' but you can't articulate why\n\nCaution: First principles thinking is expensive — it takes time and energy. Use it for high-stakes, high-uncertainty decisions. For routine decisions, analogies and heuristics are efficient enough.",
        keyTakeaway: "First principles thinking breaks problems down to fundamental truths and rebuilds solutions from scratch. Use it for high-stakes decisions where conventions might be misleading."
      },
      {
        type: "mcq",
        prompt: "Your team is designing a customer feedback system. The conventional approach is to send NPS surveys via email. Using first principles, which question should you ask FIRST?",
        options: [
          { text: "'What is the fundamental information we need from customers, and when and where is the best moment to capture it?'", correct: true, explanation: "This strips away the assumption that email surveys are the right mechanism. Maybe in-app feedback at the moment of value delivery captures richer, more accurate data. First principles starts with the fundamental need, not the conventional solution." },
          { text: "'Which NPS survey tool has the best response rate?'", correct: false, explanation: "This assumes NPS surveys are the right approach — an analogy-based assumption. First principles would question whether NPS is even the right metric and whether surveys are the right capture mechanism." },
          { text: "'How often should we send surveys — monthly or quarterly?'", correct: false, explanation: "This question operates within the existing paradigm (email surveys). First principles would question whether periodic surveys are the right approach at all — maybe continuous, contextual feedback is better." },
          { text: "'What NPS score do our competitors achieve?'", correct: false, explanation: "This is analogy-based thinking (benchmarking against competitors). First principles asks what you fundamentally need to learn, not what others are doing." }
        ]
      },
      {
        type: "teach",
        title: "Correlation vs Causation",
        body: "One of the most dangerous traps in product analysis is mistaking correlation for causation. It leads to wrong investments, misleading metrics, and wasted resources.\n\nCorrelation: Two things happen together or move in the same direction.\nCausation: One thing directly causes the other.\n\nClassic examples of false causation:\n• 'Users who complete onboarding have 3x higher retention' → Does onboarding cause retention? Or do motivated users both complete onboarding AND retain because they were already committed?\n• 'Power users who use Feature X have higher LTV' → Does Feature X drive LTV? Or do high-LTV users naturally discover and use more features?\n• 'Ice cream sales and drowning deaths correlate' → Neither causes the other. Both increase in summer (confounding variable: temperature).\n\nThree common traps:\n\n1. Confounding Variables\nA third factor causes both the observed correlation.\nExample: Countries with more Nobel laureates also consume more chocolate. The confounder is wealth — wealthy countries invest in education AND have more chocolate consumption.\n\n2. Reverse Causation\nYou assume A causes B, but actually B causes A.\nExample: 'Users who contact support have lower satisfaction.' Did support make them unhappy? Or did unhappy users contact support?\n\n3. Selection Bias\nYour sample isn't representative.\nExample: 'Customers who renewed said they love our product.' Of course — the ones who didn't love it already churned and weren't surveyed.\n\nHow to move from correlation to causation:\n• A/B tests (gold standard)\n• Cohort analysis controlling for variables\n• Time-series analysis (does A consistently precede B?)\n• Natural experiments (did a change create a before/after comparison?)\n\nAs a PM, always ask: 'What else could explain this pattern?'",
        keyTakeaway: "Correlation ≠ Causation. Watch for confounding variables, reverse causation, and selection bias. Use A/B tests and controlled cohort analysis to establish true causal relationships."
      },
      {
        type: "teach",
        title: "Blameless Post-Mortems",
        body: "Post-mortems (or retrospectives) are structured reviews of incidents or failures. The 'blameless' part is what makes them effective — without psychological safety, people hide information, and you never find the real root cause.\n\nAnatomy of a blameless post-mortem:\n\n1. Timeline (What happened?)\n• Minute-by-minute reconstruction of events\n• Focus on facts, not interpretations\n• Include what people knew at each decision point\n\n2. Impact (How bad was it?)\n• Quantify: users affected, revenue lost, duration of incident\n• Categorize: severity level, blast radius\n\n3. Root Cause Analysis (Why did it happen?)\n• Use 5 Whys or Fishbone diagrams\n• Identify contributing factors, not a single villain\n• Distinguish between proximate cause and root cause\n\n4. What Went Well (What saved us?)\n• Acknowledge effective responses\n• Reinforce good practices\n\n5. Action Items (How do we prevent recurrence?)\n• Specific, assignable, time-bound actions\n• Prioritize systemic fixes over individual behavior changes\n• Track completion in subsequent reviews\n\nThe blameless principle:\n• 'Person X made an error' → 'The system allowed an error to occur without safeguards'\n• 'If John hadn't pushed that code...' → 'Our deployment pipeline lacks automated rollback'\n• Focus on: How can we make the system resilient to human error?\n\nGoogle's SRE handbook puts it well: 'We assume that smart, well-intentioned people made the best decisions they could with the information available at the time.'\n\nPM's role in post-mortems: Ensure action items include product changes (better monitoring, feature flags, graceful degradation), not just process changes.",
        keyTakeaway: "Blameless post-mortems focus on systemic causes, not individual errors. The goal is to make systems resilient to human error, not to find someone to blame."
      },
      {
        type: "mcq",
        prompt: "During a post-mortem, an engineer says: 'I deployed the config change to production because I didn't know we had a staging environment.' A senior leader responds: 'You should have asked before deploying to production.' Is this response aligned with blameless post-mortem principles?",
        options: [
          { text: "No — the better question is: 'Why didn't our onboarding or deployment tooling make the staging environment discoverable?'", correct: true, explanation: "Blameless post-mortems focus on systemic failures. The engineer made a reasonable decision with the information available. The system failed to make critical information discoverable. Fix the system: add deployment guardrails, improve onboarding documentation, and make staging the default target." },
          { text: "Yes — engineers should always ask before deploying to production", correct: false, explanation: "While asking is reasonable, relying on individual behavior is fragile. A blameless culture asks: 'How can we make it impossible (or very difficult) to accidentally deploy to production?' Deploy gates, required approvals, and staging-first defaults are systemic solutions." },
          { text: "Partially — the leader has a point, but the tone could be softer", correct: false, explanation: "The issue isn't tone — it's the entire framing. 'You should have...' is blame-oriented regardless of tone. Blameless post-mortems shift from 'What should this person have done?' to 'What should the system have prevented?'" },
          { text: "It depends on how experienced the engineer is", correct: false, explanation: "Blameless post-mortem principles apply regardless of seniority. If a new engineer can accidentally deploy to production, that's a system problem. If a senior engineer can, that's still a system problem. The fix is always systemic." }
        ]
      },
      {
        type: "teach",
        title: "Systems Thinking and Feedback Loops",
        body: "Most product problems aren't isolated events — they're emergent properties of complex systems. Systems thinking helps you see the interconnections that root cause analysis might miss.\n\nKey concepts:\n\n1. Feedback Loops\n• Reinforcing (positive) loops: Growth breeds more growth (or decline breeds more decline)\n  Example: More users → more content → more value → more users (network effect)\n  Example (negative spiral): Poor product → churn → less revenue → fewer engineers → worse product → more churn\n\n• Balancing (negative) loops: The system self-corrects\n  Example: More support tickets → hire more staff → faster resolution → fewer tickets\n\n2. Delays\nEffects don't appear instantly. This causes overshooting and oscillation.\nExample: You see churn rising and launch a retention feature. But the feature takes 3 months to build and another 3 months to show impact. Meanwhile, you've already launched three other initiatives, making it impossible to attribute the improvement.\n\n3. Leverage Points\nThe places in a system where a small change creates large effects.\n• High leverage: Changing the onboarding flow (affects all new users forever)\n• Low leverage: Sending a re-engagement email to churned users (one-time, small audience)\n\n4. Unintended Consequences\nFixing one part of the system can break another.\nExample: Adding a mandatory tutorial improves activation but increases time-to-value, hurting users who already understand the product.\n\nPM application:\nWhen diagnosing root causes, map the system:\n• What are the feedback loops?\n• Where are the delays?\n• What are the unintended consequences of your proposed fix?\n• Where are the leverage points where small changes create large effects?\n\nDonella Meadows, author of 'Thinking in Systems': 'You can't just do one thing. Everything is connected to everything else.'",
        keyTakeaway: "Systems thinking reveals feedback loops, delays, and leverage points that simple root cause analysis misses. Look for reinforcing loops (spirals) and high-leverage intervention points."
      },
      {
        type: "mcq",
        prompt: "Your product has a vicious cycle: slow performance → user complaints → engineering time on firefighting → less time for performance improvements → slower performance. What type of feedback loop is this, and where's the best leverage point?",
        options: [
          { text: "Reinforcing (positive) loop — break it by investing in infrastructure automation so firefighting is eliminated, freeing engineering time for systemic performance work", correct: true, explanation: "This is a reinforcing loop where each element amplifies the next. The highest leverage point is eliminating firefighting through automation (monitoring, auto-scaling, self-healing). This breaks the loop by freeing engineering time for proactive work instead of reactive patches." },
          { text: "Balancing loop — it will self-correct as users adapt to slower performance", correct: false, explanation: "Users don't adapt — they leave. This is a reinforcing loop (decline spiral), not a balancing one. Without intervention, it accelerates: more complaints → more firefighting → less improvement → more complaints." },
          { text: "Reinforcing loop — break it by hiring more engineers to handle both firefighting and improvements", correct: false, explanation: "Hiring is low leverage because new engineers need onboarding, increase communication overhead, and take months to become productive. The systemic fix is eliminating firefighting through automation, not adding headcount to handle it." },
          { text: "Reinforcing loop — break it by reducing the number of user complaint channels to reduce noise", correct: false, explanation: "Reducing complaint channels doesn't reduce the actual complaints — it just makes them invisible. You'd be treating a symptom (visible complaints) while the root cause (poor performance) continues to worsen." }
        ]
      },
      {
        type: "teach",
        title: "The Pareto Principle (80/20 Rule)",
        body: "The Pareto Principle states that roughly 80% of effects come from 20% of causes. For root cause analysis, this means: find the vital few causes that drive the majority of the problem.\n\nVilfredo Pareto originally observed that 80% of Italy's land was owned by 20% of the population. The pattern appears everywhere:\n\n• 80% of bugs come from 20% of the code modules\n• 80% of customer complaints come from 20% of issues\n• 80% of revenue comes from 20% of customers\n• 80% of crashes come from 20% of error types\n• 80% of support tickets come from 20% of features\n\nHow to apply Pareto to root cause analysis:\n\n1. Collect Data: Gather all instances of the problem\n2. Categorize: Group by cause, type, or source\n3. Count & Sort: Rank categories by frequency or impact\n4. Visualize: Create a Pareto chart (bar chart sorted by frequency with a cumulative line)\n5. Focus: Address the top 20% of causes first\n\nExample: You have 500 support tickets last month.\n• Login issues: 180 (36%) — cumulative: 36%\n• Payment errors: 120 (24%) — cumulative: 60%\n• Slow load times: 80 (16%) — cumulative: 76%\n• Missing features: 50 (10%) — cumulative: 86%\n• Other (12 categories): 70 (14%) — cumulative: 100%\n\nFixing just login and payment issues (2 categories out of 15) would eliminate 60% of all support tickets.\n\nPM application: When prioritizing which root causes to fix, don't try to fix everything. Use Pareto analysis to identify the vital few causes and focus your limited resources there.\n\nThe anti-pattern: Spreading effort evenly across all causes ('peanut-buttering'). This feels fair but is inefficient. Concentrated effort on the top causes delivers disproportionate results.\n\nCombine Pareto with severity: A cause that generates 5% of incidents but 50% of revenue impact should still be prioritized. Weight by both frequency AND impact.",
        keyTakeaway: "80% of effects come from 20% of causes. Use Pareto analysis to identify the vital few root causes that drive the majority of a problem, and focus your resources there."
      },
      {
        type: "mcq",
        prompt: "Your app has 1,000 crash reports this month across 25 different crash types. The top 3 crash types account for 720 of those crashes. Following the Pareto principle, what should you do?",
        options: [
          { text: "Fix the top 3 crash types first — they represent 72% of all crashes but only 12% of crash categories", correct: true, explanation: "Classic Pareto: 12% of crash types (3 out of 25) cause 72% of crashes. Fixing these three gives you maximum impact per engineering hour. The remaining 22 crash types combined account for only 280 crashes." },
          { text: "Assign one engineer to each of the 25 crash types for balanced coverage", correct: false, explanation: "This is 'peanut-buttering' — spreading effort evenly. It's inefficient because the engineer fixing a crash type with 5 occurrences generates 144x less impact than the one fixing a type with 720/3 = 240 occurrences." },
          { text: "Focus on the rarest crash types — they might indicate more serious underlying issues", correct: false, explanation: "While rare crashes can indicate serious issues, Pareto says to prioritize by impact. A crash type with 240 occurrences affects 240 users. A rare crash affecting 5 users should wait unless its severity (data loss, security) is disproportionately high." },
          { text: "Don't prioritize — fix them in the order they were reported", correct: false, explanation: "First-come-first-served ignores impact. A crash reported early but affecting 3 users should not be prioritized over a later-reported crash affecting 240 users. Use data, not chronology." }
        ]
      }
    ]
  }
]
  },
  {
    id: "strategy", title: "Strategy", icon: "♟️",
    skills: [
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
]
  },
  {
    id: "growth", title: "Growth", icon: "📈",
    skills: [
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
]
  },
  {
    id: "casestudies", title: "Case Studies", icon: "💼",
    skills: [
  {
    id: "superhuman",
    title: "Superhuman's PMF Engine",
    locked: false,
    lessons: [
      {
        type: "scenario",
        title: "The Churn Problem",
        body: "You are the founder of Superhuman. You have built an incredibly fast email client with beautiful design and a ton of keyboard shortcuts. Early users love the aesthetic and speed.\n\nHowever, you are noticing a problem: growth is stalling and churn is uncomfortably high. You've been building features endlessly, hoping that the 'next feature' will be the one that finally makes the product stick, but it's not working.\n\nYou need a systematic way to measure, understand, and increase Product-Market Fit (PMF) before you run out of money.",
        keyTakeaway: "Product-Market Fit isn't just a feeling; it can be systematically measured and engineered."
      },
      {
        type: "mcq",
        prompt: "To measure your baseline Product-Market Fit, you decide to send a survey to your active users. Which of the following is the most effective single question to ask?",
        options: [
          { text: "On a scale of 1-10, how likely are you to recommend Superhuman to a friend or colleague? (NPS)", correct: false, explanation: "NPS is a lagging indicator and better suited for mature products, not for finding initial PMF." },
          { text: "How disappointed would you be if you could no longer use Superhuman? (Very, Somewhat, Not disappointed)", correct: true, explanation: "This is the Sean Ellis test. It directly measures how much users rely on your product. If >=40% say 'very disappointed', you likely have PMF." },
          { text: "What is the primary reason you use Superhuman?", correct: false, explanation: "While useful for qualitative feedback, this doesn't give you a hard metric on PMF." },
          { text: "How much would you be willing to pay for this product?", correct: false, explanation: "Pricing is important, but if you don't have PMF yet, pricing optimization is premature." }
        ]
      },
      {
        type: "mcq",
        prompt: "The survey results are in: 22% say 'Very disappointed', 52% say 'Somewhat disappointed', and 26% say 'Not disappointed'. You need to hit the 40% threshold for PMF. What should you do with the survey data?",
        options: [
          { text: "Focus entirely on the 'Not disappointed' users to figure out why they don't like the product.", correct: false, explanation: "These users likely don't need your product or aren't your target persona. Trying to please them will pull you away from PMF." },
          { text: "Build new features that your competitors have to attract more users to the 'Very disappointed' group.", correct: false, explanation: "Feature parity rarely drives PMF; it just creates bloat." },
          { text: "Filter the survey results to ONLY look at the 'Very disappointed' users to understand who your true target demographic is.", correct: true, explanation: "Your 'Very disappointed' users are your core demographic. By profiling them, you can narrow your marketing and product focus to just people like them." },
          { text: "Lower the price to artificially boost satisfaction metrics.", correct: false, explanation: "Price is rarely the root cause of lacking PMF in a productivity tool." }
        ]
      },
      {
        type: "mcq",
        prompt: "After analyzing your 'Very disappointed' users (the ones who love you), you find they value speed and keyboard shortcuts. Now, you need to convert the 'Somewhat disappointed' users. Which 'Somewhat disappointed' users should you focus on?",
        options: [
          { text: "All of them, to maximize potential market size.", correct: false, explanation: "Trying to please everyone will dilute your product's focus." },
          { text: "Only the ones who asked for features that are easy to build.", correct: false, explanation: "Easy features aren't necessarily the ones holding back PMF." },
          { text: "The ones whose main use-case aligns with your 'Very disappointed' users, but who are held back by a specific missing feature (like mobile app or integrations).", correct: true, explanation: "These users share the same core needs as your most passionate users, but face a specific blocker. Removing that blocker converts them into 'Very disappointed' (passionate) users." },
          { text: "The ones who complain the loudest on social media.", correct: false, explanation: "Loudest doesn't mean most strategic." }
        ]
      },
      {
        type: "mcq",
        prompt: "You now know what your core users love (speed) and what is holding back your on-the-fence users (no mobile app). How should you allocate your engineering roadmap?",
        options: [
          { text: "100% on building the mobile app to convert the 'Somewhat disappointed' users.", correct: false, explanation: "If you stop improving what your core users love, competitors will catch up and you'll lose your edge." },
          { text: "100% on making the app even faster to make the 'Very disappointed' users even happier.", correct: false, explanation: "You won't grow if you don't unblock the 'Somewhat disappointed' users." },
          { text: "50% on doubling down on what users love (speed/shortcuts), and 50% on addressing the main blockers (mobile app).", correct: true, explanation: "This is the Superhuman PMF engine: double down on what people love, and systematically remove the blockers for the on-the-fence users." },
          { text: "Halt all feature development and focus purely on marketing to find more users.", correct: false, explanation: "Marketing a leaky bucket wastes money." }
        ]
      },
      {
        type: "mcq",
        prompt: "You execute this roadmap for a quarter. What is the final step in the PMF engine process?",
        options: [
          { text: "Declare victory and start scaling paid acquisition immediately.", correct: false, explanation: "You don't know if the needle actually moved yet." },
          { text: "Continuously re-survey new users with the Sean Ellis test to track if the 'Very disappointed' metric is approaching or exceeding 40%.", correct: true, explanation: "The PMF engine is a continuous loop. You measure, segment, build, and re-measure until you consistently hit >40%." },
          { text: "Stop surveying users because you already have your roadmap.", correct: false, explanation: "You lose your compass if you stop measuring." },
          { text: "Pivot to enterprise sales.", correct: false, explanation: "Premature scaling without confirmed PMF." }
        ]
      }
    ]
  },
  {
    id: "netflix",
    title: "The Netflix Qwikster Split",
    locked: false,
    lessons: [
      {
        type: "scenario",
        title: "The Innovator's Dilemma",
        body: "The year is 2011. You are the CEO of Netflix. For years, you have offered a bundled service: customers pay $10/month and get both DVD-by-mail and unlimited streaming.\n\nHowever, the landscape is shifting. Streaming content licensing costs are skyrocketing. Meanwhile, the DVD business is highly profitable but slowly dying. You realize that keeping them bundled forces streaming to subsidize DVDs, and masks the true cost of streaming.\n\nYou want to split the businesses, name the DVD service 'Qwikster', and charge separately for each ($7.99 for streaming, $7.99 for DVDs). This means a 60% price increase for customers who want both.",
        keyTakeaway: "Pricing changes and product unbundling carry immense brand risk, even if they make long-term financial sense."
      },
      {
        type: "mcq",
        prompt: "You know this price hike will upset customers. How should you frame the communication regarding the Qwikster split?",
        options: [
          { text: "Quietly change the pricing in the terms of service and hope nobody notices.", correct: false, explanation: "Customers always notice billing changes; trying to hide it destroys trust." },
          { text: "Send a transparent, humble email from the CEO explaining that separating the businesses allows them to innovate faster in streaming, even though prices are changing.", correct: true, explanation: "While still painful, owning the decision directly and explaining the 'why' (better streaming) is the only viable PR strategy." },
          { text: "Blame the content studios for raising licensing fees.", correct: false, explanation: "Passing the blame looks weak and doesn't appease customers who just see a higher bill." },
          { text: "Offer a lifetime discount to existing customers.", correct: false, explanation: "This defeats the entire financial purpose of the price correction." }
        ]
      },
      {
        type: "mcq",
        prompt: "The announcement goes live. The backlash is immediate and catastrophic. You lose 800,000 subscribers in one quarter and the stock drops 75%. How should you react to the Qwikster branding?",
        options: [
          { text: "Hold firm. The PR storm will pass.", correct: false, explanation: "The brand damage of 'Qwikster' was becoming an existential threat." },
          { text: "Kill the Qwikster brand and re-integrate the DVD service under the Netflix name, but keep the separate pricing structure.", correct: true, explanation: "Netflix famously reversed the Qwikster spin-off just weeks later, keeping everything under Netflix, but maintained the separate pricing which was necessary for survival." },
          { text: "Revert the pricing back to the $10 bundle.", correct: false, explanation: "This would bankrupt the company given the rising streaming costs." },
          { text: "Fire the executive team to appease Wall Street.", correct: false, explanation: "Reactionary firings don't solve the underlying unit economics." }
        ]
      },
      {
        type: "mcq",
        prompt: "In hindsight, the Qwikster split is considered a classic example of a 'Two-Way Door' decision. What does this mean?",
        options: [
          { text: "A decision that benefits both the company and the consumer.", correct: false, explanation: "This decision clearly didn't benefit consumers in the short term." },
          { text: "A decision that can be reversed if it goes poorly.", correct: true, explanation: "Jeff Bezos popularized this framework. Rebranding to Qwikster was a two-way door (reversible). Netflix walked through it, saw the disaster, and walked back out by killing Qwikster." },
          { text: "A decision that requires board approval.", correct: false, explanation: "Not what the framework means." },
          { text: "A decision that doubles revenue.", correct: false, explanation: "Not what the framework means." }
        ]
      },
      {
        type: "mcq",
        prompt: "Despite the massive short-term PR disaster, what was the long-term strategic result of unbundling the pricing in 2011?",
        options: [
          { text: "Netflix eventually went bankrupt.", correct: false, explanation: "Netflix is currently one of the most valuable media companies in the world." },
          { text: "It allowed Netflix to fund original content (like House of Cards) because streaming now had standalone, accurate unit economics.", correct: true, explanation: "Ripping the band-aid off in 2011 gave Netflix the cash flow and clear metrics needed to transition into a studio, securing their future." },
          { text: "DVDs became their primary revenue driver again.", correct: false, explanation: "DVDs continued their planned, slow decline." },
          { text: "Competitors stole all their streaming market share.", correct: false, explanation: "Netflix maintained a dominant lead for nearly a decade." }
        ]
      },
      {
        type: "mcq",
        prompt: "What is the primary product management lesson from the Qwikster debacle?",
        options: [
          { text: "Never raise prices.", correct: false, explanation: "Companies must raise prices as value and costs increase." },
          { text: "Always A/B test pricing changes.", correct: false, explanation: "You cannot easily A/B test a massive, brand-level unbundling." },
          { text: "Sometimes you have to endure severe short-term pain to position the product for long-term survival, but you must be willing to correct unforced errors (like the Qwikster name).", correct: true, explanation: "The pricing split was necessary pain; the Qwikster rebrand was an unforced error they correctly reversed." },
          { text: "Customers always know what they want.", correct: false, explanation: "Customers wanted the $10 bundle forever, which was financially impossible." }
        ]
      }
    ]
  },
  {
    id: "tinder",
    title: "Tinder's Cold Start Problem",
    locked: false,
    lessons: [
      {
        type: "scenario",
        title: "The Empty Dance Floor",
        body: "You are launching a new dating app called Tinder. The core mechanic is simple: swipe right if you like them, swipe left if you don't. If you both swipe right, it's a match.\n\nHowever, you face a brutal 'Cold Start Problem'. A dating app without users has zero value. If a new user downloads the app, opens it, and sees 'No one is around you', they will churn immediately and never come back.\n\nYou cannot rely on organic search or paid ads, because gaining 100 users spread across the entire United States creates zero matches. You need a highly concentrated, localized strategy.",
        keyTakeaway: "Two-sided marketplaces require high localized density, not just sheer scale, to create liquidity."
      },
      {
        type: "mcq",
        prompt: "To solve the cold start problem, you need to artificially create network density. Which geographic strategy should you choose?",
        options: [
          { text: "Run Facebook ads targeting all singles ages 18-35 across the USA.", correct: false, explanation: "This spreads users too thin. Two users 500 miles apart cannot match." },
          { text: "Focus entirely on one specific college campus (e.g., USC) to launch.", correct: true, explanation: "By focusing on a single, dense, highly social micro-network (USC campus), you ensure that when someone opens the app, they see people they know or recognize, creating instant value." },
          { text: "Launch in the top 5 biggest global cities simultaneously.", correct: false, explanation: "Even a massive city is too sparse for an initial launch. You need hyper-density." },
          { text: "Partner with a national television network.", correct: false, explanation: "Too expensive and lacks the geographic concentration needed for initial liquidity." }
        ]
      },
      {
        type: "mcq",
        prompt: "You've chosen a college campus. Dating apps are two-sided marketplaces (supply and demand). In heterosexual dating dynamics, which 'side' of the market should you seed first to create the strongest network effects?",
        options: [
          { text: "Men, because they are historically early adopters of technology.", correct: false, explanation: "In dating dynamics, an app full of only men usually fails to attract women." },
          { text: "Both sides simultaneously, perfectly balanced.", correct: false, explanation: "Ideal, but nearly impossible to execute organically." },
          { text: "Women, because driving high-quality female supply organically attracts male demand.", correct: true, explanation: "Tinder's early team famously went to sororities first to onboard women. Once the women were on the app, they went to fraternities and showed the men who was on it, instantly driving male adoption." },
          { text: "Alumni, because they have more disposable income.", correct: false, explanation: "Alumni are not geographically dense on campus." }
        ]
      },
      {
        type: "mcq",
        prompt: "You need a 'growth hack' to get the first 500 users on campus overnight. What is the most effective tactic?",
        options: [
          { text: "Throw an exclusive launch party at a popular venue, where the only way to get in is to show the downloaded Tinder app on your phone.", correct: true, explanation: "This 'manufactures' liquidity. Hundreds of socially active people download the app simultaneously in the same room. They open it, see everyone at the party, and immediately start matching." },
          { text: "Pay students $5 to download the app.", correct: false, explanation: "Incentivized downloads lead to instant churn once the money is paid." },
          { text: "Hand out flyers in the library.", correct: false, explanation: "Low conversion rate and targets users in an anti-social setting." },
          { text: "Buy billboard space near the campus.", correct: false, explanation: "Brand awareness doesn't solve the immediate cold start activation problem." }
        ]
      },
      {
        type: "mcq",
        prompt: "The campus launch is a huge success. The app is highly liquid at USC. What is your strategy for scaling?",
        options: [
          { text: "Now you can run national TV ads since the app works.", correct: false, explanation: "The app only works at USC. Users in Texas will still see an empty screen." },
          { text: "Wait for organic word-of-mouth to spread across the country naturally.", correct: false, explanation: "Organic spread is too slow and risks losing momentum." },
          { text: "Repeat the exact same hyper-local 'party/sorority' playbook node-by-node at other major colleges across the country.", correct: true, explanation: "Tinder scaled by treating every college campus as a separate cold-start problem, running the exact same manual playbook until the networks eventually overlapped." },
          { text: "Pivot to a paid subscription model immediately.", correct: false, explanation: "Premature monetization kills network effect growth." }
        ]
      },
      {
        type: "mcq",
        prompt: "Tinder's early growth highlights the difference between 'Scale' and 'Density'. Which of the following is true?",
        options: [
          { text: "Scale (total users) is more important than Density (users in a specific area) for a social app.", correct: false, explanation: "1 million users spread globally is useless for dating." },
          { text: "Density creates liquidity; Scale is just the accumulation of dense nodes over time.", correct: true, explanation: "For a hyperlocal marketplace, having 1,000 users in a 1-mile radius (density) is infinitely more valuable than 10,000 users in a 1,000-mile radius (scale)." },
          { text: "Density only matters for hardware products.", correct: false, explanation: "Incorrect." },
          { text: "Scale inherently solves the cold start problem.", correct: false, explanation: "Scale is the result of solving the cold start problem, not the cause." }
        ]
      }
    ]
  }
]
  }
];
