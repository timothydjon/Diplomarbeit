import React, { useContext, useEffect, useState } from 'react';
import IRoomTeaser from './roomTeaser.interface';
import { Chats } from '../../chatRoom/ChatRoom.interface';
import { SessionContext } from '../../../context/sessionContext';
import { getUserById } from '../../../utils/getUserById';

const RoomTeaser = (props: IRoomTeaser) => {
  const { room, setRoomId, currentRoomId } = props;
  const [roomName, setRoomName] = useState("")
  const { user } = useContext(SessionContext);
// console.log("roomprops", props)
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const now = new Date();

    // Checking if the date is today
    if (isSameDay(date, now)) {
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    }

    // Checking if the date is yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (isSameDay(date, yesterday)) {
      return 'Yesterday';
    }

    // Checking if the date is from this week
    if (isSameWeek(date, now)) {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    // If not today or this week
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  }

  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function isSameWeek(date1, date2) {
    const diff = Math.abs(date1 - date2);
    const oneDay = 1000 * 60 * 60 * 24;
    const daysDiff = Math.floor(diff / oneDay);
    return daysDiff <= 6 && date1.getDay() >= date2.getDay();
  }

  const formattedDate = formatDate(room.last_message_sent);

  useEffect(()=>{
    if(user?.id === room.chat_admin_id || room.isRoom || !room.chat_admin_id){
      setRoomName(room.name)
    } else {
      const fetchChats = async () => {
      const result = await getUserById(room.chat_admin_id); 
      setRoomName(result.username)
        // console.log("RESRES",result)
    };

    if (user) {
      fetchChats();
    }
    }
  })

  return (
    <button onClick={() => { setRoomId(room.id) }} className={`w-full flex items-center justify-between transition-all hover:bg-grey-light/10 duration-200 ease-in-out  px-4 hover:bg-gray-700 focus:outline-none mb-2  rounded-lg py-2 ${room.id === currentRoomId && "bg-grey-light/20 hover:bg-grey-light/20"}`}>
      <div className="flex items-center">
        <div className="h-16 w-16 rounded-full overflow-hidden">
          <img placeholder="blur" src="/assets/github_profilepic.png" className="w-full h-full object-cover" />
        </div>
        <div className="ml-4 flex flex-col justify-between items-start h-full">
          <span className="text-white text-2xl font-semibold">{roomName}</span>
          <span className="text-grey-light text-xl ml-1 mt-1">{room.last_message}</span>
        </div>
      </div>
      <span className="text-grey-light text-sm mt-1">{formattedDate}</span>
    </button>
  );
};

export default RoomTeaser;
