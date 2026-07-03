import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../ThemeContext';

const PORTFOLIO_DATA = [
  { name: 'Core Product', risk: 20, reward: 50, size: 400, fill: '#3b82f6' },
  { name: 'AI Features', risk: 80, reward: 90, size: 250, fill: '#8b5cf6' },
  { name: 'Mobile App', risk: 40, reward: 60, size: 300, fill: '#10b981' },
  { name: 'Legacy API', risk: 10, reward: 20, size: 150, fill: '#6b7280' },
  { name: 'Enterprise Portal', risk: 50, reward: 80, size: 350, fill: '#f59e0b' }
];

const CustomTooltip = ({ active, payload }) => {
  const { theme } = useTheme();
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{
        backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
        border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
        padding: '12px',
        borderRadius: '8px',
        color: theme === 'dark' ? '#f3f4f6' : '#111827',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{data.name}</h4>
        <p style={{ margin: '0', fontSize: '14px' }}>Risk (x): {data.risk}</p>
        <p style={{ margin: '0', fontSize: '14px' }}>Reward (y): {data.reward}</p>
      </div>
    );
  }
  return null;
};

export default function PortfolioMap() {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? '#9ca3af' : '#4b5563';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';
  
  return (
    <div style={{ flex: 1, minHeight: 0, position: 'relative', padding: '24px', boxSizing: 'border-box', backgroundColor: theme === 'dark' ? '#0d1117' : '#ffffff' }}>
      <h2 style={{ margin: '0 0 16px 0', color: theme === 'dark' ? '#ffffff' : '#111827' }}>Product Portfolio Strategy</h2>
      <p style={{ color: textColor, marginBottom: '24px' }}>Analyze the Risk vs Reward balance across active product initiatives.</p>
      
      <div style={{ width: '100%', height: 'calc(100% - 80px)' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />
            <XAxis type="number" dataKey="risk" name="Risk" stroke={textColor} label={{ value: 'Risk →', position: 'insideBottomRight', offset: -10, fill: textColor }} />
            <YAxis type="number" dataKey="reward" name="Reward" stroke={textColor} label={{ value: 'Reward', angle: -90, position: 'insideLeft', fill: textColor }} />
            <ZAxis type="number" dataKey="size" range={[50, 400]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Products" data={PORTFOLIO_DATA} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
