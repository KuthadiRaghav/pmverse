import React from 'react';
import { useTokens, ACCENT } from '../theme';
import { useCase } from '../case/CaseContext';
import { useAuth } from '../auth/AuthContext';
import { CheckCircle2, Play, BookOpen, Terminal, Database, MessageSquare, ListTodo, Map, Trophy } from 'lucide-react';
import heroImage from '../assets/readme_hero.jpg';

export const ONBOARD_KEY = 'pmverse_onboarded_v1';

export default function Readme() {
  const t = useTokens();
  const { openApp } = useCase();
  const { currentUser } = useAuth();
  
  const handleStart = () => {
    try { 
      if (currentUser) {
        localStorage.setItem(`${ONBOARD_KEY}_${currentUser.uid}`, '1'); 
      }
    } catch { /* session-only */ }
    openApp('win-mail');
  };

  const appIconStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: '32px', height: '32px', borderRadius: '8px', 
    backgroundColor: t.bg === '#0d1117' ? '#21262d' : '#f3f4f6',
    color: ACCENT, flexShrink: 0
  };

  return (
    <div style={{
      width: '100%', height: '100%', 
      overflowY: 'auto',
      backgroundColor: t.bg,
      color: t.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      padding: '40px',
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '750px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: '0 0 12px 0', letterSpacing: '-0.5px' }}>
            PMverse OS User Guide
          </h1>
          <p style={{ fontSize: '16px', color: t.dim, lineHeight: 1.6, margin: 0 }}>
            Welcome to PMverse. This operating system is your virtual workspace for navigating complex product challenges. Before you clock in, review this manual to understand your toolset and the core workflow.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
          <button 
            onClick={handleStart}
            style={{
              padding: '12px 24px', borderRadius: '8px', border: 'none',
              background: '#10b981', color: '#fff',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
            }}
          >
            <Play size={16} fill="currentColor" /> Clock in — Open NovaMail
          </button>
          
          <button 
            onClick={() => openApp('win-drive')}
            style={{
              padding: '12px 24px', borderRadius: '8px', 
              border: `1px solid ${t.border}`, background: 'transparent', color: t.text,
              fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}
          >
            <BookOpen size={16} /> Open Company Drive
          </button>
        </div>

        {/* Hero Image */}
        <div style={{
          width: '100%', borderRadius: '16px', overflow: 'hidden',
          border: `1px solid ${t.border}`, marginBottom: '40px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.1)'
        }}>
          <img src={heroImage} alt="PMverse Hero" style={{ width: '100%', display: 'block' }} />
        </div>

        <div style={{ height: '1px', backgroundColor: t.border, marginBottom: '40px' }} />

        {/* Core Loop Section */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 20px 0' }}>The Core Workflow</h2>
          <p style={{ fontSize: '15px', color: t.text, lineHeight: 1.6, margin: '0 0 24px 0' }}>
            As a Product Manager, your work is cyclical. You will progress through cases by following these phases:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: `1px solid ${t.border}`, backgroundColor: t.bg === '#0d1117' ? '#161b22' : '#ffffff' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: t.dim }}>01</div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0' }}>The Inbox</h3>
                <p style={{ fontSize: '14px', color: t.dim, margin: 0, lineHeight: 1.5 }}>Every case starts with a trigger in NovaMail. Read carefully to understand the context, constraints, and demands of your stakeholders.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: `1px solid ${t.border}`, backgroundColor: t.bg === '#0d1117' ? '#161b22' : '#ffffff' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: t.dim }}>02</div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0' }}>The Investigation</h3>
                <p style={{ fontSize: '14px', color: t.dim, margin: 0, lineHeight: 1.5 }}>Don't take demands at face value. Open NovaData SQL to query user event logs, check financial viability in NovaSheets, or interview your team in the Decision Center.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px', padding: '16px', borderRadius: '12px', border: `1px solid ${t.border}`, backgroundColor: t.bg === '#0d1117' ? '#161b22' : '#ffffff' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: t.dim }}>03</div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0' }}>The Decision</h3>
                <p style={{ fontSize: '14px', color: t.dim, margin: 0, lineHeight: 1.5 }}>Return to the original NovaMail thread to officially commit to a decision. You will be asked to back up your choice with the exact evidence you uncovered during your investigation.</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', backgroundColor: t.border, marginBottom: '40px' }} />

        {/* App Directory Section */}
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: '0 0 20px 0' }}>System App Directory</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ padding: '20px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={appIconStyle}><Database size={18} /></div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>NovaData SQL</h3>
              </div>
              <p style={{ fontSize: '13px', color: t.dim, margin: 0, lineHeight: 1.5 }}>
                Your portal into the company's live production database. Use this to write SQL queries against user tables, payment logs, and event streams. If a stakeholder claims a feature is failing, verify the raw numbers here first.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={appIconStyle}><MessageSquare size={18} /></div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Decision Center</h3>
              </div>
              <p style={{ fontSize: '13px', color: t.dim, margin: 0, lineHeight: 1.5 }}>
                The company's internal messaging platform. Use this app to conduct qualitative interviews with AI stakeholders, negotiate engineering capacity, and uncover context that isn't captured in the SQL database.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={appIconStyle}><ListTodo size={18} /></div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Sprint Board</h3>
              </div>
              <p style={{ fontSize: '13px', color: t.dim, margin: 0, lineHeight: 1.5 }}>
                The engineering team's task management system. Drag and drop tickets to prioritize work based on available capacity. You can also click on tickets to write detailed Product Requirement Documents (PRDs).
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={appIconStyle}><Terminal size={18} /></div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>NovaCode IDE</h3>
              </div>
              <p style={{ fontSize: '13px', color: t.dim, margin: 0, lineHeight: 1.5 }}>
                A fully functioning terminal and coding environment. For technical cases, you may be required to run scripts, analyze API payloads, or fix bugs directly in the environment to unblock the engineering team.
              </p>
            </div>
            
            <div style={{ padding: '20px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={appIconStyle}><Map size={18} /></div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>Portfolio Map</h3>
              </div>
              <p style={{ fontSize: '13px', color: t.dim, margin: 0, lineHeight: 1.5 }}>
                A visual scatter plot for high-level strategic planning. Use this when you need to evaluate multiple roadmap initiatives by weighing their expected Impact against their anticipated Effort.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '12px', border: `1px solid ${t.border}` }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={appIconStyle}><Trophy size={18} /></div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, margin: 0 }}>NovaRank Leaderboard</h3>
              </div>
              <p style={{ fontSize: '13px', color: t.dim, margin: 0, lineHeight: 1.5 }}>
                The global PMverse leaderboard. Ranks are based on evidence gathered, models built, and decisions made across various dimensions like Analytics, Strategy, and Leadership.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '40px', padding: '24px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <CheckCircle2 size={24} color="#10b981" style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 8px 0', color: t.text }}>Ready to begin?</h3>
            <p style={{ fontSize: '14px', color: t.dim, margin: 0, lineHeight: 1.5 }}>
              Your career starts now. Click the 'Clock In' button at the top of this guide or open NovaMail from the taskbar to read your first assignment.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
