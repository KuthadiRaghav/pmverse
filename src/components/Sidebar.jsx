import React from 'react';
import { useTokens, ACCENT } from '../theme';
import { useCase } from '../case/CaseContext';
import { useAuth } from '../auth/AuthContext';
import { APPS } from './Desktop';
import { 
  Home, Mail, MessageSquare, GraduationCap, LineChart, 
  Database, Briefcase, Map, BarChart2, Calendar, 
  Command, Settings, HelpCircle, ChevronDown, Code, User
} from 'lucide-react';

export default function Sidebar({ activeWindows, onAppClick, minimizeAll }) {
  const t = useTokens();
  const { caseDef, unreadCount, unreadChatCount } = useCase();
  const { currentUser } = useAuth();
  const isDark = t.bg === '#0d1117';

  // The design shows specific navigation. We'll map our APPS to icons.
  const appIcons = {
    'win-mail': Mail,
    'win-chat': MessageSquare,
    'win-academy': GraduationCap,
    'win-sheets': LineChart,
    'win-sql': Database,
    'win-portfolio': Map,
    'win-career': Briefcase,
    'win-metrics': BarChart2,
    'win-artifacts': Calendar, 
    'win-promptlab': Code,
    'win-sprint': User, 
    'win-decide': HelpCircle, 
    'win-sat': BarChart2, 
    'win-ide': Code,
  };

  // We only show a curated list in the main nav to match the design's cleanliness.
  // The rest can be accessed via Cmd+K or the bottom dock if we keep it.
  const navApps = ['win-mail', 'win-chat', 'win-academy', 'win-sheets', 'win-sql', 'win-portfolio', 'win-career'];

  const companyName = caseDef?.meta?.company || 'PMverse';
  const initial = companyName.charAt(0).toUpperCase();

  const getBadge = (id) => {
    if (id === 'win-mail' && unreadCount > 0) return unreadCount;
    if (id === 'win-chat' && unreadChatCount > 0) return unreadChatCount;
    return null;
  };

  const SidebarItem = ({ icon: Icon, label, isActive, badge, onClick }) => {
    const activeBg = isDark ? 'rgba(137,87,229,0.15)' : 'rgba(137,87,229,0.08)';
    const hoverBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
    const textColor = isActive ? ACCENT : t.dim;

    return (
      <button
        onClick={onClick}
        style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          width: '100%', padding: '10px 14px', borderRadius: '10px',
          border: 'none', background: isActive ? activeBg : 'transparent',
          cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s ease',
          marginBottom: '2px', color: textColor, fontWeight: isActive ? 700 : 600,
        }}
        onMouseOver={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = hoverBg;
        }}
        onMouseOut={(e) => {
          if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <Icon size={18} color={isActive ? ACCENT : t.dim} strokeWidth={isActive ? 2.5 : 2} />
        <span style={{ flex: 1, fontSize: '14px' }}>{label}</span>
        {badge != null && (
          <div style={{
            minWidth: '20px', height: '20px', padding: '0 6px',
            borderRadius: '10px', backgroundColor: '#ef4444', color: '#fff',
            fontSize: '11px', fontWeight: 800, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            {badge}
          </div>
        )}
      </button>
    );
  };

  return (
    <div style={{
      width: '260px', height: '100vh', flexShrink: 0,
      backgroundColor: isDark ? '#0d1117' : '#f9fafb',
      borderRight: `1px solid ${t.border}`,
      display: 'flex', flexDirection: 'column',
      padding: '24px 16px', overflowY: 'auto',
      zIndex: 100 // ensure it stays on top of any adjacent artifacts
    }}>
      
      {/* Logo Block */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingLeft: '8px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '10px',
          background: `linear-gradient(135deg, ${ACCENT}, #d946ef)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: '18px', fontWeight: 800,
          boxShadow: '0 4px 12px rgba(137,87,229,0.3)'
        }}>
          {initial}
        </div>
        <div style={{ fontSize: '18px', fontWeight: 800, color: t.text, letterSpacing: '-0.5px' }}>
          {companyName}
        </div>
      </div>

      {/* Main Nav */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SidebarItem 
          icon={Home} label="Home" 
          isActive={activeWindows.length === 0} 
          onClick={minimizeAll} 
        />
        <div style={{ height: '16px' }} /> {/* Spacer */}
        
        {navApps.map(id => {
          const app = APPS.find(a => a.id === id);
          if (!app) return null;
          return (
            <SidebarItem
              key={id}
              icon={appIcons[id] || Code}
              label={app.title}
              isActive={activeWindows.includes(id)}
              badge={getBadge(id)}
              onClick={() => onAppClick(id)}
            />
          );
        })}
      </div>

      {/* Bottom Nav */}
      <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: '16px', marginTop: '16px', display: 'flex', flexDirection: 'column' }}>
        <SidebarItem icon={Command} label="Shortcuts" onClick={() => {}} />
        <SidebarItem icon={Settings} label="Settings" onClick={() => {}} />
        <SidebarItem icon={HelpCircle} label="Help & Support" onClick={() => {}} />
        
        {/* Profile Block */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          padding: '12px', marginTop: '12px', borderRadius: '12px',
          backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
          border: `1px solid ${t.border}`, cursor: 'pointer',
          transition: 'border-color 0.15s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.borderColor = ACCENT}
        onMouseOut={(e) => e.currentTarget.style.borderColor = t.border}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '18px',
            backgroundColor: '#d1d5db', overflow: 'hidden'
          }}>
            {/* DiceBear notionists avatar */}
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${currentUser?.displayName?.split(' ')[0] || 'Alex'}&backgroundColor=transparent`} alt="Avatar" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: t.text }}>{currentUser?.displayName || 'Alex Morgan'}</div>
            <div style={{ fontSize: '11px', color: t.dim }}>Associate PM</div>
          </div>
          <ChevronDown size={16} color={t.dim} />
        </div>
      </div>

    </div>
  );
}
