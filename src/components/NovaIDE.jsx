import React, { useEffect, useRef, useState } from 'react';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import Editor from '@monaco-editor/react';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { 
  Files, Search, GitBranch, PlaySquare, Settings, 
  X, ChevronRight, ChevronDown, FileJson, FileCode2, 
  Terminal as TerminalIcon, LayoutPanelLeft, Box
} from 'lucide-react';
import 'xterm/css/xterm.css';
import { useTheme } from '../ThemeContext';

// Singleton promise for WebContainer
let bootPromise = null;

// Initial File System
const initialFiles = {
  'index.js': {
    file: {
      contents: `import express from 'express';\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Welcome to PMverse OS!');\n});\n\napp.listen(3111, () => {\n  console.log('App is ready at http://localhost:3111');\n});`,
    },
  },
  'package.json': {
    file: {
      contents: `{\n  "name": "pmverse-demo",\n  "type": "module",\n  "dependencies": {\n    "express": "latest",\n    "nodemon": "latest"\n  },\n  "scripts": {\n    "start": "nodemon index.js"\n  }\n}`,
    },
  },
  'README.md': {
    file: {
      contents: `# NovaOS\nWelcome to your full-stack WebAssembly environment.\n\nTry running \`npm install\` followed by \`npm start\` in the terminal below!`,
    },
  },
};

export default function NovaIDE() {
  const terminalRef = useRef(null);
  const [booting, setBooting] = useState(true);
  const [webcontainer, setWebcontainer] = useState(null);
  
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const termInstanceRef = useRef(null);
  
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const c = {
    bg: dark ? '#1e1e1e' : '#ffffff',
    activityBar: dark ? '#333333' : '#f3f4f6',
    titleBar: dark ? '#333333' : '#e5e7eb',
    sidebar: dark ? '#252526' : '#f9fafb',
    border: dark ? '#252526' : '#d1d5db',
    resizer: dark ? '#2b2b2b' : '#d1d5db',
    text: dark ? '#cccccc' : '#111827',
    textDim: dark ? '#858585' : '#6b7280',
    tabBar: dark ? '#2d2d2d' : '#f3f4f6',
    tabInactive: dark ? '#2d2d2d' : '#f3f4f6',
    tabActive: dark ? '#1e1e1e' : '#ffffff',
    tabHover: dark ? '#444' : '#e5e7eb',
    itemHover: dark ? '#2a2d2e' : '#e5e7eb',
    itemActiveBg: dark ? '#37373d' : '#d1d5db',
    statusBar: '#007acc',
    primary: '#007acc',
  };

  // New State for Tabs and Layout
  const [openTabs, setOpenTabs] = useState([]);
  const [explorerOpen, setExplorerOpen] = useState(true);
  const [serverUrl, setServerUrl] = useState(null);

  // Terminal & Container Initialization
  useEffect(() => {
    let term = null;
    let fitAddon = null;
    let process = null;

    async function initTerminal() {
      term = new Terminal({
        cursorBlink: true,
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 13,
      });
      fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      
      // Note: Terminal theme should preferably be updated here
      term.options.theme = dark ? {
        background: '#1e1e1e',
        foreground: '#cccccc',
      } : {
        background: '#ffffff',
        foreground: '#111827',
        cursor: '#111827'
      };
      termInstanceRef.current = term;

      term.open(terminalRef.current);
      fitAddon.fit();

      term.writeln('\x1b[1;34mNovaOS\x1b[0m WebAssembly Environment initialized.');
      term.writeln('Booting Node.js kernel... \r\n');

      try {
        if (!bootPromise) {
          bootPromise = WebContainer.boot();
        }
        const wc = await bootPromise;
        setWebcontainer(wc);
        
        // Mount files
        await wc.mount(initialFiles);

        // Load file tree
        const dir = await wc.fs.readdir('/');
        const visibleFiles = dir.filter(f => !f.startsWith('.'));
        setFiles(visibleFiles);
        
        // Open default file
        const defaultFile = 'README.md';
        setActiveFile(defaultFile);
        setOpenTabs([defaultFile]);
        const initialContent = await wc.fs.readFile(`/${defaultFile}`, 'utf-8');
        setFileContent(initialContent);

        // Spawn bash
        process = await wc.spawn('jsh', { env: { HOME: '/' } });

        process.output.pipeTo(
          new WritableStream({
            write(data) {
              term.write(data);
            }
          })
        );

        const inputWriter = process.input.getWriter();
        term.onData((data) => {
          inputWriter.write(data);
        });

        // Listen for port opens
        wc.on('server-ready', (port, url) => {
          term.writeln(`\r\n\x1b[1;32m[NovaOS]\x1b[0m Server ready on port ${port}. Access it at: ${url}`);
          setServerUrl(url);
        });

        setBooting(false);
      } catch (err) {
        term.writeln(`\r\n\x1b[1;31mFATAL BOOT ERROR: ${err.message}\x1b[0m`);
        setBooting(false);
      }
    }

    initTerminal();

    const handleResize = () => {
      try {
        if (fitAddon) fitAddon.fit();
      } catch (e) {
        // Ignore fit errors when container is too small or unmounted
      }
    };
    
    // Use ResizeObserver for the terminal container specifically
    const resizeObserver = new ResizeObserver(() => {
      // Debounce fit to prevent layout thrashing
      requestAnimationFrame(() => {
        handleResize();
      });
    });
    
    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current.parentElement);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (term) term.dispose();
      if (process) process.kill();
    };
  }, []);

  useEffect(() => {
    if (termInstanceRef.current) {
      termInstanceRef.current.options.theme = dark ? {
        background: '#1e1e1e',
        foreground: '#cccccc',
      } : {
        background: '#ffffff',
        foreground: '#111827',
        cursor: '#111827'
      };
    }
  }, [theme, dark]);

  const handleFileSelect = async (filename) => {
    if (!webcontainer) return;
    
    if (!openTabs.includes(filename)) {
      setOpenTabs([...openTabs, filename]);
    }
    
    setActiveFile(filename);
    try {
      const content = await webcontainer.fs.readFile(`/${filename}`, 'utf-8');
      setFileContent(content);
    } catch(e) {
      console.error(e);
      setFileContent('// Error loading file');
    }
  };

  const closeTab = (e, filename) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== filename);
    setOpenTabs(newTabs);
    
    if (activeFile === filename) {
      if (newTabs.length > 0) {
        handleFileSelect(newTabs[newTabs.length - 1]);
      } else {
        setActiveFile(null);
        setFileContent('');
      }
    }
  };

  const handleEditorChange = async (value) => {
    setFileContent(value);
    if (webcontainer && activeFile) {
      try {
        await webcontainer.fs.writeFile(`/${activeFile}`, value);
      } catch (e) {
        console.error("Failed to save:", e);
      }
    }
  };

  // Icons and Languages
  const getFileIcon = (filename) => {
    if (filename.endsWith('.json')) return <FileJson size={14} color="#cbcb41" />;
    if (filename.endsWith('.js')) return <FileCode2 size={14} color="#f1e05a" />;
    if (filename.endsWith('.md')) return <Box size={14} color="#58a6ff" />;
    return <FileCode2 size={14} color="#c9d1d9" />;
  };

  const getLanguage = (filename) => {
    if (!filename) return 'javascript';
    if (filename.endsWith('.json')) return 'json';
    if (filename.endsWith('.html')) return 'html';
    if (filename.endsWith('.css')) return 'css';
    if (filename.endsWith('.md')) return 'markdown';
    return 'javascript';
  };

  return (
    <div style={{ flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: c.bg, color: c.text, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Top Header / Title Bar (Optional, VS Code style) */}
      <div style={{ height: '35px', backgroundColor: c.titleBar, borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: c.textDim, userSelect: 'none' }}>
        pmverse-demo - NovaCode
      </div>

      <div style={{ flex: 1, display: 'flex', minHeight: 0, overflow: 'hidden' }}>
        
        {/* Activity Bar */}
        <div style={{ width: '48px', flexShrink: 0, backgroundColor: c.activityBar, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 0', gap: '20px', borderRight: `1px solid ${c.border}`, zIndex: 10 }}>
          <div style={{ cursor: 'pointer', color: dark ? '#ffffff' : '#111827' }}><Files size={24} strokeWidth={1.5} /></div>
          <div style={{ cursor: 'pointer', color: c.textDim }}><Search size={24} strokeWidth={1.5} /></div>
          <div style={{ cursor: 'pointer', color: c.textDim }}><GitBranch size={24} strokeWidth={1.5} /></div>
          <div style={{ cursor: 'pointer', color: c.textDim }}><PlaySquare size={24} strokeWidth={1.5} /></div>
          <div style={{ flex: 1 }} />
          <div style={{ cursor: 'pointer', color: c.textDim }}><Settings size={24} strokeWidth={1.5} /></div>
        </div>

        {/* Resizable Layout Group */}
        <div style={{ flex: 1, minWidth: 0, minHeight: 0, position: 'relative' }}>
          <PanelGroup orientation="horizontal" style={{ width: '100%', height: '100%' }}>
          
          {/* Sidebar (Explorer) */}
          <Panel defaultSize={20} minSize={15} maxSize={40} style={{ backgroundColor: c.sidebar, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '10px 20px', fontSize: '11px', color: c.textDim, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <span style={{ fontWeight: 600, letterSpacing: '0.5px' }}>EXPLORER</span>
              <LayoutPanelLeft size={14} cursor="pointer" />
            </div>
            
            <div 
              style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', color: c.text, flexShrink: 0 }}
              onClick={() => setExplorerOpen(!explorerOpen)}
            >
              {explorerOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              <span style={{ letterSpacing: '0.5px' }}>NOVAOS</span>
            </div>
            
            {explorerOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', flex: 1 }}>
                {files.map(f => (
                  <div 
                    key={f}
                    onClick={() => handleFileSelect(f)}
                    style={{
                      padding: '6px 20px',
                      fontSize: '13px',
                      color: activeFile === f ? (dark ? '#ffffff' : '#000000') : c.text,
                      backgroundColor: activeFile === f ? c.itemActiveBg : 'transparent',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      userSelect: 'none',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => { if (activeFile !== f) e.currentTarget.style.backgroundColor = c.itemHover; }}
                    onMouseLeave={(e) => { if (activeFile !== f) e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                      {getFileIcon(f)}
                    </div>
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>{f}</span>
                  </div>
                ))}
              </div>
            )}
          </Panel>

          <PanelResizeHandle style={{ width: '1px', backgroundColor: c.resizer, cursor: 'col-resize' }} />

          {/* Editor and Terminal Column */}
          <Panel style={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
            <PanelGroup orientation="vertical" style={{ width: '100%', height: '100%' }}>
              
              {/* Editor Pane */}
              <Panel defaultSize={70} minSize={30} style={{ display: 'flex', flexDirection: 'column', backgroundColor: c.bg }}>
                
                {/* Tabs Bar */}
                <div style={{ height: '35px', backgroundColor: c.tabBar, display: 'flex', overflowX: 'auto' }}>
                  {openTabs.map(tab => (
                    <div
                      key={tab}
                      onClick={() => handleFileSelect(tab)}
                      style={{
                        height: '100%',
                        padding: '0 10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        backgroundColor: activeFile === tab ? c.tabActive : c.tabInactive,
                        color: activeFile === tab ? (dark ? '#ffffff' : '#111827') : c.textDim,
                        borderTop: activeFile === tab ? `1px solid ${c.primary}` : '1px solid transparent',
                        borderRight: `1px solid ${c.border}`,
                        cursor: 'pointer',
                        fontSize: '13px',
                        minWidth: '120px'
                      }}
                    >
                      {getFileIcon(tab)}
                      <span style={{ flex: 1, whiteSpace: 'nowrap' }}>{tab}</span>
                      <div 
                        onClick={(e) => closeTab(e, tab)}
                        style={{ padding: '2px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = c.tabHover}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <X size={14} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Breadcrumbs */}
                {activeFile && (
                  <div style={{ height: '22px', display: 'flex', alignItems: 'center', padding: '0 15px', fontSize: '12px', color: c.textDim, gap: '4px' }}>
                    <span>NovaOS</span>
                    <ChevronRight size={12} />
                    <span>{activeFile}</span>
                  </div>
                )}

                {/* Monaco Editor */}
                <div style={{ flex: 1, position: 'relative' }}>
                  {activeFile ? (
                    <Editor
                      height="100%"
                      language={getLanguage(activeFile)}
                      theme={dark ? "vs-dark" : "light"}
                      value={fileContent}
                      onChange={handleEditorChange}
                      options={{
                        minimap: { enabled: true },
                        fontSize: 14,
                        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
                        padding: { top: 10 },
                        scrollBeyondLastLine: false,
                        smoothScrolling: true,
                        cursorBlinking: "smooth",
                        cursorSmoothCaretAnimation: "on",
                        formatOnPaste: true
                      }}
                    />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: c.textDim, fontSize: '24px', opacity: 0.5 }}>
                      <TerminalIcon size={100} strokeWidth={1} style={{ marginBottom: '20px' }} />
                    </div>
                  )}
                </div>
              </Panel>

              <PanelResizeHandle style={{ height: '1px', backgroundColor: c.resizer, cursor: 'row-resize' }} />

              {/* Terminal Pane */}
              <Panel defaultSize={30} minSize={15} style={{ display: 'flex', flexDirection: 'column', backgroundColor: c.bg }}>
                <div style={{ height: '35px', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '20px', borderBottom: `1px solid ${c.resizer}` }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: c.text, borderBottom: `1px solid ${c.text}`, paddingBottom: '2px', cursor: 'pointer' }}>Terminal</span>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: c.textDim, cursor: 'pointer' }}>Output</span>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: c.textDim, cursor: 'pointer' }}>Problems</span>
                </div>
                <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                  <div ref={terminalRef} style={{ width: '100%', height: '100%', padding: '10px', boxSizing: 'border-box', backgroundColor: c.bg }} />
                  {booting && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: dark ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)', color: c.primary, zIndex: 10 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <TerminalIcon size={32} className="animate-pulse" />
                        <span>Booting WebContainer...</span>
                      </div>
                    </div>
                  )}
                </div>
              </Panel>

            </PanelGroup>
          </Panel>
        </PanelGroup>
        </div>
      </div>

      {/* Status Bar (VS Code style blue) */}
      <div style={{ height: '22px', backgroundColor: '#007acc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px', fontSize: '12px', color: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GitBranch size={12} /> main*</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><X size={12} color="#f48771" /> 0 ⚠ 0</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>{booting ? 'Initializing...' : 'Node.js v18.18'}</span>
          <span>{serverUrl ? `Port 3111` : ''}</span>
          <span>UTF-8</span>
          <span>{activeFile ? getLanguage(activeFile).toUpperCase() : ''}</span>
        </div>
      </div>

    </div>
  );
}
