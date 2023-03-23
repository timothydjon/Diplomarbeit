import React, { useContext, useState } from 'react';
import IChatAccordion from './chatAccordion.interface'
import Plus from "../../../public/assets/plus-icon.svg"
import styles from "./chatAccordion.module.scss"
import cn from "classnames"
import CreateChatButton from '../createChatButton/CreateChatButton';

const ChatAccordion = (props: IChatAccordion) => {
const [openIndex, setOpenIndex] = useState(-1);


  const handleLogout = async () => {

    
}
  return (
<div className='flex flex-col'>

<div className='border-b-2 w-full my-4 border-grey-soft' />
  <button onClick={()=>{setOpenIndex(openIndex === 0 ? -1 : 0)}} className='flex  items-center'>
    <span className='text-3xl font-semibold text-white'>People</span>
    <div className='flex items-center' >
    <div className={cn(styles.arrowDownClose, openIndex === 0 && styles.open, "flex items-center")} />
    </div>
    </button>
{/* TODO:  Remove test content and prrovide Create chat button and available chats */}
    <div className={cn("flex flex-col overflow-hidden transition-all duration-300 px-6", openIndex === 0 ? styles.openSubNav : styles.closedSubNav)}>
      <CreateChatButton label="New Chatroom" onClick={()=>{alert("test")}} />
      <h5>test</h5>
      <h5>test</h5>
      <h5>test</h5>
      <h5>test</h5>
    </div>

<div className='border-b-2 w-full my-4 border-grey-soft ' />
    
  <button onClick={()=>{setOpenIndex(openIndex === 1 ? -1 : 1)}} className='flex items-center '>
        <span className='text-3xl font-semibold text-white'>Rooms</span>
    <div className='flex items-center' >
    <div className={cn(styles.arrowDownClose, openIndex === 1 && styles.open, "flex items-center")} />
    </div>
  </button>
  
{/* TODO:  Remove test content and prrovide Create chat button and available chats */}
    <div className={cn("flex flex-col overflow-hidden transition-all duration-300", openIndex === 1 ? styles.openSubNav : styles.closedSubNav)}>
      <CreateChatButton label="New Chatroom" onClick={()=>{alert("test")}} />
      <h5>test</h5>
      <h5>test</h5>
      <h5>test</h5>
      <h5>test</h5>
    </div>
<div className='border-b-2 w-full my-4 border-grey-soft ' />
</div>
  );
};

export default ChatAccordion;