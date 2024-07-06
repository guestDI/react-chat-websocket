import {
  createContext,
  useMemo,
  useContext,
  useState,
  useCallback,
} from 'react';

const StoreContext = createContext({});

export const useStoreContext = () => useContext(StoreContext);

export const StoreContextProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);

  const updateParticipants = useCallback(
    ({ channelId, user }) => {
      if (channels[channelId]?.participants?.[user.id]) {
        return;
      } else {
        setChannels((prev) => {
          let oldChannels = prev.slice(0);
          const newChannels = (oldChannels[channelId].participants[user.id] = {
            username: user.userName,
          });
          return newChannels;
        });
      }
    },
    [channels],
  );

  const context = useMemo(
    () => ({
      channels,
      setChannels,
      updateParticipants,
    }),
    [channels, setChannels, updateParticipants],
  );

  return (
    <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
  );
};
