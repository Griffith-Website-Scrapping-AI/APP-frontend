// src/components/ChatBubble.jsx
import { motion } from 'framer-motion';

export default function ChatBubble({ role, content }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: role === 'user' ? '#A7E0E0' : '#9AC8EB',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '0.5rem',
        alignSelf: role === 'user' ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
      }}
    >
      <strong>{role === 'user' ? 'Toi :' : 'Bot :'}</strong> {content}
    </motion.div>
  );
}
