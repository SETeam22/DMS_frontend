import React, { useState } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = ({ isOpen }) => {
  const [chatOpen, setChatOpen] = useState(isOpen);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [...prevMessages, { text: inputValue, direction: 'outgoing' }]);
      setInputValue('');
      // Simulate a response from the chatbot
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: "hello , I'm a Virtually Assitant , For tracking order got to 'Track Orders' menu and For chating with manager got to 'Help' menu", direction: 'incoming' }]);
      }, 1000);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div>
      {chatOpen ? (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', width: '300px', height: '400px', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }} onClick={() => setChatOpen(false)}>
            <FaTimes size={20} color="black" />
          </div>
          <div style={{ padding: '10px', backgroundColor: '#00df9a', color: 'white', textAlign: 'center' }}>
            Let's Chat
          </div>
          <div style={{ overflow: 'auto', flex: '1' }}>
            {/* Render the messages */}
            {messages.map((message, index) => (
              <div key={index} style={{ textAlign: message.direction === 'outgoing' ? 'right' : 'left' }}>
                <span style={{ backgroundColor: '#eee', borderRadius: '10px', padding: '5px', display: 'inline-block', margin: '5px' }}>
                  {message.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #ccc', padding: '10px', display: 'flex' }}>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              style={{ flex: 1, padding: '10px', marginRight: '10px', borderRadius: '15px' }}
            />
            <button onClick={handleSendMessage} style={{ background: 'none', border: 'none', padding: '10px', cursor: 'pointer' }}>
              <FaPaperPlane size={20} color="#00df9a" />
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#00df9a',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setChatOpen(true)}
        >
          <FaRobot size={30} color="white" />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
