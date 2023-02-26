import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../context/sessionContext';


const Login = (props) => {
  const { setUser } = useContext(SessionContext);
  const router = useRouter();

  const handleLogout = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_SOCKET_URL}/logout`);

      const data = await response.json();
      console.log(data);

      // Update session state with user data
      setUser(data.user);

      // Redirect to the dashboard page after successful login
      router.push('/test');
    } catch (error) {
      console.error(error);
    }
}
  return (
    <div>
        <button onClick={handleLogout} />
   </div>
  );
};

export default Login;