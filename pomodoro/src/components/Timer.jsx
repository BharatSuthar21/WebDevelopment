import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ initialTime, isPaused, togglePause, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (isPaused) return;

    if (timeLeft === 0) {
      onTimerEnd();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, isPaused, onTimerEnd]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    return ((initialTime - timeLeft) / initialTime) * 100;
  };

  return (
    <div className="timer-container">
      <div className="progress-circle" style={{ background: `conic-gradient(#ff0000 ${calculateProgress()}%, #333333 0)` }}>
        <div className="timer-display">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default Timer;
