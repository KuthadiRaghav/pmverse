import React, { useRef, useEffect } from 'react';
import { Workbook } from '@fortune-sheet/react';
import '@fortune-sheet/react/dist/index.css';
import { useCase } from '../case/CaseContext';

export default function NovaSheets() {
  const ref = useRef(null);
  const { recordEvidence } = useCase();

  const containerRef = useRef(null);

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

  const initialData = [{
    name: 'Retention Impact Model',
    status: 1,
    celldata: [
      { r: 0, c: 0, v: { m: 'NovaCart — Retention Impact Model (Sara Kim)', v: 'NovaCart — Retention Impact Model (Sara Kim)', bl: 1 } },

      { r: 2, c: 0, v: { m: 'Input', v: 'Input', bl: 1 } },
      { r: 2, c: 1, v: { m: 'Value', v: 'Value', bl: 1 } },
      { r: 2, c: 2, v: { m: 'Notes', v: 'Notes', bl: 1 } },

      { r: 3, c: 0, v: { m: 'Monthly signups', v: 'Monthly signups' } },
      { r: 3, c: 1, v: { m: '5200', v: '5200', ct: { fa: 'General', t: 'n' } } },

      { r: 4, c: 0, v: { m: 'Avg order value ($)', v: 'Avg order value ($)' } },
      { r: 4, c: 1, v: { m: '42', v: '42', ct: { fa: 'General', t: 'n' } } },

      { r: 5, c: 0, v: { m: 'Orders / retained user / mo', v: 'Orders / retained user / mo' } },
      { r: 5, c: 1, v: { m: '1.8', v: '1.8', ct: { fa: 'General', t: 'n' } } },

      { r: 7, c: 0, v: { m: 'Week-4 retention — today', v: 'Week-4 retention — today', bl: 1 } },
      { r: 7, c: 1, v: { m: '0.22', v: '0.22', ct: { fa: '0%', t: 'n' } } },
      { r: 7, c: 2, v: { m: 'Was 38% before v2.4', v: 'Was 38% before v2.4' } },

      { r: 8, c: 0, v: { m: 'Week-4 retention — if fixed', v: 'Week-4 retention — if fixed', bl: 1 } },
      { r: 8, c: 1, v: { m: '0.34', v: '0.34', ct: { fa: '0%', t: 'n' } } },
      { r: 8, c: 2, v: { m: 'Conservative recovery', v: 'Conservative recovery' } },

      { r: 10, c: 0, v: { m: 'Monthly revenue — today ($)', v: 'Monthly revenue — today ($)', bl: 1 } },
      { r: 10, c: 1, v: { f: '=B4*B8*B5*B6', m: '86486', v: '86486', ct: { fa: 'General', t: 'n' } } },

      { r: 11, c: 0, v: { m: 'Monthly revenue — if fixed ($)', v: 'Monthly revenue — if fixed ($)', bl: 1 } },
      { r: 11, c: 1, v: { f: '=B4*B9*B5*B6', m: '133660', v: '133660', ct: { fa: 'General', t: 'n' } } },

      { r: 13, c: 0, v: { m: 'Revenue at stake / month ($)', v: 'Revenue at stake / month ($)', bl: 1, fc: '#ef4444' } },
      { r: 13, c: 1, v: { f: '=B12-B11', m: '47174', v: '47174', ct: { fa: 'General', t: 'n' }, fc: '#ef4444', bl: 1 } },
      { r: 13, c: 2, v: { m: 'Every month the regression ships', v: 'Every month the regression ships', fc: '#ef4444' } },
    ]
  }, {
    name: 'Unit Economics (LTV/CAC)',
    status: 0,
    celldata: [
      { r: 0, c: 0, v: { m: 'Metric', v: 'Metric', bl: 1 } },
      { r: 0, c: 1, v: { m: 'Value', v: 'Value', bl: 1 } },
      { r: 0, c: 2, v: { m: 'Notes', v: 'Notes', bl: 1 } },
      
      { r: 1, c: 0, v: { m: 'ARPU', v: 'ARPU' } },
      { r: 1, c: 1, v: { m: '15.00', v: '15.00', ct: { fa: 'General', t: 'n' } } },
      { r: 1, c: 2, v: { m: 'Average Revenue Per User ($)', v: 'Average Revenue Per User ($)' } },

      { r: 2, c: 0, v: { m: 'Gross Margin', v: 'Gross Margin' } },
      { r: 2, c: 1, v: { m: '0.60', v: '0.60', ct: { fa: '0%', t: 'n' } } },
      { r: 2, c: 2, v: { m: '60%', v: '60%' } },

      { r: 3, c: 0, v: { m: 'Churn Rate', v: 'Churn Rate' } },
      { r: 3, c: 1, v: { m: '0.05', v: '0.05', ct: { fa: '0%', t: 'n' } } },
      { r: 3, c: 2, v: { m: '5% monthly churn', v: '5% monthly churn' } },

      { r: 4, c: 0, v: { m: 'Lifetime (Months)', v: 'Lifetime (Months)', bl: 1 } },
      { r: 4, c: 1, v: { f: '=1/B4', m: '20', v: '20', ct: { fa: 'General', t: 'n' } } },
      { r: 4, c: 2, v: { m: 'Calculated: 1 / Churn', v: 'Calculated: 1 / Churn' } },

      { r: 5, c: 0, v: { m: 'LTV ($)', v: 'LTV ($)', bl: 1 } },
      { r: 5, c: 1, v: { f: '=B2*B3*B5', m: '180', v: '180', ct: { fa: 'General', t: 'n' } } },
      { r: 5, c: 2, v: { m: 'Calculated: ARPU * Margin * Lifetime', v: 'Calculated: ARPU * Margin * Lifetime' } },

      { r: 7, c: 0, v: { m: 'Marketing Spend ($)', v: 'Marketing Spend ($)' } },
      { r: 7, c: 1, v: { m: '50000', v: '50000', ct: { fa: 'General', t: 'n' } } },
      
      { r: 8, c: 0, v: { m: 'New Customers', v: 'New Customers' } },
      { r: 8, c: 1, v: { m: '1250', v: '1250', ct: { fa: 'General', t: 'n' } } },

      { r: 9, c: 0, v: { m: 'CAC ($)', v: 'CAC ($)', bl: 1 } },
      { r: 9, c: 1, v: { f: '=B8/B9', m: '40', v: '40', ct: { fa: 'General', t: 'n' } } },
      { r: 9, c: 2, v: { m: 'Calculated: Spend / Customers', v: 'Calculated: Spend / Customers' } },

      { r: 11, c: 0, v: { m: 'LTV:CAC Ratio', v: 'LTV:CAC Ratio', bl: 1, fc: '#10b981' } },
      { r: 11, c: 1, v: { f: '=B6/B10', m: '4.5', v: '4.5', ct: { fa: '0.0', t: 'n' }, fc: '#10b981', bl: 1 } },
      { r: 11, c: 2, v: { m: '> 3.0 is excellent', v: '> 3.0 is excellent', fc: '#10b981' } },
    ]
  }];

  return (
    <div ref={containerRef} style={{ flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
      <Workbook ref={ref} data={initialData} />
    </div>
  );
}
