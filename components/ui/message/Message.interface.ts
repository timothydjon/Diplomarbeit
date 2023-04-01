

export default interface IMessage {
    message:{
        content: string,
        sender: string,
    }
    className?: string,
    isSender?: boolean,
}