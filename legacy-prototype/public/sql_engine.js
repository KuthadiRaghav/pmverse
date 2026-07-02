// sql_engine.js

const MOCK_DB = {
  users: [
    { id: 1, name: "Alice", role: "parent", signup_date: "2023-01-10", status: "active" },
    { id: 2, name: "Bob", role: "parent", signup_date: "2023-01-15", status: "churned" },
    { id: 3, name: "Charlie", role: "driver", signup_date: "2023-02-20", status: "active" },
    { id: 4, name: "Diana", role: "parent", signup_date: "2023-03-05", status: "active" },
    { id: 5, name: "Evan", role: "driver", signup_date: "2023-03-12", status: "suspended" },
    { id: 6, name: "Fiona", role: "parent", signup_date: "2023-04-01", status: "active" },
    { id: 7, name: "George", role: "driver", signup_date: "2023-04-02", status: "active" },
  ],
  rides: [
    { id: 101, user_id: 1, driver_id: 3, status: "completed", fare: 25.50, date: "2023-04-01" },
    { id: 102, user_id: 1, driver_id: 3, status: "completed", fare: 30.00, date: "2023-04-05" },
    { id: 103, user_id: 4, driver_id: 3, status: "cancelled", fare: 15.00, date: "2023-04-06" },
    { id: 104, user_id: 2, driver_id: 5, status: "completed", fare: 15.00, date: "2023-04-10" },
    { id: 105, user_id: 6, driver_id: 7, status: "cancelled", fare: 15.00, date: "2023-04-12" },
    { id: 106, user_id: 1, driver_id: 3, status: "cancelled", fare: 15.00, date: "2023-04-15" },
    { id: 107, user_id: 4, driver_id: 7, status: "cancelled", fare: 15.00, date: "2023-04-16" },
  ],
  payments: [
    { id: 1001, ride_id: 101, amount: 25.50, status: "processed" },
    { id: 1002, ride_id: 102, amount: 30.00, status: "processed" },
    { id: 1004, ride_id: 104, amount: 15.00, status: "processed" }
  ]
};

function renderSQLApp() {
  const container = document.getElementById("sql-content");
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; height: 100%; background: var(--bg-panel);">
      
      <!-- Query Editor -->
      <div style="flex: 1; display: flex; flex-direction: column; border-bottom: 1px solid var(--line);">
        <div style="background: var(--bg-raised); padding: 8px 16px; font-family: monospace; font-size: 12px; color: var(--text-dim); border-bottom: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center;">
          <span>NovaRide PostgreSQL 14.2</span>
          <div style="display: flex; gap: 12px;">
            <span>Tables: <code>users</code>, <code>rides</code>, <code>payments</code></span>
          </div>
        </div>
        <textarea id="sql-editor" placeholder="SELECT * FROM users WHERE status = 'active';" style="flex: 1; background: #0d1117; color: #c9d1d9; padding: 16px; font-family: monospace; font-size: 15px; border: none; outline: none; resize: none;"></textarea>
        <div style="padding: 12px 16px; background: var(--bg-raised); border-top: 1px solid var(--line); display: flex; justify-content: flex-end;">
          <button class="btn-primary" onclick="runSQLQuery()" style="background: #10b981; color: white;">▶ Run Query</button>
        </div>
      </div>

      <!-- Results Panel -->
      <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: var(--bg-panel);">
        <div style="padding: 8px 16px; font-family: monospace; font-size: 12px; color: var(--accent); border-bottom: 1px solid var(--line); font-weight: bold;">
          Query Results
        </div>
        <div id="sql-results" style="flex: 1; overflow: auto; padding: 16px;">
          <div style="color: var(--text-dim); font-family: monospace; font-style: italic;">Run a query to see results...</div>
        </div>
      </div>
      
    </div>
  `;
}

function runSQLQuery() {
  const editor = document.getElementById("sql-editor");
  const resultsDiv = document.getElementById("sql-results");
  if (!editor || !resultsDiv) return;

  const query = editor.value.trim();
  if (!query) {
    resultsDiv.innerHTML = `<div style="color: var(--text-dim); font-family: monospace;">No query provided.</div>`;
    return;
  }

  try {
    const result = parseAndExecuteSQL(query);
    
    // Quest Intercept Logic
    if (typeof state !== 'undefined' && state.questStep === 1) {
      if (query.toLowerCase().includes("from rides") && query.toLowerCase().includes("cancelled")) {
        state.questStep = 2;
        if (typeof updateQuestBanner === 'function') updateQuestBanner();
        
        // Add a system message injected before the table
        resultsDiv.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; border-radius: 8px; padding: 16px; margin-bottom: 16px; color: #10b981; font-family: sans-serif;">
            <strong>System:</strong> You found the data! There are 4 cancelled rides at $15 each. Total lost revenue is $60. Now calculate the impact in NovaSheets.
          </div>
        `;
        renderSQLTable(result, resultsDiv, true);
        return;
      }
    }

    renderSQLTable(result, resultsDiv);
  } catch (error) {
    resultsDiv.innerHTML = `<div style="color: #ef4444; font-family: monospace;">Syntax Error: ${error.message}</div>`;
  }
}

function parseAndExecuteSQL(query) {
  // A very rudimentary SQL parser for simulation purposes
  const q = query.toLowerCase().replace(/;/g, '').trim();
  
  const selectMatch = q.match(/^select\s+(.+)\s+from\s+(\w+)(?:\s+where\s+(.+))?/);
  
  if (!selectMatch) {
    throw new Error("Only simple SELECT statements are supported (e.g., SELECT * FROM users WHERE status='active')");
  }

  const fields = selectMatch[1].split(',').map(s => s.trim());
  const tableName = selectMatch[2];
  const whereClause = selectMatch[3];

  if (!MOCK_DB[tableName]) {
    throw new Error(\`Relation "\${tableName}" does not exist\`);
  }

  let rows = MOCK_DB[tableName];

  // Apply WHERE clause
  if (whereClause) {
    const conditionMatch = whereClause.match(/(\w+)\s*(=|!=|>|<)\s*(['"]?)(.+)\3/);
    if (conditionMatch) {
      const col = conditionMatch[1];
      const op = conditionMatch[2];
      const valStr = conditionMatch[4];
      
      rows = rows.filter(row => {
        let rowVal = row[col];
        let targetVal = isNaN(valStr) ? valStr : Number(valStr);
        if (typeof rowVal === 'number') targetVal = Number(targetVal);

        switch (op) {
          case '=': return rowVal == targetVal;
          case '!=': return rowVal != targetVal;
          case '>': return rowVal > targetVal;
          case '<': return rowVal < targetVal;
          default: return true;
        }
      });
    } else {
      throw new Error("Unsupported WHERE condition format");
    }
  }

  // Handle SELECT fields / COUNT
  if (fields.length === 1 && fields[0].startsWith('count(')) {
    return {
      columns: ['count'],
      rows: [{ count: rows.length }]
    };
  }

  if (fields[0] !== '*') {
    rows = rows.map(row => {
      const newRow = {};
      fields.forEach(f => {
        if (row[f] !== undefined) newRow[f] = row[f];
      });
      return newRow;
    });
  }

  if (rows.length === 0) {
    return { columns: [], rows: [] };
  }

  return {
    columns: Object.keys(rows[0]),
    rows: rows
  };
}

function renderSQLTable(result, container, append = false) {
  if (result.rows.length === 0) {
    const emptyHTML = `<div style="color: var(--text-dim); font-family: monospace;">0 rows returned.</div>`;
    if (append) container.innerHTML += emptyHTML;
    else container.innerHTML = emptyHTML;
    return;
  }

  let html = `<table style="width: 100%; border-collapse: collapse; font-family: monospace; font-size: 14px; color: var(--text); text-align: left;">`;
  
  // Headers
  html += `<thead><tr>`;
  result.columns.forEach(col => {
    html += `<th style="padding: 8px; border-bottom: 2px solid var(--line); color: var(--accent);">${col}</th>`;
  });
  html += `</tr></thead>`;

  // Body
  html += `<tbody>`;
  result.rows.forEach(row => {
    html += `<tr>`;
    result.columns.forEach(col => {
      html += `<td style="padding: 8px; border-bottom: 1px solid var(--line);">${row[col]}</td>`;
    });
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  
  html += `<div style="margin-top: 12px; font-family: monospace; font-size: 12px; color: var(--text-dim);">${result.rows.length} row(s) returned.</div>`;

  if (append) {
    container.innerHTML += html;
  } else {
    container.innerHTML = html;
  }
}
