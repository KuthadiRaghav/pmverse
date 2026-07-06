import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTokens } from '../theme';

export default function Onboarding({ onComplete }) {
  const c = useTokens();
  const [step, setStep] = useState(0); // 0: Intake, 1: Boot, 2: Welcome
  const [level, setLevel] = useState('');
  const [bootText, setBootText] = useState('INITIALIZING SYSTEM KERNEL...');

  useEffect(() => {
    if (step === 1) {
      const msgs = [
        "Connecting to corporate intranet...",
        "Provisioning workspace...",
        "Loading NovaMail..."
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < msgs.length) {
          setBootText(msgs[i]);
          i++;
        }
      }, 700);

      const t = setTimeout(() => setStep(2), 3000);
      return () => { clearInterval(interval); clearTimeout(t); };
    }
  }, [step]);

  const handleSelectLevel = (selectedLevel) => {
    localStorage.setItem('pmverse_level', selectedLevel);
    setLevel(selectedLevel);
    setStep(1); // Move to Boot sequence
  };

  const handleFinish = () => {
    onComplete();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'auto' }}>
      <AnimatePresence>
        {/* Step 0: Intake */}
        {step === 0 && (
          <motion.div
            key="intake"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ position: 'absolute', inset: 0, backgroundColor: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <div style={{ width: '420px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'rgba(137,87,229,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span style={{ fontSize: '32px' }}>🎯</span>
              </div>
              <h1 style={{ margin: '0 0 12px', fontSize: '28px', fontWeight: 800, color: c.text }}>Before we begin...</h1>
              <p style={{ margin: '0 0 32px', fontSize: '15px', lineHeight: 1.6, color: c.dim }}>
                What is your current Product Management experience level? We'll tailor your first case accordingly.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Aspiring PM', 'Mid-level PM', 'Senior / Product Leader'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => handleSelectLevel(lvl)}
                    style={{ 
                      width: '100%', padding: '16px', borderRadius: '12px', border: `1px solid ${c.border}`, 
                      backgroundColor: c.panel, color: c.text, fontSize: '15px', fontWeight: 600, 
                      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.backgroundColor = 'rgba(137,87,229,0.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.backgroundColor = c.panel; }}
                  >
                    {lvl} <span>→</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1: Boot Sequence */}
        {step === 1 && (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
              {bootText}
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Welcome / VP Message */}
        {step === 2 && (
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
              <h1 style={{ margin: '0 0 12px', fontSize: '24px', fontWeight: 700, color: c.text }}>Welcome to your first day.</h1>
              <p style={{ margin: '0 0 24px', fontSize: '15px', lineHeight: 1.6, color: c.dim }}>
                {level === 'Senior / Product Leader' ? (
                  <>We need your expertise immediately. Stakeholders are already escalating issues to your inbox in <strong>NovaMail</strong>. Review the data and make the call.</>
                ) : level === 'Mid-level PM' ? (
                  <>Ready to hit the ground running? Your team is waiting for direction. Check <strong>NovaMail</strong> for your first assignment—it's time to investigate.</>
                ) : (
                  <>We throw our new PMs right into the fire here. Your first real-world case study is waiting in <strong>NovaMail</strong>. It's up to you to investigate and decide the fate of the product.</>
                )}
              </p>
              <button
                onClick={handleFinish}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: c.accent, color: '#fff', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}
              >
                Boot Workspace
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
