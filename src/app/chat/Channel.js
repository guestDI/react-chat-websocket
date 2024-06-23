import React from 'react';

const Channel = ({ name, participants }) => {
    return (
      <div className="p-4 border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
        <div className="text-lg font-medium">{name}</div>
        <span className="text-sm text-gray-500">{participants} participants</span>
      </div>
    );
  };

export default Channel;