import { useState } from "react";

function App() {

  const [message, setMessage] = useState("");

  const [reply, setReply] = useState("");

  const handleSend = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      const data = await response.json();

      setReply(data.reply);

      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      setReply("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="app">
      <h1>AI Chat Assistant</h1>

      <div className="chat-container">
        <div className="message user">
          {message}
        </div>

        <div className="message bot">
          {reply}
        </div>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Ask anything..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;