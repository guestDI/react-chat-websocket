'use client';

import React from 'react';

const Channel = ({
  id,
  name,
  participants = {},
  handleChannelSelect,
  isSelected = false,
}) => {
  return (
    <div
      className={`p-4 border-b border-gray-200 hover:bg-gray-800 cursor-pointer ${isSelected ? 'bg-gray-800' : ''}`}
      onClick={() => handleChannelSelect(id)}
    >
      <p className={`text-lg font-medium ${isSelected ? 'text-blue-600' : ''}`}>
        {name}
      </p>
      <span className="text-sm text-gray-500">
        {Object.keys(participants)?.length} participants
      </span>
    </div>
  );
};

export default Channel;
