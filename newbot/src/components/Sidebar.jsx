import React, { useState } from 'react';

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

function Sidebar({ onBotSelect }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="sidebar">
      <div className="search">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="contacts">
        {bots.map((bot) => (
          <div className="contact" key={bot.id} onClick={() => onBotSelect(bot.functionality)}>
            <img src={bot.imgSrc} alt={`Profile of ${bot.name}`} />
            <div>
              <div className="name">{bot.name}</div>
              <div className="message">{bot.message}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="toggle-mode">
        <button onClick={toggleDarkMode} className="toggle-btn">
    {darkMode ? 'Light Mode' : 'Dark Mode'}
  </button>
</div>

    </div>
  );
}

export default Sidebar;
