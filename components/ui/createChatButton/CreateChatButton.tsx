import React, { useContext, useState } from 'react';
import IChatAccordion from './CreateChatButton.interface'
import styles from "./CreateChatButton.module.scss"
import cn from "classnames"
import ICreateChatButton from './CreateChatButton.interface';

const CreateChatButton = (props: ICreateChatButton) => {
  const { className, disabled ,onClick, label, ...rest } = props;


  return (
<button {...rest} disabled={disabled} className={`${className} disabled:bg-grey-soft/20 disabled:text-grey-soft rounded-2xl py-2 overflow-hidden bg-grey-soft text-white mb-5`} onClick={onClick}>
    {label}
</button>
  );
};

export default CreateChatButton;