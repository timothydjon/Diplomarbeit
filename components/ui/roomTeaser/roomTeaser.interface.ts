import { Chats } from "../../chatRoom/ChatRoom.interface";

export default interface IRoomTeaser {
    setRoomId: (arg0: number) => void
    roomId: number,

    room: Chats;
}