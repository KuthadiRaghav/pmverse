import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCase } from '../case/CaseContext';
import { useTheme } from '../ThemeContext';
import { useTokens } from '../theme';

// NovaData SQL — a real in-browser SQLite console (WASM) with a live schema
// sidebar, chart-the-result, and query history. Benchmarks: Mode / Hex.

export default function SqlConsole() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const t = useTokens();
  const { caseDef, state: caseState, recordEvidence } = useCase();

  const [db, setDb] = useState(null);
  const [schema, setSchema] = useState([]); // [{ table, columns:[{name,type}] }]
  const firstMissionTable = caseDef?.sqlSeed?.match(/CREATE TABLE (\w+)/)?.[1] || 'users';
  const defaultQuery = `-- NovaData SQL — ${caseDef?.meta?.company || 'demo'} production replica\n-- The case tables are loaded. Start here:\nSELECT * FROM ${firstMissionTable};`;
  const [query, setQuery] = useState(defaultQuery);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [queryTime, setQueryTime] = useState(0);
  const [view, setView] = useState('table'); // 'table' | 'chart'
  const [history, setHistory] = useState([]);
  const [expanded, setExpanded] = useState({});
  const editorRef = useRef(null);

  useEffect(() => {
    setQuery(defaultQuery);
    setResults(null);
    setError(null);
    setHistory([]);
  }, [caseDef?.meta?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let activeDb = null;
    let mounted = true;
    initSqlJs({ locateFile: () => sqlWasmUrl }).then(SQL => {
      if (!mounted) return;
      const database = new SQL.Database();
      activeDb = database;
      database.run(`
        CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, role TEXT, signup_date TEXT, status TEXT);
        INSERT INTO users VALUES
          (1,'Alice','parent','2023-01-10','active'),(2,'Bob','parent','2023-01-15','churned'),
          (3,'Charlie','driver','2023-02-20','active'),(4,'Diana','parent','2023-03-05','active'),
          (5,'Evan','driver','2023-03-12','suspended'),(6,'Fiona','parent','2023-04-01','active'),
          (7,'George','driver','2023-04-02','active');
        CREATE TABLE rides (id INTEGER PRIMARY KEY, user_id INTEGER, driver_id INTEGER, status TEXT, fare REAL, date TEXT);
        INSERT INTO rides VALUES
          (101,1,3,'completed',25.50,'2023-04-01'),(102,1,3,'completed',30.00,'2023-04-05'),
          (103,4,3,'cancelled',15.00,'2023-04-06'),(104,2,5,'completed',15.00,'2023-04-10'),
          (105,6,7,'cancelled',15.00,'2023-04-12'),(106,1,3,'cancelled',15.00,'2023-04-15'),
          (107,4,7,'cancelled',15.00,'2023-04-16');
        CREATE TABLE payments (id INTEGER PRIMARY KEY, ride_id INTEGER, amount REAL, status TEXT);
        INSERT INTO payments VALUES (1001,101,25.50,'processed'),(1002,102,30.00,'processed'),(1004,104,15.00,'processed');
      `);
      if (caseDef && caseDef.sqlSeed) database.run(caseDef.sqlSeed);

      // Introspect the real schema — what every SQL tool shows in its sidebar
      try {
        const tables = database.exec("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name");
        const names = tables[0] ? tables[0].values.map((r) => r[0]) : [];
        const sc = names.map((name) => {
          const info = database.exec(`PRAGMA table_info(${name})`);
          const columns = info[0] ? info[0].values.map((r) => ({ name: r[1], type: r[2] || '' })) : [];
          return { table: name, columns };
        });
        setSchema(sc);
        // Case tables expanded by default, demo tables collapsed
        const caseTables = new Set((caseDef?.sqlSeed || '').match(/CREATE TABLE (\w+)/g)?.map((m) => m.split(' ')[2]) || []);
        setExpanded(Object.fromEntries(sc.map((x) => [x.table, caseTables.has(x.table)])));
      } catch (e) { /* schema introspection best-effort */ }

      setDb(database);
      setIsInitializing(false);
    }).catch(err => {
      if (mounted) { setError('Failed to load SQLite engine: ' + err.message); setIsInitializing(false); }
    });
    return () => { mounted = false; if (activeDb) { try { activeDb.close(); } catch (e) { /* noop */ } } };
  }, [caseDef]);

  const runQuery = (q) => {
    const sql = q ?? query;
    if (!db) return;
    setError(null); setResults(null);
    const t0 = performance.now();
    try {
      const res = db.exec(sql);
      if (res && res.length > 0) {
        setResults(res[0]);
        setView('table');
        setHistory((h) => [sql, ...h.filter((x) => x !== sql)].slice(0, 12));
        for (const mission of caseDef?.sqlMissions || []) {
          if (mission.match.test(sql)) recordEvidence(mission.id);
        }
      } else {
        setResults({ columns: [], values: [] });
      }
    } catch (e) { setError(e.message); }
    setQueryTime((performance.now() - t0).toFixed(1));
  };

  // Insert text at the editor cursor (real IDE affordance)
  const insertAtCursor = (text) => {
    const ed = editorRef.current;
    if (!ed) { setQuery((q) => q + '\n' + text); return; }
    const sel = ed.getSelection();
    ed.executeEdits('sidebar', [{ range: sel, text, forceMoveMarkers: true }]);
    ed.focus();
  };

  // Chart detection: numeric columns become series, first non-numeric is the axis
  const chartable = results && results.values.length > 0 && (() => {
    const numericCols = results.columns.filter((_, i) => results.values.every((r) => r[i] === null || typeof r[i] === 'number'));
    return numericCols.length > 0 && results.values.length <= 60;
  })();

  const buildChartData = () => {
    const numericIdx = results.columns.map((_, i) => i).filter((i) => results.values.every((r) => r[i] === null || typeof r[i] === 'number'));
    const labelIdx = results.columns.findIndex((_, i) => !numericIdx.includes(i));
    const xIdx = labelIdx === -1 ? 0 : labelIdx;
    const seriesIdx = numericIdx.filter((i) => i !== xIdx);
    const data = results.values.map((r) => {
      const row = { _x: String(r[xIdx]) };
      seriesIdx.forEach((i) => { row[results.columns[i]] = r[i]; });
      return row;
    });
    return { data, series: seriesIdx.map((i) => results.columns[i]) };
  };

  const COLORS = ['#8957e5', '#2ea043', '#58a6ff', '#d29922', '#ec4899'];
  const railBtn = { display: 'block', width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', backgroundColor: t.bg, color: t.textMid, fontFamily: 'ui-monospace, Menlo, monospace' }}>
      {/* Header */}
      <div style={{ padding: '12px 18px', backgroundColor: t.panel, borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: t.info }}>🗄️ NovaData SQL</div>
          <div style={{ fontSize: '11px', color: t.dim, marginTop: '2px' }}>
            {isInitializing ? 'Booting WebAssembly engine…' : `SQLite3 (WASM) · ${schema.length} tables`}
          </div>
        </div>
        <button onClick={() => runQuery()} disabled={isInitializing}
          style={{ backgroundColor: t.good, color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 18px', fontWeight: 700, cursor: isInitializing ? 'wait' : 'pointer', fontFamily: 'inherit' }}>
          ▶ Run  (⌘↵)
        </button>
      </div>

      {/* Missions */}
      {(caseDef?.sqlMissions || []).length > 0 && (
        <div style={{ display: 'flex', gap: '18px', padding: '9px 18px', backgroundColor: t.bgInset, borderBottom: `1px solid ${t.border}`, fontSize: '12px', flexWrap: 'wrap' }}>
          {caseDef.sqlMissions.map((m) => {
            const done = caseState.evidence[m.id];
            return (
              <div key={m.id} title={m.hint} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: done ? t.good : t.dim }}>
                <span>{done ? '✓' : '○'}</span>
                <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{m.label}</span>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Schema sidebar */}
        <div style={{ width: '186px', flexShrink: 0, borderRight: `1px solid ${t.border}`, backgroundColor: t.panel, overflowY: 'auto', padding: '10px 8px' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: t.dim, textTransform: 'uppercase', padding: '4px 6px 8px' }}>Schema</div>
          {schema.map(({ table, columns }) => (
            <div key={table} style={{ marginBottom: '2px' }}>
              <button
                onClick={() => setExpanded((e) => ({ ...e, [table]: !e[table] }))}
                onDoubleClick={() => insertAtCursor(table)}
                title="Click to expand · double-click to insert name"
                style={{ ...railBtn, display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 6px', borderRadius: '5px', color: t.text, fontSize: '12.5px', fontWeight: 600 }}
              >
                <span style={{ color: t.dim, fontSize: '9px' }}>{expanded[table] ? '▼' : '▶'}</span>
                <span style={{ color: t.info }}>▦</span>{table}
              </button>
              {expanded[table] && columns.map((col) => (
                <button key={col.name} onClick={() => insertAtCursor(col.name)} title={`Insert "${col.name}"`}
                  style={{ ...railBtn, display: 'flex', justifyContent: 'space-between', padding: '3px 6px 3px 22px', borderRadius: '4px', color: t.dim, fontSize: '11.5px' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = t.panelAlt}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <span style={{ color: t.textMid }}>{col.name}</span>
                  <span style={{ fontSize: '9px', opacity: 0.7 }}>{(col.type || '').slice(0, 4).toLowerCase()}</span>
                </button>
              ))}
            </div>
          ))}
          {history.length > 0 && (
            <>
              <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: t.dim, textTransform: 'uppercase', padding: '14px 6px 8px' }}>History</div>
              {history.map((h, i) => (
                <button key={i} onClick={() => { setQuery(h); runQuery(h); }} title={h}
                  style={{ ...railBtn, padding: '4px 6px', borderRadius: '4px', color: t.dim, fontSize: '11px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = t.panelAlt}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  {h.replace(/--.*\n/g, '').replace(/\s+/g, ' ').trim().slice(0, 26)}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Editor */}
        <div style={{ width: '42%', borderRight: `1px solid ${t.border}` }}>
          <Editor
            height="100%" defaultLanguage="sql" theme={dark ? 'vs-dark' : 'light'} value={query}
            onChange={(val) => setQuery(val ?? '')}
            onMount={(editor, monaco) => {
              editorRef.current = editor;
              editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => runQuery(editor.getValue()));
            }}
            options={{ minimap: { enabled: false }, fontSize: 13, padding: { top: 14 }, scrollBeyondLastLine: false }}
          />
        </div>

        {/* Results */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 14px', borderBottom: `1px solid ${t.border}` }}>
            <span style={{ fontSize: '11px', color: t.dim, textTransform: 'uppercase', letterSpacing: '1px' }}>
              {results && !error ? `${results.values.length} rows · ${queryTime}ms` : 'Results'}
            </span>
            {chartable && (
              <div style={{ display: 'flex', gap: '4px', backgroundColor: t.panelAlt, borderRadius: '7px', padding: '2px' }}>
                {['table', 'chart'].map((v) => (
                  <button key={v} onClick={() => setView(v)} style={{ border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '5px', backgroundColor: view === v ? t.bg : 'transparent', color: view === v ? t.text : t.dim }}>
                    {v === 'table' ? '▦ Table' : '📊 Chart'}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: '14px' }}>
            {error && (
              <div style={{ backgroundColor: t.badSoft, border: `1px solid ${t.bad}`, color: t.bad, padding: '14px', borderRadius: '8px', fontSize: '13px' }}>
                <strong>SQL Error:</strong> {error}
              </div>
            )}

            {!error && results && view === 'table' && results.values.length > 0 && (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead><tr>
                  {results.columns.map((col, i) => (
                    <th key={i} style={{ borderBottom: `2px solid ${t.border}`, padding: '7px 8px', textAlign: 'left', color: t.dim, position: 'sticky', top: 0, backgroundColor: t.bg }}>{col}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {results.values.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${t.panelAlt}` }}>
                      {row.map((val, j) => (
                        <td key={j} style={{ padding: '7px 8px', color: typeof val === 'number' ? t.info : t.textMid }}>
                          {val !== null ? val.toString() : <span style={{ color: t.dim, fontStyle: 'italic' }}>NULL</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {!error && results && view === 'chart' && chartable && (() => {
              const { data, series } = buildChartData();
              const useBar = data.length <= 12;
              const Chart = useBar ? BarChart : LineChart;
              return (
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <Chart data={data} margin={{ top: 10, right: 12, bottom: 4, left: -12 }}>
                      <CartesianGrid stroke={t.border} strokeDasharray="3 3" />
                      <XAxis dataKey="_x" stroke={t.dim} fontSize={10} />
                      <YAxis stroke={t.dim} fontSize={10} />
                      <Tooltip contentStyle={{ backgroundColor: t.panel, border: `1px solid ${t.border}`, borderRadius: '8px', color: t.text, fontSize: '12px' }} />
                      {series.map((s, i) => useBar
                        ? <Bar key={s} dataKey={s} fill={COLORS[i % COLORS.length]} radius={[3, 3, 0, 0]} />
                        : <Line key={s} type="monotone" dataKey={s} stroke={COLORS[i % COLORS.length]} strokeWidth={2} dot={{ r: 2 }} />)}
                    </Chart>
                  </ResponsiveContainer>
                </div>
              );
            })()}

            {!error && results && results.values.length === 0 && (
              <div style={{ color: t.dim, fontSize: '13px' }}>Query ran — 0 rows returned.</div>
            )}
            {!error && !results && (
              <div style={{ color: t.dim, fontSize: '13px', lineHeight: 1.7 }}>
                Run a query to see results.<br />
                <span style={{ opacity: 0.7 }}>Tip: click a table in the sidebar to expand it; click a column to insert it at your cursor.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
