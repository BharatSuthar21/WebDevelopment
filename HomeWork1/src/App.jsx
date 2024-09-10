import { useState } from 'react';
import './App.css';
import User from './Components/User';
import Bot from './Components/Bot';

function App() {
  const [userInput, setUserInput] = useState("");
  const [botOutput, setBotOutput] = useState("");
  const [history, setHistory] = useState([]);

  // Handle the bot's result after processing
  const handleBotResponse = (response) => {
    setBotOutput(response);  // Update bot output
    setHistory([...history, { user: userInput, bot: response }]);  // Update history
  };

  return (
    <>
      <div>
        <User setInput={setUserInput} />
        <Bot input={userInput} onResponse={handleBotResponse} />
        <div>
          <strong>Current User Input:</strong> {userInput}
        </div>
        <div>
          <strong>Bot Output:</strong> {botOutput}
        </div>
        <div>
          <h3>History</h3>
          {history.map((entry, index) => (
            <div key={index}>
              <strong>User:</strong> {entry.user} <br />
              <strong>Bot:</strong> {entry.bot}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
