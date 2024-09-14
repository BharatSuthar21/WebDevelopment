// import React from 'react';

// function Screen({ history }) {
//   return (
//     <div className="screen">
//       <div className="chat-history">
//         {history.map((item, index) => (
//           <div
//             key={index}
//             className={item.sender === 'user' ? 'message user-message' : 'message bot-message'}
//           >
//             {item.message}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Screen;


import React, { useEffect, useRef } from 'react';
import './ScreenComponent.css';

function Screen({ history }) {
  const chatEndRef = useRef(null);

  // Automatically scroll to the bottom when a new message is added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div className="screen">
      <div className="chat-history">
        {history.map((item, index) => (
          <div
            key={index}
            className={`message ${item.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {item.sender === 'bot' && (
              <div className="bot-name">
                {item.botName}:
              </div>
            )}
            <div className="message-content">{item.message}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
}

export default Screen;
