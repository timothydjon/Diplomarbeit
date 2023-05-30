import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import ISidebar from './Sidebar.interface';
import ChatAccordion from '../chatAccordion/chatAccordion';
import { useOuterClick } from 'react-outer-click';
import LogoutButton from '../logoutButton/logoutButton';
import Link from "next/link"

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
      <Link href="/users/1">user with id 1</Link>
              <LogoutButton />
    </div>
  );
};

export default Sidebar;
