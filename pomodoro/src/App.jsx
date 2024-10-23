import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Timer from './components/Timer';
import SettingsModal from './components/SettingsModal';
import './App.css';

const DEFAULT_TIMERS = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

function App() {
  const [activePhase, setActivePhase] = useState('focus');
  const [timers, setTimers] = useState(DEFAULT_TIMERS);
  const [isPaused, setIsPaused] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const switchPhase = (nextPhase) => {
    setActivePhase(nextPhase);
  };

  const handleTimerEnd = () => {
    const audio = new Audio('/assets/alarm.mp3');
    audio.play();

    if (activePhase === 'focus') {
      switchPhase('shortBreak');
    } else if (activePhase === 'shortBreak') {
      switchPhase('focus');
    } else if (activePhase === 'longBreak') {
      switchPhase('focus');
    }
  };

  return (
    <div className="app-container">
      <h1>POMODORO</h1>
      <Navbar active={activePhase} setActive={switchPhase} />
      <Timer
        key={activePhase}
        initialTime={timers[activePhase]}
        isPaused={isPaused}
        togglePause={togglePause}
        onTimerEnd={handleTimerEnd}
      />
      <div className="button-container">
        <button onClick={togglePause}>{isPaused ? 'Start' : 'Pause'}</button>
        <button onClick={() => setShowSettings(true)}>Settings</button>
      </div>
      {showSettings && (
        <SettingsModal
          timers={timers}
          onClose={() => setShowSettings(false)}
          onSave={setTimers}
        />
      )}
    </div>
  );
}

export default App;
