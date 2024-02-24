import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    fetchServices();
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

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search services..."
          className="border border-gray-300 rounded p-2 mr-2 flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded p-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="bg-black p-4 rounded mb-4">
        <div className="flex items-center mb-2">
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-300 rounded p-2 mr-2"
            value={filter.title}
            onChange={(e) => updateFilter('title', e.target.value)}
          />
          <input
            type="text"
            placeholder="Type"
            className="border border-gray-300 rounded p-2 mr-2"
            value={filter.type}
            onChange={(e) => updateFilter('type', e.target.value)}
          />
          <input
            type="text"
            placeholder="Company"
            className="border border-gray-300 rounded p-2 mr-2"
            value={filter.company}
            onChange={(e) => updateFilter('company', e.target.value)}
          />
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
            className="bg-green-500 text-white rounded p-2"
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
  );
};

export default Service;
