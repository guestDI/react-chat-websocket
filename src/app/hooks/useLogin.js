import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const useLogin = () => {
  const router = useRouter();

  const login = async (username) => {
    const response = await fetch('http://localhost:8081/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    const user = await response.json();

    if (user && user.token) {
      Cookies.set('access_token', user.token);

      Cookies.set('access_token', user.token);

      Cookies.set('userName', user.username);
      Cookies.set('displayName', user.displayName);
      Cookies.set('userId', user.id);

      router.push('/chat');
    }
  };

  return { login };
};

export default useLogin;
