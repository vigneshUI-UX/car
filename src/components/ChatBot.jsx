
import { useState } from "react";
import "./ChatBot.css";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hello! 👋 Welcome to our website. How can I help you?",
      sender: "bot",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message.trim();

    setMessages((previous) => [
      ...previous,
      { text: userMessage, sender: "user" },
    ]);

    setMessage("");

    setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        {
          text: "Thanks for your message! 😊 How can I help you today?",
          sender: "bot",
        },
      ]);
    }, 600);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-profile">
              <div className="chat-avatar">💬</div>
              <div>
                <h3>Chat Support</h3>
                <p>Online</p>
              </div>
            </div>

            <button
              className="chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((item, index) => (
              <div
                key={index}
                className={`message ${item.sender}`}
              >
                {item.text}
              </div>
            ))}
          </div>

          <form
            className="chat-input-area"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />

            <button type="submit" aria-label="Send message">
              ➤
            </button>
          </form>
        </div>
      )}

      <button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? "×" : "☏"}
      </button>
    </div>
  );
}

export default ChatBot;
