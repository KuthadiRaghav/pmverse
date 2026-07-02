// sprint_engine.js

const SPRINT_BACKLOG = [
  { id: 1, title: "Fix Stripe API Checkout Bug", sp: 8, type: "bug" },
  { id: 2, title: "Driver Background Check Portal", sp: 13, type: "feature" },
  { id: 3, title: "School District B2B Dashboard", sp: 21, type: "feature" },
  { id: 4, title: "Refactor Notification Microservice", sp: 5, type: "tech-debt" },
  { id: 5, title: "Update Terms of Service Link", sp: 2, type: "task" },
  { id: 6, title: "Implement Carpool Routing Algorithm", sp: 13, type: "feature" }
];

let selectedTickets = new Set();
const SPRINT_CAPACITY = 20;

function renderSprintApp() {
  const container = document.getElementById("sprint-content");
  if (!container) return;

  let currentSP = 0;
  selectedTickets.forEach(id => {
    const t = SPRINT_BACKLOG.find(x => x.id === id);
    if (t) currentSP += t.sp;
  });

  const isOverCapacity = currentSP > SPRINT_CAPACITY;

  let html = `
    <div style="display: flex; height: 100%; background: var(--bg-panel);">
      
      <!-- Backlog Sidebar -->
      <div style="width: 350px; border-right: 1px solid var(--line); display: flex; flex-direction: column; background: var(--bg-raised);">
        <div style="padding: 16px; border-bottom: 1px solid var(--line); font-weight: bold; color: var(--text);">Product Backlog</div>
        <div style="flex: 1; overflow: auto; padding: 16px; display: flex; flex-direction: column; gap: 8px;">
  `;

  SPRINT_BACKLOG.forEach(t => {
    const isSelected = selectedTickets.has(t.id);
    if (!isSelected) {
      html += `
        <div style="background: var(--bg-panel); border: 1px solid var(--line); padding: 12px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="toggleTicket(${t.id})">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 14px; font-weight: 500;">${t.title}</span>
            <span style="font-size: 11px; text-transform: uppercase; color: var(--text-dim);">${t.type}</span>
          </div>
          <div style="background: var(--bg-raised); border: 1px solid var(--line); border-radius: 50%; width: 28px; height: 28px; display: flex; justify-content: center; align-items: center; font-size: 12px; font-weight: bold; color: var(--accent);">${t.sp}</div>
        </div>
      `;
    }
  });

  html += `
        </div>
      </div>

      <!-- Active Sprint Area -->
      <div style="flex: 1; display: flex; flex-direction: column; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <h2 style="margin: 0; font-size: 24px;">Sprint Planning: NovaRide v1.2</h2>
          <div style="display: flex; flex-direction: column; align-items: flex-end;">
            <span style="font-size: 12px; text-transform: uppercase; color: var(--text-dim); font-weight: bold; margin-bottom: 4px;">Engineering Capacity</span>
            <span style="font-size: 24px; font-weight: bold; color: ${isOverCapacity ? '#ef4444' : 'var(--accent)'};">${currentSP} / ${SPRINT_CAPACITY} SP</span>
          </div>
        </div>

        <div style="flex: 1; border: 2px dashed ${isOverCapacity ? '#ef4444' : 'var(--line)'}; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 8px; overflow: auto;">
  `;

  if (selectedTickets.size === 0) {
    html += `<div style="margin: auto; color: var(--text-dim);">Click items in the backlog to add them to the sprint.</div>`;
  }

  selectedTickets.forEach(id => {
    const t = SPRINT_BACKLOG.find(x => x.id === id);
    if (t) {
      html += `
        <div style="background: var(--bg-raised); border: 1px solid var(--accent); padding: 16px; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 16px; font-weight: 500;">${t.title}</span>
            <span style="font-size: 12px; color: var(--text-dim);">${t.type}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="font-size: 16px; font-weight: bold; color: var(--accent);">${t.sp} SP</span>
            <button class="btn-secondary" style="padding: 4px 8px; font-size: 12px;" onclick="toggleTicket(${t.id})">Remove</button>
          </div>
        </div>
      `;
    }
  });

  html += `
        </div>
        
        <div style="margin-top: 24px; display: flex; justify-content: flex-end;">
          <button class="btn-primary" onclick="startSprint()" ${selectedTickets.size === 0 ? 'disabled' : ''}>Start Sprint</button>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;
}

function toggleTicket(id) {
  if (selectedTickets.has(id)) {
    selectedTickets.delete(id);
  } else {
    selectedTickets.add(id);
  }
  renderSprintApp();
}

function startSprint() {
  let currentSP = 0;
  selectedTickets.forEach(id => {
    const t = SPRINT_BACKLOG.find(x => x.id === id);
    if (t) currentSP += t.sp;
  });

  const container = document.getElementById("sprint-content");

  if (currentSP > SPRINT_CAPACITY) {
    // Tech Lead complains
    if (typeof state !== 'undefined') {
      state.morale = Math.max(0, state.morale - 10);
      if (typeof updateGlobalMetrics === 'function') updateGlobalMetrics();
    }

    container.innerHTML = `
      <div style="padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; box-sizing: border-box;" class="animate-slide-up">
        <div style="font-size: 64px; margin-bottom: 16px;">🛑</div>
        <h2 style="font-size: 32px; margin-top: 0; margin-bottom: 8px;">Sprint Rejected by Tech Lead</h2>
        
        <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; border-radius: 12px; padding: 24px; max-width: 500px; text-align: left;">
          <p style="color: var(--text); line-height: 1.6; margin: 0;"><strong>Tech Lead:</strong> We have a velocity of ${SPRINT_CAPACITY} SP. You just tried to cram ${currentSP} SP into the sprint. We are going to burn out the entire team if you keep doing this. I'm blocking this sprint. Reduce the scope.</p>
        </div>
        
        <button class="btn-primary" style="margin-top: 32px;" onclick="renderSprintApp()">Back to Planning</button>
      </div>
    `;
  } else {
    // Success
    if (typeof state !== 'undefined') {
      state.trust = Math.min(100, state.trust + 5);
      state.morale = Math.min(100, state.morale + 5);
      if (typeof updateGlobalMetrics === 'function') updateGlobalMetrics();
    }

    container.innerHTML = `
      <div style="padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; box-sizing: border-box;" class="animate-slide-up">
        <div style="font-size: 64px; margin-bottom: 16px;">🚀</div>
        <h2 style="font-size: 32px; margin-top: 0; margin-bottom: 8px;">Sprint Started Successfully</h2>
        
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 12px; padding: 24px; max-width: 500px; text-align: left;">
          <p style="color: var(--text); line-height: 1.6; margin: 0;"><strong>Tech Lead:</strong> Good scope management. We can actually deliver this without working over the weekend. The team is fired up.</p>
        </div>
        
        <button class="btn-primary" style="margin-top: 32px;" onclick="closeApp('win-sprint');">Close Board</button>
      </div>
    `;
  }
}
