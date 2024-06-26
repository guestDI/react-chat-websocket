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
  const [typingStatus, setTypingStatus] = useState('');

  const { currentUser } = useAuthContext();

  const createNotification = () =>
    setNotifications([...notifications, { id: notifications.length }]);

  const deleteNotification = (id) =>
    setNotifications(
      notifications.filter((notification) => notification.id !== id),
    );

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const handleChannelSelect = (id) => {
    socket.emit('channel-join', id, () => {});
  };

  useEffect(() => {
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
  }, [socket]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

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
        <MessagesPanel
          messages={messages}
          currentUser={currentUser}
          typingStatus={typingStatus}
        />
        <MessagesPanelFooter socket={socket} currentUser={currentUser} />
      </div>
      {notifications.map(({ id }) => (
        <Notification onClose={() => deleteNotification(id)} key={id}>
          This is a notification!
        </Notification>
      ))}
    </div>
  );
};

export default Chat;
