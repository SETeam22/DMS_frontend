import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type InputProps = {
  length?: number;
};

const OTPInput = ({ length = 6 }: InputProps) => {
  const navigate = useNavigate();
  const inputRef = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);

    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
    
    if (newPin.every((digit) => digit !== '') && newPin.join('').length === length) {
      const enteredOTP = newPin.join('');
      const storedOTP = sessionStorage.getItem('otp');

      if (enteredOTP === storedOTP) {
        alert('OTP verified successfully!');
        navigate('/service');
      } else {
        alert('Incorrect OTP, please try again.');
      }
    }
  };

  return (
    <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
      {Array.from({ length }, (_, index) => (
        <div key={index} className="w-14 h-14 mr-2">
          <input
            type="text"
            maxLength={1}
            value={OTP[index]}
            onChange={(e) => handleTextChange(e.target.value, index)}
            ref={el => inputRef.current[index] = el} // Correctly handle the potential null value
            className="w-full h-full text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#00df9a]"
          />
        </div>
      ))}
    </div>
  );
};

export default OTPInput;
