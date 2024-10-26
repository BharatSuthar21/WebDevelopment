import React, { useState } from 'react';
import './SettingsModal.css';

const secondsToTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

const timeToSeconds = (timeStr) => {
  const [hrs, mins, secs] = timeStr.split(':').map(Number);
  return hrs * 3600 + mins * 60 + secs;
};

const SettingsModal = ({ timers, onClose, onSave }) => {
  const [newTimers, setNewTimers] = useState({
    focus: secondsToTime(timers.focus),
    shortBreak: secondsToTime(timers.shortBreak),
    longBreak: secondsToTime(timers.longBreak),
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTimers({
      ...newTimers,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave({
      focus: timeToSeconds(newTimers.focus),
      shortBreak: timeToSeconds(newTimers.shortBreak),
      longBreak: timeToSeconds(newTimers.longBreak),
    });
  };

  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <div>
        <label>
          Focus Time (HH:MM:SS):
          <input
            type="text"
            name="focus"
            value={newTimers.focus}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Short Break Time (HH:MM:SS):
          <input
            type="text"
            name="shortBreak"
            value={newTimers.shortBreak}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Long Break Time (HH:MM:SS):
          <input
            type="text"
            name="longBreak"
            value={newTimers.longBreak}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="settings-buttons">
        <button onClick={onClose}>Cancel</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default SettingsModal;
