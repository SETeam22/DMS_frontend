import React, { useRef, useState } from 'react';

type InputProps = {
  length?: number;
  onComplete: (pin: string) => void;
};

const OTPInput = ({ length = 4, onComplete }: InputProps) => {

  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));

  const handleTextChange = (input: string, index: number) => {
    const newPin = [...OTP];
    newPin[index] = input;
    setOTP(newPin);
    // check if the user has entered the first digit, if yes, automatically focus on the next input field and so on.
    if (input.length === 1 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    }
    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }
    // if the user has entered all the digits, grab the digits and set as an argument to the onComplete function.
    if (newPin.every((digit) => digit !== '')) {
      onComplete(newPin.join(''));
    }
  };

  return (
        <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            {Array.from({ length }, (_, index) => (
                <div key={index} className={`w-14 h-14 ${index < length - 1 ? 'mr-2' : ''}`}>
                    <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={OTP[index]}
                    onChange={(e) => handleTextChange(e.target.value, index)}
                    ref={(ref) => (inputRef.current[index] = ref as HTMLInputElement)}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-[#00df9a]"
                    />
                </div>
            ))}
        </div>
  );
};


export default OTPInput;