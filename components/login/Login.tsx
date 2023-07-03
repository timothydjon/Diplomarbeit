import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../context/sessionContext';
import Image from 'next/image';
import AnimatedLogo from '../../assets/src/VIKTIG/viktig-loading-animation-better-res.gif'

const Login = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(SessionContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);
  const emailInputRef = useRef(null);
  const [invalidAttempt, setInvalidAttempt] = useState(false);

const handleLogin = async () => {
  setLoading(true);

  try {
    const response = await fetch(`${process.env.REACT_APP_SOCKET_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: "cors",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      credentials: 'include',
    });

    console.log("Response Status:", response.status); // log the status code
    console.log("Response Headers:", response.headers.get("content-type")); // log content-type header

    if (response.headers.get("content-type").includes("application/json")) {
      const data = await response.json();

      if (response.ok) { // If status code is 2xx
        setLoading(false);
        setUser(data.user);
        setShowAnimation(true);
        
      } else {
        setLoading(false);
        setInvalidAttempt(true);
      }
    } else {
      console.error("Response is not JSON");
      setLoading(false);
    }

  } catch (error) {
    console.error(error);
    setLoading(false);
  }
};

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
        router.push('/chats');
      }, 2000);

      // Clean up on unmount
      return () => clearTimeout(timer);
    }
  }, [showAnimation, router]);

  useEffect(() => {
    // Set focus on email input field when component mounts
    emailInputRef.current.focus();
  }, []);

  return (
    <div className="bg-grey-medium h-screen flex items-center justify-center">
      {showAnimation ? (
        <Image src={AnimatedLogo} alt="Loading Animation" width={250} height={250}/> 
      ) : (
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
              onChange={(e) => { setEmail(e.target.value); setInvalidAttempt(false); }}
              ref={emailInputRef}
              onKeyDown={(event) => { if (event.key === 'Enter') { handleLogin(); } }}
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
              onChange={(e) => { setPassword(e.target.value); setInvalidAttempt(false); }}
              onKeyDown={(event) => { if (event.key === 'Enter') { handleLogin(); } }}
            />
          </div>

          <button
          className={`text-2xl font-bold text-gray-800 mb-6 text-center`}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? '...' : (invalidAttempt ? 'Invalid Credentials' : 'Login')}
        </button>
          </div>
        )}
      </div>
  );
}

export default Login;