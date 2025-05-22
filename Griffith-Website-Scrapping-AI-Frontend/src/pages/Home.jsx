// src/pages/Home.jsx
import { useState } from 'react';

export default function Home() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    const newMessage = { role: 'user', content: question };
    setMessages([...messages, newMessage]);

    // Pour l'instant, réponse simulée
    setTimeout(() => {
      const botResponse = { role: 'bot', content: `Voici une réponse simulée à : "${question}"` };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);

    setQuestion('');
  };

  return (
    <div className="container" style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Bienvenue sur le Bot</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Pose ta question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            fontSize: '1rem',
            marginBottom: '0.5rem',
          }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Envoyer</button>
      </form>

      <div>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              background: msg.role === 'user' ? '#A7E0E0' : '#9AC8EB',
              padding: '0.75rem',
              borderRadius: '8px',
              marginBottom: '0.5rem',
            }}
          >
            <strong>{msg.role === 'user' ? 'Toi :' : 'Bot :'}</strong> {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
