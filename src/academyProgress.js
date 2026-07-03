// Academy progress persistence: skill completion, missed MCQs (spaced-repetition
// pool for Growth SAT), and Design Sprint submissions (surfaced in the Portfolio).

const KEY = 'pmverse_academy_v1';

function load() {
  try {
    return { completed: [], missed: [], sprints: {}, ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch {
    return { completed: [], missed: [], sprints: {} };
  }
}

function save(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* session-only */ }
}

export function isSkillComplete(skillId) {
  return load().completed.includes(skillId);
}

export function markSkillComplete(skillId) {
  const p = load();
  if (!p.completed.includes(skillId)) { p.completed.push(skillId); save(p); }
  recordActivity();
}

export function completedSkills() {
  return load().completed;
}

// Missed-MCQ pool: refs are stable {skillId, lessonIdx}
export function recordMcq(skillId, lessonIdx, correct) {
  const p = load();
  const idx = p.missed.findIndex((m) => m.skillId === skillId && m.lessonIdx === lessonIdx);
  if (!correct && idx === -1) p.missed.push({ skillId, lessonIdx });
  if (correct && idx !== -1) p.missed.splice(idx, 1);
  save(p);
  recordActivity();
}

export function getMissed() {
  return load().missed;
}

// ---------------------------------------------------------------------------
// Activity streak + daily challenge
// ---------------------------------------------------------------------------
function dayKey(d = new Date()) {
  return d.toISOString().slice(0, 10);
}

export function recordActivity() {
  const p = load();
  p.activityDays = p.activityDays || [];
  const today = dayKey();
  if (!p.activityDays.includes(today)) {
    p.activityDays.push(today);
    if (p.activityDays.length > 400) p.activityDays = p.activityDays.slice(-400);
    save(p);
  }
}

export function getStreak() {
  const days = new Set(load().activityDays || []);
  let streak = 0;
  const cursor = new Date();
  // Today counts if active; otherwise the streak is measured up to yesterday
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (days.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function getDaily() {
  return load().daily || null; // { day, correct }
}

export function recordDaily(correct) {
  const p = load();
  p.daily = { day: dayKey(), correct };
  save(p);
  recordActivity();
}

// Design Sprint submissions — one per skill, latest wins
export function saveSprintSubmission(skillId, submission) {
  const p = load();
  p.sprints[skillId] = { ...submission, savedAt: new Date().toISOString() };
  save(p);
  recordActivity();
}

export function getSprintSubmission(skillId) {
  return load().sprints[skillId] || null;
}

export function getAllSprintSubmissions() {
  return load().sprints;
}
