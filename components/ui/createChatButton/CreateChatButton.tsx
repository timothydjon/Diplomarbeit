import React, { useContext, useState } from 'react';
import IChatAccordion from './CreateChatButton.interface'
import styles from "./CreateChatButton.module.scss"
import cn from "classnames"
import ICreateChatButton from './CreateChatButton.interface';

const CreateChatButton = (props: ICreateChatButton) => {
  const { className, disabled ,onClick, label, ...rest } = props;


  return (
<button {...rest} disabled={disabled} className={` disabled:bg-grey-soft/20 flex-shrink-0 hover:bg-grey-medium/70 transition-all duration-200 ease-in-out  disabled:text-grey-soft rounded-lg py-3 overflow-hidden bg-grey-soft text-white mb-5 ${className}`} onClick={onClick}>
    {label}
</button>
  );
};

export default CreateChatButton;