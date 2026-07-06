<div align="center">
  <h1>PMverse</h1>
  <p><strong>The OS Simulator for Product Managers</strong></p>
</div>

---

Product development used to mean reading case studies, taking multiple-choice quizzes, and listening to lectures.

**PMverse** is the only platform that acts like a real operating system, throwing you into the deep end of a chaotic startup where you have to investigate data, interview stakeholders, and make the hard calls—autonomously.

Clock in. Read your first email. Save the company.

---

## 🎯 What is PMverse?

PMverse is a product management simulator built entirely as a virtual desktop environment within your browser. Instead of passive learning, you play the role of a Product Manager inside a living, breathing tech company (NovaCart). You'll work on real, messy business cases using realistic tools—just like you would in a real job.

Your performance isn't graded on multiple-choice answers. It's graded on your ability to find the truth in the data, communicate effectively, and ship the right features.

## 🔄 The Core Loop

1. **The Inbox:** Cases arrive in **NovaMail**. You receive context, urgencies, and sometimes conflicting information from leadership.
2. **The Investigation:** You dig into the company's tools (SQL databases, spreadsheets, user feedback) to find evidence.
3. **The Decision:** You commit to a strategic decision and defend it with the evidence you've gathered.
4. **The Consequence:** You live with the results. You're graded via an evidence audit and earn multi-dimensional XP across core PM skills: *Discovery, Analytics, Strategy, Leadership,* and *Communication*.

**Example Case — The Retention Cliff:** NovaCart's week-4 retention has collapsed from 38% to 22%. The board meets in six weeks. The CEO is demanding a loyalty program. However, if you dig into the SQL database, the data tells a completely different story. It's up to you to find it.

## 🛠️ The Virtual Operating System

PMverse comes fully equipped with a suite of built-in applications to simulate a real work environment:

| Application | Description |
| :--- | :--- |
| 📧 **NovaMail** | Your primary communication hub. Where cases are delivered and decisions are submitted. (The Case Engine front-end) |
| 🗄️ **NovaData SQL** | A real SQLite (WASM) database with a Monaco editor. Write real SQL queries to extract insights. |
| 💬 **Decision Center** | Chat with AI stakeholders (powered by in-browser WebLLM with scripted fallbacks) to gather context and negotiate. |
| 📊 **NovaSheets** | A live spreadsheet environment for building retention impact and LTV/CAC models. |
| 📋 **Sprint Board** | A drag-and-drop Kanban board featuring a rich-text editor for writing PRDs (Product Requirements Documents). |
| 🎓 **PM Academy** | A comprehensive knowledge base covering 9 PM domains, featuring over 150 lessons and case studies. |
| 💻 **NovaCode IDE** | A full Node.js environment running directly in the browser via WebContainers. |
| 🗺️ **Portfolio Map** | A strategic scatter plot tool for assessing and planning growth initiatives. |

## 🚀 Getting Started (Local Development)

To run PMverse locally and contribute to the simulator:

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

> **Note:** Player state and case progress currently persist locally in your browser's `localStorage`.

## 🏗️ Architecture & Contributing

For developers looking to understand the hood or contribute to the project:

- **Frontend Framework:** React (built with Vite)
- **Case Engine:** The heart of the simulator lives in `src/case/CaseContext.jsx`. It handles stage gating, evidence tracking, stakeholder chats, XP calculations, and persistence.
- **Data Driven Cases:** Cases are pure data structures. You can find case definitions in files like `src/data/caseRetentionCliff.js`.
- **App Management:** The virtual OS handles window management via the custom `pmverse:open-app` DOM event.
- **Stakeholder AI:** Stakeholder intelligence is powered by in-browser WebLLM (Phi-3 via WebGPU) for fast, private inference, backed by robust per-persona scripted fallbacks for unsupported browsers.

*(Note: The original Express + Claude API prototype has been archived in the `legacy-prototype/` directory).*

---
<div align="center">
  <i>Stop guessing. Start practicing with real-world scenarios.</i><br/>
  <b><a href="https://pmversestudio.web.app">Clock in to PMverse</a></b>
</div>
