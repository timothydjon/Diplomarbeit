
import { Chats } from "../../chatRoom/ChatRoom.interface";
import { User } from "../newChatOverlay/NewChatOverlay";

export default interface IUserTeaser {
    user:{
        id: number;
        username: string;
    }
    onClick: () => void; 
    isSelected?: boolean;

}