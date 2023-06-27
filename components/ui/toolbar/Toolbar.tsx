import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import IToolbar from './Toolbar.interface';
import { SessionContext } from '../../../context/sessionContext';
import { User } from '../newChatOverlay/NewChatOverlay';
import UserPreview from '../userPreview/userPreview';
// import styles from "./Toolbar.scss" 
import classNames from 'classnames';

const Toolbar = (props: IToolbar) => {
  const { currentRoomId ,...rest } = props;
    const { user } = useContext(SessionContext);
    const [chatUser, setChatUser] = useState<User[]>([])

const getChatUser = async () => {
  console.log("working");

  try {
    const response = await fetch(`${process.env.REACT_APP_SOCKET_URL}/getUserByChatId`, {
      method: 'POST', // Change the method to POST since you are sending a request body
      headers: {
        'Content-Type': 'application/json',
      },
      mode: "cors",
      body: JSON.stringify({
        currentUserId: user.id,
        chat_id: currentRoomId
      }),
      credentials: 'include',
    });
    
    const data = await response.json();
    setChatUser(data)
    // console.log("DATA", data);
  } catch (error) {
    console.error(error);
  }
}

  useEffect(()=>{
    getChatUser()
  },[currentRoomId])





  return (
    <div className='h-20 flex'>
      <Swiper
       spaceBetween={5}
       direction='horizontal'
      slidesPerView={"auto"}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className={classNames(' max-w-[55%] flex overflow-hidden')}>
      {!!chatUser.length && chatUser.map((user: User)=>{
        return(
          <SwiperSlide className='w-min ' key={user.id + user.username}><UserPreview user={user}/></SwiperSlide>
          )
        })}
        </Swiper>
    </div>
  );
};

export default Toolbar;