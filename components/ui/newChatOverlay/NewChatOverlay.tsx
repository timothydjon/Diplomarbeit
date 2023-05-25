import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import INewChat from './NewChatOverlay.interface';
import ChatAccordion from '../chatAccordion/chatAccordion';
import Back from '../../../assets/src/back.svg'
import RoomTeaser from '../roomTeaser/roomTeaser';


const SERVER: string = process.env.REACT_APP_SOCKET_URL;
type User = {
  id: number;
  username: string;
}

const NewChatOverlay = (props: INewChat) => {
  const { isOpen, setIsOpen } = props
  const [allUser, setAllUser] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User[]>([])


  const getMatchingUser = (inputString: string) => {
    fetch(`${SERVER}/getMatchingUser/${inputString}`, {
      headers: {
        Accept: "application/json",
        "Accept-Language": "en-US,en;q=0.5",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "If-None-Match": 'W/"1a0-gyQY2A4vzbFCGULjXBn25lhOcOQ"',
      },
      method: "GET",
      mode: "cors",
    })
      .then(async (response) => {
        const data = await response.json();
        setAllUser(data.result);
      })
      .catch((error) => {
        console.error("There was an error fetching matchingUser!");
      });
  }

  useEffect(()=>{
    console.log("allUser",allUser)
  },[allUser])

  // useEffect(() => {
  //   (roomId);
  // }, [roomId])





  const handleChange = (e: any) =>{
    console.log(e.target.value)
    getMatchingUser(e.target.value)

  }
   return (
    <div className={`bg-grey-medium h-full absolute pt-5 px-5 transition-all duration-300 ease-in-out inset-y-0 overflow-hidden ${isOpen ? ' left-0 right-0' : ' -left-[300px] '}`} >
      <button onClick={()=>{setIsOpen()}} ><Back className="w-16 h-16 " /></button>
      <div className='w-full flex flex-col'>
        <input onChange={handleChange} type="search" className='bg-grey-light focus:outline-none rounded-xl overflow-hidden text-30 h-10 mr-20 mt-5 p-3 font-semibold text-2xl' />
        <div>
      {
        //TODO: show a UserTeaser that is clickable 
        !!allUser.length && allUser.map((user: User)=>{
          return <h1>{user.username}</h1>
        })
      }
      </div>
      </div>
   </div>
  );
}

export default NewChatOverlay;