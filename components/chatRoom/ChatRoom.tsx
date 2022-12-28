import React, { useEffect, useState } from 'react'
import IChatRoom from './ChatRoom.interface'
import socketClient from 'socket.io-client'

interface Imessage{
  sender: string;
  content: string;
}

const SERVER = "http://127.0.0.1:8080";

const IndexPage = () => {
  const [messages, setMessages] = useState<Imessage>()
  let socket = socketClient(SERVER);

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
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <button onClick={()=>{handleClick("just testing")}}>testbutton</button>

  </Layout>
)}

export default IndexPage


const ChatRoom = () => {
  return (
    <div>ChatRoom
    
    </div>
  )
}

export default ChatRoom