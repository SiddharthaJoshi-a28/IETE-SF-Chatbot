// IETE-SF Floating Chatbot Widget
// Embeddable on any page with: <script src="widget/iete-chatbot-widget.js"></script>

(function () {
  // Prevent duplicate insertion
  if (document.getElementById('iete-chatbot-widget-container')) return;

  // Insert styles
  const styles = document.createElement('style');
  styles.textContent = `
    .iete-chat-bubble-toggle {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: #1818FE;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(24, 24, 254, 0.35);
      border: none;
      z-index: 999999;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .iete-chat-bubble-toggle:hover {
      transform: scale(1.08);
    }
    .iete-chat-popup {
      position: fixed;
      bottom: 96px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 540px;
      max-height: calc(100vh - 120px);
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 999999;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .iete-chat-popup.is-open {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    .iete-widget-header {
      background: #1818FE;
      color: #fff;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .iete-widget-title {
      font-weight: 700;
      font-size: 1rem;
    }
    .iete-widget-close {
      background: none;
      border: none;
      color: #fff;
      font-size: 1.2rem;
      cursor: pointer;
    }
    .iete-widget-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #F7F5F1;
      font-size: 0.92rem;
    }
    .iete-widget-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 14px;
      line-height: 1.45;
    }
    .iete-widget-msg--bot {
      align-self: flex-start;
      background: #fff;
      color: #1a1a1a;
      border-bottom-left-radius: 2px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
    }
    .iete-widget-msg--user {
      align-self: flex-end;
      background: #1818FE;
      color: #fff;
      border-bottom-right-radius: 2px;
    }
    .iete-widget-input-row {
      display: flex;
      padding: 10px;
      background: #fff;
      border-top: 1px solid rgba(0,0,0,0.08);
      gap: 8px;
    }
    .iete-widget-input-row input {
      flex: 1;
      padding: 10px 14px;
      border-radius: 999px;
      border: 1px solid rgba(0,0,0,0.15);
      outline: none;
      font-size: 0.9rem;
    }
    .iete-widget-input-row input:focus {
      border-color: #1818FE;
    }
    .iete-widget-input-row button {
      background: #1818FE;
      color: #fff;
      border: none;
      border-radius: 999px;
      padding: 0 16px;
      font-weight: 600;
      cursor: pointer;
    }
  `;
  document.head.appendChild(styles);

  // Build Container
  const container = document.createElement('div');
  container.id = 'iete-chatbot-widget-container';
  container.innerHTML = `
    <button class="iete-chat-bubble-toggle" aria-label="Open IETE-SF Chat">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
    <div class="iete-chat-popup">
      <div class="iete-widget-header">
        <div>
          <div class="iete-widget-title">IETE-SF Assistant</div>
          <div style="font-size:0.75rem; opacity:0.85;">MPSTME 2026–27</div>
        </div>
        <button class="iete-widget-close" aria-label="Close Chat">&times;</button>
      </div>
      <div class="iete-widget-body" id="iete-widget-msg-list">
        <div class="iete-widget-msg iete-widget-msg--bot">
          Hi! Ask me anything about IETE-SF departments, heads, subheads, executives, traits, or events!
        </div>
      </div>
      <div class="iete-widget-input-row">
        <input type="text" id="iete-widget-input" placeholder="Type a question..." />
        <button id="iete-widget-send">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Widget interactivity
  const toggleBtn = container.querySelector('.iete-chat-bubble-toggle');
  const popup = container.querySelector('.iete-chat-popup');
  const closeBtn = container.querySelector('.iete-widget-close');
  const input = container.querySelector('#iete-widget-input');
  const sendBtn = container.querySelector('#iete-widget-send');
  const msgList = container.querySelector('#iete-widget-msg-list');

  toggleBtn.addEventListener('click', () => {
    popup.classList.toggle('is-open');
    if (popup.classList.contains('is-open')) input.focus();
  });

  closeBtn.addEventListener('click', () => {
    popup.classList.remove('is-open');
  });

  function handleSend() {
    const text = input.value.trim();
    if (!text) return;

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'iete-widget-msg iete-widget-msg--user';
    userMsg.textContent = text;
    msgList.appendChild(userMsg);
    input.value = '';
    msgList.scrollTop = msgList.scrollHeight;

    // Typing delay
    setTimeout(() => {
      let reply = "I am ready to help! Ask me about department heads or events.";
      if (window.ChatbotEngine && typeof window.ChatbotEngine.processQuery === 'function') {
        reply = window.ChatbotEngine.processQuery(text);
      }
      const botMsg = document.createElement('div');
      botMsg.className = 'iete-widget-msg iete-widget-msg--bot';
      // Format simple bold and newlines
      botMsg.innerHTML = reply.replace(/\n/g, '<br>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      msgList.appendChild(botMsg);
      msgList.scrollTop = msgList.scrollHeight;
    }, 400);
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSend();
  });
})();
