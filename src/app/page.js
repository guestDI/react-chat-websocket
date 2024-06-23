'use client';

import Chat from './chat/Chat';
import { useEffect } from 'react';

const USERNAME = 'di_user';

export default function Home() {
  useEffect(() => {
    localStorage.setItem('userName', USERNAME);
  }, []);

  return (
    <main>
      <Chat />
    </main>
  );
}
