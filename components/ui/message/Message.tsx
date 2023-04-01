import React from 'react'
import IMessage from './Message.interface';

const Message = (props: IMessage) => {
    const {message, isSender,...rest} = props
  return (
    <div {...rest} className={`${isSender ? "bg-grey-dark text-left" : "bg-grey-light text-right"} border-y-2  `} >
        <span>{message.username}</span>
        <p>{message.msg}</p>
    </div>
  )
}

export default Message