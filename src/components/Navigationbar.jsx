
import React, { useState } from 'react';
import { Link } from "react-scroll";
import { FaTimes } from "react-icons/fa";
import { Link as RouterLink } from 'react-router-dom';

import { CgMenu } from 'react-icons/cg';

const Navigationbar = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    const content = (
        <div className='lg:hidden block absolute top-16 w-full left-0 right-0 bg-black transition'>
            <ul className='text-center text-xl p-20'>
                <Link spy={true} smooth={true} duration={500} to="Home" offset={-70}>
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>Home</li>
                </Link>
                <Link spy={true} smooth={true} duration={500} to="About" offset={-70}>
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>About</li>
                </Link>
                <Link spy={true} smooth={true} duration={500} to="Contact" offset={-70}>
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>Contact</li>
                </Link>
                <RouterLink to="/service">
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>
                        Services
                    </li>
                </RouterLink>
                {/* <Link spy={true} smooth={true} duration={500} to="SignIn" offset={-70}>
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>Sign In</li>
                </Link> */}
                <RouterLink to="/signin">
                    <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>
                        Sign In
                    </li>
                </RouterLink>

            </ul>
        </div>
    );

    return (
        <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
            <div className='h-10vh flex justify-between z-50 text-white bg-black lh:py-5 px-20 py-4'>
                <div className='flex items-center flex-1'>
                    <span> <h1 className='w-full text-3xl font-bold text-[#00df9a]'>DeliverEase</h1></span>
                </div>
                <div className='lg:flex md:flex lg:flex-1 items-center justify-end font-normal hidden'>
                    <ul className='flex gap-8 mr-16 text-[18px]'>
                        <Link spy={true} smooth={true} duration={500} to="Home" offset={-70}>
                            <li className='hover:text-[#00df9a] transition border-b-2 border-slate-900 p-4 hover:border-[#00df9a] cursor-pointer'>Home</li>
                        </Link>
                        <Link spy={true} smooth={true} duration={500} to="About" offset={-70}>
                            <li className='hover:text-[#00df9a] transition border-b-2 border-slate-900 p-4 hover:border-[#00df9a] cursor-pointer'>About</li>
                        </Link>
                        <RouterLink to="/service">
                        <li className='hover:text-[#00df9a] transition border-b-2 border-slate-900 p-4 hover:border-[#00df9a] cursor-pointer'>
                            Services
                        </li>
                        </RouterLink>
                        <Link spy={true} smooth={true} duration={500} to="Contact" offset={-70}>
                            <li className='hover:text-[#00df9a] transition border-b-2 border-slate-900 p-4 hover:border-[#00df9a] cursor-pointer'>Contact</li>
                        </Link>
                        {/* <Link spy={true} smooth={true} duration={500} to="LoginSignup" offset={-70}>
                            <li className='hover:text-[#00df9a] transition border-b-2 border-slate-900 p-4 hover:border-[#00df9a] cursor-pointer'>Sign In</li>
                        </Link>  */}
                        <RouterLink to="/signin">
                        <li className='hover:text-[#00df9a] transition border-b-2 border-slate-900 p-4 hover:border-[#00df9a] cursor-pointer'>
                             Sign In
                        </li>
                        </RouterLink>

                    </ul>
                </div>
                <div>
                    {click && content}
                </div>
                <button className='block sm:hidden translation' onClick={handleClick}>
                    {click ? <FaTimes /> : <CgMenu />}
                </button>
            </div>
        </nav>
    );
}

export default Navigationbar;
