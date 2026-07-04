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
export const PART2_SKILLS = [
  {
    id: 'saas_metrics',
    title: 'Module 8: SaaS Metrics',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'Introduction to SaaS Metrics',
        body: 'Software as a Service (SaaS) businesses rely on recurring revenue. Traditional financial metrics like one-time sales volume are less relevant.\nInstead, SaaS focuses on metrics that track subscriptions, customer retention, and the cost of acquiring new users over time.',
        keyTakeaway: 'SaaS businesses are valued based on the predictability and growth of their recurring revenue streams.'
      },
      {
        type: 'teach',
        title: 'Monthly Recurring Revenue (MRR)',
        body: 'MRR is the predictable total revenue generated by your business from all active subscriptions in a given month.\nIt normalizes different billing plans (e.g., annual vs. monthly) into a single monthly figure.',
        keyTakeaway: 'MRR is the lifeblood of a SaaS business, providing a clear picture of current momentum.'
      },
      {
        type: 'mcq',
        prompt: 'If a customer signs a $12,000 annual contract, what is their contribution to MRR?',
        options: [
          { text: '$12,000', correct: false, explanation: 'That is the Annual Recurring Revenue (ARR) contribution.' },
          { text: '$1,000', correct: true, explanation: 'Correct. $12,000 divided by 12 months equals $1,000 MRR.' },
          { text: 'It depends on when they pay', correct: false, explanation: 'MRR is recognized ratably over the subscription term, regardless of cash collection.' }
        ]
      },
      {
        type: 'teach',
        title: 'Components of Net New MRR',
        body: 'Net New MRR shows how much your MRR grew (or shrank) this month.\nNet New MRR = New MRR + Expansion MRR - Churn MRR - Contraction MRR.\nTracking these components helps identify if growth is coming from new logos or existing customers.',
        keyTakeaway: 'Understanding the breakdown of MRR changes is crucial for diagnosing business health.'
      },
      {
        type: 'teach',
        title: 'Annual Recurring Revenue (ARR)',
        body: 'ARR is simply MRR multiplied by 12. It represents the annualized run rate of your current recurring revenue.\nEnterprise SaaS companies typically focus more on ARR than MRR because they deal with larger, multi-year contracts.',
        keyTakeaway: 'ARR provides a longer-term view of a company\'s recurring revenue trajectory.'
      },
      {
        type: 'mcq',
        prompt: 'Which scenario will decrease your Net New MRR?',
        options: [
          { text: 'A customer upgrades their plan', correct: false, explanation: 'This adds Expansion MRR, increasing Net New MRR.' },
          { text: 'A customer cancels their subscription', correct: true, explanation: 'This is Churn MRR, which subtracts from Net New MRR.' },
          { text: 'A new customer signs a multi-year deal', correct: false, explanation: 'This adds New MRR.' }
        ]
      },
      {
        type: 'teach',
        title: 'Customer Acquisition Cost (CAC)',
        body: 'CAC is the total cost of acquiring a new customer.\nCAC = (Total Sales & Marketing Expenses) / (Number of New Customers Acquired).\nThis includes ad spend, sales salaries, tools, and marketing overhead.',
        keyTakeaway: 'CAC measures the efficiency of your go-to-market engine.'
      },
      {
        type: 'teach',
        title: 'CAC Payback Period',
        body: 'CAC Payback Period is the time it takes for a customer to generate enough gross margin to cover their CAC.\nPayback Period = CAC / (MRR per Customer x Gross Margin %).\nA shorter payback period means the company can reinvest cash faster to grow.',
        keyTakeaway: 'A payback period of under 12 months is generally considered excellent for startups.'
      },
      {
        type: 'mcq',
        prompt: 'If you spent $10,000 on sales and marketing and acquired 20 customers, what is your CAC?',
        options: [
          { text: '$200', correct: false, explanation: 'Check the math again.' },
          { text: '$500', correct: true, explanation: '$10,000 divided by 20 customers equals a $500 CAC.' },
          { text: '$2,000', correct: false, explanation: 'Incorrect.' }
        ]
      },
      {
        type: 'teach',
        title: 'Lifetime Value (LTV)',
        body: 'LTV is the total gross margin you expect to earn from a customer over their entire relationship with your company.\nLTV = (Average Revenue Per User x Gross Margin %) / Customer Churn Rate.\nReducing churn has a massive impact on increasing LTV.',
        keyTakeaway: 'LTV estimates the long-term financial value of acquiring a customer.'
      },
      {
        type: 'teach',
        title: 'The LTV:CAC Ratio',
        body: 'The LTV:CAC ratio compares the value of a customer to the cost of acquiring them.\nAn LTV:CAC of 3:1 (you make $3 for every $1 spent) is often cited as the benchmark for a healthy SaaS business.\nIf it is too high (e.g., 8:1), you might be under-investing in growth.',
        keyTakeaway: 'The LTV:CAC ratio indicates the sustainability and profitability of your growth strategy.'
      },
      {
        type: 'mcq',
        prompt: 'What does an LTV:CAC ratio of 1:1 imply?',
        options: [
          { text: 'The business is highly profitable', correct: false, explanation: 'A 1:1 ratio means you are just breaking even on the gross margin of a customer, ignoring all other operating expenses.' },
          { text: 'The business is losing money on every acquired customer after operating expenses', correct: true, explanation: 'Correct. You spend exactly what you earn in gross margin, leaving nothing to cover R&D or G&A expenses.' },
          { text: 'The company is ready to scale aggressively', correct: false, explanation: 'Scaling a 1:1 engine will lead to massive cash burn.' }
        ]
      }
    ]
  },
  {
    id: 'saas_pricing',
    title: 'Module 9: SaaS Pricing Strategy',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'The Power of Pricing',
        body: 'Pricing is often the most under-optimized lever in a SaaS business. Improving monetization can have a far greater impact on revenue than acquiring new customers.\nPricing strategy involves deciding how you charge, what you charge, and who you charge.',
        keyTakeaway: 'Small improvements in pricing strategy can yield massive improvements in SaaS economics.'
      },
      {
        type: 'teach',
        title: 'Value-Based Pricing',
        body: 'Value-based pricing sets prices primarily on the perceived or estimated value of a product to the customer, rather than the cost to produce it or historical prices.\nThis requires deep understanding of customer ROI.',
        keyTakeaway: 'Charge based on the value you create, not the cost of your servers.'
      },
      {
        type: 'mcq',
        prompt: 'Which of the following is an example of value-based pricing?',
        options: [
          { text: 'Charging cost + 20% margin', correct: false, explanation: 'This is cost-plus pricing.' },
          { text: 'Charging slightly less than your biggest competitor', correct: false, explanation: 'This is competitor-based pricing.' },
          { text: 'Charging a percentage of the revenue you help the customer generate', correct: true, explanation: 'This directly ties the price to the value delivered.' }
        ]
      },
      {
        type: 'teach',
        title: 'Seat-Based Pricing',
        body: 'Seat-based (or per-user) pricing charges a fixed amount for every individual user who has access to the software.\nIt is easy to understand and predictable, making it popular for productivity tools (e.g., Slack, Jira).',
        keyTakeaway: 'Seat-based pricing aligns well with tools where value scales with team adoption.'
      },
      {
        type: 'teach',
        title: 'Drawbacks of Seat-Based Pricing',
        body: 'The main drawback is that it can discourage adoption. Customers may share logins to save money, limiting the product\'s spread within an organization.\nIt also fails to capture value if a single user gets massive ROI from the tool while others barely use it.',
        keyTakeaway: 'Seat-based pricing can artificially constrain your product\'s internal virality.'
      },
      {
        type: 'mcq',
        prompt: 'Why might a company avoid seat-based pricing for an analytics dashboard tool?',
        options: [
          { text: 'They want to encourage the whole company to look at the data', correct: true, explanation: 'Charging per seat would cause the company to restrict access, limiting the tool\'s value.' },
          { text: 'Analytics tools are too cheap to charge per seat', correct: false, explanation: 'Value is not strictly tied to the type of tool.' },
          { text: 'It is too hard to count seats', correct: false, explanation: 'Counting seats is generally technically simple.' }
        ]
      },
      {
        type: 'teach',
        title: 'Usage-Based Pricing',
        body: 'Usage-based (or consumption-based) pricing charges customers based on how much they actually use the product (e.g., API calls, gigabytes of storage, compute hours).\nExamples include AWS, Snowflake, and Stripe.',
        keyTakeaway: 'Usage-based pricing perfectly aligns cost with customer value realization.'
      },
      {
        type: 'teach',
        title: 'Pros and Cons of Usage Pricing',
        body: 'Pros: Low barrier to entry, expands automatically as customers grow (Net Retention > 100%).\nCons: Revenue can be highly unpredictable and seasonal. It\'s harder to forecast for both you and your customer.',
        keyTakeaway: 'Usage pricing offers high upside but sacrifices the predictability of traditional SaaS.'
      },
      {
        type: 'mcq',
        prompt: 'Which business is best suited for usage-based pricing?',
        options: [
          { text: 'A project management tool', correct: false, explanation: 'Value usually scales with the number of team members (seats).' },
          { text: 'A cloud infrastructure provider', correct: true, explanation: 'Value scales perfectly with the compute resources consumed.' },
          { text: 'A word processing app', correct: false, explanation: 'Usage is too inconsistent to predict revenue reliably.' }
        ]
      },
      {
        type: 'teach',
        title: 'Freemium vs. Free Trial',
        body: 'Freemium offers a stripped-down version of the product for free, forever. The goal is to build a massive user base and convert a small percentage to paid.\nA Free Trial offers the full product for a limited time (e.g., 14 days) to force a purchase decision.',
        keyTakeaway: 'Freemium is an acquisition strategy; Free Trial is a conversion strategy.'
      },
      {
        type: 'teach',
        title: 'Tiered Pricing (Good, Better, Best)',
        body: 'Tiered pricing offers different packages of features at different price points.\nThis allows you to serve different customer segments (e.g., SMB vs. Enterprise) and provides an upsell path as customers\' needs grow.',
        keyTakeaway: 'Tiered pricing helps capture consumer surplus across different willingness-to-pay segments.'
      }
    ]
  },
  {
    id: 'portfolio_management',
    title: 'Module 10: Strategic Portfolio Management',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'What is Strategic Portfolio Management?',
        body: 'In corporate finance, portfolio management isn\'t about stocks; it\'s about managing the company\'s portfolio of products, business units, or R&D initiatives.\nThe goal is to allocate capital to maximize overall corporate value and balance risk.',
        keyTakeaway: 'Treat your product lines like investments competing for limited capital.'
      },
      {
        type: 'teach',
        title: 'The BCG Matrix',
        body: 'The Boston Consulting Group (BCG) Matrix is a classic framework that categorizes business units into four quadrants based on Market Growth and Relative Market Share:\nStars, Cash Cows, Question Marks, and Dogs.',
        keyTakeaway: 'The BCG matrix helps visualize where cash is generated and where it should be invested.'
      },
      {
        type: 'mcq',
        prompt: 'In the BCG Matrix, what is a "Cash Cow"?',
        options: [
          { text: 'High market share, High market growth', correct: false, explanation: 'This is a Star.' },
          { text: 'High market share, Low market growth', correct: true, explanation: 'Cash Cows generate more cash than they need to maintain market share.' },
          { text: 'Low market share, High market growth', correct: false, explanation: 'This is a Question Mark.' }
        ]
      },
      {
        type: 'teach',
        title: 'Managing Cash Cows',
        body: 'Cash Cows require little investment to maintain their position. The strategy is to "milk" them.\nThe cash generated by Cash Cows should be extracted and reallocated to fund future growth opportunities (Stars and Question Marks).',
        keyTakeaway: 'Do not over-invest in Cash Cows; use them to fund the future.'
      },
      {
        type: 'teach',
        title: 'Dealing with Dogs',
        body: 'Dogs have low market share in low-growth markets. They often barely break even and consume management time.\nThe typical strategy for Dogs is divestiture (selling them off) or liquidation.',
        keyTakeaway: 'Dogs drag down overall portfolio performance and should usually be eliminated.'
      },
      {
        type: 'mcq',
        prompt: 'What is the primary challenge of a "Question Mark"?',
        options: [
          { text: 'It generates too much cash', correct: false, explanation: 'Question marks usually consume cash.' },
          { text: 'It requires heavy investment to gain market share with uncertain returns', correct: true, explanation: 'Because the market is growing fast but your share is low, you must invest heavily to turn it into a Star.' },
          { text: 'The market is shrinking rapidly', correct: false, explanation: 'Question marks are in high-growth markets.' }
        ]
      },
      {
        type: 'teach',
        title: 'Capital Allocation',
        body: 'Capital allocation is the process of deciding how to spend the company\'s money. Options include R&D, M&A, paying dividends, or buying back stock.\nEffective portfolio management directly informs capital allocation decisions.',
        keyTakeaway: 'Capital allocation is arguably a CEO\'s most important job.'
      },
      {
        type: 'teach',
        title: 'Horizon Planning (McKinsey 3 Horizons)',
        body: 'Horizon 1: Core businesses providing current cash flow.\nHorizon 2: Emerging opportunities expected to generate significant profits in the medium term.\nHorizon 3: Ideas for profitable growth down the road (moonshots).',
        keyTakeaway: 'A balanced portfolio allocates resources across all three horizons.'
      },
      {
        type: 'mcq',
        prompt: 'Which of the following is an example of Horizon 3 investment for a traditional automaker?',
        options: [
          { text: 'Improving the fuel efficiency of existing engines', correct: false, explanation: 'This is defending the core (Horizon 1).' },
          { text: 'Launching a new line of hybrid SUVs next year', correct: false, explanation: 'This is Horizon 2 (near-term emerging).' },
          { text: 'R&D into fully autonomous flying taxi prototypes', correct: true, explanation: 'This is a long-term, high-risk moonshot (Horizon 3).' }
        ]
      },
      {
        type: 'teach',
        title: 'Cannibalization Risk',
        body: 'When introducing a new product to the portfolio, it might steal sales from an existing, more profitable product (cannibalization).\nHowever, if a market transition is inevitable, it is better to cannibalize yourself than let a competitor do it.',
        keyTakeaway: 'Fear of cannibalization often paralyzes incumbents, leaving them vulnerable to disruption.'
      },
      {
        type: 'teach',
        title: 'Real Options Analysis',
        body: 'Real options apply financial options theory to physical or business assets. It values the flexibility to expand, delay, or abandon a project later.\nPhased R&D investments are a type of real option—you pay a little now for the right to invest more later if results are good.',
        keyTakeaway: 'Real options help justify investments in highly uncertain, high-potential projects.'
      }
    ]
  },
  {
    id: 'mergers_and_acquisitions',
    title: 'Module 11: M&A (Mergers and Acquisitions)',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'What is M&A?',
        body: 'Mergers and Acquisitions refer to the consolidation of companies or assets.\nAn acquisition is when one company buys another outright. A merger is when two roughly equal companies combine to form a new entity.',
        keyTakeaway: 'M&A is a tool for rapid inorganic growth or strategic realignment.'
      },
      {
        type: 'teach',
        title: 'Strategic Rationale for M&A',
        body: 'Companies buy others for various reasons: to enter new markets, acquire new technologies, eliminate competition, or achieve economies of scale.\nThe core financial justification must be that the combined company is worth more than the sum of its parts.',
        keyTakeaway: 'Every M&A deal must have a clear strategic thesis for value creation.'
      },
      {
        type: 'mcq',
        prompt: 'What is it called when a company acquires one of its suppliers?',
        options: [
          { text: 'Horizontal Integration', correct: false, explanation: 'That is buying a competitor at the same level of the value chain.' },
          { text: 'Vertical Integration (Backward)', correct: true, explanation: 'Acquiring a supplier is backward vertical integration to secure the supply chain.' },
          { text: 'Conglomerate Merger', correct: false, explanation: 'That involves unrelated businesses.' }
        ]
      },
      {
        type: 'teach',
        title: 'Synergies',
        body: 'Synergy is the concept that 1 + 1 = 3. \nCost synergies come from eliminating redundancies (e.g., combining HR departments, closing overlapping offices).\nRevenue synergies come from cross-selling products or accessing new channels.',
        keyTakeaway: 'Synergies are the financial justification for paying a premium for a target company.'
      },
      {
        type: 'teach',
        title: 'Cost vs. Revenue Synergies',
        body: 'Cost synergies are generally considered highly achievable and are heavily weighted by investors.\nRevenue synergies are notoriously difficult to realize and are often viewed with skepticism by the market.',
        keyTakeaway: 'In M&A models, cost synergies are bankable; revenue synergies are often a hope.'
      },
      {
        type: 'mcq',
        prompt: 'Which of the following is an example of a cost synergy?',
        options: [
          { text: 'Selling the target company\'s software to the acquirer\'s customers', correct: false, explanation: 'This is a revenue synergy.' },
          { text: 'Shutting down the target company\'s redundant data centers', correct: true, explanation: 'This reduces operating expenses immediately.' },
          { text: 'Raising prices due to decreased competition', correct: false, explanation: 'This is a revenue synergy (and potentially an antitrust issue).' }
        ]
      },
      {
        type: 'teach',
        title: 'Acquisition Premium',
        body: 'To persuade a target company\'s shareholders to sell, the acquirer usually must pay a price higher than the current market value.\nThis difference is the acquisition premium.\nIf the premium paid is greater than the realized synergies, the deal destroys value.',
        keyTakeaway: 'Overpaying is the most common reason M&A deals fail to create value.'
      },
      {
        type: 'teach',
        title: 'The Role of the Product Manager in M&A',
        body: 'Pre-deal, PMs help with technical and product due diligence (evaluating the target\'s code, roadmap, and tech debt).\nPost-deal, PMs are critical in integration—merging roadmaps, unifying user experiences, and realizing product synergies.',
        keyTakeaway: 'Product managers turn the M&A thesis into reality during post-merger integration.'
      },
      {
        type: 'mcq',
        prompt: 'What is a major risk during post-merger product integration?',
        options: [
          { text: 'Realizing cost synergies too quickly', correct: false, explanation: 'This is generally a positive outcome.' },
          { text: 'Cultural clashes causing key engineering and product talent to leave', correct: true, explanation: 'Talent retention is a primary risk, often destroying the value of the acquired tech.' },
          { text: 'Decreased brand awareness', correct: false, explanation: 'Not typically the primary product integration risk.' }
        ]
      },
      {
        type: 'teach',
        title: 'Build vs. Buy vs. Partner',
        body: 'Before an acquisition, companies evaluate if they can achieve the goal internally (Build) or through an alliance (Partner).\nBuild is slower but retains control. Buy is fast but expensive and risky. Partner is low-commitment but offers less control.',
        keyTakeaway: 'M&A should be weighed against internal development and strategic partnerships.'
      }
    ]
  },
  {
    id: 'corporate_valuation',
    title: 'Module 12: Corporate Valuation',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'Introduction to Valuation',
        body: 'Valuation is the process of determining the economic worth of an asset or company.\nIn corporate finance, understanding valuation helps PMs understand how their product decisions ultimately impact the company\'s stock price or enterprise value.',
        keyTakeaway: 'Valuation translates product success into financial worth.'
      },
      {
        type: 'teach',
        title: 'Enterprise Value (EV) vs. Equity Value',
        body: 'Equity Value (Market Cap) is the value of all outstanding shares (what the shareholders own).\nEnterprise Value (EV) is the total value of the company\'s core operations to all investors (debt and equity), calculated as Equity Value + Debt - Cash.',
        keyTakeaway: 'EV represents the true cost to acquire the entire business.'
      },
      {
        type: 'mcq',
        prompt: 'A company has a Market Cap of $100M, Debt of $20M, and Cash of $10M. What is its Enterprise Value (EV)?',
        options: [
          { text: '$110M', correct: true, explanation: 'EV = $100M (Equity) + $20M (Debt) - $10M (Cash) = $110M.' },
          { text: '$130M', correct: false, explanation: 'You must subtract cash.' },
          { text: '$90M', correct: false, explanation: 'You must add debt.' }
        ]
      },
      {
        type: 'teach',
        title: 'Discounted Cash Flow (DCF)',
        body: 'DCF is the intrinsic valuation method. It states a company is worth the present value of all its future free cash flows.\nIt requires forecasting cash flows far into the future and discounting them back to today using the Weighted Average Cost of Capital (WACC).',
        keyTakeaway: 'A company\'s value fundamentally rests on its ability to generate future cash.'
      },
      {
        type: 'teach',
        title: 'The Discount Rate (WACC)',
        body: 'Money today is worth more than money tomorrow (Time Value of Money).\nThe discount rate reflects the riskiness of the cash flows. A higher risk project/company will have a higher discount rate, which lowers the present value.',
        keyTakeaway: 'Risk directly destroys present value; predictable businesses are worth more.'
      },
      {
        type: 'mcq',
        prompt: 'If interest rates rise significantly across the economy, what generally happens to DCF valuations?',
        options: [
          { text: 'They increase', correct: false, explanation: 'Higher interest rates increase the discount rate.' },
          { text: 'They decrease', correct: true, explanation: 'Higher interest rates increase the discount rate (WACC), which lowers the present value of future cash flows.' },
          { text: 'They remain unchanged', correct: false, explanation: 'Interest rates are a key component of WACC.' }
        ]
      },
      {
        type: 'teach',
        title: 'Comparable Company Analysis (Comps)',
        body: 'Comps is a relative valuation method. It values a company based on how similar public companies are priced by the market.\nYou look at metrics like EV/Revenue or EV/EBITDA multiples for peers and apply them to your target.',
        keyTakeaway: 'Comps tell you what the market is currently willing to pay for similar assets.'
      },
      {
        type: 'teach',
        title: 'Precedent Transactions',
        body: 'This relative valuation method looks at past M&A deals involving similar companies.\nBecause these deals include an "acquisition premium" paid for control, precedent transaction valuations are usually higher than public Comps.',
        keyTakeaway: 'Precedent transactions estimate the value of a company to a strategic buyer.'
      },
      {
        type: 'mcq',
        prompt: 'Why are SaaS companies often valued using EV/Revenue multiples rather than Price-to-Earnings (P/E)?',
        options: [
          { text: 'Because SaaS revenue is always higher than other industries', correct: false, explanation: 'Absolute revenue isn\'t the reason for the metric choice.' },
          { text: 'Because many high-growth SaaS companies are deliberately unprofitable (no earnings) to fund growth', correct: true, explanation: 'If earnings are negative, P/E is meaningless. Revenue multiples capture growth potential.' },
          { text: 'Because enterprise value is easier to calculate', correct: false, explanation: 'P/E uses market cap, which is actually easier to calculate than EV.' }
        ]
      },
      {
        type: 'teach',
        title: 'The Rule of 40',
        body: 'The Rule of 40 is a quick heuristic for SaaS valuation. It states that a SaaS company\'s Growth Rate (%) plus its Profit Margin (%) should exceed 40%.\nCompanies that exceed this rule typically command premium valuation multiples.',
        keyTakeaway: 'The Rule of 40 shows that investors value both growth and profitability, allowing tradeoffs between the two.'
      }
    ]
  },
  {
    id: 'ai_economics',
    title: 'Module 13: AI Economics',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'The Shift in Compute Economics',
        body: 'Traditional software scales cheaply; once written, the marginal cost of serving another user is near zero.\nGenerative AI fundamentally changes this. Every query requires heavy, expensive compute (inference) on GPUs.',
        keyTakeaway: 'AI introduces significant Variable Costs (COGS) to the traditional SaaS model.'
      },
      {
        type: 'teach',
        title: 'Training vs. Inference Costs',
        body: 'Training: The massive, upfront capital expenditure (CapEx) to build a foundation model. It requires thousands of GPUs running for months.\nInference: The ongoing operational expense (OpEx) of running the model to generate responses for users.',
        keyTakeaway: 'Training is a fixed cost; Inference is a variable cost tied directly to usage.'
      },
      {
        type: 'mcq',
        prompt: 'When a user asks ChatGPT a question, which type of compute cost is primarily incurred?',
        options: [
          { text: 'Training Cost', correct: false, explanation: 'Training happened before the model was released.' },
          { text: 'Inference Cost', correct: true, explanation: 'Generating the specific response in real-time is inference.' },
          { text: 'Fine-tuning Cost', correct: false, explanation: 'Fine-tuning modifies the model; inference just runs it.' }
        ]
      },
      {
        type: 'teach',
        title: 'The Token Economy',
        body: 'In LLMs, a "token" is a chunk of text (roughly 3/4 of a word). API providers charge based on tokens.\nInput Tokens: The prompt provided by the user.\nOutput Tokens: The response generated by the AI (usually more expensive to compute).',
        keyTakeaway: 'Tokens are the fundamental unit of cost and pricing in Generative AI.'
      },
      {
        type: 'teach',
        title: 'Prompt Engineering as Cost Control',
        body: 'Because API costs scale with tokens, inefficient prompts with huge contexts cost real money.\nOptimizing prompts, using RAG efficiently, and minimizing unnecessary context are technical tasks with direct financial impact.',
        keyTakeaway: 'In AI products, code efficiency directly and immediately impacts gross margins.'
      },
      {
        type: 'mcq',
        prompt: 'If an AI API charges $0.01 per 1k input tokens and $0.03 per 1k output tokens, why might summarizing a long document be expensive?',
        options: [
          { text: 'The output is very long', correct: false, explanation: 'Summaries are short, so output tokens are low.' },
          { text: 'The input context window requires passing the entire long document as input tokens', correct: true, explanation: 'Even though the summary is short, reading the massive document consumes millions of input tokens.' },
          { text: 'Summarization requires specialized training', correct: false, explanation: 'This is handled by the general inference API.' }
        ]
      },
      {
        type: 'teach',
        title: 'Gross Margin Compression',
        body: 'Traditional SaaS boasts gross margins of 80-90%.\nBecause of high inference costs, AI wrappers or heavy AI features often pull company gross margins down to 50-60%.',
        keyTakeaway: 'AI PMs must constantly balance product magic against the threat of margin compression.'
      },
      {
        type: 'teach',
        title: 'GPU Scarcity and Capital Intensity',
        body: 'The AI boom created a massive supply-demand imbalance for advanced GPUs (like Nvidia H100s).\nAccess to compute became a competitive moat. Startups must raise massive rounds just to secure compute, increasing capital intensity.',
        keyTakeaway: 'Compute is the new oil, dictating the pace of AI innovation.'
      },
      {
        type: 'mcq',
        prompt: 'What happens to an AI feature\'s profitability if it goes viral but lacks a monetization lever?',
        options: [
          { text: 'Profitability increases due to economies of scale', correct: false, explanation: 'Inference costs scale linearly.' },
          { text: 'The company experiences rapid margin destruction as inference bills skyrocket', correct: true, explanation: 'Without revenue to offset the variable compute costs, virality can bankrupt an AI startup.' },
          { text: 'The training cost goes down', correct: false, explanation: 'Training costs are sunk.' }
        ]
      },
      {
        type: 'teach',
        title: 'Model Routing and Tiering',
        body: 'To manage costs, PMs use model routing: sending simple tasks to cheap, fast models (e.g., Haiku, GPT-4o-mini) and reserving expensive, slow models (e.g., Opus, GPT-4o) only for complex reasoning tasks.',
        keyTakeaway: 'Model routing is a primary lever for optimizing AI gross margins.'
      }
    ]
  },
  {
    id: 'ai_business_models',
    title: 'Module 14: AI Business Models',
    locked: false,
    lessons: [
      {
        type: 'teach',
        title: 'The AI Value Chain',
        body: 'The AI market has three main layers:\n1. Silicon / Cloud (Nvidia, AWS) - The hardware.\n2. Foundation Models (OpenAI, Anthropic) - The base intelligence.\n3. Applications (Jasper, Harvey) - The end-user workflow solutions.',
        keyTakeaway: 'Understanding where your product sits in the value chain dictates your business model.'
      },
      {
        type: 'teach',
        title: 'Model-as-a-Service (MaaS)',
        body: 'Foundation model providers operate as MaaS. They monetize via API usage (per-token pricing).\nThis is a high-volume, utility-like business requiring massive scale and CapEx to survive.',
        keyTakeaway: 'MaaS providers compete on capability, speed, and cost-per-token.'
      },
      {
        type: 'mcq',
        prompt: 'Which company primarily operates at the "Foundation Model" layer of the value chain?',
        options: [
          { text: 'Nvidia', correct: false, explanation: 'Nvidia provides the silicon.' },
          { text: 'Anthropic', correct: true, explanation: 'Anthropic builds foundation models like Claude and exposes them via API.' },
          { text: 'Salesforce', correct: false, explanation: 'Salesforce is at the Application layer.' }
        ]
      },
      {
        type: 'teach',
        title: 'The "Thin Wrapper" Problem',
        body: 'An AI application that only provides a basic UI over an OpenAI API call is a "thin wrapper."\nThese lack defensive moats. If the underlying model improves or releases a similar UI, the wrapper is destroyed.',
        keyTakeaway: 'AI applications must build workflow, proprietary data, or deep integrations to survive.'
      },
      {
        type: 'teach',
        title: 'Copilots vs. Autopilots',
        body: 'Copilots assist humans (e.g., GitHub Copilot suggesting code). They are priced per seat like traditional SaaS.\nAutopilots act autonomously (AI agents). Charging per seat makes less sense; they should be charged based on work completed.',
        keyTakeaway: 'As AI moves from assisting to executing, pricing must evolve from seats to outcomes.'
      },
      {
        type: 'mcq',
        prompt: 'How should a fully autonomous AI customer service agent best be priced?',
        options: [
          { text: 'Per seat (per AI agent)', correct: false, explanation: 'AI agents don\'t take up human seats.' },
          { text: 'Per successful ticket resolved', correct: true, explanation: 'Outcome-based pricing aligns perfectly with the value delivered by autonomous agents.' },
          { text: 'Flat monthly fee', correct: false, explanation: 'This doesn\'t capture the variable value of volume.' }
        ]
      },
      {
        type: 'teach',
        title: 'Outcome-Based Pricing',
        body: 'Outcome-based pricing charges for the result, not the software. If an AI writes a blog post, you charge per post. If it resolves a legal document, you charge per document.\nThis captures the labor replacement value of AI.',
        keyTakeaway: 'AI allows software to compete in the Services TAM (Total Addressable Market), not just the Software TAM.'
      },
      {
        type: 'teach',
        title: 'Bring Your Own Key (BYOK)',
        body: 'Some enterprise AI tools ask customers to provide their own OpenAI/Anthropic API keys.\nPros: Offloads the variable inference cost to the customer.\nCons: Creates friction in onboarding and limits the app\'s ability to capture margin on the intelligence layer.',
        keyTakeaway: 'BYOK is a margin-protection strategy, but it sacrifices user experience.'
      },
      {
        type: 'mcq',
        prompt: 'Why would an AI application choose to incur inference costs themselves rather than using a BYOK model?',
        options: [
          { text: 'To reduce their own revenue', correct: false, explanation: 'That is not the goal.' },
          { text: 'To provide a seamless, frictionless user experience', correct: true, explanation: 'Users hate managing API keys. Bundling the cost into a subscription removes this friction.' },
          { text: 'To increase customer churn', correct: false, explanation: 'Frictionless experiences reduce churn.' }
        ]
      },
      {
        type: 'teach',
        title: 'Data Moats in AI',
        body: 'Since base models are commoditizing, the primary differentiator for AI apps is proprietary data.\nFine-tuning open-source models on unique, company-specific data creates a product experience that generic models cannot replicate.',
        keyTakeaway: 'Your data strategy is your AI business strategy.'
      }
    ]
  }
];
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
