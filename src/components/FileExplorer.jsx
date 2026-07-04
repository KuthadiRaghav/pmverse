import React, { useState } from 'react';
import { useCase } from '../case/CaseContext';
import { useTokens } from '../theme';
import { Folder, FileText, ChevronDown, ChevronRight, HardDrive } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function FileExplorer() {
  const { caseList, unlockedCaseIds } = useCase();
  const c = useTokens();
  
  // State for expanded folders (case IDs)
  const [expanded, setExpanded] = useState(() => {
    // Expand the first unlocked case by default
    return unlockedCaseIds.length > 0 ? [unlockedCaseIds[0]] : [];
  });
  
  // State for selected file: { caseId, fileId }
  const [selectedFile, setSelectedFile] = useState(null);

  const toggleFolder = (id) => {
    setExpanded(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getFileContent = () => {
    if (!selectedFile) return null;
    const caseDef = caseList.find(c => c.meta.id === selectedFile.caseId);
    if (!caseDef || !caseDef.files) return null;
    return caseDef.files.find(f => f.id === selectedFile.fileId);
  };

  const fileData = getFileContent();

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', backgroundColor: c.bg, color: c.text, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      
      {/* Sidebar: Folders and Files */}
      <div style={{ width: '280px', borderRight: `1px solid ${c.border}`, backgroundColor: c.panel, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HardDrive size={18} color={c.dim} />
          <div style={{ fontWeight: 700, fontSize: '15px' }}>Company Drive</div>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0' }}>
          {caseList.map((cs) => {
            const isUnlocked = unlockedCaseIds.includes(cs.meta.id);
            if (!isUnlocked) return null;
            
            const isExpanded = expanded.includes(cs.meta.id);
            const files = cs.files || [];
            
            return (
              <div key={cs.meta.id} style={{ marginBottom: '4px' }}>
                {/* Folder Row */}
                <div 
                  onClick={() => toggleFolder(cs.meta.id)}
                  style={{
                    padding: '8px 16px',
                    display: 'flex', alignItems: 'center', gap: '8px',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = c.hover}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ color: c.dim, display: 'flex', alignItems: 'center' }}>
                    {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                  <Folder size={16} color="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
                  <div style={{ fontSize: '13px', fontWeight: 600, color: c.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {cs.meta.title}
                  </div>
                </div>
                
                {/* Files List */}
                {isExpanded && files.length > 0 && (
                  <div style={{ paddingBottom: '8px' }}>
                    {files.map(file => {
                      const isSelected = selectedFile?.caseId === cs.meta.id && selectedFile?.fileId === file.id;
                      return (
                        <div
                          key={file.id}
                          onClick={() => setSelectedFile({ caseId: cs.meta.id, fileId: file.id })}
                          style={{
                            padding: '6px 16px 6px 40px',
                            display: 'flex', alignItems: 'center', gap: '8px',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? c.hover : 'transparent',
                            userSelect: 'none',
                          }}
                          onMouseOver={(e) => !isSelected && (e.currentTarget.style.backgroundColor = c.hover)}
                          onMouseOut={(e) => !isSelected && (e.currentTarget.style.backgroundColor = 'transparent')}
                        >
                          <FileText size={14} color={isSelected ? c.accent : c.dim} />
                          <div style={{ fontSize: '13px', color: isSelected ? c.text : c.dim, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {file.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {isExpanded && files.length === 0 && (
                  <div style={{ padding: '6px 16px 6px 40px', fontSize: '12px', color: c.dim, fontStyle: 'italic' }}>
                    Folder is empty
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Pane */}
      <div style={{ flex: 1, overflowY: 'auto', backgroundColor: c.bg, padding: '32px 40px' }}>
        {fileData ? (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${c.border}` }}>
              <FileText size={24} color={c.dim} />
              <h1 style={{ fontSize: '22px', margin: 0, fontWeight: 600, color: c.text }}>{fileData.name}</h1>
            </div>
            
            <div style={{ fontSize: '14.5px', lineHeight: 1.65, color: c.text }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {fileData.content}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: c.dim }}>
            <HardDrive size={48} color={c.border} style={{ marginBottom: '16px' }} />
            <div style={{ fontSize: '15px' }}>Select a file from the sidebar to read it</div>
          </div>
        )}
      </div>
      
    </div>
  );
}
