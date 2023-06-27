import React from 'react';
import IRoomTeaser from './userTeaser.interface';
import { Chats } from '../../chatRoom/ChatRoom.interface';

const UserTeaser= (props: IRoomTeaser) => {
  const { user, isSelected = false, ...rest } = props;

  return (
  <button {...rest}  className={`w-full flex items-center p-4 h  border-2  border-grey-light rounded-3xl   focus:outline-none mb-5  ${isSelected ? "bg-purple hover:bg-purple/80" : "hover:bg-grey-soft "}`}>
      <div className="h-16 w-16 rounded-full overflow-hidden">
        <img placeholder="blur" src="/assets/github_profilepic.png" className="w-full h-full object-cover" />
      </div>
      <div className="ml-4 flex flex-col justify-between items-start h-full">
        <span className="text-white text-2xl font-semibold">{user.username}</span>
      </div>
    </button>
  );
};

export default UserTeaser;
