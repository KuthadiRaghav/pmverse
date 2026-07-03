import React, { useState, useMemo } from 'react';
import { ACADEMY_DOMAINS } from '../data/academyData';
import { getMissed, recordMcq } from '../academyProgress';
import { useTokens } from '../theme';

// Growth SAT: assessment engine over the entire Academy MCQ bank.
// Two modes: a sampled timed assessment, and spaced-repetition review of
// every MCQ you've previously missed (answering correctly clears it).

function buildBank() {
  const bank = [];
  for (const dom of ACADEMY_DOMAINS) {
    for (const skill of dom.skills || []) {
      (skill.lessons || []).forEach((lesson, lessonIdx) => {
        if (lesson.type === 'mcq') {
          bank.push({ domain: dom.title, skillId: skill.id, skillTitle: skill.title, lessonIdx, lesson });
        }
      });
    }
  }
  return bank;
}

function sample(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

export default function GrowthSAT() {
  const c = useTokens();
  const bank = useMemo(buildBank, []);
  const [mode, setMode] = useState(null); // null | 'assessment' | 'review'
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const missedRefs = getMissed();
  const missedQuestions = missedRefs
    .map((ref) => bank.find((b) => b.skillId === ref.skillId && b.lessonIdx === ref.lessonIdx))
    .filter(Boolean);

  const start = (m) => {
    const qs = m === 'assessment' ? sample(bank, Math.min(10, bank.length)) : [...missedQuestions];
    setMode(m);
    setQuestions(qs);
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  const answer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const q = questions[currentQ];
    const correct = !!q.lesson.options[idx].correct;
    if (correct) setScore((s) => s + 1);
    // Feed the spaced-repetition pool in both modes
    recordMcq(q.skillId, q.lessonIdx, correct);
  };

  const next = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  // ---------- menu ----------
  if (!mode) {
    return (
      <div style={{ height: '100%', backgroundColor: c.bg, color: c.text, padding: '36px', boxSizing: 'border-box', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', overflowY: 'auto' }}>
        <h2 style={{ margin: '0 0 6px' }}>📝 PM Assessment Center</h2>
        <p style={{ color: c.dim, fontSize: '14px', margin: '0 0 28px' }}>
          Question bank: <b style={{ color: c.text }}>{bank.length}</b> scenario questions across the entire Academy.
        </p>
        <div style={{ display: 'grid', gap: '14px', maxWidth: '520px' }}>
          <button onClick={() => start('assessment')} style={cardBtn(c)}>
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>🎯 Timed Assessment</div>
            <div style={{ fontSize: '13px', color: c.dim }}>10 questions sampled across every domain. Instant feedback, final score.</div>
          </button>
          <button
            onClick={() => missedQuestions.length && start('review')}
            disabled={!missedQuestions.length}
            style={{ ...cardBtn(c), opacity: missedQuestions.length ? 1 : 0.5, cursor: missedQuestions.length ? 'pointer' : 'not-allowed' }}
          >
            <div style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px' }}>♻️ Review Missed ({missedQuestions.length})</div>
            <div style={{ fontSize: '13px', color: c.dim }}>
              {missedQuestions.length
                ? 'Every question you\'ve missed in the Academy or here. Answer correctly to clear it from the pool.'
                : 'Nothing to review — miss a question anywhere and it lands here.'}
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ---------- results ----------
  if (finished) {
    const pct = questions.length ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div style={{ height: '100%', backgroundColor: c.bg, color: c.text, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <div style={{ fontSize: '56px', marginBottom: '12px' }}>{pct >= 70 ? '🎉' : '📚'}</div>
        <h2 style={{ margin: '0 0 6px' }}>{mode === 'review' ? 'Review complete' : 'Assessment complete'}</h2>
        <p style={{ fontSize: '22px', margin: '0 0 8px' }}>{score} / {questions.length} ({pct}%)</p>
        <p style={{ fontSize: '13px', color: c.dim, margin: '0 0 24px' }}>
          {mode === 'review'
            ? 'Correct answers were cleared from your review pool.'
            : pct >= 70 ? 'Solid. Missed questions were added to your review pool.' : 'Missed questions were added to your review pool — run Review Missed next.'}
        </p>
        <button onClick={() => setMode(null)} style={{ padding: '11px 26px', backgroundColor: c.accent, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
          Back to menu
        </button>
      </div>
    );
  }

  // ---------- question ----------
  const q = questions[currentQ];
  if (!q) return null;
  return (
    <div style={{ height: '100%', backgroundColor: c.bg, color: c.text, display: 'flex', flexDirection: 'column', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ padding: '16px 24px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontWeight: 700 }}>{mode === 'review' ? '♻️ Review Missed' : '🎯 Timed Assessment'}</div>
          <div style={{ fontSize: '11.5px', color: c.dim, marginTop: '2px' }}>{q.domain} · {q.skillTitle}</div>
        </div>
        <span style={{ fontWeight: 700, color: c.accent, fontSize: '13px' }}>{currentQ + 1} / {questions.length}</span>
      </div>

      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '17px', lineHeight: 1.5, marginTop: 0, marginBottom: '20px' }}>{q.lesson.prompt}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {q.lesson.options.map((opt, idx) => {
            const showCorrect = answered && opt.correct;
            const showWrong = answered && selected === idx && !opt.correct;
            return (
              <button
                key={idx}
                onClick={() => answer(idx)}
                style={{
                  textAlign: 'left', padding: '14px 16px', borderRadius: '8px',
                  backgroundColor: showCorrect ? 'rgba(46,160,67,0.12)' : showWrong ? 'rgba(248,81,73,0.12)' : c.panel,
                  border: `1px solid ${showCorrect ? c.good : showWrong ? c.bad : selected === idx ? c.accent : c.border}`,
                  color: c.text, fontSize: '14px', lineHeight: 1.5,
                  cursor: answered ? 'default' : 'pointer',
                }}
              >
                {opt.text}
                {showCorrect && <span style={{ color: c.good, marginLeft: '8px' }}>✓</span>}
                {showWrong && <span style={{ color: c.bad, marginLeft: '8px' }}>✕</span>}
              </button>
            );
          })}
        </div>
        {answered && (
          <div style={{ marginTop: '18px', padding: '14px 16px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '8px', fontSize: '13.5px', color: c.dim, lineHeight: 1.6 }}>
            {q.lesson.options[selected].explanation}
          </div>
        )}
      </div>

      <div style={{ padding: '16px 24px', borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={next}
          disabled={!answered}
          style={{
            padding: '10px 26px', backgroundColor: answered ? c.accent : c.border,
            color: answered ? '#fff' : c.dim, border: 'none', borderRadius: '8px',
            fontWeight: 700, cursor: answered ? 'pointer' : 'not-allowed',
          }}
        >
          {currentQ === questions.length - 1 ? 'Finish' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

function cardBtn(c) {
  return {
    textAlign: 'left', padding: '18px 20px', borderRadius: '12px',
    backgroundColor: c.panel, border: `1px solid ${c.border}`,
    color: c.text, cursor: 'pointer', fontFamily: 'inherit',
  };
}
