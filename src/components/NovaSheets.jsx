import React, { useRef, useEffect } from 'react';
import { Workbook } from '@fortune-sheet/react';
import '@fortune-sheet/react/dist/index.css';
import { useCase } from '../case/CaseContext';
import { EmptyState } from '../ui';
import { Table } from 'lucide-react';

export default function NovaSheets() {
  const ref = useRef(null);
  const { recordEvidence, caseDef } = useCase();
  const [missionResult, setMissionResult] = React.useState(null);
  
  const sheets = caseDef?.sheets;

  const containerRef = useRef(null);

  // Read a cell's numeric value from the active sheet, trying several
  // fortune-sheet access paths (API varies by version).
  const readCell = (row, col) => {
    const wb = ref.current;
    if (!wb) return null;
    try {
      if (typeof wb.getCellValue === 'function') {
        const v = wb.getCellValue(row, col);
        if (v !== undefined && v !== null && v !== '') return Number(v);
      }
    } catch (e) { /* try next strategy */ }
    try {
      const sheets = typeof wb.getAllSheets === 'function' ? wb.getAllSheets() : null;
      const sheet = sheets && sheets[0];
      if (sheet?.data?.[row]?.[col]) return Number(sheet.data[row][col].v);
      if (sheet?.celldata) {
        const cell = sheet.celldata.find((x) => x.r === row && x.c === col);
        if (cell) return Number(cell.v?.v ?? cell.v?.m);
      }
    } catch (e) { /* fall through */ }
    return null;
  };

  const checkModel = () => {
    if (sheets?.mission?.evaluate) {
      const result = sheets.mission.evaluate(readCell);
      setMissionResult(result);
    }
  };

  // Opening the workbook counts as reviewing Sara's impact model
  useEffect(() => { recordEvidence('sheets'); }, []); // empty deps to avoid infinite loop

  useEffect(() => {
    if (!containerRef.current) return;
    let timeoutId;
    let lastWidth = 0;
    let lastHeight = 0;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (Math.abs(width - lastWidth) > 1 || Math.abs(height - lastHeight) > 1) {
          lastWidth = width;
          lastHeight = height;
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
          }, 50);
        }
      }
    });
    observer.observe(containerRef.current);
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  if (!sheets) {
    return (
      <EmptyState
        icon={Table}
        title="No spreadsheets attached"
        desc="This case study does not include any financial models or spreadsheets."
      />
    );
  }

  const toneColor = { good: '#16a34a', warn: '#d97706', info: '#6b7280' };
  return (
    <div ref={containerRef} style={{ flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      {/* Modeling mission */}
      <div style={{ padding: '9px 16px', backgroundColor: '#faf9ff', borderBottom: '1px solid #e5e7eb', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', color: '#1f2937' }}>
        <span style={{ fontWeight: 700, color: '#8957e5', whiteSpace: 'nowrap' }}>◆ MODEL IT</span>
        {sheets.mission && (
          <span style={{ color: '#4b5563' }} dangerouslySetInnerHTML={{ __html: sheets.mission.instructionHtml }} />
        )}
        {sheets.mission?.evaluate && (
          <button onClick={checkModel} style={{ marginLeft: 'auto', padding: '7px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #8957e5, #d946ef)', color: '#fff', fontWeight: 700, fontSize: '12px', whiteSpace: 'nowrap' }}>
            ✓ Check model
          </button>
        )}
        {missionResult && (
          <div style={{ flexBasis: '100%', marginTop: '2px', color: toneColor[missionResult.tone], fontWeight: 500 }}>{missionResult.msg}</div>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Workbook ref={ref} data={sheets.data} />
      </div>
    </div>
  );
}
