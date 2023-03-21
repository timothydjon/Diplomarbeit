import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import ISidebar from './Sidebar.interface';



const Sidebar = (props: ISidebar) => {
   return (
    <div className="col-span-6 bg-green" >
      <h1>Sidebar</h1>
   </div>
  );
}

export default Sidebar;