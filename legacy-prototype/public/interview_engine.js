const INTERVIEW_QUESTIONS = [
  {
    question: "How would you improve Google Maps?",
    type: "product_sense"
  },
  {
    question: "How would you monetize Facebook Marketplace?",
    type: "monetization"
  },
  {
    question: "Design a physical alarm clock for the blind.",
    type: "product_design"
  }
];

let currentInterviewIndex = 0;

function renderInterviewApp() {
  const q = INTERVIEW_QUESTIONS[currentInterviewIndex];
  const container = document.getElementById("interview-content");
  if (!container) return;

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; height: 100%;">
      
      <!-- Video Area -->
      <div style="flex: 1; display: flex; align-items: center; justify-content: center; background: #000; position: relative;">
        <!-- Simulated Interviewer Avatar -->
        <div style="width: 120px; height: 120px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--teal)); display: flex; align-items: center; justify-content: center; font-size: 48px; font-weight: bold; color: #fff; box-shadow: 0 0 40px rgba(56, 189, 248, 0.4);">
          AI
        </div>
        <div style="position: absolute; bottom: 16px; left: 16px; background: rgba(0,0,0,0.6); padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: 500; color: #fff;">
          Senior PM (Interviewer)
        </div>
      </div>

      <!-- Question & Chat Area -->
      <div style="height: 350px; background: var(--bg-panel); border-top: 1px solid var(--line); display: flex; flex-direction: column;">
        <div style="padding: 16px 24px; border-bottom: 1px solid var(--line); background: var(--bg-raised);">
          <div style="font-size: 11px; text-transform: uppercase; color: var(--accent); font-weight: 700; margin-bottom: 4px;">Question</div>
          <div style="font-size: 18px; font-weight: bold;">"${q.question}"</div>
        </div>
        
        <div id="interview-chat-log" style="flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px;">
          <!-- Chat messages go here -->
          <div style="color: var(--text-dim); font-size: 14px; text-align: center; margin-top: auto;">
            Type your structured response below. The interviewer is waiting.
          </div>
        </div>

        <div style="padding: 16px 24px; border-top: 1px solid var(--line); display: flex; gap: 12px; align-items: center;">
          <textarea id="interview-input" placeholder="Type your answer... (Hint: Clarify goals, users, pain points first)" style="flex: 1; height: 60px; background: var(--bg-raised); border: 1px solid var(--line); border-radius: 8px; padding: 12px; color: var(--text); resize: none; font-family: inherit; font-size: 14px; outline: none;"></textarea>
          <button class="btn-primary" onclick="submitInterviewAnswer()">Send</button>
        </div>
      </div>

    </div>
  `;
}

function submitInterviewAnswer() {
  const input = document.getElementById("interview-input");
  const text = input.value.trim();
  if (!text) return;

  const chatLog = document.getElementById("interview-chat-log");
  
  // Clear the placeholder
  if (chatLog.innerHTML.includes("Type your structured response below")) {
    chatLog.innerHTML = "";
  }

  // Add user message
  chatLog.innerHTML += `
    <div style="align-self: flex-end; max-width: 80%; background: var(--accent); color: #000; padding: 12px 16px; border-radius: 12px 12px 0 12px; font-size: 14px; line-height: 1.5; white-space: pre-line;">
      ${text}
    </div>
  `;
  input.value = "";

  // Scroll to bottom
  chatLog.scrollTop = chatLog.scrollHeight;

  // Simulate AI "thinking" then responding
  setTimeout(() => {
    evaluateInterviewAnswer(text, chatLog);
  }, 1000);
}

function evaluateInterviewAnswer(text, chatLog) {
  const lowerText = text.toLowerCase();
  let aiResponse = "";
  let pass = false;

  // Simple CIRCLES/Structured heuristic
  const hasUsers = lowerText.includes("user") || lowerText.includes("persona") || lowerText.includes("segment");
  const hasGoals = lowerText.includes("goal") || lowerText.includes("objective") || lowerText.includes("metric");
  const hasPain = lowerText.includes("pain") || lowerText.includes("problem") || lowerText.includes("need");
  const hasSolution = lowerText.includes("solution") || lowerText.includes("feature") || lowerText.includes("build") || lowerText.includes("idea");

  if (!hasUsers && !hasGoals && hasSolution) {
    aiResponse = "❌ <strong>Red Flag:</strong> You jumped straight into solutions! A strong PM always clarifies the goal and identifies the target users before brainstorming features. Try again.";
  } else if (!hasPain && hasSolution) {
    aiResponse = "⚠️ <strong>Feedback:</strong> You have solutions, but what user pain points are you solving? Tie your features back to specific user needs.";
  } else if (hasUsers && hasGoals && hasSolution) {
    pass = true;
    aiResponse = "✅ <strong>Excellent!</strong> You structured your answer perfectly. You established goals, defined the users, and mapped solutions to them. You would pass this round.";
  } else {
    aiResponse = "💬 <strong>Feedback:</strong> Make sure your answer is structured. Start with Goals/Context, then Users, then Pain points, and finally Solutions.";
  }

  chatLog.innerHTML += `
    <div style="align-self: flex-start; max-width: 80%; background: var(--bg-raised); border: 1px solid var(--line); color: var(--text); padding: 12px 16px; border-radius: 12px 12px 12px 0; font-size: 14px; line-height: 1.5;">
      ${aiResponse}
      ${pass ? `<div style="margin-top: 12px;"><button class="btn-primary" onclick="nextInterviewQuestion()">Next Question</button></div>` : ""}
    </div>
  `;
  chatLog.scrollTop = chatLog.scrollHeight;
}

function nextInterviewQuestion() {
  currentInterviewIndex = (currentInterviewIndex + 1) % INTERVIEW_QUESTIONS.length;
  renderInterviewApp();
}
