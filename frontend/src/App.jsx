import { useState, useRef, useEffect } from "react";
import { Paperclip, Send, Copy, ThumbsUp, RotateCw, Bot } from "lucide-react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed, time: getTime() },
    ]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply ?? "No response received.",
          time: getTime(),
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Something went wrong. Please try again.",
          time: getTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleCopy = (text) => navigator.clipboard.writeText(text);

  const handleNewChat = () => {
    setMessages([]);
    setMessage("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Assistant</h1>
        <button className="new-chat-btn" onClick={handleNewChat}>
          + New Chat
        </button>
      </header>

      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.role}`}>
            {msg.role === "bot" && (
              <div className="avatar bot-avatar">
                <Bot size={18} />
              </div>
            )}

            <div className="message-block">
              <div className={`message-bubble ${msg.role}`}>
                {msg.text}
              </div>

              {msg.role === "bot" && (
                <div className="message-actions">
                  <button onClick={() => handleCopy(msg.text)}>
                    <Copy size={14} /> Copy
                  </button>
                  <button>
                    <ThumbsUp size={14} />
                  </button>
                  <button>
                    <RotateCw size={14} />
                  </button>
                </div>
              )}

              <span className="timestamp">{msg.time}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="message-row bot">
            <div className="avatar bot-avatar">
              <Bot size={18} />
            </div>
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="input-bar-wrapper">
        <div className="input-bar">
          <Paperclip size={18} className="input-icon" />
          <input
            type="text"
            placeholder="Ask anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <button
            className="send-btn"
            onClick={handleSend}
            disabled={loading}
          >
            <Send size={16} />
          </button>
        </div>
        <p className="disclaimer">AI can make mistakes. Verify important information.</p>
      </div>
    </div>
  );
}

export default App;