import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../context/sessionContext';
import ILogoutButton from './chatsPage.interface'
import Sidebar from '../ui/sideBar/Sidebar';
import MessageInput from '../messageInput/MessageInput';

interface IResponse{
 
}

const ChatsPage = (props) => {
  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-6 w-full h-full">
        <div className="col-span-1 border-r border-gray-300">
          <Sidebar />
        </div>
        <div className="col-span-5 flex flex-col justify-between p-4 bg-gray-100">
          {/* Your chat messages and related components can go here */}
        <div className="w-full border-t border-gray-300 p-4">
          <MessageInput user_id={0} chat_id={0} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;