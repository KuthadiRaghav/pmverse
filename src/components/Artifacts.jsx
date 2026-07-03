import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useCase } from '../case/CaseContext';
import { useTokens } from '../theme';
import { getAllSprintSubmissions } from '../academyProgress';

// Portfolio: every meaningful thing the player produces — case reports and
// design-sprint submissions — collected, viewable, and exportable as markdown.

function downloadMarkdown(filename, markdown) {
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Artifacts() {
  const c = useTokens();
  const { artifacts } = useCase();
  const [selectedId, setSelectedId] = useState(null);

  const sprintArtifacts = Object.entries(getAllSprintSubmissions()).map(([skillId, s]) => ({
    id: `sprint-${skillId}`,
    type: 'Design Sprint',
    title: `${s.title} — Sprint Submission`,
    filename: `sprint-${skillId}.md`,
    markdown: [
      `# Design Sprint — ${s.title}`,
      ``,
      `**Coach grade: ${s.grade}**  ·  submitted ${new Date(s.savedAt).toLocaleDateString()}`,
      ``,
      ...s.answers.flatMap((a) => [`## ${a.q}`, '', a.answer || '_(no answer)_', '']),
    ].join('\n'),
  }));

  const all = [...artifacts, ...sprintArtifacts];
  const selected = all.find((a) => a.id === selectedId) || all[0];

  return (
    <div style={{ display: 'flex', height: '100%', backgroundColor: c.bg, color: c.text, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Artifact list */}
      <div style={{ width: '270px', borderRight: `1px solid ${c.border}`, backgroundColor: c.panel, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ fontWeight: 700, fontSize: '15px' }}>📁 Portfolio</div>
          <div style={{ fontSize: '11px', color: c.dim, marginTop: '2px' }}>
            {all.length} artifact{all.length === 1 ? '' : 's'} · exportable
          </div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {all.length === 0 && (
            <div style={{ padding: '20px 16px', fontSize: '13px', color: c.dim, lineHeight: 1.6 }}>
              Nothing here yet. Complete a case in <b>NovaMail</b> or a Design Sprint in the <b>PM Academy</b> — your work becomes portfolio artifacts automatically.
            </div>
          )}
          {all.map((a) => (
            <div
              key={a.id}
              onClick={() => setSelectedId(a.id)}
              style={{
                padding: '12px 16px', cursor: 'pointer',
                borderBottom: `1px solid ${c.border}`,
                borderLeft: `3px solid ${selected?.id === a.id ? c.accent : 'transparent'}`,
                backgroundColor: selected?.id === a.id ? 'rgba(137,87,229,0.08)' : 'transparent',
              }}
            >
              <div style={{ fontSize: '11px', color: c.accent, marginBottom: '2px' }}>
                {a.type === 'Case Report' ? '📊' : '📝'} {a.type}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 600 }}>{a.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Viewer */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {selected ? (
          <>
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', color: c.dim }}>{selected.filename}</span>
              <button
                onClick={() => downloadMarkdown(selected.filename, selected.markdown)}
                style={{
                  padding: '7px 16px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  backgroundColor: c.accent, color: '#fff', fontWeight: 700, fontSize: '13px',
                }}
              >
                ⬇ Export .md
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px', fontSize: '14px', lineHeight: 1.65 }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{selected.markdown}</ReactMarkdown>
            </div>
          </>
        ) : (
          <div style={{ padding: '40px', color: c.dim }}>Select an artifact.</div>
        )}
      </div>
    </div>
  );
}
