import React, { useEffect, useState, useContext } from 'react'
import IChatRoom, { Imessage } from './ChatRoom.interface'
import { socket, SocketContext } from '../../context/socket/SocketContext'
import Message from '../ui/message/Message'
import { SessionContext } from '../../context/sessionContext';
import LogoutButton from '../ui/logoutButton/logoutButton';
import MessageInput from '../messageInput/MessageInput';


const SERVER : string = process.env.REACT_APP_SOCKET_URL;

const ChatRoom = (props: IChatRoom) => {
  const [messages, setMessages] = useState<Imessage[]>([])
  const [userName, setUserName ] = useState <string>("timy");
  const [msgText, setMsgText ] = useState <string>("justadummy");
  const { user } = useContext(SessionContext);
  // const { data: session } = useSession();
  
  socket.emit('connection', ()=>{
    console.log("Connected to backend");
  })

  const handleClick = (content: string)=>{
    console.log("testing");
    //socket.emit('test', {sender: user.username ,content: content})
  }

const getMessagesByChatId = (/* chatId: number*/)=>{
  fetch(`${SERVER}/getMessagesByChatId/${1}`, {
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

socket.on("reload", (arg)=>{
  getMessagesByChatId();

})

const handleChange = (e: React.FormEvent<HTMLInputElement>)=>{
    setUserName(user.username)
}
const handleMsgChange = (e: React.FormEvent<HTMLInputElement>)=>{
    setMsgText(e.currentTarget.value)
}


useEffect(() => {
  getMessagesByChatId();
}, [])

useEffect(()=>{
  //console.log("Messages:",messages);
}, [])


  return(
    <div className='w-full'>

  <div className="max-w-[300px] mx-auto flex flex-col justify-center">
        {!!user && <h1>Welcome, {user.username}!</h1>}

{/*     <input 
        type="text" 
        className=" mb-2 bg-brown text-white" 
        placeholder='input a name'
        onChange={handleChange}
        />
        
      <button className="bg-green mb-2" onClick={()=>{handleClick(msgText)}}>testbutton</button> */}
    <div className="w-full flex flex-col">

    {messages.length > 0 && messages.map((msg, index) => {
      return(
        <>
                {!!user && <Message isSender={msg.user_id === user.id} message={msg} />}
            </>
        )
      })}
{/*     <input 
        type="text" 
        className=" mb-2 bg-brown text-white" 
        placeholder='Message here'
        onChange={handleMsgChange}
      /> */}
     <LogoutButton />
    </div>
    </div>
     {user?.id && <MessageInput chat_id={1} user_id={user.id}/> }
      </div>
)}

export default ChatRoom