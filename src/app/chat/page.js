'use client';

import React, { useEffect, useState } from 'react';
import ChannelList from './ChannelList';
import MessagesPanel from './MessagesPanel';
import MessagesPanelFooter from './MessagePanelFooter';
import socketIO from 'socket.io-client';
import { useAuthContext } from '../context/AuthContext';
import { db, initializeChannels } from '../../database/firebase';
import { onValue, ref, set } from 'firebase/database';
import ChatHeader from './ChatHeader';
import { useStoreContext } from '../context/StoreContext';
import { useRouter } from 'next/navigation';

const SERVER = 'http://127.0.0.1:8081';
const socket = socketIO.connect(SERVER);

const Chat = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const [channelsLoaded, setChannelsLoaded] = useState(false);

  const { currentUser, loading } = useAuthContext();
  const { channels, setChannels } = useStoreContext();
  const router = useRouter();

  // Инициализируй каналы один раз
  useEffect(() => {
    initializeChannels();
  }, []);

  // Загрузи каналы из Firebase
  useEffect(() => {
    if (channelsLoaded) return; // Не загружай повторно

    const query = ref(db, 'channels');
    const unsubscribe = onValue(
      query,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const channelList = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setChannels(channelList);
          setChannelsLoaded(true);
          console.log('Channels loaded:', channelList);
        }
      },
      (error) => {
        console.error('Error loading channels:', error);
      }
    );

    return () => unsubscribe();
  }, [channelsLoaded]); // Удалил setChannels из зависимостей

  // Сообщения
  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on('messageResponse', handleMessage);
    return () => socket.off('messageResponse', handleMessage);
  }, []);

  // Статус печати
  useEffect(() => {
    const handleTyping = (data) => {
      setTypingStatus(data);
    };

    socket.on('typingResponse', handleTyping);
    return () => socket.off('typingResponse', handleTyping);
  }, []);

  const handleChannelSelect = (channelId) => {
    if (!currentUser) {
      console.error('currentUser is undefined');
      return;
    }

    setSelectedChannel(channelId);
  };

  const handleJoinChannel = () => {
    if (!currentUser) {
      console.error('currentUser is undefined');
      return;
    }

    set(
      ref(db, `channels/${selectedChannel}/participants/${currentUser.id}`),
      {
        username: currentUser.userName,
        displayName: currentUser.displayName,
        joinedAt: new Date().toISOString(),
      }
    )
      .then(() => {
        console.log(
          `User ${currentUser.userName} joined channel ${selectedChannel}`
        );
        socket.emit('joinChannel', { selectedChannel, user: currentUser });
      })
      .catch((error) => {
        console.error('Error adding participant:', error);
      });
  }

  const handleLeaveChannel = async () => {
  if (!selectedChannel || !currentUser) return;

  if (!window.confirm(`Are you sure you want to leave this channel?`)) {
    return;
  }

  try {
    const participantRef = ref(
      db,
      `channels/${selectedChannel}/participants/${currentUser.id}`
    );
    await set(participantRef, null);

    console.log(
      `User ${currentUser.userName} left channel ${selectedChannel}`
    );

    socket.emit('leaveChannel', {
      channelId: selectedChannel,
      user: currentUser,
    });

    setMessages([]);
    setSelectedChannel(null);
    setTypingStatus('');
  } catch (error) {
    console.error('Error leaving channel:', error);
  }
};

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        Please login first
      </div>
    );
  }

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
            className="text-white max-w-40 bg-slate-500 active:bg-slate-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
            type="button"
            onClick={() => router.push('/profile')}
          >
            {currentUser?.displayName}
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <ChatHeader 
          channelName={channels.find(c => c.id === selectedChannel)?.name} 
          isUserInChannel={channels.find(c => c.id === selectedChannel)?.participants?.[currentUser.id]}
          onLeaveChannel={handleLeaveChannel}
          onJoinChannel={handleJoinChannel}
          />
        <MessagesPanel
          messages={messages}
          currentUser={currentUser}
          typingStatus={typingStatus}
        />
        <MessagesPanelFooter
          socket={socket}
          currentUser={currentUser}
          selectedChannelId={selectedChannel}
        />
      </div>
    </div>
  );
};

export default Chat;