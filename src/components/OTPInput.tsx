// import React, { useRef, useState } from 'react';

// type OTPInputProps = {
//   length?: number;
//   onComplete: (otp: string) => void;
// };

// const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
//   const inputRef = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));
//   const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));

//   const handleTextChange = (input: string, index: number) => {
//     const newOTP = [...OTP];
//     newOTP[index] = input;
//     setOTP(newOTP);

//     if (input.length > 0 && index < length - 1) {
//       inputRef.current[index + 1]?.focus();
//     } else if (input.length === 0 && index > 0) {
//       inputRef.current[index - 1]?.focus();
//     }

//     if (newOTP.every((digit) => digit.length > 0) && newOTP.join('').length === length) {
//       onComplete(newOTP.join(''));
//     }
//   };

//   return (
//     <div className="flex justify-center space-x-2">
//       {OTP.map((_, index) => (
//         <input
//           key={index}
//           type="text"
//           maxLength={1}
//           value={OTP[index]}
//           onChange={(e) => handleTextChange(e.target.value, index)}
//           ref={(el) => (inputRef.current[index] = el)}
//           className="w-10 h-10 text-center border rounded"
//           autoComplete="off"
//           pattern="\d*"
//         />
//       ))}
//     </div>
//   );
// };

// export default OTPInput;

import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type InputProps = {
  length?: number;
};

const OTPInput = ({ length = 6, username, onComplete }: InputProps) => {
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
      handleVerification(newPin.join(''));
    }  
  };  

  const handleVerification = async (enteredOTP: string) => {
    try {
      const isOTPVerified = await onComplete(enteredOTP); // Wait for verifyOTP function to complete

      if (isOTPVerified) {
        // setVerificationMessage('OTP verified successfully!');
        navigate('/resetpassword', { state: { username } });
      } else {
        console.log('Verification failed');
      }
    } catch (error) {
      console.error('Verification failed:', error.message);
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
