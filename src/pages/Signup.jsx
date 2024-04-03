import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import DeliveryImg from '../assets/door-to-door-delivery-flat-deliveryman-courier-vector-29765876.jpg';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  
  const handleGoogleRegister = () => {
    // Placeholder for Google OAuth integration
    console.log('Register with Google');
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSecurityQuestionChange = (e) => {
    setSecurityQuestion(e.target.value);
  };

  const handleSecurityAnswerChange = (e) => {
    setSecurityAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Security Question:', securityQuestion);
    console.log('Security Answer:', securityAnswer);
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      {/* registration container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-4xl p-5 items-center flex-row-reverse">
        {/* form */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#00df9a]">Register</h2>
          <p className="text-xs mt-4 text-[#00df9a]">Join us today, it only takes a minute</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input className="p-2 mt-8 rounded-xl border" type="text" name="name" placeholder="Full Name" value={name} onChange={handleNameChange} />
            <input className="p-2 rounded-xl border" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <input className="p-2 rounded-xl border" type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
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
            <select className="p-2 mt-4 rounded-xl border" value={securityQuestion} onChange={handleSecurityQuestionChange}>
              <option value="">Select a Security Question</option>
              <option value="first_pet">What is the name of your first pet?</option>
              <option value="mother_maiden_name">What is your mother's maiden name?</option>
              <option value="birth_city">In what city were you born?</option>
              {/* Add more security questions as needed */}
            </select>
            <input className="p-2 mt-4 rounded-xl border" type="text" name="securityAnswer" placeholder="Security Question Answer" value={securityAnswer} onChange={handleSecurityAnswerChange} />
            <button type="submit" className="bg-[#00df9a] rounded-xl text-white py-2 hover:scale-105 duration-300 mt-4">Register</button>
          </form>
        </div>

        {/* image */}
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={DeliveryImg} alt="Register" />
        </div>
      </div>
    </section>
  );
};

export default Signup;
