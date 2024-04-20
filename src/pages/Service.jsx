import React, { useState, useEffect, useRef } from 'react';
//import { Link } from 'react-router-dom';
import LoginNavBar from '../components/LoginNavBar';
import { secureFetch } from '../helper/SecureFetch.jsx';
import fedex from '../assets/fedex.jpg';
import usps from '../assets/usps.jpg';
import dhl from '../assets/dhl.jpeg'; // Note: Make sure the extension matches what you have in your assets folder
import amazonlogistics from '../assets/amazonlogistics.jpg';
import royalmail from '../assets/royalmail.jpg';
import ups from '../assets/ups.jpg';
import dhlexpress from '../assets/dhlexpress.jpg';
import canadapost from '../assets/canadapost.jpg';
import tntexpress from '../assets/tntexpress.jpg';
import { useNavigate } from 'react-router-dom';

const Service = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState({
    title: '',
    type: '',
    company: '',
    minPrice: '',
    maxPrice: '',
  });
  const navigate = useNavigate();
  const handleOrderClick = (service) => {
    navigate('/Cart', { state: { service } });
  };
  const [user, setUser] = useState(null);
  
  const [availableServices, setAvailableServices] = useState([
    'FedEx',
    'USPS',
    'UPS',
    'DHL',
    'Amazon Logistics',
    'Royal Mail',
    'DHL Express',
    'Canada Post',
    'TNT Express',
  ]);

  const [availableTypes] = useState([
    'express document shipping',
    'standard mail',
    'international shipping',
    'same-day delivery',
    'local postal service',
    'large packages delivery',
    'international express',
    'national postal service',
    'urgent parcel delivery'

  ]);

  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const companyDropdownRef = useRef(null);
  const typeDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showCompanyDropdown && companyDropdownRef.current && !companyDropdownRef.current.contains(e.target)) {
        setShowCompanyDropdown(false);
      }
      if (showTypeDropdown && typeDropdownRef.current && !typeDropdownRef.current.contains(e.target)) {
        setShowTypeDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCompanyDropdown, showTypeDropdown]);

  useEffect(() => {
    fetchServices();
    // fetchUserData();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/services/delivery-services', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
     // const response = await Fetch('http://localhost:3000/api/services/delivery-services');
     const data = await response.json();
     
    setServices(data);
     
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/services/search?key=${searchTerm}`);
      const data = await response.json();
      console.log(data);
      setServices(data);
    } catch (error) {
      console.error('Error searching services:', error);
    }
  };

  const handleFilter = async () => {
    const queryParams = new URLSearchParams(filter).toString();
    try {
      const response = await fetch(`http://localhost:3000/api/services/filter?${queryParams}`);
      const data = await response.json();
      console.log(data);
      setServices(data);
    } catch (error) {
      console.error('Error filtering services:', error);
    }
  };

  const toggleCompanyDropdown = () => setShowCompanyDropdown(!showCompanyDropdown);
  const toggleTypeDropdown = () => setShowTypeDropdown(!showTypeDropdown);

  const updateFilter = (key, value) => {
    setFilter((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setShowCompanyDropdown(true);
    setShowTypeDropdown(true);
  };

  const handleSelectCompany = (company) => {
    updateFilter('company', company);
    setShowCompanyDropdown(false);
  };

  const handleSelectType = (type) => {
    updateFilter('type', type);
    setShowTypeDropdown(false);
  };

  const getImageForService = (companyName) => {
    switch (companyName.toLowerCase()) {
      case 'fedex':
        return fedex;
      case 'usps':
        return usps;
      case 'dhl':
        return dhl;
      case 'amazon logistics':
        return amazonlogistics;
      case 'royal mail':
        return royalmail;
      case 'ups':
        return ups;
      case 'dhl express':
        return dhlexpress;
      case 'canada post':
        return canadapost;
      case 'tnt express':
        return tntexpress;
      default:
        return '/assets/default.jpg'; // Default image or another fallback
    }
  };
  function renderStars(rating) {
    const filledStars = Math.round(rating);
    const emptyStars = 5 - filledStars;
    return (
      <div>
        {'★'.repeat(filledStars)}
        {'☆'.repeat(emptyStars)}
      </div>
    );
  }
  

  return (
    <div>
      <LoginNavBar />
      <div className="mt-24">
        <div className="bg-red-500 text-white p-4 text-center">
          Get 10% off on your first order!Avail it today.
        </div>
        <div className="p-4">
          <div className="flex items-baseline mb-4">
            <input
              type="text"
              placeholder="Search services..."
              className="border border-gray-300 rounded p-2 mr-2 flex-grow"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button
              className="bg-white hover:bg-gray-400 text-[#00df9a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="bg-white p-4 rounded mb-2 w-full">
            <div className="flex items-baseline mb-2">
              <input
                type="text"
                placeholder="Title"
                className="border border-gray-300 rounded p-2 mr-2"
                value={filter.title}
                onChange={(e) => updateFilter('title', e.target.value)}
              />
              <div className="relative">
                <input
                  type="text"
                  placeholder="Company"
                  className="border border-gray-300 rounded p-2 mr-2"
                  value={filter.company}
                  onChange={(e) => updateFilter('company', e.target.value)}
                  onFocus={() => setShowCompanyDropdown(true)}
                />
                {showCompanyDropdown && (
                  <ul ref={companyDropdownRef} className="absolute bg-white border border-gray-300 rounded w-full mt-1">
                    {availableServices
                      .filter((service) => service.toLowerCase().startsWith(filter.company.toLowerCase()))
                      .map((service, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSelectCompany(service)}
                        >
                          {service}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type"
                  className="border border-gray-300 rounded p-2 mr-2"
                  value={filter.type}
                  onChange={(e) => updateFilter('type', e.target.value)}
                  onFocus={() => setShowTypeDropdown(true)}
                />
                {showTypeDropdown && (
                  <ul ref={typeDropdownRef} className="absolute bg-white border border-gray-300 rounded w-full mt-1">
                    {availableTypes.map((type, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelectType(type)}
                      >
                        {type}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input
                type="number"
                placeholder="Min Price"
                className="border border-gray-300 rounded p-2 mr-2"
                value={filter.minPrice}
                onChange={(e) => updateFilter('minPrice', e.target.value)}
              />
              <input
                type="number"
                placeholder="Max Price"
                className="border border-gray-300 rounded p-2 mr-2"
                value={filter.maxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
              />
              <button
                className="bg-white hover:bg-gray-400 text-black font-bold py-2 px-4 rounded border border-black focus:outline-none focus:shadow-outline mt-2"
                onClick={handleFilter}
              >
                Filter
              </button>
            </div>
          </div>
          <div className="p-4 bg-blue-100">
            <h2 className="font-bold text-lg mb-2">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Recommendations Map */}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {services.map((service) => (
    <div key={service._id} className="border border-gray-300 rounded p-4 flex flex-col">
      <img src={getImageForService(service.deliverServiceCompany)} alt={service.deliveryServiceTitle} className="w-full h-40 object-cover rounded" />
      <div className="p-2 flex-grow">
        <h3 className="font-bold">{service.deliveryServiceTitle}</h3>
        <p>Type: {service.deliverServiceType}</p>
        <p>Description: {service.deliveryServiceDescription}</p>
        <p>Company: {service.deliverServiceCompany}</p>
        <p>Price: ${service.deliverServicePrice}</p>
        <div className="flex items-center">
          <span>{renderStars(service.rating)}</span>
          <span className="ml-2 text-sm text-gray-600">({service.noppl} reviews)</span>
        </div>
      </div>
      <button className="mt-auto bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
       onClick={() => handleOrderClick(service)}>
        Order Now
      </button>
    </div>
  ))}
</div>

        </div>
      </div>
    </div>
  );
};

export default Service;
