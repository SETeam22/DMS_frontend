import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Header from './components/Header.jsx'; // Assuming you have a Header component
import LoginSignup from './components/LoginSignup.jsx';
import Welcome from './pages/Welcome.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <GoogleOAuthProvider clientId="263174241117-n1j7q8eqn323sr1s0p3i6t637589c8um.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/welcome" element={<Welcome />} />
          {/* Other routes */}
        </Routes>
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
