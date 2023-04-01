import React, { useState } from 'react'
import { socket } from '../../context/socket/SocketContext';
import IMessageInput from './MessageInput.interface';
import SendBtn from "../../assets/Send"
import EmojiSmile from '../../assets/EmojiSmile';
import Clip from "../../assets/Clip"
import ThreeDots from '../../assets/ThreeDots';
import Microphone from '../../assets/Microphone';

const MessageInput = (props: IMessageInput) => {
    const { user_id, chat_id, ...rest } = props
    const [msgText, setMsgText] = useState<string>();
    const [msgType, setMsgType] = useState<number>(0);

    const handleClick = (content: string) => {
        socket.emit('test', { msg: msgText, msg_type: msgType, user_id: user_id, chat_id: chat_id });
        setMsgText("");
    }
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMsgText(e.currentTarget.value);
    }

    return (
        <div className='w-full' {...rest}>
            <div className="flex w-full items-center">
                <div className="overflow-hidden w-full bg-brown rounded-lg flex py-1 px-9">
                    <div>
                        <EmojiSmile/>
                    </div>
                    <input
                        type="text"
                        className="mb-2 bg-brown text-white placeholder-white"
                        placeholder="Message"
                        onChange={handleChange}
                    />
                    <Clip />
                </div>
                <div className="bg-purple p-4 rounded-full flex items-center justify-center">
                    <button
                        onClick={() => { handleClick("test") }}>
                    </button>
                    {msgText == "" ? <Microphone className="" /> : <SendBtn className="" />}
                </div>
            </div>
        </div>
    )
}

export default MessageInput