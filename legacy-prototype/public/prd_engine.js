const PRD_PROMPTS = [
  {
    title: "NovaRide: Driver Background Check API",
    description: "Design a 1-pager PRD for a new automated Background Check integration. Define the goal, non-goals, target audience, and key risks (especially around latency and failure states)."
  },
  {
    title: "NovaRide: School District B2B Portal",
    description: "Write a PRD for a B2B portal allowing school districts to bulk-book rides. Focus on user roles, permissions, reporting metrics, and billing."
  },
  {
    title: "NovaRide: Carpool Routing Algorithm",
    description: "Design the product requirements for a carpool algorithm that pairs up to 3 kids from the same neighborhood going to the same school. Focus heavily on edge cases and wait times."
  }
];

let currentPrdPromptIndex = 0;

function renderPRDApp() {
  const prompt = PRD_PROMPTS[currentPrdPromptIndex];
  const container = document.getElementById("prd-content");
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; gap: 24px; height: 100%; padding: 20px;">
      
      <!-- Left Panel: Prompt -->
      <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--accent); font-weight: 700;">Prompt</div>
        <h2 style="font-size: 24px; margin-top: 0;">${prompt.title}</h2>
        <p style="color: var(--text-dim); line-height: 1.6;">${prompt.description}</p>
        
        <div style="margin-top: auto;">
          <button class="btn-primary" onclick="cyclePRDPrompt()">Next Prompt</button>
        </div>
      </div>

      <!-- Right Panel: Editor -->
      <div style="flex: 2; display: flex; flex-direction: column; background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px; overflow: hidden;">
        <textarea id="prd-editor" placeholder="# Goals\n\n# Non-Goals\n\n# Target Audience\n\n# User Stories\n\n# Success Metrics..." style="flex: 1; background: transparent; border: none; padding: 24px; color: var(--text); font-family: var(--font-body); font-size: 16px; line-height: 1.6; resize: none; outline: none;"></textarea>
        <div style="padding: 16px; border-top: 1px solid var(--line); display: flex; justify-content: flex-end; align-items: center; gap: 16px;">
          <span id="prd-word-count" style="font-size: 12px; color: var(--text-dim);">0 words</span>
          <button class="btn-primary" onclick="submitPRD()">Submit for Review</button>
        </div>
      </div>
      
    </div>
  `;

  // Attach word counter
  const editor = document.getElementById("prd-editor");
  editor.addEventListener("input", () => {
    const text = editor.value.trim();
    const words = text ? text.split(/\s+/).length : 0;
    document.getElementById("prd-word-count").innerText = `${words} words`;
  });
}

function cyclePRDPrompt() {
  currentPrdPromptIndex = (currentPrdPromptIndex + 1) % PRD_PROMPTS.length;
  renderPRDApp();
}

function submitPRD() {
  const text = document.getElementById("prd-editor").value.trim();
  if (text.length < 50) {
    alert("Your PRD is too short to evaluate! Write at least a few sentences.");
    return;
  }

// Heuristic Grading Logic
  let score = 100;
  let feedback = [];

  const lowerText = text.toLowerCase();

  // 1. Structure Check - CFO Persona
  if (!lowerText.includes("goal")) {
    score -= 15;
    feedback.push("<strong>CFO:</strong> ❌ Missing Goals. I won't fund a project if I don't know what we are trying to achieve.");
  } else {
    feedback.push("<strong>CFO:</strong> ✅ Goals are clearly defined.");
  }

  // Tech Lead Persona
  if (!lowerText.includes("non-goal") && !lowerText.includes("out of scope")) {
    score -= 10;
    feedback.push("<strong>Tech Lead:</strong> ❌ Missing Non-Goals. My engineers need to know what NOT to build to avoid scope creep.");
  } else {
    feedback.push("<strong>Tech Lead:</strong> ✅ Non-Goals defined. The engineering scope is protected.");
  }

  // VP of Product Persona
  if (!lowerText.includes("metric") && !lowerText.includes("kpi") && !lowerText.includes("success") && !lowerText.includes("ltv") && !lowerText.includes("cac")) {
    score -= 20;
    feedback.push("<strong>VP Product:</strong> ❌ Missing Success Metrics. How do we know if we succeeded if we aren't tracking KPIs?");
  } else {
    feedback.push("<strong>VP Product:</strong> ✅ Success metrics defined.");
  }

  // Legal / Ops Persona
  if (!lowerText.includes("risk") && !lowerText.includes("edge case") && !lowerText.includes("safety")) {
    score -= 10;
    feedback.push("<strong>Legal:</strong> ❌ Missing Risks/Edge Cases. This is a kids' transport app; we need to think about what could go wrong.");
  } else {
    feedback.push("<strong>Legal:</strong> ✅ Risks considered.");
  }

  // 2. Length Check
  const words = text.split(/\s+/).length;
  if (words < 100) {
    score -= 10;
    feedback.push("<strong>CEO:</strong> ⚠️ This is too brief. A 1-pager needs a bit more depth to convince the board.");
  } else if (words > 600) {
    score -= 5;
    feedback.push("<strong>CEO:</strong> ⚠️ Very long! Keep PRDs concise and readable. Nobody wants to read a novel.");
  }
  
  // Game state impacts
  if (typeof state !== 'undefined') {
    if (score >= 80) {
      state.trust = Math.min(100, state.trust + 5);
      state.morale = Math.min(100, state.morale + 2);
    } else {
      state.trust = Math.max(0, state.trust - 5);
    }
    if (typeof updateGlobalMetrics === 'function') updateGlobalMetrics();
  }

  // Generate Scorecard UI
  const container = document.getElementById("prd-content");
  container.innerHTML = \`
    <div style="padding: 40px; max-width: 600px; margin: 0 auto; text-align: center;" class="animate-slide-up">
      <h2 style="font-size: 32px; margin-bottom: 8px;">AI Stakeholder Defense</h2>
      <div style="font-size: 64px; font-weight: bold; color: \${score >= 80 ? 'var(--accent)' : 'red'}; margin-bottom: 24px;">\${score}/100</div>
      
      <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 12px; padding: 24px; text-align: left;">
        <h3 style="margin-top: 0; font-size: 16px; margin-bottom: 16px;">Feedback Report</h3>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px;">
          \${feedback.map(f => \`<li style="font-size: 14px; color: var(--text);">\${f}</li>\`).join('')}
        </ul>
      </div>
      
      <button class="btn-primary" style="margin-top: 32px;" onclick="renderPRDApp()">Write Another PRD</button>
    </div>
  \`;
}
