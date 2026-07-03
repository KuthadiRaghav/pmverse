# PMVerse

A lightweight React + Vite frontend for PMVerse — a small project for exploring product management simulations and experimentation. This repository contains a Vite + React app (main app) and a legacy-prototype server demonstrating an earlier simulation vertical slice.

This README is designed to help contributors, users, and maintainers quickly understand, run, and contribute to the project.

---

## Table of contents

- About
- Features
- Tech stack
- Quick start
- Available scripts
- Project structure
- Legacy prototype
- Contributing
- Reporting issues & feature requests
- Roadmap
- License & contact

---

## About

PMVerse is an experimental project that explores simulation-driven product management tooling and small interactive experiences. The current repository contains a Vite + React frontend (using Monaco editor and sql.js) and a legacy prototype server demonstrating an earlier simulation involving retention modelling.

This repo's purpose:
- Provide a simple, fast frontend to prototype simulation UI and editor experiences.
- Store a legacy prototype that demonstrates server-driven simulation logic.
- Be a starting point for contributors to extend simulation models or UI components.

---

## Features

- React + Vite application with fast HMR for development
- Monaco editor integration for code or SQL editing
- In-browser SQL engine using sql.js for local demos and experimentation
- Linting using oxlint
- Legacy prototype (Node + Express) demonstrating a sample simulation and integration with Anthropic SDK (kept separate)

---

## Tech stack

- React 19
- Vite 8
- Monaco Editor (@monaco-editor/react)
- sql.js (in-browser SQLite)
- oxlint for linting
- Legacy prototype uses Express and the Anthropic SDK

---

## Quick start (developer)

Prerequisites:
- Node.js 18 or newer
- npm (or yarn/pnpm)

1. Clone the repo

```bash
git clone https://github.com/KuthadiRaghav/pmverse.git
cd pmverse
```

2. Install dependencies

```bash
npm install
```

3. Start the dev server

```bash
npm run dev
```

Open http://localhost:5173 (or the port shown in your terminal).

4. Build for production

```bash
npm run build
```

5. Preview the production build locally

```bash
npm run preview
```

6. Run the linter

```bash
npm run lint
```

---

## Available scripts

These scripts are defined in the root `package.json`:

- `dev` — run Vite dev server (HMR)
- `build` — build a production bundle with Vite
- `preview` — locally preview the production build
- `lint` — run oxlint

The legacy prototype has its own package.json under `legacy-prototype/` and can be started with:

```bash
cd legacy-prototype
npm install
npm start
```

Note: The legacy prototype depends on the Anthropic SDK and is intended as a demonstration; it may require environment variables or API keys if you want to run the same external integrations.

---

## Project structure (high level)

- /public — static assets served by Vite
- /src — React application source code
  - /components — presentational and container components
  - /pages — route-level pages
  - /styles — global and component CSS
  - main.jsx — application entry
- /legacy-prototype — older Node/Express prototype demonstrating the retention simulation
- package.json — root project scripts & dependencies

If you want a guided tour of a specific file or feature, open an issue or mention it in a PR and we can add more documentation.

---

## Legacy prototype

The `legacy-prototype` directory contains a small Node/Express server that was used to prototype a simulation vertical slice called “The Retention Cliff”. It also references the Anthropic SDK — check `legacy-prototype/package.json` for details.

Run it locally if you want to compare the server-driven approach with the current in-browser approach.

---

## Contributing

Contributions are welcome. A simple workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make changes and add tests if applicable
4. Run `npm install` and confirm `npm run dev` and `npm run lint` pass locally
5. Open a Pull Request describing the change and why it’s needed

Be respectful in code reviews and keep commits small and focused. If you'd like help getting started, open an issue with "help wanted" and a short description of what you want to work on.

---

## Reporting issues & feature requests

Use the GitHub Issues tab to report bugs or request features. When filing an issue, please include:
- A clear title and description
- Steps to reproduce (if a bug)
- Expected vs actual behavior
- Any relevant logs, screenshots, or minimal repro

---

## Roadmap / ideas

- Improve simulation models and provide example scenarios
- Add tests and CI for the frontend and prototype
- Add TypeScript support and type-aware linting
- Split reusable components into a library for reuse

If you want to work on any of these, please open an issue so we can coordinate.

---

## License

This repository does not currently include a license file. If you want to open-source it, consider adding an OSI-approved license such as MIT or Apache-2.0.

---

## Contact

Author: KuthadiRaghav

Happy to accept contributions and issues — thanks for checking out PMVerse!
