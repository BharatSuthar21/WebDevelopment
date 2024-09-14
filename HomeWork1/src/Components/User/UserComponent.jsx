import React from 'react';
import './UserComponent.css'

function UserComponent({ handleUserMessage }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements.inputField.value;
    handleUserMessage(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <textarea
        name="inputField"
        placeholder="Type your message"
        className="input-field"
      />
      <button type="submit" className="submit-button">Send</button>
    </form>
  );
}

export default UserComponent;
