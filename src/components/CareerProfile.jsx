import React, { useMemo, useState } from 'react';
import { useCase } from '../case/CaseContext';
import { useTokens } from '../theme';
import { ACADEMY_DOMAINS } from '../data/academyData';
import { XP_DIMS, RANKS, computeXP, xpTotal, computeBadges } from '../case/engine';
import {
  completedSkills, getMissed, getAllSprintSubmissions,
  getStreak, getDaily, recordDaily,
} from '../academyProgress';
import { getApiKey, setApiKey } from '../ai';
import { useAuth } from '../auth/AuthContext';

// Career: the player's home — rank ladder, XP across cases, streak,
// the PM Daily challenge, and profile settings (API key, export/import).

function buildBank() {
  const bank = [];
  for (const dom of ACADEMY_DOMAINS) {
    for (const skill of dom.skills || []) {
      (skill.lessons || []).forEach((lesson) => {
        if (lesson.type === 'mcq') bank.push({ domain: dom.title, lesson });
      });
    }
  }
  return bank;
}

function dailyQuestion(bank) {
  const day = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (const ch of day) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return bank[hash % bank.length];
}

function exportProfile() {
  const dump = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('pmverse_')) dump[k] = localStorage.getItem(k);
  }
  const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pmverse-profile-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportPublicPortfolio(rank, totalXP, streak, earnedBadges, completedCases) {
  let md = `# PMverse Portfolio
Generated on: ${new Date().toISOString().slice(0, 10)}

## 🏆 Current Rank: ${rank}
- **Total XP:** ${totalXP}
- **Current Streak:** ${streak} days

## 🏅 Achievements (${earnedBadges.length})
`;
  earnedBadges.forEach(b => {
    md += `- **${b.icon} ${b.name}**: ${b.desc}\n`;
  });

  md += `\n## 📂 Case Studies Completed (${completedCases.length})\n`;
  completedCases.forEach(cs => {
    md += `- Case ${cs.meta.number}: ${cs.meta.title} (${cs.meta.company})\n`;
  });

  md += `\n---\n*Verified via PMverse Simulator*`;

  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `PMverse-Portfolio-${new Date().toISOString().slice(0, 10)}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

function importProfile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const dump = JSON.parse(reader.result);
      for (const [k, v] of Object.entries(dump)) {
        if (k.startsWith('pmverse_')) localStorage.setItem(k, v);
      }
      window.location.reload();
    } catch {
      alert('That file is not a valid PMverse profile export.');
    }
  };
  reader.readAsText(file);
}

export default function CareerProfile() {
  const c = useTokens();
  const { caseList, states, totalXP, rank } = useCase();
  const { currentUser } = useAuth();
  const playerName = currentUser?.displayName?.split(' ')[0] || 'Alex';
  const bank = useMemo(buildBank, []);
  const [dailySelected, setDailySelected] = useState(null);
  const [keyDraft, setKeyDraft] = useState(getApiKey());
  const [keySaved, setKeySaved] = useState(false);
  const [, forceRefresh] = useState(0);

  // Aggregate XP per dimension across all cases
  const dims = Object.fromEntries(XP_DIMS.map((d) => [d, 0]));
  for (const cs of caseList) {
    const xp = computeXP(cs, states[cs.meta.id]);
    for (const d of XP_DIMS) dims[d] += xp[d];
  }

  // Rank ladder
  const ladder = [...RANKS].reverse(); // ascending
  const nextRank = ladder.find(([min]) => min > totalXP);

  const streak = getStreak();
  const daily = getDaily();
  const today = new Date().toISOString().slice(0, 10);
  const dailyDone = daily?.day === today;
  const dq = dailyQuestion(bank);

  const sprints = getAllSprintSubmissions();
  const totalSkills = ACADEMY_DOMAINS.reduce((n, d) => n + (d.skills?.length || 0), 0);
  const badges = computeBadges(caseList, states, { sprints, streak });
  const earnedCount = badges.filter((b) => b.earned).length;

  const section = (title, children) => (
    <div style={{ backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '12px', padding: '18px 20px', marginBottom: '16px' }}>
      <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: c.dim, marginBottom: '14px' }}>{title}</div>
      {children}
    </div>
  );

  return (
    <div style={{ height: '100%', overflowY: 'auto', backgroundColor: c.bg, color: c.text, padding: '24px 28px', boxSizing: 'border-box', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '18px' }}>
        <div>
          <div style={{ fontSize: '22px', fontWeight: 800 }}>{playerName} — <span style={{ color: c.accent }}>{rank}</span></div>
          <div style={{ fontSize: '13px', color: c.dim, marginTop: '2px' }}>
            {totalXP} career XP{nextRank ? ` · ${nextRank[0] - totalXP} XP to ${nextRank[1]}` : ' · top of the ladder'}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '22px', fontWeight: 800 }}>{streak > 0 ? `🔥 ${streak}` : '—'}</div>
          <div style={{ fontSize: '11px', color: c.dim }}>day streak</div>
        </div>
      </div>

      {/* Rank ladder progress */}
      {nextRank && (
        <div style={{ marginBottom: '16px' }}>
          <div style={{ height: '10px', backgroundColor: c.panel, border: `1px solid ${c.border}`, borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{
              width: `${Math.min(100, (totalXP / nextRank[0]) * 100)}%`, height: '100%',
              background: `linear-gradient(90deg, ${c.accent}, #d946ef)`, transition: 'width 0.6s',
            }} />
          </div>
        </div>
      )}

      {/* PM Daily */}
      {section(`PM Daily · ${today}`, dailyDone ? (
        <div style={{ fontSize: '14px', color: daily.correct ? c.good : c.warn }}>
          {daily.correct ? '✓ Nailed today\'s question. Streak protected.' : '✕ Missed today\'s question — it\'s in your review pool. Streak still counts.'}
          <span style={{ color: c.dim }}> Come back tomorrow.</span>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '11px', color: c.dim, marginBottom: '6px' }}>{dq.domain}</div>
          <div style={{ fontSize: '14.5px', fontWeight: 600, lineHeight: 1.5, marginBottom: '12px' }}>{dq.lesson.prompt}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dq.lesson.options.map((opt, idx) => {
              const showCorrect = dailySelected !== null && opt.correct;
              const showWrong = dailySelected === idx && !opt.correct;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (dailySelected !== null) return;
                    setDailySelected(idx);
                    recordDaily(!!opt.correct);
                  }}
                  style={{
                    textAlign: 'left', padding: '11px 14px', borderRadius: '8px', fontSize: '13.5px',
                    backgroundColor: showCorrect ? 'rgba(46,160,67,0.12)' : showWrong ? 'rgba(248,81,73,0.12)' : c.bg,
                    border: `1px solid ${showCorrect ? c.good : showWrong ? c.bad : c.border}`,
                    color: c.text, cursor: dailySelected !== null ? 'default' : 'pointer', lineHeight: 1.5,
                  }}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
          {dailySelected !== null && (
            <div style={{ marginTop: '12px', fontSize: '13px', color: c.dim, lineHeight: 1.6 }}>
              {dq.lesson.options[dailySelected].explanation}
            </div>
          )}
        </div>
      ))}

      {/* XP by dimension */}
      {section('Career XP by dimension', XP_DIMS.map((d) => {
        const max = Math.max(1, caseList.length * (d === 'Analytics' ? 100 : d === 'Strategy' ? 100 : 80));
        return (
          <div key={d} style={{ display: 'grid', gridTemplateColumns: '130px 1fr 60px', alignItems: 'center', gap: '12px', marginBottom: '8px', fontSize: '13px' }}>
            <span>{d}</span>
            <div style={{ height: '8px', backgroundColor: c.bg, borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(100, (dims[d] / max) * 100)}%`, height: '100%', backgroundColor: c.accent }} />
            </div>
            <span style={{ textAlign: 'right', color: c.dim }}>{dims[d]}</span>
          </div>
        );
      }))}

      {/* Case history */}
      {section('Case history', (
        <div style={{ display: 'grid', gap: '8px' }}>
          {caseList.map((cs) => {
            const st = states[cs.meta.id];
            const xp = xpTotal(computeXP(cs, st));
            return (
              <div key={cs.meta.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px' }}>
                <span>Case {cs.meta.number} · {cs.meta.title} <span style={{ color: c.dim }}>({cs.meta.company})</span></span>
                <span style={{ color: st.decision ? c.good : st.stage === 'investigate' ? c.warn : c.dim }}>
                  {st.decision ? `✓ ${xp} XP` : st.stage === 'investigate' ? 'in progress' : 'not started'}
                </span>
              </div>
            );
          })}
        </div>
      ))}

      {/* Badges */}
      {section(`Achievements · ${earnedCount}/${badges.length}`, (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' }}>
          {badges.map((b) => (
            <div key={b.id} title={b.desc} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px',
              backgroundColor: b.earned ? c.bg : 'transparent',
              border: `1px solid ${b.earned ? c.accent : c.border}`,
              opacity: b.earned ? 1 : 0.5,
            }}>
              <span style={{ fontSize: '22px', filter: b.earned ? 'none' : 'grayscale(1)' }}>{b.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: c.text }}>{b.name}</div>
                <div style={{ fontSize: '10.5px', color: c.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.earned ? 'Earned' : b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Academy stats */}
      {section('Academy', (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', textAlign: 'center' }}>
          {[
            [completedSkills().length + '/' + totalSkills, 'skills completed'],
            [Object.keys(sprints).length, 'sprints submitted'],
            [Object.values(sprints).filter((s) => s.grade === 'A').length, 'A grades'],
            [getMissed().length, 'in review pool'],
          ].map(([v, label]) => (
            <div key={label}>
              <div style={{ fontSize: '20px', fontWeight: 800 }}>{v}</div>
              <div style={{ fontSize: '11px', color: c.dim }}>{label}</div>
            </div>
          ))}
        </div>
      ))}

      {/* Settings */}
      {section('Settings', (
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
            Anthropic API key <span style={{ color: c.dim, fontWeight: 400 }}>— unlocks live Claude stakeholders + personalized coaching</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="password"
              value={keyDraft}
              onChange={(e) => { setKeyDraft(e.target.value); setKeySaved(false); }}
              placeholder="sk-ant-…"
              style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: `1px solid ${c.border}`, backgroundColor: c.bg, color: c.text, outline: 'none', fontSize: '13px' }}
            />
            <button
              onClick={() => { setApiKey(keyDraft); setKeySaved(true); forceRefresh((n) => n + 1); }}
              style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', backgroundColor: c.accent, color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}
            >
              {keySaved ? '✓ Saved' : 'Save'}
            </button>
          </div>
          <div style={{ fontSize: '11.5px', color: c.dim, marginBottom: '16px' }}>
            Stored only in this browser's localStorage; calls go directly from your browser to Anthropic. Clear the field and save to remove.
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => exportPublicPortfolio(rank, totalXP, streak, badges.filter(b => b.earned), caseList.filter(cs => states[cs.meta.id]?.decision))}
              style={{ ...ghostBtn(c), backgroundColor: c.accent, color: '#fff', border: 'none' }}
            >
              🚀 Export Public Portfolio
            </button>
            <button onClick={exportProfile} style={ghostBtn(c)}>⬇ Backup Save</button>
            <label style={{ ...ghostBtn(c), display: 'inline-block' }}>
              ⬆ Restore Save
              <input type="file" accept="application/json" style={{ display: 'none' }}
                onChange={(e) => e.target.files[0] && importProfile(e.target.files[0])} />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}

function ghostBtn(c) {
  return {
    padding: '9px 16px', borderRadius: '8px', border: `1px solid ${c.border}`,
    backgroundColor: 'transparent', color: c.text, fontWeight: 600,
    cursor: 'pointer', fontSize: '13px',
  };
}
