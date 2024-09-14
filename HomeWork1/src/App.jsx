import React, { useState } from 'react';
import './App.css';
import User from './Components/User/UserComponent';
import Bot from './Components/Bot';
import Screen from './Components/Screen/ScreenComponent';

function App() {
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  // Handle User Message
  const handleUserMessage = (userMessage) => {
    if (userMessage.trim()) {
      setHistory([...history, { sender: 'user', message: userMessage }]);
      setMessage(userMessage);
    }
  };

  // Handle Bot Response
  const handleBotResponse = (botResponse) => {
    setHistory([...history, { sender: 'bot', botName: botResponse.botName, message: botResponse.botResponse }]);
  };

  return (
    <div className="chat-container">
      <Screen history={history} />
      <div className="input-container">
        <User handleUserMessage={handleUserMessage} />
        <Bot message={message} handleBotResponse={handleBotResponse} />
      </div>
    </div>
  );
}

export default App;
