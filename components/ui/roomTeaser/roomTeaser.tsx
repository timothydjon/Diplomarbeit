import React from 'react';
import IRoomTeaser from './roomTeaser.interface';
import { Chats } from '../../chatRoom/ChatRoom.interface';


const RoomTeaser = (props: IRoomTeaser) => {
  const { room } = props;
console.log("room: ",room)
  return (
    <div className="flex flex-col">
      <span>{room.name}</span>
      <span>{room.last_message}</span>
    </div>
  );
};

export default RoomTeaser;
