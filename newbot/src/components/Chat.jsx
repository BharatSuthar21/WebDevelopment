import React, { useState, useEffect, useRef } from 'react';
import user from '../assets/Images/user.jpeg'
import botImage from '../assets/Images/images.png'

function Chat({ selectedBotFunctionality }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Function to generate a bot response based on selected functionality
  const performAction = (text) => {
    let response = '';

    if (selectedBotFunctionality === 'RANDOM') {
      const functionalities = [
        'COUNT_VOWELS', 'MOST_FREQUENT_LETTER', 'UPPERCASE',
        'SHUFFLE_CHARACTERS_IN_WORDS', 'COUNT_VOWELS_CONSONANTS', 'REVERSE_TEXT',
        'JUMBLE_WORDS', 'COUNT_CHARACTERS', 'REPEAT_WORDS_TWICE', 'REPLACE_SPACES_WITH_UNDERSCORES'
      ];
      const randomFunctionality = functionalities[Math.floor(Math.random() * functionalities.length)];
      return performActionBasedOnSelection(randomFunctionality, text);
    }

    return performActionBasedOnSelection(selectedBotFunctionality, text);
  };

  // Action logic based on selected functionality
  const performActionBasedOnSelection = (functionality, text) => {
    switch (functionality) {
      case 'COUNT_VOWELS':
        return `No of vowels in text: ${countVowels(text)}`;
      case 'MOST_FREQUENT_LETTER':
        return `Most Frequent Letter: ${mostFrequentLetter(text)}`;
      case 'UPPERCASE':
        return `Given text in uppercase: ${text.toUpperCase()}`;
      case 'SHUFFLE_CHARACTERS_IN_WORDS':
        return `Shuffled characters in words: ${shuffleCharactersInWords(text)}`;
      case 'COUNT_VOWELS_CONSONANTS':
        const { vowels, consonants } = countVowelsAndConsonants(text);
        return `Vowels: ${vowels}, Consonants: ${consonants}`;
      case 'REVERSE_TEXT':
        return `Reversed text: ${reverseText(text)}`;
      case 'JUMBLE_WORDS':
        return `Jumbled words: ${jumbleWords(text)}`;
      case 'COUNT_CHARACTERS':
        return `Character count: ${text.length}`;
      case 'REPEAT_WORDS_TWICE':
        return `Words repeated: ${repeatWordsTwice(text)}`;
      case 'REPLACE_SPACES_WITH_UNDERSCORES':
        return `Spaces replaced with underscores: ${replaceSpacesWithUnderscores(text)}`;
      default:
        return 'Please select a bot functionality!';
    }
  };

  // Send user message and bot response
  const handleSend = () => {
    if (input.trim()) {
      // Add user message to state
      const newMessage = {
        id: messages.length + 1,
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'user',
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Add bot response after a delay
      setTimeout(() => {
        const botResponse = performAction(input);
        const botMessage = {
          id: messages.length + 2,
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: 'bot',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000); // 1-second delay for bot response

      setInput(''); // Clear input
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Scroll to bottom of chat after messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset messages when selectedBotFunctionality changes
  useEffect(() => {
    // Clear the chat history when the bot functionality changes
    setMessages([]);
  }, [selectedBotFunctionality]);

  return (
    <div className="chat">
      <div className="header">
        <div className="name">Chat with {selectedBotFunctionality || 'Bot'}</div>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className={`message-container ${message.sender}`}>
            <div className="message-content">
              <img 
                src={message.sender === 'user' ? user : botImage} 
                alt={message.sender} 
                className="avatar" 
              />
              <div>
                <div className="message-header">
                  <span className="sender-name">
                    {message.sender === 'user' ? 'User' : selectedBotFunctionality}
                  </span>
                  <span className="time">{message.time}</span>
                </div>
                <div className="message-text">{message.text}</div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
        />
        <button className="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

// Helper functions remain unchanged
const countVowels = (text) => {
  const vowels = text.match(/[aeiouAEIOU]/g);
  return vowels ? vowels.length : 0;
};

const mostFrequentLetter = (text) => {
  const charMap = {};
  let maxChar = '';
  let maxCount = 0;
  for (let char of text.replace(/\s+/g, '').toLowerCase()) {
    charMap[char] = (charMap[char] || 0) + 1;
    if (charMap[char] > maxCount) {
      maxChar = char;
      maxCount = charMap[char];
    }
  }
  return maxChar;
};

const countVowelsAndConsonants = (text) => {
  let vowelsCount = 0, consonantsCount = 0;
  const vowels = 'aeiouAEIOU';
  for (let char of text) {
    if (vowels.includes(char)) vowelsCount++;
    else if (/[a-zA-Z]/.test(char)) consonantsCount++;
  }
  return { vowels: vowelsCount, consonants: consonantsCount };
};

const reverseText = (text) => text.split('').reverse().join('');

const jumbleWords = (text) => text.split(' ').sort(() => 0.5 - Math.random()).join(' ');

const repeatWordsTwice = (text) => text.split(' ').map(word => `${word} ${word}`).join(' ');

const replaceSpacesWithUnderscores = (text) => text.replace(/\s+/g, '_');

const shuffleCharactersInWords = (text) => {
  return text.split(' ').map((word) => {
    return word.split('').sort(() => 0.5 - Math.random()).join('');
  }).join(' ');
};

export default Chat;
