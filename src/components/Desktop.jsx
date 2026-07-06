import React, { useState, useEffect, useRef } from 'react';
import Window from './Window';
import SqlConsole from './SqlConsole';
import NovaSheets from './NovaSheets';
import SprintBoard from './SprintBoard';
import PMAcademy from './PMAcademy';
import NovaIDE from './NovaIDE';
import PortfolioMap from './PortfolioMap';
import DecisionCenter from './DecisionCenter';
import GrowthSAT from './GrowthSAT';
import NovaMail from './NovaMail';
import NovaChat from './NovaChat';
import NovaMetrics from './NovaMetrics';
import Artifacts from './Artifacts';
import CareerProfile from './CareerProfile';
import PromptLab from './PromptLab';

import FileExplorer from './FileExplorer';
import desktopBg from '../assets/desktop_bg.jpg';
import Readme, { ONBOARD_KEY } from './Readme';
import { useTheme } from '../ThemeContext';
import { useCase } from '../case/CaseContext';
import { useAuth } from '../auth/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, Moon, Sun, Trophy, Flame, 
  Mail, MessageSquare, BarChart2, Folder, User, FlaskConical, 
  PenTool, GraduationCap, Table, Layout, MessageCircle, Database, Map, 
  Terminal as TerminalIcon, FileText, Trash2, HardDrive
} from 'lucide-react';
import { getStreak } from '../academyProgress';
import { playPop, playSwoosh, playChime } from '../soundEngine';

export const APPS = [
  { id: 'win-mail', title: 'NovaMail', Component: NovaMail, defaultSize: { w: 800, h: 600 } },
  { id: 'win-chat', title: 'NovaChat', Component: NovaChat, defaultSize: { w: 400, h: 600 } },
  { id: 'win-metrics', title: 'NovaMetrics', Component: NovaMetrics, defaultSize: { w: 900, h: 600 } },
  { id: 'win-artifacts', title: 'Portfolio', Component: Artifacts, defaultSize: { w: 750, h: 550 } },
  { id: 'win-career', title: 'Career', Component: CareerProfile, defaultSize: { w: 400, h: 600 } },
  { id: 'win-promptlab', title: 'PromptLab', Component: PromptLab, defaultSize: { w: 850, h: 650 } },
  { id: 'win-academy', title: 'PM Academy', Component: PMAcademy, defaultSize: { w: 800, h: 600 } },
  { id: 'win-sheets', title: 'NovaSheets', Component: NovaSheets, defaultSize: { w: 900, h: 600 } },
  { id: 'win-sprint', title: 'Sprint Board', Component: SprintBoard, defaultSize: { w: 900, h: 600 } },
  { id: 'win-decide', title: 'Decision Center', Component: DecisionCenter, defaultSize: { w: 600, h: 700 } },
  { id: 'win-sql', title: 'NovaData SQL', Component: SqlConsole, defaultSize: { w: 850, h: 600 } },
  { id: 'win-portfolio', title: 'Portfolio Map', Component: PortfolioMap, defaultSize: { w: 900, h: 600 } },
  { id: 'win-ide', title: 'NovaCode IDE', Component: NovaIDE, defaultSize: { w: 900, h: 600 } },
  { id: 'win-drive', title: 'Company Drive', Component: FileExplorer, defaultSize: { w: 850, h: 600 } },
  { id: 'win-readme', title: 'README.md', Component: Readme, defaultSize: { w: 750, h: 700 } }
];

export default function Desktop() {
  const { theme, toggleTheme } = useTheme();
  const { unreadCount, unreadChatCount, rank, totalXP, toasts, dismissToast, state } = useCase();
  const { currentUser, logout } = useAuth();
  
  const hasCheckedOnboard = useRef(false);
  const [openWindows, setOpenWindows] = useState([]);

  useEffect(() => {
    if (!currentUser || hasCheckedOnboard.current) return;
    hasCheckedOnboard.current = true;
    const userKey = `${ONBOARD_KEY}_${currentUser.uid}`;
    try {
      if (!localStorage.getItem(userKey)) {
        setOpenWindows(prev => [...prev, 'win-readme']);
      }
    } catch {}
  }, [currentUser]);

  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [contextMenu, setContextMenu] = useState({ open: false, x: 0, y: 0 });
  const [showIcons, setShowIcons] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleGlobalClick = () => {
      setActiveMenu(null);
      if (contextMenu.open) setContextMenu(prev => ({ ...prev, open: false }));
    };
    if (activeMenu || contextMenu.open) {
      window.addEventListener('click', handleGlobalClick);
    }
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [activeMenu, contextMenu.open]);

  const focusWindow = (id) => {
    setOpenWindows(prev => {
      if (!prev.includes(id)) return prev;
      const filtered = prev.filter(w => w !== id);
      return [...filtered, id];
    });
    setMinimizedWindows(prev => prev.filter(w => w !== id));
  };

  const minimizeWindow = (id) => {
    playSwoosh();
    setMinimizedWindows(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const closeWindow = (id) => {
    playSwoosh();
    setOpenWindows(prev => prev.filter(w => w !== id));
    setMinimizedWindows(prev => prev.filter(w => w !== id));
  };

  const lastToggleTime = useRef(0);

  const toggleWindow = (id) => {
    const now = Date.now();
    if (now - lastToggleTime.current < 300) return; // Prevent double-click flicker
    lastToggleTime.current = now;

    const isOpen = openWindows.includes(id);
    const isMinimized = minimizedWindows.includes(id);
    const isFocused = openWindows[openWindows.length - 1] === id && !isMinimized;

    if (!isOpen) {
      playPop();
      setOpenWindows(prev => [...prev, id]);
      setMinimizedWindows(prev => prev.filter(w => w !== id));
    } else if (isMinimized || !isFocused) {
      playPop();
      focusWindow(id);
    } else {
      minimizeWindow(id);
    }
  };

  // Case Engine apps (e.g. a NovaMail CTA) can request a window via DOM event
  useEffect(() => {
    const handler = (e) => {
      const id = e.detail;
      setOpenWindows(prev => prev.includes(id)
        ? [...prev.filter(w => w !== id), id] // focus
        : [...prev, id]                        // open
      );
    };
    window.addEventListener('pmverse:open-app', handler);
    return () => window.removeEventListener('pmverse:open-app', handler);
  }, []);

  // Cmd+K / Ctrl+K app switcher
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
        setPaletteQuery('');
      }
      if (e.key === 'Escape') setPaletteOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activeWindows = openWindows;

  const renderDropdown = (menuName, items, alignRight = false) => {
    if (activeMenu !== menuName) return null;
    return (
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '32px',
          left: alignRight ? 'auto' : 0,
          right: alignRight ? 0 : 'auto',
          backgroundColor: theme === 'dark' ? 'rgba(22, 27, 34, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`,
          borderRadius: '6px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          padding: '4px',
          minWidth: '200px',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          color: theme === 'dark' ? '#c9d1d9' : '#111827',
          fontWeight: 400
        }}
      >
        {items.map((item, i) => {
          if (item === 'divider') {
            return <div key={i} style={{ height: '1px', backgroundColor: theme === 'dark' ? '#30363d' : '#e5e7eb', margin: '4px 0' }} />;
          }
          return (
            <div 
              key={i}
              onClick={() => {
                if (item.disabled) return;
                setActiveMenu(null);
                item.action();
              }}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: item.disabled ? 'default' : 'pointer',
                opacity: item.disabled ? 0.5 : 1,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                if (!item.disabled) e.currentTarget.style.backgroundColor = theme === 'dark' ? '#30363d' : '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <span>{item.label}</span>
              {item.shortcut && <span style={{ opacity: 0.6, fontSize: '11px' }}>{item.shortcut}</span>}
            </div>
          );
        })}
      </div>
    );
  };

  const menuStyle = (menuName) => ({
    padding: '4px 8px', borderRadius: '4px', cursor: 'pointer',
    backgroundColor: activeMenu === menuName ? (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)') : 'transparent',
    color: theme === 'dark' ? '#c9d1d9' : '#111827',
    position: 'relative'
  });

  const handleMenuEnter = (menuName) => {
    if (activeMenu && activeMenu !== menuName) setActiveMenu(menuName);
  };

  return (
    <div 
      onContextMenu={(e) => {
        // Prevent default browser menu and show our custom context menu
        e.preventDefault();
        setContextMenu({ open: true, x: e.clientX, y: e.clientY });
      }}
      style={{
      width: '100vw', height: '100vh',
      backgroundColor: theme === 'dark' ? '#2a2723' : '#eae6df',
      backgroundImage: theme === 'dark' 
        ? `linear-gradient(rgba(22, 27, 34, 0.7), rgba(22, 27, 34, 0.7)), url(${desktopBg})` 
        : `url(${desktopBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      overflow: 'hidden',
      color: theme === 'dark' ? '#c9d1d9' : '#111827'
    }}>
      {/* Desktop Background Logo (Removed for PostHog style) */}

      {/* Global OS Top Bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '36px',
        backgroundColor: theme === 'dark' ? 'rgba(49, 45, 40, 0.9)' : 'rgba(244, 240, 234, 0.9)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', fontSize: '13px', borderBottom: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`,
        fontWeight: 500, boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div 
            style={{ ...menuStyle('pmverse'), fontWeight: 800 }}
            onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'pmverse' ? null : 'pmverse'); }}
            onMouseEnter={() => handleMenuEnter('pmverse')}
          >
            PMverse
            {renderDropdown('pmverse', [
              { label: 'About PMverse', action: () => alert('PMverse OS v1.0.0') },
              'divider',
              { label: 'Lock Screen', disabled: true, shortcut: '^⌘Q' }
            ])}
          </div>
          {!isMobile && (
            <>
              <div 
                style={menuStyle('file')}
                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'file' ? null : 'file'); }}
                onMouseEnter={() => handleMenuEnter('file')}
              >
                File
                {renderDropdown('file', [
                  { label: 'Close All Windows', action: () => { setOpenWindows([]); setMinimizedWindows([]); }, shortcut: '⇧⌘W' },
                  { label: 'Minimize All', action: () => { setMinimizedWindows([...openWindows]); }, shortcut: '⌥⌘M' },
                  'divider',
                  { label: 'Restart System', action: () => window.location.reload() }
                ])}
              </div>
              <div 
                style={menuStyle('edit')}
                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'edit' ? null : 'edit'); }}
                onMouseEnter={() => handleMenuEnter('edit')}
              >
                Edit
                {renderDropdown('edit', [
                  { label: 'Undo', disabled: true, shortcut: '⌘Z' },
                  { label: 'Redo', disabled: true, shortcut: '⇧⌘Z' },
                  'divider',
                  { label: 'Cut', disabled: true, shortcut: '⌘X' },
                  { label: 'Copy', disabled: true, shortcut: '⌘C' },
                  { label: 'Paste', disabled: true, shortcut: '⌘V' }
                ])}
              </div>
              <div 
                style={menuStyle('view')}
                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'view' ? null : 'view'); }}
                onMouseEnter={() => handleMenuEnter('view')}
              >
                View
                {renderDropdown('view', [
                  { label: `Toggle ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, action: toggleTheme },
                  'divider',
                  { label: 'Enter Full Screen', action: () => document.documentElement.requestFullscreen().catch(() => {}) }
                ])}
              </div>
              <div 
                style={menuStyle('help')}
                onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'help' ? null : 'help'); }}
                onMouseEnter={() => handleMenuEnter('help')}
              >
                Help
                {renderDropdown('help', [
                  { label: 'Open PM Academy', action: () => toggleWindow('win-academy') },
                  'divider',
                  { label: 'Report Issue...', action: () => alert('Please contact support.') }
                ])}
              </div>
            </>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8957e5', fontWeight: 600 }}>
            <Trophy size={14} /> {rank} · {totalXP} XP
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#d97706', fontWeight: 600 }}>
            <Flame size={14} /> {getStreak()}-day streak
          </div>
          <div style={{ width: '1px', height: '16px', backgroundColor: theme === 'dark' ? '#30363d' : '#e5e7eb', margin: '0 4px' }} />
          
          <Search size={16} style={{ cursor: 'pointer', color: theme === 'dark' ? '#c9d1d9' : '#111827' }} onClick={() => setPaletteOpen(true)} />
          <div style={{ position: 'relative' }}>
            <div 
              style={{ ...menuStyle('notifications'), display: 'flex', alignItems: 'center', padding: '6px 8px' }}
              onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'notifications' ? null : 'notifications'); }}
            >
              <Bell size={14} style={{ color: theme === 'dark' ? '#c9d1d9' : '#111827' }} />
              {unreadCount > 0 && <div style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: 3, backgroundColor: '#ef4444' }} />}
            </div>
            {renderDropdown('notifications', 
              unreadCount > 0 || toasts.length > 0
                ? [
                    ...toasts.map(t => ({ label: `Toast: ${t.title || 'Notification'}`, action: () => dismissToast(t.id) })),
                    unreadCount > 0 ? { label: `Open NovaMail (${unreadCount} unread)`, action: () => toggleWindow('win-mail') } : 'divider',
                    unreadChatCount > 0 ? { label: `Open NovaChat (${unreadChatCount} unread)`, action: () => toggleWindow('win-chat') } : 'divider'
                  ].filter(i => i !== 'divider')
                : [{ label: 'No new notifications', disabled: true }],
              true // alignRight
            )}
          </div>
          <div onClick={toggleTheme} style={{ cursor: 'pointer', color: theme === 'dark' ? '#c9d1d9' : '#111827' }}>
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </div>
          
          <div style={{ position: 'relative' }}>
            <div 
              style={{ ...menuStyle('profile'), display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'profile' ? null : 'profile'); }}
            >
              <User size={14} style={{ color: theme === 'dark' ? '#c9d1d9' : '#111827' }} />
              <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: 600 }}>
                {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'My Profile'}
              </span>
            </div>
            {renderDropdown('profile', [
              { label: currentUser?.email ? `Signed in as ${currentUser.email}` : 'Signed in', disabled: true },
              'divider',
              { label: 'Career Profile', action: () => toggleWindow('win-career') },
              'divider',
              { label: 'Sign Out', action: logout }
            ], true)}
          </div>

          <span style={{ color: theme === 'dark' ? '#c9d1d9' : '#111827', fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>


      {/* Desktop Icons */}
      {showIcons && (() => {
        const icons = [
          // Left Column
          { id: 'icon-drive', title: 'Company Drive', icon: <HardDrive size={28} color="#f59e0b" />, type: 'app', appId: 'win-drive', side: 'left' },
          { id: 'icon-mail', title: 'NovaMail', icon: <Mail size={28} color="#8b5cf6" />, type: 'app', appId: 'win-mail', side: 'left' },
          { id: 'icon-chat', title: 'NovaChat', icon: <MessageSquare size={28} color="#ec4899" />, type: 'app', appId: 'win-chat', side: 'left' },
          { id: 'icon-metrics', title: 'NovaMetrics', icon: <BarChart2 size={28} color="#0369a1" />, type: 'app', appId: 'win-metrics', side: 'left' },
          { id: 'icon-artifacts', title: 'Portfolio', icon: <Folder size={28} color="#a855f7" />, type: 'app', appId: 'win-artifacts', side: 'left' },
          { id: 'icon-career', title: 'Career', icon: <User size={28} color="#f97316" />, type: 'app', appId: 'win-career', side: 'left' },
          { id: 'icon-promptlab', title: 'PromptLab', icon: <FlaskConical size={28} color="#84cc16" />, type: 'app', appId: 'win-promptlab', side: 'left' },
          
          // Right Column
          { id: 'icon-readme', title: 'README.md', icon: <FileText size={28} color="#f59e0b" />, type: 'app', appId: 'win-readme', side: 'right' },
          { id: 'icon-academy', title: 'PM Academy', icon: <GraduationCap size={28} color="#6d28d9" />, type: 'app', appId: 'win-academy', side: 'right' },
          { id: 'icon-sheets', title: 'NovaSheets', icon: <Table size={28} color="#10b981" />, type: 'app', appId: 'win-sheets', side: 'right' },
          { id: 'icon-sprint', title: 'Sprint Board', icon: <Layout size={28} color="#3b82f6" />, type: 'app', appId: 'win-sprint', side: 'right' },
          { id: 'icon-decide', title: 'Decision Center', icon: <MessageCircle size={28} color="#ef4444" />, type: 'app', appId: 'win-decide', side: 'right' },
          { id: 'icon-sql', title: 'NovaData SQL', icon: <Database size={28} color="#14b8a6" />, type: 'app', appId: 'win-sql', side: 'right' },
          { id: 'icon-portfolio', title: 'Portfolio Map', icon: <Map size={28} color="#6366f1" />, type: 'app', appId: 'win-portfolio', side: 'right' },
          { id: 'icon-ide', title: 'NovaCode IDE', icon: <TerminalIcon size={28} color="#374151" />, type: 'app', appId: 'win-ide', side: 'right' },
          { id: 'icon-trash', title: 'Trash', icon: <Trash2 size={28} color="#6b7280" />, type: 'trash', side: 'right' }
        ];

        let leftCount = 0;
        let rightCount = 0;
        const VERTICAL_SPACING = 85;
        const TOP_MARGIN = 60;
        const MARGIN_X = 20;
        const GRID_COLS = isMobile ? Math.floor(window.innerWidth / 90) : 0;

        return icons.map((icon, index) => {
          let x, y;
          
          if (isMobile) {
            // Grid layout for mobile
            const col = index % GRID_COLS;
            const row = Math.floor(index / GRID_COLS);
            const gridSpacingX = window.innerWidth / GRID_COLS;
            x = (col * gridSpacingX) + (gridSpacingX / 2) - 36; // Center icon in its grid cell (36 is half of 72px)
            y = TOP_MARGIN + (row * VERTICAL_SPACING);
          } else {
            // Edge layout for desktop
            if (icon.side === 'left') {
              x = MARGIN_X;
              y = TOP_MARGIN + (leftCount * VERTICAL_SPACING);
              leftCount++;
            } else {
              x = window.innerWidth - MARGIN_X - 72; // 72 is icon container width
              y = TOP_MARGIN + (rightCount * VERTICAL_SPACING);
              rightCount++;
            }
          }

          return (
            <motion.div
              key={icon.id}
              drag
              dragMomentum={false}
              onClick={(e) => {
                e.stopPropagation();
                playPop();
                if (icon.type === 'app') toggleWindow(icon.appId);
                else if (icon.type === 'file') toggleWindow('win-ide');
                else if (icon.type === 'trash') alert('Trash is empty!');
              }}
              style={{
                position: 'absolute', top: y, left: x,
                width: '72px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                cursor: 'pointer', zIndex: 5
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={{
                width: '56px', height: '56px',
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.6)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
                borderRadius: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                boxShadow: theme === 'dark' ? '0 4px 12px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.05)',
                backdropFilter: 'blur(10px)'
              }}>
                {icon.icon}
                {/* Notification Badges */}
                {icon.appId === 'win-mail' && unreadCount > 0 && (
                  <div style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    minWidth: '20px', height: '20px', padding: '0 5px',
                    borderRadius: '10px', backgroundColor: '#ef4444', color: '#fff',
                    fontSize: '12px', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                  }}>
                    {unreadCount}
                  </div>
                )}
                {icon.appId === 'win-chat' && unreadChatCount > 0 && (
                  <div style={{
                    position: 'absolute', top: '-6px', right: '-6px',
                    minWidth: '20px', height: '20px', padding: '0 5px',
                    borderRadius: '10px', backgroundColor: '#ef4444', color: '#fff',
                    fontSize: '12px', fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.4)'
                  }}>
                    {unreadChatCount}
                  </div>
                )}
                {activeWindows.includes(icon.appId) && (
                  <div style={{ position: 'absolute', bottom: '-8px', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: theme === 'dark' ? '#c9d1d9' : '#111827' }} />
                )}
                {/* Pulsing Coachmark for NovaMail before reading first email */}
                {icon.id === 'icon-mail' && state.stage === 'arrival' && (
                  <motion.div
                    animate={{ boxShadow: ['0 0 0 0px rgba(137,87,229,0.8)', '0 0 0 20px rgba(137,87,229,0)'] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    style={{ position: 'absolute', inset: -2, borderRadius: '16px', border: '2px solid #8957e5', pointerEvents: 'none' }}
                  />
                )}
              </div>
              <span style={{
                fontSize: '11px', fontWeight: 500, textAlign: 'center',
                color: theme === 'dark' ? '#fff' : '#111827',
                textShadow: theme === 'dark' ? '0 1px 2px rgba(0,0,0,0.8)' : 'none'
              }}>
                {icon.title}
              </span>
            </motion.div>
          );
        });
      })()}

      {/* Zeigarnik Effect Checklist Widget */}
      {!state.decision && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            position: 'absolute', bottom: '24px', right: '120px', width: '280px',
            backgroundColor: theme === 'dark' ? 'rgba(22, 27, 34, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`,
            borderRadius: '12px', padding: '16px', zIndex: 100,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }}
        >
          <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '12px', color: theme === 'dark' ? '#c9d1d9' : '#111827', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📝</span> First Day Checklist
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: theme === 'dark' ? '#8b949e' : '#6b7280' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'line-through', opacity: 0.5 }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', backgroundColor: '#8957e5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px' }}>✓</div>
              Boot up workspace
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: state.stage !== 'arrival' ? 'line-through' : 'none', opacity: state.stage !== 'arrival' ? 0.5 : 1 }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1px solid ${state.stage !== 'arrival' ? '#8957e5' : (theme === 'dark' ? '#30363d' : '#e5e7eb')}`, backgroundColor: state.stage !== 'arrival' ? '#8957e5' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px' }}>{state.stage !== 'arrival' && '✓'}</div>
              Read your first email
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '4px', border: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
              Make your first decision
            </div>
          </div>
        </motion.div>
      )}

      {/* Custom Context Menu */}
      <AnimatePresence>
        {contextMenu.open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            style={{
              position: 'absolute', top: contextMenu.y, left: contextMenu.x, width: '200px',
              backgroundColor: theme === 'dark' ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)', border: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`,
              borderRadius: '8px', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', padding: '6px', zIndex: 9999,
              display: 'flex', flexDirection: 'column', gap: '2px'
            }}
          >
            {[
              { label: 'Change Wallpaper', action: toggleTheme },
              { label: showIcons ? 'Hide Desktop Icons' : 'Show Desktop Icons', action: () => setShowIcons(!showIcons) },
              'divider',
              { label: 'New Window', action: () => toggleWindow('win-ide') }
            ].map((item, i) => item === 'divider' ? (
              <div key={i} style={{ height: '1px', backgroundColor: theme === 'dark' ? '#30363d' : '#e5e7eb', margin: '4px 0' }} />
            ) : (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); setContextMenu({ open: false, x: 0, y: 0 }); item.action(); }}
                style={{
                  padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px',
                  color: theme === 'dark' ? '#c9d1d9' : '#111827'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme === 'dark' ? '#238636' : '#2563eb';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme === 'dark' ? '#c9d1d9' : '#111827';
                }}
              >
                {item.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render Open Windows */}
      {openWindows.map((winId, index) => {
        const app = APPS.find(a => a.id === winId);
        if (!app) return null;
        
        const zIndex = 10 + index;
        const isFocused = index === openWindows.length - 1;

        if (winId === 'win-readme') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={750} initialHeight={700} x={150} y={50} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <Readme />
            </Window>
          );
        }

        if (winId === 'win-drive') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={850} initialHeight={600} x={150} y={150} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <FileExplorer />
            </Window>
          );
        }

        if (winId === 'win-mail') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={860} initialHeight={580} x={120} y={60} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <NovaMail />
            </Window>
          );
        }

        if (winId === 'win-chat') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={750} initialHeight={500} x={140} y={80} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <NovaChat />
            </Window>
          );
        }

        if (winId === 'win-metrics') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={780} initialHeight={560} x={180} y={70} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <NovaMetrics />
            </Window>
          );
        }

        if (winId === 'win-artifacts') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={860} initialHeight={560} x={160} y={90} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <Artifacts />
            </Window>
          );
        }

        if (winId === 'win-career') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={720} initialHeight={600} x={220} y={50} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <CareerProfile />
            </Window>
          );
        }

        if (winId === 'win-promptlab') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={780} initialHeight={620} x={190} y={60} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <PromptLab />
            </Window>
          );
        }

        if (winId === 'win-sql') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={800} initialHeight={500} x={100} y={100} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <SqlConsole />
            </Window>
          );
        }

        if (winId === 'win-sheets') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={900} initialHeight={600} x={150} y={150} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <NovaSheets />
            </Window>
          );
        }

        if (winId === 'win-sprint') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={800} initialHeight={500} x={200} y={200} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <SprintBoard />
            </Window>
          );
        }

        if (winId === 'win-academy') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={900} initialHeight={600} x={80} y={80} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <PMAcademy />
            </Window>
          );
        }

        if (winId === 'win-ide') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={1000} initialHeight={700} x={150} y={100} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <NovaIDE />
            </Window>
          );
        }
        if (winId === 'win-portfolio') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={800} initialHeight={550} x={150} y={150} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <PortfolioMap />
            </Window>
          );
        }

        if (winId === 'win-decide') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={500} initialHeight={600} x={300} y={100} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <DecisionCenter />
            </Window>
          );
        }

        if (winId === 'win-sat') {
          return (
            <Window key={winId} title={app.title} onClose={() => closeWindow(winId)} onMinimize={() => minimizeWindow(winId)} isMinimized={minimizedWindows.includes(winId)} initialWidth={700} initialHeight={500} x={100} y={100} zIndex={zIndex} isFocused={isFocused} onFocus={() => focusWindow(winId)}>
              <GrowthSAT />
            </Window>
          );
        }

        return null;
      })}

      {/* The Dock has been removed in favor of edge Desktop Icons */}

      {/* Notification toasts */}
      <div style={{ position: 'fixed', top: '48px', left: '50%', transform: 'translateX(-50%)', zIndex: 400, display: 'flex', flexDirection: 'column', gap: '10px', width: '320px' }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            onClick={() => {
              setOpenWindows(prev => prev.includes(t.appId) ? [...prev.filter(w => w !== t.appId), t.appId] : [...prev, t.appId]);
              dismissToast(t.id);
            }}
            style={{
              display: 'flex', gap: '10px', alignItems: 'flex-start', cursor: 'pointer',
              backgroundColor: theme === 'dark' ? 'rgba(22,27,34,0.95)' : 'rgba(255,255,255,0.97)',
              borderTop: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`,
              borderRight: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`,
              borderBottom: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`,
              borderLeft: '3px solid #8957e5',
              borderRadius: '12px', padding: '12px 14px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              color: theme === 'dark' ? '#c9d1d9' : '#111827',
              animation: 'pmverse-toast-in 0.25s ease',
            }}
          >
            <span style={{ fontSize: '18px' }}>{t.icon}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '13px', fontWeight: 700 }}>{t.title}</div>
              <div style={{ fontSize: '12px', color: theme === 'dark' ? '#8b949e' : '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.body}</div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); dismissToast(t.id); }}
              style={{ background: 'none', border: 'none', color: theme === 'dark' ? '#8b949e' : '#6b7280', cursor: 'pointer', fontSize: '14px', padding: 0 }}
            >✕</button>
          </div>
        ))}
      </div>
      <style>{`@keyframes pmverse-toast-in { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>

      {/* Cmd+K app switcher */}
      {paletteOpen && (
        <div
          onClick={() => setPaletteOpen(false)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 500, display: 'flex', justifyContent: 'center', paddingTop: '18vh' }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{
            width: '440px', height: 'fit-content',
            backgroundColor: theme === 'dark' ? '#161b22' : '#ffffff',
            border: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`,
            borderRadius: '14px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', overflow: 'hidden',
          }}>
            <input
              autoFocus
              value={paletteQuery}
              onChange={(e) => setPaletteQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const match = APPS.find(a => a.title.toLowerCase().includes(paletteQuery.toLowerCase()));
                  if (match) {
                    setOpenWindows(prev => prev.includes(match.id) ? [...prev.filter(w => w !== match.id), match.id] : [...prev, match.id]);
                    setPaletteOpen(false);
                  }
                }
              }}
              placeholder="Open app… (Enter to launch)"
              style={{
                width: '100%', padding: '14px 16px', border: 'none', outline: 'none', boxSizing: 'border-box',
                backgroundColor: 'transparent', fontSize: '15px',
                color: theme === 'dark' ? '#c9d1d9' : '#111827',
                borderBottom: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}`,
              }}
            />
            <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {APPS.filter(a => a.title.toLowerCase().includes(paletteQuery.toLowerCase())).map(a => (
                <div
                  key={a.id}
                  onClick={() => {
                    setOpenWindows(prev => prev.includes(a.id) ? [...prev.filter(w => w !== a.id), a.id] : [...prev, a.id]);
                    setPaletteOpen(false);
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px', cursor: 'pointer',
                    color: theme === 'dark' ? '#c9d1d9' : '#111827', fontSize: '14px',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = theme === 'dark' ? '#21262d' : '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span style={{
                    width: '30px', height: '30px', borderRadius: '8px', background: a.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px',
                    fontFamily: a.isTerminal ? 'monospace' : 'inherit', color: a.isTerminal ? '#00ff00' : 'inherit',
                  }}>{a.isTerminal ? '>_' : a.icon}</span>
                  {a.title}
                  {openWindows.includes(a.id) && <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#8b949e' }}>open</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
