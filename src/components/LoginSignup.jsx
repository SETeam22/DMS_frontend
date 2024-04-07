


import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection


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

  const [actualSecurityAnswer, setActualSecurityAnswer] = useState('');
  const [userSecurityAnswer, setUserSecurityAnswer] = useState('');
  const handleSignUp = async () => {
    const requestData = {
      username,
      email,
      password,
      securityQuestion,
      securityAnswer,  
      userType
    };
    
    console.log("Sending request to /api/auth/signup with data:", requestData);
    const signupResponse = await fetch('http://localhost:4000/api/auth/signup', {
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
        userType
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

  
    if (signupResponse.ok) {
      setSignedUpUsername(username); // Set the signed-up username

      // Call the sendOTP API
      const otpResponse = await fetch('http://localhost:4000/api/auth/sendotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
  
      if (otpResponse.ok) {
        const otpData = await otpResponse.json();
        // Assuming the OTP is returned in the response for testing, store it for verification
        // In a real-world application, the OTP should be verified on the server side
        const { otp } = otpData;
        sessionStorage.setItem('otp', otp);  // Storing the OTP for later verification, consider security implications
  
        navigate('/verification', { state: { email, username } }); // Navigate to verification page
      } else {
        console.error('OTP sending failed');
        // Handle OTP sending failure
      }
    } else {
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
  

  const handleSignIn = async () => {
    const response = await fetch('http://localhost:4000/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        userType      
      })
    });

    if (response.ok) {
      const data = await response.json();

      if (userType === 'admin') {
        navigate('/dashboard', { state: { email } });
      } else {
        // Set the security question and answer from the response
        setSecurityQuestion(data.securityQuestion);
        setActualSecurityAnswer(data.securityAnswer);
        // Trigger modal/dialog or redirect to a screen to ask for the security answer
        // For simplicity, we assume it's a prompt in this example
        const userAnswer = prompt(`Security Question: ${data.securityQuestion}`);
        setUserSecurityAnswer(userAnswer);

        if (userAnswer === data.securityAnswer) {
          navigate('/service', { state: { email } }); // Redirect to homepage on successful verification
        } else {
          alert('Security answer is incorrect.');
        }
      }
    } else {
      console.error('Login failed');
    }
  };
  return (
    
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      {/* login container */}
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        {/* form */}
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#00df9a]">Login</h2>
          <p className="text-xs mt-4 text-[#00df9a]">If you are already a member, easily log in</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <div className="relative">
              <input className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
              
            </div>
            <button type="submit" className="bg-[#00df9a] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
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
          <div className="mt-5 text-xs border-b border-gray-400 py-4 text-[#00df9a]">
            Forgot your password? <Link to="/Forgotpass" className="border-b border-[#00df9a]">Click here</Link>
         </div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#00df9a]">
            <p>Don't have an account?</p>
            <button onClick={navigateToSearch} className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
          </div>
        </div>

        {/* image */}
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={DeliveryImg} alt="Login" />
        </div>
      </div>
    </section>
   
  );
};

export default LoginSignup;
