import React, { useState } from 'react';
import './SettingsModal.css';

const SettingsModal = ({ timers, onClose, onSave }) => {
  const [newTimers, setNewTimers] = useState(timers);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTimers({
      ...newTimers,
      [name]: parseInt(value) * 60,
    });
  };

  const handleSave = () => {
    onSave(newTimers);
    onClose();
  };

  return (
    <div className="settings-modal">
      <h2>Settings</h2>
      <div>
        <label>
          Focus Time:
          <input
            type="number"
            name="focus"
            value={newTimers.focus / 60}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Short Break Time:
          <input
            type="number"
            name="shortBreak"
            value={newTimers.shortBreak / 60}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Long Break Time:
          <input
            type="number"
            name="longBreak"
            value={newTimers.longBreak / 60}
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default SettingsModal;
