'use client';

import Auth from './auth/page';

export default function Home() {
  return (
    <main>
      <Auth />
      <div
        id="notifyContainer"
        className="fixed bottom-2 left-2 overflow-auto w-40 h-20"
      ></div>
    </main>
  );
}
