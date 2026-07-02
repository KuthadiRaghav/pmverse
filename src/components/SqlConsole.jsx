import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

export default function SqlConsole() {
  const [db, setDb] = useState(null);
  const [query, setQuery] = useState("-- Welcome to NovaData SQL (Production Edition)\n-- Try running this query:\nSELECT * FROM users;");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [queryTime, setQueryTime] = useState(0);

  useEffect(() => {
    // Initialize SQLite WebAssembly Database
    initSqlJs({ locateFile: () => sqlWasmUrl }).then(SQL => {
      const database = new SQL.Database();
      
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

      setDb(database);
      setIsInitializing(false);
    }).catch(err => {
      console.error(err);
      setError("Failed to load WebAssembly SQLite Engine: " + err.message);
      setIsInitializing(false);
    });
  }, []);

  const handleRunQuery = () => {
    if (!db) return;
    setError(null);
    setResults(null);
    const t0 = performance.now();
    try {
      const res = db.exec(query);
      if (res && res.length > 0) {
        setResults(res[0]);
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#0d1117', color: '#c9d1d9', fontFamily: 'monospace' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', backgroundColor: '#161b22', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', color: '#58a6ff' }}>NovaData SQL Console</h1>
          <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>
            {isInitializing ? "Booting WebAssembly Engine..." : "Engine: SQLite3 (WebAssembly)"} | Tables: users, rides, payments
          </div>
        </div>
        <button 
          onClick={handleRunQuery}
          disabled={isInitializing}
          style={{
            backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '6px', 
            padding: '8px 16px', fontWeight: 'bold', cursor: isInitializing ? 'wait' : 'pointer',
            opacity: isInitializing ? 0.5 : 1
          }}
        >
          ▶ Run Query (Cmd+Enter)
        </button>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Editor Pane */}
        <div style={{ width: '50%', borderRight: '1px solid #30363d' }}>
          <Editor
            height="100%"
            defaultLanguage="sql"
            theme="vs-dark"
            value={query}
            onChange={(val) => setQuery(val)}
            options={{ minimap: { enabled: false }, fontSize: 14, padding: { top: 16 } }}
          />
        </div>

        {/* Results Pane */}
        <div style={{ width: '50%', padding: '16px', overflow: 'auto', backgroundColor: '#0d1117' }}>
          <div style={{ fontSize: '12px', color: '#8b949e', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Query Results
          </div>
          
          {error && (
            <div style={{ backgroundColor: 'rgba(248, 81, 73, 0.1)', border: '1px solid #f85149', color: '#f85149', padding: '16px', borderRadius: '6px' }}>
              <strong>SQL Error:</strong> {error}
            </div>
          )}

          {!error && results && results.values.length > 0 && (
            <>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr>
                    {results.columns.map((col, i) => (
                      <th key={i} style={{ borderBottom: '1px solid #30363d', padding: '8px', textAlign: 'left', color: '#8b949e' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.values.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #21262d' }}>
                      {row.map((val, j) => (
                        <td key={j} style={{ padding: '8px' }}>
                          {val !== null ? val.toString() : <span style={{color: '#8b949e'}}>NULL</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: '16px', fontSize: '12px', color: '#8b949e' }}>
                {results.values.length} rows returned in {queryTime}ms.
              </div>
            </>
          )}

          {!error && results && results.values.length === 0 && (
            <div style={{ color: '#8b949e' }}>0 rows returned in {queryTime}ms.</div>
          )}
        </div>
      </div>
    </div>
  );
}
