import React, { useState, useEffect } from 'react';
import { ACADEMY_DOMAINS } from '../data/academyData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useTheme } from '../ThemeContext';
import {
  isSkillComplete, markSkillComplete, recordMcq, saveSprintSubmission,
} from '../academyProgress';
import { playSuccess, playError, playPop } from '../soundEngine';
import { 
  BookOpen, Award, Clock, Lock, CheckCircle, PlayCircle, ChevronRight, ArrowLeft,
  Briefcase, Zap, Compass, BrainCircuit, Target, Code, CheckCircle2,
  Sparkles, Film, Flame, Pause, Lightbulb, FileText, ChevronDown, ChevronUp, PieChart
} from 'lucide-react';

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

const IconMap = {
  "Compass": <Compass size={18} />,
  "Briefcase": <Briefcase size={18} />,
  "Zap": <Zap size={18} />,
  "BrainCircuit": <BrainCircuit size={18} />,
  "Target": <Target size={18} />,
  "Code": <Code size={18} />,
  "Film": <Film size={18} />,
  "Flame": <Flame size={18} />
};

export default function PMAcademy() {
  const { theme } = useTheme();
  const dark = theme === 'dark';
  
  const c = {
    bg: dark ? '#0a0a0c' : '#fcfcfc',
    panel: dark ? '#13141a' : '#ffffff',
    panelHover: dark ? '#1c1d24' : '#f4f4f5',
    border: dark ? '#27272a' : '#e4e4e7',
    text: dark ? '#f4f4f5' : '#09090b',
    textDim: dark ? '#a1a1aa' : '#71717a',
    primary: '#8b5cf6',
    primaryHover: dark ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.08)',
    correctText: dark ? '#34d399' : '#10b981',
    correctBg: dark ? 'rgba(16, 185, 129, 0.15)' : 'rgba(16, 185, 129, 0.1)',
    errorText: dark ? '#f87171' : '#ef4444',
    errorBg: dark ? 'rgba(239, 68, 68, 0.15)' : 'rgba(239, 68, 68, 0.1)',
    glassBg: dark ? 'rgba(19, 20, 26, 0.7)' : 'rgba(255, 255, 255, 0.7)',
  };

  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [lessonState, setLessonState] = useState('reading'); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [sprintAnswers, setSprintAnswers] = useState([]);
  const [sprintResult, setSprintResult] = useState(null);

  const [caseStep, setCaseStep] = useState(0);
  const [caseAnswers, setCaseAnswers] = useState({});
  const [hintsExpanded, setHintsExpanded] = useState(false);

  // Auto-scroll to top when lesson changes
  useEffect(() => {
    const el = document.getElementById('academy-scroll-container');
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentLessonIndex, selectedSkill]);

  const domain = ACADEMY_DOMAINS[selectedDomainIndex];

  const handleStartSkill = (skill) => {
    if (skill.locked) return;
    setSelectedSkill(skill);
    setCurrentLessonIndex(0);
    setLessonState(skill.lessons ? (skill.lessons[0].type === 'mcq' ? 'mcq' : 'reading') : 'reading');
    setSelectedOption(null);
    setSprintAnswers([]);
    setSprintResult(null);
    setCaseStep(0);
    setCaseAnswers({});
    setHintsExpanded(false);
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
    const isLastLesson = currentLessonIndex === selectedSkill.lessons.length - 1;
    const progressPct = Math.round(((currentLessonIndex) / selectedSkill.lessons.length) * 100);

    const handleNext = () => {
      // If mcq and not answered, don't allow next. If sprint and not submitted, don't allow next.
      if (lesson.type === 'mcq' && lessonState !== 'answered') return;
      if (lesson.type === 'sprint' && !sprintResult) return;

      if (isLastLesson) {
        playSuccess();
        markSkillComplete(selectedSkill.id);
        setSelectedSkill(null);
      } else {
        playPop();
        const nextIdx = currentLessonIndex + 1;
        setCurrentLessonIndex(nextIdx);
        setLessonState(selectedSkill.lessons[nextIdx].type === 'mcq' ? 'mcq' : 'reading');
        setSelectedOption(null);
        setSprintAnswers([]);
        setSprintResult(null);
      }
    };
    
    const handlePrev = () => {
      if (currentLessonIndex > 0) {
        playPop();
        const prevIdx = currentLessonIndex - 1;
        setCurrentLessonIndex(prevIdx);
        setLessonState(selectedSkill.lessons[prevIdx].type === 'mcq' ? 'mcq' : 'reading');
        setSelectedOption(null);
        setSprintAnswers([]);
        setSprintResult(null);
      }
    };

    const isNextDisabled = (lesson.type === 'mcq' && lessonState !== 'answered') || 
                           (lesson.type === 'sprint' && !sprintResult);

    return (
      <div style={{ flex: 1, display: 'flex', backgroundColor: c.bg, minHeight: 0, overflow: 'hidden' }}>
        
        {/* LEFT SIDEBAR: Nav & Vertical Stepper */}
        <div style={{ width: '280px', backgroundColor: c.bg, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', padding: '32px 24px', overflowY: 'auto' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', color: c.text, fontWeight: 800, fontSize: '18px' }}>
            <div style={{ padding: '6px', backgroundColor: c.primary, borderRadius: '8px', color: '#fff' }}><BookOpen size={20} /></div>
            PM Academy
          </div>

          <button onClick={() => setSelectedSkill(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', backgroundColor: c.panel, border: 'none', borderRadius: '8px', color: c.textDim, fontSize: '14px', fontWeight: 600, cursor: 'pointer', marginBottom: '32px', alignSelf: 'flex-start' }}>
            <ArrowLeft size={16} /> Back to Modules
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: selectedSkill.color || c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 4px 12px ${(selectedSkill.color || c.primary)}66` }}>
               {selectedSkill.icon ? (IconMap[selectedSkill.icon] || <Zap size={20} />) : <Zap size={20} />}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: c.text }}>{selectedSkill.title}</div>
              <div style={{ fontSize: '12px', color: selectedSkill.color || c.primary, fontWeight: 600 }}>{selectedSkill.difficulty || 'Module'}</div>
            </div>
          </div>

          {/* Vertical Stepper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', marginBottom: '40px', marginLeft: '12px' }}>
            {selectedSkill.lessons.map((l, idx) => {
              const isActive = idx === currentLessonIndex;
              const isPast = idx < currentLessonIndex;
              
              return (
                <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative', minHeight: '60px' }}>
                  {/* Vertical Line */}
                  {idx < selectedSkill.lessons.length - 1 && (
                    <div style={{ position: 'absolute', left: '11px', top: '24px', bottom: '-8px', width: '2px', backgroundColor: isPast ? c.primary : c.border }} />
                  )}
                  
                  {/* Circle */}
                  <div style={{ 
                    width: '24px', height: '24px', borderRadius: '12px', 
                    backgroundColor: isActive ? c.primary : (isPast ? c.primaryHover : c.panel), 
                    border: `1px solid ${isActive ? c.primary : (isPast ? c.primary : c.border)}`, 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    fontSize: '11px', fontWeight: 700, 
                    color: isActive ? '#fff' : (isPast ? c.primary : c.textDim),
                    zIndex: 1, marginTop: '4px'
                  }}>
                    {isPast ? <CheckCircle2 size={14} /> : (idx + 1)}
                  </div>
                  
                  {/* Text */}
                  <div style={{ paddingTop: '4px', paddingBottom: '24px' }}>
                    <div style={{ fontSize: '14px', fontWeight: isActive ? 700 : 600, color: isActive ? c.primary : c.text, marginBottom: '4px' }}>{l.type === 'mcq' ? 'Knowledge Check' : l.type === 'sprint' ? 'Sprint' : 'Lesson'}</div>
                    <div style={{ fontSize: '12px', color: c.textDim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>{l.title || (l.prompt ? l.prompt.split(' ').slice(0,4).join(' ') + '...' : '')}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Card */}
          <div style={{ padding: '16px', borderRadius: '12px', border: `1px solid ${c.border}`, backgroundColor: c.panel, marginBottom: '24px', marginTop: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: c.text }}>Your Progress</span>
              <span style={{ fontSize: '14px', fontWeight: 700, color: c.primary }}>{progressPct}%</span>
            </div>
            <div style={{ height: '6px', borderRadius: '3px', backgroundColor: c.panelHover, marginBottom: '12px', overflow: 'hidden' }}>
              <div style={{ width: `${progressPct}%`, height: '100%', backgroundColor: c.primary, transition: 'width 0.3s' }} />
            </div>
            <div style={{ fontSize: '12px', color: c.textDim }}>{currentLessonIndex} of {selectedSkill.lessons.length} sections completed</div>
          </div>
          
        </div>

        {/* CENTER CONTENT: Main Workspace */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflowY: 'auto', backgroundColor: c.bg }}>
          
          {/* Top Bar (Horizontal segments) */}
          <div style={{ padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, maxWidth: '400px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                {selectedSkill.lessons.map((_, idx) => (
                  <div key={idx} style={{ height: '6px', borderRadius: '3px', flex: 1, backgroundColor: idx <= currentLessonIndex ? c.primary : c.panelHover }} />
                ))}
              </div>
              <div style={{ fontSize: '12px', color: c.textDim, fontWeight: 500 }}>Step {currentLessonIndex + 1} of {selectedSkill.lessons.length}</div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '14px', color: c.textDim, fontWeight: 600 }}>{currentLessonIndex + 1} / {selectedSkill.lessons.length}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handlePrev} disabled={currentLessonIndex === 0} style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${c.border}`, backgroundColor: currentLessonIndex === 0 ? c.panelHover : c.panel, color: currentLessonIndex === 0 ? c.border : c.text, cursor: currentLessonIndex === 0 ? 'not-allowed' : 'pointer' }}>
                  <ArrowLeft size={16} />
                </button>
                <button onClick={handleNext} disabled={isNextDisabled} style={{ width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${c.border}`, backgroundColor: c.panel, color: isNextDisabled ? c.border : c.primary, cursor: isNextDisabled ? 'not-allowed' : 'pointer' }}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, padding: '40px 60px 120px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
            
            <div style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', backgroundColor: `${c.primary}15`, color: c.primary, borderRadius: '20px', fontSize: '13px', fontWeight: 600, marginBottom: '24px' }}>
              {lesson.type === 'mcq' ? 'Knowledge Check' : lesson.type === 'sprint' ? 'Design Sprint' : lesson.type === 'video' ? 'Video Lesson' : 'Concept Lesson'}
            </div>

            {lesson.type === 'video' ? (
              <div className="animate-slide-up">
                <h1 style={{ fontSize: '40px', fontWeight: 800, color: c.text, margin: '0 0 24px 0', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{lesson.title}</h1>
                <div style={{ color: c.textDim, fontSize: '18px', marginBottom: '40px', lineHeight: 1.6 }}>{lesson.description}</div>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <iframe 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                    src={lesson.url} 
                    title={lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ) : lesson.type === 'sprint' ? (
              <div className="animate-slide-up">
                <h1 style={{ fontSize: '40px', fontWeight: 800, color: c.text, margin: '0 0 24px 0', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{lesson.title}</h1>
                
                <div className="markdown-body" style={{ color: c.text, fontSize: '16px', lineHeight: '1.8', marginBottom: '40px', padding: '24px', backgroundColor: c.panelHover, borderRadius: '12px', border: `1px solid ${c.border}`, '--md-color': c.text, '--md-link': c.primary, '--md-code-bg': c.panel, '--md-border': c.border }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.brief}</ReactMarkdown>
                </div>

                {lesson.questions.map((question, i) => {
                  const qResult = sprintResult?.perQuestion[i];
                  return (
                    <div key={i} style={{ marginBottom: '40px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: c.text, marginBottom: '12px' }}>
                        {i + 1}. {question.q}
                      </div>
                      {question.hint && <div style={{ fontSize: '15px', color: c.textDim, marginBottom: '16px' }}>{question.hint}</div>}
                      <textarea
                        value={sprintAnswers[i] || ''}
                        onChange={(e) => {
                          const next = [...sprintAnswers];
                          next[i] = e.target.value;
                          setSprintAnswers(next);
                        }}
                        disabled={!!sprintResult}
                        placeholder="Draft your response here..."
                        style={{
                          width: '100%', minHeight: '140px', resize: 'vertical', boxSizing: 'border-box',
                          backgroundColor: c.bg, color: c.text, border: `1px solid ${sprintAnswers[i] ? c.primary : c.border}`,
                          borderRadius: '12px', padding: '20px', fontSize: '15px', lineHeight: 1.6,
                          fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s',
                          boxShadow: sprintAnswers[i] && !sprintResult ? `0 0 0 3px ${c.primaryHover}` : 'none',
                          opacity: sprintResult ? 0.8 : 1,
                        }}
                        onFocus={(e) => e.target.style.borderColor = c.primary}
                        onBlur={(e) => e.target.style.borderColor = sprintAnswers[i] ? c.primary : c.border}
                      />
                      {qResult && (
                        <div className="animate-fade-in" style={{ marginTop: '24px', backgroundColor: `${c.correctText}10`, padding: '24px', borderRadius: '12px', border: `1px solid ${c.correctText}40` }}>
                          <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: c.text }}>Evaluation</h4>
                          {qResult.hits.map((h) => (
                            <div key={h} style={{ fontSize: '15px', color: c.correctText, padding: '4px 0', display: 'flex', alignItems: 'center', gap: '12px' }}><CheckCircle2 size={16} /> {h}</div>
                          ))}
                          {qResult.misses.map((m) => (
                            <div key={m} style={{ fontSize: '15px', color: c.errorText, padding: '4px 0', display: 'flex', alignItems: 'center', gap: '12px' }}><Target size={16} /> Missing: {m}</div>
                          ))}
                          <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${c.correctText}20`, fontSize: '15px', color: c.text, lineHeight: 1.6 }}>
                            <strong style={{ display: 'block', marginBottom: '8px' }}>Model Approach:</strong>{question.model}
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
                      padding: '14px 28px', backgroundColor: c.primary, color: '#fff', border: 'none',
                      borderRadius: '8px', fontSize: '15px', fontWeight: '600', marginTop: '24px',
                      cursor: sprintAnswers.some((a) => (a || '').trim()) ? 'pointer' : 'not-allowed',
                      opacity: sprintAnswers.some((a) => (a || '').trim()) ? 1 : 0.5,
                      boxShadow: sprintAnswers.some((a) => (a || '').trim()) ? `0 4px 12px ${c.primary}40` : 'none',
                      transition: 'all 0.2s',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}
                  >
                    Submit for Grading <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', gap: '24px', padding: '24px', backgroundColor: sprintResult.grade <= 'B' ? `${c.correctText}10` : `${c.errorText}10`, border: `1px solid ${sprintResult.grade <= 'B' ? c.correctText : c.errorText}40`, borderRadius: '12px', marginTop: '32px' }}>
                    <div style={{ fontSize: '48px', fontWeight: 900, color: sprintResult.grade <= 'B' ? c.correctText : c.errorText, lineHeight: 1 }}>{sprintResult.grade}</div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: c.text, marginBottom: '6px' }}>
                        {sprintResult.points} out of {sprintResult.max} points scored
                      </div>
                      <div style={{ fontSize: '14px', color: c.textDim }}>
                        This sprint has been graded. You may continue.
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : lesson.type === 'teach' || lesson.type === 'scenario' ? (
              <div className="animate-slide-up">
                <h1 style={{ fontSize: '40px', fontWeight: 800, color: c.text, margin: '0 0 32px 0', letterSpacing: '-0.02em', lineHeight: 1.2 }}>{lesson.title}</h1>
                <div className="markdown-body" style={{ 
                  color: c.text, fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-wrap', 
                  '--md-color': c.text, '--md-link': c.primary, '--md-code-bg': c.panelHover, '--md-border': c.border
                }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {lesson.body}
                  </ReactMarkdown>
                </div>
                {lesson.keyTakeaway && (
                  <div style={{ 
                    marginTop: '48px', padding: '24px', backgroundColor: `${c.primary}10`, 
                    border: `1px solid ${c.primary}30`, borderRadius: '12px', 
                    color: c.text, display: 'flex', gap: '20px', alignItems: 'flex-start' 
                  }}>
                    <div style={{ color: c.primary, paddingTop: '4px' }}><Lightbulb size={24} /></div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: c.primary, marginBottom: '8px' }}>Key Takeaway</div>
                      <div style={{ fontSize: '16px', lineHeight: 1.6 }}>{lesson.keyTakeaway}</div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-slide-up">
                <h2 style={{ fontSize: '32px', fontWeight: 800, color: c.text, margin: '0 0 40px 0', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                  {lesson.prompt}
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {lesson.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const showCorrect = lessonState === 'answered' && opt.correct;
                    const showIncorrect = lessonState === 'answered' && isSelected && !opt.correct;
                    
                    let border = `1px solid ${c.border}`;
                    let bg = c.panel;
                    let iconColor = c.border;
                    
                    if (showCorrect) { border = `1px solid ${c.correctText}`; bg = `${c.correctText}10`; iconColor = c.correctText; }
                    else if (showIncorrect) { border = `1px solid ${c.errorText}`; bg = `${c.errorText}10`; iconColor = c.errorText; }
                    else if (isSelected && !showCorrect && !showIncorrect) { border = `1px solid ${c.primary}`; bg = `${c.primary}10`; iconColor = c.primary; }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(idx)}
                        className="animate-slide-up"
                        style={{
                          animationDelay: `${idx * 0.05}s`,
                          animationFillMode: 'both',
                          textAlign: 'left',
                          padding: '24px',
                          backgroundColor: bg,
                          border: border,
                          borderRadius: '12px',
                          color: c.text,
                          fontSize: '16px',
                          lineHeight: 1.6,
                          fontWeight: 500,
                          cursor: lessonState === 'answered' ? 'default' : 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '20px'
                        }}
                        onMouseOver={(e) => { 
                          if(lessonState !== 'answered' && !isSelected) {
                            e.currentTarget.style.borderColor = c.primary;
                            e.currentTarget.style.backgroundColor = c.panelHover;
                          }
                        }}
                        onMouseOut={(e) => { 
                          if(lessonState !== 'answered' && !isSelected) {
                            e.currentTarget.style.borderColor = c.border;
                            e.currentTarget.style.backgroundColor = bg;
                          }
                        }}
                      >
                        <div style={{ 
                          minWidth: '24px', height: '24px', borderRadius: '50%', border: `1px solid ${iconColor}`, 
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          backgroundColor: (showCorrect || showIncorrect || isSelected) ? iconColor : 'transparent',
                          transition: 'all 0.2s',
                          marginTop: '2px'
                        }}>
                          {(showCorrect || showIncorrect || isSelected) && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#fff' }} />}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ color: (showCorrect || showIncorrect || isSelected) ? c.text : c.textDim }}>{opt.text}</div>
                          {lessonState === 'answered' && isSelected && (
                            <div className="animate-fade-in" style={{ marginTop: '12px', fontSize: '14px', color: opt.correct ? c.correctText : c.errorText, backgroundColor: c.bg, padding: '12px', borderRadius: '8px', border: `1px solid ${opt.correct ? c.correctText : c.errorText}40` }}>
                              {opt.explanation}
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
          </div>

          {/* Sticky Bottom Bar */}
          <div style={{ position: 'sticky', bottom: 0, left: 0, right: 0, padding: '24px 60px', backgroundColor: c.bg, borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 10 }}>
            <div style={{ display: 'flex', gap: '24px', color: c.textDim, fontSize: '14px', fontWeight: 500 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={16} /> {selectedSkill.time || '15 mins'}</span>
            </div>
            
            <button 
              onClick={handleNext}
              disabled={isNextDisabled}
              style={{
                padding: '14px 28px', borderRadius: '8px', backgroundColor: c.primary,
                color: '#fff', fontSize: '15px', fontWeight: 600, border: 'none',
                display: 'flex', alignItems: 'center', gap: '12px', cursor: isNextDisabled ? 'not-allowed' : 'pointer',
                boxShadow: isNextDisabled ? 'none' : `0 4px 12px ${c.primary}40`, transition: 'transform 0.2s',
                opacity: isNextDisabled ? 0.5 : 1
              }}
              onMouseOver={e=> { if(!isNextDisabled) e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseOut={e=> { if(!isNextDisabled) e.currentTarget.style.transform='translateY(0)'; }}
            >
              {isLastLesson ? 'Finish Module' : 'Continue'} <ArrowLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              <span style={{ opacity: 0.6, fontSize: '12px', marginLeft: '8px', fontWeight: 400 }}>Press Enter ↵</span>
            </button>
          </div>
        </div>

      </div>
    );
  };

  const renderBrowser = () => {
    // Determine gradient based on domain index
    const gradients = [
      `linear-gradient(135deg, ${c.panel} 0%, rgba(139, 92, 246, 0.15) 100%)`,
      `linear-gradient(135deg, ${c.panel} 0%, rgba(16, 185, 129, 0.15) 100%)`,
      `linear-gradient(135deg, ${c.panel} 0%, rgba(59, 130, 246, 0.15) 100%)`,
      `linear-gradient(135deg, ${c.panel} 0%, rgba(245, 158, 11, 0.15) 100%)`,
    ];
    const heroBg = gradients[selectedDomainIndex % gradients.length];

    return (
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div style={{ width: '300px', backgroundColor: c.panel, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', zIndex: 10 }}>
          <div style={{ padding: '40px 24px 24px 24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: c.text, margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', backgroundColor: c.primaryHover, borderRadius: '8px', color: c.primary }}><BookOpen size={24} /></div>
              PM Academy
            </h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 32px 16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.textDim, marginBottom: '16px', paddingLeft: '8px' }}>
              Curriculum
            </div>
            {ACADEMY_DOMAINS.map((dom, idx) => {
              const isSelected = idx === selectedDomainIndex;
              const total = (dom.skills || []).length;
              const done = (dom.skills || []).filter((s) => isSkillComplete(s.id)).length;
              const pct = total ? Math.round((done / total) * 100) : 0;
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDomainIndex(idx)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '16px', marginBottom: '8px',
                    backgroundColor: isSelected ? c.primaryHover : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    color: isSelected ? c.primary : c.textDim,
                    cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '8px',
                    position: 'relative', overflow: 'hidden'
                  }}
                >
                  {isSelected && <div style={{ position: 'absolute', left: 0, top: '25%', bottom: '25%', width: '3px', backgroundColor: c.primary, borderRadius: '0 4px 4px 0' }} />}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: isSelected ? 700 : 500, fontSize: '15px' }}>
                    {IconMap[dom.lucideIcon] || <BookOpen size={18} />}
                    {dom.title}
                  </div>
                  {total > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '30px' }}>
                      <div style={{ flex: 1, height: '4px', backgroundColor: isSelected ? 'rgba(139,92,246,0.2)' : c.border, borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: pct === 100 ? c.correctText : (isSelected ? c.primary : c.textDim) }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: isSelected ? c.primary : c.textDim }}>{done}/{total}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, backgroundColor: c.bg, overflowY: 'auto' }}>
          {domain ? (
            <div className="animate-fade-in" key={domain.title}>
              {/* Hero Section */}
              <div style={{ padding: '80px 56px', background: heroBg, borderBottom: `1px solid ${c.border}`, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '50%', background: `linear-gradient(90deg, transparent 0%, ${c.bg} 100%)`, opacity: 0.5 }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h1 style={{ color: c.text, margin: '0 0 16px 0', fontSize: '48px', fontWeight: 800, letterSpacing: '-0.03em' }}>{domain.title}</h1>
                  <p style={{ color: c.textDim, fontSize: '20px', margin: '0 0 40px 0', maxWidth: '600px', lineHeight: 1.6 }}>
                    Master the core concepts of {domain.title.toLowerCase()} with interactive scenarios and real-world case breakdowns.
                  </p>
                  
                  {(() => {
                    const total = (domain.skills || []).length;
                    const done = (domain.skills || []).filter((s) => isSkillComplete(s.id)).length;
                    const pct = total ? Math.round((done / total) * 100) : 0;
                    return (
                      <div style={{ maxWidth: '440px', backgroundColor: c.glassBg, backdropFilter: 'blur(12px)', padding: '24px', borderRadius: '16px', border: `1px solid ${c.border}`, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700, color: c.text, marginBottom: '16px' }}>
                          <span>Domain Mastery</span>
                          <span style={{ color: pct === 100 ? c.correctText : c.primary }}>{pct}%</span>
                        </div>
                        <div style={{ height: '10px', borderRadius: '5px', backgroundColor: c.panelHover, overflow: 'hidden', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' }}>
                          <div style={{ width: `${pct}%`, height: '100%', backgroundColor: pct === 100 ? c.correctText : c.primary, transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                        </div>
                        <div style={{ fontSize: '14px', color: c.textDim, marginTop: '12px', fontWeight: 500 }}>
                          {done} of {total} skills completed
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Skills Grid */}
              <div style={{ padding: '56px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '32px' }}>
                  {domain.skills && domain.skills.map((skill, idx) => {
                    const isCompleted = isSkillComplete(skill.id);
                    return (
                      <div 
                        key={skill.id}
                        className="animate-slide-up"
                        onClick={() => handleStartSkill(skill)}
                        style={{
                          animationDelay: `${idx * 0.05}s`,
                          animationFillMode: 'both',
                          backgroundColor: c.glassBg,
                          backdropFilter: 'blur(12px)',
                          border: `1px solid ${isCompleted ? c.correctText + '44' : c.border}`,
                          borderRadius: '20px',
                          padding: '32px',
                          cursor: skill.locked ? 'not-allowed' : 'pointer',
                          opacity: skill.locked ? 0.6 : 1,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
                          position: 'relative',
                          overflow: 'hidden',
                          filter: skill.locked ? (dark ? 'grayscale(100%) brightness(0.8)' : 'grayscale(100%) opacity(0.7)') : 'none'
                        }}
                        onMouseOver={(e) => { 
                          if(!skill.locked) { 
                            e.currentTarget.style.transform = 'translateY(-6px)'; 
                            e.currentTarget.style.boxShadow = `0 20px 40px ${isCompleted ? c.correctText + '22' : c.primary + '22'}`;
                            e.currentTarget.style.borderColor = isCompleted ? c.correctText : c.primary; 
                          } 
                        }}
                        onMouseOut={(e) => { 
                          if(!skill.locked) { 
                            e.currentTarget.style.transform = 'translateY(0)'; 
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.03)';
                            e.currentTarget.style.borderColor = isCompleted ? c.correctText + '44' : c.border; 
                          } 
                        }}
                      >
                        {/* Top ribbon if completed */}
                        {isCompleted && (
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', backgroundColor: c.correctText, boxShadow: `0 0 10px ${c.correctText}` }} />
                        )}

                        <h3 style={{ color: c.text, margin: '0 0 20px 0', fontSize: '22px', fontWeight: 800, lineHeight: 1.3 }}>{skill.title}</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: c.textDim, fontSize: '15px', fontWeight: 500 }}>
                            <Clock size={18} /> <span>Est. {skill.lessons?.length * 2 || 0} mins</span>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
                            {skill.locked ? (
                              <span style={{ color: c.textDim, fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Lock size={18} /> Locked
                              </span>
                            ) : isCompleted ? (
                              <span style={{ color: c.correctText, fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckCircle size={18} /> Completed
                              </span>
                            ) : (
                              <span style={{ color: c.primary, fontSize: '15px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <PlayCircle size={18} /> Start
                              </span>
                            )}
                            
                            {skill.lessons?.some((l) => l.type === 'sprint') && (
                              <span style={{ backgroundColor: c.primaryHover, color: c.primary, padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 800, letterSpacing: '0.5px' }}>
                                SPRINT
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: c.textDim, fontSize: '18px' }}>
              Select a domain to begin your training.
            </div>
          )}
        </div>
      </div>
    );
  };

  
  const renderCaseBrowser = () => {
    const isMasteryActive = domain.skills.some(s => isSkillComplete(s.id));
    const completedCount = domain.skills.filter(s => isSkillComplete(s.id)).length;
    const totalCount = domain.skills.length;
    const pct = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    return (
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <div style={{ width: '300px', backgroundColor: c.panel, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', zIndex: 10 }}>
          <div style={{ padding: '40px 24px 24px 24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: c.text, margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '8px', backgroundColor: c.primaryHover, borderRadius: '8px', color: c.primary }}><BookOpen size={24} /></div>
              PM Academy
            </h2>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 32px 16px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.textDim, marginBottom: '16px', paddingLeft: '8px' }}>
              Curriculum
            </div>
            {ACADEMY_DOMAINS.map((dom, idx) => {
              const isSelected = idx === selectedDomainIndex;
              const total = (dom.skills || []).length;
              const done = (dom.skills || []).filter((s) => isSkillComplete(s.id)).length;
              const pct = total ? Math.round((done / total) * 100) : 0;
              
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDomainIndex(idx)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '16px', marginBottom: '8px',
                    backgroundColor: isSelected ? c.primaryHover : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    color: isSelected ? c.primary : c.textDim,
                    cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '8px',
                    position: 'relative', overflow: 'hidden'
                  }}
                >
                  {isSelected && <div style={{ position: 'absolute', left: 0, top: '25%', bottom: '25%', width: '3px', backgroundColor: c.primary, borderRadius: '0 4px 4px 0' }} />}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: isSelected ? 700 : 500, fontSize: '15px' }}>
                    {IconMap[dom.lucideIcon] || <BookOpen size={18} />}
                    {dom.title}
                  </div>
                  {total > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '30px' }}>
                      <div style={{ flex: 1, height: '4px', backgroundColor: isSelected ? 'rgba(139,92,246,0.2)' : c.border, borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: pct === 100 ? c.correctText : (isSelected ? c.primary : c.textDim) }} />
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: isSelected ? c.primary : c.textDim }}>{done}/{total}</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      
        {/* Main Workspace */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: c.bg, position: 'relative', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ padding: '40px 56px 20px', display: 'flex', gap: '32px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `linear-gradient(135deg, ${c.primary}, #ec4899)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 4px 20px ${c.primary}40` }}>
                <CheckCircle2 size={24} />
              </div>
              <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 800, color: c.text, letterSpacing: '-0.5px' }}>{domain.title}</h1>
            </div>
            <p style={{ margin: 0, fontSize: '16px', color: c.textDim, lineHeight: 1.6, maxWidth: '600px' }}>
              Master the core concepts of case studies with interactive scenarios and real-world breakdowns.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              <span style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: c.panel, border: `1px solid ${c.border}`, fontSize: '13px', fontWeight: 600, color: c.text, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={16} color={c.primary} /> Real-world Scenarios
              </span>
              <span style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: c.panel, border: `1px solid ${c.border}`, fontSize: '13px', fontWeight: 600, color: c.text, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={16} color={c.primary} /> Step-by-step Breakdowns
              </span>
              <span style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: c.panel, border: `1px solid ${c.border}`, fontSize: '13px', fontWeight: 600, color: c.text, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lightbulb size={16} color={c.primary} /> Expert Insights
              </span>
            </div>
          </div>
          
          <div style={{ width: '320px', backgroundColor: c.panel, borderRadius: '16px', padding: '24px', border: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: c.text }}>Domain Mastery</span>
              <span style={{ fontSize: '15px', fontWeight: 800, color: c.primary }}>{pct}%</span>
            </div>
            <div style={{ height: '8px', borderRadius: '4px', backgroundColor: c.panelHover, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', backgroundColor: c.primary }} />
            </div>
            <div style={{ fontSize: '13px', color: c.textDim, marginTop: '12px' }}>
              {completedCount} of {totalCount} skills completed
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ padding: '40px 56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: c.text, margin: 0 }}>Your Case Studies</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: c.textDim, fontSize: '14px' }}>
              Sort by:
              <select style={{ backgroundColor: c.panel, color: c.text, border: `1px solid ${c.border}`, padding: '4px 8px', borderRadius: '6px', outline: 'none' }}>
                <option>Recommended</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {domain.skills.map((caseStudy) => {
              const isCompleted = isSkillComplete(caseStudy.id);
              const iconEl = IconMap[caseStudy.icon] || <BookOpen size={20} />;
              
              return (
                <div 
                  key={caseStudy.id}
                  onClick={() => handleStartSkill(caseStudy)}
                  style={{
                    backgroundColor: c.panel,
                    borderRadius: '16px',
                    border: `1px solid ${c.border}`,
                    padding: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 24px rgba(0,0,0,0.2)`;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: caseStudy.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: `0 4px 12px ${caseStudy.color}66` }}>
                      {iconEl}
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '12px', border: `1px solid ${caseStudy.color}40`, color: caseStudy.color, backgroundColor: `${caseStudy.color}15` }}>
                      {caseStudy.difficulty}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: c.text, margin: '0 0 12px 0' }}>{caseStudy.title}</h3>
                  <p style={{ fontSize: '14px', color: c.textDim, margin: '0 0 24px 0', lineHeight: 1.5, flex: 1 }}>{caseStudy.description}</p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: c.textDim, fontSize: '13px', marginBottom: '24px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> {caseStudy.time}</span>
                    <span>•</span>
                    <span>{caseStudy.difficulty}</span>
                  </div>
                  
                  <button style={{ 
                    width: '100%', padding: '12px', borderRadius: '8px', border: `1px solid ${caseStudy.color}40`, 
                    backgroundColor: `${caseStudy.color}10`, color: caseStudy.color, fontWeight: 600, fontSize: '14px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer'
                  }}>
                    {isCompleted ? 'Review Case Study' : 'Start Case Study'}
                    <ChevronRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    );
  };

  const renderCasePlayer = () => {
    const step = selectedSkill.steps[caseStep];
    const isLastStep = caseStep === selectedSkill.steps.length - 1;

    const handleNext = () => {
      if (isLastStep) {
        markSkillComplete(selectedSkill.id);
        playSuccess();
        setSelectedSkill(null);
      } else {
        playPop();
        setCaseStep(prev => prev + 1);
        setHintsExpanded(false);
      }
    };

    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: c.bg, minHeight: 0 }}>
        {/* Top Nav */}
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: c.panel }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setSelectedSkill(null)} style={{ background: 'none', border: 'none', color: c.textDim, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <ArrowLeft size={20} />
            </button>
            <span style={{ color: c.primary, fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={16} /> {selectedSkill.title}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            {selectedSkill.steps.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: idx <= caseStep ? 1 : 0.4 }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '12px', backgroundColor: idx < caseStep ? c.primary : idx === caseStep ? c.primaryHover : c.panelHover, border: `1px solid ${idx <= caseStep ? c.primary : c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 600, color: idx <= caseStep ? c.primary : c.textDim }}>
                    {idx < caseStep ? <CheckCircle2 size={14} color={c.primary} /> : (idx + 1)}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: idx === caseStep ? 600 : 500, color: idx <= caseStep ? c.text : c.textDim }}>{s.title.split(' ')[0]}</span>
                </div>
                {idx < selectedSkill.steps.length - 1 && <div style={{ width: '40px', height: '1px', backgroundColor: idx < caseStep ? c.primary : c.border, margin: '0 8px' }} />}
              </React.Fragment>
            ))}
          </div>
          
          <button style={{ padding: '6px 12px', borderRadius: '6px', border: `1px solid ${c.border}`, backgroundColor: 'transparent', color: c.text, fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Pause size={14} /> Pause
          </button>
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
          {/* Center Workspace */}
          <div style={{ flex: 1, padding: '40px 60px', overflowY: 'auto' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: c.primary, marginBottom: '8px', display: 'block' }}>Step {caseStep + 1} of {selectedSkill.steps.length}</span>
            <h1 style={{ fontSize: '28px', fontWeight: 800, color: c.text, margin: '0 0 8px 0' }}>{step.title}</h1>
            <p style={{ fontSize: '16px', color: c.textDim, margin: '0 0 32px 0' }}>{step.subtitle}</p>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: c.text, marginBottom: '16px' }}>The Situation</h3>
              <div style={{ fontSize: '16px', color: c.text, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                {step.situation}
              </div>
            </div>

            <div style={{ backgroundColor: `${c.primary}15`, border: `1px solid ${c.primary}40`, borderRadius: '12px', padding: '20px', marginBottom: '40px', display: 'flex', gap: '16px' }}>
              <Lightbulb size={24} color={c.primary} style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ margin: '0 0 8px 0', color: c.primary, fontSize: '15px', fontWeight: 700 }}>Tip</h4>
                <p style={{ margin: 0, color: c.text, fontSize: '15px', lineHeight: 1.5 }}>{step.tip}</p>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: c.text, marginBottom: '16px' }}>Your Approach</h3>
              <p style={{ color: c.textDim, fontSize: '15px', marginBottom: '16px' }}>{step.prompt}</p>
              
              <textarea 
                value={caseAnswers[caseStep] || ''}
                onChange={(e) => setCaseAnswers(prev => ({ ...prev, [caseStep]: e.target.value }))}
                placeholder="Type your answer here..."
                style={{
                  width: '100%', height: '160px', padding: '16px', borderRadius: '12px',
                  backgroundColor: c.panelHover, border: `1px solid ${c.border}`, color: c.text,
                  fontSize: '15px', lineHeight: 1.5, resize: 'vertical', outline: 'none',
                  fontFamily: 'inherit', boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = c.primary}
                onBlur={(e) => e.target.style.borderColor = c.border}
              />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <button style={{ background: 'none', border: 'none', color: c.textDim, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <FileText size={16} /> Add notes
                </button>
                <button 
                  onClick={handleNext}
                  style={{
                    padding: '12px 24px', borderRadius: '8px', backgroundColor: c.primary,
                    color: '#fff', fontSize: '15px', fontWeight: 600, border: 'none',
                    display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                    boxShadow: `0 4px 12px ${c.primary}40`
                  }}
                >
                  {isLastStep ? 'Finish Case' : 'Submit & Continue'} <ChevronRight size={18} />
                </button>
              </div>
            </div>
            
            {caseAnswers[caseStep] && (
              <div className="animate-fade-in" style={{ marginTop: '40px', padding: '24px', backgroundColor: c.panelHover, borderRadius: '12px', border: `1px solid ${c.border}` }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 700, color: c.text }}>Model Approach:</h4>
                <p style={{ margin: 0, fontSize: '15px', color: c.textDim, lineHeight: 1.6 }}>{step.modelAnswer}</p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ width: '300px', backgroundColor: c.panel, borderLeft: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px', borderBottom: `1px solid ${c.border}` }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: c.text, margin: '0 0 16px 0' }}>Your Progress</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '32px', border: `6px solid ${c.panelHover}`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* CSS fake donut chart */}
                  <div style={{ position: 'absolute', inset: -6, borderRadius: '50%', background: `conic-gradient(${c.primary} ${((caseStep + 1)/selectedSkill.steps.length)*100}%, transparent 0)` }} />
                  <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', backgroundColor: c.panel }} />
                  <span style={{ position: 'relative', fontSize: '14px', fontWeight: 700, color: c.text }}>{Math.round(((caseStep + 1)/selectedSkill.steps.length)*100)}%</span>
                </div>
                <div>
                  <div style={{ fontSize: '13px', color: c.textDim, fontWeight: 500 }}>Step {caseStep + 1} of {selectedSkill.steps.length}</div>
                  <div style={{ fontSize: '15px', color: c.text, fontWeight: 600 }}>{step.title.split(' ')[0]}</div>
                </div>
              </div>
              <div style={{ height: '4px', backgroundColor: c.panelHover, borderRadius: '2px', marginTop: '24px' }}>
                <div style={{ height: '100%', width: `${((caseStep + 1)/selectedSkill.steps.length)*100}%`, backgroundColor: c.primary, borderRadius: '2px', transition: 'width 0.3s' }} />
              </div>
            </div>

            <div style={{ padding: '24px', borderBottom: `1px solid ${c.border}` }}>
              <button 
                onClick={() => setHintsExpanded(!hintsExpanded)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: c.text, fontSize: '15px', fontWeight: 700 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lightbulb size={18} color="#d97706" /> Hints
                </div>
                {hintsExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {hintsExpanded && (
                <div className="animate-slide-up" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {step.hints.map((hint, i) => (
                    <div key={i} style={{ display: 'flex', gap: '12px', fontSize: '14px', color: c.textDim }}>
                      <span style={{ color: c.primary }}>•</span> {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ padding: '24px' }}>
              <button style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: c.text, fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} /> Case Resources
                </div>
                <ChevronUp size={18} />
              </button>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {selectedSkill.resources.map((res, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: c.panelHover, borderRadius: '8px', border: `1px solid ${c.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: c.text, fontSize: '13px', fontWeight: 500 }}>
                      <FileText size={16} color={c.textDim} /> {res.name}
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: c.textDim, backgroundColor: c.bg, padding: '2px 6px', borderRadius: '4px', border: `1px solid ${c.border}` }}>
                      {res.type}
                    </span>
                  </div>
                ))}
              </div>
              
              <button style={{ marginTop: '16px', background: 'none', border: 'none', color: c.primary, fontSize: '13px', fontWeight: 600, padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All Resources <ArrowLeft size={14} style={{ transform: 'rotate(180deg)' }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };



    return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, position: 'relative', backgroundColor: c.bg, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {selectedSkill ? (domain.id === 'case-studies' ? renderCasePlayer() : renderPlayer()) : (domain.id === 'case-studies' ? renderCaseBrowser() : renderBrowser())}
      
      {/* Global CSS for markdown and animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slide-up {
          opacity: 0;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Markdown Styling */
        .markdown-body h1, .markdown-body h2, .markdown-body h3 { color: var(--md-color); margin-top: 1.5em; margin-bottom: 0.5em; font-weight: 700; letter-spacing: -0.01em; }
        .markdown-body h2 { font-size: 1.6em; border-bottom: 1px solid var(--md-border); padding-bottom: 0.3em; }
        .markdown-body h3 { font-size: 1.3em; }
        .markdown-body p { margin-bottom: 1.5em; }
        .markdown-body ul, .markdown-body ol { padding-left: 1.5em; margin-bottom: 1.5em; }
        .markdown-body li { margin-bottom: 0.6em; }
        .markdown-body blockquote { border-left: 4px solid var(--md-link); margin: 0 0 1.5em 0; padding: 0.5em 1em; color: var(--md-color); opacity: 0.9; background-color: var(--md-code-bg); border-radius: 0 8px 8px 0; }
        .markdown-body code { background-color: var(--md-code-bg); padding: 0.2em 0.4em; border-radius: 4px; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace; font-size: 0.9em; }
        .markdown-body pre { background-color: var(--md-code-bg); padding: 1.2em; border-radius: 12px; overflow-x: auto; margin-bottom: 1.5em; border: 1px solid var(--md-border); }
        .markdown-body pre code { background-color: transparent; padding: 0; border-radius: 0; }
        .markdown-body a { color: var(--md-link); text-decoration: none; font-weight: 500; }
        .markdown-body a:hover { text-decoration: underline; }
        .markdown-body strong { font-weight: 700; }
      `}</style>
    </div>
  );
}
