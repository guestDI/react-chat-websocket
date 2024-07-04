'use client';

import { AuthContextProvider } from './context/AuthContext';

export function Providers({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
