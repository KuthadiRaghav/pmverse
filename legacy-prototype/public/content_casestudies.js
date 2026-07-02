const CASE_STUDIES_CONTENT = [
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
];

// Optionally export if used in a module system
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CASE_STUDIES_CONTENT };
} else if (typeof window !== 'undefined') {
  window.CASE_STUDIES_CONTENT = CASE_STUDIES_CONTENT;
}
