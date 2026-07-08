import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useTokens, ACCENT } from '../../theme';
import { Globe, Play, User, Clock } from 'lucide-react';

export default function CommunityHub() {
  const t = useTokens();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCases = async () => {
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
          collection(db, 'customCases'),
          where('isPublished', '==', true)
        );
        const snapshot = await getDocs(q);
        const results = [];
        snapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        
        if (isMounted) {
          // Sort client-side to avoid needing a composite index immediately for (isPublished + createdAt)
          results.sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeB - timeA;
          });
          setCases(results);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to fetch community cases", err);
        if (isMounted) {
          setError('Could not load community cases. ' + err.message);
          setLoading(false);
        }
      }
    };

    fetchCases();
    return () => { isMounted = false; };
  }, []);

  const handlePlay = (caseId) => {
    // Reload the app with the specific case ID in the URL to inject it into CaseContext
    window.location.href = `/?evaluate=${caseId}`;
  };

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
            <Globe size={24} color={ACCENT} /> Community Hub
          </h2>
          <p style={{ color: t.dim, margin: 0, fontSize: '14px' }}>
            Discover and play custom product management scenarios built by other players in the PMverse Creator Studio.
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: t.dim, padding: '40px' }}>Loading community cases...</div>
        ) : error ? (
          <div style={{ textAlign: 'center', color: '#ef4444', padding: '40px' }}>{error}</div>
        ) : cases.length === 0 ? (
          <div style={{ textAlign: 'center', color: t.dim, padding: '40px' }}>
            No community cases published yet. Be the first to build one in PMverse Admin!
          </div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '24px' 
          }}>
            {cases.map((c) => (
              <div key={c.id} style={{
                backgroundColor: t.bg,
                border: `1px solid ${t.border}`,
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s',
                cursor: 'default'
              }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 600, color: t.text }}>
                      {c.meta?.title || 'Untitled Case'}
                    </h3>
                    <span style={{ 
                      backgroundColor: 'rgba(79, 70, 229, 0.1)', 
                      color: '#4f46e5', 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '11px', 
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}>
                      {c.meta?.company || 'Startup'}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '14px', color: t.dim, lineHeight: 1.5 }}>
                    {c.meta?.tagline || 'A product management challenge.'}
                  </p>
                </div>

                <div style={{ flex: 1 }}></div>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px', 
                  borderTop: `1px solid ${t.border}`, 
                  paddingTop: '16px',
                  fontSize: '12px',
                  color: t.dim
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={14} />
                    <span>Created by <strong style={{ color: t.text }}>{c.authorName || 'Anonymous'}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={14} />
                    <span>{c.createdAt ? new Date(c.createdAt.seconds * 1000).toLocaleDateString() : 'Recently'}</span>
                  </div>
                  
                  <button 
                    onClick={() => handlePlay(c.id)}
                    style={{
                      width: '100%',
                      marginTop: '8px',
                      padding: '10px 16px',
                      backgroundColor: ACCENT,
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <Play size={16} fill="currentColor" /> Play Case
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
