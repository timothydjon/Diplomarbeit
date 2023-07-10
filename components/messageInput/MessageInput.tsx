import React, { useState, useRef, useContext, useCallback, useEffect, createRef } from 'react'
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
import { useDropzone } from 'react-dropzone';

const Picker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);


const MessageInput = (props: IMessageInput) => {
    const { user_id, chat_id, ...rest } = props
    const { user } = useContext(SessionContext);
    const [msgText, setMsgText] = useState<string>("");
    const [msgType, setMsgType] = useState<number>(0);
    const [openEmoji, setOpenEmoji] = useState(false);
    const fileInputRef = useRef(null); // Create a reference for the file input
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string[]>([]);
    const el = useRef(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // handle Enter from keyboard
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendBtn();
        }
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsgText(e.target.value);
    };
    
    const handleEmojiClick = (emojiData, event) => {
        setMsgText(prevMsgText => prevMsgText + emojiData.emoji);
    }
    
    const dropzoneRef = createRef();
    
    const handleClipClick = (event) => {
        if(fileInputRef.current)
        fileInputRef.current.click();
    };
    
    useOuterClick(el, (event) => {
        if (event.target !== document.querySelector('.message-input')) {
            setOpenEmoji(false);
        }
    });
    
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            acceptedFiles.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const imageUrl = reader.result as string;
                    setImagePreviewUrl(prevImagePreviewUrl => [...prevImagePreviewUrl, imageUrl]);
                };
                reader.readAsDataURL(file);
            });
        }
    }, []);


    const handleSendBtn = async () => {
        try {
            if (imagePreviewUrl.length > 0) {
                imagePreviewUrl.forEach(url => {
                    const imageMessage = {
                        msg: url,
                        msg_type: 1,
                        user_id: user_id,
                        chat_id: chat_id,
                        username: user.username
                    };
                    socket.emit('send_message', imageMessage);
                });
                setImagePreviewUrl([]);
            }
    
            // handlingtext message
            if (msgText !== "") {
                const textMessage = {
                    msg: msgText,
                    msg_type: 0,
                    user_id: user_id,
                    chat_id: chat_id,
                    username: user.username
                };
                socket.emit('send_message', textMessage);
                setMsgText("");
            }
    
        } catch (err) {
            console.error("Error sending messages:", err);
        }
    };
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        noClick: false,
        accept: {'image/*': []},
    });
    const { getRootProps: rootPros } = useDropzone({
        onDrop,
        noClick: true,
        accept: {'image/*': []},
    });

    useEffect(() => {
        setImagePreviewUrl([]);
        setMsgText("");
    }, [chat_id])
    
    
    return (
        <div className='w-full' {...rest}>
            <div className="flex w-full items-center p-2 relative" {...rootPros()}>
            {
                openEmoji && <div ref={el} className='absolute top-[-450px] left-0'>
                    <Picker onEmojiClick={handleEmojiClick}  />
                    </div>
            }
                <div className="overflow-hidden w-full bg-grey-dark rounded-lg flex items-center p-1">
                    <div className="py-1 px-3">
                        <button onClick={() => { setOpenEmoji(true) }}>
                            <Emoji />
                        </button>
                    </div>
                    <div className="flex items-center flex-1">
                        <textarea
                            className="message-input flex-1 bg-grey-dark text-3xl text-white placeholder-white outline-none py-2 pl-6 pr-10 resize-none"
                            placeholder="Message"
                            value={msgText}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            rows={1}
                        />
                        {imagePreviewUrl && imagePreviewUrl.map((url, index) => (
                            <img key={index} src={url} alt="preview" style={{ maxHeight: '50px', maxWidth: '100px' }} /> 
                         ))}

                    </div>
                    <div className="py-1 px-5" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <button onClick={handleClipClick}>
                            <Clip />
                        </button>
                    </div>
                </div>
                <div className="bg-purple ml-4 p-4 rounded-full flex items-center justify-center">
                    <button onClick={() => { handleSendBtn() }}>
                        {msgText === "" && false ? <Microphone /> : <SendBtn />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageInput

