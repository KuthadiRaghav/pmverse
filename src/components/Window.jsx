import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';
import { motion, useDragControls, useMotionValue } from 'framer-motion';

export default function Window({ title, children, onClose, onMinimize = () => {}, isMinimized = false, initialWidth = 600, initialHeight = 400, x = 100, y = 100, zIndex = 10, isFocused = false, onFocus = () => {} }) {
  const { theme } = useTheme();
  
  // Motion Values for butter-smooth drag (bypasses React render)
  const xPos = useMotionValue(x);
  const yPos = useMotionValue(y);
  const dragControls = useDragControls();

  // Size State (resizing still needs React layout reflow)
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  
  // Interaction State
  const [isResizing, setIsResizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [preMaxState, setPreMaxState] = useState(null);

  const resizeRef = useRef(null);

  const handleResizeStart = (e, direction) => {
    e.stopPropagation();
    onFocus();
    setIsResizing(direction);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
      startPosX: xPos.get(),
      startPosY: yPos.get()
    };
  };

  useEffect(() => {
    let animationFrameId;

    const handleMouseMove = (e) => {
      if (isResizing) {
        // Throttle resize with requestAnimationFrame for performance
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        
        animationFrameId = requestAnimationFrame(() => {
          const dx = e.clientX - resizeRef.current.startX;
          const dy = e.clientY - resizeRef.current.startY;
          
          let newWidth = resizeRef.current.startWidth;
          let newHeight = resizeRef.current.startHeight;
          let newX = resizeRef.current.startPosX;
          let newY = resizeRef.current.startPosY;

          if (isResizing.includes('E')) newWidth = Math.max(300, resizeRef.current.startWidth + dx);
          if (isResizing.includes('S')) newHeight = Math.max(200, resizeRef.current.startHeight + dy);
          if (isResizing.includes('W')) {
            const possibleWidth = resizeRef.current.startWidth - dx;
            if (possibleWidth >= 300) {
              newWidth = possibleWidth;
              newX = resizeRef.current.startPosX + dx;
            }
          }
          if (isResizing.includes('N')) {
            const possibleHeight = resizeRef.current.startHeight - dy;
            if (possibleHeight >= 200 && (resizeRef.current.startPosY + dy) >= 0) {
              newHeight = possibleHeight;
              newY = resizeRef.current.startPosY + dy;
            }
          }

          setSize({ width: newWidth, height: newHeight });
          xPos.set(newX);
          yPos.set(newY);
        });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, xPos, yPos]);

  const toggleMaximize = (e) => {
    e.stopPropagation();
    if (isMaximized) {
      xPos.set(preMaxState.x);
      yPos.set(preMaxState.y);
      setSize(preMaxState.size);
      setIsMaximized(false);
    } else {
      setPreMaxState({ x: xPos.get(), y: yPos.get(), size });
      xPos.set(0);
      yPos.set(0);
      setSize({ width: window.innerWidth, height: window.innerHeight - 80 }); // Leave room for taskbar
      setIsMaximized(true);
    }
  };

  const handleDragEnd = (event, info) => {
    if (isMaximized || isMinimized) return;

    const px = info.point.x;
    const py = info.point.y;
    const sw = window.innerWidth;
    const sh = window.innerHeight;

    const EDGE_THRESHOLD = 30;
    const TOP_BAR_HEIGHT = 32;
    const DOCK_HEIGHT = 80;

    if (py < TOP_BAR_HEIGHT + EDGE_THRESHOLD) {
      // Snap Top -> Maximize
      if (!isMaximized) toggleMaximize(event);
    } else if (px < EDGE_THRESHOLD) {
      // Snap Left
      if (!preMaxState) setPreMaxState({ x: xPos.get(), y: yPos.get(), size });
      xPos.set(0);
      yPos.set(TOP_BAR_HEIGHT);
      setSize({ width: sw / 2, height: sh - TOP_BAR_HEIGHT - DOCK_HEIGHT });
    } else if (px > sw - EDGE_THRESHOLD) {
      // Snap Right
      if (!preMaxState) setPreMaxState({ x: xPos.get(), y: yPos.get(), size });
      xPos.set(sw / 2);
      yPos.set(TOP_BAR_HEIGHT);
      setSize({ width: sw / 2, height: sh - TOP_BAR_HEIGHT - DOCK_HEIGHT });
    }
  };

  const bgColor = theme === 'dark' ? 'rgba(22, 27, 34, 0.85)' : 'rgba(255, 255, 255, 0.85)';
  const borderColor = theme === 'dark' ? 'rgba(48, 54, 61, 0.8)' : 'rgba(229, 231, 235, 0.8)';
  const titleBarBg = theme === 'dark' ? 'transparent' : 'transparent';
  const titleColor = theme === 'dark' ? '#c9d1d9' : '#111827';
  const contentBg = theme === 'dark' ? 'rgba(13, 17, 23, 0.9)' : 'rgba(255, 255, 255, 0.9)';

  const shadow = isFocused 
    ? (theme === 'dark' ? '0 24px 64px rgba(0,0,0,0.8)' : '0 24px 64px rgba(0,0,0,0.2)')
    : (theme === 'dark' ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.1)');

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.85, y: 40 }}
      animate={
        isMinimized 
          ? { opacity: 0, scale: 0.5, y: 150, pointerEvents: 'none' } 
          : { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' }
      }
      exit={{ opacity: 0, scale: 0.85, y: 40 }}
      transition={{ type: "spring", damping: 20, stiffness: 500 }}
      onMouseDownCapture={onFocus}
      drag={!isMaximized && !isMinimized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      style={{
        position: 'absolute',
        x: xPos,
        y: yPos,
        width: size.width,
        height: size.height,
        backgroundColor: bgColor,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${borderColor}`,
        borderRadius: isMaximized ? '0px' : '16px',
        boxShadow: shadow,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: zIndex,
        filter: isFocused || isMinimized ? 'none' : 'grayscale(40%) opacity(0.95)',
        transition: isResizing ? 'none' : 'box-shadow 0.3s ease, border-radius 0.3s ease, width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), filter 0.3s ease'
      }}
    >
      {/* Titlebar */}
      <div 
        onPointerDown={(e) => {
          onFocus();
          if (!isMaximized) dragControls.start(e);
        }}
        onDoubleClick={toggleMaximize}
        style={{
          backgroundColor: titleBarBg,
          borderBottom: `1px solid ${borderColor}`,
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: isMaximized ? 'default' : 'grab',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={onClose} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f85149', border: 'none', cursor: 'pointer' }} />
          <button onClick={(e) => { e.stopPropagation(); onMinimize(); }} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#d29922', border: 'none', cursor: 'pointer' }} />
          <button onClick={toggleMaximize} style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#2ea043', border: 'none', cursor: 'pointer' }} />
        </div>
        <div style={{ color: titleColor, fontSize: '13px', fontWeight: '600', fontFamily: 'sans-serif' }}>{title}</div>
        <div style={{ width: '44px' }}></div> {/* Spacer for centering title */}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', backgroundColor: contentBg, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          <div onMouseDown={(e) => handleResizeStart(e, 'E')} style={{ position: 'absolute', right: 0, top: 0, width: '8px', height: '100%', cursor: 'e-resize' }} />
          <div onMouseDown={(e) => handleResizeStart(e, 'W')} style={{ position: 'absolute', left: 0, top: 0, width: '8px', height: '100%', cursor: 'w-resize' }} />
          <div onMouseDown={(e) => handleResizeStart(e, 'S')} style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '8px', cursor: 's-resize' }} />
          <div onMouseDown={(e) => handleResizeStart(e, 'N')} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '8px', cursor: 'n-resize' }} />
          <div onMouseDown={(e) => handleResizeStart(e, 'SE')} style={{ position: 'absolute', right: 0, bottom: 0, width: '12px', height: '12px', cursor: 'se-resize', zIndex: 20 }} />
          <div onMouseDown={(e) => handleResizeStart(e, 'SW')} style={{ position: 'absolute', left: 0, bottom: 0, width: '12px', height: '12px', cursor: 'sw-resize', zIndex: 20 }} />
          <div onMouseDown={(e) => handleResizeStart(e, 'NE')} style={{ position: 'absolute', right: 0, top: 0, width: '12px', height: '12px', cursor: 'ne-resize', zIndex: 20 }} />
          <div onMouseDown={(e) => handleResizeStart(e, 'NW')} style={{ position: 'absolute', left: 0, top: 0, width: '12px', height: '12px', cursor: 'nw-resize', zIndex: 20 }} />
        </>
      )}
    </motion.div>
  );
}
