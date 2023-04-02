export default interface IChatRoom {
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
    name: string,
    created_on: string
}