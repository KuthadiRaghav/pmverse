import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTokens, ACCENT } from '../theme';
import { useCase } from '../case/CaseContext';

// First-run "clock in" overlay: not a feature tour — a first day at work.
// Shown once (localStorage flag), ends by opening NovaMail on Maya's email.

export const ONBOARD_KEY = 'pmverse_onboarded_v1';

const STEPS = [
  {
    icon: '📥',
    title: 'Work arrives in NovaMail',
    body: "Your CEO has already written to you. There's a fire, a deadline, and everyone has a theory.",
  },
  {
    icon: '🗄️',
    title: 'Investigate with real tools',
    body: 'Query the data in SQL, interview AI stakeholders, model the numbers — the answer is in there, if you go looking.',
  },
  {
    icon: '⚖️',
    title: 'Decisions have consequences',
    body: 'Commit a call, watch it play out eight weeks later, get coached on your process — and build XP, rank, and a portfolio.',
  },
];

export default function Welcome({ onDone }) {
  const t = useTokens();
  const { caseDef, openApp } = useCase();
  const [hoveredStep, setHoveredStep] = useState(null);

  const finish = (openMail) => {
    try { localStorage.setItem(ONBOARD_KEY, '1'); } catch { /* session-only */ }
    onDone();
    if (openMail) openApp('win-mail');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 600,
          backgroundColor: 'rgba(1, 4, 9, 0.82)',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', damping: 26, stiffness: 300, delay: 0.1 }}
          style={{
            width: '620px', maxWidth: '100%', borderRadius: '22px', overflow: 'hidden',
            backgroundColor: t.bg,
            border: `1px solid ${t.border}`,
            boxShadow: '0 40px 100px rgba(0,0,0,0.6)',
            color: t.text,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          {/* ── Header band ────────────────────────────────── */}
          <div style={{
            padding: '32px 36px 26px',
            background: `linear-gradient(135deg, rgba(137,87,229,0.18), rgba(217,70,239,0.10))`,
            borderBottom: `1px solid ${t.border}`,
          }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '2.5px',
                color: ACCENT, marginBottom: '10px',
              }}
            >
              PMVERSE · SIMULATION ENGINE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1.25 }}
            >
              It's your first day as Senior PM at {caseDef.meta.company}.
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: '14.5px', color: t.dim, marginTop: '10px', lineHeight: 1.6,
              }}
            >
              This isn't a course. It's a job — with a company, colleagues, data, and consequences.
              You learn product management by <em style={{ fontStyle: 'italic', color: t.text }}>doing</em> it.
            </motion.div>
          </div>

          {/* ── How it works ───────────────────────────────── */}
          <div style={{ padding: '28px 36px' }}>
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.12, type: 'spring', damping: 22 }}
                onMouseOver={() => setHoveredStep(i)}
                onMouseOut={() => setHoveredStep(null)}
                style={{
                  display: 'flex', gap: '16px', marginBottom: '18px', alignItems: 'flex-start',
                  padding: '12px 14px', borderRadius: '12px',
                  backgroundColor: hoveredStep === i
                    ? (t.bg === '#0d1117' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)')
                    : 'transparent',
                  transition: 'background-color 0.2s',
                }}
              >
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  background: `linear-gradient(135deg, rgba(137,87,229,0.15), rgba(217,70,239,0.08))`,
                  border: `1px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', flexShrink: 0,
                }}>
                  {step.icon}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 700 }}>{step.title}</div>
                  <div style={{
                    fontSize: '13.5px', color: t.dim, lineHeight: 1.55, marginTop: '3px',
                  }}>
                    {step.body}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Actions ────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{
              padding: '0 36px 30px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <button
              onClick={() => finish(false)}
              style={{
                background: 'none', border: 'none', color: t.dim,
                fontSize: '13px', cursor: 'pointer', padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseOver={(e) => e.currentTarget.style.color = t.text}
              onMouseOut={(e) => e.currentTarget.style.color = t.dim}
            >
              I've been here before
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => finish(true)}
              style={{
                padding: '14px 32px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: `linear-gradient(135deg, ${ACCENT}, #d946ef)`, color: '#fff',
                fontSize: '15px', fontWeight: 800,
                boxShadow: '0 6px 24px rgba(137,87,229,0.4)',
              }}
            >
              Clock in — read your first email →
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
