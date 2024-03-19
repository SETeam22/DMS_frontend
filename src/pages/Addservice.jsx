import React, { useState } from 'react';

const AddServiceForm = () => {
  const [serviceData, setServiceData] = useState({
    type: '',
    description: '',
    company: '',
    price: '',
    weightLimit: '',
    dimensions: { length: '', width: '', height: '' },
    locations: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'locations') {
      // Create an array from the selected options
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setServiceData({ ...serviceData, [name]: selectedOptions });
    } else if (name in serviceData.dimensions) {
      setServiceData({
        ...serviceData,
        dimensions: { ...serviceData.dimensions, [name]: value }
      });
    } else {
      setServiceData({ ...serviceData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    console.log(serviceData)
    event.preventDefault();
    // Submit to the API
    try {
      const response = await fetch('http://localhost:3000/api/services/add-service', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(serviceData)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
      // Handle successful submission here, e.g., show a success message
    } catch (error) {
      console.error('Error submitting the form:', error);
      // Handle errors here, e.g., show an error message
    }
  };


  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
          Type
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="type" name="type" type="text" placeholder="Delivery type" value={serviceData.type} onChange={handleChange} />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" name="description" type="text" placeholder="Short description" value={serviceData.description} onChange={handleChange} />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="company">
          Company
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="company" name="company" type="text" placeholder="Company name" value={serviceData.company} onChange={handleChange} />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" name="price" type="number" placeholder="Price" value={serviceData.price} onChange={handleChange} />
      </div>
  
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="weightLimit">
          Weight Limit
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="weightLimit" name="weightLimit" type="number" placeholder="Weight limit" value={serviceData.weightLimit} onChange={handleChange} />
      </div>
  
      <div className="mb-4 flex gap-4">
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="length">
            Length
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="length" name="length" type="number" placeholder="Length" value={serviceData.dimensions.length} onChange={handleChange} />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="width">
            Width
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="width" name="width" type="number" placeholder="Width" value={serviceData.dimensions.width} onChange={handleChange} />
        </div>
        <div className="flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="width">
          Height
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="Height" name="Height" type="number" placeholder="Height" value={serviceData.dimensions.Height} onChange={handleChange} />
        </div>
       </div> 
       <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="locations">
    Locations
  </label>
  <select multiple className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="locations" name="locations" value={serviceData.locations} onChange={handleChange}>
    {/* Preset location options could be replaced with dynamic locations */}
    <option value="New York">New York</option>
    <option value="Los Angeles">Los Angeles</option>
    <option value="Chicago">Chicago</option>
    <option value="Indiana">Indiana</option>
    {/* ... other options */}
  </select>
</div>


      
      <div className="submit-container mt-4">
      <button className="submit w-full py-2 text-center rounded-lg bg-blue-600 text-white" onClick={handleSubmit}>Add</button>
      </div>
     
    </form>
  );
};

export default AddServiceForm;
