import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTokens } from '../theme';

export default function Onboarding({ onComplete }) {
  const c = useTokens();
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence timing
    const t1 = setTimeout(() => setStep(1), 2000); // Boot sequence -> Welcome dialog
    return () => clearTimeout(t1);
  }, []);

  const handleStart = () => {
    setStep(2); // Move to highlight step
  };

  const handleFinish = () => {
    onComplete();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: step === 2 ? 'none' : 'auto' }}>
      <AnimatePresence>
        {step === 0 && (
          <motion.div
            key="boot"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{ position: 'absolute', inset: 0, backgroundColor: '#0d1117', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ fontSize: '48px', fontWeight: 800, color: '#c9d1d9', letterSpacing: '-1px' }}
            >
              PMverse<span style={{ color: '#8957e5' }}>.OS</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ marginTop: '24px', fontSize: '13px', color: '#8b949e', fontFamily: 'monospace' }}
            >
              INITIALIZING SYSTEM KERNEL...
            </motion.div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ width: '420px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '16px', padding: '32px', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(137,87,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '24px' }}>👋</span>
              </div>
              <h1 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: 700, color: c.text }}>Welcome to PMverse</h1>
              <p style={{ margin: '0 0 24px', fontSize: '15px', lineHeight: 1.6, color: c.dim }}>
                You are about to simulate the role of a Product Manager. Your primary communication channel is <strong>NovaMail</strong>. 
                <br /><br />
                Stakeholders will send you emails with problems, data, and decisions. It's up to you to investigate and decide the fate of the product.
              </p>
              <button
                onClick={handleStart}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: c.accent, color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
              >
                Boot System
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Highlight Overlay - explicitly targets the Mail icon position */}
      {step === 2 && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', pointerEvents: 'auto' }}>
          <div style={{ position: 'absolute', top: '120px', left: '20px', width: '220px', color: '#fff' }}>
            <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '8px' }}>Open your inbox</div>
            <div style={{ fontSize: '13px', opacity: 0.8, lineHeight: 1.4 }}>You have a new message from the CEO waiting for you.</div>
            <button
              onClick={handleFinish}
              style={{ marginTop: '12px', padding: '6px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.3)', backgroundColor: 'transparent', color: '#fff', fontSize: '12px', cursor: 'pointer' }}
            >
              Got it
            </button>
          </div>
          {/* Pulsing ring around where the NovaMail icon is (assuming side="left", 2nd icon) */}
          <motion.div
            animate={{ boxShadow: ['0 0 0 0px rgba(137,87,229,0.8)', '0 0 0 20px rgba(137,87,229,0)'] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ position: 'absolute', top: '106px', left: '20px', width: '80px', height: '80px', borderRadius: '12px', border: '2px solid #8957e5', pointerEvents: 'none' }}
          />
        </div>
      )}
    </div>
  );
}
