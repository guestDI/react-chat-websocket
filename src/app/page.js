'use client';

import Chat from './chat/Chat';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';

const USERNAME = 'di_user';

export default function Home() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem('userName', USERNAME);
  }, []);

  return (
    <main>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Chat />
    </main>
  );
}
