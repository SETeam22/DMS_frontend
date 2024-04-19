import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { CgMenu } from 'react-icons/cg';

const LoginNavBar = () => {
  // Define a state for handling the menu toggle
  const [click, setClick] = React.useState(false);

  // Function to toggle the menu
  const handleClick = () => setClick(!click);

  // Define the navLinkClass for styling
  const navLinkClass = 'text-white hover:text-[#00df9a] transition border-b-2 border-transparent p-4 hover:border-[#00df9a] cursor-pointer';

  // Content to be displayed in the mobile view if menu is clicked
  const content = (
    <div className='lg:hidden block absolute top-16 w-full left-0 right-0 bg-black transition'>
      <ul className='text-center text-xl p-10'>
        <Link to="/user-profile">
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>User Profile</li>
        </Link>
        <Link to="/service">
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>Services</li>
        </Link>
        <Link to="/cart">
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>Place Order</li>
        </Link>
        <Link to="/track-orders">
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>Track Orders</li>
        </Link>
        <Link to="/past-orders">
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>Past Orders</li>
        </Link>
        <Link to="/submit-reviews">
          <li className='my-4 py-4 border-b border-slate-800 hover:bg-slate-800 hover:rounded'>Submit Reviews</li>
        </Link>
      </ul>
    </div>
  );

  return (
    <nav style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }}>
      <div className='h-10vh flex justify-between items-center text-white bg-black px-20 py-4'>
        {/* Wrap the logo within Link component to navigate to home */}
        <Link to='/' className='text-3xl font-bold text-[#00df9a]'>
          DeliverEase
        </Link>
        <ul className={`lg:flex hidden gap-8 items-center font-normal ${click ? 'hidden' : ''}`}>
          <Link to="/user-profile" className={navLinkClass}>User Profile</Link>
          <Link to="/service" className={navLinkClass}> Services</Link>
          <Link to="/cart" className={navLinkClass}>Place Order</Link>
          <Link to="/track-orders" className={navLinkClass}>Track Orders</Link>
          <Link to="/past-orders" className={navLinkClass}>Past Orders</Link>
          <Link to="/submit-reviews" className={`${navLinkClass} bg-black rounded p-2 hover:bg-slate-800`}>Submit Reviews</Link>
        </ul>
        {/* Menu toggle icon */}
        <div className='lg:hidden block' onClick={handleClick}>
          {click ? <FaTimes size={20} color="white" /> : <CgMenu size={20} color="white" />}
        </div>
        {/* Display the content when menu is clicked */}
        {click && content}
      </div>
    </nav>
  );
};

export default LoginNavBar;
