import { createContext, useMemo, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Загрузи пользователя из cookies при загрузке приложения
  useEffect(() => {
    const userId = Cookies.get('userId');
    const userName = Cookies.get('userName');
    const displayName = Cookies.get('displayName');
    const token = Cookies.get('access_token');

    if (userId && userName && displayName && token) {
      setCurrentUser({
        id: userId,
        userName,
        displayName,
      });
      console.log('User loaded from cookies:', { userId, userName, displayName });
    } else {
      console.log('No user found in cookies');
    }
    
    setLoading(false);
  }, []);

  const context = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      loading,
    }),
    [currentUser, setCurrentUser, loading],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};