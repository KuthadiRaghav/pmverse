import React, { useState } from 'react';
import Window from './Window';
import SqlConsole from './SqlConsole';

const APPS = [
  { id: 'win-sat', title: 'Growth SAT', icon: '📝', color: 'linear-gradient(135deg, #f59e0b, #d97706)', implemented: false },
  { id: 'win-academy', title: 'PM Academy', icon: '🎓', color: 'linear-gradient(135deg, #a855f7, #7e22ce)', implemented: false },
  { id: 'win-sheets', title: 'NovaSheets', icon: '📊', color: 'linear-gradient(135deg, #10b981, #047857)', implemented: false },
  { id: 'win-sql', title: 'NovaData SQL', icon: '🗄️', color: 'linear-gradient(135deg, #0ea5e9, #0369a1)', implemented: true },
  { id: 'win-sprint', title: 'Sprint Board', icon: '📋', color: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', implemented: false },
  { id: 'win-decide', title: 'Decision Center', icon: '🎯', color: 'linear-gradient(135deg, #e26d6d, #b33939)', implemented: false },
  { id: 'win-portfolio', title: 'Portfolio', icon: '📁', color: 'linear-gradient(135deg, #8b5cf6, #4c1d95)', implemented: false }
];

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState(['win-sql']);

  const toggleWindow = (id) => {
    if (openWindows.includes(id)) {
      setOpenWindows(openWindows.filter(w => w !== id));
    } else {
      setOpenWindows([...openWindows, id]);
    }
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#000', // A basic desktop background
      backgroundImage: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000000 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Render Open Windows */}
      {openWindows.map(winId => {
        const app = APPS.find(a => a.id === winId);
        
        if (winId === 'win-sql') {
          return (
            <Window key={winId} title={app.title} onClose={() => toggleWindow(winId)} initialWidth={800} initialHeight={500} x={100} y={100}>
              <SqlConsole />
            </Window>
          );
        }

        // Placeholder for unimplemented apps
        return (
          <Window key={winId} title={app.title} onClose={() => toggleWindow(winId)} initialWidth={400} initialHeight={250} x={150} y={150}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#8b949e', fontFamily: 'sans-serif', padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
              <h3 style={{ margin: '0 0 8px 0', color: '#c9d1d9' }}>Under Construction</h3>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5' }}>
                This module is currently being migrated to the V2 React Architecture.
              </p>
            </div>
          </Window>
        );
      })}

      {/* The Dock */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(22, 27, 34, 0.75)',
        backdropFilter: 'blur(10px)',
        border: '1px solid #30363d',
        borderRadius: '16px',
        padding: '8px',
        display: 'flex',
        gap: '8px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        zIndex: 100
      }}>
        {APPS.map((app, i) => (
          <React.Fragment key={app.id}>
            {/* Add separator before PM Academy */}
            {i === 1 && <div style={{ width: '1px', backgroundColor: '#30363d', margin: '0 4px' }} />}
            {/* Add separator before Decision Center */}
            {i === 5 && <div style={{ width: '1px', backgroundColor: '#30363d', margin: '0 4px' }} />}
            {/* Add separator before Portfolio */}
            {i === 6 && <div style={{ width: '1px', backgroundColor: '#30363d', margin: '0 4px' }} />}

            <button
              onClick={() => toggleWindow(app.id)}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                border: 'none',
                background: app.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                opacity: openWindows.includes(app.id) ? 1 : 0.7,
                boxShadow: openWindows.includes(app.id) ? '0 0 10px rgba(255,255,255,0.2)' : 'none'
              }}
              title={app.title}
            >
              {app.icon}
            </button>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
