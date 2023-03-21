import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../context/sessionContext';
import ILogoutButton from './chatsPage.interface'
import Sidebar from '../ui/sideBar/Sidebar';

interface IResponse{
 
}

const chatsPage= (props: any) => {


  return (
    <div className='w-full h-screen'>
  <div className="grid-cols-default grid w-full h-full">
    <Sidebar />
    <div className='col-span-19 bg-grey-medium'>h</div>


    </div>
  </div>
  );
};

export default chatsPage;