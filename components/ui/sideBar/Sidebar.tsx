import { useContext, useRef } from 'react';
import ISidebar from './Sidebar.interface';
import ChatAccordion from '../chatAccordion/chatAccordion';
import { useOuterClick } from 'react-outer-click';
import LogoutButton from '../logoutButton/logoutButton';
import Link from "next/link"
import { SessionContext } from '../../../context/sessionContext';
import Logo from '../../../assets/Logo'

const Sidebar = (props: ISidebar) => {
  const { children, setRoomId, setNewChatOpen, currentRoomId } = props;
  const sidebarRef = useRef(null);
  
  const { user } = useContext(SessionContext);

  const handleOuterClick = () => {
    setNewChatOpen(false);
  };

  useOuterClick(sidebarRef, handleOuterClick);

  return (
    <div className="col-span-5 bg-grey-dark px-3 h-full relative flex flex-col" ref={sidebarRef}>
      <ChatAccordion currentRoomId={currentRoomId} setRoomId={setRoomId} setNewChatOpen={setNewChatOpen} />
      {children}
      <div className='w-full flex flex-col h-full pb-6'>
    <div className='mt-auto flex justify-center items-center'>
        <Logo />
    </div>
    {
        user?.id &&
        <Link 
        className='mt-auto text-center w-full py-3 border-gray-600 bg-grey-medium text-white hover:bg-grey-medium/70 rounded-lg shadow-md transition-all duration-200 ease-in-out font-semibold mb-2' 
        href={`/users/${user?.id}`} target='_'>
            Your Profile
        </Link>
    }
    <LogoutButton />


      </div>
    </div>
  );
};

export default Sidebar;
