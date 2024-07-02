import useAuth from '../hooks/useAuth';
import { createContext, useMemo, useContext, useState } from 'react';

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const { handleAuth, registerUser } = useAuth(closeModal, setCurrentUser);

  const context = useMemo(
    () => ({
      handleAuth,
      registerUser,
      isOpen,
      closeModal,
      currentUser,
    }),
    [handleAuth, registerUser, isOpen, closeModal, currentUser],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
