"use client"

import React from 'react';
import Channel from './Channel';

const ChannelList = ({channels}) => {
    let list = `There is no channels to show`;
    console.log('c', channels)
        if (channels) {
            list = channels.map((c) => <Channel key={c.id} id={c.id} name={c.name} participants={c.participants}/>)
        }

        return (
            <div className="w-1/4  border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold">Chats</h1>
        </div>
        {list}
      </div>
            );
}

export default ChannelList;