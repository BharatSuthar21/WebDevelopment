import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Timer from './components/Timer';
import SettingsModal from './components/SettingsModal';
import './App.css';

function App() {
  const [active, setActive] = useState('Focus');
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [timers, setTimers] = useState({
    focus: 25, // 25 minutes by default
    shortBreak: 5, // 5 minutes short break
    longBreak: 15, // 15 minutes long break
  });

  const handleTimerChange = (newTimers) => {
    setTimers(newTimers);
  };

  return (
    <div className="app-container">
      <Navbar active={active} setActive={setActive} />
      <Timer
        active={active}
        isPaused={isPaused}
        togglePause={() => setIsPaused(!isPaused)}
        timers={timers}
      />
      <button className="settings-button" onClick={() => setShowSettings(true)}>
        Settings
      </button>
      {showSettings && (
        <SettingsModal
          timers={timers}
          handleTimerChange={handleTimerChange}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
