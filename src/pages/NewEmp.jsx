import React, { useState } from 'react';
import Sidenav from '../components/Sidenav';

const NewEmp = () => {
  // State hooks for the form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission (e.g., send data to an API)
    console.log({ name, email, age, orderId, status });
    // Implement the actual form submission logic here
  };

  return (
    <div className='flex'>
      <Sidenav />
      <div className='flex-grow p-8'>
        <div className='max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md'>

          {/* <h2 className='text-2xl font-semibold mb-6'>Assign Employee</h2> */}

          <h2 className='text-2xl font-semibold mb-6'>Add Driver</h2>

          <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4'>
            <div className='col-span-2'>
              <label className='block text-gray-700 text-sm font-semibold mb-2'>Name</label>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
            <div className='col-span-2'>
              <label className='block text-gray-700 text-sm font-semibold mb-2'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-semibold mb-2'>Age</label>
              <input
                type='number'
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
            <div>
              <label className='block text-gray-700 text-sm font-semibold mb-2'>Order ID</label>
              <input
                type='text'
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
              />
            </div>
            <div className='col-span-2'>
              <label className='block text-gray-700 text-sm font-semibold mb-2'>Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
              >
                <option value=''>Select Status</option>
                {/* <option value='pending'>Pending</option>
                <option value='processing'>Processing</option>
                <option value='shipped'>Shipped</option>
                <option value='delivered'>Delivered</option>
                <option value='cancelled'>Cancelled</option> */}
                <option value='active'>Active</option>
                <option value='inactive'>InActive</option>


              </select>
            </div>
            <div className='col-span-2'>
              <button
                type='submit'
                className='w-full bg-blue-500 text-white font-semibold py-2 px-4 border border-blue-700 rounded hover:bg-blue-600'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewEmp;
