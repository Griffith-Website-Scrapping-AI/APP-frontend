// src/components/ChatBubble.jsx
import { motion } from "framer-motion";

export default function ChatBubble({ role, content }) {
  const isUser = role === "user";
  const label   = isUser ? "Toi :" : "Bot :";

  // split into lines so we can indent bullet‐lines
  const lines = content.split("\n");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: isUser ? "#4AA3A2" : "#E38F97",
        padding: "0.75rem",
        borderRadius: "8px",
        marginBottom: "0.5rem",
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "80%",
      }}
    >
      {/* Speaker label */}
      <div style={{ marginBottom: "0.25rem" }}>
        <strong>{label}</strong>
      </div>

      {/* Message body, preserving breaks and indenting bullets */}
      {lines.map((line, idx) => (
        <div
          key={idx}
          style={{
            // indent any bullet‐line
            marginLeft: line.trim().startsWith("•") ? "1rem" : 0,
            // keep multiple spaces & line breaks intact
            whiteSpace: "pre-wrap",
          }}
        >
          {line}
        </div>
      ))}
    </motion.div>
  );
}
