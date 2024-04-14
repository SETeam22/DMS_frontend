import React, { useState } from 'react';
import DeliveryImg from '../assets/door-to-door-delivery-flat-deliveryman-courier-vector-29765876.jpg';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); 
  const [captchaValue, setCaptchaValue] = useState(null);
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const navigate = useNavigate(); 
  const navigateToSearch = () => {
    navigate('/Register'); 
  };
  const handleCaptchaChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value); // Add this line
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please verify you are not a robot.");
      return;
    }
  
    const userData = {
      email: email,
      password: password,
      userType: userType
    };
  
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token);  // Assuming the token is named 'token' in the response
        navigate('/service');  // Navigate to home or dashboard after successful login
      } else {
        throw new Error(data.message || "Unable to login");
      }
    } catch (error) {
      console.error('Login error:', error);
      alert(error.message);
    }
  };
  

  // const handleGoogleRegister = () => {
  //   // Placeholder for Google OAuth integration
  //   console.log('Register with Google');
  // };

  return (
    
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      {/* login container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* form */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#00df9a]">Login</h2>
          <p className="text-xs mt-4 text-[#00df9a]">If you are already a member, easily log in</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* <div className="mt-4">
            <label htmlFor="userType" className="block text-xs text-[#00df9a]">I am a:</label>
            <select
              id="userType"
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
              className="p-2 mt-2 rounded-xl border w-full"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
            <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <div className="relative">
              <input className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              
            </div>
            <ReCAPTCHA
              sitekey="6LfPz68pAAAAANLP2PNC_3J5fU4H9sFtw5j0LYoE"
              onChange={handleCaptchaChange}
            />
            <button type="submit" className="bg-[#00df9a] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          {/* <button onClick={handleGoogleRegister} className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#00df9a]">
            
            Login with Google
          </button> */}

          <div className="google-login mt-4">
          <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
          </div>

          {/* <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#00df9a]">
            <a href="#">Forgot your password?Click here</a>
          </div> */}
          <div className="mt-5 text-xs border-b border-gray-400 py-4 text-[#00df9a]">
            Forgot your password? <Link to="/Forgotpass" className="border-b border-[#00df9a]">Click here</Link>
         </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#00df9a]">
            <p>Don't have an account?</p>
            <button onClick={navigateToSearch} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
          </div>
        </div>

        {/* image */}
        <div className="md:block hidden w-1/2 pl-5">
          <img className="rounded-2xl" src={DeliveryImg} alt="Login" />
        </div>
      </div>
    </section>
   
  );
};

export default LoginForm;
//#002D74