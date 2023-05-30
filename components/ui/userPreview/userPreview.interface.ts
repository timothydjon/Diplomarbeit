
import { Chats } from "../../chatRoom/ChatRoom.interface";
import { User } from "../newChatOverlay/NewChatOverlay";

export default interface IUserPreview {
    user:{
        id: number;
        username: string;
    }

}