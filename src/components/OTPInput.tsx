import React, { useRef, useState } from 'react';

type OTPInputProps = {
  length?: number;
  onComplete: (otp: string) => void;
};

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const inputRef = useRef<(HTMLInputElement | null)[]>(Array(length).fill(null));
  const [OTP, setOTP] = useState<string[]>(Array(length).fill(''));

  const handleTextChange = (input: string, index: number) => {
    const newOTP = [...OTP];
    newOTP[index] = input;
    setOTP(newOTP);

    if (input.length > 0 && index < length - 1) {
      inputRef.current[index + 1]?.focus();
    } else if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (newOTP.every((digit) => digit.length > 0) && newOTP.join('').length === length) {
      onComplete(newOTP.join(''));
    }
  };

  return (
    <div className="flex justify-center space-x-2">
      {OTP.map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={OTP[index]}
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(el) => (inputRef.current[index] = el)}
          className="w-10 h-10 text-center border rounded"
          autoComplete="off"
          pattern="\d*"
        />
      ))}
    </div>
  );
};

export default OTPInput;
