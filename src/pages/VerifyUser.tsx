import React from 'react';
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

    const handleSubmit = (pin: string) => {
        console.log(pin);
    }

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

                    <div>
                        <form action="" method="post">
                            <div className="flex flex-col space-y-16">
                            <OTPInput length={5} onComplete={handleSubmit} />
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

