import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginNavBar from '../components/LoginNavBar';

const HelpButton = () => {
  return (
    <Link
      to="/faq"
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4" // Adjusted margin to position beside Edit button
    >
      Help
    </Link>
  );
};

const UserProfile = () => {
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    firstName: "ABC",
    lastName: "XYZ",
    street: "123 Dummy Street",
    apt: "300",
    zipcode: "12345",
    email: "abc.xyz@example.com",
    mobile: "123-456-7890",
  });

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const saveChanges = () => {
    setEditing(false);
  };

  const recentOrders = [
    {
      id: 1,
      date: "2024-03-15",
      status: "Delivered",
      items: ["Item 1", "Item 2"],
      total: 200.00
    },
    {
      id: 2,
      date: "2024-03-10",
      status: "Pending",
      items: ["Item 3", "Item 4"],
      total: 150.00
    }
  ];

  const totalSpent = recentOrders.reduce((acc, order) => acc + order.total, 0);
  const averageSpent = totalSpent / recentOrders.length;

  return (
    <div>
      <LoginNavBar />
      <div className="mt-4 sm:mt-24">
        <div className="container mx-auto p-4">
          <div className="bg-green-100 rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-bold mb-4">User Profile</h2> 
            <div className="flex justify-between items-center mb-4"> {/* Adjusted container with flex */}
              <div> {/* Grouping the Edit and Save buttons */}
                <button onClick={toggleEditing} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  {editing ? 'Cancel' : 'Edit'}
                </button>
                {editing && (
                  <button onClick={saveChanges} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4">
                    Save
                  </button>
                )}
              </div>
              
              <HelpButton /> {/* Display the Help button separately */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">First Name:</p>
                {editing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <p className="font-semibold">{editedUser.firstName}</p>
                )}
              </div>
              <div>
                <p className="text-gray-700">Last Name:</p>
                {editing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <p className="font-semibold">{editedUser.lastName}</p>
                )}
              </div>
              <div className="col-span-2">
                <p className="text-gray-700">Street:</p>
                {editing ? (
                  <input
                    type="text"
                    name="street"
                    value={editedUser.street}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <p className="font-semibold">{editedUser.street}</p>
                )}
              </div>
              <div>
                <p className="text-gray-700">Apt:</p>
                {editing ? (
                  <input
                    type="text"
                    name="apt"
                    value={editedUser.apt}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <p className="font-semibold">{editedUser.apt}</p>
                )}
              </div>
              <div>
                <p className="text-gray-700">Zipcode:</p>
                {editing ? (
                  <input
                    type="text"
                    name="zipcode"
                    value={editedUser.zipcode}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <p className="font-semibold">{editedUser.zipcode}</p>
                )}
              </div>
              <div className="col-span-2">
                <p className="text-gray-700">Email:</p>
                <p className="font-semibold">{editedUser.email}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-700">Mobile Number:</p>
                <p className="font-semibold">{editedUser.mobile}</p>
              </div>
            </div>
          </div>

          {/* Spending Statistics */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-bold mb-4">Spending Statistics</h2>
            <div className="p-2">
              <p className="text-gray-700"><span className="font-semibold">Total Spent:</span> ${totalSpent.toFixed(2)}</p>
              <p className="text-gray-700"><span className="font-semibold">Average Order Value:</span> ${averageSpent.toFixed(2)}</p>
            </div>
          </div>
            
          {/* Recent Orders */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
            {recentOrders.map(order => (
              <div key={order.id} className="mb-4 border-b">
                <p className="text-gray-700"><span className="font-semibold">Order ID:</span> {order.id}</p>
                <p className="text-gray-700"><span className="font-semibold">Date:</span> {order.date}</p>
                <p className="text-gray-700"><span className="font-semibold">Status:</span> {order.status}</p>
                <p className="text-gray-700"><span className="font-semibold">Items:</span> {order.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
