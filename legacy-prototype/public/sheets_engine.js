const SHEETS_ROWS = 10;
const SHEETS_COLS = 5;

// Data model for sheets: 2D array of { raw: "", value: "" }
let sheetsData = Array(SHEETS_ROWS).fill(null).map(() => 
  Array(SHEETS_COLS).fill(null).map(() => ({ raw: "", value: "" }))
);

function renderSheetsApp() {
  const container = document.getElementById("sheets-content");
  if (!container) return;

  let tableHtml = `<table style="width: 100%; border-collapse: collapse; font-family: monospace; font-size: 14px; color: var(--text);">`;
  
  // Header row
  tableHtml += `<tr><th style="border: 1px solid var(--line); background: var(--bg-raised); padding: 4px; width: 40px; text-align: center;"></th>`;
  for (let c = 0; c < SHEETS_COLS; c++) {
    tableHtml += `<th style="border: 1px solid var(--line); background: var(--bg-raised); padding: 4px; text-align: center;">${String.fromCharCode(65 + c)}</th>`;
  }
  tableHtml += `</tr>`;

  // Body rows
  for (let r = 0; r < SHEETS_ROWS; r++) {
    tableHtml += `<tr><td style="border: 1px solid var(--line); background: var(--bg-raised); padding: 4px; text-align: center; font-weight: bold;">${r + 1}</td>`;
    for (let c = 0; c < SHEETS_COLS; c++) {
      const cellId = `sheet-cell-${r}-${c}`;
      tableHtml += `<td style="border: 1px solid var(--line); padding: 0; position: relative;">
        <input type="text" id="${cellId}" data-r="${r}" data-c="${c}" 
          style="width: 100%; height: 100%; border: none; background: transparent; color: var(--text); padding: 8px; font-family: monospace; outline: none;"
          value="${sheetsData[r][c].value}"
          onfocus="handleSheetFocus(${r}, ${c})"
          onblur="handleSheetBlur(${r}, ${c})"
          onkeydown="handleSheetKeydown(event, ${r}, ${c})">
      </td>`;
    }
    tableHtml += `</tr>`;
  }
  tableHtml += `</table>`;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; height: 100%; background: var(--bg-panel);">
      <div style="padding: 12px 16px; border-bottom: 1px solid var(--line); background: var(--bg-raised); display: flex; gap: 12px; align-items: center;">
        <div style="font-weight: bold; color: var(--accent); font-family: monospace;" id="sheet-current-cell">A1</div>
        <input type="text" id="sheet-formula-bar" style="flex: 1; background: var(--bg-panel); border: 1px solid var(--line); border-radius: 6px; padding: 6px 12px; color: var(--text); font-family: monospace; outline: none;" placeholder="Enter value or formula (e.g. =A1+B1)" onchange="handleFormulaBarChange(event)">
      </div>
      <div style="flex: 1; overflow: auto;">
        ${tableHtml}
      </div>
    </div>
  `;
}

let activeCell = { r: 0, c: 0 };

function handleSheetFocus(r, c) {
  activeCell = { r, c };
  const cellId = String.fromCharCode(65 + c) + (r + 1);
  const currentCellEl = document.getElementById("sheet-current-cell");
  if (currentCellEl) currentCellEl.innerText = cellId;

  const formulaBar = document.getElementById("sheet-formula-bar");
  if (formulaBar) {
    formulaBar.value = sheetsData[r][c].raw;
  }
  
  // Show raw formula in the input while editing
  const inputEl = document.getElementById(`sheet-cell-${r}-${c}`);
  if (inputEl) {
    inputEl.value = sheetsData[r][c].raw;
  }
}

function handleSheetBlur(r, c) {
  const inputEl = document.getElementById(`sheet-cell-${r}-${c}`);
  if (!inputEl) return;
  
  sheetsData[r][c].raw = inputEl.value;
  evaluateAllSheets();
}

function handleSheetKeydown(e, r, c) {
  if (e.key === 'Enter') {
    e.target.blur();
    // Move down if possible
    if (r + 1 < SHEETS_ROWS) {
      const nextInput = document.getElementById(`sheet-cell-${r+1}-${c}`);
      if (nextInput) nextInput.focus();
    }
  }
}

function handleFormulaBarChange(e) {
  const r = activeCell.r;
  const c = activeCell.c;
  sheetsData[r][c].raw = e.target.value;
  evaluateAllSheets();
  
  // Update the cell input
  const inputEl = document.getElementById(`sheet-cell-${r}-${c}`);
  if (inputEl) {
    inputEl.value = sheetsData[r][c].value;
  }
}

function evaluateAllSheets() {
  // Simple evaluation loop
  let changed = true;
  let iterations = 0;
  
  // Reset values
  for (let r = 0; r < SHEETS_ROWS; r++) {
    for (let c = 0; c < SHEETS_COLS; c++) {
      sheetsData[r][c].value = "";
    }
  }

  // Iterate to resolve dependencies (max 10 iterations to prevent infinite loops)
  while (changed && iterations < 10) {
    changed = false;
    iterations++;

    for (let r = 0; r < SHEETS_ROWS; r++) {
      for (let c = 0; c < SHEETS_COLS; c++) {
        const raw = sheetsData[r][c].raw;
        let newValue = raw;
        
        if (raw.startsWith('=')) {
          // Simple formula evaluation
          try {
            let formula = raw.substring(1).toUpperCase();
            
            // Replace cell references with values
            formula = formula.replace(/[A-E]([1-9]|10)/g, (match) => {
              const colIdx = match.charCodeAt(0) - 65;
              const rowIdx = parseInt(match.substring(1)) - 1;
              const refVal = sheetsData[rowIdx][colIdx].value;
              return refVal === "" ? "0" : refVal;
            });

            // Prevent executing arbitrary code, only allow basic math
            if (/^[0-9+\-*/().\s]+$/.test(formula)) {
              // eslint-disable-next-line no-new-func
              newValue = String(new Function(`return ${formula}`)());
              // Format if it's a number
              if (!isNaN(parseFloat(newValue))) {
                newValue = parseFloat(newValue).toFixed(2).replace(/\.00$/, '');
              }
            } else {
              newValue = "#ERROR";
            }
          } catch (e) {
            newValue = "#ERROR";
          }
        }
        
        if (sheetsData[r][c].value !== newValue) {
          sheetsData[r][c].value = newValue;
          changed = true;
        }
      }
    }
  }

  // Quest Intercept Logic
  if (typeof state !== 'undefined' && state.questStep === 2) {
    let hasSixty = false;
    for (let r = 0; r < SHEETS_ROWS; r++) {
      for (let c = 0; c < SHEETS_COLS; c++) {
        if (sheetsData[r][c].value === "60" || sheetsData[r][c].value === "60.00" || sheetsData[r][c].value === "$60") {
          hasSixty = true;
        }
      }
    }
    
    if (hasSixty) {
      state.questStep = 3;
      if (typeof updateQuestBanner === 'function') updateQuestBanner();
      
      state.trust = Math.min(100, state.trust + 20);
      if (typeof updateGlobalMetrics === 'function') updateGlobalMetrics();
      
      state.chats["ceo"].push({
        role: "assistant", 
        content: "Brilliant work tracking down that data. A $60 leak isn't fatal, but the fact that you found it across our SQL database and quantified it in the spreadsheet proves you are the right PM for NovaRide."
      });
      
      // Force chat update if we are on the chat tab
      const cc = document.getElementById("chat-content");
      if (cc && typeof renderChat === 'function') renderChat();
      
      // Flash dock icon
      const dockIcon = document.querySelector('[data-app="win-decide"]');
      if (dockIcon) {
        dockIcon.style.animation = 'pulse 1s infinite';
        setTimeout(() => { dockIcon.style.animation = ''; }, 5000);
      }
    }
  }

  // Update DOM
  for (let r = 0; r < SHEETS_ROWS; r++) {
    for (let c = 0; c < SHEETS_COLS; c++) {
      const inputEl = document.getElementById(`sheet-cell-${r}-${c}`);
      // Only update if not currently focused
      if (inputEl && document.activeElement !== inputEl) {
        inputEl.value = sheetsData[r][c].value;
      }
    }
  }
}

// Pre-fill some data for the NovaRide scenario
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    // NovaRide Unit Economics starting data
    sheetsData[0][0].raw = "NovaRide";
    sheetsData[1][0].raw = "LTV/CAC";
    
    sheetsData[0][1].raw = "CAC";
    sheetsData[1][1].raw = "25";
    
    sheetsData[0][2].raw = "LTV";
    sheetsData[1][2].raw = "150";

    sheetsData[0][3].raw = "Ratio";
    sheetsData[1][3].raw = "=C2/B2";
    
    sheetsData[4][0].raw = "Lost Rev";
    
    evaluateAllSheets();
  }, 1000);
});
