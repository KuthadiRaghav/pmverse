import React, { useState } from 'react';
import { ACADEMY_DOMAINS } from '../data/academyData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '../ThemeContext';
import {
  isSkillComplete, markSkillComplete, recordMcq, saveSprintSubmission,
} from '../academyProgress';
import { playSuccess, playError, playPop } from '../soundEngine';

// Rubric-grade a set of design-sprint answers (same regex-rubric approach as
// the Case Engine's memo grading)
function gradeSprint(questions, answers) {
  const perQuestion = questions.map((question, i) => {
    const answer = (answers[i] || '').trim();
    const hits = [];
    const misses = [];
    let points = 0;
    for (const rule of question.rubric) {
      if (answer && rule.match.test(answer)) { points += rule.points; hits.push(rule.note); }
      else misses.push(rule.note);
    }
    return { points, max: question.rubric.reduce((s, r) => s + r.points, 0), hits, misses };
  });
  const points = perQuestion.reduce((s, q) => s + q.points, 0);
  const max = perQuestion.reduce((s, q) => s + q.max, 0);
  const pct = max ? points / max : 0;
  const grade = pct >= 0.8 ? 'A' : pct >= 0.6 ? 'B' : pct >= 0.4 ? 'C' : 'D';
  return { perQuestion, points, max, grade };
}

export default function PMAcademy() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  
  const c = {
    bg: dark ? '#0d1117' : '#ffffff',
    panel: dark ? '#161b22' : '#f3f4f6',
    border: dark ? '#30363d' : '#e5e7eb',
    text: dark ? '#c9d1d9' : '#111827',
    dim: dark ? '#8b949e' : '#6b7280',
    primary: '#8957e5',
    primaryHover: dark ? 'rgba(137, 87, 229, 0.1)' : 'rgba(137, 87, 229, 0.05)',
    correctText: dark ? '#2ea043' : '#16a34a',
    correctBg: dark ? 'rgba(46, 160, 67, 0.1)' : 'rgba(22, 163, 74, 0.1)',
    errorText: dark ? '#f85149' : '#dc2626',
    errorBg: dark ? 'rgba(248, 81, 73, 0.1)' : 'rgba(239, 68, 68, 0.1)',
  };

  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonState, setLessonState] = useState('reading'); // 'reading', 'mcq', 'answered'
  const [selectedOption, setSelectedOption] = useState(null);
  const [sprintAnswers, setSprintAnswers] = useState([]);
  const [sprintResult, setSprintResult] = useState(null);

  const domain = ACADEMY_DOMAINS[selectedDomainIndex];

  const handleStartSkill = (skill) => {
    if (skill.locked) return;
    setSelectedSkill(skill);
    setCurrentLessonIndex(0);
    setLessonState(skill.lessons[0].type === 'mcq' ? 'mcq' : 'reading');
    setSelectedOption(null);
    setSprintAnswers([]);
    setSprintResult(null);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < selectedSkill.lessons.length - 1) {
      playPop();
      const nextIdx = currentLessonIndex + 1;
      setCurrentLessonIndex(nextIdx);
      setLessonState(selectedSkill.lessons[nextIdx].type === 'mcq' ? 'mcq' : 'reading');
      setSelectedOption(null);
      setSprintAnswers([]);
      setSprintResult(null);
    } else {
      playSuccess();
      markSkillComplete(selectedSkill.id);
      setSelectedSkill(null);
    }
  };

  const handleOptionClick = (idx) => {
    if (lessonState === 'answered') return;
    const lesson = selectedSkill.lessons[currentLessonIndex];
    const isCorrect = !!lesson.options[idx].correct;
    
    if (isCorrect) playSuccess();
    else playError();

    setSelectedOption(idx);
    setLessonState('answered');
    recordMcq(selectedSkill.id, currentLessonIndex, isCorrect);
  };

  const handleSprintSubmit = (lesson) => {
    const result = gradeSprint(lesson.questions, sprintAnswers);
    if (result.grade <= 'B') playSuccess();
    else playError();
    
    setSprintResult(result);
    saveSprintSubmission(selectedSkill.id, {
      title: selectedSkill.title,
      grade: result.grade,
      answers: lesson.questions.map((question, i) => ({ q: question.q, answer: sprintAnswers[i] || '' })),
    });
  };

  const renderPlayer = () => {
    const lesson = selectedSkill.lessons[currentLessonIndex];
    const progress = Math.round(((currentLessonIndex + 1) / selectedSkill.lessons.length) * 100);

    return (
      <div style={{ padding: '32px', boxSizing: 'border-box', maxWidth: '800px', margin: '0 auto', flex: 1, minHeight: 0, width: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <button 
            onClick={() => setSelectedSkill(null)}
            style={{ background: 'none', border: 'none', color: c.dim, cursor: 'pointer', fontSize: '14px', padding: 0 }}
          >
            ← Back to curriculum
          </button>
          <div style={{ color: c.dim, fontSize: '14px' }}>
            {currentLessonIndex + 1} of {selectedSkill.lessons.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '4px', backgroundColor: c.border, borderRadius: '2px', marginBottom: '32px' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: c.primary, borderRadius: '2px', transition: 'width 0.3s' }} />
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '16px' }}>
          {lesson.type === 'video' ? (
            <div>
              <h1 style={{ color: c.text, fontSize: '28px', marginBottom: '24px', fontWeight: '600' }}>{lesson.title}</h1>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '8px' }}>
                <iframe 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  src={lesson.url} 
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div style={{ color: c.dim, marginTop: '16px' }}>{lesson.description}</div>
            </div>
          ) : lesson.type === 'sprint' ? (
            <div>
              <h1 style={{ color: c.text, fontSize: '26px', marginBottom: '8px', fontWeight: '600' }}>{lesson.title}</h1>
              <div style={{ fontSize: '12px', color: c.primary, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '18px' }}>
                Design Sprint · graded by the Coach · saved to your Portfolio
              </div>
              <div style={{ color: c.text, fontSize: '15px', lineHeight: '1.7', marginBottom: '24px' }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.brief}</ReactMarkdown>
              </div>
              {lesson.questions.map((question, i) => {
                const qResult = sprintResult?.perQuestion[i];
                return (
                  <div key={i} style={{ marginBottom: '20px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: c.text, marginBottom: '4px' }}>
                      {i + 1}. {question.q}
                    </div>
                    {question.hint && <div style={{ fontSize: '12.5px', color: c.dim, marginBottom: '10px' }}>{question.hint}</div>}
                    <textarea
                      value={sprintAnswers[i] || ''}
                      onChange={(e) => {
                        const next = [...sprintAnswers];
                        next[i] = e.target.value;
                        setSprintAnswers(next);
                      }}
                      disabled={!!sprintResult}
                      placeholder="Your answer — be specific: users, metrics, tradeoffs…"
                      style={{
                        width: '100%', minHeight: '80px', resize: 'vertical', boxSizing: 'border-box',
                        backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}`,
                        borderRadius: '8px', padding: '10px 12px', fontSize: '13.5px', lineHeight: 1.5,
                        fontFamily: 'inherit', outline: 'none', opacity: sprintResult ? 0.75 : 1,
                      }}
                    />
                    {qResult && (
                      <div style={{ marginTop: '10px' }}>
                        {qResult.hits.map((h) => (
                          <div key={h} style={{ fontSize: '12.5px', color: c.correctText, padding: '2px 0' }}>✓ {h}</div>
                        ))}
                        {qResult.misses.map((m) => (
                          <div key={m} style={{ fontSize: '12.5px', color: c.errorText, padding: '2px 0' }}>✕ Missing: {m}</div>
                        ))}
                        <div style={{ marginTop: '10px', padding: '12px', backgroundColor: c.primaryHover, borderLeft: `3px solid ${c.primary}`, borderRadius: '4px', fontSize: '13px', color: c.text, lineHeight: 1.6 }}>
                          <strong>Model answer:</strong> {question.model}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              {!sprintResult ? (
                <button
                  onClick={() => handleSprintSubmit(lesson)}
                  disabled={!sprintAnswers.some((a) => (a || '').trim())}
                  style={{
                    padding: '12px 26px', backgroundColor: c.primary, color: '#fff', border: 'none',
                    borderRadius: '8px', fontSize: '14px', fontWeight: 'bold',
                    cursor: sprintAnswers.some((a) => (a || '').trim()) ? 'pointer' : 'not-allowed',
                    opacity: sprintAnswers.some((a) => (a || '').trim()) ? 1 : 0.4,
                  }}
                >
                  Submit for grading
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', padding: '16px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '10px' }}>
                  <span style={{ fontSize: '34px', fontWeight: 800, color: sprintResult.grade <= 'B' ? c.correctText : c.errorText }}>{sprintResult.grade}</span>
                  <span style={{ fontSize: '13px', color: c.dim }}>
                    {sprintResult.points}/{sprintResult.max} rubric points · submission saved to your Portfolio 📁
                  </span>
                </div>
              )}
            </div>
          ) : lesson.type === 'teach' || lesson.type === 'scenario' ? (
            <div>
              <h1 style={{ color: c.text, fontSize: '28px', marginBottom: '24px', fontWeight: '600' }}>{lesson.title}</h1>
              <div style={{ color: c.text, fontSize: '16px', lineHeight: '1.7', whiteSpace: 'pre-wrap', 
                // Basic markdown styling for the container
                '--md-color': c.text, '--md-link': '#58a6ff', '--md-code-bg': c.panel, '--md-border': c.border
              }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {lesson.body}
                </ReactMarkdown>
              </div>
              {lesson.keyTakeaway && (
                <div style={{ marginTop: '32px', padding: '16px', backgroundColor: c.primaryHover, borderLeft: `4px solid ${c.primary}`, borderRadius: '4px', color: c.text }}>
                  <strong>Key Takeaway:</strong> {lesson.keyTakeaway}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 style={{ color: c.text, fontSize: '22px', marginBottom: '32px', fontWeight: '500', lineHeight: '1.4' }}>
                {lesson.prompt}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {lesson.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const showCorrect = lessonState === 'answered' && opt.correct;
                  const showIncorrect = lessonState === 'answered' && isSelected && !opt.correct;
                  
                  let border = `1px solid ${c.border}`;
                  let bg = c.panel;
                  if (showCorrect) { border = `1px solid ${c.correctText}`; bg = c.correctBg; }
                  if (showIncorrect) { border = `1px solid ${c.errorText}`; bg = c.errorBg; }
                  if (isSelected && !showCorrect && !showIncorrect) border = `1px solid ${c.primary}`;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      style={{
                        textAlign: 'left',
                        padding: '16px 20px',
                        backgroundColor: bg,
                        border: border,
                        borderRadius: '8px',
                        color: c.text,
                        fontSize: '15px',
                        cursor: lessonState === 'answered' ? 'default' : 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span>{opt.text}</span>
                      {showCorrect && <span style={{ color: c.correctText }}>✓</span>}
                      {showIncorrect && <span style={{ color: c.errorText }}>✕</span>}
                    </button>
                  );
                })}
              </div>
              
              {lessonState === 'answered' && (
                <div style={{ marginTop: '24px', padding: '16px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '8px', color: c.dim, fontSize: '15px', lineHeight: '1.5' }}>
                  {lesson.options[selectedOption].explanation}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: `1px solid ${c.border}`, display: 'flex', justifyContent: 'flex-end' }}>
          {(lesson.type === 'sprint' ? !!sprintResult : (lesson.type !== 'mcq' || lessonState === 'answered')) ? (
            <button
              onClick={handleNextLesson}
              style={{ padding: '10px 24px', backgroundColor: c.primary, color: '#fff', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {currentLessonIndex === selectedSkill.lessons.length - 1 ? 'Finish Skill' : 'Continue'}
            </button>
          ) : (
            <button disabled style={{ padding: '10px 24px', backgroundColor: c.border, color: c.dim, border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold' }}>
              Select an answer
            </button>
          )}
        </div>
      </div>
    );
  };

  const renderBrowser = () => (
    <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: c.panel, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px', fontSize: '12px', fontWeight: 'bold', color: c.dim, letterSpacing: '1px', textTransform: 'uppercase' }}>
          Product Domains
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {ACADEMY_DOMAINS.map((dom, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDomainIndex(idx)}
              style={{
                width: '100%', textAlign: 'left', padding: '12px 20px',
                backgroundColor: idx === selectedDomainIndex ? c.primaryHover : 'transparent',
                borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                borderLeft: idx === selectedDomainIndex ? `3px solid ${c.primary}` : '3px solid transparent',
                color: idx === selectedDomainIndex ? c.text : c.dim,
                fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px'
              }}
            >
              <span style={{ fontSize: '16px' }}>{dom.icon || '🏗️'}</span>
              {dom.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, backgroundColor: c.bg, overflowY: 'auto', padding: '40px' }}>
        {domain ? (
          <div>
            <h1 style={{ color: c.text, margin: '0 0 8px 0', fontSize: '32px' }}>{domain.title}</h1>
            {(() => {
              const total = (domain.skills || []).length;
              const done = (domain.skills || []).filter((s) => isSkillComplete(s.id)).length;
              const pct = total ? Math.round((done / total) * 100) : 0;
              return (
                <div style={{ margin: '0 0 32px 0', maxWidth: '460px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: c.dim, marginBottom: '6px' }}>
                    <span>{done} of {total} skills mastered</span>
                    <span style={{ fontWeight: 700, color: pct === 100 ? c.correctText : c.primary }}>{pct}%{pct === 100 ? ' · complete 🎓' : ''}</span>
                  </div>
                  <div style={{ height: '8px', borderRadius: '999px', backgroundColor: c.panel, border: `1px solid ${c.border}`, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg, ${c.primary}, #d946ef)`, transition: 'width 0.5s' }} />
                  </div>
                </div>
              );
            })()}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {domain.skills && domain.skills.map(skill => (
                <div 
                  key={skill.id}
                  onClick={() => handleStartSkill(skill)}
                  style={{
                    backgroundColor: c.panel,
                    border: `1px solid ${c.border}`,
                    borderRadius: '8px',
                    padding: '24px',
                    cursor: skill.locked ? 'not-allowed' : 'pointer',
                    opacity: skill.locked ? 0.6 : 1,
                    transition: 'transform 0.2s, border-color 0.2s',
                  }}
                  onMouseOver={(e) => { if(!skill.locked) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = c.primary; } }}
                  onMouseOut={(e) => { if(!skill.locked) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = c.border; } }}
                >
                  <h3 style={{ color: c.text, margin: '0 0 12px 0', fontSize: '18px' }}>{skill.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {skill.locked ? (
                      <span style={{ color: c.dim, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>🔒 Locked</span>
                    ) : isSkillComplete(skill.id) ? (
                      <span style={{ color: c.correctText, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>✓ Completed · replay anytime</span>
                    ) : (
                      <span style={{ color: c.correctText, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>★ Playable ({skill.lessons?.length || 0} modules)</span>
                    )}
                    {skill.lessons?.some((l) => l.type === 'sprint') && (
                      <span style={{ color: c.primary, fontSize: '11px', fontWeight: 700 }}>◆ SPRINT</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ color: c.dim }}>Select a domain.</div>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, position: 'relative', backgroundColor: c.bg, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {selectedSkill ? renderPlayer() : renderBrowser()}
    </div>
  );
}
