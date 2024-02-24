// import React from 'react';
// import { ReactTyped } from "react-typed";

// const Hero = () => {
//   return (
//     <div className='bg-black text-white'>
//       <div className='max-w-[1000px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
//         <p className='text-[#00df9a] font-bold p-2'>
//           GROWING WITH DATA ANALYTICS
//         </p>
        
//         <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
//           Grow with data.
//         </h1>
//         {/* <div><ReactTyped strings={["Here you can find anything"]} typeSpeed={200} /></div> */}
        
//         <div className='flex justify-center items-center'>
//           <p className='md:text-[#00df9a] 5xl sm:text-4xl text-xl font-bold py-4'>
//           Revolutionize Your Delivery Experience: 
//           </p>
//           <ReactTyped className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
//             strings={['Seamless', 'Efficient', 'Reliable']}
//             typeSpeed={120}
//             backSpeed={140}
//             loop />
          
//         </div>
//         <p className='md:text-2xl text-xl font-bold text-gray-500 py-10'>Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms.</p>
//         <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
//       </div>
//     </div>
//   );
// };

// export default Hero;


import React from 'react';
import { ReactTyped } from "react-typed";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate(); 
  const navigateToSearch = () => {
    navigate('/search'); 
  };
  return (
    <div className='bg-black text-white'>
      <div className='max-w-[1000px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold text-3xl p-2'>
        DeliverEase: Streamlining Your Delivery Operations. 
        </p>
        
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
        Get Ship Done.
        </h1>
        {/* <div><ReactTyped strings={["Here you can find anything"]} typeSpeed={200} /></div> */}
        
        {/* <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
          Revolutionize Your Delivery Experience: 
          </p>
          <ReactTyped className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['Seamless', 'Efficient', 'Reliable']}
            typeSpeed={120}
            backSpeed={140}
            loop />
        </div> */}
        <div className='flex justify-center items-center flex-wrap md:flex-nowrap'>
        <p className='text-5xl font-bold py-4 whitespace-nowrap'>
          Revolutionize Your Delivery Experience: 
        </p>
        <ReactTyped className='text-5xl font-bold pl-4'
          strings={['Seamless', 'Efficient', 'Reliable']}
          typeSpeed={120}
          backSpeed={140}
          loop />
        </div>

        <p className='md:text-2xl text-xl font-bold text-gray-500 mt-4 mb-10'>Efficiency Unboxed: Delivering Success, One Order at a Time.</p>
        <button onClick={navigateToSearch} className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
    </div>
  );
};

export default Hero;
