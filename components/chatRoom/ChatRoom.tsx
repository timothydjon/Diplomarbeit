import React, { useEffect, useState } from 'react'
import IChatRoom from './ChatRoom.interface'
import { socket, SocketContext } from '../../context/socket/SocketContext'
import Message from '../message/Message'

interface Imessage{
  sender: string;
  content: string;
}

const SERVER : string = process.env.REACT_APP_SOCKET_URL;
console.log(SERVER)

const ChatRoom = () => {
  const [messages, setMessages] = useState<Imessage[]>([])
  const [userName, setUserName ] = useState <string>("timy");
  const [msgText, setMsgText ] = useState <string>("justadummy");

  socket.emit('connection', ()=>{
    console.log("Connected to backend");
  })

  const handleClick = (content: string)=>{
    console.log("testing");
    socket.emit('test', {sender: userName ,content: content})
  }

const getMessages = ()=>{
  fetch(SERVER+"/getMessages").then(res => res.json()).then((data)=>{setMessages(data.items); console.log("len", messages.length)})
}

socket.on("reload", (arg)=>{
  getMessages();
  console.log("testevent")
})

const handleChange = (e: React.FormEvent<HTMLInputElement>)=>{
    setUserName(e.currentTarget.value)
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
                <Message isSender={msg.sender === userName} message={msg} />
            </>
        )
    })}
    <input 
        type="text" 
        className=" mb-2 bg-brown text-white" 
        placeholder='input a name'
        onChange={handleMsgChange}
     />
    </div>
    </div>
)}

export default ChatRoom