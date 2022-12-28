import React from 'react'
import IMessage from './Message.interface';

const Message = (props: IMessage) => {
  return (
    <div>Message

        <p>{props.sender}</p>
        <h4>{props.content}</h4>
    </div>
  )
}

export default Message