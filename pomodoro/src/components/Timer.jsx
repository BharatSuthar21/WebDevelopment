import React, { useState, useEffect } from 'react';
import './Timer.css';

const Timer = ({ initialTime, isPaused, togglePause, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let timer = null;

    if (!isPaused) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            onTimerEnd();
            return initialTime; // Reset timer for the next phase
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isPaused, initialTime, onTimerEnd]);

  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  const progressPercentage = ((initialTime - timeLeft) / initialTime) * 100;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="timer-container">
      <div className="progress-circle" style={{ background: `conic-gradient(#f2863a ${progressPercentage}%, #2e2b72 0%)` }}>
        <div className="timer-display">{formatTime(timeLeft)}</div>
      </div>
    </div>
  );
};

export default Timer;
