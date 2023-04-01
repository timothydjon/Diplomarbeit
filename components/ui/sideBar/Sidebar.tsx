import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import ISidebar from './Sidebar.interface';
import ChatAccordion from '../chatAccordion/chatAccordion';



const Sidebar = (props: ISidebar) => {
   return (
    <div className="col-span-5 bg-grey-dark px-3 h-full" >
      <ChatAccordion />
   </div>
  );
}

export default Sidebar;