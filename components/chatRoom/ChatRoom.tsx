import React, { useEffect, useState, useContext } from 'react'
import IChatRoom, { Chats, Imessage } from './ChatRoom.interface'
import { socket, SocketContext } from '../../context/socket/SocketContext'
import Message from '../ui/message/Message'
import { SessionContext } from '../../context/sessionContext';
import LogoutButton from '../ui/logoutButton/logoutButton';
import MessageInput from '../messageInput/MessageInput';
import styles from './ChatRoom.module.scss'
import Sidebar from '../ui/sideBar/Sidebar';


const SERVER: string = process.env.REACT_APP_SOCKET_URL;

const ChatRoom = (props: IChatRoom) => {
  const {roomId} = props
  const { user } = useContext(SessionContext);
  const [messages, setMessages] = useState<Imessage[]>([]);

  const getMessagesByChatId = (roomId: number) => {
    fetch(`${SERVER}/getMessagesByChatId/${roomId}`, {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "If-None-Match": 'W/"1a0-gyQY2A4vzbFCGULjXBn25lhOcOQ"',
      },
      method: "GET",
      mode: "cors",
    })
      .then(async (response) => {
        const data = await response.json();
        setMessages(data.result);
      })
      .catch((error) => {
        console.error("There was an error fetching profileList!");
      });
  }

  useEffect(() => {
    // when the component mounts, join the chat room
    socket.emit('join_room', roomId);
  
    getMessagesByChatId(roomId);
    
    const newMessageHandler = (newMessage) => {
      if (newMessage.chat_id === roomId) {
        setMessages((messages) => [...messages, newMessage]);
      }
    };
    
    socket.on("new_message", newMessageHandler);
  
    return () => {
      socket.off("new_message", newMessageHandler);
    };
  }, [roomId]);
  


const addMessage = (newMessage: Imessage) => {
  setMessages(prevMessages => [...prevMessages, newMessage]);
}

return (
      <div className={`${styles.container} col-span-19 flex flex-col justify-between p-4 bg-gray-100`}>
        <div className="w-full">
          <div className=" mx-auto flex  flex-col justify-center">
            {!!user && <h1>Welcome, {user.username}!</h1>}
            <div className='flex flex-col-reverse h-[80vh] overflow-auto'>
            <div className="w-full flex flex-col">
              {messages.length > 0 &&
                messages.map((msg, index) => {
                  // TODO: key prop needs fix
                  return (
                    <React.Fragment key={index}>
                      {!!user && (
                        <Message isSender={msg.user_id === user.id} message={msg} />
                      )}
                    </React.Fragment>
                  );
                })}
              <LogoutButton />
            </div>
                </div>
          </div>

          <div className="w-full border-t border-gray-300 p-4">
          {user?.id && <MessageInput chat_id={roomId} user_id={user.id} addMessage={addMessage} />}
          </div>
        </div>
      </div>

);
};

export default ChatRoom


