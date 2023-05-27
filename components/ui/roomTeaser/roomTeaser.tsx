import React from 'react';
import IRoomTeaser from './roomTeaser.interface';
import { Chats } from '../../chatRoom/ChatRoom.interface';

const RoomTeaser = (props: IRoomTeaser) => {
  const { room, setRoomId, roomId } = props;

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const now = new Date();
  
    // Checking if the date is today
    if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  
    // Checking if the date is from this week
    const startOfWeek = now.getDate() - now.getDay(); 
    const endOfWeek = startOfWeek + 6;
    if (date.getDate() >= startOfWeek && date.getDate() <= endOfWeek) {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    }
  
    // If not today or this week
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }
  
  const formattedDate = formatDate(room.last_message_sent);

  return (
    <button onClick={()=>{setRoomId(roomId)}} className="w-full flex items-center justify-between px-4 hover:bg-gray-700 focus:outline-none mb-5">
      <div className="flex items-center">
        <div className="h-16 w-16 rounded-full overflow-hidden">
          <img placeholder="blur" src="/assets/github_profilepic.png" className="w-full h-full object-cover" />
        </div>
        <div className="ml-4 flex flex-col justify-between items-start h-full">
          <span className="text-white text-2xl font-semibold">{room.name}</span>
          <span className="text-grey-light text-xl ml-1 mt-1">{room.last_message}</span>
        </div>
      </div>
      <span className="text-grey-light text-sm mt-1">{formattedDate}</span>
    </button>
  );
};

export default RoomTeaser;
