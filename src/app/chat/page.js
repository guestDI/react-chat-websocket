'use client';

import React, { useEffect, useState } from 'react';
import ChannelList from './ChannelList';
import MessagesPanel from './MessagesPanel';
import MessagesPanelFooter from './MessagePanelFooter';
import socketIO from 'socket.io-client';
import Notification from '../components/Notification';
import { useAuthContext } from '../context/AuthContext';
import { db } from '../../database/firebase';
import { onValue, ref, set } from 'firebase/database';
import ChatHeader from './ChatHeader';

const SERVER = 'http://127.0.0.1:8081';

const socket = socketIO.connect(SERVER);
const Chat = () => {
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState({});
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

  const handleChannelSelect = (channelId) => {
    set(ref(db, `channels/${channelId}/participants/` + currentUser.id), {
      username: currentUser.userName,
    })
      .then(() => {
        socket.emit('channel-join', { channels, channelId }, () => {});
      })
      .catch((error) => {
        console.error('Error adding participant:', error);
      });
  };

  socket.on('channel', (channel) => {
    let oldChannels = channels.slice(0);
    oldChannels.forEach((c) => {
      if (c.id === channel.id) {
        c.participants = channel.participants;
      }
    });

    // createNotification();
    setChannels(oldChannels);
    setSelectedChannel({ ...channel });
  });

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    const query = ref(db, 'channels');
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((channel) => {
          setChannels((channels) => [...channels, channel]);
        });
      }
    });
  }, []);

  if (!currentUser) return;

  return (
    <div className="w-full flex h-screen flex-row">
      <ChannelList
        channels={channels}
        handleChannelSelect={handleChannelSelect}
        selectedChannel={selectedChannel}
      />
      <div className="flex flex-col w-full">
        <ChatHeader />
        <MessagesPanel
          messages={messages}
          currentUser={currentUser}
          typingStatus={typingStatus}
        />
        <MessagesPanelFooter socket={socket} currentUser={currentUser} />
      </div>
      {/* {notifications.map(({ id }) => (
        <Notification onClose={() => deleteNotification(id)} key={id}>
          This is a notification!
        </Notification>
      ))} */}
    </div>
  );
};

export default Chat;
