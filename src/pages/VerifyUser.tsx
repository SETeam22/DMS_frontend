import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OTPInput from '../components/OTPInput';

const VerifyUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('user@example.com'); // Replace with actual email state or prop

  useEffect(() => {
    sendOTP();
  }, []);

  const sendOTP = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/sendotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to send OTP');
      console.log('OTP sent to', email);
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      alert('Error sending OTP.');
    }
  };

  const verifyOTP = async (otp: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to verify OTP');
      console.log('OTP verified successfully');
      alert('OTP verified successfully!');
      navigate('/dashboard'); // Navigate to the dashboard after successful OTP verification
    } catch (error) {
      console.error('Verification failed:', error.message);
      alert('Verification failed, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-5 shadow rounded-lg bg-white">
        <h1 className="text-center text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-center text-gray-600 mb-4">Enter the OTP sent to {email}</p>
        <OTPInput length={6} onComplete={verifyOTP} />
      </div>
    </div>
  );
};

export default VerifyUser;
