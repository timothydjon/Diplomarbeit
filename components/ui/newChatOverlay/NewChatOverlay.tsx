import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import INewChat from './NewChatOverlay.interface';
import ChatAccordion from '../chatAccordion/chatAccordion';
import Back from '../../../assets/src/back.svg'



const NewChatOverlay = (props: INewChat) => {
  const { isOpen, setIsOpen } = props
   return (
    <div className={`bg-grey-medium h-full absolute pt-5 pl-5 transition-all duration-300 ease-in-out inset-y-0 overflow-hidden ${isOpen ? ' left-0 right-0' : ' -left-[300px] '}`} >

      <button onClick={()=>{setIsOpen()}} ><Back className="w-16 h-16 " /></button>
   </div>
  );
}

export default NewChatOverlay;