import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const Navigation = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>DeliverEase</h1>
      <nav><ul className='hidden md:flex'>
        <li className='p-4'>Home
          
        </li>
        <li className='p-4'>Resources</li>
        <li className='p-4'>About</li>
        <li className='p-4'>Contact</li>
        <li className='p-4'>Login</li>
      </ul></nav>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
     
      

      </div>
      <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
      <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>DeliverEase</h1>
        <ul className='pt-24 uppercase'>
        <li className='p-4 border-b border-gray-600'>Home</li>
       
        <li className='p-4 border-b border-gray-600'>Resources</li>
        <li className='p-4 border-b border-gray-600'>About</li>
        <li className='p-4 border-b border-gray-600'>Contact</li>
        <li className='p-4'>Login</li>

      </ul>

    
        
      

      </div>
    </div>
  )
}

export default Navigation;


