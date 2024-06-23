import React from 'react';

const Channel = ({ id, name, participants, handleChannelSelect }) => {
  return (
    <div
      className="p-4 border-b border-gray-200 hover:bg-gray-800 cursor-pointer"
      onClick={() => handleChannelSelect(id)}
    >
      <div className="text-lg font-medium">{name}</div>
      <span className="text-sm text-gray-500">{participants} participants</span>
    </div>
  );
};

export default Channel;
