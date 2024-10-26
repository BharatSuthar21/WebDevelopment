import React, { useEffect } from 'react';
import useSound from 'use-sound';
import './Navbar.css';
import switchSound from '../assets/alaram.mp3';

const Navbar = ({ active, setActive }) => {
  const [play] = useSound(switchSound);

  // Play sound whenever 'active' state changes
  useEffect(() => {
    play();
  }, [active, play]);

  return (
    <div className="navbar" style={{minWidth:'70vh'}}>
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
        className={active === 'focus2' ? 'active' : ''}
        onClick={() => setActive('focus2')}
      >
        Focus
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
