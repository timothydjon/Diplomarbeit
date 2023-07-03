import React, { useState } from 'react';
import IMessage from './Message.interface';
import styles from './Message.module.scss';

const Message = (props: IMessage) => {
    const { message, isSender, ...rest } = props;
    let time = new Date(message.created_on);
    let formattedTime = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});

    // State to manage modal visibility
    const [showModal, setShowModal] = useState(false);

    return (
        <div
            {...rest}
            className={`flex flex-col justify-between ${isSender ? styles.sender : styles.recipient + " text-grey-light" } mb-8 rounded-2xl pl-4 pt-2 pb-3 pr-8 max-w-[500px]`}
        >
            <div className='flex justify-between items-start'>
                <p className='text-base'>{message.username}</p>
                <p className='text-sm text-gray-600'>{formattedTime}</p>
            </div>
            {message.msg_type === 1 ? (
                // Display image with onClick to show modal
                <div>
                    <img 
                        src={message.msg}
                        alt="Uploaded content"
                        className="my-2 cursor-pointer"
                        onClick={() => setShowModal(true)}
                    />

                    {showModal && (
                        <div className="fixed z-10 inset-0 " onClick={() => setShowModal(false)}>
                            <div className="flex items-center justify-center min-h-screen">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>

                                <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all" onClick={(e) => e.stopPropagation()}>
                                    <div className="relative">
                                        <img src={message.msg} alt="Uploaded content" style={{maxWidth: '1200px', maxHeight: '700px'}} className="m-4"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // Display text message
                <h3 className='break-all text-lg my-2'>{message.msg}</h3>
            )}
        </div>
    );
};

export default Message;
