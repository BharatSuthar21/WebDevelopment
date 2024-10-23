import React, { useState } from 'react';
import './SettingsModal.css';

const SettingsModal = ({ timers, handleTimerChange, onClose }) => {
  const [focusTime, setFocusTime] = useState(timers.focus);
  const [shortBreakTime, setShortBreakTime] = useState(timers.shortBreak);
  const [longBreakTime, setLongBreakTime] = useState(timers.longBreak);

  const handleSave = () => {
    handleTimerChange({
      focus: focusTime,
      shortBreak: shortBreakTime,
      longBreak: longBreakTime,
    });
    onClose();
  };

  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <label>
        Focus Timer (minutes):
        <input
          type="number"
          value={focusTime}
          onChange={(e) => setFocusTime(e.target.value)}
        />
      </label>
      <label>
        Short Break Timer (minutes):
        <input
          type="number"
          value={shortBreakTime}
          onChange={(e) => setShortBreakTime(e.target.value)}
        />
      </label>
      <label>
        Long Break Timer (minutes):
        <input
          type="number"
          value={longBreakTime}
          onChange={(e) => setLongBreakTime(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default SettingsModal;
