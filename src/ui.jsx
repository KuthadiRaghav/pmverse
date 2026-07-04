import React from 'react';
import { useTokens, RADII, SHADOW, FONT, GRADIENT } from './theme';

// Shared UI primitives — the common vocabulary for every PMverse app.
// All consume design tokens so light/dark and future theming stay consistent.

export function Button({ variant = 'primary', size = 'md', icon, children, style, ...rest }) {
  const t = useTokens();
  const sizes = {
    sm: { padding: '7px 14px', fontSize: '13px' },
    md: { padding: '10px 20px', fontSize: '14px' },
    lg: { padding: '13px 28px', fontSize: '15px' },
  };
  const variants = {
    primary: { background: GRADIENT, color: '#fff', border: 'none', boxShadow: SHADOW.accent },
    solid: { background: t.accent, color: '#fff', border: 'none' },
    ghost: { background: 'transparent', color: t.textMid, border: `1px solid ${t.border}` },
    subtle: { background: t.panelAlt, color: t.text, border: `1px solid ${t.border}` },
    danger: { background: t.badSoft, color: t.bad, border: `1px solid ${t.bad}` },
  };
  const disabled = rest.disabled;
  return (
    <button
      {...rest}
      style={{
        ...sizes[size], ...variants[variant],
        borderRadius: RADII.md, fontWeight: 700, fontFamily: FONT.sans,
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        transition: 'transform 0.1s ease, filter 0.12s ease',
        ...style,
      }}
      onMouseOver={(e) => { if (!disabled) e.currentTarget.style.filter = 'brightness(1.08)'; }}
      onMouseOut={(e) => { e.currentTarget.style.filter = 'none'; }}
    >
      {icon}{children}
    </button>
  );
}

export function Card({ children, pad = '18px', glass = false, style, ...rest }) {
  const t = useTokens();
  return (
    <div {...rest} style={{
      backgroundColor: glass ? t.glass : t.panel,
      border: `1px solid ${t.border}`, borderRadius: RADII.lg,
      padding: pad, backdropFilter: glass ? 'blur(12px)' : 'none',
      ...style,
    }}>{children}</div>
  );
}

export function SectionLabel({ children, style }) {
  const t = useTokens();
  return (
    <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: t.dim, marginBottom: '12px', ...style }}>
      {children}
    </div>
  );
}

export function Badge({ children, tone = 'accent', style }) {
  const t = useTokens();
  const map = {
    accent: [t.accentSoft, t.accent], good: [t.goodSoft, t.good],
    bad: [t.badSoft, t.bad], warn: [t.warnSoft, t.warn], neutral: [t.panelAlt, t.dim],
  };
  const [bg, fg] = map[tone] || map.accent;
  return (
    <span style={{ backgroundColor: bg, color: fg, fontSize: '11px', fontWeight: 700, padding: '3px 9px', borderRadius: RADII.pill, ...style }}>
      {children}
    </span>
  );
}

export function Segmented({ options, value, onChange, style }) {
  const t = useTokens();
  return (
    <div style={{ display: 'inline-flex', backgroundColor: t.panelAlt, border: `1px solid ${t.border}`, borderRadius: RADII.md, padding: '3px', gap: '3px', ...style }}>
      {options.map((o) => {
        const val = o.value ?? o;
        const label = o.label ?? o;
        const active = val === value;
        return (
          <button key={val} onClick={() => onChange(val)} style={{
            padding: '6px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer',
            fontSize: '13px', fontWeight: 600, fontFamily: FONT.sans,
            backgroundColor: active ? t.bg : 'transparent',
            color: active ? t.text : t.dim,
            boxShadow: active ? SHADOW.sm : 'none',
          }}>{label}</button>
        );
      })}
    </div>
  );
}

export function EmptyState({ icon = '📭', title, body, action }) {
  const t = useTokens();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px', color: t.dim }}>
      <div style={{ fontSize: '46px', marginBottom: '14px', opacity: 0.85 }}>{icon}</div>
      <div style={{ fontSize: '16px', fontWeight: 700, color: t.text, marginBottom: '6px' }}>{title}</div>
      {body && <div style={{ fontSize: '13.5px', maxWidth: '340px', lineHeight: 1.6 }}>{body}</div>}
      {action && <div style={{ marginTop: '18px' }}>{action}</div>}
    </div>
  );
}

export function Modal({ title, onClose, children, width = 460 }) {
  const t = useTokens();
  return (
    <div onClick={onClose} style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width, maxWidth: '100%', maxHeight: '85%', overflowY: 'auto', backgroundColor: t.bg, border: `1px solid ${t.border}`, borderRadius: RADII.xl, boxShadow: SHADOW.lg }}>
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: t.text }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: t.dim, cursor: 'pointer', fontSize: '16px' }}>✕</button>
        </div>
        <div style={{ padding: '20px' }}>{children}</div>
      </div>
    </div>
  );
}

export function Spinner({ label }) {
  const t = useTokens();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: t.dim, fontSize: '13px' }}>
      <span style={{ width: '14px', height: '14px', border: `2px solid ${t.border}`, borderTopColor: t.accent, borderRadius: '50%', display: 'inline-block', animation: 'pmverse-spin 0.7s linear infinite' }} />
      {label}
      <style>{`@keyframes pmverse-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
