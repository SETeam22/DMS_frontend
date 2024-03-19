import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home.jsx';
import Service from './pages/Service.jsx';
import Dashboard from './pages/Dashboard.jsx';
import OrderForm from './components/OrderForm.jsx';
import LoginSignup from './components/LoginSignup.jsx';
import Orders from './pages/Orders.jsx'
import Chatbot from './components/ChatBot.jsx';
import Drivers from './pages/Drivers.jsx'
import NewEmp from './pages/NewEmp.jsx';
import MapView from './pages/MapView.jsx';
import VerifyUser from './pages/VerifyUser.tsx';
import User from './pages/user.jsx'
import Addservice from './pages/Addservice.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="263174241117-n1j7q8eqn323sr1s0p3i6t637589c8um.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authentication" element={<LoginSignup />} />
          <Route path="/service" element={<Service />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/employees" element={<Drivers />} />
          <Route path="/new" element={<NewEmp />} />
          <Route path="/user" element={<User />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/verification" element={<VerifyUser />} />
          <Route path="/addservice" element={<Addservice />} />
        </Routes>
      </GoogleOAuthProvider>
      <Chatbot /> {/* Add the chatbot to your app */}
    </BrowserRouter>
  );
};

export default App;
