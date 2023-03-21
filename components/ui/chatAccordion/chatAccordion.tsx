import React, { useContext, useState } from 'react';
import IChatAccordion from './chatAccordion.interface'
import Plus from "../../../public/assets/plus-icon.svg"
import styles from "./chatAccordion.module.scss"
import cn from "classnames"

const ChatAccordion = (props: IChatAccordion) => {
const [openIndex, setOpenIndex] = useState(0);


  const handleLogout = async () => {

    
}
  return (
<div className='flex flex-col'>
  <div className='flex mb-20'>
    <span>People</span>
    <button onClick={()=>{setOpenIndex(0)}}>
    <div className={cn(styles.arrowDownClose, openIndex === 0 && styles.open)} />
    </button>
    </div>
  <div>
        <span>Rooms</span>
    <button onClick={()=>{setOpenIndex(1)}}>
    <div className={cn(styles.arrowDownClose, openIndex === 1 && styles.open)} />
    </button>
  </div>
  
</div>
  );
};

export default ChatAccordion;