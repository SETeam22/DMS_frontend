import React, { useState } from 'react';
import { signInWithGoogle } from '../helper/authServices'
import DeliveryImg from '../assets/door-to-door-delivery-flat-deliveryman-courier-vector-29765876.jpg';
import ReCAPTCHA from "react-google-recaptcha";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../helper/firebaseConfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection


const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate(); // Create a navigate function

  const signInWithGoogle = async () => {
    try {
        // Attempt to sign in with Google
        const result = await signInWithPopup(auth, provider);
        
        // Access the user's Google access token if needed (not typically used for backend calls directly)
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;  // This might be unnecessary unless you need it for accessing Google APIs

        // Extract user details
        const user = result.user;
        const userData = {
            username: user.displayName,
            email: user.email,
            profilePicture: user.photoURL
        };
        console.log(userData);
        // Send user data to your backend
        const response = await fetch('http://localhost:3000/api/auth/google', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        console.log(response);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Login successful:', data);
        localStorage.setItem('authToken', data.token);  // Assuming the token is named 'token' in the response
        navigate('/service');
        // Redirect the user or clear the form here depending on your application flow
    } catch (error) {
        // Handle errors from signInWithPopup or the fetch operation
        console.error('Authentication or network error:', error);
        alert('Authentication failed. Please try again.');
    }
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

  const handleCaptchaChange = (value) => {
    //console.log("Captcha value:", value);
    setCaptchaValue(value); // Add this line
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please verify you are not a robot.");
      return;
    }
  
    const userData = {
      username: name,
      email: email,
      password: password,
      userType: "user",  // Assuming userType is static for all new users
      securityQuestion: securityQuestion,
      securityAnswer: securityAnswer
    };
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      console.log(userData)
      
      if (response.ok) {
  
        navigate('/service'); // Navigate to verification page
      }
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
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
            <input className="p-2 mt-8 rounded-xl border" type="text" name="name" placeholder="Username" value={name} onChange={handleNameChange} />
            <input className="p-2 rounded-xl border" type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <input className="p-2 rounded-xl border" type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            <div className="google-login mt-4">
            <button onClick={signInWithGoogle}>Sign in with Google</button>
          </div>
            <select className="p-2 mt-4 rounded-xl border" value={securityQuestion} onChange={handleSecurityQuestionChange}>
              <option value="">Select a Security Question</option>
              <option value="first_pet">What is the name of your first pet?</option>
              <option value="mother_maiden_name">What is your mother's maiden name?</option>
              <option value="birth_city">In what city were you born?</option>
              {/* Add more security questions as needed */}
            </select>
            <input className="p-2 mt-4 rounded-xl border" type="text" name="securityAnswer" placeholder="Security Question Answer" value={securityAnswer} onChange={handleSecurityAnswerChange} />
            <ReCAPTCHA
              sitekey="6LfPz68pAAAAANLP2PNC_3J5fU4H9sFtw5j0LYoE"
              onChange={handleCaptchaChange}
            />
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
