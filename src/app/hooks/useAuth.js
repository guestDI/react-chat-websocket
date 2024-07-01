import { useEffect, useState } from 'react';

const useAuth = (onClose, setCurrentUser) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const users = localStorage.getItem('users');
    if (users) {
      setUsers(JSON.parse(users));
    }
  }, []);

  const handleAuth = (username) => {
    const userExists = users.find((u) => u.userName === username);

    if (userExists) {
      setCurrentUser(userExists);
      onClose();
    }
  };

  const registerUser = (user) => {
    const existingUsers = [...users];
    existingUsers.push(user);
    setUsers(existingUsers);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    setCurrentUser(user);
    onClose();
  };

  return {
    handleAuth,
    registerUser,
  };
};

export default useAuth;
