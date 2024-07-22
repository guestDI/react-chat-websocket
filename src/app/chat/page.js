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
import { useStoreContext } from '../context/StoreContext';
import { useRouter } from 'next/navigation';

const SERVER = 'http://127.0.0.1:8081';

const socket = socketIO.connect(SERVER);
const Chat = () => {
  const [selectedChannel, setSelectedChannel] = useState({});
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');

  const { currentUser } = useAuthContext();
  const { channels, setChannels, updateParticipants } = useStoreContext();
  const router = useRouter();

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  const handleChannelSelect = (channelId) => {
    updateParticipants({ channelId, user: currentUser });

    set(ref(db, `channels/${channelId}/participants/` + currentUser.id), {
      username: currentUser.userName,
    })
      .then(() => {
        console.info('User joined channel');
      })
      .catch((error) => {
        console.error('Error adding participant:', error);
      });
  };

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

  // if (!currentUser) {
  //   redirect('/auth');
  // }

  return (
    <div className="w-full flex h-screen flex-row bg-gray-900">
      <div className="flex flex-col w-1/4 border-r border-gray-200 justify-between">
        <ChannelList
          channels={channels}
          handleChannelSelect={handleChannelSelect}
          selectedChannel={selectedChannel}
        />
        <div className="h-20 flex items-center justify-center border-t border-gray-200">
          <button
            className={
              'text-white max-w-40 bg-slate-500 active:bg-slate-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none'
            }
            type="button"
            onClick={() => router.push('/profile')}
          >
            Profile
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <ChatHeader />
        <MessagesPanel
          messages={messages}
          currentUser={currentUser}
          typingStatus={typingStatus}
        />
        <MessagesPanelFooter socket={socket} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Chat;
