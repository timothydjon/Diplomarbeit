import { useContext, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import IFilter from './FilterInput.interface';
import ChatAccordion from '../chatAccordion/chatAccordion';



const FilterInput= (props: IFilter) => {
  const {contacts, setContacts} = props

  const filterContacts = (e) =>{
    e.target.value
    setContacts(contacts.filter( contact => contact.includes(e.target.value)))
  }
//TODO: filter for some reason not working
   return (
    <div className="w-full" >
      <input onChange={filterContacts} type="text" className='w-full' />
   </div>
  );
}

export default FilterInput;