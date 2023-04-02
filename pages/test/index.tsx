import React from 'react';
import ChatRoom from '../../components/chatRoom/ChatRoom';
import Layout from '../../components/Layout';
import { socket, SocketContext } from '../../context/socket/SocketContext';
import { GetServerSideProps } from 'next';

const SERVER: string = process.env.REACT_APP_SOCKET_URL;

interface Props {
  data: any;
}

const IndexPage: React.FC<Props> = ({ data }) => {
  return (
    <SocketContext.Provider value={socket}>
      <Layout title="Home | Next.js + TypeScript Example">
        <ChatRoom data={data} />
      </Layout>
      
    </SocketContext.Provider>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const response = await fetch(`${SERVER}/login`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       id: 1,
//       username: 'timothy',
//       password: '1234',
//       email: "timy@timy.com"

//     }),
//     credentials: 'include',
//   });
  
//   const data = await response.json();
//   return {
//     props: { data },
//   };
// };

export default IndexPage;