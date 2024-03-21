
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the icon from MUI icons

const Navbar = () => {

    const userRole = localStorage.getItem('userRole') || 'Guest';
  
  return (
    // Add a bottom border that matches the sidebar's bottom border
    <div className="flex justify-end items-center px-6 bg-white h-12 border-b border-gray-200">
      {/* User Profile Section */}
      <div className="flex items-center">
        <AccountCircleIcon className="text-gray-600" /> {/* User Icon */}
        <span className="text-gray-600 text-sm ml-2">{userRole}</span> {/* Replace with actual username */}
      </div>
    </div>
  );
};

export default Navbar;


