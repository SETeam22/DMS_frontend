import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Features from './components/Features.jsx';
import Home from './pages/Home.jsx';
import Service from './pages/Service.jsx';

//import Header from './components/Header.jsx'; // Assuming you have a Header component
import Hero  from './components/Hero.jsx';
import Navigation from './components/Navigation.jsx';
import LoginSignup from './components/LoginSignup.jsx';
import Welcome from './pages/Welcome.jsx';

import Chatbot from './components/ChatBot.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="263174241117-n1j7q8eqn323sr1s0p3i6t637589c8um.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<LoginSignup />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </GoogleOAuthProvider>
      <Chatbot /> {/* Add the chatbot to your app */}
    </BrowserRouter>
  );
};

export default App;
