import React, { useState, useEffect, useRef } from 'react';

export default function Window({ title, children, onClose, initialWidth = 600, initialHeight = 400, x = 100, y = 100 }) {
  const [pos, setPos] = useState({ x, y });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPosX: pos.x,
      startPosY: pos.y
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      setPos({
        x: dragRef.current.startPosX + dx,
        y: Math.max(0, dragRef.current.startPosY + dy) // prevent dragging above top
      });
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div style={{
      position: 'absolute',
      left: pos.x,
      top: pos.y,
      width: initialWidth,
      height: initialHeight,
      backgroundColor: '#161b22', // github dark theme panel
      border: '1px solid #30363d',
      borderRadius: '8px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 10
    }}>
      {/* Titlebar */}
      <div 
        onMouseDown={handleMouseDown}
        style={{
          backgroundColor: '#0d1117',
          borderBottom: '1px solid #30363d',
          padding: '8px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f85149', border: 'none', cursor: 'pointer' }} />
          <button style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#d29922', border: 'none' }} />
          <button style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2ea043', border: 'none' }} />
        </div>
        <div style={{ color: '#c9d1d9', fontSize: '13px', fontWeight: '500', fontFamily: 'sans-serif' }}>{title}</div>
        <div style={{ width: '44px' }}></div> {/* Spacer for centering title */}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', backgroundColor: '#0d1117' }}>
        {children}
      </div>
    </div>
  );
}
