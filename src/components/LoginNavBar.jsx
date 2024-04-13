import React from 'react';
import { Link } from 'react-router-dom';

const LoginNavBar = () => {
  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
      <div>
        <Link to="/">Home</Link>
      </div>
      <nav className="space-x-4">
      <Link to="/user-profile">User Profile</Link>
          <Link to="/track-orders">Track Orders</Link>
          <Link to="/past-orders">Past Orders</Link>
          <Link to="/submit-reviews" className="text-white rounded p-2 bg-gray-800 hover:bg-gray-700">Submit Reviews</Link>

      </nav>
    </header>
  );
};

export default LoginNavBar;
