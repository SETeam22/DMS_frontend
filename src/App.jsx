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
import ResetPassword from './pages/ResetPassword.jsx';
import UserProfile from './pages/UserProfile.jsx'; 
import TrackOrder from './pages/TrackOrder.jsx'; 
import PastOrders from './pages/PastOrders.jsx';
import SubmitReview from './pages/SubmitReview.jsx';
import Faq from './pages/Faq.jsx';
import LoginForm from './pages/LoginForm.jsx';
import Signup from './pages/Signup.jsx';
import Forgotpass from './pages/Forgotpass.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import OrderFormC from './pages/OrderFormC.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AdminServices from './pages/AdminServices.jsx';
import Chat from './pages/Chat.jsx';
import AdminReviews from './pages/AdminReviews.jsx';

const stripePromise = loadStripe('pk_test_51P4XOb04o0QsZsCzFDD16nbBHkwLG98v7UpPaEhOijTcjfVpxXOJ9DnIQ1NHIo8f042alKwzsyxDcW5058IKQxIE00r0asVmTN');

const App = () => {
  return (
    <Elements stripe={stripePromise}> 
    <BrowserRouter>
     
        <GoogleOAuthProvider clientId="263174241117-n1j7q8eqn323sr1s0p3i6t637589c8um.apps.googleusercontent.com">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authentication" element={<LoginSignup />} />
            <Route path="/SignIn" element={<LoginSignup />} />
            <Route path="/service" element={<Service />} />
            <Route path="/order" element={<OrderForm />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/employees" element={<Drivers />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Employees" element={<Drivers />} />
            <Route path="/new" element={<NewEmp />} />
            <Route path="/user" element={<User />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/Login" element={<LoginForm />} />
            <Route path='/Register' element={<Signup />} />
            <Route path="/verification" element={<VerifyUser />} />
            <Route path="/addservice" element={<Addservice />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/track-orders" element={<TrackOrder />} />
            <Route path="/past-orders" element={<PastOrders />} />
            <Route path="/submit-reviews" element={<SubmitReview />} />
            <Route path='/Forgotpass' element={<Forgotpass />} />
            <Route path='/AdminLogin' element={<AdminLogin />} />
            <Route path='/Cart' element={<OrderFormC />} />
            <Route path='/Checkout' element={<CheckoutPage />} />
            <Route path='/order-confirmation' element={<OrderConfirmation />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/Adminservice" element={<AdminServices />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/reviews" element={<AdminReviews />} />
       </Routes>
        </GoogleOAuthProvider>
        <Chatbot /> {/* Add the chatbot to your app */}
    
    </BrowserRouter>
    </Elements>
  
  );
};

export default App; 
