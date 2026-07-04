import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCase } from '../case/CaseContext';
import { useTokens } from '../theme';
import { hasApiKey, hasWindowAi, coachDebrief } from '../ai';
import {
  XP_DIMS, computeXP, xpTotal, xpMax, rankFor, evidenceAudit, gradeMemo, processNote, gradeReply,
} from '../case/engine';

// NovaMail: the case delivery system. Story beats arrive as emails; decisions
// (and the decision memo) are made by replying. Front-end of the Case Engine.

export default function NovaMail() {
  const c = useTokens();
  const {
    caseDef, caseId, caseList, states,
    state, visibleMessages, totalXP, rank,
    switchCase, acceptCase, decide, chooseFollowUp, markRead, resetCase, openApp, setMemo, setAiCoach,
    unlockedCaseIds, saveReply,
  } = useCase();
  const [selectedId, setSelectedId] = useState(visibleMessages[0]?.id || null);
  const [pendingDecision, setPendingDecision] = useState(null);
  const [coachLoading, setCoachLoading] = useState(false);
  const [draftReply, setDraftReply] = useState('');

  // Reset selection when switching cases
  useEffect(() => {
    setSelectedId(caseDef.messages[0]?.id || null);
    setPendingDecision(null);
  }, [caseId]); // eslint-disable-line react-hooks/exhaustive-deps

  const selected = visibleMessages.find((m) => m.id === selectedId) || visibleMessages[0];

  useEffect(() => {
    if (selected) markRead(selected.id);
  }, [selected?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const openMessage = (m) => { setSelectedId(m.id); markRead(m.id); setDraftReply(''); };

  // Compose-and-grade a reply to a stakeholder email
  const renderReplyBox = (m) => {
    const saved = state.replies?.[m.id];
    if (saved) {
      const g = gradeReply(saved);
      return (
        <div style={{ marginTop: '18px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.dim, marginBottom: '8px' }}>Your reply · Coach review</div>
          <div style={{ fontSize: '13.5px', lineHeight: 1.6, color: c.text, fontStyle: 'italic', marginBottom: '12px', whiteSpace: 'pre-wrap' }}>“{saved}”</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '26px', fontWeight: 800, color: g.grade <= 'B' ? c.good : c.warn }}>{g.grade}</span>
            <span style={{ fontSize: '12px', color: c.dim }}>{g.points}/{g.max} communication points</span>
          </div>
          {g.checks.map((ck) => (
            <div key={ck.label} style={{ fontSize: '12.5px', color: ck.ok ? c.good : c.bad, padding: '1px 0' }}>{ck.ok ? '✓' : '✕'} {ck.label}</div>
          ))}
        </div>
      );
    }
    return (
      <div style={{ marginTop: '18px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '14px' }}>
        <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.accent, marginBottom: '8px' }}>✍️ Reply to {m.from.split(' ')[0]}</div>
        <div style={{ fontSize: '12.5px', color: c.dim, marginBottom: '10px' }}>{m.replyPrompt}</div>
        <textarea
          value={draftReply}
          onChange={(e) => setDraftReply(e.target.value)}
          placeholder="Write a professional reply — acknowledge, commit to a next step, keep it tight."
          style={{ width: '100%', minHeight: '90px', resize: 'vertical', boxSizing: 'border-box', backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '10px 12px', fontSize: '13.5px', lineHeight: 1.5, fontFamily: 'inherit', outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px', alignItems: 'center' }}>
          <button
            disabled={draftReply.trim().split(/\s+/).length < 4}
            onClick={() => {
              saveReply(m.id, draftReply.trim());
              const isAccept = m.cta?.type === 'accept' || m.cta?.type === 'accept-and-open';
              if (isAccept && state.stage === 'arrival') {
                acceptCase();
                if (m.cta.type === 'accept-and-open') openApp(m.cta.app);
              }
            }}
            style={{ ...btnStyle(c, 'primary'), marginTop: 0, opacity: draftReply.trim().split(/\s+/).length < 4 ? 0.4 : 1 }}
          >
            Send reply
          </button>
          {(m.cta?.type === 'accept' || m.cta?.type === 'accept-and-open') && state.stage === 'arrival' && (
            <button onClick={() => { acceptCase(); if (m.cta.type === 'accept-and-open') openApp(m.cta.app); }} style={{ background: 'none', border: 'none', color: c.dim, fontSize: '13px', cursor: 'pointer' }}>
              Skip — {m.cta.type === 'accept-and-open' ? 'just open it' : 'just accept'}
            </button>
          )}
        </div>
      </div>
    );
  };

  // ----- dynamic message bodies -----
  const renderOutcome = () => {
    const d = caseDef.decisions[state.decision];
    return (
      <div>
        <div style={{ fontSize: '22px', fontWeight: 700, marginBottom: '16px', color: d.verdictTone === 'good' ? c.good : c.bad }}>
          {d.verdict}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
          {d.metrics.map(([label, value, delta]) => (
            <div key={label} style={{ backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '12px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6px', color: c.dim }}>{label}</div>
              <div style={{ fontSize: '20px', fontWeight: 700, margin: '4px 0 2px' }}>{value}</div>
              <div style={{ fontSize: '12px', color: c.dim }}>{delta}</div>
            </div>
          ))}
        </div>
        <MarkdownBody text={d.narrative} c={c} />
        {d.followUp && state.followUpChoice && (
          <div style={{ marginTop: '14px', padding: '14px 16px', backgroundColor: c.panel, borderTop: `1px solid ${c.border}`, borderRight: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, borderLeft: `3px solid ${c.accent}`, borderRadius: '8px', fontSize: '13.5px', lineHeight: 1.6, color: c.text }}>
            <b>Act 2 — {d.followUp.options[state.followUpChoice]?.title}:</b>{' '}
            {d.followUp.options[state.followUpChoice]?.note}
          </div>
        )}
        {processNote(caseDef, state) && (
          <div style={{ marginTop: '14px', fontSize: '13.5px', lineHeight: 1.6, color: c.dim, fontStyle: 'italic' }}>
            {processNote(caseDef, state)}
          </div>
        )}
        <button onClick={() => openApp('win-metrics')} style={btnStyle(c, 'ghost')}>📈 See the impact in NovaMetrics</button>
      </div>
    );
  };

  // Multi-decision arc: the complication that lands after you commit
  const renderFollowUp = () => {
    const fu = caseDef.decisions[state.decision]?.followUp;
    if (!fu) return null;
    const chosen = state.followUpChoice;
    return (
      <div>
        <MarkdownBody text={fu.body} c={c} />
        <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Object.entries(fu.options).map(([id, opt]) => {
            const isPicked = chosen === id;
            return (
              <div
                key={id}
                onClick={() => !chosen && chooseFollowUp(id)}
                style={{
                  border: `1px solid ${isPicked ? c.accent : c.border}`,
                  borderRadius: '10px', padding: '14px 16px', backgroundColor: c.panel,
                  cursor: chosen ? 'default' : 'pointer',
                  opacity: chosen && !isPicked ? 0.5 : 1,
                }}
              >
                <div style={{ fontSize: '14.5px', fontWeight: 700, marginBottom: '4px' }}>{opt.title}</div>
                <div style={{ fontSize: '13px', color: c.dim, lineHeight: 1.5 }}>{opt.pitch}</div>
                {isPicked && <div style={{ marginTop: '6px', fontSize: '12px', color: c.good }}>✓ Chosen — the outcome has arrived in your inbox</div>}
              </div>
            );
          })}
        </div>
        {!chosen && (
          <div style={{ marginTop: '12px', fontSize: '12.5px', color: c.dim }}>
            Click an option to commit — Dev needs the call today.
          </div>
        )}
      </div>
    );
  };

  const renderDebrief = () => {
    const d = caseDef.decisions[state.decision];
    const xp = computeXP(caseDef, state);
    const caseTotal = xpTotal(xp);
    const maxByDim = xpMax(caseDef);
    const audit = evidenceAudit(caseDef, state);
    const memoGrade = gradeMemo(caseDef, state);
    return (
      <div>
        <MarkdownBody text={d.debrief} c={c} />

        {/* Decision memo grade */}
        <div style={{ marginTop: '20px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.dim, marginBottom: '12px' }}>
            Decision memo review
          </div>
          {memoGrade ? (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '28px', fontWeight: 800, color: memoGrade.grade <= 'B' ? c.good : c.warn }}>{memoGrade.grade}</span>
                <span style={{ fontSize: '12px', color: c.dim }}>{memoGrade.points}/{memoGrade.max} rubric points</span>
              </div>
              {memoGrade.hits.map((h) => (
                <div key={h} style={{ fontSize: '13px', color: c.good, padding: '2px 0' }}>✓ {h}</div>
              ))}
              {memoGrade.misses.map((m) => (
                <div key={m} style={{ fontSize: '13px', color: c.bad, padding: '2px 0' }}>✕ Missing: {m}</div>
              ))}
            </>
          ) : (
            <div style={{ fontSize: '13px', color: c.dim }}>
              No memo written. Strong PMs put the recommendation in writing <em>before</em> committing — it forces the evidence to line up. Try it on your next case.
            </div>
          )}
        </div>

        {/* Personalized AI coaching */}
        <div style={{ marginTop: '16px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.accent, marginBottom: '10px' }}>
            Coach's personal note
          </div>
          {state.aiCoach ? (
            <div style={{ fontSize: '13.5px', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{state.aiCoach}</div>
          ) : (hasApiKey() || hasWindowAi()) ? (
            <button
              disabled={coachLoading}
              onClick={async () => {
                setCoachLoading(true);
                try {
                  const audit = evidenceAudit(caseDef, state);
                  const summary = [
                    `Case: ${caseDef.meta.title} at ${caseDef.meta.company} — ${caseDef.meta.blurb}`,
                    `Player's decision: ${d.title} (${d.verdictTone === 'good' ? 'the strongest option' : 'a weaker option'})`,
                    `Evidence gathered: ${audit.gathered.join('; ') || 'none'}`,
                    `Evidence missed: ${audit.missed.join('; ') || 'none'}`,
                    `Decision memo: ${state.memo || '(none written)'}`,
                  ].join('\n');
                  const note = await coachDebrief(summary);
                  if (note) setAiCoach(note);
                } catch (err) {
                  console.warn('Coach call failed:', err.message);
                } finally {
                  setCoachLoading(false);
                }
              }}
              style={{ ...btnStyle(c, 'primary'), marginTop: 0, opacity: coachLoading ? 0.5 : 1 }}
            >
              {coachLoading ? 'Thinking…' : `✨ Get personalized coaching (${hasApiKey() ? 'Claude' : 'Chrome AI'})`}
            </button>
          ) : (
            <div style={{ fontSize: '13px', color: c.dim }}>
              Add an Anthropic API key in the <b>Career</b> app (or use Chrome's built-in AI) to get a personalized coaching note on your playthrough.
            </div>
          )}
        </div>

        {/* Evidence audit */}
        <div style={{ marginTop: '16px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.dim, marginBottom: '12px' }}>
            Evidence audit
          </div>
          {audit.gathered.map((line) => (
            <div key={line} style={{ fontSize: '13px', color: c.good, padding: '3px 0' }}>✓ {line}</div>
          ))}
          {audit.missed.map((line) => (
            <div key={line} style={{ fontSize: '13px', color: c.bad, padding: '3px 0' }}>✕ {line}</div>
          ))}
        </div>

        {/* XP */}
        <div style={{ marginTop: '16px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.dim, marginBottom: '12px' }}>
            XP earned
          </div>
          {XP_DIMS.map((dim) => (
            <div key={dim} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 50px', alignItems: 'center', gap: '10px', marginBottom: '8px', fontSize: '13px' }}>
              <span>{dim}</span>
              <div style={{ height: '8px', backgroundColor: c.bg, borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, (xp[dim] / maxByDim[dim]) * 100)}%`, height: '100%', backgroundColor: c.accent, transition: 'width 0.6s' }} />
              </div>
              <span style={{ textAlign: 'right', color: c.dim }}>+{xp[dim]}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '12px', paddingTop: '12px', borderTop: `1px solid ${c.border}` }}>
            <span style={{ fontSize: '18px', fontWeight: 700, color: c.accent }}>{rank}</span>
            <span style={{ fontSize: '13px', color: c.dim }}>Case: {caseTotal}/400 · Career: {totalXP} XP</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => openApp('win-artifacts')} style={btnStyle(c, 'primary')}>📁 View in Portfolio</button>
          <button onClick={resetCase} style={btnStyle(c, 'ghost')}>↻ Run the case back</button>
        </div>
      </div>
    );
  };

  const renderDecisionBlock = () => (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Decision memo */}
      {!state.decision && (
        <div style={{ backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '14px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.accent, marginBottom: '8px' }}>
            Your recommendation memo (graded by the Coach)
          </div>
          <textarea
            value={state.memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="Two paragraphs: what we should do, and the evidence that backs it. Reference what you found — the data, the interviews, the root cause, the tradeoffs."
            style={{
              width: '100%', minHeight: '110px', resize: 'vertical', boxSizing: 'border-box',
              backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}`,
              borderRadius: '8px', padding: '10px 12px', fontSize: '13.5px', lineHeight: 1.5,
              fontFamily: 'inherit', outline: 'none',
            }}
          />
        </div>
      )}
      {Object.entries(caseDef.decisions).map(([id, d]) => {
        const isPicked = state.decision === id;
        const isPending = pendingDecision === id;
        return (
          <div
            key={id}
            onClick={() => !state.decision && setPendingDecision(id)}
            style={{
              border: `1px solid ${isPicked || isPending ? c.accent : c.border}`,
              boxShadow: isPending ? `0 0 0 1px ${c.accent}` : 'none',
              borderRadius: '10px', padding: '16px', backgroundColor: c.panel,
              cursor: state.decision ? 'default' : 'pointer',
              opacity: state.decision && !isPicked ? 0.5 : 1,
            }}
          >
            <div style={{ fontSize: '11px', color: c.accent, marginBottom: '4px' }}>{d.backer}</div>
            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{d.title}</div>
            <div style={{ fontSize: '13px', color: c.dim, lineHeight: 1.5, marginBottom: '8px' }}>{d.pitch}</div>
            <div style={{ fontSize: '12px', color: c.dim }}>⏱ {d.time}</div>
            {isPicked && <div style={{ marginTop: '8px', fontSize: '12px', color: c.good }}>✓ Committed</div>}
          </div>
        );
      })}
      {!state.decision && (
        <button
          disabled={!pendingDecision}
          onClick={() => { decide(pendingDecision); setPendingDecision(null); }}
          style={{ ...btnStyle(c, 'primary'), marginTop: 0, opacity: pendingDecision ? 1 : 0.4, cursor: pendingDecision ? 'pointer' : 'not-allowed' }}
        >
          {pendingDecision ? `Commit: ${caseDef.decisions[pendingDecision].title}` : 'Select an option to commit'}
        </button>
      )}
    </div>
  );

  const caseStatus = (id) => {
    const s = states[id];
    if (s.decision) return { label: 'Complete', color: c.good };
    if (s.stage === 'investigate') return { label: 'In progress', color: c.warn };
    return { label: 'New', color: c.accent };
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', backgroundColor: c.bg, color: c.text, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Sidebar: case switcher + message list */}
      <div style={{ width: '280px', borderRight: `1px solid ${c.border}`, backgroundColor: c.panel, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '10px' }}>📥 NovaMail</div>
          {caseList.map((cs, i) => {
            const active = cs.meta.id === caseId;
            const locked = !unlockedCaseIds.includes(cs.meta.id);
            const status = caseStatus(cs.meta.id);
            return (
              <button
                key={cs.meta.id}
                onClick={() => !locked && switchCase(cs.meta.id)}
                disabled={locked}
                title={locked ? `Complete Case ${caseList[i - 1].meta.number} to unlock` : undefined}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  cursor: locked ? 'not-allowed' : 'pointer', opacity: locked ? 0.55 : 1,
                  padding: '8px 10px', marginBottom: '6px', borderRadius: '8px',
                  border: `1px solid ${active ? c.accent : c.border}`,
                  backgroundColor: active ? c.bg : 'transparent', color: c.text,
                }}
              >
                <div style={{ fontSize: '12.5px', fontWeight: active ? 700 : 500 }}>
                  {locked ? '🔒 ' : ''}Case {cs.meta.number} · {cs.meta.title}
                </div>
                <div style={{ fontSize: '11px', color: locked ? c.dim : status.color, marginTop: '2px' }}>
                  {locked ? `Finish Case ${caseList[i - 1].meta.number} to unlock` : `${cs.meta.company} · ${status.label}`}
                </div>
              </button>
            );
          })}
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {[...visibleMessages].reverse().map((m) => {
            const unread = !state.readIds.includes(m.id);
            const active = selected?.id === m.id;
            return (
              <div
                key={m.id}
                onClick={() => openMessage(m)}
                style={{
                  padding: '12px 16px', cursor: 'pointer',
                  borderBottom: `1px solid ${c.border}`,
                  borderLeft: `3px solid ${active ? c.accent : 'transparent'}`,
                  backgroundColor: active ? 'rgba(137,87,229,0.08)' : 'transparent',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                    backgroundColor: m.color, color: '#fff', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700,
                  }}>{m.avatar}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: unread ? 700 : 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {m.from}
                      {unread && <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: c.accent, flexShrink: 0 }} />}
                    </div>
                    <div style={{ fontSize: '12px', color: c.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: unread ? 600 : 400 }}>
                      {m.subject}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reading pane */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
        {selected ? (
          <div style={{ maxWidth: '640px' }}>
            <h2 style={{ margin: '0 0 6px', fontSize: '20px' }}>{selected.subject}</h2>
            <div style={{ fontSize: '13px', color: c.dim, marginBottom: '20px', paddingBottom: '16px', borderBottom: `1px solid ${c.border}` }}>
              <strong style={{ color: c.text }}>{selected.from}</strong> · {selected.role} · {caseDef.meta.company}
            </div>

            {selected.dynamic === 'outcome' ? renderOutcome()
              : selected.dynamic === 'debrief' ? renderDebrief()
              : selected.dynamic === 'followup' ? renderFollowUp()
              : <MarkdownBody text={selected.body} c={c} />}

            {selected.decision && renderDecisionBlock()}

            {selected.replyPrompt && renderReplyBox(selected)}
            {selected.cta?.type === 'accept' && state.stage === 'arrival' && !selected.replyPrompt && (
              <button onClick={acceptCase} style={btnStyle(c, 'primary')}>{selected.cta.label}</button>
            )}
            {(selected.cta?.type === 'accept' || selected.cta?.type === 'accept-and-open') && state.stage !== 'arrival' && !selected.replyPrompt && (
              <div style={{ marginTop: '16px', fontSize: '13px', color: c.good }}>✓ You accepted the case.</div>
            )}
            {selected.cta?.type === 'accept-and-open' && state.stage === 'arrival' && (
              <button onClick={() => { acceptCase(); openApp(selected.cta.app); }} style={btnStyle(c, 'primary')}>{selected.cta.label}</button>
            )}
            {selected.cta?.type === 'open-app' && (
              <button onClick={() => openApp(selected.cta.app)} style={btnStyle(c, 'primary')}>{selected.cta.label}</button>
            )}
          </div>
        ) : (
          <div style={{ color: c.dim }}>No message selected.</div>
        )}
      </div>
    </div>
  );
}

function MarkdownBody({ text, c }) {
  return (
    <div style={{ fontSize: '14.5px', lineHeight: 1.65, color: c.text }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
    </div>
  );
}

function btnStyle(c, kind) {
  return {
    marginTop: '20px', padding: '10px 22px', borderRadius: '8px',
    fontSize: '14px', fontWeight: 700, cursor: 'pointer',
    backgroundColor: kind === 'primary' ? c.accent : 'transparent',
    color: kind === 'primary' ? '#fff' : c.dim,
    border: kind === 'primary' ? 'none' : `1px solid ${c.border}`,
  };
}
