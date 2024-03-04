


import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Dashboard from '../pages/Dashboard'


import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Create a navigate function
  const [signedUpUsername, setSignedUpUsername] = useState('');
  const [userType, setUserType] = useState('user'); // Default to 'user'
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const securityQuestions = [
    "What was your first pet's name?",
    "What was the model of your first car?",
    "In what city were you born?",
  ];

  const handleSignUp = async () => {
    const response = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        securityQuestion,
        securityAnswer,        
      })
    }); 
    {/*try {
      // Your async operation
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
          // userType is determined on the server, hence not included in the request
        })
      }); */}

  
    if (response.ok) {
      setSignedUpUsername(username); // Set the signed-up username
      navigate('/welcome', { state: { username } }); // Pass username as state
    } else {
      // Handle errors
      console.error('Signup failed');
    } 
    {/*if (response.ok) {
      const data = await response.json();
      // Check the userType and navigate accordingly
      if (data.userType === 'admin') {
        navigate('/admin-dashboard'); // Navigate to the admin dashboard
      } else {
        // For regular users, redirect to a welcome page or similar
        navigate('/welcome', { state: { username: data.username } });
      }
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('There was a problem with the login request:', error);
  } */}
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="container w-96 p-12 bg-white rounded-lg shadow-md">
        <div className="header mb-6">
          <div className="text text-3xl font-semibold text-purple-700">{action}</div>
          <div className="underline h-1 bg-purple-700 mt-2"></div>
        </div>
        <div className="inputs space-y-4">

        {/*{action === "Sign Up" && (
            <>
              <div className="input flex items-center space-x-2">
                <img src={user_icon} alt="" />
                <input type="text" placeholder="Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input flex items-center space-x-2">
                <img src={email_icon} alt="" />
                <input type="email" placeholder="Email Id" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input flex items-center space-x-2">
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="input flex items-center space-x-2">
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                >
                  <option value="">Select a security question</option>
                  {securityQuestions.map((question, index) => (
                    <option key={index} value={question}>{question}</option>
                  ))}
                </select>
              </div>
              <div className="input flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Security Question Answer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                />
              </div>
            </>
                  )}*/}
          {action === "Login" ? null : (
            <>
            <div className="input flex items-center space-x-2">
              <img src={user_icon} alt="" />
              <input type="text" placeholder="Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            
            <div className="input flex items-center space-x-2">
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={securityQuestion}
              onChange={(e) => setSecurityQuestion(e.target.value)}
            >
              <option value="">Select a security question</option>
              {securityQuestions.map((question, index) => (
                <option key={index} value={question}>{question}</option>
              ))}
            </select>
          </div>
          <div className="input flex items-center space-x-2">
            <input
              type="text"
              placeholder="Security Question Answer"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={securityAnswer}
              onChange={(e) => setSecurityAnswer(e.target.value)}
            />
          </div>
          </>
          )}


          <div className="input flex items-center space-x-2">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email Id" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="input flex items-center space-x-2">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          {action === "Sign Up" ? (
            <div className="text-sm text-purple-500 mt-2">
              Already have an account? <span className="cursor-pointer" onClick={() => setAction("Login")}>Login</span>
            </div>
          ) : (
            <div className="forgot-password text-sm text-purple-500 mt-2">
              Forgot Password? <span className="cursor-pointer">Click here</span>
            </div>
          )}

          {action === "Login" && (
            <>
            <div className="user-type flex items-center space-x-2">

          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
  value={userType} onChange={(e) => setUserType(e.target.value)} >
             <option value="user">User</option>
             <option value="admin">Admin</option>
           </select>
           </div>
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
            </>
          )}

          <div className="submit-container mt-4">
            {action === "Sign Up" ? (
              <button className="submit w-full py-2 text-center rounded-lg bg-purple-600 text-white" onClick={handleSignUp}>Sign Up</button>
            ) : (
              <button className="submit w-full py-2 text-center rounded-lg bg-purple-600 text-white" onClick={() => console.log('Login')}>Login</button>
            )}
          </div>

          {action === "Login" && (
            <div className="text-sm text-purple-500 mt-2">
              New user? <span className="cursor-pointer" onClick={() => setAction("Sign Up")}>Sign Up</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginSignup; 

