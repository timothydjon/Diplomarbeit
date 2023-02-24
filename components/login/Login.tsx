import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../context/sessionContext';

const Login = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(SessionContext);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_SOCKET_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          username: 'ttttt',
          password: '1234',
          email: 'timy@timy.com',
        }),
        credentials: 'include',
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      // Update session state with user data
      setUser(data.user);

      // Redirect to the dashboard page after successful login
      router.push('/test');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;