import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bcryptjs from 'bcryptjs';

const ResetPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
      if (password !== '' && e.target.value !== '') {
        setPasswordsMatch(e.target.value === password);
      } else {
        setPasswordsMatch(true);
      }
    };  
  
    const handleReset = async () => {

        if(!passwordsMatch || confirmPassword === ''){
            return;
        }

        const hashedPassword = await bcryptjs.hashSync(confirmPassword, 10); 
    
        try {
            const response = await fetch('http://localhost:4000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: state.username, newPassword: hashedPassword })
            });
    
            if (response.ok) {
                console.log('Password changed successfully');
                navigate('/service');
            } else {
                console.error('Failed to change password');
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };
    
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="w-96 p-12 bg-white rounded-lg shadow-md">
                <div className="header mb-6">
                    <div className="text text-3xl font-semibold text-[#21AC82]">Reset Password</div>
                    <div className="underline h-1 bg-[#21AC82] mt-2"></div>
                </div>
                <div className="inputs space-y-4">
                    <div className="input flex items-center space-x-2">
                        <input type="password" placeholder="New Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21AC82]" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="input flex items-center space-x-2">
                        <input type="password" placeholder="Confirm Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21AC82]" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                    </div>
                    {!passwordsMatch && confirmPassword !== '' && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                                                    <span className="block sm:inline">Passwords do not match!</span>
                                                                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3"></span>
                                                                </div>}
                </div>
                <div className="submit-container mt-8">
                    <button className="submit w-full py-2 text-center rounded-lg bg-[#21AC82] text-white" onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;