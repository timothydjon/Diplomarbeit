import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import ISidebar from './Sidebar.interface';
import ChatAccordion from '../chatAccordion/chatAccordion';
import { useOuterClick } from 'react-outer-click';

const Sidebar = (props: ISidebar) => {
  const { children, setRoomId, setNewChatOpen } = props;
  const sidebarRef = useRef(null);

  const handleOuterClick = () => {
    setNewChatOpen(false);
  };

  useOuterClick(sidebarRef, handleOuterClick);

  return (
    <div className="col-span-5 bg-grey-dark px-3 h-full relative" ref={sidebarRef}>
      <ChatAccordion setRoomId={setRoomId} setNewChatOpen={setNewChatOpen} />
      {children}
    </div>
  );
};

export default Sidebar;
