import React from 'react';
import './Navbar.css';

const Navbar = ({ active, setActive }) => {
  return (
    <nav className="navbar">
      <button
        className={`nav-button ${active === 'Focus' ? 'active' : ''}`}
        onClick={() => setActive('Focus')}
      >
        Focus
      </button>
      <button
        className={`nav-button ${active === 'Short Break' ? 'active' : ''}`}
        onClick={() => setActive('Short Break')}
      >
        Short Break
      </button>
      <button
        className={`nav-button ${active === 'Long Break' ? 'active' : ''}`}
        onClick={() => setActive('Long Break')}
      >
        Long Break
      </button>
    </nav>
  );
};

export default Navbar;
