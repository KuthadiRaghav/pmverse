export const FOUNDATIONS_DOMAIN = {
  id: "foundations", 
  title: "Product Foundations", 
  icon: "🏗️",
  lucideIcon: "Briefcase",
  skills: [
    {
      id: "agile",
      title: "Agile & Scrum",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "The Spotify Challenge: Agile vs Waterfall",
          body: "Imagine you are the Product Manager for **Spotify Discover Weekly**.\n\nYou have an idea: users might love an AI-generated playlist that updates every Monday. Your engineering lead tells you they can build it, but it will take 9 months to perfect the recommendation algorithm, build the UI, and scale the infrastructure.\n\n> \"If we wait 9 months, we might spend $1M building something nobody wants,\" you reply.\n\nThis is the core problem **Agile** solves.\n\nInstead of a 9-month **Waterfall** plan (where you design everything upfront, build it all, and then test it at the very end), you propose an **Agile** approach:\n\n1. **Week 1-2**: Send a static email with 30 song recommendations to 1,000 users.\n2. **Week 3**: Analyze open and click rates. Do users even want this?\n3. **Week 4-6**: Build a basic, hardcoded playlist in the app for 10,000 users.\n4. **Week 7+**: Slowly automate the algorithm and scale up.\n\nAgile is not a specific methodology; it is a mindset prioritizing **speed to market, user feedback, and adaptability** over rigid planning.",
          keyTakeaway: "Agile prioritizes delivering small increments of value quickly to validate assumptions, rather than waiting for a massive, risky 'big bang' launch."
        },
        {
          type: "mcq",
          prompt: "If your team is following an Agile mindset, what is the best way to validate a new feature idea?",
          options: [
            {
              text: "Write a 50-page Product Requirements Document (PRD) detailing every edge case before starting development.",
              correct: false,
              explanation: "This is a classic Waterfall approach. Agile values working software and customer feedback over comprehensive documentation."
            },
            {
              text: "Build a minimal, testable version of the feature in a few weeks and get it into the hands of a small group of users.",
              correct: true,
              explanation: "Correct! Agile emphasizes iterative development and fast feedback loops."
            },
            {
              text: "Wait until the feature is 100% bug-free and fully polished before letting anyone see it.",
              correct: false,
              explanation: "Agile embraces releasing imperfect (but functional) increments early to validate if you are building the right thing."
            }
          ]
        },
        {
          type: "teach",
          title: "Scrum Roles: The Three Pillars",
          body: "While Agile is the mindset, **Scrum** is the most popular framework to execute it. In Scrum, there are exactly three roles:\n\n### 1. Product Owner (PO)\n*That's usually you, the PM.*\n- You own the **Product Backlog** (the master to-do list).\n- You prioritize work based on business value.\n- You define **WHAT** needs to be built and **WHY**.\n\n### 2. Development Team\n*The engineers and designers.*\n- They are self-organizing.\n- They decide **HOW** to build the feature.\n- They determine how much work they can realistically take on in a given period.\n\n### 3. Scrum Master (SM)\n*The process coach.*\n- They are a servant-leader, not a boss.\n- They facilitate meetings and remove roadblocks (impediments) for the team.\n- They ensure the team is following Scrum principles.",
          keyTakeaway: "The Product Owner decides WHAT to build. The Dev Team decides HOW to build it. The Scrum Master ensures the process runs smoothly."
        },
        {
          type: "mcq",
          prompt: "The CEO bursts into your office and demands a new feature be built immediately, bypassing the planned work. Who should handle this request?",
          options: [
            {
              text: "The Scrum Master, to protect the team's process.",
              correct: false,
              explanation: "While the Scrum Master protects the team from distractions, the decision of WHAT gets built (prioritization) belongs to the Product Owner."
            },
            {
              text: "The Lead Engineer, to evaluate if it's technically possible.",
              correct: false,
              explanation: "The Dev team handles technical execution, but they do not manage the priority of the backlog."
            },
            {
              text: "The Product Owner, to evaluate its priority against the rest of the backlog.",
              correct: true,
              explanation: "Correct! The PO is the gatekeeper of the Product Backlog and must weigh the CEO's request against existing priorities."
            }
          ]
        },
        {
          type: "scenario",
          title: "User Stories & Acceptance Criteria",
          body: "You want to add a feature to Spotify that allows users to collaborate on playlists.\n\nInstead of writing a dry technical requirement like *\"Implement concurrent database writes for playlist entity array,\"* Agile teams use **User Stories** to keep the focus on the customer.\n\n**The standard format is:**\n> \"As a [type of user], I want [an action], so that [a benefit].\"\n\n**Example:**\n> \"As a *Spotify Free user*, I want *to invite friends to add songs to my playlist*, so that *we can build a party mix together*.\"\n\n### Acceptance Criteria\nHow do the engineers know when the story is \"done\"? You provide Acceptance Criteria:\n1. The user can generate a unique invite link.\n2. When a friend clicks the link, they are added as a collaborator.\n3. Collaborators can search and add songs.\n4. The original creator can remove collaborators.",
          keyTakeaway: "User stories frame technical work in terms of customer value. Acceptance criteria define exactly what must be true for the work to be considered complete."
        },
        {
          type: "sprint",
          title: "Write a User Story",
          brief: "You are the PM for **Uber Eats**. You want to build a feature that lets users track the real-time GPS location of their delivery driver on a map.\n\nWrite a properly formatted User Story for this feature, followed by at least 3 Acceptance Criteria.",
          questions: [
            {
              q: "User Story & Acceptance Criteria",
              hint: "Use the 'As a... I want... so that...' format.",
              rubric: [
                { match: /as\s+a\s+(user|customer|diner|eater)/i, points: 2, note: "Specified the user persona." },
                { match: /i\s+want\s+to\s+(track|see|view|watch).*(location|gps|driver|courier|map)/i, points: 3, note: "Specified the action (tracking the driver)." },
                { match: /so\s+that\s+I\s+(know|can|am|plan).*(when|time|arrive|ready|expect)/i, points: 2, note: "Specified the benefit (knowing when food arrives)." },
                { match: /criteria|1\.|- /im, points: 3, note: "Provided acceptance criteria." }
              ],
              model: "**User Story:** As a hungry customer, I want to see my delivery driver's real-time GPS location on a map, so that I know exactly when to go outside to meet them.\n\n**Acceptance Criteria:**\n1. A map UI appears once the driver picks up the food.\n2. The driver's location updates at least every 10 seconds.\n3. The app displays an estimated time of arrival (ETA) based on traffic."
            }
          ]
        }
      ]
    },
    {
      id: "kanban",
      title: "Kanban vs Scrum",
      locked: false,
      lessons: [
        {
          type: "teach",
          title: "The Constraints of Scrum",
          body: "Scrum is built around **Sprints**—typically 2-week cycles where the team commits to a fixed set of work.\n\nBut what if your team handles IT support tickets? Or critical bug fixes? Or live operations? You can't tell a customer whose server is down: *\"Sorry, we'll put that in the backlog and get to it next sprint.\"*\n\nThis is where **Kanban** comes in.",
          keyTakeaway: "Scrum uses timeboxed sprints with fixed scope. This doesn't work well for teams dealing with continuous, unpredictable streams of urgent work."
        },
        {
          type: "teach",
          title: "Kanban: Flow over Timeboxes",
          body: "Kanban is a continuous flow framework. There are no sprints, no sprint planning, and no sprint reviews.\n\nInstead, work flows across a visual **Kanban Board** with columns like:\n`[ To Do ] -> [ In Progress ] -> [ Code Review ] -> [ Done ]`\n\nThe most critical rule in Kanban is **WIP Limits (Work In Progress Limits)**.\n\nIf the `[ In Progress ]` column has a WIP Limit of 3, the team cannot start a 4th task until one of the current tasks moves to `[ Code Review ]`.\n\nThis prevents context-switching, forces the team to finish what they start, and quickly highlights bottlenecks (e.g., if tasks always pile up in Code Review, you need more reviewers).",
          keyTakeaway: "Kanban eliminates sprints in favor of a continuous flow of work, regulated strictly by limits on how many items can be in progress at once."
        },
        {
          type: "mcq",
          prompt: "You manage a DevOps team that fields urgent infrastructure alerts, random developer requests, and routine server maintenance. Which framework is a better fit?",
          options: [
            {
              text: "Scrum, because it will force the urgent alerts to be scheduled properly.",
              correct: false,
              explanation: "Urgent alerts can't wait for a 2-week planning cycle. Scrum's rigid timeboxes will break under unpredictable workloads."
            },
            {
              text: "Kanban, because it allows the team to continuously pull in the highest priority task as soon as they have capacity.",
              correct: true,
              explanation: "Correct! Kanban is perfect for operational teams dealing with unpredictable, continuous streams of work."
            }
          ]
        }
      ]
    }
  ]
};

export const STRATEGY_DOMAIN = {
  id: "strategy",
  title: "Product Strategy & Roadmaps",
  icon: "🗺️",
  lucideIcon: "Compass",
  skills: [
    {
      id: "vision",
      title: "Vision & Strategy",
      locked: false,
      lessons: [
        {
          type: "scenario",
          title: "Vision vs. Strategy vs. Tactics",
          body: "Imagine you are the CEO of **Tesla in 2006**.\n\nMany PMs confuse Vision, Strategy, and Tactics. Here is how they differ:\n\n### 1. The Vision (The 'Why')\nYour ultimate destination. It should be inspiring and rarely change.\n> *Tesla's Vision:* \"To accelerate the world's transition to sustainable energy.\"\n\n### 2. The Strategy (The 'How')\nThe specific path you will take to achieve the vision, given your constraints (limited money, brand awareness, technology).\n> *Tesla's Strategy:* Build an expensive sports car (Roadster) -> Use that money to build an affordable luxury sedan (Model S) -> Use that money to build a mass-market car (Model 3).\n\n### 3. Tactics (The 'What')\nThe actual features, sprints, and daily execution.\n> *Tesla's Tactics:* Designing the battery pack architecture, building a Supercharger network, creating the infotainment software.",
          keyTakeaway: "Vision is the destination. Strategy is the route you choose. Tactics are the steps you take."
        },
        {
          type: "mcq",
          prompt: "Which of the following sounds most like a Product Strategy?",
          options: [
            {
              text: "To become the world's most beloved pet care brand.",
              correct: false,
              explanation: "This is a Vision statement. It's an inspiring destination, but it doesn't explain HOW you plan to win."
            },
            {
              text: "We will launch a referral program next quarter to boost acquisition by 15%.",
              correct: false,
              explanation: "This is a Tactic. It's a specific execution plan for a short-term goal."
            },
            {
              text: "We will focus exclusively on urban millennials by partnering with high-end apartment complexes, using B2B distribution to bypass expensive consumer marketing.",
              correct: true,
              explanation: "Correct! This is a Strategy. It defines a specific target market, a unique distribution channel, and a clear reason why it gives you an advantage."
            }
          ]
        }
      ]
    },
    {
      id: "roadmaps",
      title: "Modern Roadmapping",
      locked: false,
      lessons: [
        {
          type: "teach",
          title: "The Problem with Timeline Roadmaps",
          body: "The traditional way to plan software was the **Gantt Chart**—a visual timeline stating exactly what features would be delivered on what specific dates over the next 12 months.\n\n**Why this fails in modern software:**\n1. **You are guessing:** Estimating complex software months in advance is notoriously inaccurate.\n2. **Feature Factories:** Teams become obsessed with hitting arbitrary launch dates rather than solving actual customer problems.\n3. **No room for learning:** If you launch a feature in Q1 and realize it needs major tweaks, you can't fix it because Q2 is already fully booked with other promises.\n\nModern product companies have largely abandoned strict 12-month feature timelines.",
          keyTakeaway: "Timeline roadmaps trap teams into delivering predetermined features on arbitrary dates, destroying their ability to adapt to customer feedback."
        },
        {
          type: "scenario",
          title: "The Now-Next-Later Roadmap",
          body: "The gold standard for modern Agile teams is the **Now-Next-Later** roadmap.\n\nInstead of specific dates, it organizes work by time horizons and certainty:\n\n### 🟢 NOW (Next 1-3 months)\n- **What it is:** What the team is actively building today.\n- **Certainty:** Very high. Granular features and specific epics.\n- *Example: \"Release Stripe integration for UK users.\"*\n\n### 🟡 NEXT (3-6 months)\n- **What it is:** What we plan to tackle once 'Now' is finished.\n- **Certainty:** Medium. Broad problems to solve, rather than specific features.\n- *Example: \"Improve international payment conversion rates.\"*\n\n### 🔴 LATER (6+ months)\n- **What it is:** Long-term strategic initiatives and dreams.\n- **Certainty:** Very low. These might change completely.\n- *Example: \"Expand into the APAC market.\"*",
          keyTakeaway: "Now-Next-Later roadmaps communicate strategic priorities without locking the team into rigid, impossible-to-predict deadlines."
        }
      ]
    }
  ]
};
