import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    try {
        const response = await fetch('http://localhost:3000/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, newPassword })  // Send the token and new password to your backend
        });

        if (response.ok) {
            console.log('Password reset successfully');
            // Handle successful password reset (e.g., redirect to login page)
        } else {
            throw new Error('Failed to reset password');
        }
    } catch (error) {
        console.error('Error:', error);
    }
    console.log('Resetting password for token:', token);
    // Navigate to login or success page
    navigate('/login');
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="font-bold text-2xl text-[#00df9a] mb-6 text-center">Set New Password</h2>
        <form onSubmit={handleResetSubmit}>
          <input
            className="p-2 w-full rounded-xl border mb-4"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input
            className="p-2 w-full rounded-xl border mb-4"
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-[#00df9a] rounded-xl text-white py-2 mt-4 w-full hover:scale-105 duration-300"
          >
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
