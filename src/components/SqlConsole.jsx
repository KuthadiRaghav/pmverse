import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { useCase } from '../case/CaseContext';
import { useTheme } from '../ThemeContext';

export default function SqlConsole() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const c = {
    bg: dark ? '#0d1117' : '#ffffff',
    panel: dark ? '#161b22' : '#f3f4f6',
    border: dark ? '#30363d' : '#e5e7eb',
    text: dark ? '#c9d1d9' : '#111827',
    dim: dark ? '#8b949e' : '#6b7280',
    title: dark ? '#58a6ff' : '#2563eb',
    tableBorder: dark ? '#21262d' : '#d1d5db',
    errorBg: dark ? 'rgba(248, 81, 73, 0.1)' : 'rgba(239, 68, 68, 0.1)',
    errorBorder: dark ? '#f85149' : '#ef4444',
    errorText: dark ? '#f85149' : '#dc2626',
    buttonBg: dark ? '#238636' : '#16a34a',
    missionDone: dark ? '#2ea043' : '#16a34a',
  };
  const { caseDef, state: caseState, recordEvidence } = useCase();
  const [db, setDb] = useState(null);
  // Default query follows the active case: start players on the first mission's table
  const firstMissionTable = caseDef?.sqlSeed?.match(/CREATE TABLE (\w+)/)?.[1] || 'users';
  const defaultQuery = `-- NovaData SQL — ${caseDef?.meta?.company || 'demo'} production replica\n-- The case tables are loaded. Start here:\nSELECT * FROM ${firstMissionTable};`;
  const [query, setQuery] = useState(defaultQuery);

  // Reset the starter query when the active case changes
  useEffect(() => {
    setQuery(defaultQuery);
    setResults(null);
    setError(null);
  }, [caseDef?.meta?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [queryTime, setQueryTime] = useState(0);

  useEffect(() => {
    let activeDb = null;
    let mounted = true;

    // Initialize SQLite WebAssembly Database
    initSqlJs({ locateFile: () => sqlWasmUrl }).then(SQL => {
      if (!mounted) return;
      const database = new SQL.Database();
      activeDb = database;
      
      // Seed Database
      database.run(`
        CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, role TEXT, signup_date TEXT, status TEXT);
        INSERT INTO users VALUES 
          (1, 'Alice', 'parent', '2023-01-10', 'active'),
          (2, 'Bob', 'parent', '2023-01-15', 'churned'),
          (3, 'Charlie', 'driver', '2023-02-20', 'active'),
          (4, 'Diana', 'parent', '2023-03-05', 'active'),
          (5, 'Evan', 'driver', '2023-03-12', 'suspended'),
          (6, 'Fiona', 'parent', '2023-04-01', 'active'),
          (7, 'George', 'driver', '2023-04-02', 'active');
        
        CREATE TABLE rides (id INTEGER PRIMARY KEY, user_id INTEGER, driver_id INTEGER, status TEXT, fare REAL, date TEXT);
        INSERT INTO rides VALUES 
          (101, 1, 3, 'completed', 25.50, '2023-04-01'),
          (102, 1, 3, 'completed', 30.00, '2023-04-05'),
          (103, 4, 3, 'cancelled', 15.00, '2023-04-06'),
          (104, 2, 5, 'completed', 15.00, '2023-04-10'),
          (105, 6, 7, 'cancelled', 15.00, '2023-04-12'),
          (106, 1, 3, 'cancelled', 15.00, '2023-04-15'),
          (107, 4, 7, 'cancelled', 15.00, '2023-04-16');

        CREATE TABLE payments (id INTEGER PRIMARY KEY, ride_id INTEGER, amount REAL, status TEXT);
        INSERT INTO payments VALUES
          (1001, 101, 25.50, 'processed'),
          (1002, 102, 30.00, 'processed'),
          (1004, 104, 15.00, 'processed');
      `);

      // Case dataset — the tables referenced in the active case
      if (caseDef && caseDef.sqlSeed) {
        database.run(caseDef.sqlSeed);
      }

      setDb(database);
      setIsInitializing(false);
    }).catch(err => {
      console.error(err);
      if (mounted) {
        setError("Failed to load WebAssembly SQLite Engine: " + err.message);
        setIsInitializing(false);
      }
    });

    return () => {
      mounted = false;
      if (activeDb) {
        try {
          activeDb.close();
        } catch (e) {
          console.error("Failed to close SQLite db", e);
        }
      }
    };
  }, [caseDef]);

  const handleRunQuery = () => {
    if (!db) return;
    setError(null);
    setResults(null);
    const t0 = performance.now();
    try {
      const res = db.exec(query);
      if (res && res.length > 0) {
        setResults(res[0]);
        // Case Engine: a successful query against a mission table counts as evidence
        const missions = caseDef?.sqlMissions || [];
        for (const mission of missions) {
          if (mission.match.test(query)) recordEvidence(mission.id);
        }
      } else {
        setResults({ columns: [], values: [] });
      }
    } catch (e) {
      setError(e.message);
    }
    const t1 = performance.now();
    setQueryTime((t1 - t0).toFixed(2));
  };

  return (
    <div style={{ flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: c.bg, color: c.text, fontFamily: 'monospace' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', backgroundColor: c.panel, borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', color: c.title }}>NovaData SQL Console</h1>
          <div style={{ fontSize: '12px', color: c.dim, marginTop: '4px' }}>
            {isInitializing ? "Booting WebAssembly Engine..." : "Engine: SQLite3 (WebAssembly)"} | Tables: retention_cohorts, checkout_metrics, email_metrics, users, rides, payments
          </div>
        </div>
        <button 
          onClick={handleRunQuery}
          disabled={isInitializing}
          style={{
            backgroundColor: c.buttonBg, color: 'white', border: 'none', borderRadius: '6px', 
            padding: '8px 16px', fontWeight: 'bold', cursor: isInitializing ? 'wait' : 'pointer',
            opacity: isInitializing ? 0.5 : 1
          }}
        >
          ▶ Run Query (Cmd+Enter)
        </button>
      </div>

      {/* Case missions */}
      <div style={{ display: 'flex', gap: '16px', padding: '10px 24px', backgroundColor: c.bg, borderBottom: `1px solid ${c.border}`, fontSize: '12px' }}>
        {(caseDef?.sqlMissions || []).map((m) => {
          const done = caseState.evidence[m.id];
          return (
            <div key={m.id} title={m.hint} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: done ? c.missionDone : c.dim }}>
              <span>{done ? '✓' : '○'}</span>
              <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{m.label}</span>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Editor Pane */}
        <div style={{ width: '50%', borderRight: `1px solid ${c.border}` }}>
          <Editor
            height="100%"
            defaultLanguage="sql"
            theme={dark ? "vs-dark" : "light"}
            value={query}
            onChange={(val) => setQuery(val)}
            options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 16 } }}
          />
        </div>

        {/* Results Pane */}
        <div style={{ width: '50%', padding: '16px', overflow: 'auto', backgroundColor: c.bg }}>
          <div style={{ fontSize: '12px', color: c.dim, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Query Results
          </div>
          
          {error && (
            <div style={{ backgroundColor: c.errorBg, border: `1px solid ${c.errorBorder}`, color: c.errorText, padding: '16px', borderRadius: '6px' }}>
              <strong>SQL Error:</strong> {error}
            </div>
          )}

          {!error && results && results.values.length > 0 && (
            <>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr>
                    {results.columns.map((col, i) => (
                      <th key={i} style={{ borderBottom: `1px solid ${c.border}`, padding: '8px', textAlign: 'left', color: c.dim }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.values.map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${c.tableBorder}` }}>
                      {row.map((val, j) => (
                        <td key={j} style={{ padding: '8px' }}>
                          {val !== null ? val.toString() : <span style={{color: c.dim}}>NULL</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: '16px', fontSize: '12px', color: c.dim }}>
                {results.values.length} rows returned in {queryTime}ms.
              </div>
            </>
          )}

          {!error && results && results.values.length === 0 && (
            <div style={{ color: c.dim }}>0 rows returned in {queryTime}ms.</div>
          )}
        </div>
      </div>
    </div>
  );
}
