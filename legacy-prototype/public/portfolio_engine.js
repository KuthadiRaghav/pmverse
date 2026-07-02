// portfolio_engine.js

function renderPortfolioApp() {
  const container = document.getElementById("portfolio-content");
  if (!container) return;

  const trust = (typeof state !== 'undefined' && state.trust !== undefined) ? state.trust : 50;
  const morale = (typeof state !== 'undefined' && state.morale !== undefined) ? state.morale : 50;
  const runway = (typeof state !== 'undefined' && state.runway !== undefined) ? state.runway : 250000;

  // Render a clean, printable HTML document look
  container.innerHTML = `
    <div style="background: #ffffff; color: #333333; padding: 40px; height: 100%; box-sizing: border-box; overflow: auto; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
      
      <div style="max-width: 800px; margin: 0 auto; border: 1px solid #e5e7eb; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 48px; background: white;">
        
        <!-- Header -->
        <div style="border-bottom: 2px solid #3b82f6; padding-bottom: 24px; margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <h1 style="margin: 0 0 8px 0; font-size: 36px; color: #111827;">Product Manager Portfolio</h1>
            <p style="margin: 0; font-size: 18px; color: #6b7280;">Certified via GoPractice Simulator 2026</p>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 14px; font-weight: bold; color: #3b82f6; text-transform: uppercase; letter-spacing: 1px;">Status</div>
            <div style="font-size: 24px; font-weight: bold; color: #10b981;">Verified</div>
          </div>
        </div>

        <!-- Section: Impact -->
        <h2 style="font-size: 20px; color: #111827; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 24px;">Executive Impact: NovaRide</h2>
        <div style="display: flex; gap: 24px; margin-bottom: 40px;">
          <div style="flex: 1; background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Final Runway</div>
            <div style="font-size: 28px; font-weight: bold; color: #111827;">$${runway.toLocaleString()}</div>
          </div>
          <div style="flex: 1; background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Board Trust</div>
            <div style="font-size: 28px; font-weight: bold; color: ${trust > 70 ? '#10b981' : (trust < 30 ? '#ef4444' : '#f59e0b')};">${trust}%</div>
          </div>
          <div style="flex: 1; background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; text-align: center;">
            <div style="font-size: 12px; color: #6b7280; text-transform: uppercase; font-weight: bold;">Team Morale</div>
            <div style="font-size: 28px; font-weight: bold; color: ${morale > 70 ? '#10b981' : (morale < 30 ? '#ef4444' : '#f59e0b')};">${morale}%</div>
          </div>
        </div>

        <!-- Section: Artifacts -->
        <h2 style="font-size: 20px; color: #111827; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; margin-bottom: 24px;">Validated Artifacts</h2>
        
        <div style="margin-bottom: 24px;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #1f2937;">Product Requirements Document (PRD)</h3>
          <p style="margin: 0; color: #4b5563; line-height: 1.6;">Successfully drafted and defended PRDs against strict AI stakeholder heuristics (CFO, Tech Lead, VP of Product). Demonstrated ability to balance Scope, Success Metrics (LTV/CAC), and Edge Cases.</p>
        </div>

        <div style="margin-bottom: 24px;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #1f2937;">Data Analytics & SQL</h3>
          <p style="margin: 0; color: #4b5563; line-height: 1.6;">Executed complex relational database queries via PostgreSQL simulation. Identified cohort retention cliffs and modeled unit economics in integrated spreadsheet canvas.</p>
        </div>

        <div style="margin-bottom: 40px;">
          <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #1f2937;">Agile Sprint Execution</h3>
          <p style="margin: 0; color: #4b5563; line-height: 1.6;">Managed engineering backlogs and capacity planning. Negotiated scope with technical leads to prevent burnout while maximizing sprint velocity.</p>
        </div>

        <!-- Print Button -->
        <div style="text-align: center;">
          <button style="background: #3b82f6; color: white; padding: 12px 24px; border: none; border-radius: 6px; font-size: 16px; font-weight: bold; cursor: pointer;" onclick="window.print()">Print / Save as PDF</button>
        </div>

      </div>
    </div>
  `;
}
