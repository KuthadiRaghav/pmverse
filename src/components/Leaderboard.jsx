import React, { useState, useEffect } from 'react';
import { useTokens, ACCENT } from '../theme';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { rankFor } from '../case/engine';
import { Trophy, TrendingUp, Users, Target, Database, BrainCircuit, Medal } from 'lucide-react';

const TABS = [
  { id: 'totalXP', label: 'Top Talent', icon: Trophy, field: 'totalXP' },
  { id: 'Analytics', label: 'Top Analysts', icon: Database, field: 'dimensions.Analytics' },
  { id: 'Strategy', label: 'Master Strategists', icon: Target, field: 'dimensions.Strategy' },
  { id: 'Communication', label: 'Top Negotiators', icon: Users, field: 'dimensions.Communication' },
  { id: 'Leadership', label: 'Natural Leaders', icon: TrendingUp, field: 'dimensions.Leadership' },
  { id: 'Discovery', label: 'Master Researchers', icon: BrainCircuit, field: 'dimensions.Discovery' }
];

export default function Leaderboard() {
  const t = useTokens();
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchLeaders = async () => {
      if (!db) {
        if (isMounted) {
          setError('Database not connected.');
          setLoading(false);
        }
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const q = query(
          collection(db, 'users'),
          orderBy(activeTab.field, 'desc'),
          limit(50)
        );
        const snapshot = await getDocs(q);
        const results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        if (isMounted) {
          setLeaders(results);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
        if (isMounted) {
          setError('Could not load the leaderboard. Note: The database requires an index for this specific dimension to be built on the Firebase console first.');
          setLoading(false);
        }
      }
    };

    fetchLeaders();
    return () => { isMounted = false; };
  }, [activeTab]);

  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: t.bg, color: t.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'flex', flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        padding: '24px 32px', borderBottom: `1px solid ${t.border}`,
        display: 'flex', flexDirection: 'column', gap: '16px'
      }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Trophy size={24} color={ACCENT} /> NovaRank
          </h2>
          <p style={{ color: t.dim, margin: 0, fontSize: '14px' }}>
            The global PMverse leaderboard. Ranks are based on evidence gathered, models built, and decisions made.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {TABS.map((tab) => {
            const isActive = activeTab.id === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '8px 16px', borderRadius: '20px', border: 'none',
                  background: isActive ? ACCENT : 'transparent',
                  color: isActive ? '#fff' : t.dim,
                  fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  transition: 'all 0.2s', whiteSpace: 'nowrap'
                }}
              >
                <Icon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Leaderboard Table */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 32px' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: t.dim }}>Loading ranks...</div>
        ) : error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>{error}</div>
        ) : leaders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: t.dim }}>No rankings available yet. Clock in and finish your first case!</div>
        ) : (
          <div style={{ paddingTop: '16px', paddingBottom: '32px' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '60px 1fr 1fr 120px',
              padding: '12px 16px', borderBottom: `1px solid ${t.border}`,
              color: t.dim, fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              <div>Rank</div>
              <div>Player</div>
              <div>Title</div>
              <div style={{ textAlign: 'right' }}>Score</div>
            </div>

            {leaders.map((leader, idx) => {
              const value = activeTab.id === 'totalXP' 
                ? leader.totalXP 
                : (leader.dimensions?.[activeTab.id] || 0);
              
              return (
                <div key={leader.id} style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr 1fr 120px',
                  padding: '16px', borderBottom: `1px solid ${t.border}`,
                  alignItems: 'center', fontSize: '14px',
                  backgroundColor: idx === 0 ? 'rgba(234, 179, 8, 0.05)' : 'transparent'
                }}>
                  <div style={{ 
                    fontWeight: 700, 
                    color: idx === 0 ? '#eab308' : idx === 1 ? '#9ca3af' : idx === 2 ? '#b45309' : t.text 
                  }}>
                    {idx === 0 ? <Medal size={18} color="#eab308" /> : `#${idx + 1}`}
                  </div>
                  <div style={{ fontWeight: 600, color: t.text }}>
                    {leader.displayName || 'Anonymous PM'}
                  </div>
                  <div style={{ color: t.dim }}>
                    {rankFor(leader.totalXP || 0)}
                  </div>
                  <div style={{ textAlign: 'right', fontWeight: 700, color: ACCENT, fontFamily: 'monospace', fontSize: '15px' }}>
                    {value.toLocaleString()} XP
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
