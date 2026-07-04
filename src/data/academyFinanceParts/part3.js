export const PART3_SKILLS = [
  {
    id: 'mod15_financial_roadmaps',
    title: 'Module 15: Financial Roadmaps',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'The Financial Roadmap Concept',
        body: 'A financial roadmap goes beyond a traditional product roadmap by overlaying financial projections onto product milestones.\nIt visualizes how product development efforts will translate into revenue generation, cost savings, and cash flow over time.',
        keyTakeaway: 'Financial roadmaps tie product delivery dates to tangible financial outcomes.'
      },
      {
        type: 'mcq',
        prompt: 'What is the primary difference between a traditional product roadmap and a financial roadmap?',
        options: [
          { text: 'A traditional roadmap uses Agile, while a financial roadmap uses Waterfall.', correct: false, explanation: 'Both can use any methodology.' },
          { text: 'A financial roadmap overlays revenue and cost projections onto product milestones.', correct: true, explanation: 'It connects feature delivery to financial impact.' },
          { text: 'A financial roadmap only focuses on engineering costs.', correct: false, explanation: 'It includes revenue, cash flow, and overall ROI.' }
        ]
      },
      {
        type: 'teach',
        title: 'Aligning Features with Revenue',
        body: 'When building a financial roadmap, every major feature or release should be tied to a financial driver.\nFor example, releasing "Enterprise SSO" might be tied directly to closing $1M in enterprise pipeline within Q3.',
        keyTakeaway: 'Map features directly to the revenue or cost-savings they unlock.'
      },
      {
        type: 'mcq',
        prompt: 'Why is it important to map specific features to financial drivers in a roadmap?',
        options: [
          { text: 'To justify engineering salaries.', correct: false, explanation: 'This is not the primary reason.' },
          { text: 'To ensure product efforts are directly contributing to the company\'s financial goals.', correct: true, explanation: 'Alignment ensures ROI on development efforts.' },
          { text: 'To make the roadmap look more complex for investors.', correct: false, explanation: 'Clarity, not complexity, is the goal.' }
        ]
      },
      {
        type: 'teach',
        title: 'Timing of Cash Flows',
        body: 'A critical element of a financial roadmap is timing.\nBuilding a feature requires cash outflow (salaries, tools) months before the feature generates cash inflow (new sales, upgrades).\nUnderstanding this lag is crucial for cash flow management.',
        keyTakeaway: 'Acknowledge the time lag between development costs and revenue realization.'
      },
      {
        type: 'mcq',
        prompt: 'In a financial roadmap, when does cash outflow typically occur relative to cash inflow for a new feature?',
        options: [
          { text: 'Simultaneously', correct: false, explanation: 'Development usually happens before launch.' },
          { text: 'Cash outflow occurs before cash inflow.', correct: true, explanation: 'You must pay to build the feature before you can sell it.' },
          { text: 'Cash outflow occurs after cash inflow.', correct: false, explanation: 'This implies customers pay before you start building.' }
        ]
      },
      {
        type: 'teach',
        title: 'Communicating with the CFO',
        body: 'Your CFO cares about when the product will become profitable.\nUse the financial roadmap to show the "breakeven point"—the moment when cumulative revenue from the product exceeds cumulative development costs.',
        keyTakeaway: 'Highlight the breakeven point when presenting to finance executives.'
      },
      {
        type: 'mcq',
        prompt: 'What metric on a financial roadmap is a CFO most likely to focus on?',
        options: [
          { text: 'Story points completed per sprint.', correct: false, explanation: 'This is an engineering metric.' },
          { text: 'The breakeven point and cash flow timing.', correct: true, explanation: 'Finance focuses on ROI and cash management.' },
          { text: 'The number of bugs fixed.', correct: false, explanation: 'This is a quality metric.' }
        ]
      },
      {
        type: 'teach',
        title: 'Adjusting the Roadmap',
        body: 'Financial roadmaps are dynamic. If development is delayed by a quarter, the projected revenue must also be pushed back.\nProduct Managers must proactively communicate how roadmap delays impact the company\'s financial forecast.',
        keyTakeaway: 'Always update financial projections when product milestones shift.'
      },
      {
        type: 'mcq',
        prompt: 'If a major feature launch is delayed by three months, what is the immediate impact on the financial roadmap?',
        options: [
          { text: 'Revenue projections associated with that feature must also be delayed.', correct: true, explanation: 'Delayed features mean delayed revenue.' },
          { text: 'Development costs will automatically decrease.', correct: false, explanation: 'Costs usually increase if a project is delayed.' },
          { text: 'There is no impact if the feature is eventually launched.', correct: false, explanation: 'Timing affects cash flow and yearly targets.' }
        ]
      }
    ]
  },
  {
    id: 'mod16_executive_decision_making',
    title: 'Module 16: Executive Decision Making',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'The Executive Mindset',
        body: 'Executives make decisions based on risk and reward at a portfolio level.\nWhen presenting a product decision, you must frame it not just as a product win, but as a strategic financial move for the company.',
        keyTakeaway: 'Frame product decisions in terms of company-wide financial impact and risk.'
      },
      {
        type: 'mcq',
        prompt: 'How should a Product Manager frame a decision when presenting to the C-suite?',
        options: [
          { text: 'By focusing exclusively on user engagement metrics.', correct: false, explanation: 'Executives need to see the financial and strategic impact.' },
          { text: 'In terms of strategic financial impact and risk-reward tradeoffs.', correct: true, explanation: 'This aligns with the executive portfolio mindset.' },
          { text: 'By detailing the technical architecture.', correct: false, explanation: 'Keep it high-level unless asked.' }
        ]
      },
      {
        type: 'teach',
        title: 'Buy vs. Build Analysis',
        body: 'A classic executive decision is "Buy vs. Build".\nShould we build this feature internally (capitalizing development costs) or buy a third-party tool (increasing operating expenses)?\nThis decision impacts the P&L structure and speed to market.',
        keyTakeaway: 'Buy vs. Build decisions balance time-to-market against long-term operating costs.'
      },
      {
        type: 'mcq',
        prompt: 'What is a primary financial consideration in a "Buy vs. Build" decision?',
        options: [
          { text: 'The color of the third-party tool\'s logo.', correct: false, explanation: 'Irrelevant.' },
          { text: 'The tradeoff between capitalized development costs (build) and ongoing operating expenses (buy).', correct: true, explanation: 'This directly impacts the P&L structure.' },
          { text: 'Which option requires more story points.', correct: false, explanation: 'Financial considerations are broader than agile metrics.' }
        ]
      },
      {
        type: 'teach',
        title: 'Scenario Planning',
        body: 'Executives rarely want a single forecast; they want scenarios.\nPresent a Best Case, Base Case, and Worst Case financial scenario for your product strategy.\nThis shows you have considered risks and have contingency plans.',
        keyTakeaway: 'Always present multiple financial scenarios to executives.'
      },
      {
        type: 'mcq',
        prompt: 'Why do executives prefer scenario planning (Best/Base/Worst case) over a single forecast?',
        options: [
          { text: 'It demonstrates that the PM has considered risks and market volatility.', correct: true, explanation: 'Scenarios prepare the business for uncertainty.' },
          { text: 'It guarantees that at least one forecast will be exactly right.', correct: false, explanation: 'Forecasts are rarely exactly right.' },
          { text: 'It takes up more time in the presentation.', correct: false, explanation: 'Executives prefer concise presentations.' }
        ]
      },
      {
        type: 'teach',
        title: 'Opportunity Cost at the Executive Level',
        body: 'When an executive approves your project, they are rejecting another.\nOpportunity cost is the value of the next best alternative.\nYou must prove that your project offers the highest risk-adjusted return for the company\'s limited capital.',
        keyTakeaway: 'Your project must beat the opportunity cost of alternative investments.'
      },
      {
        type: 'mcq',
        prompt: 'What does "opportunity cost" mean in executive decision making?',
        options: [
          { text: 'The cost of hiring new executives.', correct: false, explanation: 'Incorrect.' },
          { text: 'The value of the next best project that must be foregone to fund your project.', correct: true, explanation: 'Capital is finite; choosing one project means rejecting another.' },
          { text: 'The cost of missing a product launch deadline.', correct: false, explanation: 'That is a delay cost.' }
        ]
      },
      {
        type: 'teach',
        title: 'The Role of the Board of Directors',
        body: 'For major product pivots or acquisitions, the CEO must get approval from the Board of Directors.\nThe Board focuses on shareholder value, long-term strategy, and major financial commitments.\nYour business case might ultimately be presented to them.',
        keyTakeaway: 'Major strategic product decisions ultimately require Board approval based on shareholder value.'
      },
      {
        type: 'mcq',
        prompt: 'What is the primary focus of a company\'s Board of Directors when reviewing a major product strategy?',
        options: [
          { text: 'The specific UI design of the product.', correct: false, explanation: 'This is too tactical for the Board.' },
          { text: 'Maximizing long-term shareholder value and assessing strategic risk.', correct: true, explanation: 'The Board represents the shareholders.' },
          { text: 'The daily sprint velocity of the engineering team.', correct: false, explanation: 'This is an operational metric.' }
        ]
      }
    ]
  },
  {
    id: 'mod17_hospital_financials',
    title: 'Module 17: Hospital Financial Statements',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'The Complexity of Healthcare Revenue',
        body: 'Unlike a SaaS company where Price * Quantity = Revenue, hospital revenue is complex.\nHospitals have "Gross Charges" (the sticker price) but rarely collect this amount.\nThe actual revenue is determined by negotiated rates with insurance companies (payers).',
        keyTakeaway: 'Hospital revenue is based on negotiated payer rates, not gross charges.'
      },
      {
        type: 'mcq',
        prompt: 'Why is a hospital\'s "Gross Revenue" typically much higher than its "Net Patient Revenue"?',
        options: [
          { text: 'Because hospitals always give cash discounts to everyone.', correct: false, explanation: 'Discounts exist, but negotiated rates are the primary driver.' },
          { text: 'Because insurance companies negotiate significant contractual adjustments (discounts) off the gross charges.', correct: true, explanation: 'Net revenue reflects what is actually expected to be collected.' },
          { text: 'Because hospitals overstate revenue for tax purposes.', correct: false, explanation: 'This would be illegal.' }
        ]
      },
      {
        type: 'teach',
        title: 'Payer Mix',
        body: 'A hospital\'s "Payer Mix" is the proportion of revenue coming from different sources: Medicare, Medicaid, Commercial Insurance, and Self-Pay.\nCommercial insurance generally pays the highest rates, while Medicare and Medicaid pay lower, fixed rates.',
        keyTakeaway: 'A hospital\'s profitability is highly dependent on its payer mix.'
      },
      {
        type: 'mcq',
        prompt: 'If a hospital\'s payer mix shifts heavily from Commercial Insurance to Medicaid, what is the likely impact on its finances?',
        options: [
          { text: 'Profit margins will likely decrease.', correct: true, explanation: 'Medicaid typically reimburses at lower rates than Commercial Insurance.' },
          { text: 'Profit margins will likely increase.', correct: false, explanation: 'Medicaid is generally a lower payer.' },
          { text: 'There will be no impact.', correct: false, explanation: 'Different payers have different reimbursement rates.' }
        ]
      },
      {
        type: 'teach',
        title: 'Charity Care and Bad Debt',
        body: 'Hospitals provide care to patients who cannot pay.\n"Charity Care" is free or discounted care given to patients who qualify based on income.\n"Bad Debt" occurs when a patient is expected to pay but fails to do so.\nBoth reduce net revenue.',
        keyTakeaway: 'Charity care and bad debt are significant deductions from hospital revenue.'
      },
      {
        type: 'mcq',
        prompt: 'What is the difference between Charity Care and Bad Debt?',
        options: [
          { text: 'They are exactly the same thing.', correct: false, explanation: 'They have different accounting treatments based on the expectation of payment.' },
          { text: 'Charity care is planned forgiveness based on inability to pay; bad debt is a failure to collect expected payment.', correct: true, explanation: 'Charity care is assessed upfront; bad debt happens after billing.' },
          { text: 'Bad debt is tax-deductible, while charity care is not.', correct: false, explanation: 'Both impact the bottom line but represent different scenarios.' }
        ]
      },
      {
        type: 'teach',
        title: 'Hospital Operating Expenses',
        body: 'The largest expense for a hospital is labor (nurses, doctors, staff).\nThe second largest is typically supplies and drugs.\nManaging these two expense categories is critical for hospital financial health.',
        keyTakeaway: 'Labor and supplies are the dominant expenses in a hospital P&L.'
      },
      {
        type: 'mcq',
        prompt: 'Which of the following represents the largest operating expense category for most hospitals?',
        options: [
          { text: 'Marketing and advertising.', correct: false, explanation: 'Marketing is a smaller expense.' },
          { text: 'Salaries, wages, and benefits (Labor).', correct: true, explanation: 'Healthcare is a highly labor-intensive industry.' },
          { text: 'IT software licenses.', correct: false, explanation: 'IT is significant but smaller than labor.' }
        ]
      },
      {
        type: 'teach',
        title: 'EBITDA in Healthcare',
        body: 'Like other businesses, hospitals use EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) to measure operational profitability.\nHowever, many hospitals are non-profit, meaning their "profit" is reinvested into the facility rather than distributed to shareholders.',
        keyTakeaway: 'Non-profit hospitals still aim for a positive EBITDA to fund future operations and capital projects.'
      },
      {
        type: 'mcq',
        prompt: 'Why does a non-profit hospital still need to generate a positive EBITDA margin?',
        options: [
          { text: 'To pay dividends to the local government.', correct: false, explanation: 'Non-profits do not pay dividends.' },
          { text: 'To reinvest in new equipment, facility upgrades, and cover debt obligations.', correct: true, explanation: 'Profit (or "margin") is necessary to sustain and grow the mission.' },
          { text: 'They don\'t; non-profits aim to break even exactly at zero.', correct: false, explanation: 'A zero margin leaves no room for capital investment or emergencies.' }
        ]
      }
    ]
  },
  {
    id: 'mod17_healthcare_supply_chain',
    title: 'Module 17: Healthcare Supply Chain',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'The Healthcare Supply Chain',
        body: 'The healthcare supply chain involves getting medical products from manufacturers to distributors, and finally to hospitals and patients.\nIt is complex due to strict regulations, expiration dates (spoilage), and the critical need for availability (stockouts can cost lives).',
        keyTakeaway: 'Healthcare supply chains prioritize reliability and compliance alongside cost.'
      },
      {
        type: 'mcq',
        prompt: 'Why is avoiding "stockouts" (running out of inventory) more critical in healthcare than in retail?',
        options: [
          { text: 'Because hospital storage space is cheaper.', correct: false, explanation: 'Space is actually very expensive.' },
          { text: 'Because a lack of critical medical supplies can directly result in patient harm or death.', correct: true, explanation: 'The stakes are literally life and death.' },
          { text: 'Because doctors prefer to use new products.', correct: false, explanation: 'Irrelevant to the risk of stockouts.' }
        ]
      },
      {
        type: 'teach',
        title: 'Group Purchasing Organizations (GPOs)',
        body: 'Hospitals often join Group Purchasing Organizations (GPOs).\nGPOs aggregate the purchasing power of many hospitals to negotiate steep discounts with manufacturers and distributors.\nIn exchange, hospitals commit to buying a large percentage of their supplies through the GPO contracts.',
        keyTakeaway: 'GPOs leverage collective buying power to reduce supply costs for hospitals.'
      },
      {
        type: 'mcq',
        prompt: 'What is the primary function of a Group Purchasing Organization (GPO) in healthcare?',
        options: [
          { text: 'To manufacture medical devices.', correct: false, explanation: 'They do not manufacture.' },
          { text: 'To aggregate purchasing volume from multiple hospitals to negotiate lower prices.', correct: true, explanation: 'Volume equals negotiating power.' },
          { text: 'To provide medical insurance to patients.', correct: false, explanation: 'This is the role of a payer.' }
        ]
      },
      {
        type: 'teach',
        title: 'Value Analysis Committees (VACs)',
        body: 'When a doctor wants a new, expensive medical device, they usually can\'t just buy it.\nHospitals use Value Analysis Committees (VACs)—teams of clinicians and supply chain experts—to evaluate if the new product offers enough clinical benefit to justify its cost compared to existing products.',
        keyTakeaway: 'VACs act as the gatekeepers for introducing new, costly products into a hospital.'
      },
      {
        type: 'mcq',
        prompt: 'If you are a Product Manager for a medical device company, who is a critical stakeholder you must convince at a hospital to adopt your new product?',
        options: [
          { text: 'The hospital\'s marketing director.', correct: false, explanation: 'Marketing does not buy clinical devices.' },
          { text: 'The Value Analysis Committee (VAC).', correct: true, explanation: 'They evaluate the cost-to-benefit ratio of new devices.' },
          { text: 'The patient\'s family.', correct: false, explanation: 'They do not make hospital purchasing decisions.' }
        ]
      },
      {
        type: 'teach',
        title: 'Inventory Holding Costs',
        body: 'Hospitals keep millions of dollars of inventory on hand.\n"Holding costs" include the cost of the capital tied up in the inventory, the physical space, insurance, and the risk of spoilage/expiration.\nSupply chain leaders aim to reduce inventory without risking stockouts.',
        keyTakeaway: 'Excess inventory drains hospital cash and increases the risk of expired products.'
      },
      {
        type: 'mcq',
        prompt: 'Which of the following is a significant component of "inventory holding costs" in a hospital?',
        options: [
          { text: 'The cost of nurses\' salaries.', correct: false, explanation: 'This is a labor cost.' },
          { text: 'The risk of products reaching their expiration dates (spoilage).', correct: true, explanation: 'Expired medical supplies must be thrown away.' },
          { text: 'The cost of treating uninsured patients.', correct: false, explanation: 'This is charity care/bad debt.' }
        ]
      },
      {
        type: 'teach',
        title: 'Just-in-Time (JIT) vs. Resiliency',
        body: 'For years, hospitals moved toward "Just-in-Time" (JIT) inventory to minimize holding costs.\nHowever, global disruptions (like a pandemic) exposed the fragility of JIT.\nModern healthcare supply chains are balancing efficiency (low cost) with resiliency (stockpiling critical items).',
        keyTakeaway: 'Supply chains must balance the cost savings of JIT with the safety of resilient stockpiles.'
      },
      {
        type: 'mcq',
        prompt: 'What was a major lesson learned about "Just-in-Time" (JIT) healthcare supply chains during recent global disruptions?',
        options: [
          { text: 'JIT is perfect and should be used for all supplies.', correct: false, explanation: 'Disruptions proved this false.' },
          { text: 'JIT creates unacceptable risk for critical supplies during unexpected demand spikes or supply shocks.', correct: true, explanation: 'Efficiency came at the cost of resiliency.' },
          { text: 'JIT actually increases inventory holding costs.', correct: false, explanation: 'JIT decreases holding costs.' }
        ]
      }
    ]
  },
  {
    id: 'mod18_finance_for_product_leaders',
    title: 'Module 18: Finance for Product Leaders',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'Owning a P&L',
        body: 'As a product leader (Director, VP, or GM), you may be given "P&L Ownership" for your product line.\nThis means you are responsible for both the revenue your product generates AND the expenses required to build and operate it.\nYour goal is to maximize the product\'s net profit margin.',
        keyTakeaway: 'P&L owners are accountable for the ultimate profitability of their product line.'
      },
      {
        type: 'mcq',
        prompt: 'What does it mean for a Product Leader to have "P&L Ownership"?',
        options: [
          { text: 'They only focus on maximizing top-line revenue.', correct: false, explanation: 'That ignores expenses.' },
          { text: 'They are accountable for both the revenue generated and the costs incurred by their product, managing its overall profitability.', correct: true, explanation: 'P&L stands for Profit and Loss.' },
          { text: 'They act as the company\'s Chief Financial Officer.', correct: false, explanation: 'They own a division\'s financials, not the whole company\'s.' }
        ]
      },
      {
        type: 'teach',
        title: 'Executive Budgeting',
        body: 'Budgeting is the process of allocating capital for the upcoming fiscal year.\nProduct leaders must advocate for their product\'s budget by presenting strong business cases.\nYou must prove that investing in your product will yield a higher return than investing in another department.',
        keyTakeaway: 'Budgeting is a competitive process for limited corporate resources.'
      },
      {
        type: 'mcq',
        prompt: 'In the annual budgeting process, how should a Product Leader view their request for funding?',
        options: [
          { text: 'As a guaranteed entitlement based on last year\'s budget.', correct: false, explanation: 'Budgets are often zero-based and competitive.' },
          { text: 'As a competitive pitch to prove their product offers the best return on investment for the company.', correct: true, explanation: 'Capital goes to the best opportunities.' },
          { text: 'As a purely technical exercise for engineering.', correct: false, explanation: 'It is a strategic financial exercise.' }
        ]
      },
      {
        type: 'teach',
        title: 'Headcount Planning',
        body: 'For software products, the biggest expense is usually people.\n"Headcount planning" is a crucial part of budgeting.\nYou must forecast how many engineers, designers, and marketers you need, and justify their salaries against the projected revenue growth they will drive.',
        keyTakeaway: 'Headcount requests must be justified by expected revenue growth or cost savings.'
      },
      {
        type: 'mcq',
        prompt: 'When submitting a budget request for 5 new software engineers, what must a Product Leader typically demonstrate?',
        options: [
          { text: 'That the engineers will write a lot of code.', correct: false, explanation: 'Output is not outcomes.' },
          { text: 'How the output of those engineers will translate into increased revenue or strategic value that exceeds their cost.', correct: true, explanation: 'Headcount is an investment requiring an ROI.' },
          { text: 'That the current team is tired.', correct: false, explanation: 'While burnout is real, finance needs an ROI justification.' }
        ]
      },
      {
        type: 'teach',
        title: 'Variance Analysis',
        body: 'Once a budget is set, finance tracks your actual performance against it.\n"Variance" is the difference between actuals and the budget.\nA positive revenue variance (making more than planned) is good; a negative variance requires an explanation and a recovery plan.',
        keyTakeaway: 'Product leaders must explain variances and adjust strategy to hit targets.'
      },
      {
        type: 'mcq',
        prompt: 'If your product was budgeted to make $1M in Q1 but actually made $800k, what is the variance and what must you do?',
        options: [
          { text: 'A positive $200k variance; ask for a bonus.', correct: false, explanation: 'It is a negative variance.' },
          { text: 'A negative $200k variance; you must explain the shortfall and present a plan to close the gap in Q2.', correct: true, explanation: 'Leaders are accountable for misses.' },
          { text: 'A neutral variance; ignore it.', correct: false, explanation: 'Finance will not let you ignore it.' }
        ]
      },
      {
        type: 'teach',
        title: 'Capital Allocation',
        body: 'At the executive level, product management merges with corporate finance.\nYou act like an internal portfolio manager.\nYou must decide whether to invest cash in marketing a mature product (cash cow) or developing a risky, high-growth new product (star).',
        keyTakeaway: 'Product leaders allocate capital across a portfolio of products to optimize overall company growth.'
      },
      {
        type: 'mcq',
        prompt: 'How does an executive product leader\'s role resemble a financial portfolio manager?',
        options: [
          { text: 'They buy and sell stocks on Wall Street.', correct: false, explanation: 'They manage internal products, not public stocks.' },
          { text: 'They allocate limited capital across different products with varying risk/reward profiles to maximize total company return.', correct: true, explanation: 'They manage a portfolio of products.' },
          { text: 'They focus only on the safest, lowest-return projects.', correct: false, explanation: 'They balance safe projects with high-growth bets.' }
        ]
      }
    ]
  },
  {
    id: 'mod19_capstone_project',
    title: 'Module 19: Capstone Project',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'Capstone Overview: Tying it All Together',
        body: 'The Capstone Project requires you to synthesize everything you\'ve learned in Corporate Finance.\nYou will evaluate three complex scenarios: launching an AI SaaS product, optimizing a healthcare supply chain, and managing a product portfolio.',
        keyTakeaway: 'Real-world product finance requires integrating concepts from P&Ls, roadmaps, and strategic risk.'
      },
      {
        type: 'mcq',
        prompt: 'What is the primary goal of the Capstone Project in this finance curriculum?',
        options: [
          { text: 'To memorize accounting formulas.', correct: false, explanation: 'The goal is application, not memorization.' },
          { text: 'To synthesize and apply financial concepts to complex, multi-faceted product scenarios.', correct: true, explanation: 'Integration of knowledge is key.' },
          { text: 'To learn how to code an AI model.', correct: false, explanation: 'This is a product finance course.' }
        ]
      },
      {
        type: 'teach',
        title: 'Scenario 1: Launching AI SaaS',
        body: 'You are proposing a new AI-driven SaaS product.\nYou must present the expected Customer Acquisition Cost (CAC), Lifetime Value (LTV), and the upfront capitalized R&D costs required to build the LLM infrastructure.',
        keyTakeaway: 'AI SaaS requires massive upfront capital but offers high gross margins at scale.'
      },
      {
        type: 'mcq',
        prompt: 'When pitching a new AI SaaS product, why is it critical to accurately forecast upfront R&D costs?',
        options: [
          { text: 'Because AI products usually have low gross margins later.', correct: false, explanation: 'SaaS has high gross margins at scale.' },
          { text: 'Because building AI infrastructure requires significant capital expenditure before any revenue is generated, creating a deep "cash flow trough".', correct: true, explanation: 'Executives need to know how much cash will be burned before profitability.' },
          { text: 'Because marketing costs are usually zero for AI.', correct: false, explanation: 'Marketing costs are still significant.' }
        ]
      },
      {
        type: 'teach',
        title: 'Scenario 2: Healthcare Supply Chain Optimization',
        body: 'You are managing a portfolio of medical devices.\nThe hospital system is demanding lower prices via their GPO.\nYou must model the impact of offering a 10% volume discount against the risk of losing the hospital system\'s business entirely.',
        keyTakeaway: 'Pricing strategy in healthcare requires balancing margin compression with volume retention.'
      },
      {
        type: 'mcq',
        prompt: 'If a hospital GPO demands a 10% discount on your medical device, what financial analysis must you perform?',
        options: [
          { text: 'Calculate how the discount impacts your gross margin versus the financial impact of losing that volume entirely.', correct: true, explanation: 'You must model the trade-offs of the concession.' },
          { text: 'Immediately accept the discount to make them happy.', correct: false, explanation: 'This could destroy your profitability.' },
          { text: 'Refuse the discount without analysis.', correct: false, explanation: 'This could cost you a major client.' }
        ]
      },
      {
        type: 'teach',
        title: 'Scenario 3: Portfolio Optimization',
        body: 'You have a fixed budget of $5M.\nYou must allocate it between a mature cash-cow product (declining growth but high profit) and a risky new AI venture (high growth potential but currently burning cash).',
        keyTakeaway: 'Portfolio optimization requires balancing short-term cash flow with long-term strategic growth.'
      },
      {
        type: 'mcq',
        prompt: 'In portfolio optimization, why might you continue to invest a small amount in a mature "cash cow" product?',
        options: [
          { text: 'Because it is the most exciting product.', correct: false, explanation: 'Cash cows are often boring but profitable.' },
          { text: 'To maintain its market share so it continues to generate the cash needed to fund riskier, high-growth ventures.', correct: true, explanation: 'Cash cows fund the stars of the future.' },
          { text: 'To purposefully decrease its profitability.', correct: false, explanation: 'You want to maintain its profitability.' }
        ]
      },
      {
        type: 'teach',
        title: 'The Final Pitch',
        body: 'Your capstone concludes with a presentation to the simulated "Board of Directors".\nYou must defend your resource allocation, demonstrate clear ROI, and explain your mitigation strategies for the most significant financial risks.',
        keyTakeaway: 'Executive presentations must be clear, data-driven, and focused on strategic outcomes.'
      },
      {
        type: 'mcq',
        prompt: 'When concluding your capstone presentation to the "Board of Directors", what should be your primary focus?',
        options: [
          { text: 'The specific features developed by the engineering team.', correct: false, explanation: 'Too tactical.' },
          { text: 'A clear defense of resource allocation, projected ROI, and risk mitigation strategies.', correct: true, explanation: 'This addresses the Board\'s core concerns.' },
          { text: 'Complaining about the lack of budget.', correct: false, explanation: 'Present solutions, not complaints.' }
        ]
      }
    ]
  }
];
