import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you with the APEX GT hypercar today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: input }];
    setMessages(newMsgs);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Thank you for your inquiry. Our APEX GT representative will get in touch with you shortly.' }
      ]);
    }, 1000);
  };

  return (
    <div style={styles.chatbotContainer}>
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} style={styles.chatToggleBtn}>
          <MessageSquare size={24} />
        </button>
      )}

      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.chatHeader}>
            <h4>APEX Assistant</h4>
            <button onClick={() => setIsOpen(false)} style={styles.closeBtn}><X size={18} /></button>
          </div>
          <div style={styles.chatBody}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ ...styles.msg, alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', background: m.sender === 'user' ? '#e11d48' : '#1f2937' }}>
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} style={styles.chatFooter}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={styles.chatInput}
            />
            <button type="submit" style={styles.sendBtn}><Send size={16} /></button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  chatbotContainer: { position: 'fixed', bottom: '30px', right: '100px', zIndex: 9999 },
  chatToggleBtn: { width: '70px', height: '70px', borderRadius: '50%', background: '#22c55e', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.4)' },
  chatWindow: { width: '320px', height: '400px', background: '#0f0f12', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' },
  chatHeader: { background: '#18181b', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' },
  closeBtn: { background: 'none', border: 'none', color: '#fff', cursor: 'pointer' },
  chatBody: { flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  msg: { padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', maxWidth: '80%', color: '#fff' },
  chatFooter: { display: 'flex', padding: '10px', background: '#18181b' },
  chatInput: { flex: 1, padding: '8px', background: '#27272a', border: 'none', borderRadius: '6px', color: '#fff', outline: 'none', fontSize: '0.85rem' },
  sendBtn: { background: '#e11d48', color: '#fff', border: 'none', padding: '0 12px', marginLeft: '8px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};