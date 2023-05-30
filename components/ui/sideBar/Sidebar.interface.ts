import { Dispatch, SetStateAction } from "react"


export default interface ISidebar {
    children?: JSX.Element[] | JSX.Element
    setRoomId: (arg0: number) => void
    setNewChatOpen: Dispatch<SetStateAction<boolean>>
    currentRoomId: number;
    
}