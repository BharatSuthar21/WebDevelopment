import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Timer from './components/Timer';
import SettingsModal from './components/SettingsModal';
import './App.css';

const DEFAULT_TIMERS = {
  focus: 15,
  shortBreak: 5,
  focus2: 15,
  longBreak: 10,
};

function App() {
  const [activePhase, setActivePhase] = useState('focus');
  const [timers, setTimers] = useState(DEFAULT_TIMERS);
  const [isPaused, setIsPaused] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false); // New state

  const playSound = () => {
    const audio = new Audio('/assets/alarm.wav');
    setIsSoundPlaying(true); // Set sound playing to true

    audio.play().then(() => {
      setTimeout(() => {
        audio.pause();
        setIsSoundPlaying(false); // Reset sound playing after sound is complete
      }, 3000);
    });
  };

  const phases = ['focus', 'shortBreak', 'focus2', 'longBreak'];

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleTimerEnd = () => {
    playSound();

    // Delay phase change until sound finishes
    setTimeout(() => {
      const nextPhase = (cycleIndex + 1) % phases.length;
      setCycleIndex(nextPhase);
      setActivePhase(phases[nextPhase]);
    }, 3000); // 3-second delay to allow the sound to complete
  };

  const switchPhase = (nextPhase) => {
    if (!isSoundPlaying) {
      setActivePhase(nextPhase);
      setCycleIndex(phases.indexOf(nextPhase));
      setIsPaused(true); // Pause the timer on manual switch
    }
  };

  return (
    <div className="app-container">
      <h1>POMODORO</h1>
      <Navbar active={activePhase} setActive={switchPhase} />
      <Timer
        key={activePhase}
        initialTime={timers[activePhase]}
        isPaused={isPaused || isSoundPlaying} // Pause if sound is playing
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
