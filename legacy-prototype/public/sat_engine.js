// sat_engine.js

const SAT_QUESTIONS = [
  {
    prompt: "A cohort of 100 users signs up in January. By month 6, 20 users are still active. What is the Month 6 retention rate?",
    options: ["20%", "80%", "100%", "Need more data"],
    correctIndex: 0,
    domainHint: "analytics"
  },
  {
    prompt: "You want to test if a new checkout button color increases conversion. What is the most rigorous method?",
    options: ["Ask 5 users in a coffee shop", "Run an A/B test with a control group", "Launch it to 100% of users and monitor", "Create a painted door test"],
    correctIndex: 1,
    domainHint: "growth"
  },
  {
    prompt: "Which SQL clause is used to filter records before any groupings are made?",
    options: ["HAVING", "ORDER BY", "WHERE", "GROUP BY"],
    correctIndex: 2,
    domainHint: "analytics"
  }
];

let currentSatQuestion = 0;
let satScore = 0;
let satWeaknesses = {};

function renderSATApp() {
  const container = document.getElementById("sat-content");
  if (!container) return;

  if (currentSatQuestion >= SAT_QUESTIONS.length) {
    renderSATResults(container);
    return;
  }

  const q = SAT_QUESTIONS[currentSatQuestion];

  container.innerHTML = `
    <div style="padding: 40px; display: flex; flex-direction: column; height: 100%; box-sizing: border-box;">
      <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); margin-bottom: 16px;">
        Growth Skills Assessment Test (SAT) • Question ${currentSatQuestion + 1} of ${SAT_QUESTIONS.length}
      </div>
      <h2 style="font-size: 24px; margin-top: 0; margin-bottom: 32px; line-height: 1.4;">${q.prompt}</h2>
      
      <div style="display: flex; flex-direction: column; gap: 12px; flex: 1;">
        ${q.options.map((opt, i) => `
          <button class="btn-secondary" style="text-align: left; padding: 16px; font-size: 16px;" onclick="answerSAT(${i})">${opt}</button>
        `).join('')}
      </div>
    </div>
  `;
}

function answerSAT(index) {
  const q = SAT_QUESTIONS[currentSatQuestion];
  if (index === q.correctIndex) {
    satScore++;
  } else {
    satWeaknesses[q.domainHint] = (satWeaknesses[q.domainHint] || 0) + 1;
  }
  currentSatQuestion++;
  renderSATApp();
}

function renderSATResults(container) {
  let recommendation = "You have a solid baseline. We recommend starting with **Strategy**.";
  if (satWeaknesses['analytics'] > 0) {
    recommendation = "We detected a gap in your quantitative skills. We heavily recommend starting the **Product Analytics** domain in PM Academy.";
  } else if (satWeaknesses['growth'] > 0) {
    recommendation = "You missed some experimental rigor. We recommend checking out the **Growth** domain in PM Academy.";
  }

  // Update global state if available
  if (typeof state !== 'undefined' && state.trust !== undefined) {
    state.trust = Math.min(100, state.trust + (satScore * 2));
    if (typeof updateGlobalMetrics === 'function') updateGlobalMetrics();
  }

  container.innerHTML = `
    <div style="padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; box-sizing: border-box;" class="animate-slide-up">
      <div style="font-size: 64px; margin-bottom: 16px;">${satScore === 3 ? '🏆' : '📊'}</div>
      <h2 style="font-size: 32px; margin-top: 0; margin-bottom: 8px;">Diagnostic Complete</h2>
      <div style="font-size: 24px; color: var(--accent); margin-bottom: 32px;">Score: ${satScore} / ${SAT_QUESTIONS.length}</div>
      
      <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px; padding: 24px; max-width: 500px; text-align: left;">
        <h3 style="margin-top: 0; font-size: 16px; margin-bottom: 16px;">AI Personalized Recommendation</h3>
        <p style="color: var(--text-dim); line-height: 1.6; margin: 0;">${recommendation}</p>
      </div>
      
      <button class="btn-primary" style="margin-top: 32px;" onclick="closeApp('win-sat'); openApp('win-academy');">Go to PM Academy</button>
    </div>
  `;
}
