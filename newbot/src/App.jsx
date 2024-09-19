import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [selectedBotFunctionality, setSelectedBotFunctionality] = useState('');

  return (
    <div className="app-container">
      <Sidebar onBotSelect={(functionality) => setSelectedBotFunctionality(functionality)} />
      <Chat selectedBotFunctionality={selectedBotFunctionality} />
    </div>
  );
}

export default App;
