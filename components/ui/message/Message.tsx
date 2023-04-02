import React from 'react'
import IMessage from './Message.interface';
import styles from './Message.module.scss'

const Message = (props: IMessage) => {
    const {message, isSender,...rest} = props
    console.log("msg", message)
  return (
    <div {...rest} className={`${isSender ? styles.sender : styles.recipient } border-y-2  `} >
        <span>{message.sender}</span>
        <p>{message.content}</p>
    </div>
  )
}

export default Message