# PMverse OS

A product-management simulator built as a virtual desktop: you play a PM inside
a living company, working real cases in real tools.

## The loop

Cases arrive in **NovaMail**. You investigate with the company's tools, commit
a decision, then live with the consequences — graded with an evidence audit
and multi-dimensional XP (Discovery / Analytics / Strategy / Leadership /
Communication).

**Case 001 — The Retention Cliff:** NovaCart's week-4 retention collapsed from
38% → 22%. The board meets in six weeks. The CEO wants a loyalty program. The
data says otherwise — if you go looking for it.

## The apps

| App | What it is |
|---|---|
| NovaMail | Case delivery + decisions (the Case Engine front-end) |
| NovaData SQL | Real SQLite (WASM) + Monaco, with case missions |
| Decision Center | AI stakeholders (in-browser WebLLM, scripted fallback) |
| NovaSheets | Live spreadsheet — retention impact + LTV/CAC models |
| Sprint Board | Drag-and-drop kanban with rich-text PRDs |
| PM Academy | 9 domains, ~150 lessons + case studies |
| NovaCode IDE | Full Node.js in the browser (WebContainers) |
| Portfolio Map / Growth SAT | Strategy scatter + assessment |

## Run

```bash
npm install
npm run dev   # Vite, http://localhost:5173
```

Case/player state persists in localStorage. The original Express + Claude API
prototype lives in `legacy-prototype/`.

## Architecture notes

- **Case Engine:** `src/case/CaseContext.jsx` — stage gating, evidence,
  chats, XP, persistence. Cases are pure data: `src/data/caseRetentionCliff.js`.
- Apps request windows via the `pmverse:open-app` DOM event.
- Stakeholder AI: WebLLM (Phi-3, WebGPU) with per-persona scripted fallback.
