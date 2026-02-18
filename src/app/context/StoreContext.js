import {
  createContext,
  useMemo,
  useContext,
  useState,
} from 'react';

const StoreContext = createContext({});

export const useStoreContext = () => useContext(StoreContext);

export const StoreContextProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);

  const context = useMemo(
    () => ({
      channels,
      setChannels,
    }),
    [channels]
  );

  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
};