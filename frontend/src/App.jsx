import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
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
        { role: "bot", text: data.reply ?? "No response received." },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="app">
      <h1>AI Chat Assistant</h1>

      <div className="chat-container">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="message bot">Thinking...</div>}
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;