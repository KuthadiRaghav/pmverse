import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTokens, ACCENT } from '../theme';
import { useTheme } from '../ThemeContext';
import { useCase } from '../case/CaseContext';
import { useAuth } from '../auth/AuthContext';
import { interviewedIds } from '../case/engine';
import { getStreak, completedSkills } from '../academyProgress';
import { 
  CheckCircle2, Circle, Mail, MessageSquare, GraduationCap, 
  LineChart, Database, User, Play, Search, Bell, Moon, Sun, 
  Trophy, Flame, Target, Calendar as CalendarIcon, ChevronRight
} from 'lucide-react';

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30_000); // update every 30s
    return () => clearInterval(t);
  }, []);
  return now;
}

function timeGreeting(hour) {
  if (hour < 5) return 'Burning the midnight oil';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Working late';
}

const CONTAINER_VARIANTS = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const CHILD = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 24, stiffness: 260 } },
};

// SVG background wave for the header
const HeaderWave = () => (
  <svg 
    style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', zIndex: 0, opacity: 0.5, pointerEvents: 'none' }} 
    viewBox="0 0 1000 300" preserveAspectRatio="none"
  >
    <path fill="url(#grad1)" d="M0,150 C300,300 700,0 1000,150 L1000,0 L0,0 Z" />
    <path fill="url(#grad2)" d="M0,200 C400,350 800,-50 1000,200 L1000,0 L0,0 Z" opacity="0.5" />
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(139, 92, 246, 0.15)" />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="100%" stopColor="rgba(217, 70, 239, 0.1)" />
      </linearGradient>
    </defs>
  </svg>
);

const DashboardStyles = () => (
  <style>{`
    .pmverse-dashboard-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.2fr) 340px 320px;
      gap: 24px;
    }
    .pmverse-dashboard-col3 {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    @media (max-width: 1250px) {
      .pmverse-dashboard-grid {
        grid-template-columns: minmax(0, 1fr) 340px;
      }
      .pmverse-dashboard-col3 {
        grid-column: span 2;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
    
    @media (max-width: 950px) {
      .pmverse-dashboard-grid {
        grid-template-columns: 1fr;
      }
      .pmverse-dashboard-col3 {
        grid-column: span 1;
        grid-template-columns: 1fr;
      }
    }
  `}</style>
);

export default function HomeSurface() {
  const t = useTokens();
  const { theme, toggleTheme } = useTheme();
  const {
    caseDef, state, unreadCount, unreadChatCount,
    rank, totalXP, openApp, caseList, states,
  } = useCase();
  const { currentUser } = useAuth();
  const clock = useClock();
  const streak = getStreak();
  const skillsDone = completedSkills().length;

  const isDark = theme === 'dark';

  // ----- derive the player's live progress -----
  const accepted = state.stage !== 'arrival';
  const interviewed = interviewedIds(caseDef, state).length > 0;
  const usedData = Object.values(state.evidence).some(Boolean);
  const decided = !!state.decision;
  const casesCompleted = caseList.filter(c => !!states[c.meta.id].decision).length;

  const steps = useMemo(() => [
    { done: true,         label: `Enter ${caseDef.meta.company}`,            hint: "You're in. Welcome, PM.",                   app: null },
    { done: accepted,     label: 'Read your first email & accept the case',  hint: 'Maya, your CEO, is waiting.',                app: 'win-mail' },
    { done: interviewed,  label: 'Interview a stakeholder',                  hint: 'Ask Dev or Sara what they know.',            app: 'win-decide' },
    { done: usedData,     label: 'Investigate the data room',                hint: 'The truth is in the numbers.',               app: 'win-sql' },
    { done: decided,      label: 'Commit a decision & face the outcome',     hint: 'Place your bet. Own it.',                    app: 'win-mail' },
  ], [caseDef, accepted, interviewed, usedData, decided]);

  const nextStep = steps.find((s) => !s.done);
  const doneCount = steps.filter((s) => s.done).length;

  const formatTime = (d) => {
    const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const parts = timeStr.split(' ');
    return { time: parts[0], ampm: parts[1] };
  };
  const { time, ampm } = formatTime(clock);
  const formatDate = (d) => d.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long' });

  const quickLaunch = [
    { icon: <Mail size={20} color="#fff" />,          title: 'NovaMail',    sub: 'Your case inbox',              app: 'win-mail',      badge: unreadCount,    color: 'linear-gradient(135deg, #8b5cf6, #d946ef)' },
    { icon: <MessageSquare size={20} color="#fff" />, title: 'NovaChat',    sub: 'Slack-like channels',          app: 'win-chat',      badge: unreadChatCount, color: 'linear-gradient(135deg, #ec4899, #be185d)' },
    { icon: <GraduationCap size={20} color="#fff" />, title: 'PM Academy',  sub: `${skillsDone} skills done`,    app: 'win-academy',   badge: 0,              color: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' },
    { icon: <LineChart size={20} color="#fff" />,     title: 'NovaSheets',  sub: 'Impact & unit economics',      app: 'win-sheets',    badge: 0,              color: 'linear-gradient(135deg, #10b981, #059669)' },
    { icon: <Database size={20} color="#fff" />,      title: 'NovaData',    sub: 'SQL data exploration',         app: 'win-sql',       badge: 0,              color: 'linear-gradient(135deg, #14b8a6, #0d9488)' },
    { icon: <User size={20} color="#fff" />,          title: 'Career',      sub: 'Rank & daily challenge',       app: 'win-career',    badge: 0,              color: 'linear-gradient(135deg, #f97316, #c2410c)' },
    { icon: <Globe size={20} color="#fff" />,         title: 'Community',   sub: 'Play custom cases',            app: 'win-community', badge: 0,              color: 'linear-gradient(135deg, #10b981, #059669)' },
  ];

  const cardStyle = {
    backgroundColor: isDark ? 'rgba(22,27,34,0.6)' : '#ffffff',
    border: `1px solid ${t.border}`,
    borderRadius: '16px',
    boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.03)',
    backdropFilter: isDark ? 'blur(16px)' : 'none',
  };

  const progressPercent = Math.round((doneCount / steps.length) * 100);
  const nextXpMilestone = 50;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      padding: '32px 40px',
      overflowY: 'auto', pointerEvents: 'auto',
    }}>
      <DashboardStyles />
      <HeaderWave />
      
      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}
      >
        {/* Greeting */}
        <motion.div variants={CHILD} style={{ marginBottom: '32px', marginTop: '16px' }}>
          <div style={{ fontSize: '28px', fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>
            {timeGreeting(clock.getHours())}, {currentUser?.displayName?.split(' ')[0] || 'Alex'}.
          </div>
          <div style={{ fontSize: '15px', color: t.dim, marginTop: '8px', fontWeight: 500 }}>
            {decided
              ? 'Case closed. Start a new one, sharpen skills in the Academy, or review your portfolio.'
              : <>Active case: <span style={{ fontWeight: 600, color: ACCENT }}>{caseDef.meta.title}</span> at {caseDef.meta.company}.</>}
          </div>
        </motion.div>

        {/* ── 3-Column Dashboard Grid ────────────────────────────── */}
        <div className="pmverse-dashboard-grid">
          
          {/* ── COLUMN 1: Next Move & Checklist ──────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Next Move Hero Card */}
            <motion.div variants={CHILD} style={{
              ...cardStyle,
              padding: '24px',
              border: `1px solid ${isDark ? 'rgba(137,87,229,0.3)' : '#e9d5ff'}`,
              backgroundColor: isDark ? 'rgba(137,87,229,0.05)' : '#faf5ff',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden'
            }}>
              {/* Soft purple glow inside card */}
              <div style={{
                position: 'absolute', top: '-50%', left: '-10%', width: '150%', height: '200%',
                background: 'radial-gradient(circle, rgba(137,87,229,0.08) 0%, transparent 60%)',
                pointerEvents: 'none'
              }} />

              {nextStep ? (
                <>
                  <div style={{ zIndex: 1, paddingRight: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: ACCENT, letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>
                      Your Next Move · Step {doneCount + 1} of {steps.length}
                    </div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: t.text, marginBottom: '6px' }}>
                      {nextStep.label}
                    </div>
                    <div style={{ fontSize: '14px', color: t.dim }}>
                      {nextStep.hint}
                    </div>
                  </div>
                  {nextStep.app && (
                    <button
                      onClick={() => openApp(nextStep.app)}
                      style={{
                        zIndex: 1, flexShrink: 0,
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                        background: ACCENT, color: '#fff',
                        fontSize: '14px', fontWeight: 700,
                        boxShadow: '0 4px 12px rgba(137,87,229,0.3)',
                        transition: 'transform 0.1s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
                    >
                      <Play fill="currentColor" size={14} /> Open App
                    </button>
                  )}
                </>
              ) : (
                <div style={{ zIndex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <CheckCircle2 size={36} color={t.good} />
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: t.text }}>Core loop complete!</div>
                    <div style={{ fontSize: '14px', color: t.dim }}>Great work.</div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Checklist */}
            <motion.div variants={CHILD} style={{ ...cardStyle, padding: '24px', flex: 1 }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: t.text, marginBottom: '20px' }}>
                Your Progress
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {steps.map((step, i) => {
                  const active = !step.done && step === nextStep;
                  return (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      padding: '14px 16px', borderRadius: '12px',
                      backgroundColor: active ? (isDark ? 'rgba(137,87,229,0.08)' : '#f9f5ff') : 'transparent',
                      border: `1px solid ${active ? (isDark ? 'rgba(137,87,229,0.2)' : '#e9d5ff') : 'transparent'}`,
                      cursor: step.app && !step.done ? 'pointer' : 'default',
                    }} onClick={() => step.app && !step.done && openApp(step.app)}>
                      {step.done ? (
                        <CheckCircle2 size={20} color={t.good} strokeWidth={2.5} />
                      ) : (
                        <Circle size={20} color={active ? ACCENT : t.border} strokeWidth={2} />
                      )}

                      <div style={{ flex: 1, fontSize: '14px', fontWeight: active ? 700 : 500, color: step.done ? t.dim : t.text }}>
                        {step.label}
                      </div>

                      {active && <div style={{ fontSize: '11px', fontWeight: 700, color: ACCENT, backgroundColor: isDark ? 'rgba(137,87,229,0.2)' : '#f3e8ff', padding: '4px 8px', borderRadius: '8px' }}>Current</div>}
                      {step.app && !step.done && <ChevronRight size={16} color={t.dim} />}
                    </div>
                  );
                })}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', paddingTop: '16px', borderTop: `1px solid ${t.border}` }}>
                <button style={{ background: 'none', border: 'none', color: ACCENT, fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  View full journey <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>

          {/* ── COLUMN 2: Jump Back In ──────────────────────────── */}
          <motion.div variants={CHILD} style={{ ...cardStyle, padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '16px', fontWeight: 700, color: t.text }}>Jump back in</div>
              <button style={{ background: 'none', border: 'none', color: ACCENT, fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}>View all</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {quickLaunch.map((q) => (
                <button
                  key={q.title}
                  onClick={() => openApp(q.app)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left',
                    padding: '12px', borderRadius: '12px', cursor: 'pointer',
                    backgroundColor: isDark ? '#21262d' : '#f9fafb',
                    border: `1px solid ${t.border}`, color: t.text,
                    transition: 'all 0.15s ease',
                  }}
                  onMouseOver={(e) => { 
                    e.currentTarget.style.borderColor = ACCENT;
                    e.currentTarget.style.backgroundColor = isDark ? '#282e36' : '#ffffff';
                  }}
                  onMouseOut={(e) => { 
                    e.currentTarget.style.borderColor = t.border;
                    e.currentTarget.style.backgroundColor = isDark ? '#21262d' : '#f9fafb';
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: q.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {q.icon}
                  </div>
                  <span style={{ minWidth: 0, flex: 1 }}>
                    <span style={{ display: 'block', fontSize: '14px', fontWeight: 700 }}>{q.title}</span>
                    <span style={{ display: 'block', fontSize: '12px', color: t.dim, marginTop: '2px' }}>{q.sub}</span>
                  </span>
                  {q.badge > 0 && (
                    <span style={{
                      minWidth: '20px', height: '20px', padding: '0 6px', borderRadius: '10px',
                      backgroundColor: '#ef4444', color: '#fff', fontSize: '11px', fontWeight: 800,
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>{q.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── COLUMN 3: Right Sidebar Cards ───────────────────── */}
          <div className="pmverse-dashboard-col3">
            
            {/* Daily Focus */}
            <motion.div variants={CHILD} style={{
              borderRadius: '20px', padding: '24px',
              background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
              color: '#fff', position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontWeight: 700 }}>
                <Target size={18} /> Daily Focus
              </div>
              <div style={{ fontSize: '13px', lineHeight: 1.4, color: 'rgba(255,255,255,0.8)' }}>
                Complete your next move to keep the streak alive.
              </div>
              
              {/* Circular Progress (mocked visually) */}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', marginBottom: '16px' }}>
                <div style={{
                  width: '90px', height: '90px', borderRadius: '45px',
                  border: '6px solid rgba(255,255,255,0.2)',
                  borderTopColor: '#fff', borderRightColor: '#fff',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  transform: 'rotate(-45deg)'
                }}>
                  <div style={{ transform: 'rotate(45deg)', textAlign: 'center' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800 }}>{progressPercent}%</div>
                    <div style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>Progress</div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontWeight: 500 }}>
                {doneCount} of {steps.length} tasks today
              </div>
            </motion.div>

            {/* XP & Streak */}
            <motion.div variants={CHILD} style={{ ...cardStyle, padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '15px', fontWeight: 700, color: t.text }}>XP & Streak</div>
                <button style={{ background: 'none', border: 'none', color: ACCENT, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>View all</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: t.text }}>{totalXP}</div>
                  <div style={{ fontSize: '11px', color: t.dim, fontWeight: 600 }}>Total XP</div>
                </div>
                <div style={{ width: '1px', height: '30px', backgroundColor: t.border }} />
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '22px', fontWeight: 800, color: '#d97706' }}>{streak}</div>
                  <div style={{ fontSize: '11px', color: t.dim, fontWeight: 600 }}>Day Streak</div>
                </div>
                <div style={{ width: '36px', height: '36px', borderRadius: '18px', backgroundColor: isDark ? 'rgba(245,158,11,0.1)' : '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Flame size={16} color="#d97706" />
                </div>
              </div>
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: t.dim, marginBottom: '6px', fontWeight: 600 }}>
                  <span>Next milestone: {nextXpMilestone} XP</span>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: isDark ? '#21262d' : '#f3f4f6' }}>
                  <div style={{ width: `${Math.min((totalXP / nextXpMilestone) * 100, 100)}%`, height: '100%', borderRadius: '3px', backgroundColor: ACCENT }} />
                </div>
              </div>
            </motion.div>

            {/* Upcoming Calendar (Mock) */}
            <motion.div variants={CHILD} style={{ ...cardStyle, padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: t.text }}>
                  <CalendarIcon size={16} color={t.dim} /> Upcoming
                </div>
                <button style={{ background: 'none', border: 'none', color: ACCENT, fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>View all</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ marginTop: '6px', width: '6px', height: '6px', borderRadius: '3px', backgroundColor: ACCENT }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>Sprint Review</div>
                    <div style={{ fontSize: '12px', color: t.dim, marginTop: '2px' }}>Today, 4:00 PM</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ marginTop: '6px', width: '6px', height: '6px', borderRadius: '3px', backgroundColor: '#d97706' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>Stakeholder Sync</div>
                    <div style={{ fontSize: '12px', color: t.dim, marginTop: '2px' }}>Mon, 6 July • 11:00 AM</div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
