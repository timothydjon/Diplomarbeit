import { Imessage } from "../chatRoom/ChatRoom.interface"

export default interface IMessage {
    message: Imessage,
    className?: string,
    isSender?: boolean,
}