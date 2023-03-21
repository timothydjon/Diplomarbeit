import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { SessionContext } from '../../context/sessionContext';
import ILogoutButton from './chatsPage.interface'
import Sidebar from '../sideBar/Sidebarr';

interface IResponse{
 
}

const chatsPage= (props: any) => {


  return (
    <div className='w-full'>
    <h1>test</h1>
  <div className="grid-cols-default grid gap-5 w-full">
    <Sidebar />
    <div className='col-span-6 bg-grey-medium'>h</div>
    <div className='col-span-6 bg-grey-medium'>h</div>
    <div className='col-span-6 bg-grey-medium'>h</div>
    <div className='col-span-6 bg-grey-medium'>h</div>

    </div>
  </div>
  );
};

export default chatsPage;