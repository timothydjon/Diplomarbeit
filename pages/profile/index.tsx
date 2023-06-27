import React from 'react';
import Login from '../../components/login/Login';
import Layout from '../../components/Layout';
import { socket, SocketContext } from '../../context/socket/SocketContext';
import { GetServerSideProps } from 'next';
import Profile from '../../components/profile/profile';


const SERVER: string = process.env.REACT_APP_SOCKET_URL;

interface Props {
  data: any;
}
// TODO: wrap contextproviderr over this 

const ProfilePage: React.FC<Props> = ({ data }) => {
  return (
    <Profile />
  );
};



export default ProfilePage;