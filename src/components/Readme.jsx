import React from 'react';
import { useTokens, ACCENT } from '../theme';
import { useCase } from '../case/CaseContext';
import { CheckCircle2, Play, BookOpen } from 'lucide-react';
import heroImage from '../assets/readme_hero.jpg';

export const ONBOARD_KEY = 'pmverse_onboarded_v1';

export default function Readme() {
  const t = useTokens();
  const { openApp } = useCase();

  const handleStart = () => {
    try { localStorage.setItem(ONBOARD_KEY, '1'); } catch { /* session-only */ }
    openApp('win-mail');
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
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '8px',
            background: `linear-gradient(135deg, ${ACCENT}, #d946ef)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: '20px'
          }}>
            PM
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
            PMverse
          </h1>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 700, marginTop: 0, marginBottom: '16px' }}>
          The OS Simulator for Product Managers
        </h2>
        
        <p style={{ fontSize: '15px', color: t.dim, lineHeight: 1.6, marginBottom: '24px' }}>
          Product development used to mean reading case studies, taking multiple-choice quizzes, 
          and listening to lectures. 
          <br /><br />
          PMverse is the only platform that acts like a real operating system, throwing you into 
          the deep end of a chaotic startup where you have to investigate data, interview stakeholders, 
          and make the hard calls—<i>autonomously</i>.
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
          <button 
            onClick={handleStart}
            style={{
              padding: '12px 24px', borderRadius: '8px', border: 'none',
              background: '#f59e0b', color: '#fff',
              fontSize: '14px', fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
            }}
          >
            <Play size={16} fill="currentColor" /> Clock in — Read your first email
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

        {/* Features Section */}
        <div style={{
          padding: '32px', borderRadius: '16px',
          border: `2px solid ${ACCENT}`,
          backgroundColor: t.bg === '#0d1117' ? 'rgba(137,87,229,0.05)' : 'rgba(137,87,229,0.02)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 700, marginTop: 0, marginBottom: '16px' }}>
            Build better products with better decisions
          </h3>
          <p style={{ fontSize: '14px', color: t.dim, lineHeight: 1.6, marginBottom: '24px' }}>
            Not your mama's product course. Real data is imported into NovaData SQL and lives as a first-class citizen. 
            This means you can query raw event logs <i>and</i> user attributes, leading to more informed decisions.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: t.text, marginBottom: '12px', borderBottom: `1px solid ${t.border}`, paddingBottom: '8px' }}>
                Investigate
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: t.dim }}>
                  <CheckCircle2 size={14} color="#10b981" /> Query raw SQL data
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: t.dim }}>
                  <CheckCircle2 size={14} color="#3b82f6" /> Interview AI stakeholders
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: t.dim }}>
                  <CheckCircle2 size={14} color="#f59e0b" /> Build revenue models
                </li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: 700, color: t.text, marginBottom: '12px', borderBottom: `1px solid ${t.border}`, paddingBottom: '8px' }}>
                Execute
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: t.dim }}>
                  <CheckCircle2 size={14} color="#ef4444" /> Commit to a decision
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: t.dim }}>
                  <CheckCircle2 size={14} color="#a855f7" /> Manage the fallout
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: t.dim }}>
                  <CheckCircle2 size={14} color="#6366f1" /> Build your PM portfolio
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
