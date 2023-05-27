import { useContext, useState, useEffect, useRef } from 'react';
import UserTeaser from '../userTeaser/userTeaser';
import { useRouter } from 'next/router';
import INewChat from './NewChatOverlay.interface';
import ChatAccordion from '../chatAccordion/chatAccordion';
import Back from '../../../assets/src/back.svg'
import RoomTeaser from '../roomTeaser/roomTeaser';
import { SessionContext } from '../../../context/sessionContext';


const SERVER: string = process.env.REACT_APP_SOCKET_URL;
export type User = {
  id: number;
  username: string;
}

  // const { user: currentUser } = useContext(SessionContext);
const NewChatOverlay = (props: INewChat) => {
  const { isOpen, setIsOpen } = props
  const [allUser, setAllUser] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User[]>([])
  const { user } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [newChatName, setNewChatName] = useState("tempName")

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
        router.push('/chats')
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


  const confirmCreateChat = async () =>{
    const chatName = "testChat"

console.log("working")
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_SOCKET_URL}/createChat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify({
          chatName: chatName,
          selectedUser: selectedUser,
          creatorId: user.id
        }),
        credentials: 'include',
      });
      const data = await response.json();

    } catch (error) {
      console.error(error);
      setLoading(false);
    }

  }



  const handleChange = (e: any) =>{
    console.log(e.target.value)
    getMatchingUser(e.target.value)

  }
  const handleSelectionClick = (user: User)=>{
    setSelectedUser((prev)=>[...prev, user]);
  }

  const handleRemoveClick = (user: User)=>{
    setSelectedUser((prev)=>prev.filter((usr: User)=> usr.id !== user.id))
  }
//TODO: style the useLists for when there are a lot more user
   return (
    <div className={`bg-grey-medium h-full absolute pt-5 px-5 transition-all duration-300 ease-in-out inset-y-0 overflow-hidden ${isOpen ? ' left-0 right-0' : ' -left-[300px] '}`} >
      <button onClick={()=>{setIsOpen()}} ><Back className="w-16 h-16 " /></button>
      <div className='w-full flex flex-col'>
        <input onChange={handleChange} type="search" className='bg-grey-light focus:outline-none rounded-xl overflow-hidden text-30 h-10  mt-5 p-3 font-semibold text-2xl' />
             <div className='mt-6'>
      {
        !!selectedUser.length && selectedUser.map((user: User)=>{
          return  <UserTeaser isSelected onClick={() =>{handleRemoveClick(user)}} user={user}/>
        })
      }
      </div>
        <div className='mt-6'>
{
  !!allUser.length && allUser.map((u: User) => {
    if (u.id !== user.id && !selectedUser.some((filter) => filter.id === u.id)) {
      return (
        <UserTeaser onClick={() => handleSelectionClick(u)} user={u} />
      );
    }
    return null; // User is already in selected users or it is the same user, don't render anything
  })
}
{/* TODO: make a name field for the chats thats only available when more than 1 user is selected (Group chats) */}
      </div>
      {/* TODO: make confirm not clickable when nothing is selected */}
          <button onClick={()=>{confirmCreateChat()}}>Confirm</button>
      </div>
   </div>
  );
}

export default NewChatOverlay;