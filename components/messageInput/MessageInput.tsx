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
    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const el = useRef(null);

    const handleSendBtn = async () => {
        let newMessage;
        if (imagePreviewUrl) {
            // Sending an image message as Base64 through WebSocket
            newMessage = { msg: imagePreviewUrl, msg_type: 1, user_id: user_id, chat_id: chat_id, username: user.username };
        } else if (msgText.trim() !== "") {
            // Sending a text message
            newMessage = { msg: msgText, msg_type: 0, user_id: user_id, chat_id: chat_id, username: user.username };
        } else {
            return;
        }
        socket.emit('send_message', newMessage);
        setMsgText("");
        setImagePreviewUrl(null);
        setMsgType(0);
    };
    
    
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

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles.length > 0) {
            console.log(acceptedFiles[0].name);

            // Create image preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(acceptedFiles[0]);
        } else {
            // Handle rejected files here
            console.log('Rejected files:', rejectedFiles);
        }
    }, []);

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
        setImagePreviewUrl(null);
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
                <div className="overflow-hidden w-full bg-brown rounded-lg flex items-center p-1">
                    <div className="py-1 px-3">
                        <button onClick={() => { setOpenEmoji(true) }}>
                            <Emoji />
                        </button>
                    </div>
                    <div className="flex items-center flex-1">
                        <textarea
                            className="message-input flex-1 bg-brown text-3xl text-white placeholder-white outline-none py-2 pl-6 pr-10 resize-none"
                            placeholder="Message"
                            value={msgText}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            rows={1}
                        />
                        {imagePreviewUrl && <img src={imagePreviewUrl} alt="preview" style={{ maxHeight: '50px', maxWidth: '100px' }} />}
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

