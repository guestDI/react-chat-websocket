'use client';

import React, { useState } from 'react';

const MessagesPanelFooter = ({ socket, currentUser }) => {
  const [message, setMessage] = useState('');

  const handleTyping = () =>
    socket.emit('typing', `${currentUser.displayName} is typing`);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        userName: currentUser.userName,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }

    setMessage('');
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-lg bg-inherit"
          placeholder="Type a message..."
          value={message}
          onKeyDown={handleTyping}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesPanelFooter;
