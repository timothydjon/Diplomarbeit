import { Chats } from "../../chatRoom/ChatRoom.interface";

export default interface IRoomTeaser {
    setRoomId: (arg0: number) => void
    room: Chats;
}