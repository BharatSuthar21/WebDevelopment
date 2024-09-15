import React, { useEffect, useRef } from 'react';
import './ScreenComponent.css';

function Screen({ history, setHistory }) {
  const chatEndRef = useRef(null);

  // Automatically scroll to the bottom when a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Initialize with the first bot message when history is empty
  useEffect(() => {
    if (history.length === 0) {
      const initialMessage = {
        sender: 'bot',
        botName: 'YoungBot',
        message: 'Hi, how can I help you?',
      };
      setHistory([initialMessage]);  // Add the initial bot message to the history
    }
  }, [history, setHistory]);

  return (
    <div>
      <div className="screen">
        <div className="chat-history">
          {history.map((item, index) => (
            <div
              key={index}
              className={`message ${item.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {item.sender === 'bot' && (
                <div className="bot-name">
                  {item.botName}:
                </div>
              )}
              <div className="message-content">{item.message}</div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>
    </div>
  );
}

export default Screen;

