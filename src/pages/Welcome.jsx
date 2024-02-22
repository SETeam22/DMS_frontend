import React from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';

const Welcome = () => {
  const location = useLocation();
  const { username } = location.state || {}; // Get username from state

  return (
     <div className="min-h-screen flex items-center bg-[url('./assets/background1.png')] bg-cover bg-center bg-no-repeat">
      <div className="text-3xl font-semibold text-left text-purple-700">
       Welcome {username}!
     </div>
   </div>  
    
  );
};

export default Welcome;

