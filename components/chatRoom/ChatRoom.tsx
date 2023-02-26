import React, { useEffect, useState, useContext } from 'react'
import IChatRoom, { Imessage } from './ChatRoom.interface'
import { socket, SocketContext } from '../../context/socket/SocketContext'
import Message from '../message/Message'
import { SessionContext } from '../../context/sessionContext';
import LogoutButton from '../logoutButton/logoutButton';


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
    socket.emit('test', {sender: user.username ,content: content})
  }

const getMessages = ()=>{
  fetch(SERVER+"/getMessages").then(res => res.json()).then((data)=>{setMessages(data.items); console.log("len", messages.length)})
}

socket.on("reload", (arg)=>{
  getMessages();
  console.log("testevent")
})

const handleChange = (e: React.FormEvent<HTMLInputElement>)=>{
    setUserName(user.username)
}
const handleMsgChange = (e: React.FormEvent<HTMLInputElement>)=>{
    setMsgText(e.currentTarget.value)
}


useEffect(() => {
  getMessages();
}, [])

useEffect(()=>{
  console.log("Messages:",messages);
}, [messages])


  return(
  <div className="max-w-[300px] mx-auto flex flex-col justify-center">
        {!!user && <h1>Welcome, {user.username}!</h1>}

    <input 
        type="text" 
        className=" mb-2 bg-brown text-white" 
        placeholder='input a name'
        onChange={handleChange}
     />

    <button className="bg-green mb-2" onClick={()=>{handleClick(msgText)}}>testbutton</button>
    <div className="w-full flex flex-col">

    {messages.length > 0 && messages.map((msg, index)=>{
        console.log("msg", msg)
        return(
            <>
                {!!user && <Message isSender={msg.sender === user.username} message={msg} />}
            </>
        )
    })}
    <input 
        type="text" 
        className=" mb-2 bg-brown text-white" 
        placeholder='Message here'
        onChange={handleMsgChange}
     />
     <LogoutButton />
    </div>
    </div>
)}

export default ChatRoom