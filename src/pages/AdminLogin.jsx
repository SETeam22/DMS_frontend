// AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryImg from '../assets/door-to-door-delivery-flat-deliveryman-courier-vector-29765876.jpg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your admin login logic here
    console.log('Admin Email:', email);
    console.log('Admin Password:', password);
    // After validation, redirect to the admin dashboard
    navigate('/Dashboard');
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#00df9a]">Admin Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="submit"
              className="bg-[#00df9a] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              Login
            </button>
          </form>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={DeliveryImg} alt="Admin Login" />
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
