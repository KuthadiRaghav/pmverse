import React, { useState } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTheme } from '../ThemeContext';

const INITIAL_TASKS = {
  todo: [
    { id: 't1', title: 'Setup Mixpanel funnels for mobile checkout', priority: 'High', points: 3, assignee: 'Sara Kim', description: '<p>We need to track the drop-off rate between <strong>Cart</strong> and <strong>Payment</strong>.</p>' },
    { id: 't2', title: 'Audit promotional email volume vs unsubscribe rate', priority: 'Medium', points: 2, assignee: 'Sara Kim', description: '<p>Look at the last 90 days of SendGrid data.</p>' },
    { id: 't3', title: 'Draft V2 PRD: Loyalty Program', priority: 'Low', points: 5, assignee: 'Alex (You)', description: '<h2>Loyalty Program V2</h2><p>Focus on tier-based rewards...</p>' }
  ],
  in_progress: [
    { id: 't4', title: 'Investigate mobile checkout p75 latency spike (v2.4)', priority: 'High', points: 8, assignee: 'Dev Patel', description: '' },
    { id: 't5', title: 'Interview churned power users (Customer Discovery)', priority: 'High', points: 3, assignee: 'Alex (You)', description: '' }
  ],
  done: [
    { id: 't6', title: 'Update onboarding tooltip strings', priority: 'Low', points: 1, assignee: 'Dev Patel', description: '' }
  ]
};

function SortableItem({ id, task, onClick }) {
  const { theme } = useTheme();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const bgColor = theme === 'dark' ? '#161b22' : '#ffffff';
  const border = theme === 'dark' ? '#30363d' : '#e5e7eb';
  const text = theme === 'dark' ? '#c9d1d9' : '#111827';
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    backgroundColor: bgColor,
    border: `1px solid ${border}`,
    borderRadius: '8px',
    padding: '12px',
    marginBottom: '10px',
    cursor: 'grab',
    boxShadow: isDragging 
      ? (theme === 'dark' ? '0 10px 25px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.2)') 
      : (theme === 'dark' ? '0 2px 5px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.1)'),
    position: 'relative',
    zIndex: isDragging ? 99 : 1
  };

  const getPriorityColor = (p) => {
    if (p === 'High') return '#f85149';
    if (p === 'Medium') return '#d29922';
    return '#8b949e';
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div 
        style={{ fontSize: '14px', color: text, marginBottom: '8px', fontWeight: '500', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <span>{task.title}</span>
        <button 
          onPointerDown={(e) => {
            e.stopPropagation(); // prevent drag
            onClick(task);
          }}
          style={{
            background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer', padding: '4px', borderRadius: '4px'
          }}
          title="Edit Details"
        >
          ✏️
        </button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ color: getPriorityColor(task.priority), fontWeight: 'bold' }}>{task.priority}</span>
          <span style={{ color: '#8b949e', backgroundColor: theme === 'dark' ? '#21262d' : '#f3f4f6', padding: '2px 6px', borderRadius: '4px' }}>{task.points} pts</span>
        </div>
        <div style={{ color: '#8b949e' }}>{task.assignee}</div>
      </div>
    </div>
  );
}

function Column({ id, title, tasks, onTaskClick }) {
  const { theme } = useTheme();
  return (
    <div style={{ flex: 1, backgroundColor: theme === 'dark' ? '#0d1117' : '#f9fafb', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', border: `1px solid ${theme === 'dark' ? '#30363d' : '#e5e7eb'}` }}>
      <div style={{ fontSize: '14px', fontWeight: 'bold', color: theme === 'dark' ? '#8b949e' : '#4b5563', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center' }}>
        {title} 
        <span style={{ backgroundColor: theme === 'dark' ? '#21262d' : '#e5e7eb', color: theme === 'dark' ? '#c9d1d9' : '#374151', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', marginLeft: '8px' }}>
          {tasks.length}
        </span>
      </div>
      <SortableContext id={id} items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div style={{ flex: 1, minHeight: '200px' }}>
          {tasks.map((task) => (
            <SortableItem key={task.id} id={task.id} task={task} onClick={onTaskClick} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

export default function SprintBoard() {
  const { theme } = useTheme();
  const [columns, setColumns] = useState(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState(null);
  const [missionResult, setMissionResult] = useState(null);

  const CAPACITY = 13;

  const checkSprint = () => {
    const committed = columns.in_progress;
    const points = committed.reduce((s, t) => s + t.points, 0);
    const highPtsInProgress = committed.filter((t) => t.priority === 'High').reduce((s, t) => s + t.points, 0);
    const allHighPts = Object.values(columns).flat().filter((t) => t.priority === 'High').reduce((s, t) => s + t.points, 0);
    const withinBudget = points <= CAPACITY;
    const highCoverage = allHighPts ? highPtsInProgress / allHighPts : 0;
    const notEmpty = committed.length > 0;
    let grade, msg;
    if (!notEmpty) { grade = '—'; msg = 'Nothing committed yet. Drag work into "In Progress".'; }
    else if (!withinBudget) { grade = 'D'; msg = `Over capacity: ${points}/${CAPACITY} pts committed. Cutting scope is the job — pull something back to To Do.`; }
    else if (highCoverage >= 0.75) { grade = 'A'; msg = `${points}/${CAPACITY} pts, and you prioritized the high-impact work. That's a shippable sprint.`; }
    else if (highCoverage >= 0.4) { grade = 'B'; msg = `${points}/${CAPACITY} pts and within budget — but some high-priority work is still sitting in To Do. Is low-priority work crowding it out?`; }
    else { grade = 'C'; msg = `${points}/${CAPACITY} pts, within budget — but you loaded up on low-priority items while high-priority work waits. Sequence by impact.`; }
    setMissionResult({ grade, msg, points });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;
    
    const activeId = active.id;
    const overId = over.id;
    
    if (activeId === overId) return;

    const findContainer = (id) => {
      if (id in columns) return id;
      return Object.keys(columns).find(key => columns[key].find(item => item.id === id));
    };

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setColumns((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      
      const activeIndex = activeItems.findIndex(t => t.id === activeId);
      const overIndex = overId in prev 
        ? overItems.length + 1 
        : overItems.findIndex(t => t.id === overId);
      
      return {
        ...prev,
        [activeContainer]: [...prev[activeContainer].filter(item => item.id !== activeId)],
        [overContainer]: [
          ...prev[overContainer].slice(0, overIndex),
          activeItems[activeIndex],
          ...prev[overContainer].slice(overIndex)
        ]
      };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const findContainer = (id) => {
      if (id in columns) return id;
      return Object.keys(columns).find(key => columns[key].find(item => item.id === id));
    };

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = columns[activeContainer].findIndex(t => t.id === activeId);
    const overIndex = columns[overContainer].findIndex(t => t.id === overId);

    if (activeIndex !== overIndex) {
      setColumns((prev) => ({
        ...prev,
        [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex)
      }));
    }
  };

  const handleSaveDescription = (value) => {
    if (!selectedTask) return;
    setColumns(prev => {
      const newCols = { ...prev };
      for (const key of Object.keys(newCols)) {
        const idx = newCols[key].findIndex(t => t.id === selectedTask.id);
        if (idx !== -1) {
          newCols[key][idx].description = value;
          break;
        }
      }
      return newCols;
    });
    setSelectedTask({ ...selectedTask, description: value });
  };

  const bgColor = theme === 'dark' ? '#010409' : '#ffffff';
  const headerBg = theme === 'dark' ? '#161b22' : '#f3f4f6';
  const textColor = theme === 'dark' ? '#c9d1d9' : '#111827';
  const border = theme === 'dark' ? '#30363d' : '#e5e7eb';

  return (
    <div style={{ flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column', backgroundColor: bgColor, color: textColor, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      
      {/* Header */}
      <div style={{ padding: '16px 24px', backgroundColor: headerBg, borderBottom: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', color: textColor }}>Sprint Board</h1>
          <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>
            Project: The Retention Cliff • Sprint 4 • 6 weeks to Board Meeting
          </div>
        </div>
        <button onClick={checkSprint} style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg, #8957e5, #d946ef)', color: '#fff', fontWeight: 700, fontSize: '13px' }}>
          ✓ Check my sprint
        </button>
      </div>

      {/* Capacity mission */}
      <div style={{ padding: '10px 24px', backgroundColor: theme === 'dark' ? '#0d1117' : '#f9fafb', borderBottom: `1px solid ${border}`, fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, color: '#8957e5' }}>◆ MISSION</span>
        <span style={{ color: '#8b949e' }}>
          Sprint capacity is <b style={{ color: textColor }}>{CAPACITY} points</b>. Drag the highest-impact work into <b style={{ color: textColor }}>In Progress</b> without exceeding it — then check your sprint.
        </span>
        {missionResult && (
          <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <b style={{ fontSize: '18px', color: missionResult.grade <= 'B' && missionResult.grade !== '—' ? '#2ea043' : missionResult.grade === '—' ? '#8b949e' : '#d29922' }}>{missionResult.grade}</b>
            <span style={{ color: '#8b949e', maxWidth: '520px' }}>{missionResult.msg}</span>
          </span>
        )}
      </div>

      {/* Board */}
      <div style={{ flex: 1, padding: '24px', overflowX: 'auto', display: 'flex', gap: '24px', minWidth: '900px' }}>
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
          <Column id="todo" title="To Do" tasks={columns.todo} onTaskClick={setSelectedTask} />
          <Column id="in_progress" title="In Progress" tasks={columns.in_progress} onTaskClick={setSelectedTask} />
          <Column id="done" title="Done" tasks={columns.done} onTaskClick={setSelectedTask} />
        </DndContext>
      </div>

      {/* Rich Text Issue Modal */}
      {selectedTask && (
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '450px', height: '100%',
          backgroundColor: theme === 'dark' ? '#0d1117' : '#ffffff',
          borderLeft: `1px solid ${border}`,
          boxShadow: '-4px 0 15px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', zIndex: 1000
        }}>
          <div style={{ padding: '16px', borderBottom: `1px solid ${border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: headerBg }}>
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{selectedTask.id.toUpperCase()}</span>
            <button onClick={() => setSelectedTask(null)} style={{ background: 'transparent', border: 'none', color: textColor, cursor: 'pointer', fontSize: '16px' }}>✕</button>
          </div>
          
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1 }}>
            <h2 style={{ marginTop: 0, fontSize: '20px', marginBottom: '8px' }}>{selectedTask.title}</h2>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', fontSize: '13px', color: '#8b949e' }}>
              <div><strong>Assignee:</strong> {selectedTask.assignee}</div>
              <div><strong>Priority:</strong> {selectedTask.priority}</div>
              <div><strong>Points:</strong> {selectedTask.points}</div>
            </div>

            <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>Description (PRD)</div>
            
            <div style={{
              backgroundColor: theme === 'dark' ? '#ffffff' : '#ffffff', // ReactQuill snow theme assumes light bg usually, but we can wrap it
              borderRadius: '8px', overflow: 'hidden', border: `1px solid ${border}`
            }}>
               <ReactQuill 
                theme="snow" 
                value={selectedTask.description || ''} 
                onChange={handleSaveDescription} 
                style={{ 
                  height: '250px',
                  backgroundColor: '#ffffff',
                  color: '#000000'
                }} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
