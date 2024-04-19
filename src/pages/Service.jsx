import React, { useState, useEffect, useRef } from 'react';
//import { Link } from 'react-router-dom';
import LoginNavBar from '../components/LoginNavBar';

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
    'small packages delivery',
    'medium packages delivery',
    'large packages delivery'
  ]);

  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const companyDropdownRef = useRef(null);
  const typeDropdownRef = useRef(null);

  useEffect(() => {
    fetchServices();
    fetchUserData();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/services/delivery-services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/user');
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/services/search?key=${searchTerm}`);
      const data = await response.json();
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
      setServices(data);
    } catch (error) {
      console.error('Error filtering services:', error);
    }
  };

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

  return (
    <div>
      <LoginNavBar /> {/* Include the navigation bar component */}
      <div className="mt-24">
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
              className="bg-black hover:bg-gray-400 text-[#00df9a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="bg-black p-4 rounded mb-4">
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
          <div className="grid grid-cols-1 gap-4">
            {services.map((service) => (
              <div key={service._id} className="border border-gray-300 rounded p-4">
                <h3 className="font-bold">{service.deliveryServiceTitle}</h3>
                <p>Type: {service.deliverServiceType}</p>
                <p>Description: {service.deliveryServiceDescription}</p>
                <p>Company: {service.deliverServiceCompany}</p>
                <p>Price: ${service.deliverServicePrice}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
