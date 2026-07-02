// ============================================================
// PM Academy — Product Discovery & Product Analytics Content
// ============================================================

const DISCOVERY_CONTENT = [
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
];

// ──────────────────────────────────────────────────────────
// PRODUCT ANALYTICS — Retention & Cohorts  (12 lessons)
// ──────────────────────────────────────────────────────────
const ANALYTICS_CONTENT = [
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
];
