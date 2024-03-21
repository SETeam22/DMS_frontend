// AdminLogin.js
{/*import React, { useState } from 'react';
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

export default AdminLogin; */}

import React, { useState } from 'react';
import DeliveryImg from '../assets/door-to-door-delivery-flat-deliveryman-courier-vector-29765876.jpg';
import { useNavigate } from 'react-router-dom';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default role
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Predefined credentials for admin and delivery manager
    const credentials = {
      admin: { email: 'admin@gmail.com', password: 'root' },
      deliveryManager: { email: 'deliverymanager@gmail.com', password: 'test' },
    };

    // Check if the input matches any of the predefined credentials
    if (role === 'admin' && email === credentials.admin.email && password === credentials.admin.password) {
      localStorage.setItem('userRole', 'Admin');
      console.log('Admin logged in successfully');
      navigate('/Dashboard');
    } else if (role === 'deliveryManager' && email === credentials.deliveryManager.email && password === credentials.deliveryManager.password) {
      localStorage.setItem('userRole', 'Delivery Manager'); 
      console.log('Delivery Manager logged in successfully');
      navigate('/Dashboard');
    } else {
      // If the credentials or role don't match
      alert('Invalid credentials or role selection. Please try again.');
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#00df9a]">Login</h2>
          <p className="text-xs mt-4 text-[#00df9a]">Login to access the dashboard</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="mt-4">
              <label htmlFor="role" className="block text-xs text-[#00df9a]">I am a:</label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={handleRoleChange}
                className="p-2 mt-2 rounded-xl border w-full"
              >
                <option value="admin">Admin</option>
                <option value="deliveryManager">Delivery Manager</option>
              </select>
            </div>
            <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <input className="p-2 mt-4 rounded-xl border w-full" type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <button type="submit" className="bg-[#00df9a] rounded-xl text-white py-2 mt-4 hover:scale-105 duration-300">Login</button>
          </form>
        </div>

        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={DeliveryImg} alt="Login" />
        </div>
      </div>
    </section>
  );
};

export default AdminLoginForm;
