'use client';

import Chat from './chat/Chat';
import { AuthContextProvider } from './context/AuthContext';

export default function Home() {
  return (
    <main>
      <AuthContextProvider>
        <Chat />
        <div
          id="notifyContainer"
          className="fixed bottom-2 left-2 overflow-auto w-40 h-20"
        ></div>
      </AuthContextProvider>
    </main>
  );
}
