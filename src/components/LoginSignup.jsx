// import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';

// import './LoginSignup.css'; // Import your custom CSS

// import user_icon from '../Assets/person.png';
// import email_icon from '../Assets/email.png';
// import password_icon from '../Assets/password.png';

// const LoginSignup = () => {
//   const [action, setAction] = useState('Login');
//   return (
//     <div className='container'>
//       <div className='header'>
//         <div className="text">{action}</div>
//         <div className='underline'></div>
//       </div>
//       <div className="inputs">
//         {action === "Login" ? null : (
//           <div className="input">
//             <img src={user_icon} alt="" />
//             <input type="text" placeholder="Name" />
//           </div>
//         )}

//         <div className="input">
//           <img src={email_icon} alt="" />
//           <input type="email" placeholder="Email Id" />
//         </div>

//         <div className="input">
//           <img src={password_icon} alt="" />
//           <input type="password" placeholder="Password" />
//         </div>
//         {action === "Sign Up" ? null : (
//           <div className="forgot-password">Forgot Password? <span>Click here</span>
//           </div>
//         )}
//         {/* Google Login Button */}
//         {action === "Login" && (
//           <div className="google-login">
//             <GoogleLogin
//               onSuccess={credentialResponse => {
//                 console.log(credentialResponse);
//               }}
//               onError={() => {
//                 console.log('Login Failed');
//               }}
//             />
//           </div>
//         )}
//         <div className="submit-container">
//           <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
//           <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginSignup;
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Dashboard from '../pages/Dashboard'
import { FiLock } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa'; // For user icon
import { AiOutlineMail } from 'react-icons/ai'; // For email icon
import { RiShieldKeyholeLine } from 'react-icons/ri'; // For security icon
import { BiUserCircle } from 'react-icons/bi'; // For user type icon


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
      // Handle signup failure
    }
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
        navigate('/Dashboard', { state: { email } });
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

      <div className="min-h-screen flex justify-center items-center bg-blue-50">
        <div className="container w-96 p-12 bg-white rounded-lg shadow-md">
          <div className="header mb-6">
            <div className="text text-3xl font-semibold text-blue-700">{action}</div>
            <div className="underline h-1 bg-blue-700 mt-2"></div>
          </div>
          <div className="inputs space-y-4">
            {action === "Sign Up" && (
              <>
                <div className="input flex items-center space-x-2">
                <FaUser className="h-6 w-6 text-gray-500" />
                  <input type="text" placeholder="Username" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="input flex items-center space-x-2">
                <AiOutlineMail className="h-6 w-6 text-gray-500" />
                  <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input flex items-center space-x-2">
                <FiLock className="h-6 w-6 text-gray-500" />
                  <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="input flex items-center space-x-2">
      <RiShieldKeyholeLine className="h-6 w-6 text-gray-500" />
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <RiShieldKeyholeLine className="h-6 w-6 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Security Answer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                  />
                </div>
                <div className="input flex items-center space-x-2">
                <BiUserCircle className="h-6 w-6 text-gray-500" />
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <div className="submit-container mt-4">
      <button className="submit w-full py-2 text-center rounded-lg bg-blue-600 text-white" onClick={handleSignUp}>Signup</button>
    </div>
                <div className="text-sm text-blue-500 mt-2">
                  Already have an account? <span className="cursor-pointer" onClick={() => setAction("Login")}>Login</span>
                </div>
              </>
            )}
            {action === "Login" && (
  <>
    <div className="input flex items-center space-x-2">
    <AiOutlineMail className="h-6 w-6 text-gray-500" />
      <input type="email" placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
    </div>
    <div className="input flex items-center space-x-2">
    <FiLock className="h-6 w-6 text-gray-500" />
      <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
    </div>
    <div className="input flex items-center space-x-2">
    <BiUserCircle className="h-6 w-6 text-gray-500" />
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <div className="text-sm text-blue-500 mt-2">
      Forgot Password? <span className="cursor-pointer">Click here</span>
    </div>
    <div className="submit-container mt-4">
      <button className="submit w-full py-2 text-center rounded-lg bg-blue-600 text-white" onClick={handleSignIn}>Login</button>
    </div>
    <div className="text-sm text-blue-500 mt-2">
      New user? <span className="cursor-pointer" onClick={() => setAction("Sign Up")}>Sign Up</span>
    </div>
  </>
)}
  </div>
    </div>
  </div>
);
            }

export default LoginSignup;