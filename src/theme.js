// Design tokens. New components consume these instead of hardcoding hex values;
// legacy components migrate opportunistically.
import { useTheme } from './ThemeContext';

export const ACCENT = '#8957e5';

const DARK = {
  bg: '#0d1117',
  panel: '#161b22',
  panelAlt: '#21262d',
  border: '#30363d',
  text: '#c9d1d9',
  dim: '#8b949e',
  accent: ACCENT,
  good: '#2ea043',
  bad: '#f85149',
  warn: '#d29922',
  info: '#58a6ff',
};

const LIGHT = {
  bg: '#ffffff',
  panel: '#f9fafb',
  panelAlt: '#f3f4f6',
  border: '#e5e7eb',
  text: '#111827',
  dim: '#6b7280',
  accent: ACCENT,
  good: '#16a34a',
  bad: '#dc2626',
  warn: '#d97706',
  info: '#2563eb',
};

export function useTokens() {
  const { theme } = useTheme();
  return theme === 'dark' ? DARK : LIGHT;
}
