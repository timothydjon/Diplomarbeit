import React, { useState } from 'react'
import { socket } from '../../context/socket/SocketContext';
import IMessageInput from './MessageInput.interface';
import SendBtn from "../../assets/src/send.svg"
import Clip from "../../assets/src/clip.svg"
import Microphone from '../../assets/src/microphone.svg';
import Smile from '../../assets/src/emojiSmile.svg'

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
                        <Smile />
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
                    {msgText == "" ? <Microphone /> : <SendBtn />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MessageInput