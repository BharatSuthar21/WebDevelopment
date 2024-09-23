import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import './App.css';
import Random from './assets/Images/random.png';
import Vowel from './assets/Images/Vowel.jpg';
import Frequent from './assets/Images/frequent.png';
import Uppercase from './assets/Images/Uppercase.png';
import Suffel from './assets/Images/shuffle.png';

function App() {
  const [selectedBotFunctionality, setSelectedBotFunctionality] = useState('');

  const bots = [
    {
      id: 1,
      name: "RandomBot",
      message: "Perform actions Randomly",
      imgSrc: Random,
      functionality: 'RANDOM',
    },
    {
      id: 2,
      name: "VowelBot",
      message: "Counts vowels in the input text.",
      imgSrc: Vowel,
      functionality: 'COUNT_VOWELS',
    },
    {
      id: 3,
      name: "Most Frequent Letter",
      message: "Returns the most frequent letter",
      imgSrc: Frequent,
      functionality: 'MOST_FREQUENT_LETTER',
    },
    {
      id: 4,
      name: "Uppercase Bot",
      message: "Converts the input text to uppercase.",
      imgSrc: Uppercase,
      functionality: 'UPPERCASE',
    },
    {
      id: 5,
      name: "ShuffleBot",
      message: "Shuffles the characters in each word of the input text.",
      imgSrc: Suffel,
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
