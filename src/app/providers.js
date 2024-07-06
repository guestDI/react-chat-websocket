'use client';

import { AuthContextProvider } from './context/AuthContext';
import { StoreContextProvider } from './context/StoreContext';

export function Providers({ children }) {
  return (
    <AuthContextProvider>
      <StoreContextProvider>{children}</StoreContextProvider>
    </AuthContextProvider>
  );
}
