<div align="center">
  <h1>PMverse</h1>
  <p><strong>The OS Simulator for Product Managers</strong></p>
  <p><i>Fast-track your PM career by practicing with real-world scenarios.</i></p>
  <a href="https://pmversestudio.web.app"><strong>Clock In Now</strong></a>
</div>

---

Welcome to **PMverse**, the only EdTech platform that acts like a real operating system, throwing you into the deep end of a chaotic startup. Product development used to mean reading static case studies, taking multiple-choice quizzes, and listening to lectures. We're here to change that. 

At PMverse, you don't just read about being a Product Manager—you *live* it. You will investigate real data, negotiate with AI stakeholders, and make hard strategic calls autonomously.

## 🎯 Why PMverse?

Whether you are aspiring to land your first APM role, preparing for grueling PM interviews, or aiming for a promotion, PMverse bridges the gap between theory and execution.

- **Real Experience, Zero Risk:** Gain the intuition that usually takes years of on-the-job experience to build, without risking real user metrics or company revenue.
- **Learn by Doing:** Your performance isn't graded on multiple-choice answers. It's graded on your ability to query databases, model retention, communicate effectively, and ship the right features.
- **Build a Proof-of-Work Portfolio:** As you solve cases, you earn multi-dimensional XP and badges. Export your verified public portfolio to show recruiters and hiring managers *exactly* what you can do.

## 🔄 The PMverse Experience (The Core Loop)

When you log into PMverse, you enter the virtual workspace of **NovaCart**, a fast-paced tech startup. Your day-to-day work revolves around a core loop:

1. **The Inbox (NovaMail):** Cases and crises arrive in your inbox. You'll receive business context, urgent demands, and sometimes conflicting information from leadership.
2. **The Investigation:** Dive into the company's toolset. Write SQL queries to verify claims, build spreadsheet models to check financial viability, and interview AI stakeholders to gather qualitative context.
3. **The Decision:** You must commit to a strategic decision (e.g., launching a feature, killing a product, or pivoting a roadmap). You will have to defend your decision using the exact evidence you've gathered.
4. **The Consequence:** You live with the results. You're evaluated via an evidence audit and earn XP across core PM skills: *Discovery, Analytics, Strategy, Leadership,* and *Communication*.

## 🛠️ Your Virtual Workspace

PMverse comes fully equipped with a suite of built-in applications simulating a modern tech company's tech stack:

| App | Name | Description |
| :---: | :--- | :--- |
| 📧 | **NovaMail** | Your primary communication hub. This is where you receive new cases, communicate with your team, and submit your final decisions. |
| 🗄️ | **NovaData SQL** | A live SQLite (WASM) database with a Monaco editor. Write real SQL queries to extract insights, verify stakeholder claims, and back your decisions with hard data. |
| 💬 | **Decision Center** | An AI-powered chat interface. Negotiate with, interview, and influence AI stakeholders (powered by in-browser LLMs) to gather qualitative context. |
| 📊 | **NovaSheets** | A live spreadsheet environment for building retention models, LTV/CAC projections, and financial impact analyses. |
| 📋 | **Sprint Board** | A drag-and-drop Kanban board featuring a rich-text editor for writing PRDs (Product Requirements Documents) and managing engineering capacity. |
| 🎓 | **PM Academy** | A comprehensive knowledge base covering 9 PM domains (from Analytics to Go-To-Market), featuring over 150 actionable lessons. |
| 💻 | **NovaCode IDE** | A full Node.js environment running directly in the browser via WebContainers for technical PM challenges. |
| 🗺️ | **Portfolio Map** | A strategic scatter plot tool for assessing and planning growth initiatives based on impact and effort. |

## 📈 Career Tracking & The PM Daily

As you progress through PMverse, you aren't just solving disjointed puzzles. You are building a career profile:

- **Rank Ladder:** Climb from Associate PM all the way to Chief Product Officer (CPO) by accumulating XP.
- **Skill Dimensions:** Track your growth across specific dimensions (Analytics, Strategy, Discovery) to identify your strengths and blind spots.
- **The PM Daily:** Protect your daily streak by answering a new, bite-sized PM challenge every single day.
- **Exportable Portfolio:** Generate a markdown portfolio of your achievements, completed cases, and current rank to share on LinkedIn or with recruiters.

---

## 🚀 Getting Started (For Users)

1. Navigate to **[PMverse Studio](https://pmversestudio.web.app)**.
2. Sign up to create your personalized profile.
3. Once you're on the desktop, open **NovaMail** to read your first email and begin your first case.

---

## 🏗️ Architecture & Local Development (For Contributors)

If you are a developer looking to contribute to PMverse, you can run the simulator locally.

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KuthadiRaghav/pmverse.git
   cd pmverse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

### Tech Stack Overview
- **Frontend Framework:** React (built with Vite)
- **State Management (Case Engine):** Located in `src/case/CaseContext.jsx`. It handles stage gating, evidence tracking, XP calculations, and persistence.
- **Data-Driven Cases:** Cases are pure data structures defined in files like `src/data/caseRetentionCliff.js`.
- **Stakeholder AI:** Intelligence is powered by in-browser WebLLM (Phi-3 via WebGPU) for fast, private inference, backed by Anthropic API integrations for personalized coaching.
- **Database Engine:** SQL queries run locally in the browser via `sql.js` (WASM).

> **Note:** Player state and case progress currently persist locally in the browser's `localStorage` or via Firebase Authentication if logged in.

---
<div align="center">
  <i>Ready to level up?</i><br/>
  <b><a href="https://pmversestudio.web.app">Start Your Journey Today</a></b>
</div>
