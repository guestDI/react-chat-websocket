"use client"

import React, { useEffect, useState } from 'react';
import ChannelList from './ChannelList';
import MessagesPanel from './MessagesPanel';
import MessagesPanelFooter from './MessagePanelFooter';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8081');
const Chat = () => {
    const [channels, setChannels] = useState([]);

    const handleChannelSelect = id => {
        socket.emit('channel-join', id, ack => {
        });
    } 

    const loadChannels = async () => {    
        fetch('http://127.0.0.1:8081/getChannels').then(async response => {
            let data = await response.json();
            setChannels(data.channels);
        })
    }

    useEffect(() => {
        loadChannels();
    }, [])

    return (
        <div className="w-full flex h-screen flex-row">
            <ChannelList channels={channels} handleChannelSelect={handleChannelSelect}/>  
            <div className='flex flex-col w-full'>
            <MessagesPanel/>
            <MessagesPanelFooter/>
            </div>
        </div>
    )
};

export default Chat;