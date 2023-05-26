import React, { useState, useRef, useContext } from 'react'
import { socket } from '../../context/socket/SocketContext';
import IMessageInput from './MessageInput.interface';
import SendBtn from "../../assets/src/send.svg"
import Clip from "../../assets/src/clip.svg"
import Microphone from '../../assets/src/microphone.svg';
import Emoji from '../../assets/src/emojiSmile.svg'
// import EmojiPicker from 'emoji-picker-react';
import { useOuterClick } from 'react-outer-click';
import dynamic from 'next/dynamic';
import { SessionContext } from '../../context/sessionContext';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);


const MessageInput = (props: IMessageInput) => {
    const { user_id, chat_id, addMessage, ...rest } = props
    const { user } = useContext(SessionContext);
    const [msgText, setMsgText] = useState<string>("");
    const [msgType, setMsgType] = useState<number>(0);
    const [openEmoji, setOpenEmoji] = useState(false);
    const el = useRef(null);

    const handleSendBtn = (content: string) => {
        if (msgText == "") { return; }
        const newMessage = { msg: msgText, msg_type: 0, user_id: user_id, chat_id: chat_id, username: user.username }; 
        socket.emit('send_message', newMessage);
        addMessage(newMessage);
        setMsgText("");
      }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // handle Enter from keyboard
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendBtn("test");
        }
    }
    const handleEmojiBtn = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        setOpenEmoji(true);
    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMsgText(e.currentTarget.value);
    }
    const handleEmojiClick = (emojiData, event) => {
        setMsgText(prevMsgText => prevMsgText + emojiData.emoji);
    }


// useOuterClick(el, (event) => {
//     event.preventDefault();
//     setOpenEmoji(false)
// });
useOuterClick(el, (event) => {
    if (event.target !== document.querySelector('.message-input')) {
        setOpenEmoji(false);
    }
});
    return (
        <div className='w-full' {...rest}>
            <div className="flex w-full items-center p-2 relative">
                        {
                            openEmoji && <div ref={el} className='absolute top-[-450px] left-0'>
                                <Picker onEmojiClick={handleEmojiClick}  />
                                </div>
                        }
                <div className="overflow-hidden w-full bg-brown rounded-lg flex items-center p-1">
                    <div className="py-1 px-3">
                    <button
                        onClick={()=>{setOpenEmoji(true)}}>
                        <Emoji />
                    </button>
                        
                    </div>
                    <input
                        type="text"
                        className="message-input w-full bg-brown text-3xl text-white placeholder-white outline-none py-2 pl-6"
                        placeholder="Message"
                        value={msgText}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="py-1 px-5">
                        <Clip />
                    </div>
                </div>
                <div className="bg-purple p-4 rounded-full flex items-center justify-center">
                    <button
                        onClick={() => { handleSendBtn("test") }}>
                        {msgText == "" && false ? <Microphone /> : <SendBtn />}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MessageInput

