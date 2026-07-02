/* PMVerse prototype — The Retention Cliff (Simulation Engine vertical slice) */

// ---------------------------------------------------------------------------
// Static scenario data
// ---------------------------------------------------------------------------
const PERSONAS = {
  ceo: {
    name: "Maya Chen", role: "Co-founder & CEO", color: "#f0a53c",
    intro: "Alex — glad you're finally here. The board meets in six weeks and retention is in freefall. I have a theory, but you're the PM: tell me what you need.",
  },
  em: {
    name: "Dev Patel", role: "Engineering Manager", color: "#7aa2f7",
    intro: "Hey. Fair warning — I've got four engineers and a mountain of maintenance, so whatever you're about to propose, it better be one thing, not five.",
  },
  analyst: {
    name: "Sara Kim", role: "Data Analyst", color: "#3fd0b6",
    intro: "Oh good, the new PM. Everyone here has an opinion about the retention drop; almost nobody has asked me for the actual numbers. What do you want to know?",
  },
  customer: {
    name: "Jordan Rivera", role: "Customer · 2 years", color: "#e28fb9",
    intro: "Hi! Happy to chat — I've been using NovaRide for about two years to book rides for my kids. Ask me anything, I'll be honest.",
  },
};

const DATA_CARDS = [
  {
    id: "cohorts", title: "Week-4 retention by cohort", teaser: "Weekly signup cohorts, last 14 weeks", key: true,
    render: () => `
      <h3>Week-4 retention by weekly cohort</h3>
      <p class="detail-sub">Share of each weekly signup cohort still active 4 weeks later</p>
      <div class="mini-bars">
        ${[38, 39, 37, 38, 36, 24, 23, 22, 23, 21, 22]
          .map((v, i) => `<div class="mini-bar ${i >= 5 ? "hot" : ""}" style="height:${v * 2.2}%"><span>${v}%</span></div>`)
          .join("")}
      </div>
      <div class="mini-bar-labels">
        ${["-14w", "-13w", "-12w", "-11w", "-10w", "-9w", "-8w", "-7w", "-6w", "-5w", "-4w"].map((l) => `<span>${l}</span>`).join("")}
      </div>
      <div class="annotation">⚑ The cliff begins with the cohort acquired 9 weeks ago — the exact week release v2.4 shipped. Every cohort since retains ~15pts worse.</div>`,
  },
  {
    id: "funnel", title: "Booking funnel & latency", teaser: "Completion rate and p75 latency by platform", key: true,
    render: () => `
      <h3>Booking funnel &amp; latency</h3>
      <p class="detail-sub">Since release v2.4 (9 weeks ago) vs. prior quarter</p>
      <table>
        <tr><th>Metric</th><th>Before v2.4</th><th>After v2.4</th></tr>
        <tr><td>Mobile booking completion</td><td>71%</td><td class="bad">49% (−31%)</td></tr>
        <tr><td>Desktop booking completion</td><td>74%</td><td class="good">73% (flat)</td></tr>
        <tr><td>Mobile p75 booking latency</td><td>2.4s</td><td class="bad">9.1s</td></tr>
        <tr><td>Desktop p75 booking latency</td><td>1.9s</td><td class="good">2.0s</td></tr>
      </table>
      <div class="annotation">⚑ Mobile-only collapse, starting at v2.4. Users hit the book step, wait, and abandon.</div>`,
  },
  {
    id: "reviews", title: "App store ratings", teaser: "Rating trend and recent review excerpts", key: false,
    render: () => `
      <h3>App store ratings</h3>
      <p class="detail-sub">Trailing 90 days</p>
      <table>
        <tr><th>Period</th><th>Avg rating</th></tr>
        <tr><td>3 months ago</td><td class="good">4.6 ★</td></tr>
        <tr><td>Last 30 days</td><td class="bad">3.8 ★</td></tr>
      </table>
      <p class="detail-sub" style="margin-top:14px">Recent excerpts:</p>
      <table>
        <tr><td>"Booking spinner forever. Gave up twice this week." — ★☆☆☆☆</td></tr>
        <tr><td>"Love the drivers but the app has gotten SO slow to book." — ★★☆☆☆</td></tr>
        <tr><td>"Also why am I getting 5 promo emails a week now??" — ★★★☆☆</td></tr>
      </table>`,
  },
  {
    id: "email", title: "Email program metrics", teaser: "Send volume, unsubscribes, CTR", key: false,
    render: () => `
      <h3>Email program metrics</h3>
      <p class="detail-sub">Marketing increased cadence ~10 weeks ago</p>
      <table>
        <tr><th>Metric</th><th>Before</th><th>After</th></tr>
        <tr><td>Promo sends / week</td><td>2</td><td class="bad">5</td></tr>
        <tr><td>Unsubscribe rate</td><td>0.4%</td><td class="bad">1.1%</td></tr>
        <tr><td>Click-through rate</td><td>3.1%</td><td class="bad">1.7%</td></tr>
      </table>
      <div class="annotation">⚑ Real damage, but second-order: unsubscribes hurt reach — they don't explain a 16-point mobile retention cliff.</div>`,
  },
];

const TRIAGE_EMAILS = [
  {
    id: "e1", sender: "VP of Operations", subject: "URGENT: B2B School District Deal", date: "Today 9:15 AM",
    body: "Hey, we are about to lose a massive $50k/MRR contract with the unified school district. They need a custom Background Check API integration by Friday for their drivers. Can we pull an engineer off the main roadmap to build this?",
    choices: [
      { text: "Build it (Save deal, distract team)", runway: 50000, trust: 10, morale: -15, feedback: "You saved the district deal, but the engineers are frustrated by the distraction from the core product." },
      { text: "Say no (Protect roadmap, lose deal)", runway: -50000, trust: -10, morale: 5, feedback: "The engineering team respects you for holding the line, but Operations is furious about losing the revenue." }
    ]
  },
  {
    id: "e2", sender: "Dev Patel (EM)", subject: "Tech Debt Crisis - Payment Gateway", date: "Yesterday 4:30 PM",
    body: "The legacy Stripe API we are using for parent payments is being deprecated next month. If we don't spend the next two sprints migrating it, ride booking will completely break. Maya (CEO) wants to push it back to ship the new 'Ride Tracker' feature. What do we do?",
    choices: [
      { text: "Migrate now (Delay features)", runway: -100000, trust: -5, morale: 15, feedback: "You took a hit on runway due to delayed features, but the payment system is safe and engineering trusts you." },
      { text: "Push it back (Ship features)", runway: 150000, trust: 10, morale: -20, feedback: "Maya is happy the Tracker shipped, but the engineers are stressed out about the ticking API time bomb." }
    ]
  }
];

const DECISIONS = {
  perf: {
    title: "Fix the v2.4 mobile checkout regression",
    pitch: "Repair the payments-SDK performance regression behind the 9-second mobile checkout, and ask marketing to cut email volume back to 2/week while you're at it.",
    time: "≈ 3 weeks · 2 engineers", backer: "Dev flagged something in v2.4…",
    quality: 100, verdictClass: "good", verdict: "Root cause, found and fixed.",
    metrics: [
      { label: "Week-4 retention", value: "34%", delta: "▲ from 22%", dir: "up" },
      { label: "Mobile checkout p75", value: "2.6s", delta: "▼ from 9.1s", dir: "up" },
      { label: "Board reaction", value: "Relieved", delta: "Series B talks resume", dir: "up" },
    ],
    narrative: `<strong>Eight weeks later.</strong> The fix ships in week 3. Mobile checkout p75 drops from 9.1s to 2.6s, and completion climbs back within a week — users who hit "pay" actually get to pay. New cohorts retain at 34% and climbing, and marketing's return to 2 emails/week halves the unsubscribe rate. At the board meeting, Maya presents a diagnosed root cause, a shipped fix, and a recovering curve. One investor asks why monitoring didn't catch it — Dev owns it, and you propose a release health-check ritual. <strong>The Series B conversation is back on.</strong>`,
  },
  loyalty: {
    title: "Launch NovaCart Rewards (loyalty program)",
    pitch: "A points-and-perks program to give customers a reason to come back. Worked at Maya's last company, and it's a great story for the board.",
    time: "≈ 8–10 weeks · all 4 engineers", backer: "Maya (CEO) is championing this",
    quality: 40, verdictClass: "bad", verdict: "You treated a symptom — expensively.",
    metrics: [
      { label: "Week-4 retention", value: "19%", delta: "▼ from 22%", dir: "down" },
      { label: "Mobile checkout p75", value: "9.3s", delta: "still broken", dir: "down" },
      { label: "Board reaction", value: "Tense", delta: "“Why didn't we catch this?”", dir: "down" },
    ],
    narrative: `<strong>Eight weeks later.</strong> Rewards is still two weeks from launch — it consumed all four engineers, and nothing else shipped. Meanwhile the checkout regression kept bleeding: retention drifted to 19%, and app-store reviews turned openly hostile. At the board meeting an investor's analyst surfaces the latency data in ten minutes. Maya turns to you: <strong>"Why didn't we catch the checkout thing?"</strong> Points don't accumulate on orders customers abandon. The program you built is fine — it's just answering a question nobody was asking.`,
  },
  onboarding: {
    title: "Rebuild onboarding with gamified activation",
    pitch: "New users aren't discovering the catalog's magic fast enough. A guided, gamified first-run experience to hook them in session one.",
    time: "≈ 6 weeks · all 4 engineers", backer: "The growth playbook favorite",
    quality: 25, verdictClass: "bad", verdict: "Polished the front door while the back door hung open.",
    metrics: [
      { label: "Week-4 retention", value: "24%", delta: "▲ barely, from 22%", dir: "down" },
      { label: "Mobile checkout p75", value: "9.2s", delta: "still broken", dir: "down" },
      { label: "Board reaction", value: "Unconvinced", delta: "“Where's the diagnosis?”", dir: "down" },
    ],
    narrative: `<strong>Eight weeks later.</strong> The new onboarding is genuinely nice — activation ticks up 9%, and first sessions look great. But week-4 retention crawls to just 24%, because better-onboarded users still hit a 9-second checkout spinner and quit. You improved how users enter a leaky bucket. At the board meeting the deck looks good until an investor asks what caused the drop in the first place — and there's no answer on the slide. <strong>The regression is still shipping churn every week.</strong>`,
  },
};

const CANNED_DEBRIEFS = {
  perf: `Verdict: right call. The evidence pointed at one specific, recent, mobile-only change — and you bet on the root cause instead of a shiny initiative.

- Root-cause analysis: the cohort cliff aligning exactly with v2.4 was the tell. Symptoms (churn) rarely name their cause; timelines do.
- Cohort analysis: desktop-flat / mobile-collapsed is segmentation doing its job. Aggregate numbers hide this.
- Resisting the HiPPO: the CEO wanted a loyalty program. You brought evidence instead of deference — that's the job.`,
  loyalty: `Verdict: you shipped the CEO's idea, not the diagnosis. The loyalty program treats a symptom (no reason to return) while the actual blocker (a 9-second mobile checkout) kept churning users.

- Resisting the HiPPO: Maya's conviction was loud, but the cohort data disagreed. A PM's leverage is evidence delivered respectfully.
- Root-cause analysis: the drop began the exact week v2.4 shipped, only on mobile. That timeline was in the data room.
- Opportunity cost: 8-10 weeks of all four engineers is everything — it must clear a higher evidence bar than "worked somewhere else."`,
  onboarding: `Verdict: a plausible playbook move, but the evidence never pointed at onboarding. Existing, previously retained users were churning — that's not a first-run problem.

- Cohort analysis: the cliff hit cohorts acquired after v2.4, mobile only, at the checkout step. Onboarding doesn't explain any of those three facts.
- Root-cause analysis: fix why the bucket leaks before improving how users pour in.
- Opportunity cost: 6 weeks of the whole team on a bet unsupported by the data left the real regression shipping churn.`,
};

const XP_DIMS = ["Academy", "Discovery", "Analytics", "Strategy", "Leadership", "Communication"];
const RANKS = [
  [340, "Group PM material"],
  [250, "Senior PM"],
  [150, "Product Manager"],
  [0, "Associate PM"],
];

// PM_COURSES moved to courses.js

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
const state = {
  screen: "briefing",
  personaId: "ceo",
  selectedCourse: null,
  chats: { ceo: [], em: [], analyst: [], customer: [] }, // {role, content}
  viewedData: new Set(),
  viewedEmails: new Set(),
  triageDecisions: {}, // emailId -> choice index
  committed: false,
  pending: false,
  daysRemaining: 42,
  runway: 1200000,
  trust: 80,
  morale: 90,
  completedCourses: new Set(),
  hearts: 5,
  currentLessonIndex: 0,
  activeCourseId: null,
  activeDomainId: null,
  selectedAnswer: null,
  correctCount: 0,
  wrongCount: 0,
  missedQuestions: [],
  questStep: 0, // 0: unassigned, 1: assigned, 2: sql complete, 3: sheets complete
};

function updateQuestBanner() {
  const banner = document.getElementById("quest-banner");
  const text = document.getElementById("quest-objective-text");
  if (!banner || !text) return;
  
  if (state.questStep === 0) {
    banner.style.display = "none";
  } else {
    banner.style.display = "flex";
    if (state.questStep === 1) {
      text.innerText = "Current Objective: Use NovaData SQL to find the total revenue lost to cancelled rides.";
    } else if (state.questStep === 2) {
      text.innerText = "Current Objective: Open NovaSheets and calculate the exact lost revenue.";
    } else if (state.questStep === 3) {
      text.innerText = "Current Objective: Quest Complete! Wait for the CEO.";
      banner.style.background = "rgba(16, 185, 129, 0.1)";
      banner.style.borderColor = "#10b981";
      banner.style.color = "#10b981";
    }
  }
}

const $ = (id) => document.getElementById(id);

function updateGlobalMetrics() {
  const runwayEl = document.getElementById("hud-runway");
  const trustEl = document.getElementById("hud-trust");
  const moraleEl = document.getElementById("hud-morale");
  
  if (runwayEl) runwayEl.innerText = "$" + (state.runway / 1000000).toFixed(2) + "M";
  if (trustEl) {
    trustEl.innerText = state.trust + "%";
    trustEl.style.color = state.trust < 50 ? "red" : "var(--accent)";
  }
  if (moraleEl) {
    moraleEl.innerText = state.morale + "%";
    moraleEl.style.color = state.morale < 50 ? "red" : "#4ade80";
  }

  // Game Over Logic
  if (state.runway <= 0 || state.trust <= 0) {
    const reason = state.runway <= 0 
      ? "You ran out of runway (cash) before finding Product-Market Fit." 
      : "You lost the trust of the CEO and the Board. They replaced you.";
    document.getElementById("gameover-reason").innerText = reason;
    
    const goScreen = document.getElementById("screen-gameover");
    if (goScreen) goScreen.hidden = false;
  }
}

function startInterruptionEngine() {
  if (state.interruptionInterval) return;
  state.interruptionInterval = setInterval(() => {
    if (state.daysRemaining > 0 && Math.random() > 0.85) {
      // CEO interrupts
      let msg = "";
      if (state.questStep === 0) {
        msg = "URGENT: I need to know the financial damage. Find out how much money we lost to cancelled rides this month using the SQL console, then calculate the total impact on our runway in the Sheets app.";
        state.questStep = 1;
        updateQuestBanner();
      } else {
        const storyChats = [
          "URGENT: The board just called. Why is engineering distracted? I need a roadmap update NOW.",
          "Just saw the latest Amplitude numbers for NovaRide. Why is week-4 retention so bad? Fix this."
        ];
        msg = storyChats[Math.floor(Math.random() * storyChats.length)];
        state.trust = Math.max(0, state.trust - 5);
      }
      
      state.chats["ceo"].push({
        role: "assistant", 
        content: msg
      });
      
      updateGlobalMetrics();
      
      // Flash dock icon
      const chatDock = document.querySelector('.dock-item[data-app="win-chat"]');
      if (chatDock) {
        chatDock.classList.add('urgent');
        chatDock.style.animation = "pulse 1s infinite";
      }

      // Re-render chat if open
      if ($('win-chat').style.display !== 'none' && state.personaId === 'ceo') {
        renderChatLog();
      }
    }
  }, 15000); // Check every 15s for demo purposes
}

// ---------------------------------------------------------------------------
// Evidence + XP
// ---------------------------------------------------------------------------
function interviewedPersonas() {
  return Object.keys(PERSONAS).filter(
    (id) => state.chats[id].filter((m) => m.role === "user").length >= 2
  );
}
function evidenceCount() {
  return interviewedPersonas().length + state.viewedData.size;
}
function computeXP() {
  const interviews = interviewedPersonas();
  const questions = Object.values(state.chats).reduce(
    (n, msgs) => n + msgs.filter((m) => m.role === "user").length, 0
  );
  const d = state.decision;
  const quality = d ? DECISIONS[d].quality : 0;
  let leadership = 10;
  if (d === "perf") leadership = interviews.includes("ceo") ? 60 : 30;
  return {
    Academy: state.completedCourses.size * 100,
    Discovery: interviews.length * 20,
    Analytics: state.viewedData.size * 25,
    Strategy: quality,
    Leadership: state.committed ? leadership : 0,
    Communication: Math.min(questions * 5, 60),
  };
}
function xpTotal(xp) {
  return Object.values(xp).reduce((a, b) => a + b, 0);
}
function renderXPPills() {
  const xp = computeXP();
  $("xp-pills").innerHTML = XP_DIMS.map(
    (dim) => `<span class="xp-pill">${dim} <b>${xp[dim]}</b></span>`
  ).join("");
}

// ---------------------------------------------------------------------------
// OS Window Management
// ---------------------------------------------------------------------------
let highestZ = 100;

function makeDraggable(win) {
  const titlebar = win.querySelector('.os-window-titlebar');
  let isDragging = false;
  let offsetX, offsetY;

  titlebar.addEventListener('mousedown', (e) => {
    // don't drag if clicking buttons
    if (e.target.tagName.toLowerCase() === 'button') return;
    isDragging = true;
    offsetX = e.clientX - win.getBoundingClientRect().left;
    offsetY = e.clientY - win.getBoundingClientRect().top;
    focusWindow(win);
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

function focusWindow(win) {
  document.querySelectorAll('.os-window').forEach(w => w.classList.remove('active'));
  win.classList.add('active');
  highestZ++;
  win.style.zIndex = highestZ;
}

function openApp(appId) {
  const win = $(appId);
  win.classList.remove('window-exit');
  win.style.display = 'flex';
  win.classList.add('window-enter');
  setTimeout(() => win.classList.remove('window-enter'), 250);
  
  focusWindow(win);
  
  // Dock indicator
  document.querySelectorAll('.dock-item').forEach(d => {
    if (d.dataset.app === appId) d.classList.add('running');
  });

  // Lazy renders
  if (appId === 'win-chat') {
    renderPersonaList();
    renderChatLog();
    $("chat-text").focus();
  } else if (appId === 'win-mail') {
    renderInboxList();
  } else if (appId === 'win-data') {
    renderDataGrid();
  } else if (appId === 'win-decide') {
    renderDecisions();
  } else if (appId === 'win-academy') {
    if (!state.selectedDomain) {
      state.selectedDomain = ACADEMY_DOMAINS[0].id;
    }
    renderDomains();
    renderSkillGrid(state.selectedDomain);
  } else if (appId === 'win-prd') {
    if (typeof renderPRDApp === 'function') renderPRDApp();
  } else if (appId === 'win-interview') {
    if (typeof renderInterviewApp === 'function') renderInterviewApp();
  } else if (appId === 'win-sheets') {
    if (typeof renderSheetsApp === 'function') renderSheetsApp();
  } else if (appId === 'win-sql') {
    if (typeof renderSQLApp === 'function') renderSQLApp();
  } else if (appId === 'win-sat') {
    if (typeof renderSATApp === 'function') renderSATApp();
  } else if (appId === 'win-sprint') {
    if (typeof renderSprintApp === 'function') renderSprintApp();
  } else if (appId === 'win-portfolio') {
    if (typeof renderPortfolioApp === 'function') renderPortfolioApp();
  }
}

function closeApp(appId) {
  const win = $(appId);
  win.classList.remove('window-enter');
  win.classList.add('window-exit');
  
  document.querySelectorAll('.dock-item').forEach(d => {
    if (d.dataset.app === appId) d.classList.remove('running');
  });

  setTimeout(() => {
    if (win.classList.contains('window-exit')) {
      win.style.display = 'none';
      win.classList.remove('window-exit');
    }
  }, 200);
}

// ---------------------------------------------------------------------------
// Investigate: personas + chat
// ---------------------------------------------------------------------------
function initials(name) {
  return name.split(" ").map((w) => w[0]).join("");
}

function renderPersonaList() {
  const done = interviewedPersonas();
  $("persona-list").innerHTML = Object.entries(PERSONAS)
    .map(([id, p]) => `
      <button class="persona-btn ${id === state.personaId ? "active" : ""}" data-persona="${id}">
        <span class="persona-avatar" style="background:${p.color}">${initials(p.name)}</span>
        <span class="persona-meta">
          <div class="persona-name">${p.name}</div>
          <div class="persona-role">${p.role}</div>
        </span>
        ${done.includes(id) ? '<span class="persona-check">✓</span>' : ""}
      </button>`)
    .join("");
  document.querySelectorAll("[data-persona]").forEach((btn) => {
    btn.addEventListener("click", () => switchChat(btn.dataset.persona));
  });
}

function switchChat(personaId) {
  state.personaId = personaId;
  const p = PERSONAS[personaId];
  $("chat-header").innerHTML = `
    <span class="persona-avatar" style="background:${p.color}">${initials(p.name)}</span>
    <div>
      <div class="chat-header-name">${p.name}</div>
      <div class="chat-header-role">${p.role} · NovaCart</div>
    </div>`;
  renderChatLog();
  renderPersonaList();
  $("chat-text").focus();
}

function renderChatLog() {
  const log = $("chat-log");
  const msgs = state.chats[state.personaId];
  log.innerHTML = "";
  const intro = document.createElement("div");
  intro.className = "msg intro";
  intro.textContent = PERSONAS[state.personaId].intro;
  log.appendChild(intro);
  for (const m of msgs) {
    const b = document.createElement("div");
    b.className = `msg ${m.role === "user" ? "user" : "assistant"}`;
    b.textContent = m.content;
    log.appendChild(b);
  }
  if (state.pending) {
    const t = document.createElement("div");
    t.className = "msg assistant typing";
    t.textContent = `${PERSONAS[state.personaId].name} is typing…`;
    log.appendChild(t);
  }
  log.scrollTop = log.scrollHeight;
}

async function sendMessage(text) {
  const personaId = state.personaId;
  const msgs = state.chats[personaId];
  msgs.push({ role: "user", content: text });
  state.pending = true;
  renderChatLog();
  $("chat-send").disabled = true;
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ personaId, messages: msgs }),
    });
    const data = await res.json();
    msgs.push({ role: "assistant", content: data.reply });
  } catch {
    msgs.push({ role: "assistant", content: "(connection hiccup — ask me again?)" });
  }
  
  if (!state.committed) {
    state.daysRemaining = Math.max(0, state.daysRemaining - 1);
    renderTimeWidget();
  }
  state.pending = false;
  $("chat-send").disabled = false;
  if (state.personaId === personaId) renderChatLog();
  renderPersonaList();
  renderEvidence();
  renderXPPills();
  renderInboxList();
  renderDataGrid();
  renderDecisions();
  
  const metricsHud = document.getElementById("os-metrics-hud");
  if (metricsHud) metricsHud.style.display = "flex";
  updateGlobalMetrics();
  startInterruptionEngine();
}

// ---------------------------------------------------------------------------
// Investigate: data room & inbox
// ---------------------------------------------------------------------------
function renderDataGrid() {
  $("data-grid").innerHTML = DATA_CARDS.map(
    (c) => `
      <button class="data-card ${state.viewedData.has(c.id) ? "viewed" : ""}" data-card="${c.id}">
        <h4>${c.title}</h4>
        <p>${c.teaser}</p>
        ${state.viewedData.has(c.id) ? '<p class="viewed-tag">✓ examined</p>' : ""}
      </button>`
  ).join("");
  document.querySelectorAll("[data-card]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = DATA_CARDS.find((c) => c.id === btn.dataset.card);
      if (!state.viewedData.has(card.id) && !state.committed) {
        state.daysRemaining = Math.max(0, state.daysRemaining - 1);
        renderTimeWidget();
      }
      state.viewedData.add(card.id);
      $("data-detail").hidden = false;
      $("data-detail").innerHTML = card.render();
      renderDataGrid();
      renderEvidence();
      renderXPPills();
    });
  });
}

function renderEvidence() {
  const n = evidenceCount();
  $("evidence-count").textContent = `${n}/8`;
  $("evidence-fill").style.width = `${(n / 8) * 100}%`;
}

function renderInboxList() {
  $("inbox-list").innerHTML = TRIAGE_EMAILS.map(
    (e) => `
      <div class="inbox-card ${state.viewedEmails.has(e.id) ? "viewed" : ""}" data-email="${e.id}" style="${state.triageDecisions[e.id] !== undefined ? 'opacity: 0.6;' : ''}">
        <div class="inbox-sender">${e.sender}</div>
        <h4>${e.subject}</h4>
        <p>${e.body.substring(0, 50)}...</p>
      </div>`
  ).join("");
  document.querySelectorAll("[data-email]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const email = TRIAGE_EMAILS.find((e) => e.id === btn.dataset.email);
      state.viewedEmails.add(email.id);
      
      const isResolved = state.triageDecisions[email.id] !== undefined;
      const decisionIdx = state.triageDecisions[email.id];

      let actionsHtml = "";
      if (isResolved) {
        const choice = email.choices[decisionIdx];
        actionsHtml = `
          <div style="margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.05); border-left: 4px solid var(--accent); border-radius: 8px;">
            <strong style="color: var(--accent);">You decided:</strong> ${choice.text}
            <p style="margin-top: 8px; color: var(--text-dim);">${choice.feedback}</p>
          </div>
        `;
      } else {
        actionsHtml = `
          <div style="margin-top: 24px; display: flex; flex-direction: column; gap: 12px;">
            ${email.choices.map((c, idx) => `
              <button class="btn-primary" style="text-align: left; background: var(--bg-raised); border: 1px solid var(--line);" onclick="handleTriageChoice('${email.id}', ${idx})">
                ${c.text}
              </button>
            `).join("")}
          </div>
        `;
      }

      $("inbox-detail").hidden = false;
      $("inbox-detail").innerHTML = `
        <div class="inbox-detail-subject">${email.subject}</div>
        <div class="inbox-detail-meta">From: <strong>${email.sender}</strong> &nbsp;·&nbsp; ${email.date}</div>
        <div class="inbox-detail-body" style="white-space: pre-line;">${email.body}</div>
        ${actionsHtml}
      `;
      renderInboxList();
    });
  });
}

window.handleTriageChoice = function(emailId, choiceIdx) {
  const email = TRIAGE_EMAILS.find(e => e.id === emailId);
  const choice = email.choices[choiceIdx];
  
  state.triageDecisions[emailId] = choiceIdx;
  state.runway += choice.runway;
  state.trust += choice.trust;
  state.morale += choice.morale;
  
  updateGlobalMetrics();
  
  // Re-render detail view to show resolution
  document.querySelector(`[data-email="${emailId}"]`).click();
};

// ---------------------------------------------------------------------------
// Time Budget
// ---------------------------------------------------------------------------
function renderTimeWidget() {
  const tw = $("time-widget");
  if (!tw) return;
  $("days-remaining").textContent = `${state.daysRemaining} Day${state.daysRemaining !== 1 ? 's' : ''}`;
  if (state.daysRemaining <= 14) {
    tw.classList.add("urgent");
  } else {
    tw.classList.remove("urgent");
  }
  
  if (state.daysRemaining === 0 && !state.committed) {
    // Time's up!
    setTimeout(() => {
      alert("Time's up! The 6 weeks have passed. The board meeting is starting and you must commit to a decision now.");
      openApp('win-decide');
      if ($('btn-close-decide')) $('btn-close-decide').disabled = true; // force decision
    }, 100);
  }
}

// ---------------------------------------------------------------------------
// PM Academy
// ---------------------------------------------------------------------------
function renderDomains() {
  const list = $("domain-list");
  if (!list) return;
  list.innerHTML = ACADEMY_DOMAINS.map(d => `
    <button class="persona-btn ${d.id === state.selectedDomain ? "active" : ""}" data-domain="${d.id}" style="padding: 12px; text-align: left; width: 100%; display: flex; align-items: center; gap: 10px; border-radius: 8px;">
      <span style="font-size: 16px;">${d.icon}</span>
      <div class="persona-name" style="font-weight: 500; font-size: 13px;">${d.title}</div>
    </button>
  `).join("");
  
  document.querySelectorAll("[data-domain]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.selectedDomain = btn.dataset.domain;
      renderDomains();
      renderSkillGrid(state.selectedDomain);
    });
  });
}

function renderSkillGrid(domainId) {
  const el = $("lesson-view");
  if (el) el.style.display = "none";
  $("skill-grid-view").style.display = "block";
  
  const domain = ACADEMY_DOMAINS.find(d => d.id === domainId);
  if (!domain) return;
  
  $("domain-title").innerText = domain.title;
  $("domain-desc").innerText = "Select a skill to begin training.";
  
  $("skill-nodes").innerHTML = domain.skills.map(s => `
    <div class="skill-card ${s.locked ? 'locked' : 'unlocked'}" data-course="${s.locked ? '' : s.id}" style="
      background: var(--bg);
      border: 1px solid var(--line);
      border-radius: 12px;
      padding: 20px;
      cursor: ${s.locked ? 'not-allowed' : 'pointer'};
      opacity: ${s.locked ? '0.6' : '1'};
      transition: transform 0.2s, box-shadow 0.2s;
      position: relative;
    ">
      ${s.locked ? '<div style="position: absolute; top: 12px; right: 12px; font-size: 12px;">🔒</div>' : ''}
      <h3 style="font-size: 15px; font-weight: 600; color: ${s.locked ? 'var(--text-dim)' : 'var(--text)'}; margin-bottom: 8px;">${s.title}</h3>
      <div style="font-size: 12px; color: var(--text-dim);">
        ${s.locked ? 'Coming Soon' : (state.completedCourses.has(s.id) ? '<span style="color: #fbbf24;">✅ Completed</span>' : '<span style="color: #4ade80;">★ Playable</span>')}
      </div>
    </div>
  `).join("");
  
  document.querySelectorAll("[data-course]").forEach(card => {
    if (card.dataset.course) {
      card.addEventListener("click", () => renderCourse(domainId, card.dataset.course));
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-4px)";
        card.style.boxShadow = "0 12px 24px rgba(0,0,0,0.4)";
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "none";
      });
    }
  });
}

function renderCourse(domainId, courseId) {
  const domain = ACADEMY_DOMAINS.find(d => d.id === domainId);
  const course = domain.skills.find(s => s.id === courseId);
  
  if (!course.lessons || course.lessons.length === 0) {
    alert("This course does not have lessons yet.");
    return;
  }

  state.activeDomainId = domainId;
  state.activeCourseId = courseId;
  state.currentLessonIndex = 0;
  state.hearts = 5;
  state.selectedAnswer = null;
  state.correctCount = 0;
  state.wrongCount = 0;
  state.missedQuestions = [];

  $("skill-grid-view").style.display = "none";
  $("lesson-view").style.display = "flex";
  
  // Show intro screen first
  renderLessonIntro(domain, course);
}

function renderLessonIntro(domain, course) {
  const totalQuizzes = course.lessons.filter(l => l.type === "mcq").length;
  const footer = $("lesson-footer");
  const btnCheck = $("btn-lesson-check");
  const feedback = $("lesson-feedback");
  
  footer.style.background = "transparent";
  feedback.style.display = "none";
  $("lesson-progress-bar").style.width = "0%";
  $("lesson-hearts").innerHTML = `❤️ ${state.hearts}`;

  $("lesson-content").innerHTML = `
    <div class="animate-slide-up" style="text-align: center;">
      <div style="font-size: 56px; margin-bottom: 20px;">${domain.icon || "📘"}</div>
      <h1 style="font-size: 28px; font-weight: bold; margin-bottom: 12px; color: var(--text);">${course.title}</h1>
      <p style="color: var(--text-dim); margin-bottom: 32px; font-size: 16px; line-height: 1.6;">
        ${totalQuizzes} questions · ${course.lessons.length} steps · 5 hearts
      </p>
      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px;">
        <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px; padding: 16px 24px; min-width: 100px;">
          <div style="font-size: 24px; font-weight: bold; color: var(--accent);">${totalQuizzes}</div>
          <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">Questions</div>
        </div>
        <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px; padding: 16px 24px; min-width: 100px;">
          <div style="font-size: 24px; font-weight: bold; color: #4ade80;">+100</div>
          <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">XP Reward</div>
        </div>
        <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px; padding: 16px 24px; min-width: 100px;">
          <div style="font-size: 24px; font-weight: bold; color: #ef4444;">❤️ 5</div>
          <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">Hearts</div>
        </div>
      </div>
    </div>
  `;

  btnCheck.innerText = "Start Lesson";
  btnCheck.disabled = false;
  btnCheck.className = "btn-primary btn-3d";
  btnCheck.style.background = "";
  btnCheck.style.color = "";
  btnCheck.onclick = () => {
    renderLessonStep();
  };
}

function renderLessonStep() {
  const domain = ACADEMY_DOMAINS.find(d => d.id === state.activeDomainId);
  const course = domain.skills.find(s => s.id === state.activeCourseId);
  const totalOriginal = course.lessons.length;
  
  // Update Header
  $("lesson-hearts").innerHTML = `❤️ ${state.hearts}`;
  const progress = Math.min((state.currentLessonIndex / totalOriginal) * 100, 100);
  $("lesson-progress-bar").style.width = `${progress}%`;
  
  const footer = $("lesson-footer");
  const btnCheck = $("btn-lesson-check");
  const feedback = $("lesson-feedback");
  
  // Reset footer
  footer.style.background = "transparent";
  feedback.style.display = "none";
  btnCheck.innerText = "Check";
  btnCheck.disabled = true;
  btnCheck.className = "btn-primary";
  btnCheck.style.background = "";
  btnCheck.style.color = "";
  btnCheck.onclick = null;
  state.selectedAnswer = null;

  // Determine which lesson to show
  let lesson;
  if (state.currentLessonIndex >= course.lessons.length) {
    if (state.missedQuestions.length > 0) {
      lesson = state.missedQuestions.shift();
    } else {
      renderLessonComplete(course);
      return;
    }
  } else {
    lesson = course.lessons[state.currentLessonIndex];
  }

  const stepNum = Math.min(state.currentLessonIndex + 1, totalOriginal);

  if (lesson.type === "scenario") {
    $("lesson-content").innerHTML = `
      <div class="animate-slide-up">
        <div class="scenario-card">
          <div class="scenario-kicker">Case Study Background</div>
          <h3>${lesson.title}</h3>
          <div style="white-space: pre-line;">${lesson.body}</div>
        </div>
        ${lesson.keyTakeaway ? `
          <div style="padding: 16px 20px; background: var(--accent-soft); border-left: 4px solid var(--accent); border-radius: 0 12px 12px 0;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 6px;">💡 Key Takeaway</div>
            <div style="font-size: 15px; font-weight: 500; color: var(--text);">${lesson.keyTakeaway}</div>
          </div>
        ` : ""}
      </div>
    `;

    btnCheck.innerText = "Continue";
    btnCheck.disabled = false;
    btnCheck.className = "btn-primary btn-3d";
    btnCheck.onclick = () => {
      state.currentLessonIndex++;
      renderLessonStep();
    };

  } else if (lesson.type === "teach") {
    $("lesson-content").innerHTML = `
      <div class="animate-slide-up">
        <div style="display: inline-block; background: var(--accent-soft); color: var(--accent); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 6px; margin-bottom: 20px;">Concept · Step ${stepNum}</div>
        <h2 style="font-size: 26px; font-weight: bold; margin-bottom: 20px; color: var(--text); line-height: 1.3;">${lesson.title}</h2>
        <div style="font-size: 16px; line-height: 1.8; color: var(--text-dim); white-space: pre-line;">${lesson.body}</div>
        ${lesson.keyTakeaway ? `
          <div style="margin-top: 28px; padding: 16px 20px; background: var(--accent-soft); border-left: 4px solid var(--accent); border-radius: 0 12px 12px 0;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 6px;">💡 Key Takeaway</div>
            <div style="font-size: 15px; font-weight: 500; color: var(--text);">${lesson.keyTakeaway}</div>
          </div>
        ` : ""}
      </div>
    `;

    btnCheck.innerText = "Continue";
    btnCheck.disabled = false;
    btnCheck.className = "btn-primary btn-3d";
    btnCheck.onclick = () => {
      state.currentLessonIndex++;
      renderLessonStep();
    };

  } else if (lesson.type === "mcq") {
    $("lesson-content").innerHTML = `
      <div class="animate-slide-up">
        <div style="display: inline-block; background: rgba(74, 222, 128, 0.15); color: #4ade80; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 6px; margin-bottom: 20px;">Quiz · Step ${stepNum}</div>
        <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 32px; color: var(--text); line-height: 1.4;">${lesson.prompt}</h2>
        <div id="mcq-options" style="display: flex; flex-direction: column; gap: 12px;">
          ${lesson.options.map((opt, i) => `
            <button class="mcq-btn" data-index="${i}">
              <div class="mcq-letter">${String.fromCharCode(65 + i)}</div>
              <div style="flex: 1;">${opt.text}</div>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    document.querySelectorAll(".mcq-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".mcq-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.selectedAnswer = parseInt(btn.dataset.index);
        btnCheck.disabled = false;
        btnCheck.classList.add("btn-3d");
      });
    });

    btnCheck.onclick = () => {
      const selectedOpt = lesson.options[state.selectedAnswer];
      const isCorrect = selectedOpt.correct;
      const correctOpt = lesson.options.find(o => o.correct);
      
      // Disable option clicks and highlight correct/wrong
      document.querySelectorAll(".mcq-btn").forEach((btn, i) => {
        btn.style.pointerEvents = "none";
        if (lesson.options[i].correct) {
          btn.style.borderColor = "#16a34a";
          btn.style.background = "rgba(22, 163, 106, 0.1)";
        }
        if (i === state.selectedAnswer && !isCorrect) {
          btn.style.borderColor = "#dc2626";
          btn.style.background = "rgba(220, 38, 38, 0.1)";
        }
      });
      
      if (isCorrect) {
        state.correctCount++;
        footer.style.background = "var(--correct-bg, #dcfce7)";
        feedback.style.display = "block";
        feedback.style.color = "#166534";
        feedback.className = "animate-slide-up";
        feedback.innerHTML = `
          <div style="font-size: 22px; font-weight: bold; margin-bottom: 6px;">✅ Correct!</div>
          ${selectedOpt.explanation ? `<div style="font-size: 14px; opacity: 0.9;">${selectedOpt.explanation}</div>` : ""}
        `;
        btnCheck.style.background = "#16a34a";
        btnCheck.style.color = "white";
        btnCheck.innerText = "Continue";
        btnCheck.onclick = () => {
          state.currentLessonIndex++;
          renderLessonStep();
        };
      } else {
        state.wrongCount++;
        state.hearts = Math.max(0, state.hearts - 1);
        $("lesson-hearts").innerHTML = `❤️ ${state.hearts}`;
        
        // Re-queue for later retry
        if (state.hearts > 0) {
          state.missedQuestions.push(lesson);
        }
        
        footer.style.background = "var(--incorrect-bg, #fee2e2)";
        feedback.style.display = "block";
        feedback.style.color = "#991b1b";
        feedback.className = "animate-slide-up";
        feedback.innerHTML = `
          <div style="font-size: 22px; font-weight: bold; margin-bottom: 6px;">❌ Incorrect</div>
          <div style="font-size: 14px; font-weight: 500; margin-bottom: 4px;">Correct answer: ${correctOpt.text}</div>
          ${correctOpt.explanation ? `<div style="font-size: 14px; opacity: 0.9;">${correctOpt.explanation}</div>` : ""}
        `;
        
        btnCheck.style.background = "#dc2626";
        btnCheck.style.color = "white";
        btnCheck.innerText = "Got it";
        
        if (state.hearts === 0) {
          feedback.innerHTML = `
            <div style="font-size: 22px; font-weight: bold; margin-bottom: 6px;">💔 Out of Hearts!</div>
            <div style="font-size: 14px;">You'll need to retry this lesson.</div>
          `;
          btnCheck.innerText = "Back to Skills";
          btnCheck.onclick = () => {
            $("lesson-view").style.display = "none";
            $("skill-grid-view").style.display = "block";
          };
        } else {
          btnCheck.onclick = () => {
            state.currentLessonIndex++;
            renderLessonStep();
          };
        }
      }
    };
  }
}

function renderLessonComplete(course) {
  const totalQuizzes = course.lessons.filter(l => l.type === "mcq").length;
  const accuracy = totalQuizzes > 0 ? Math.round((state.correctCount / totalQuizzes) * 100) : 100;
  const heartsBonus = state.hearts * 10;
  const totalXP = 100 + heartsBonus;
  
  $("lesson-progress-bar").style.width = "100%";
  
  $("lesson-content").innerHTML = `
    <div class="animate-slide-up" style="text-align: center;">
      <div style="font-size: 72px; margin-bottom: 16px;">${accuracy >= 80 ? "🏆" : accuracy >= 50 ? "⭐" : "📘"}</div>
      <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 8px; color: var(--text);">Lesson Complete!</h1>
      <p style="color: var(--text-dim); margin-bottom: 36px; font-size: 16px;">${course.title}</p>
      
      <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; margin-bottom: 36px;">
        <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 16px; padding: 20px 28px; min-width: 110px;">
          <div style="font-size: 32px; font-weight: bold; color: ${accuracy >= 80 ? '#4ade80' : accuracy >= 50 ? '#fbbf24' : '#ef4444'};">${accuracy}%</div>
          <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">Accuracy</div>
        </div>
        <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 16px; padding: 20px 28px; min-width: 110px;">
          <div style="font-size: 32px; font-weight: bold; color: var(--accent);">+${totalXP}</div>
          <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">Total XP</div>
        </div>
        <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 16px; padding: 20px 28px; min-width: 110px;">
          <div style="font-size: 32px; font-weight: bold; color: #ef4444;">❤️ ${state.hearts}</div>
          <div style="font-size: 12px; color: var(--text-dim); margin-top: 4px;">Remaining</div>
        </div>
      </div>
      
      <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px; padding: 16px 24px; text-align: left; max-width: 320px; margin: 0 auto;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: var(--text-dim); font-size: 14px;">Correct</span>
          <span style="color: #4ade80; font-weight: 600;">${state.correctCount}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: var(--text-dim); font-size: 14px;">Incorrect</span>
          <span style="color: #ef4444; font-weight: 600;">${state.wrongCount}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--text-dim); font-size: 14px;">Hearts Bonus</span>
          <span style="color: var(--accent); font-weight: 600;">+${heartsBonus} XP</span>
        </div>
      </div>
    </div>
  `;

  const btnCheck = $("btn-lesson-check");
  btnCheck.innerText = "Continue";
  btnCheck.disabled = false;
  btnCheck.className = "btn-primary btn-3d";
  btnCheck.style.background = "#16a34a";
  btnCheck.style.color = "white";
  btnCheck.onclick = () => {
    state.completedCourses.add(state.activeCourseId);
    renderXPPills();
    triggerSimulationEvent(state.activeCourseId);
    
    $("lesson-view").style.display = "none";
    $("skill-grid-view").style.display = "block";
    renderSkillGrid(state.activeDomainId);
  };
}

// Ensure quit button works
$("btn-quit-lesson").addEventListener("click", () => {
  $("lesson-view").style.display = "none";
  $("skill-grid-view").style.display = "block";
});



function triggerSimulationEvent(courseId) {
  const simulateChat = (persona, msg) => {
    state.chats[persona].push({ role: "bot", content: msg });
    
    // Open chat and force focus to the simulation event
    openApp('win-chat');
    state.personaId = persona;
    renderPersonaList();
    renderChatLog();
    
    // Auto-scroll to bottom
    const log = $("chat-log");
    log.scrollTop = log.scrollHeight;
  };

  if (courseId === "retention") {
    simulateChat("ceo", "Alex, I noticed you've been digging into retention and cohorts. Did you spot the anomaly around Week 9? We need to figure out what caused that cliff.");
  } else if (courseId === "opp_cost") {
    simulateChat("em", "Saw you looking into opportunity costs. Exactly. If we build that massive Loyalty program Maya wants, we can't fix the checkout latency. You have to choose.");
  } else if (courseId === "hypothesis") {
    simulateChat("analyst", "If you're building a hypothesis on what broke the conversion, I can pull the exact segment data for you. Just let me know what metric to check.");
  } else if (courseId === "ltv_cac") {
    simulateChat("ceo", "Unit economics are critical right now. Our board wants to see our CAC payback period drop before they approve the Series B. Keep that in mind.");
  } else if (courseId === "root_cause") {
    simulateChat("customer", "I don't know the root cause, but I can tell you the symptom: the app freezes when I try to use Apple Pay. It's so frustrating.");
  }
}

// ---------------------------------------------------------------------------
// Decide
// ---------------------------------------------------------------------------
function renderDecisions() {
  // Fixed presentation order: CEO's pick first (temptation up front)
  const order = ["loyalty", "onboarding", "perf"];
  $("decision-grid").innerHTML = order
    .map((id) => {
      const d = DECISIONS[id];
      return `
        <button class="decision-card ${state.decision === id ? "selected" : ""}" data-decision="${id}">
          <span class="backer">${d.backer}</span>
          <h3>${d.title}</h3>
          <p class="pitch">${d.pitch}</p>
          <div class="facts"><div>⏱ ${d.time}</div></div>
        </button>`;
    })
    .join("");
  document.querySelectorAll("[data-decision]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.decision = btn.dataset.decision;
      $("btn-commit").disabled = false;
      renderDecisions();
    });
  });
}

// ---------------------------------------------------------------------------
// Outcome
// ---------------------------------------------------------------------------
function playthroughSummary() {
  const interviews = interviewedPersonas().map((id) => PERSONAS[id].name);
  const viewed = [...state.viewedData].map(
    (id) => DATA_CARDS.find((c) => c.id === id).title
  );
  const d = DECISIONS[state.decision];
  const sampleQs = Object.entries(state.chats)
    .flatMap(([id, msgs]) =>
      msgs.filter((m) => m.role === "user").slice(0, 2)
        .map((m) => `${PERSONAS[id].name}: "${m.content}"`)
    )
    .slice(0, 8);
  return [
    `Decision chosen: ${d.title}`,
    `Stakeholders meaningfully interviewed (2+ questions): ${interviews.join(", ") || "none"}`,
    `Data room cards examined: ${viewed.join(", ") || "none"}`,
    `Sample questions asked: ${sampleQs.join(" | ") || "none"}`,
  ].join("\n");
}

function missedEvidence() {
  const missed = [];
  for (const [id, p] of Object.entries(PERSONAS)) {
    if (!interviewedPersonas().includes(id)) missed.push(`Never really interviewed ${p.name} (${p.role})`);
  }
  for (const c of DATA_CARDS) {
    if (!state.viewedData.has(c.id)) missed.push(`Never examined: ${c.title}`);
  }
  return missed;
}

async function showOutcome() {
  state.committed = true;
  $("os-dock").hidden = true;
  $("screen-outcome").hidden = false;
  const d = DECISIONS[state.decision];
  const xp = computeXP();
  const total = xpTotal(xp);
  const rank = RANKS.find(([min]) => total >= min)[1];
  const maxByDim = { Discovery: 80, Analytics: 100, Strategy: 100, Leadership: 60, Communication: 60 };

  $("outcome-wrap").innerHTML = `
    <p class="outcome-kicker">Simulation complete · 8 weeks elapsed</p>
    <h1 class="outcome-verdict ${d.verdictClass}">${d.verdict}</h1>
    <div class="metrics-row">
      ${d.metrics.map((m) => `
        <div class="metric-card">
          <div class="m-label">${m.label}</div>
          <div class="m-value">${m.value}</div>
          <div class="m-delta ${m.dir}">${m.delta}</div>
        </div>`).join("")}
    </div>
    <div class="metrics-row" style="grid-template-columns: 1fr; margin-top: -4px;">
        <div class="metric-card" style="text-align: center; padding: 12px;">
          <div class="m-label" style="display:inline-block; margin-right: 12px;">Time Spent Investigating:</div>
          <div class="m-value" style="display:inline-block; font-size: 18px; margin-top: 0;">${42 - state.daysRemaining} Days</div>
        </div>
    </div>
    <div class="outcome-narrative">${d.narrative}</div>
    <div class="xp-section">
      <h3>XP earned</h3>
      <div class="xp-grid">
      ${XP_DIMS.map((dim) => `
        <div class="xp-item">
          <div class="xpi-label">${dim}</div>
          <div class="xpi-val">+${xp[dim]}</div>
        </div>`).join("")}
      </div>
      <div class="xp-total">
        <span class="rank">${rank}</span> &mdash; 
        <span class="points">${total} / 400 XP</span>
      </div>
    </div>
    <div class="debrief-section" style="margin-top: 24px;">
      <h3 style="margin-bottom:12px;">Product Coach debrief</h3>
      <div class="debrief-body" id="debrief-body" style="font-size:13px; text-align:left; color: var(--text-dim);">Reviewing your playthrough…</div>
      <div class="debrief-source" id="debrief-source" style="font-size:11px; margin-top:12px; color: var(--text-dim);"></div>
    </div>
    <div class="outcome-actions" style="margin-top: 24px;">
      <button class="btn-primary" id="btn-replay">Run it back</button>
    </div>`;

  $("btn-replay").addEventListener("click", () => location.reload());

  // Coach debrief: AI if available, canned otherwise
  let debrief = null;
  let source = "scripted";
  try {
    const res = await fetch("/api/debrief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ summary: playthroughSummary() }),
    });
    const data = await res.json();
    debrief = data.debrief;
    source = data.source;
  } catch { /* fall through to canned */ }

  if (!debrief) {
    debrief = CANNED_DEBRIEFS[state.decision];
    const missed = missedEvidence();
    if (missed.length) {
      debrief += `\n\nEvidence you left on the table:\n- ${missed.join("\n- ")}`;
    }
    source = "scripted";
  }
  $("debrief-body").textContent = debrief;
  $("debrief-source").textContent =
    source === "claude" ? "Generated live by the Product Coach agent (Claude)" : "Scripted coach (connect a Claude API key for live coaching)";
}

// ---------------------------------------------------------------------------
// Mode badge
// ---------------------------------------------------------------------------
async function pollStatus(attempt = 0) {
  try {
    const res = await fetch("/api/status");
    const { ai } = await res.json();
    const badge = $("mode-badge");
    if (ai === true) {
      badge.textContent = "● live AI";
      badge.className = "mode-badge live";
    } else if (ai === false) {
      badge.textContent = "◦ scripted mode";
      badge.className = "mode-badge scripted";
    } else if (attempt < 10) {
      setTimeout(() => pollStatus(attempt + 1), 1500);
    }
  } catch { /* server not ready yet */ }
}

// ---------------------------------------------------------------------------
// Wiring
// ---------------------------------------------------------------------------
function init() {
  renderXPPills();
  renderEvidence();
  renderTimeWidget();
  switchChat("ceo");
  pollStatus();

  // Clock
  function updateClock() {
    const clock = $("os-clock");
    if (!clock) return;
    const now = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[now.getDay()];
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutes = now.getMinutes().toString().padStart(2, '0');
    clock.textContent = `${day} ${hours}:${minutes} ${ampm}`;
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Setup OS Window Draggability
  document.querySelectorAll('.os-window').forEach(makeDraggable);
  
  // Bring window to front on mousedown
  document.querySelectorAll('.os-window').forEach(win => {
    win.addEventListener('mousedown', () => focusWindow(win));
  });

  // Dock items open apps
  document.querySelectorAll('.dock-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const appId = btn.dataset.app;
      const win = $(appId);
      if (win.style.display === 'flex' && win.classList.contains('active')) {
        win.style.display = 'none'; // minimize if active
      } else {
        openApp(appId);
      }
    });
  });

  // Desktop icons open apps
  document.querySelectorAll('.desktop-icon').forEach(btn => {
    btn.addEventListener('click', () => {
      openApp(btn.dataset.app);
    });
  });

  // Window close buttons
  document.querySelectorAll('.os-win-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeApp(btn.dataset.win);
    });
  });

  // Window minimize
  document.querySelectorAll('.os-win-min').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const win = $(btn.dataset.win);
      if (win) win.style.display = 'none';
    });
  });

  // Window maximize
  document.querySelectorAll('.os-win-max').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const win = $(btn.dataset.win);
      if (!win) return;
      win.classList.toggle('maximized');
      if (win.classList.contains('maximized')) {
        win.dataset.oldLeft = win.style.left;
        win.dataset.oldTop = win.style.top;
        win.dataset.oldWidth = win.style.width;
        win.dataset.oldHeight = win.style.height;
        win.style.left = '0px';
        win.style.top = '28px'; // below menubar
        win.style.width = '100%';
        win.style.height = 'calc(100% - 110px)'; // leave room for dock (80px + 28px top)
      } else {
        win.style.left = win.dataset.oldLeft;
        win.style.top = win.dataset.oldTop;
        win.style.width = win.dataset.oldWidth;
        win.style.height = win.dataset.oldHeight;
      }
    });
  });

  $("btn-start").addEventListener("click", () => {
    $("screen-briefing").hidden = true;
    $("os-menubar").hidden = false;
    $("os-dock").hidden = false;
    $("desktop-icons").hidden = false;
    
    // Boot sequence: open Chat & Mail side-by-side
    openApp('win-chat');
    openApp('win-mail');
  });

  $("btn-commit").addEventListener("click", () => {
    if (state.decision) showOutcome();
  });

  $("chat-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("chat-text");
    const text = input.value.trim();
    if (!text || state.pending) return;
    input.value = "";
    sendMessage(text);
  });

  // PM Academy Back Button (legacy reader view)
  const btnBackGrid = $("btn-back-grid");
  if (btnBackGrid) {
    btnBackGrid.addEventListener("click", () => {
      const el = $("lesson-view");
      if (el) el.style.display = "none";
      $("skill-grid-view").style.display = "block";
    });
  }

  // Theme Toggle
  const themeToggle = $("theme-toggle");
  if (themeToggle) {
    // Check saved theme
    if (localStorage.getItem("pmverse_theme") === "light") {
      document.body.classList.add("light-theme");
      themeToggle.textContent = "🌙";
    }
    
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLight = document.body.classList.contains("light-theme");
      themeToggle.textContent = isLight ? "🌙" : "☀️";
      themeToggle.title = isLight ? "Switch to Dark Mode" : "Switch to Light Mode";
      localStorage.setItem("pmverse_theme", isLight ? "light" : "dark");
    });
  }
}

init();
