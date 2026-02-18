'use client';

import { StoreContextProvider } from './context/StoreContext';
import { AuthContextProvider } from './context/AuthContext';

export function Providers({ children }) {
  return (
    <AuthContextProvider>
      <StoreContextProvider>
        {children}
      </StoreContextProvider>
    </AuthContextProvider>
  );
}
