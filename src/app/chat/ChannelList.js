'use client';

import React from 'react';
import Channel from './Channel';

const ChannelList = ({ channels, handleChannelSelect, selectedChannel }) => {
  let list = `There is no channels to show`;
  if (channels) {
    list = channels.map((c, index) => (
      <Channel
        key={c.id}
        id={index}
        name={c.name}
        participants={c.participants}
        handleChannelSelect={handleChannelSelect}
      />
    ));
  }

  return (
    <div className="w-1/4  border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold">Channels</h1>
      </div>
      {list}
    </div>
  );
};

export default ChannelList;
