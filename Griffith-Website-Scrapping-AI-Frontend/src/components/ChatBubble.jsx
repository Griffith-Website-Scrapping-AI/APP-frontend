// src/components/ChatBubble.jsx
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import React from "react";

export default function ChatBubble({ role, content }) {
  const isUser = role === "user";
  const label  = isUser ? "Toi :" : "Bot :";

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

      {/* Markdown renderer */}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Force « • » chips instead of «-» if necessary
          ul: ({node, ...props}) => <ul style={{ listStyleType: "disc", paddingLeft: "1rem" }} {...props} />,
          li: ({node, ...props}) => <li style={{ marginBottom: "0.25rem" }} {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </motion.div>
  );
}
