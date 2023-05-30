import React from 'react'
import IMessage from './Message.interface';
import styles from './Message.module.scss'

const Message = (props: IMessage) => {
    const {message, isSender,...rest} = props;
    let time = new Date(message.created_on);
    let formattedTime = time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});

    return (
        <div 
            {...rest} 
            className={`flex flex-col justify-between ${isSender ? styles.sender : styles.recipient + " text-grey-light" } mb-8 rounded-2xl pl-4 pt-2 pb-3 pr-8 max-w-[500px]`}
        >
            <div className='flex justify-between items-start'>
                <p className='text-base'>{message.username}</p>
                <p className='text-sm text-gray-600'>{formattedTime}</p>
            </div>
            <h3 className='break-word text-lg my-2'>{message.msg}</h3>
        </div>
    )
}

export default Message
