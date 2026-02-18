import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useRegister = () => {
  const router = useRouter();

  const register = async (username, displayName, email) => {
    try {
      const response = await fetch('http://localhost:8081/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, displayName, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      Cookies.set('access_token', data.token);
      Cookies.set('userId', data.id);
      Cookies.set('userName', data.username);
      Cookies.set('displayName', data.displayName);

      router.push('/chat');
      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  return { register };
};

export default useRegister;