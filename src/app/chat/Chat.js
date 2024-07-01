'use client';

import React, { useEffect, useState } from 'react';
import ChannelList from './ChannelList';
import MessagesPanel from './MessagesPanel';
import MessagesPanelFooter from './MessagePanelFooter';
import socketIO from 'socket.io-client';
import Notification from '../components/Notification';
import { useAuthContext } from '../context/AuthContext';

const SERVER = 'http://127.0.0.1:8081';

const socket = socketIO.connect(SERVER);
const Chat = () => {
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const { currentUser } = useAuthContext();

  const createNotification = () =>
    setNotifications([...notifications, { id: notifications.length }]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const handleChannelSelect = (id) => {
    socket.emit('channel-join', id, () => {});
  };

  socket.on('channel', (channel) => {
    let oldChannels = channels.slice(0);
    oldChannels.forEach((c) => {
      if (c.id === channel.id) {
        c.participants = channel.participants;
      }
    });

    createNotification();
    setChannels(oldChannels);
  });

  const loadChannels = async () => {
    fetch('http://127.0.0.1:8081/getChannels').then(async (response) => {
      let data = await response.json();
      setChannels(data.channels);
    });
  };

  useEffect(() => {
    loadChannels();
  }, []);

  if (!currentUser) return;

  return (
    <div className="w-full flex h-screen flex-row">
      <ChannelList
        channels={channels}
        handleChannelSelect={handleChannelSelect}
      />
      <div className="flex flex-col w-full">
        <MessagesPanel messages={messages} currentUser={currentUser} />
        <MessagesPanelFooter socket={socket} currentUser={currentUser} />
      </div>
      {notifications.map(({ id }) => (
        <Notification onClose={() => {}} key={id}>
          This is a notification!
        </Notification>
      ))}
    </div>
  );
};

export default Chat;
