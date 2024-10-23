import React, { useState, useEffect } from 'react';
import './Timer.css';
import { FaPlay, FaPause } from 'react-icons/fa';

const Timer = ({ active, isPaused, togglePause, timers }) => {
  const initialTime = timers[active.toLowerCase().replace(' ', '')] * 60; // Get the initial time in seconds based on the active state
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let timer;
    if (!isPaused && time > 0) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isPaused, time]);

  // Reset the timer when the user switches between Focus, Short Break, and Long Break
  useEffect(() => {
    setTime(timers[active.toLowerCase().replace(' ', '')] * 60);
  }, [active, timers]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const circleStyle = {
    strokeDasharray: 283, // full circle
    strokeDashoffset: 283 - (283 * time) / initialTime, // reduce the circle proportionally
  };

  return (
    <div className="timer-container">
      <svg className="progress-ring" width="200" height="200">
        <circle
          className="progress-ring__circle"
          stroke="brown"
          strokeWidth="10"
          fill="transparent"
          r="45"
          cx="100"
          cy="100"
          style={circleStyle}
        />
      </svg>
      <div className="time-display">{formatTime()}</div>
      <div className="timer-controls">
        <button className="start-button" onClick={togglePause}>
          {isPaused ? <FaPlay /> : <FaPause />}
        </button>
      </div>
    </div>
  );
};

export default Timer;
