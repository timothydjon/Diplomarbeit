import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../context/sessionContext';

const Login = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);


  const handleLogin = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_SOCKET_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: 'include',
      });
      console.log("response:", response )
      const data = await response.json();
      console.log(data);
      setLoading(false);

      // Update session state with user data
      setUser(data.user);

      // Redirect to the dashboard page after successful login
      router.push('/chats');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Set focus on email input field when component mounts
    emailInputRef.current.focus();
  }, []);

  return (
    <div className="bg-grey-medium h-screen flex items-center justify-center">
      <div className="bg-grey-light shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome to <span className="">VIKTIG</span></h1>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            ref={emailInputRef}
            
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>{setPassword(e.target.value); console.log(e.target.value)}}
            onKeyDown={(event) => {if (event.key === 'Enter') {handleLogin();}}}
          />
        </div>
        <button
          className={`text-2xl font-bold text-gray-800 mb-6 text-center`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

export default Login;