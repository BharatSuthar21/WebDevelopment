import React, { useState } from 'react';
import './UserComponent.css';

function UserComponent({ handleUserMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidMessage(inputValue)) {
      handleUserMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const isValidMessage = (message) => {
    return message.trim() !== '';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <textarea
        name="inputField"
        placeholder="Type your message"
        className="input-field"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className="submit-button">Send</button>
    </form>
  );
}

export default UserComponent;
