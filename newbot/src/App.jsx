import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [selectedBotFunctionality, setSelectedBotFunctionality] = useState('');

  const bots = [
    {
      id: 1,
      name: "RandomBot",
      message: "Perform actions Randomly",
      imgSrc: "src/assets/Images/random.png",
      functionality: 'RANDOM',
    },
    {
      id: 2,
      name: "VowelBot",
      message: "Counts vowels in the input text.",
      imgSrc: "src/assets/Images/Vowel.jpg",
      functionality: 'COUNT_VOWELS',
    },
    {
      id: 3,
      name: "Most Frequent Letter",
      message: "Returns the most frequent letter",
      imgSrc: "src/assets/Images/frequent.png",
      functionality: 'MOST_FREQUENT_LETTER',
    },
    {
      id: 4,
      name: "Uppercase Bot",
      message: "Converts the input text to uppercase.",
      imgSrc: "src/assets/Images/Uppercase.png",
      functionality: 'UPPERCASE',
    },
    {
      id: 5,
      name: "ShuffleBot",
      message: "Shuffles the characters in each word of the input text.",
      imgSrc: "src/assets/Images/shuffle.png",
      functionality: 'SHUFFLE_CHARACTERS_IN_WORDS',
    },
  ];
  

  return (
    <div className="app-container">
      <Sidebar onBotSelect={(functionality) => setSelectedBotFunctionality(functionality)} bots={bots}/>
      <Chat selectedBotFunctionality={selectedBotFunctionality} />
    </div>
  );
}

export default App;
