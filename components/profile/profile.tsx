import React, { useEffect, useState, useContext } from 'react'
import User from './profile.interface'
import { socket, SocketContext } from '../../context/socket/SocketContext'
// import Message from '../message/Message'
import { SessionContext } from '../../context/sessionContext';


const SERVER : string = process.env.REACT_APP_SOCKET_URL;

const Profile = (props) => {
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



const handleChange = (e: React.FormEvent<HTMLInputElement>)=>{
    setUserName(user.username)
}
const handleMsgChange = (e: React.FormEvent<HTMLInputElement>)=>{
    setMsgText(e.currentTarget.value)
}


useEffect(() => {

}, [])




  return(
  <div className="max-w-[300px] mx-auto flex flex-col justify-center">
        {!!user && <h1>Welcome to the Profile Page, {user.username}!</h1>}
        <span>Username: {user.username}</span>
        <span>Email: {user.email}</span>
          
    </div>
)}

export default Profile;