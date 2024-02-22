

import React from 'react';
import Icon from './Icon'; // Adjust the import path to where your Icon component is located

// Define the features data directly in the component
const featuresData = [
  {
    "icon": "faMapMarkerAlt",
    "title": "Real-time Tracking",
    "text": "Enables customers and delivery providers to monitor delivery status and location in real-time, enhancing transparency and reducing uncertainty through GPS integration."
  },
  {
    "icon": "faRoute",
    "title": "Route Optimization",
    "text": "Optimizes delivery routes by analyzing factors like location, traffic, and priority, minimizing costs, and improving efficiency for timely deliveries and enhanced customer satisfaction."
  },
  {
    "icon": "faBell",
    "title": "Notifications",
    "text": "Notifies delivery providers of new assignments, route changes, or urgent requests, ensuring prompt responsiveness and efficient task management."
  },
  {
    "icon": "faEnvelope",
    "title": "Automated Communication",
    "text": " Customers receive automated order confirmation and status updates throughout the delivery process, ensuring timely acknowledgment and real-time information."
  }
];

const Features = () => {
  // Determine the maximum number of lines to display in the feature text.
  const maxTextLines = 3;
  const lineHeight = 6; // Tailwind CSS line height class (1.5rem)
  const maxHeight = maxTextLines * lineHeight;
  
  // Adjust this formula based on your line-height
  return(
    <div id="features" className="text-center bg-floralwhite">
      <div className="container mx-auto">
        <div className="w-full md:w-10/12 mx-auto py-12">
          <h2 className="text-4xl font-bold mb-12 text-darktheme">
            Why DeliverEase?
          </h2>
        </div>
        <div className="flex flex-wrap justify-center pb-20 ">
          <p className="leading-relaxed mx-3">Bringg enables a hassle-free delivery experience, offering convenient delivery options while still ensuring more drops per day. Bringg turns delivery into a unique differentiator for over 800 customers, with over 200 million orders shipped every year.</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {featuresData.map((feature, index) => (
            <div key={`${feature.title}-${index}`} className="px-4 w-full sm:w-1/2 md:w-1/4 mb-20"> 
              <div className="text-4xl mx-auto mb-5 w-24 h-24 flex items-center justify-center rounded-full bg-black text-white shadow-md">
                <Icon iconName={feature.icon} />
              </div>
              <h3 className="text-xl font-semibold text-darktheme">
                {feature.title}
              </h3>
              <p className={`mt-2 text-gray-700 overflow-hidden leading-6`}>
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
//   return (
//     <div id="features" className="text-center bg-floralwhite">
//       <div className="container mx-auto">
//         <div className="w-full md:w-10/12 mx-auto py-12">
//           <h2 className="text-4xl font-bold mb-12 text-darktheme">
//             Why DeliverEase?
//           </h2>
//         </div>
//         <div className="flex flex-wrap justify-center pb-20 ">
//           <p>Bringg enables a hassle-free delivery experience, offering convenient delivery options while still ensuring more drops per day. Bringg turns delivery into a unique differentiator for over 800 customers, with over 200 million orders shipped every year.</p></div>
//         <div className="flex flex-wrap justify-center">
//           {featuresData.map((feature, index) => (
//             <div key={`${feature.title}-${index}`} className="px-4 w-1/2 md:w-1/4 mb-8">
//               <div className="text-4xl mx-auto mb-5 w-24 h-24 flex items-center justify-center rounded-full bg-black shadow-md">
//                 <Icon iconName={feature.icon} />
//               </div>
//               <h3 className="text-xl font-semibold text-darktheme">
//                 {feature.title}
//               </h3>
//               {/* Apply a max-height based on the number of lines and line-height */}
//               <p className={`mt-2 text-gray-700 overflow-hidden leading-${lineHeight} h-${maxHeight}`}>
//                 {feature.text}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
export default Features;