'use client';

import { StoreContextProvider } from './context/StoreContext';

export function Providers({ children }) {
  return <StoreContextProvider>{children}</StoreContextProvider>;
}
