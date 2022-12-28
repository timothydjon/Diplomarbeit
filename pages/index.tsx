import React from 'react';
import ChatRoom from '../components/chatRoom/ChatRoom';
import Layout from '../components/Layout'
import { socket, SocketContext } from '../context/socket/SocketContext';



const IndexPage = () => {
  
  return(
    <SocketContext.Provider  value={socket}>
  <Layout title="Home | Next.js + TypeScript Example">
    <ChatRoom/>
  </Layout>
  </SocketContext.Provider> 
)}

export default IndexPage
