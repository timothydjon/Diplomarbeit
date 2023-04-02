import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../context/sessionContext';
import ILogoutButton from './chatsPage.interface'
import Sidebar from '../ui/sideBar/Sidebar';
import MessageInput from '../messageInput/MessageInput';
import ChatRoom from '../chatRoom/ChatRoom';

interface IResponse{
 
}

const ChatsPage = (props) => {
  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-default w-full h-full">
        <div className="col-span-5 border-r border-gray-300">
          <Sidebar />
        </div>
          <ChatRoom data={props.data} />
      </div>
    </div>
  );
};

export default ChatsPage;