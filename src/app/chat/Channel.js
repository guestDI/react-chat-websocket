'use client';

import React from 'react';

const Channel = ({
  name,
  participants = {},
  handleChannelSelect,
  isSelected = false,
}) => {
  return (
    <div
      className={`p-4 border-b hover:bg-gray-800 cursor-pointer ${isSelected ? 'bg-gray-800' : ''}`}
      onClick={handleChannelSelect}
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
