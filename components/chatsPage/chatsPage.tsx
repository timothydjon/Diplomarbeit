import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../context/sessionContext';
import ILogoutButton from './chatsPage.interface'
import Sidebar from '../ui/sideBar/Sidebar';
import MessageInput from '../messageInput/MessageInput';
import ChatRoom from '../chatRoom/ChatRoom';
import NewChatOverlay from '../ui/newChatOverlay/NewChatOverlay';

interface IResponse{
 
}

const ChatsPage = (props) => {
  const [newChatOpen, setNewChatOpen] = useState(false)
  const [roomId, setRoomId] = useState(1);

  useEffect(()=>{
    console.log("idchanged:", roomId)
  }, [roomId])
  
  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-default w-full h-full">
        <div className="col-span-5 border-r border-gray-300">
          <Sidebar setRoomId={setRoomId}>
          <button onClick={()=>{setNewChatOpen((prev)=>!prev)}}>test</button>
            <NewChatOverlay setRoomId={setRoomId} setIsOpen={()=>{setNewChatOpen(false)}} isOpen={newChatOpen} />
          </Sidebar>
        </div>
          <ChatRoom roomId={roomId} data={props.data} />
      </div>
    </div>
  );
};

export default ChatsPage;