import React from 'react';
import './Navbar.css';

const Navbar = ({ active, setActive }) => {
  return (
    <div className="navbar">
      <button
        className={active === 'focus' ? 'active' : ''}
        onClick={() => setActive('focus')}
      >
        Focus
      </button>
      <button
        className={active === 'shortBreak' ? 'active' : ''}
        onClick={() => setActive('shortBreak')}
      >
        Short Break
      </button>
      <button
        className={active === 'longBreak' ? 'active' : ''}
        onClick={() => setActive('longBreak')}
      >
        Long Break
      </button>
    </div>
  );
};

export default Navbar;
