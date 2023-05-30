import React, { useContext, useEffect, useState } from 'react';
import IChatAccordion from './Toolbar.interface'
import styles from "./CreateChatButton.module.scss"
import cn from "classnames"
import IToolbar from './Toolbar.interface';
import { SessionContext } from '../../../context/sessionContext';
import { User } from '../newChatOverlay/NewChatOverlay';
import UserTeaser from '../userTeaser/userTeaser';
import UserPreview from '../userPreview/userPreview';

const Toolbar = (props: IToolbar) => {
  const { currentRoomId ,...rest } = props;
    const { user } = useContext(SessionContext);
    const [chatUser, setChatUser] = useState<User[]>([])

const getChatUser = async () => {
  console.log("working");

  try {
    const response = await fetch(`${process.env.REACT_APP_SOCKET_URL}/getUserByChatId`, {
      method: 'POST', // Change the method to POST since you are sending a request body
      headers: {
        'Content-Type': 'application/json',
      },
      mode: "cors",
      body: JSON.stringify({
        currentUserId: user.id,
        chat_id: currentRoomId
      }),
      credentials: 'include',
    });
    
    const data = await response.json();
    setChatUser(data)
    // console.log("DATA", data);
  } catch (error) {
    console.error(error);
  }
}

  useEffect(()=>{
    getChatUser()
  },[currentRoomId])





  return (
    <div className='h-20 flex'>{!!chatUser.length && chatUser.map((user: User)=>{
      return(
        <span className='mr-2' key={user.id}><UserPreview user={user}/></span>
      )
    })}</div>
  );
};

export default Toolbar;