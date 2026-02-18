'use client';

import React from 'react';
import Channel from './Channel';

const ChannelList = ({ channels, handleChannelSelect, selectedChannel }) => {
  let list = `There is no channels to show`;

  const selectChannel = (id) => {
    if (handleChannelSelect) {
      handleChannelSelect(id);
    }
  }

  if (channels.length) {
    list = channels.map((c) => (
      <Channel
        key={c.id}
        name={c.name}
        participants={c.participants}
        isSelected={selectedChannel === c.id}
        handleChannelSelect={() => selectChannel(c.id)}
      />
    ));
  }

  return (
    <div id="c-list">
      <div className="m-6">
        <h1 className="text-xl font-semibold">Channels</h1>
      </div>
      {list}
    </div>
  );
};

export default ChannelList;
