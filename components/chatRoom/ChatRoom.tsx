import React, { useEffect, useState } from 'react'
import IChatRoom from './ChatRoom.interface'
import { socket, SocketContext } from '../../context/socket/SocketContext'

interface Imessage{
  sender: string;
  content: string;
}

const SERVER : string = process.env.REACT_APP_SOCKET_URL;
console.log(SERVER)
const ChatRoom = () => {
  const [messages, setMessages] = useState<Imessage>()

  socket.emit('connection', ()=>{
    console.log("Connected to backend");
  })

  const handleClick = (content: string)=>{
    console.log("testing");
    socket.emit('test', {sender: "timy" ,content: content})
  }

const getMessages = ()=>{
  fetch(SERVER+"/getMessages").then(res => res.json()).then((data)=>{setMessages(data)})
}

socket.on("reload", (arg)=>{
  getMessages();
  console.log("testevent")
})

useEffect(() => {
  getMessages();
}, [])

useEffect(()=>{
  console.log("Messages:",messages);
}, [messages])


  return(
  <div>
    <h1>Hello Next.js 👋</h1>
    <button className="bg-red-700" onClick={()=>{handleClick("just testing")}}>testbutton</button>
    </div>
)}

export default ChatRoom