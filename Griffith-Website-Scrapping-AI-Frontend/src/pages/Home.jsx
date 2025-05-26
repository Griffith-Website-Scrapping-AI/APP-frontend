// src/pages/Home.jsx
import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import BotTyping from "../components/BotTyping";
import Loader from "../components/Loader";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [botQueue, setBotQueue] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    // 1) show the user's message immediately
    setMessages((prev) => [...prev, { role: "user", content: question }]);
    setLoading(true);
    setError(null);
    const payload = question;
    setQuestion("");

    // 2) call the FastAPI backend
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: payload }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // 3) Sanitize the GPT answer:
      //    • convert all "* " bullets to "• "
      //    • preserve all "\n" so ChatBubble can render line-breaks
      const { answer: raw } = await res.json();
      const cleaned = raw.replace(/\*\s+/g, "• ").trim();

      // 4) Queue it for the BotTyping animation
      setBotQueue(cleaned);
    } catch (err) {
      console.error("fetch error:", err);
      setError("An error has occurred during the request to the server.");
    } finally {
      // 5) Always turn off loading
      setLoading(false);
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#1e1e1e",
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
        Welcome to the Bot
      </h1>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>⚠️ {error}</div>
      )}

      <div
        style={{
          display: "flex",
          margin: "1rem",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        {messages.map((msg, index) => (
          <ChatBubble key={index} role={msg.role} content={msg.content} />
        ))}

        {botQueue && (
          <BotTyping
            text={botQueue}
            onDone={() => {
              setMessages((prev) => [
                ...prev,
                { role: "bot", content: botQueue },
              ]);
              setBotQueue(null);
            }}
          />
        )}

        {loading && <Loader />}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          maxWidth: "500px",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Ask your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading || botQueue}
          style={{
            width: "100%",
            padding: "0.5rem",
            margin: "1rem 0rem",
            fontSize: "1rem",
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "4px",
            opacity: loading || botQueue ? 0.5 : 1,
          }}
        />
        <button
          type="submit"
          disabled={loading || botQueue}
          style={{
            padding: "0.5rem 1rem",
            margin: "1rem 0rem",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            opacity: loading || botQueue ? 0.5 : 1,
            cursor: loading || botQueue ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
