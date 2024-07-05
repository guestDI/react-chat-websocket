import { createContext, useMemo, useContext, useState } from 'react';

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const context = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser, setCurrentUser],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
