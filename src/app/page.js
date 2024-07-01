'use client';

import Chat from './chat/Chat';
import Modal from './components/Modal';
import { AuthContextProvider } from './context/AuthContext';
import { useEffect, useState } from 'react';

const USERNAME = 'di_user';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('userName', USERNAME);
  }, []);

  return (
    <main>
      <AuthContextProvider>
        <Modal />
        <Chat />
        <div
          id="notifyContainer"
          className="fixed bottom-2 left-2 overflow-auto w-40 h-20"
        ></div>
      </AuthContextProvider>
    </main>
  );
}
