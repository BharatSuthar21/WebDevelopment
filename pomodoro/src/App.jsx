import React, { useState, useEffect } from 'react';
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
  const [cycleIndex, setCycleIndex] = useState(0);

  const playSound = () => {
    const audio = new Audio('/assets/alarm.wav'); 
    audio.play();
    setTimeout(() => audio.pause(), 3000); 
  };

  // Phases in cycle: Focus → Short Break → Focus → Long Break
  const phases = ['focus', 'shortBreak', 'focus', 'longBreak'];

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  // Handles end of the current timer phase
  const handleTimerEnd = () => {
    playSound();
    const nextPhase = (cycleIndex + 1) % phases.length;
    setCycleIndex(nextPhase);
    setActivePhase(phases[nextPhase]);
  };

  // When manually switching phases
  const switchPhase = (nextPhase) => {
    setActivePhase(nextPhase);
    setCycleIndex(phases.indexOf(nextPhase));
    setIsPaused(true); // Pause the timer on manual switch
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
          onSave={(newTimers) => {
            setTimers(newTimers);
            setShowSettings(false);
          }}
        />
      )}
    </div>
  );
}

export default App;
