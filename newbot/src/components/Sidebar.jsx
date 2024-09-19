import React, { useState } from 'react';


function Sidebar({ onBotSelect, bots }) {
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
