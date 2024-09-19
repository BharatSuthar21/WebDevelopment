import React, { useState, useEffect, useRef } from 'react';

function Chat({ selectedBotFunctionality }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const performAction = (text) => {
    let response = '';

    if (selectedBotFunctionality === 'RANDOM') {
      const functionalities = ['COUNT_VOWELS', 'MOST_FREQUENT_LETTER', 'UPPERCASE',
        'SHUFFLE_CHARACTERS_IN_WORDS', 'COUNT_VOWELS_CONSONANTS', 'REVERSE_TEXT',
        'JUMBLE_WORDS', 'COUNT_CHARACTERS', 'REPEAT_WORDS_TWICE', 'REPLACE_SPACES_WITH_UNDERSCORES'];
      const randomFunctionality = functionalities[Math.floor(Math.random() * functionalities.length)];
      console.log('Random functionality selected:', randomFunctionality); // for debugging
      return performActionBasedOnSelection(randomFunctionality, text);
    }

    return performActionBasedOnSelection(selectedBotFunctionality, text);
  };

  const performActionBasedOnSelection = (functionality, text) => {
    switch (functionality) {
      case 'COUNT_VOWELS':
        return `No of vowels in text: ${countVowels(text)}`;
      case 'MOST_FREQUENT_LETTER':
        return `Most Frequent Letter: ${mostFrequentLetter(text)}`;
      case 'UPPERCASE':
        return `Given text in uppercase: ${text.toUpperCase()}`;
      case 'SHUFFLE_CHARACTERS_IN_WORDS':
        return `Shuffle characters of word: ${shuffleCharactersInWords(text)}`;
      case 'COUNT_VOWELS_CONSONANTS':
        const { vowels, consonants } = countVowelsAndConsonants(text);
        return `No of Vowels: ${vowels}, No of Consonants: ${consonants}`;
      case 'REVERSE_TEXT':
        return `Reverse text: ${reverseText(text)}`;
      case 'JUMBLE_WORDS':
        return `Jumbling Words: ${jumbleWords(text)}`;
      case 'COUNT_CHARACTERS':
        return `Character Count: ${text.length}`;
      case 'REPEAT_WORDS_TWICE':
        return `Repeating Words Twice: ${repeatWordsTwice(text)}`;
      case 'REPLACE_SPACES_WITH_UNDERSCORES':
        return `Replacing Spaces with Underscores: ${replaceSpacesWithUnderscores(text)}`;
      default:
        return 'Please select the bot!';
    }
  };

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'sent',
      };

      setMessages([...messages, newMessage]);

      setTimeout(() => {
        const botResponse = performAction(input);
        const botMessage = {
          id: messages.length + 2,
          text: botResponse,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sender: 'received',
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);

      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat">
      <div className="header">
        <div className="name">Chat with {selectedBotFunctionality || 'Bot'}</div>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div className={`message ${message.sender}`} key={message.id}>
            <div className="text">
              {message.text}
              <div className="time">{message.time}</div>
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

// Helper functions
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
