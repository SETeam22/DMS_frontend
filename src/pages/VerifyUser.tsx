// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import OTPInput from '../components/OTPInput';

// const VerifyUser = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('user@example.com'); // Replace with actual email state or prop

//   useEffect(() => {
//     sendOTP();
//   }, []);

//   const sendOTP = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/api/auth/sendotp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email })
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to send OTP');
//       console.log('OTP sent to', email);
//     } catch (error) {
//       console.error('Error sending OTP:', error.message);
//       alert('Error sending OTP.');
//     }
//   };

//   const verifyOTP = async (otp: string) => {
//     try {
//       const response = await fetch('http://localhost:3000/api/auth/verifyotp', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, otp })
//       });
//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to verify OTP');
//       console.log('OTP verified successfully');
//       alert('OTP verified successfully!');
//       navigate('/dashboard'); // Navigate to the dashboard after successful OTP verification
//     } catch (error) {
//       console.error('Verification failed:', error.message);
//       alert('Verification failed, please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="max-w-md w-full p-5 shadow rounded-lg bg-white">
//         <h1 className="text-center text-2xl font-bold mb-4">Verify Your Email</h1>
//         <p className="text-center text-gray-600 mb-4">Enter the OTP sent to {email}</p>
//         <OTPInput length={6} onComplete={verifyOTP} />
//       </div>
//     </div>
//   );
// };

// export default VerifyUser;

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import OTPInput from '../components/OTPInput';

const MaskedEmail = ({ email }) => {
    const atIndex = email.lastIndexOf('@');
    const maskedEmail = `****${email.slice(atIndex - 2, atIndex)}${email.slice(atIndex)}`;
    return <span>{maskedEmail}</span>;  
};
  

const VerifyUser = () => {

    const location = useLocation();
    const { state } = location;

    const [verificationMessage, setVerificationMessage] = useState<string>('');



    const verifyOTP = async (otp: string) => {
      try {
          const response = await fetch('http://localhost:3000/api/auth/verifyotp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: state.email, otp })
          });
          const data = await response.json();
          if (!response.ok) {
            setVerificationMessage('Incorrect OTP, please retry');
            throw new Error(data.message || 'Failed to verify OTP');
          }
          console.log('OTP verified successfully');
          return true;
      } catch (error) {
          setVerificationMessage('Failed to verify OTP');
          console.error('Verification failed:', error.message);
          return false;
      }
  };

    // const handleSubmit = (pin: string) => {
    //     console.log(pin);
    // }

    return (
        <div className="min-h-screen flex flex-col justify-center overflow-hidden bg-gray-50 py-12">
            <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl relative">
                <div className="flex w-full max-w-md flex-col space-y-16 mx-auto">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email <MaskedEmail email={state.email} /></p>
                        </div>
                    </div>

                    {verificationMessage && (
                      <div className="flex justify-center"> {/* Added flex and justify-center to center horizontally */}
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative inline-block max-w-sm min-w-min"> {/* Added min-w-min */}
                          <span className="block sm:inline mr-6">{verificationMessage}</span> {/* Added mr-6 for margin-right */}
                          <span className="absolute top-0 bottom-0 right-0 px-3 py-2 cursor-pointer" onClick={() => setVerificationMessage('')}> {/* Added onClick handler */}
                            <svg className="fill-current h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                          </span>
                        </div>
                      </div>
                    )}                   

                    <div>
                        <form action="" method="post">
                            <div className="flex flex-col space-y-16">
                            <OTPInput length={5} username={state.username} onComplete={verifyOTP} />
                                <div className="flex flex-col space-y-5">
                                    {/* <div>
                                        <button
                                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-[#20B588] border-none text-white text-sm shadow-sm"
                                            onClick={() => handleSubmit()}
                                        >
                                            Verify Account
                                        </button>
                                    </div> */}
                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive the code?</p>
                                        <a className="flex flex-row items-center text-[#20B588]" href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer">
                                            Resend
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VerifyUser;

