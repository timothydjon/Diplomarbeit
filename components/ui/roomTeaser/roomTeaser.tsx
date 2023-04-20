import React from 'react';
import IRoomTeaser from './roomTeaser.interface';
import { Chats } from '../../chatRoom/ChatRoom.interface';

const RoomTeaser = (props: IRoomTeaser) => {
  const { room, setRoomId, roomId } = props;
  console.log("room: ", room);

  return (
    <button onClick={()=>{setRoomId(roomId)}} className="w-full flex items-center px-4 hover:bg-gray-700 focus:outline-none mb-5">
      <div className="h-16 w-16 rounded-full overflow-hidden">
        <img placeholder="blur" src="/assets/github_profilepic.png" className="w-full h-full object-cover" />
      </div>
      <div className="ml-4 flex flex-col justify-between items-start h-full">
        <span className="text-white text-2xl font-semibold">{room.name}</span>
        <span className="text-grey-light text-xl ml-1 mt-1">{room.last_message} </span>
      </div>
    </button>
  );
};

export default RoomTeaser;
