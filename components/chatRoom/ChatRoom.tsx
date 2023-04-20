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
  const { user } = useContext(SessionContext);
  const [messages, setMessages] = useState<Imessage[]>([]);


  socket.emit('connection', () => {
    console.log("Connected to backend");
  })

  const getMessagesByChatId = (chatId: number) => {
    fetch(`${SERVER}/getMessagesByChatId/${chatId}`, {
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

  socket.on("reload", (arg) => {
    getMessagesByChatId(1);
  })

  useEffect(() => {
    getMessagesByChatId(1);
  }, [])



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
            {user?.id && <MessageInput chat_id={1} user_id={user.id} />}
          </div>
        </div>
      </div>

);
};

export default ChatRoom


