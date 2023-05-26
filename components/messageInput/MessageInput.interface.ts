export default interface IMessageInput {
    user_id: number,
    chat_id: number,
    addMessage: (message: any) => void
}
