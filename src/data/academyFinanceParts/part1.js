export const PART1_SKILLS = [
  {
    id: 'finance_fundamentals_m1',
    title: 'Income Statement & Revenue Recognition',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'Introduction to Financial Statements',
        body: 'The Income Statement (or Profit & Loss statement) shows a company\'s financial performance over a specific period.\nIt summarizes revenues, costs, and expenses incurred during that period.\nAs a PM, understanding the Income Statement helps you see how your product impacts the bottom line.',
        keyTakeaway: 'The Income Statement tracks revenue and expenses over a period to determine profitability.'
      },
      {
        type: 'mcq',
        prompt: 'What does an Income Statement primarily show?',
        options: [
          { text: 'The value of assets and liabilities at a single point in time.', correct: false, explanation: 'This is the Balance Sheet.' },
          { text: 'A company\'s revenues, expenses, and profitability over a period of time.', correct: true, explanation: 'The Income Statement tracks financial performance over a specific period (e.g., a quarter or a year).' },
          { text: 'Only the cash flowing in and out of the business.', correct: false, explanation: 'This is the Cash Flow Statement.' }
        ]
      },
      {
        type: 'teach',
        title: 'Revenue vs. Bookings vs. Billings',
        body: 'In SaaS and subscriptions, these three terms are often confused:\n- Bookings: The total value of a signed contract (forward-looking).\n- Billings: The amount actually invoiced to the customer.\n- Revenue: The portion of the contract value that has been "earned" by delivering the service.',
        keyTakeaway: 'Bookings are commitments, Billings are invoices, and Revenue is recognized as the service is delivered.'
      },
      {
        type: 'mcq',
        prompt: 'If a user signs a 12-month contract for $1,200 today and you invoice them for the full amount, what is the booking amount today?',
        options: [
          { text: '$100', correct: false, explanation: 'This would be the monthly revenue recognized.' },
          { text: '$1,200', correct: true, explanation: 'Bookings represent the total committed value of the contract at signing.' },
          { text: '$0', correct: false, explanation: 'The contract has been signed, so there is a booking.' }
        ]
      },
      {
        type: 'teach',
        title: 'Revenue Recognition (Accrual Accounting)',
        body: 'Under accrual accounting (GAAP/IFRS), revenue is recognized when it is earned, regardless of when cash is received.\nIf a customer pays $120 upfront for a 1-year subscription, you don\'t recognize $120 on day 1. You recognize $10 each month as you deliver the service.',
        keyTakeaway: 'Revenue is recognized when the service is actually provided, not when the cash is collected.'
      },
      {
        type: 'mcq',
        prompt: 'A customer pays $600 in January for a 6-month software subscription (Jan-Jun). How much revenue is recognized in January?',
        options: [
          { text: '$600', correct: false, explanation: 'This is cash accounting, not standard accrual accounting.' },
          { text: '$100', correct: true, explanation: '$600 divided by 6 months is $100/month. Only $100 is "earned" in January.' },
          { text: '$0', correct: false, explanation: 'Since service is provided in January, some revenue must be recognized.' }
        ]
      },
      {
        type: 'teach',
        title: 'Cost of Goods Sold (COGS) vs. Operating Expenses (OpEx)',
        body: 'COGS (or Cost of Revenue) are the direct costs of delivering your product (e.g., AWS hosting, customer support, payment processing fees).\nOpEx are the indirect costs of running the business (e.g., sales & marketing, R&D, general administrative costs).\nPMs mostly impact COGS by optimizing product efficiency.',
        keyTakeaway: 'COGS scale directly with revenue/usage, while OpEx are more fixed overheads.'
      },
      {
        type: 'mcq',
        prompt: 'Which of the following is typically considered a COGS for a software company?',
        options: [
          { text: 'Marketing campaign spend', correct: false, explanation: 'This is an Operating Expense (Sales & Marketing).' },
          { text: 'Cloud hosting costs (AWS/GCP)', correct: true, explanation: 'Hosting costs are directly required to deliver the software to users.' },
          { text: 'Office rent', correct: false, explanation: 'This is General & Administrative (G&A), an Operating Expense.' }
        ]
      },
      {
        type: 'teach',
        title: 'Gross Profit and Net Income',
        body: 'Gross Profit = Revenue - COGS. It shows how efficiently you deliver your core product.\nNet Income (the "bottom line") = Gross Profit - OpEx - Taxes/Interest.\nAs a PM, increasing Revenue without proportionally increasing COGS improves Gross Profit (and Gross Margin).',
        keyTakeaway: 'Gross Profit looks at direct product costs; Net Income looks at all company expenses.'
      },
      {
        type: 'mcq',
        prompt: 'How is Gross Margin calculated?',
        options: [
          { text: '(Revenue - OpEx) / Revenue', correct: false, explanation: 'This resembles an operating margin.' },
          { text: '(Revenue - COGS) / Revenue', correct: true, explanation: 'Gross Margin is Gross Profit (Revenue - COGS) divided by Revenue, usually expressed as a percentage.' },
          { text: 'Net Income / Revenue', correct: false, explanation: 'This is Net Profit Margin.' }
        ]
      }
    ]
  },
  {
    id: 'finance_fundamentals_m2',
    title: 'Balance Sheet & Cash Flow',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'Introduction to the Balance Sheet',
        body: 'The Balance Sheet is a snapshot of a company\'s financial position at a specific moment in time.\nIt consists of Assets (what you own), Liabilities (what you owe), and Equity (what belongs to owners).',
        keyTakeaway: 'The Balance Sheet shows financial health at a single point in time, unlike the Income Statement.'
      },
      {
        type: 'mcq',
        prompt: 'The fundamental accounting equation is:',
        options: [
          { text: 'Assets = Liabilities + Equity', correct: true, explanation: 'Everything the company owns (Assets) is funded either by borrowing (Liabilities) or by the owners (Equity).' },
          { text: 'Revenue = Expenses + Profit', correct: false, explanation: 'This is related to the Income Statement.' },
          { text: 'Equity = Assets + Liabilities', correct: false, explanation: 'This implies you add what you owe to what you own to get equity, which is incorrect.' }
        ]
      },
      {
        type: 'teach',
        title: 'Current vs. Non-Current Assets',
        body: 'Current Assets can be converted to cash within one year (e.g., cash, accounts receivable).\nNon-Current Assets are long-term (e.g., property, equipment, patents).\nWorking capital management relies heavily on managing current assets and liabilities.',
        keyTakeaway: 'Current = short-term (< 1 year); Non-Current = long-term (> 1 year).'
      },
      {
        type: 'mcq',
        prompt: 'Which of the following is considered a Current Asset?',
        options: [
          { text: 'A fleet of delivery vehicles', correct: false, explanation: 'Vehicles are long-term property/equipment.' },
          { text: 'Accounts Receivable', correct: true, explanation: 'Accounts receivable is money owed by customers, typically collected within 30-90 days.' },
          { text: 'A 10-year patent', correct: false, explanation: 'Intangible assets like patents are non-current.' }
        ]
      },
      {
        type: 'teach',
        title: 'Introduction to Cash Flow Statement',
        body: 'The Cash Flow Statement tracks the actual movement of cash in and out of the business.\nBecause of accrual accounting, a company can look profitable on the Income Statement but still run out of cash.\nCash is oxygen for a startup.',
        keyTakeaway: 'Profit does not equal Cash Flow. You can be profitable and still go bankrupt if cash runs out.'
      },
      {
        type: 'mcq',
        prompt: 'Why can a profitable company still go bankrupt?',
        options: [
          { text: 'Because their Gross Margin is too high', correct: false, explanation: 'High margins are a good thing.' },
          { text: 'Because they are recognizing revenue but not actually collecting the cash fast enough to pay bills', correct: true, explanation: 'If Accounts Receivable piles up but no cash comes in, the company can\'t pay its immediate liabilities.' },
          { text: 'Because their OpEx is lower than their COGS', correct: false, explanation: 'This would not necessarily cause bankruptcy.' }
        ]
      },
      {
        type: 'teach',
        title: 'Three Sections of the Cash Flow Statement',
        body: '1. Operating Activities: Cash from core business operations (customers paying you).\n2. Investing Activities: Cash spent on long-term assets (buying servers, acquiring companies).\n3. Financing Activities: Cash from investors or loans (raising VC, issuing stock).',
        keyTakeaway: 'Operating cash flow is the most sustainable source of cash for a mature business.'
      },
      {
        type: 'mcq',
        prompt: 'Buying new proprietary servers for a data center is classified under which cash flow section?',
        options: [
          { text: 'Operating Activities', correct: false, explanation: 'This is not a day-to-day operational expense, it is a long-term asset purchase.' },
          { text: 'Investing Activities', correct: true, explanation: 'Capital Expenditures (CapEx) like buying servers are investing activities.' },
          { text: 'Financing Activities', correct: false, explanation: 'This relates to debt and equity, not equipment.' }
        ]
      },
      {
        type: 'teach',
        title: 'Free Cash Flow (FCF)',
        body: 'Free Cash Flow = Operating Cash Flow - Capital Expenditures (CapEx).\nIt represents the cash a company generates after maintaining or expanding its asset base.\nFCF is a critical metric for investors because it shows cash available to distribute to shareholders or reinvest.',
        keyTakeaway: 'FCF is the true measure of a company\'s cash-generating ability.'
      },
      {
        type: 'mcq',
        prompt: 'How is Free Cash Flow generally calculated?',
        options: [
          { text: 'Revenue - COGS', correct: false, explanation: 'This is Gross Profit.' },
          { text: 'Operating Cash Flow - Capital Expenditures', correct: true, explanation: 'FCF takes the cash from operations and subtracts the cash needed to maintain the business\'s long-term assets.' },
          { text: 'Net Income + Depreciation', correct: false, explanation: 'This is closer to Operating Cash Flow, but doesn\'t account for CapEx.' }
        ]
      }
    ]
  },
  {
    id: 'managerial_accounting_m3',
    title: 'Product Costing & Margins',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'Direct vs. Indirect Costs',
        body: 'Direct costs can be traced specifically to a product or feature (e.g., API calls made by a specific feature).\nIndirect costs support multiple products and are harder to trace (e.g., the salary of the CEO, general office internet).\nPMs need to understand direct costs to price features correctly.',
        keyTakeaway: 'Direct costs are easily attributable; Indirect costs must be allocated across the business.'
      },
      {
        type: 'mcq',
        prompt: 'For a specific software feature (like AI text generation), the cost of calls to the OpenAI API is a:',
        options: [
          { text: 'Direct Cost', correct: true, explanation: 'The API cost can be traced directly and exclusively to that specific feature\'s usage.' },
          { text: 'Indirect Cost', correct: false, explanation: 'Indirect costs are shared and not easily traceable.' },
          { text: 'Sunk Cost', correct: false, explanation: 'It is an ongoing cost, not a past, unrecoverable cost.' }
        ]
      },
      {
        type: 'teach',
        title: 'Fixed vs. Variable Costs',
        body: 'Fixed Costs do not change with the volume of users or production (e.g., rent, developer salaries).\nVariable Costs change directly with volume (e.g., cloud storage per user, credit card processing fees).\nSoftware usually has high fixed costs but low variable costs.',
        keyTakeaway: 'Fixed costs remain constant regardless of output; Variable costs scale with output.'
      },
      {
        type: 'mcq',
        prompt: 'Stripe payment processing fees (e.g., 2.9% + $0.30 per transaction) are an example of:',
        options: [
          { text: 'Fixed Cost', correct: false, explanation: 'The total fee changes based on how many transactions occur.' },
          { text: 'Variable Cost', correct: true, explanation: 'The more transactions you process, the higher the total cost, scaling perfectly with volume.' },
          { text: 'Overhead Cost', correct: false, explanation: 'It is a direct variable cost of doing business.' }
        ]
      },
      {
        type: 'teach',
        title: 'Activity-Based Costing (ABC)',
        body: 'ABC is a method that assigns overhead and indirect costs to products based on the actual activities that drive those costs.\nInstead of spreading server costs evenly, ABC might allocate costs based on compute time used by different product tiers.',
        keyTakeaway: 'ABC provides a more accurate view of true product profitability by tracing actual resource usage.'
      },
      {
        type: 'mcq',
        prompt: 'Why might a PM use Activity-Based Costing (ABC) over traditional flat allocation?',
        options: [
          { text: 'It is much easier and faster to calculate.', correct: false, explanation: 'ABC is actually more complex and time-consuming to set up.' },
          { text: 'It prevents the company from paying taxes.', correct: false, explanation: 'Cost allocation methods don\'t evade taxes.' },
          { text: 'It identifies which specific features or customer segments are actually driving costs.', correct: true, explanation: 'ABC links indirect costs to specific activities, revealing hidden inefficiencies or unprofitable products.' }
        ]
      },
      {
        type: 'teach',
        title: 'Contribution Margin',
        body: 'Contribution Margin = Revenue - Variable Costs.\nIt shows how much revenue is left over to "contribute" to paying off Fixed Costs and generating profit.\nA product must have a positive contribution margin, or every new sale loses money.',
        keyTakeaway: 'Contribution margin is what remains to cover fixed overhead after variable costs are paid.'
      },
      {
        type: 'mcq',
        prompt: 'If a subscription sells for $20/month, and the variable costs (hosting, support, fees) are $5/month, what is the Contribution Margin per unit?',
        options: [
          { text: '$25', correct: false, explanation: 'You subtracted variable costs, not added them.' },
          { text: '$15', correct: true, explanation: '$20 Revenue - $5 Variable Cost = $15 Contribution Margin.' },
          { text: '75%', correct: false, explanation: 'While the contribution margin ratio is 75%, the question asked for the margin per unit ($15).' }
        ]
      },
      {
        type: 'teach',
        title: 'Margin vs. Markup',
        body: 'Margin is calculated based on the Selling Price: (Price - Cost) / Price.\nMarkup is calculated based on the Cost: (Price - Cost) / Cost.\nA 100% markup on a $50 item gives a $100 price, which is a 50% margin.',
        keyTakeaway: 'Margin looks at profit as a percentage of revenue; Markup looks at profit as a percentage of cost.'
      },
      {
        type: 'mcq',
        prompt: 'If a physical hardware device costs $50 to build and you sell it for $100, what is your Gross Margin?',
        options: [
          { text: '50%', correct: true, explanation: '($100 - $50) / $100 = 50%.' },
          { text: '100%', correct: false, explanation: 'This is the markup, not the margin.' },
          { text: '200%', correct: false, explanation: 'Incorrect calculation.' }
        ]
      }
    ]
  },
  {
    id: 'managerial_accounting_m4',
    title: 'Unit Economics & Break-even',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'Introduction to Unit Economics',
        body: 'Unit economics describes the direct revenues and costs associated with a single fundamental unit of your business (usually one customer).\nIf your unit economics are broken (you lose money on every user), scaling the business will just accelerate bankruptcy.',
        keyTakeaway: 'Unit economics evaluate profitability on a per-customer or per-unit basis.'
      },
      {
        type: 'mcq',
        prompt: 'What is Customer Acquisition Cost (CAC)?',
        options: [
          { text: 'The total marketing budget of the company.', correct: false, explanation: 'CAC is on a per-customer basis.' },
          { text: 'The total Sales & Marketing expense divided by the number of new customers acquired.', correct: true, explanation: 'CAC represents how much it costs, on average, to "buy" one new customer.' },
          { text: 'The cost to serve a customer over their lifetime.', correct: false, explanation: 'This is the Cost to Serve, a component of variable costs.' }
        ]
      },
      {
        type: 'teach',
        title: 'LTV (Lifetime Value) Calculation',
        body: 'LTV is the total gross profit a customer generates over their entire relationship with your business.\nA simple SaaS LTV formula: (ARPU × Gross Margin) / Churn Rate.\nWhere ARPU is Average Revenue Per User.',
        keyTakeaway: 'LTV represents the total profit a single customer brings before they churn.'
      },
      {
        type: 'mcq',
        prompt: 'If a user pays $10/month (ARPU), your Gross Margin is 100%, and monthly churn is 5%, what is the LTV?',
        options: [
          { text: '$50', correct: false, explanation: 'Incorrect.' },
          { text: '$200', correct: true, explanation: '($10 * 1.0) / 0.05 = $200.' },
          { text: '$1,000', correct: false, explanation: 'Incorrect.' }
        ]
      },
      {
        type: 'teach',
        title: 'LTV:CAC Ratio',
        body: 'The LTV:CAC ratio is the golden metric of startup growth.\nIt compares the value of a customer to the cost of acquiring them.\nAn LTV:CAC ratio of < 1 means you burn money on every customer. A ratio > 5 means you might be under-investing in marketing.',
        keyTakeaway: 'A strong SaaS business typically aims for an LTV:CAC ratio of at least 3:1.'
      },
      {
        type: 'mcq',
        prompt: 'What is generally considered a "healthy" LTV:CAC ratio for a growing SaaS startup?',
        options: [
          { text: '1:1', correct: false, explanation: 'This means you just barely break even on the customer over their entire lifetime, leaving no room for OpEx.' },
          { text: '3:1 or higher', correct: true, explanation: 'A 3:1 ratio means the customer generates 3x the profit it cost to acquire them, leaving plenty of room for overhead.' },
          { text: '10:1', correct: false, explanation: 'While great, 10:1 often implies you are growing too slowly and should spend more on marketing.' }
        ]
      },
      {
        type: 'teach',
        title: 'Break-even Analysis',
        body: 'The Break-even point is the sales volume where Total Revenue = Total Costs (Fixed + Variable).\nFormula: Break-even Units = Fixed Costs / Contribution Margin per Unit.\nIt tells a PM exactly how many units must be sold to stop losing money on a project.',
        keyTakeaway: 'Break-even analysis helps determine the minimum viable scale of a product.'
      },
      {
        type: 'mcq',
        prompt: 'If a new product has Fixed Costs of $10,000, and a Contribution Margin of $50 per unit, what is the break-even volume?',
        options: [
          { text: '100 units', correct: false, explanation: '100 * $50 = $5,000. You are still $5k short of fixed costs.' },
          { text: '200 units', correct: true, explanation: '$10,000 / $50 = 200 units. At 200 units, the total contribution exactly covers the $10k fixed cost.' },
          { text: '500 units', correct: false, explanation: 'This would generate $25,000 in contribution, well past break-even.' }
        ]
      },
      {
        type: 'teach',
        title: 'Payback Period',
        body: 'The CAC Payback Period is the time it takes for a customer\'s gross profit to repay their Customer Acquisition Cost.\nFormula: CAC / (ARPU × Gross Margin).\nShorter payback periods mean you recover cash faster, reducing the risk of the customer churning before becoming profitable.',
        keyTakeaway: 'In software, a healthy CAC Payback Period is typically 12-18 months or less.'
      },
      {
        type: 'mcq',
        prompt: 'If your CAC is $120 and your monthly gross profit per user is $10, what is the payback period?',
        options: [
          { text: '6 months', correct: false, explanation: '6 * $10 = $60, not enough to cover the $120 CAC.' },
          { text: '12 months', correct: true, explanation: '$120 CAC / $10 monthly profit = 12 months to break even on that specific customer.' },
          { text: '24 months', correct: false, explanation: 'Too long based on the math.' }
        ]
      }
    ]
  },
  {
    id: 'corporate_finance_m5',
    title: 'Time Value of Money',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'The Core Concept of Time Value of Money (TVM)',
        body: 'The fundamental principle of finance: A dollar today is worth more than a dollar tomorrow.\nWhy? Because a dollar today can be invested to earn interest or return, and inflation erodes future purchasing power.',
        keyTakeaway: 'Money has a time value due to earning capacity and inflation.'
      },
      {
        type: 'mcq',
        prompt: 'According to the Time Value of Money, $100 today is:',
        options: [
          { text: 'Worth less than $100 received next year.', correct: false, explanation: 'Incorrect. You could invest the $100 today.' },
          { text: 'Worth more than $100 received next year.', correct: true, explanation: 'You can invest $100 today and have more than $100 next year.' },
          { text: 'Exactly the same as $100 received next year.', correct: false, explanation: 'This ignores inflation and interest.' }
        ]
      },
      {
        type: 'teach',
        title: 'Future Value (FV)',
        body: 'Future Value measures how much a present sum of money will be worth in the future at a given interest rate.\nFormula: FV = PV * (1 + r)^n\nWhere PV = Present Value, r = interest rate, n = number of periods.',
        keyTakeaway: 'Compounding makes money grow exponentially over time.'
      },
      {
        type: 'mcq',
        prompt: 'If you invest $1,000 today at an annual interest rate of 10% for 1 year, what is the Future Value?',
        options: [
          { text: '$1,010', correct: false, explanation: 'This is 1%.' },
          { text: '$1,100', correct: true, explanation: '$1,000 * (1 + 0.10)^1 = $1,100.' },
          { text: '$1,210', correct: false, explanation: 'This would be the value after 2 years of compounding.' }
        ]
      },
      {
        type: 'teach',
        title: 'Present Value (PV)',
        body: 'Present Value is the reverse of Future Value. It asks: "How much is a future sum of money worth today?"\nFormula: PV = FV / (1 + r)^n\nWe "discount" future cash flows back to the present. PMs use PV to value multi-year enterprise contracts or long-term projects.',
        keyTakeaway: 'Discounting future cash flows gives you their equivalent value in today\'s dollars.'
      },
      {
        type: 'mcq',
        prompt: 'Why do we discount future cash flows?',
        options: [
          { text: 'Because future money is worth more than present money.', correct: false, explanation: 'It is the opposite.' },
          { text: 'To account for the time value of money and the risk that the future cash might not materialize.', correct: true, explanation: 'Discounting adjusts future dollars to current dollars, accounting for risk and lost opportunity.' },
          { text: 'To lower our tax burden.', correct: false, explanation: 'Discounting is a valuation concept, not a tax strategy.' }
        ]
      },
      {
        type: 'teach',
        title: 'Discount Rates and Risk',
        body: 'The discount rate \'r\' reflects the risk and the opportunity cost of capital.\nA safe investment (like government bonds) has a low discount rate. A risky startup feature has a high discount rate.\nHigher risk = Higher discount rate = Lower Present Value.',
        keyTakeaway: 'The riskier the future cash flow, the less it is worth today.'
      },
      {
        type: 'mcq',
        prompt: 'If the perceived risk of a product launch increases drastically, the discount rate applied to its future cash flows should:',
        options: [
          { text: 'Decrease', correct: false, explanation: 'Lower discount rates imply lower risk.' },
          { text: 'Increase', correct: true, explanation: 'Higher risk requires a higher discount rate to compensate investors, which lowers the present value.' },
          { text: 'Stay the same', correct: false, explanation: 'Risk directly impacts the discount rate.' }
        ]
      },
      {
        type: 'teach',
        title: 'Opportunity Cost',
        body: 'Opportunity cost is the potential benefit lost when you choose one alternative over another.\nIf you spend $1M building Feature A, the opportunity cost is the value you could have created by spending that $1M on Feature B, or simply investing it.',
        keyTakeaway: 'Every product decision has a hidden cost: the path not taken.'
      },
      {
        type: 'mcq',
        prompt: 'In finance, opportunity cost most accurately refers to:',
        options: [
          { text: 'The accounting costs of building a product.', correct: false, explanation: 'These are explicit costs, not opportunity costs.' },
          { text: 'The return of the next best alternative investment forgone.', correct: true, explanation: 'Opportunity cost measures what you gave up by making your current choice.' },
          { text: 'The marketing budget needed to beat a competitor.', correct: false, explanation: 'This is an operational expense.' }
        ]
      }
    ]
  },
  {
    id: 'corporate_finance_m6',
    title: 'Investment Decisions (NPV, IRR)',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'Introduction to NPV (Net Present Value)',
        body: 'NPV is the sum of all Present Values of cash inflows and outflows of a project.\nNPV = (PV of Future Cash Flows) - (Initial Investment).\nIf NPV > 0, the project adds value to the firm. If NPV < 0, it destroys value.',
        keyTakeaway: 'A positive NPV indicates that a project\'s returns exceed the cost of capital.'
      },
      {
        type: 'mcq',
        prompt: 'What does a positive NPV mean?',
        options: [
          { text: 'The project will generate accounting profit, but destroy cash.', correct: false, explanation: 'NPV is based on cash flows, not accounting profit.' },
          { text: 'The project is expected to generate value above the company\'s required rate of return.', correct: true, explanation: 'Positive NPV means the present value of inflows exceeds the present value of outflows.' },
          { text: 'The project will break even in exactly one year.', correct: false, explanation: 'This relates to the payback period, not NPV.' }
        ]
      },
      {
        type: 'teach',
        title: 'Calculating NPV in Product',
        body: 'To calculate NPV for a feature: 1) Estimate the development cost (Outflow today). 2) Estimate the net revenue the feature will generate each year (Inflows). 3) Discount those future inflows to Present Value. 4) Subtract the cost.',
        keyTakeaway: 'NPV translates abstract multi-year product roadmaps into a single dollar figure of value created.'
      },
      {
        type: 'mcq',
        prompt: 'If a new feature requires an initial investment of $100k, and the present value of its future cash flows is $120k, what is the NPV?',
        options: [
          { text: '-$20k', correct: false, explanation: 'Inflows minus outflows.' },
          { text: '$20k', correct: true, explanation: '$120k (PV of inflows) - $100k (Initial outflow) = $20k positive NPV.' },
          { text: '$220k', correct: false, explanation: 'You must subtract the initial investment, not add it.' }
        ]
      },
      {
        type: 'teach',
        title: 'Introduction to IRR (Internal Rate of Return)',
        body: 'IRR is the discount rate that makes the NPV of a project exactly zero.\nThink of it as the annualized effective compounded return rate of an investment.\nIf a project\'s IRR is higher than the company\'s cost of capital, it is a good investment.',
        keyTakeaway: 'IRR is the "break-even" interest rate for a project.'
      },
      {
        type: 'mcq',
        prompt: 'The Internal Rate of Return (IRR) is the discount rate that makes the NPV equal to:',
        options: [
          { text: 'The initial investment', correct: false, explanation: 'Incorrect.' },
          { text: 'Zero', correct: true, explanation: 'IRR is solved by setting the NPV equation to 0 and solving for the rate (r).' },
          { text: 'Infinity', correct: false, explanation: 'Incorrect.' }
        ]
      },
      {
        type: 'teach',
        title: 'NPV vs. IRR: Which is better?',
        body: 'While IRR is popular because percentages are easy to understand, NPV is fundamentally better for decision making.\nIRR can be misleading with mutually exclusive projects (e.g., a small project might have a 50% IRR yielding $1k, while a massive project has a 15% IRR yielding $1M).',
        keyTakeaway: 'When NPV and IRR conflict on mutually exclusive projects, always trust NPV because it measures absolute dollar value created.'
      },
      {
        type: 'mcq',
        prompt: 'Why might NPV be preferred over IRR when choosing between mutually exclusive projects?',
        options: [
          { text: 'IRR is too difficult to calculate.', correct: false, explanation: 'Software calculates both easily.' },
          { text: 'NPV accounts for the absolute scale and dollar value of the project, while IRR only gives a percentage rate.', correct: true, explanation: 'A high IRR on a tiny investment is worth less to a company than a moderate IRR on a massive investment.' },
          { text: 'IRR ignores the time value of money.', correct: false, explanation: 'IRR is entirely based on the time value of money.' }
        ]
      },
      {
        type: 'teach',
        title: 'Hurdle Rates',
        body: 'A Hurdle Rate is the minimum acceptable rate of return for a project.\nIt is usually based on the company\'s Weighted Average Cost of Capital (WACC), plus a premium for project-specific risk.\nIf IRR > Hurdle Rate, the project is generally approved.',
        keyTakeaway: 'The Hurdle Rate is the financial "bar" your product pitch must clear.'
      },
      {
        type: 'mcq',
        prompt: 'A project should generally be accepted if its IRR is:',
        options: [
          { text: 'Less than the hurdle rate', correct: false, explanation: 'This would destroy value.' },
          { text: 'Greater than the hurdle rate', correct: true, explanation: 'If the return exceeds the minimum acceptable rate, the project creates value.' },
          { text: 'Exactly zero', correct: false, explanation: 'A zero IRR means you barely get your money back, destroying value relative to inflation.' }
        ]
      }
    ]
  },
  {
    id: 'corporate_finance_m7',
    title: 'Capital Allocation',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'What is Capital Allocation?',
        body: 'Capital allocation is how a CEO and executive team decide to spend the company\'s money to maximize shareholder value.\nOptions include: R&D (building products), M&A (buying companies), paying dividends, or paying down debt.',
        keyTakeaway: 'Product management is essentially capital allocation at the R&D level.'
      },
      {
        type: 'mcq',
        prompt: 'Which of the following is NOT a typical corporate capital allocation decision?',
        options: [
          { text: 'Acquiring a competitor', correct: false, explanation: 'This is M&A, a major capital allocation decision.' },
          { text: 'Deciding the color of a button in the UI', correct: true, explanation: 'This is a tactical design decision, not a macro deployment of financial capital.' },
          { text: 'Funding a new internal product incubator', correct: false, explanation: 'This is R&D capital allocation.' }
        ]
      },
      {
        type: 'teach',
        title: 'ROI (Return on Investment)',
        body: 'ROI is a simple, non-time-adjusted metric for evaluating investments.\nFormula: ROI = (Net Profit from Investment / Cost of Investment) * 100.\nWhile simpler than NPV/IRR, it is useful for quick assessments of marketing campaigns or small features.',
        keyTakeaway: 'ROI measures the percentage profit generated relative to the cost.'
      },
      {
        type: 'mcq',
        prompt: 'If you spend $10,000 on a marketing campaign and it generates $15,000 in net profit, what is the ROI?',
        options: [
          { text: '50%', correct: false, explanation: 'Wait, the formula is Net Profit / Cost. The net profit is $15,000. So $15k/$10k = 150%. If $15,000 was the *revenue*, net profit would be $5k, giving 50%.' },
          { text: '150%', correct: true, explanation: 'Assuming the $15,000 is stated as "net profit", $15,000 / $10,000 = 1.5 or 150%.' },
          { text: '15%', correct: false, explanation: 'Math error.' }
        ]
      },
      {
        type: 'teach',
        title: 'Cannibalization in Product Portfolios',
        body: 'Cannibalization occurs when a new product steals sales from a company\'s existing product.\nWhen projecting cash flows for a new product, PMs must subtract the lost margin from the old product to calculate the *incremental* value.',
        keyTakeaway: 'Always evaluate new products on their net incremental impact to the whole company.'
      },
      {
        type: 'mcq',
        prompt: 'When assessing the financial viability of a new "Pro" tier that might cannibalize the "Basic" tier, you should:',
        options: [
          { text: 'Ignore the Basic tier and only look at Pro tier revenues.', correct: false, explanation: 'This will overstate the value of the Pro tier to the company.' },
          { text: 'Subtract the lost margin of the Basic tier users who upgrade from the projected Pro tier revenues.', correct: true, explanation: 'You only care about the *incremental* or net new cash flows.' },
          { text: 'Add the revenues of both together and double them.', correct: false, explanation: 'Completely incorrect.' }
        ]
      },
      {
        type: 'teach',
        title: 'Portfolio Management (Build vs. Buy)',
        body: 'Companies often face the "Build vs. Buy" decision. \nBuilding a feature internally takes time and carries execution risk (R&D).\nBuying a startup is faster but often requires paying a massive premium (M&A).',
        keyTakeaway: 'Build vs. Buy is a trade-off between Time/Certainty and Financial Cost.'
      },
      {
        type: 'mcq',
        prompt: 'A key reason a company might choose to "Buy" (acquire) rather than "Build" internally is:',
        options: [
          { text: 'Buying is always cheaper than building.', correct: false, explanation: 'Acquisitions usually involve paying a premium.' },
          { text: 'To dramatically accelerate time-to-market and acquire an existing customer base.', correct: true, explanation: 'Buying trades money for speed and market share certainty.' },
          { text: 'To maximize internal developer morale.', correct: false, explanation: 'Engineers usually prefer building things themselves.' }
        ]
      },
      {
        type: 'teach',
        title: 'The Sunk Cost Fallacy',
        body: 'Sunk costs are past costs that have already been incurred and cannot be recovered.\nIn financial decision making (like whether to kill a failing project), sunk costs must be completely ignored.\nDecisions should be based ONLY on future expected cash flows.',
        keyTakeaway: 'Never throw good money after bad simply because you have already invested heavily.'
      },
      {
        type: 'mcq',
        prompt: 'The Sunk Cost Fallacy occurs when a PM says:',
        options: [
          { text: '"The NPV is negative, we should kill this project immediately."', correct: false, explanation: 'This is rational financial behavior.' },
          { text: '"We have already spent $2 million on this feature, so we have to launch it, even though it will lose money."', correct: true, explanation: 'This is the sunk cost fallacy. The $2M is gone; the decision should be based purely on the future.' },
          { text: '"Let\'s ignore past costs and look only at future ROI."', correct: false, explanation: 'This is the correct way to think, not a fallacy.' }
        ]
      }
    ]
  }
];
