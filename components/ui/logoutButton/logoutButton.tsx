import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../../context/sessionContext';
import ILogoutButton from './logoutButton.interface'

interface IResponse{
    data:{
        user:{
            email?: string;
            username?: string;
            isAdmin?: boolean;
            createOn?: string;

        } | null
    }
}

const LogoutButton = (props: ILogoutButton) => {
  const { setUser } = useContext(SessionContext);
  const router = useRouter();


  const handleLogout = async () => {

    try {
      const response = await fetch(`${process.env.REACT_APP_SOCKET_URL}/logout`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 1,
          username: name,
          password: 'password',
          email: 'test@gmail.com',
        }),
        credentials: 'include',
      });

    //   const data = await response.json ;
    //   console.log("LogoutData: ", data);

      // Update session state with user data
      setUser(null);

      // Redirect to the dashboard page after successful login
      router.push('/test');
    } catch (error) {
      console.error(error);
    }
}
  return (
        <button className={`${props?.className ? props.className : ""} bg-red`} onClick={handleLogout} >
            Logout
        </button>
  );
};

export default LogoutButton;