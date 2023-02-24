import React from 'react';
import ChatRoom from '../components/chatRoom/ChatRoom';
import Layout from '../components/Layout';
import { socket, SocketContext } from '../context/socket/SocketContext';
import { GetServerSideProps } from 'next';

const SERVER: string = process.env.REACT_APP_SOCKET_URL;

interface Props {
  data: any;
}

const IndexPage: React.FC<Props> = ({ data }) => {
  return (
    <h1>
      Viktig
    </h1>
  );
};


export default IndexPage;