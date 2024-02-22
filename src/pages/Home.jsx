
// import React from "react";
// import Navigation from "../components/Navigation.jsx";
// import Hero from "../components/Hero.jsx";
// import Features from '../components/Features.jsx';
// import Contact from '../components/Contact.jsx';
// import Navigationbar from "../components/Navigationbar.jsx";
// import SmoothScroll from "smooth-scroll";
// import "./Home.css";

// import "./Home.css";
// export const scroll = new SmoothScroll('a[href*="#"]', {
//   speed: 1000,
//   speedAsDuration: true,
// }); 

// const Home = () => {
//   return (
//     <div>
      
//       <Navigation />
//       <Hero />
//       <Features />
//       <Contact />
//       <Navigationbar />
    
      
//     </div>
//   );
// };
//  export default Home;


import React from "react";
import Navigationbar from "../components/Navigationbar.jsx";
import Hero from "../components/Hero.jsx";
import Features from '../components/Features.jsx';
import Contact from '../components/Contact.jsx';
import SignIn from '../components/LoginSignup.jsx'
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navigationbar />
      <div id="Home"> {/* The ID matches the 'to' prop in Navigationbar for Home */}
        <Hero />
      </div>
      <div id="About"> {/* Assuming Features represents the About section */}
        <Features />
      </div>
      <div id="Contact"> {/* Matches the 'to' prop for the Contact link */}
        <Contact />
      </div>
     
      {/* Add a Sign IN section if necessary, or adjust the Navigationbar links accordingly */}
    </div>
  );
};

export default Home;
