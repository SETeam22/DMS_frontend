import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginNavBar from '../components/LoginNavBar';

const HelpButton = () => {
  return (
    <Link
      to="/faq"
      className="bg-black hover:bg-gray-400 text-[#00df9a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
    
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
          {/* User Profile */}
          <div className="bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#00df9a] bg-black p-2 rounded-lg">User Profile</h2> 
            {/* Editing Controls */}
            <div className="mb-4">
              <HelpButton />
            </div>
            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* First Name */}
              <div>
                <p className="text-black"><span className="font-bold">First Name:</span> {editing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={editedUser.firstName}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <span>{editedUser.firstName}</span>
                )}</p>
              </div>
              {/* Last Name */}
              <div>
                <p className="text-black"><span className="font-bold">Last Name:</span> {editing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={editedUser.lastName}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <span>{editedUser.lastName}</span>
                )}</p>
              </div>
              {/* Street */}
              <div>
                <p className="text-black"><span className="font-bold">Street:</span> {editing ? (
                  <input
                    type="text"
                    name="street"
                    value={editedUser.street}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <span>{editedUser.street}</span>
                )}</p>
              </div>
              {/* Apt */}
              <div>
                <p className="text-black"><span className="font-bold">Apt:</span> {editing ? (
                  <input
                    type="text"
                    name="apt"
                    value={editedUser.apt}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <span>{editedUser.apt}</span>
                )}</p>
              </div>
              {/* Zipcode */}
              <div>
                <p className="text-black"><span className="font-bold">Zipcode:</span> {editing ? (
                  <input
                    type="text"
                    name="zipcode"
                    value={editedUser.zipcode}
                    onChange={handleInputChange}
                    className="form-input mt-1 w-full"
                  />
                ) : (
                  <span>{editedUser.zipcode}</span>
                )}</p>
              </div>
              {/* Email */}
              <div>
                <p className="text-black"><span className="font-bold">Email:</span> {editedUser.email}</p>
              </div>
              {/* Mobile Number */}
              <div>
                <p className="text-black"><span className="font-bold">Mobile Number:</span> {editedUser.mobile}</p>
                {/* Edit Button */}
                <button onClick={toggleEditing} className="bg-black hover:bg-gray-400 text-[#00df9a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                  {editing ? 'Cancel' : 'Edit'}
                </button>
                {editing && (
                  <button onClick={saveChanges} className="bg-black hover:bg-gray-400 text-[#00df9a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Spending Statistics */}
          <div className="mt-8 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#00df9a] bg-black p-2 rounded-lg">Spending Statistics</h2>
            <div className="p-2">
              <p className="text-black"><span className="font-semibold">Total Spent:</span> ${totalSpent.toFixed(2)}</p>
              <p className="text-black"><span className="font-semibold">Average Order Value:</span> ${averageSpent.toFixed(2)}</p>
            </div>
          </div>
            
          {/* Recent Orders */}
          <div className="mt-8 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#00df9a] bg-black p-2 rounded-lg">Recent Orders</h2>
            {recentOrders.map(order => (
              <div key={order.id} className="mb-4 border-b">
                <p className="text-black"><span className="font-semibold">Order ID:</span> {order.id}</p>
                <p className="text-black"><span className="font-semibold">Date:</span> {order.date}</p>
                <p className="text-black"><span className="font-semibold">Status:</span> {order.status}</p>
                <p className="text-black"><span className="font-semibold">Items:</span> {order.items.join(", ")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
