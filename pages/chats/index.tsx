import React from 'react';
import Login from '../../components/login/Login';
import Layout from '../../components/Layout';
import { socket, SocketContext } from '../../context/socket/SocketContext';
import { GetServerSideProps } from 'next';
import ChatsPage from '../../components/chatsPage/chatsPage';
import { useRequireAuth } from '../../utils/requireAuth';


const SERVER: string = process.env.REACT_APP_SOCKET_URL;

interface Props {
  data: any;
}
// TODO: wrap contextproviderr over this 

const Chats: React.FC<Props> = ({ data }) => {
    useRequireAuth();
  return (
    <SocketContext.Provider value={socket}> 
      <ChatsPage data={data}  />
    </SocketContext.Provider>

  );
};

export default Chats