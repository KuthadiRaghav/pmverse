// Design tokens. New components consume these instead of hardcoding hex values;
// legacy components migrate opportunistically.
import { useTheme } from './ThemeContext';

export const ACCENT = '#8957e5';
export const ACCENT2 = '#d946ef';
export const GRADIENT = `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})`;

const DARK = {
  bg: '#0d1117',
  bgInset: '#010409',
  panel: '#161b22',
  panelAlt: '#21262d',
  border: '#30363d',
  borderStrong: '#3d444d',
  text: '#e6edf3',
  textMid: '#c9d1d9',
  dim: '#8b949e',
  accent: ACCENT,
  accent2: ACCENT2,
  accentSoft: 'rgba(137,87,229,0.14)',
  good: '#2ea043',
  goodSoft: 'rgba(46,160,67,0.12)',
  bad: '#f85149',
  badSoft: 'rgba(248,81,73,0.12)',
  warn: '#d29922',
  warnSoft: 'rgba(210,153,34,0.12)',
  info: '#58a6ff',
  glass: 'rgba(22,27,34,0.72)',
};

const LIGHT = {
  bg: '#ffffff',
  bgInset: '#f6f8fa',
  panel: '#f9fafb',
  panelAlt: '#f3f4f6',
  border: '#e5e7eb',
  borderStrong: '#d0d7de',
  text: '#111827',
  textMid: '#1f2937',
  dim: '#6b7280',
  accent: ACCENT,
  accent2: ACCENT2,
  accentSoft: 'rgba(137,87,229,0.10)',
  good: '#16a34a',
  goodSoft: 'rgba(22,163,74,0.10)',
  bad: '#dc2626',
  badSoft: 'rgba(220,38,38,0.10)',
  warn: '#d97706',
  warnSoft: 'rgba(217,119,6,0.10)',
  info: '#2563eb',
  glass: 'rgba(255,255,255,0.78)',
};

// Scalar tokens shared across themes
export const RADII = { sm: '6px', md: '10px', lg: '14px', xl: '18px', pill: '999px' };
export const SPACE = { xs: '6px', sm: '10px', md: '14px', lg: '20px', xl: '28px' };
export const SHADOW = {
  sm: '0 1px 3px rgba(0,0,0,0.12)',
  md: '0 6px 20px rgba(0,0,0,0.18)',
  lg: '0 20px 60px rgba(0,0,0,0.4)',
  accent: '0 6px 20px rgba(137,87,229,0.4)',
};
export const FONT = {
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace',
};

export function useTokens() {
  const { theme } = useTheme();
  return theme === 'dark' ? DARK : LIGHT;
}
