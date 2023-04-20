export default interface IChatRoom {
    roomId: number,
    data: {
        user: {
            username: string,
            user_id: number
        }
        chat_id: number
    }

}
export interface Imessage{
    id: number,
    user_id: number
    chat_id: number,
    msg: string,
    msg_type: number,
    created_on: string,
    username: string
}

export interface Chats {
    lastMessage: string
    name: string,
    created_on: string
    last_message: string
}