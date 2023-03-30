import React, { useState } from 'react'
import { socket } from '../../context/socket/SocketContext';
import IMessageInput from './MessageInput.interface';
import SendBtn from "../../assets/SendBtn"
import EmojiSmile from '../../assets/EmojiSmile';
import Clip from '../../assets/Clip';
import ThreeDots from '../../assets/ThreeDots';
import Microphone from '../../assets/Microphone';

const MessageInput = (props: IMessageInput) => {
    const { user_id, chat_id, ...rest } = props
    const [msgText, setMsgText] = useState<string>();
    const [msgType, setMsgType] = useState<number>(0);

    const handleClick = (content: string) => {
        console.log("testing");
        console.log(msgText, msgType)
        socket.emit('test', { msg: msgText, msg_type: msgType, user_id: user_id, chat_id: chat_id });
    }
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMsgText(e.currentTarget.value);
    }

    return (
        <div {...rest}>
            <div className="overflow-hidden bg-brown rounded-lg flex py-5 px-9"> 
                <EmojiSmile />
                <input
                    type="text"
                    className=" mb-2 bg-brown text-white placeholder-white"
                    placeholder='Message'
                    onChange={handleChange}
                />
                <Clip />
                <ThreeDots />
            </div>
            <button
                onClick={() => { handleClick("test") }}>
                <SendBtn />
            </button>
            <Microphone/>
        </div>
    )
}

export default MessageInput