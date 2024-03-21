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
import LoginForm from './pages/LoginForm.jsx';
import Signup from './pages/Signup.jsx';
import Forgotpass from './pages/Forgotpass.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import PlaceDeliveryForm from './pages/PlaceDeliveryForm.jsx';


const App = () => {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId="263174241117-n1j7q8eqn323sr1s0p3i6t637589c8um.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<LoginSignup />} />
          <Route path="/service" element={<Service />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Employees" element={<Drivers />} />
          <Route path="/new" element={<NewEmp />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/Login" element={<LoginForm />} />
          <Route path='/Register' element={<Signup />} />
          <Route path='/Forgotpass' element={<Forgotpass />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/form' element={<PlaceDeliveryForm />} />


        </Routes>
      </GoogleOAuthProvider>
      <Chatbot /> {/* Add the chatbot to your app */}
    </BrowserRouter>
  );
};

export default App; 
