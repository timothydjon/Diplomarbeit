import React, { useContext, useState } from 'react';
import IChatAccordion from './CreateChatButton.interface'
import styles from "./CreateChatButton.module.scss"
import cn from "classnames"
import ICreateChatButton from './CreateChatButton.interface';

const CreateChatButton = (props: ICreateChatButton) => {
  const { onClick, label, ...rest } = props;


  return (
<button {...rest} className='rounded-2xl py-2 overflow-hidden bg-grey-soft text-white' onClick={onClick}>
    {label}
</button>
  );
};

export default CreateChatButton;