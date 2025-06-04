// src/components/BotTyping.jsx
import { useEffect, useState } from 'react';
import ChatBubble from './ChatBubble';

export default function BotTyping({ text, onDone }) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        onDone(); // signal that it's over
      }
    }, 10); // writing speed (in ms)

    return () => clearInterval(interval);
  }, [text, onDone]);

  return <ChatBubble role="bot" content={displayedText} />;
}
