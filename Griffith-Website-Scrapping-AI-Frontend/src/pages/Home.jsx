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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const newMessage = { role: "user", content: question };
    setMessages([...messages, newMessage]);
    setLoading(true);
    setError(null);
    setQuestion("");

    setTimeout(() => {
      const hasError = Math.random() < 0.1;
      if (hasError) {
        setError("Une erreur est survenue lors de la réponse du bot.");
        setLoading(false);
        return;
      }

      const botReply = `Voici une réponse simulée à : "${question}"`;
      setBotQueue(botReply);
      setLoading(false);
    }, 1000);
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
        Bienvenue sur le Bot
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "400px",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          placeholder="Pose ta question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            marginBottom: "0.5rem",
            background: "#222",
            color: "#fff",
            border: "1px solid #555",
            borderRadius: "4px",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Envoyer
        </button>
      </form>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>⚠️ {error}</div>
      )}

      <div
        style={{
          display: "flex",
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
    </div>
  );
}
