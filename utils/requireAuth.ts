import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { SessionContext } from '../context/sessionContext';

export const useRequireAuth = () => {
  const router = useRouter();
  const { user } = useContext(SessionContext);
  //console.log("requieAuth userdata: ", user);

  useEffect(() => {
    // const currentPage = router.pathname;

    // console.log("pathname: ", currentPage)
    
    // if (!user) {

    //     router.push('/login');
    //   }

  }, [user]);

  return user;
};