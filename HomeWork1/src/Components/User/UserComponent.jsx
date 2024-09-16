import React, { useState, useRef } from 'react';
import './UserComponent.css';

function UserComponent({ handleUserMessage }) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef(null);

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidMessage(inputValue)) {
      handleUserMessage(inputValue.trim());
      setInputValue('');
      textareaRef.current.style.height = '48px'; // Reset height after submit
    }
  };

  const isValidMessage = (message) => message.trim() !== '';

  // Handle Enter key to submit the message without clearing the chat history
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = () => {
    // Check if the input is empty
    if (textareaRef.current.value === '') {
      textareaRef.current.style.height = '40px'; // Reset to min height if no text
    } else {
      textareaRef.current.style.height = '40x'; // Always reset height first
      const scrollHeight = textareaRef.current.scrollHeight;
      const newHeight = Math.min(scrollHeight, 120); // Cap the height at 150px
      textareaRef.current.style.height = `${newHeight}px`; // Adjust height based on content
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <textarea
        ref={textareaRef}
        name="inputField"
        placeholder="Type your message here..."
        className="input-field"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleInput();
        }}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className="submit-button">Send</button>
    </form>
  );
}

export default UserComponent;
