import React, { useState } from 'react';
import './UserComponent.css';

function UserComponent({ handleUserMessage }) {
  const [inputValue, setInputValue] = useState('');  // Track the user's input message

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidMessage(inputValue)) {
      handleUserMessage(inputValue.trim());  // Pass the message to the App component
      setInputValue('');  // Clear input field after message is sent
    }
  };

  // Check if the message is valid (not empty or just spaces)
  const isValidMessage = (message) => {
    return message.trim() !== '';
  };

  // Handle Enter key to submit the message without clearing the chat history
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();  // Prevent default behavior of Enter key
      handleSubmit(e);  // Submit the message
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
        onKeyDown={handleKeyDown}  // Handle pressing Enter
      />
      <button type="submit" className="submit-button">Send</button>
    </form>
  );
}

export default UserComponent;
