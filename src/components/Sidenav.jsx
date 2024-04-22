
import React from 'react'


import { useContext } from "react";
import { Link } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ChatIcon from '@mui/icons-material/Chat';
import ReviewsIcon from '@mui/icons-material/Reviews';

const Sidenav = () => {
  
  return (
    <div className="flex flex-col border-r border-gray-200 bg-white min-h-screen w-60">
      <div className="h-12 flex items-center justify-center">
        <Link to="/Dashboard" className="no-underline">
          <span className="text-lg font-bold text-[#00df9a]">DeliverEase</span>
        </Link>
      </div>
      <hr className="border-t border-gray-200" />
      <div className="flex-grow p-2.5">
        <ul className="list-none m-0 p-0">
        <Link to="/Dashboard" style={{ textDecoration: "none" }}>

          {/* <p className="text-xs font-bold text-gray-600 mt-4 mb-2">MAIN</p> */}
          <li className="flex items-center px-1.25 py-1.25 cursor-pointer hover:bg-purple-100 mb-2">
            <DashboardIcon className="text-base text-[#00df9a]" />
            <span className="text-sm font-semibold text-gray-600 ml-2.5">Dashboard</span>
          </li>
          </Link>
          {/* ... other menu items ... */}

          <Link to="/Employees" style={{ textDecoration: "none" }}>
            <li className='flex items-center px-1.25 py-1.25 cursor-pointer hover:bg-purple-100 mb-2'> 
              <PersonOutlineIcon className="text-base text-[#00df9a]" />
              <span className="text-sm font-semibold text-gray-600 ml-2.5">Drivers</span>
            </li>
          </Link>
          <Link to="/Adminservice" style={{ textDecoration: "none" }}>
            <li className='flex items-center px-1.25 py-1.25 cursor-pointer hover:bg-purple-100 mb-2'>
              <StoreIcon className="text-base text-[#00df9a]" />
              <span className="text-sm font-semibold text-gray-600 ml-2.5">Services</span>
            </li>
          </Link>
          <Link to="/Orders" style={{ textDecoration: "none" }}>

          <li className='flex items-center px-1.25 py-1.25 cursor-pointer hover:bg-purple-100 mb-2'>
            <CreditCardIcon className="text-base text-[#00df9a]" />
            <span className="text-sm font-semibold text-gray-600 ml-2.5">Orders</span>
          </li>
          </Link>
          <Link to="/chat" style={{ textDecoration: "none" }}>
          <li className='flex items-center px-1.25 py-1.25 cursor-pointer hover:bg-purple-100 mb-2'>
            <ChatIcon className="text-base text-[#00df9a]" />
            <span className="text-sm font-semibold text-gray-600 ml-2.5">Chat</span>
          </li>  
          </Link>
          <Link to="/reviews" style={{ textDecoration: "none" }}>
          <li className='flex items-center px-1.25 py-1.25 cursor-pointer hover:bg-purple-100 mb-2'>
            <ReviewsIcon className="text-base text-[#00df9a]" />
            <span className="text-sm font-semibold text-gray-600 ml-2.5">Reviews</span>
          </li> 
          </Link>   
          <Link>        
          <li className='flex items-center px-1.25 py-1.25 cursor-pointer hover:bg-purple-100 mb-2'>
            <ExitToAppIcon className="text-base text-[#00df9a]" />
            <span className="text-sm font-semibold text-gray-600 ml-2.5">Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      
    </div>
  );
};

export default Sidenav;
