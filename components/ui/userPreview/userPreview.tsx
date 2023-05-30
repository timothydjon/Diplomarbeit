import React from 'react';
import IRoomTeaser from './userPreview.interface';
import { Chats } from '../../chatRoom/ChatRoom.interface';
import Link from "next/link"
import styles from "./userPreview.module.scss"

const UserPreview= (props: IRoomTeaser) => {
  const { user, ...rest } = props;

  return (
  <Link {...rest} target='' href={`/users/${user.id}`} className={`${styles.userPreview} w-full flex items-center p-1 h border-2 border-grey-light rounded-3xl focus:outline-none mb-5 mr-2 `}>
      <div className="h-16 w-16 rounded-full overflow-hidden">
        <img placeholder="blur" src="/assets/github_profilepic.png" className={`w-full h-full object-cover ${styles.userImage}`} />
      </div>
      <div className="ml-4 flex flex-col justify-between items-start h-full">
        <span className={`text-white text-xl font-semibold ${styles.username}`}>{user.username}</span>
      </div>
    </Link>
  );
};

export default UserPreview;
