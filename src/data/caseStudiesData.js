export const NEW_CASE_STUDIES_DOMAIN = {
  id: "case-studies", title: "Case Studies", icon: "📖",
  skills: [
    {
      id: "case_superhuman",
      title: "Superhuman's PMF Engine",
      description: "How Superhuman achieved product-market fit with a relentless focus on speed and UX.",
      time: "12 mins",
      difficulty: "Beginner",
      icon: "Zap", // Lucide icon name
      color: "#8b5cf6", // Purple
      locked: false,
      resources: [
        { name: "Case Brief", type: "PDF" },
        { name: "Data Sheet", type: "CSV" },
        { name: "Example Frameworks", type: "PDF" }
      ],
      steps: [
        {
          id: "understand",
          title: "Understand the problem",
          subtitle: "Read the case description carefully and make sure you understand the context.",
          situation: "Superhuman is an email application with a mission to make email faster and more efficient.\n\nThey have grown to 100K+ users, but growth has recently plateaued.\n\nAs a PM, how would you help Superhuman achieve product-market fit (PMF)?",
          tip: "Start by asking clarifying questions. Understand the business, users, and current metrics before jumping to solutions.",
          prompt: "What would be your first step?",
          hints: [
            "What do we know about Superhuman's users?",
            "What metrics would you look at first?",
            "What could be causing the plateau?"
          ],
          modelAnswer: "The first step is to measure current Product-Market Fit. I would use the Sean Ellis test: ask users 'How would you feel if you could no longer use Superhuman?' and measure the percentage who answer 'Very Disappointed'. The goal is >40%."
        },
        {
          id: "analyze",
          title: "Analyze the data",
          subtitle: "Look at the survey results.",
          situation: "You ran the Sean Ellis test. The results are in:\n- 22% Very Disappointed\n- 52% Somewhat Disappointed\n- 26% Not Disappointed\n\nYou are well below the 40% threshold for PMF.",
          tip: "Don't panic. The 'Somewhat Disappointed' group holds the key. How do you segment the users to find your core engine?",
          prompt: "How would you segment this data to find a path to 40%?",
          hints: [
            "Who are the people that love the product the most?",
            "What do the 'Very Disappointed' users have in common?",
            "How can you find the High Expectation Customer (HXC)?"
          ],
          modelAnswer: "I would segment the survey data by persona. I want to isolate the profile of the users who answered 'Very Disappointed'. By identifying the role, industry, and use-case of our biggest fans, we can redefine our target market and narrow our focus to only serve that specific High Expectation Customer."
        },
        {
          id: "solve",
          title: "Formulate a Solution",
          subtitle: "Build the roadmap.",
          situation: "You found that Founders, Managers, and Executives are your core users. Now you need to turn the 'Somewhat Disappointed' users in that segment into 'Very Disappointed' users (i.e., they would be very disappointed if they lost the product).",
          tip: "To improve a product, you must double down on what people love, and fix what holds others back.",
          prompt: "What two questions should you ask the survey respondents to build your roadmap?",
          hints: [
            "How do you find out what's working?",
            "How do you find out what's missing?"
          ],
          modelAnswer: "1. 'What is the main benefit you receive from Superhuman?' (Ask the Very Disappointed group to know what to double down on).\n2. 'How can we improve Superhuman for you?' (Ask the Somewhat Disappointed group to know what is holding them back)."
        },
        {
          id: "review",
          title: "Review & Retrospective",
          subtitle: "Summarize your learnings.",
          situation: "Superhuman used this exact process to build their PMF Engine. By constantly surveying, segmenting by the HXC, doubling down on what they loved (Speed), and fixing what held others back (Mobile app), they increased their PMF score from 22% to 58%.",
          tip: "Product-Market Fit is not a binary state; it is a metric you can optimize.",
          prompt: "What is your biggest takeaway from this case?",
          hints: [
            "Reflect on the methodology."
          ],
          modelAnswer: "PMF can be engineered. Instead of guessing, you can systematically measure PMF, segment your users to find your true target market, and build a roadmap directly from the feedback of your most important users."
        }
      ]
    },
    {
      id: "case_netflix",
      title: "The Netflix Qwikster Split",
      description: "Deep dive into Netflix's bold pivot decision and what product managers can learn.",
      time: "12 mins",
      difficulty: "Intermediate",
      icon: "Film",
      color: "#e50914", // Netflix red
      locked: false,
      resources: [
        { name: "Press Release", type: "PDF" },
        { name: "Financials 2011", type: "CSV" }
      ],
      steps: [
        {
          id: "understand",
          title: "Understand the problem",
          subtitle: "Netflix is splitting in two.",
          situation: "It's 2011. Netflix offers a hybrid plan: $10/month for unlimited streaming AND DVDs by mail. CEO Reed Hastings announces a split: Streaming will remain Netflix ($8/mo), and DVDs will become a new company called Qwikster ($8/mo). Total cost for both is now $16/mo (a 60% price hike).",
          tip: "Consider the strategic rationale vs the user experience impact.",
          prompt: "Why did Netflix leadership think this was a good idea strategically?",
          hints: ["What was the future of media?", "How do the cost structures of streaming vs mail differ?"],
          modelAnswer: "Strategically, streaming was the inevitable future. Bundling it with dying physical media slowed down the streaming business. Separating them allowed Netflix to focus 100% of its engineering and content budget on streaming, without the anchor of the DVD logistics business."
        },
        {
          id: "analyze",
          title: "Analyze the fallout",
          subtitle: "The market reacts.",
          situation: "The backlash is catastrophic. 800,000 subscribers cancel. The stock drops 75% in a few months.",
          tip: "Look at this from the user's perspective, not the CEO's.",
          prompt: "What was the fundamental UX failure of this decision?",
          hints: ["How many websites did the user have to visit?", "How did billing work?"],
          modelAnswer: "The UX was completely broken. Users now had to manage two separate queues, on two separate websites, with two separate credit card charges, and ratings didn't sync between them. Netflix optimized for their own corporate structure instead of the customer's experience."
        },
        {
          id: "solve",
          title: "The Reversal",
          subtitle: "Fixing the mistake.",
          situation: "You are brought in as a crisis PM. The Qwikster launch is pending.",
          tip: "You need to stop the bleeding while preserving the long-term strategy of moving to streaming.",
          prompt: "What do you recommend doing in the next 24 hours?",
          hints: ["Do you stick to the plan?", "Do you revert the price hike?"],
          modelAnswer: "1. Cancel the Qwikster spin-off immediately (keep DVDs under the Netflix brand/website to maintain a unified UX). 2. Keep the pricing split ($8 streaming, $8 DVD) to maintain the strategic shift toward streaming economics, but apologize for the poor communication."
        },
        {
          id: "review",
          title: "Review",
          subtitle: "The aftermath.",
          situation: "Netflix actually did cancel Qwikster just weeks later. They kept the price change. They survived the churn and became a streaming behemoth.",
          tip: "Think about the balance between strategy and UX.",
          prompt: "What is the key PM lesson here?",
          hints: ["Company structure vs Product structure."],
          modelAnswer: "Never ship your org chart. A strategic business pivot must still be delivered through a seamless, unified user experience. You can change your pricing and business model, but you cannot introduce massive friction into a daily habit without severe consequences."
        }
      ]
    },
    {
      id: "case_tinder",
      title: "Tinder's Cold Start Problem",
      description: "Explore how Tinder solved the chicken-and-egg problem to build a thriving marketplace.",
      time: "12 mins",
      difficulty: "Beginner",
      icon: "Flame",
      color: "#fd297b", // Tinder pink/red
      locked: false,
      resources: [
        { name: "Growth Tactics", type: "PDF" },
        { name: "User Density Data", type: "CSV" }
      ],
      steps: [
        {
          id: "understand",
          title: "Understand the problem",
          subtitle: "The classic marketplace dilemma.",
          situation: "You are launching Tinder. Like all dating apps, it requires a two-sided marketplace. Women won't join if there are no men, and men won't join if there are no women. Worse, it's hyper-local: 10,000 users in NY don't help a user in LA.",
          tip: "This is the 'Cold Start Problem'. You need a high density of users in a specific location at the exact same time.",
          prompt: "How would you solve the initial cold start problem for a hyperlocal dating app?",
          hints: ["Where are dense populations of young, highly-social people?", "How can you artificially constrain the launch?"],
          modelAnswer: "I would launch at a college campus. College campuses provide extreme geographic density, high social connectivity, and a demographic perfectly suited for a mobile dating app. You can dominate one campus before expanding."
        },
        {
          id: "analyze",
          title: "Analyze the tactic",
          subtitle: "The Sorority Pitch.",
          situation: "Whitney Wolfe Herd (Tinder co-founder) famously toured college sororities, pitched the app, had all the women install it, and then went to the fraternities and showed them the app was full of women.",
          tip: "Think about supply and demand in a dating marketplace.",
          prompt: "Why was this specific sequencing (Sorority first, Fraternity second) critical to success?",
          hints: ["Which side of the market is the 'hard side'?"],
          modelAnswer: "In a dating marketplace, women are typically the 'hard side' of the network to acquire and retain. By securing the hard side of the supply first (sororities), acquiring the demand side (fraternities) became incredibly easy. If they pitched fraternities first, they would have churned immediately upon seeing an empty app."
        },
        {
          id: "solve",
          title: "Sustaining the Network",
          subtitle: "Moving beyond manual acquisition.",
          situation: "The campus-by-campus manual tour worked to seed the network, but it doesn't scale globally.",
          tip: "You need a product feature that creates a viral loop.",
          prompt: "What core product feature of Tinder was designed specifically to drive viral word-of-mouth growth?",
          hints: ["Think about the core interaction.", "What makes someone want to show the app to a friend?"],
          modelAnswer: "The 'Swipe' mechanic. It turned dating into a single-player game that was fun to do with friends. People would pass their phones around at bars to swipe for each other. It gamified the experience, making it a highly visible, social activity that drove viral acquisition."
        },
        {
          id: "review",
          title: "Review",
          subtitle: "Marketplace dynamics.",
          situation: "Tinder grew into a global behemoth by conquering micro-networks (campuses) one by one until the networks overlapped.",
          tip: "Network effects are powerful, but hard to start.",
          prompt: "Summarize the playbook for starting a hyperlocal network effect.",
          hints: ["Constrain, Supply, Viral."],
          modelAnswer: "1. Constrain the market to a tiny, hyper-dense node (a campus). 2. Manually acquire the 'hard side' of the network first. 3. Use the hard side to easily acquire the demand side. 4. Build a highly shareable, gamified core loop to scale organically from there."
        }
      ]
    }
  ]
};
