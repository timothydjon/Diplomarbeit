import React, { useContext, useState } from 'react';
import IChatAccordion from './Toolbar.interface'
import styles from "./CreateChatButton.module.scss"
import cn from "classnames"
import IToolbar from './Toolbar.interface';

const Toolbar = (props: IToolbar) => {
  const { ...rest } = props;


  return (
    <div className='h-20 '>Names are in here</div>
  );
};

export default Toolbar;