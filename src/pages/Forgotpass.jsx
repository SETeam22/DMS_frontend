// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ForgotPassword = () => {
//   const [step, setStep] = useState(1); // Manage the steps of the process
//   const [email, setEmail] = useState('');
//   const [securityQuestion, setSecurityQuestion] = useState('');
//   const [securityAnswer, setSecurityAnswer] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const navigate = useNavigate();

//   const handleEmailSubmit = async (e) => {
//     e.preventDefault();
//     // Here, you would fetch the security question for the user based on the email
//     // This is a placeholder for your backend call
//     const fetchedQuestion = "What was the name of your first pet?";
//     setSecurityQuestion(fetchedQuestion);
//     setStep(2); // Move to the next step
//   };

//   const verifyAnswer = async (e) => {
//     e.preventDefault();
//     // Verify the security answer with the backend
//     // If correct, move to the next step to reset the password
//     setStep(3); // Assuming verification is successful
//   };

//   const resetPassword = async (e) => {
//     e.preventDefault();
//     // Reset the password on the backend
//     console.log('New Password Set:', newPassword);
//     // Navigate to confirmation or login page as needed
//     navigate('/Login');
//   };

//   return (
//     <section className="bg-gray-50 min-h-screen flex items-center justify-center">
//       <div className="bg-gray-100 p-8 rounded-2xl shadow-lg max-w-md w-full">
//         <h2 className="font-bold text-2xl text-[#00df9a] mb-6 text-center">Forgot Password</h2>
//         {step === 1 && (
//           <form onSubmit={handleEmailSubmit}>
//             <p className="text-sm text-gray-600 mb-4 text-center">Enter your email address to retrieve your security question.</p>
//             <input
//               className="p-2 w-full rounded-xl border mb-4"
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             <button
//               type="submit"
//               className="bg-[#00df9a] rounded-xl text-white py-2 mt-4 w-full hover:scale-105 duration-300"
//             >
//               Retrieve Security Question
//             </button>
//           </form>
//         )}
//         {step === 2 && (
//           <form onSubmit={verifyAnswer}>
//             <p className="text-sm text-gray-600 mb-4 text-center">{securityQuestion}</p>
//             <input
//               className="p-2 w-full rounded-xl border mb-4"
//               type="text"
//               placeholder="Security Question Answer"
//               value={securityAnswer}
//               onChange={(e) => setSecurityAnswer(e.target.value)}
//               required
//             />
//             <button
//               type="submit"
//               className="bg-[#00df9a] rounded-xl text-white py-2 mt-4 w-full hover:scale-105 duration-300"
//             >
//               Verify Answer
//             </button>
//           </form>
//         )}
//         {step === 3 && (
//           <form onSubmit={resetPassword}>
//             <p className="text-sm text-gray-600 mb-4 text-center">Set your new password.</p>
//             <input
//               className="p-2 w-full rounded-xl border mb-4"
//               type="password"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               required
//             />
//             <button
//               type="submit"
//               className="bg-[#00df9a] rounded-xl text-white py-2 mt-4 w-full hover:scale-105 duration-300"
//             >
//               Reset Password
//             </button>
//           </form>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ForgotPassword;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);  // State to track if email has been sent
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example API call, you should replace this with your actual backend call
      const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setEmailSent(true); // Set emailSent to true to display the message
      } else {
        throw new Error('Failed to send reset link');
      }
    } catch (error) {
      console.error('Failed to send reset link:', error);
      alert('Failed to send reset link. Please try again.');
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="font-bold text-2xl text-[#00df9a] mb-6 text-center">Forgot Password</h2>
        {!emailSent ? (
          <form onSubmit={handleEmailSubmit}>
            <p className="text-sm text-gray-600 mb-4 text-center">Enter your email address to receive a password reset link.</p>
            <input
              className="p-2 w-full rounded-xl border mb-4"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-[#00df9a] rounded-xl text-white py-2 mt-4 w-full hover:scale-105 duration-300"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              A reset link has been sent to {email}. Please check your email to reset your password.
              The link will expire in 60 minutes.
            </p>
            <button
              className="bg-[#00df9a] rounded-xl text-white py-2 mt-4 w-full hover:scale-105 duration-300"
              onClick={() => navigate('/')}  // Navigate to home or any other page
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;
