'use client';

import React from 'react';
import Channel from './Channel';

const ChannelList = ({ channels, handleChannelSelect, selectedChannel }) => {
  let list = `There is no channels to show`;
  if (channels.length) {
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
    <div id="c-list">
      <div className="m-6">
        <h1 className="text-xl font-semibold">Channels</h1>
      </div>
      {list}
    </div>
  );
};

export default ChannelList;
