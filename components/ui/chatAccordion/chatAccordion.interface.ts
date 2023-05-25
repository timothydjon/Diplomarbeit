import { Dispatch, SetStateAction } from "react"

export default interface IChatAccordion{
    className?: string
    setRoomId: (arg0: number) => void
    setNewChatOpen: Dispatch<SetStateAction<boolean>>
}