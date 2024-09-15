import React, { useEffect, useRef } from 'react';
import './ScreenComponent.css';

function Screen({ history }) {
  const chatEndRef = useRef(null);

  // Automatically scroll to the bottom when a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

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
