import React, { useState } from 'react';

const UserProfile = () => {
  // Dummy user data
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

  // Dummy recent orders data
  const recentOrders = [
    {
      id: 1,
      date: "2024-03-15",
      status: "Delivered",
      items: ["Item 1", "Item 2"]
    },
    {
      id: 2,
      date: "2024-03-10",
      status: "Pending",
      items: ["Item 3", "Item 4"]
    }
  ];

  return (
    <div className="bg-lightgreen">
      <div className="container mx-auto p-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 text-black">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-700">First Name:</p>
              {editing ? (
                <input
                  type="text"
                  name="firstName"
                  value={editedUser.firstName}
                  onChange={handleInputChange}
                  className="form-input"
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
                  className="form-input"
                />
              ) : (
                <p className="font-semibold">{editedUser.lastName}</p>
              )}
            </div>
            <div>
              <p className="text-gray-700">Street:</p>
              {editing ? (
                <input
                  type="text"
                  name="street"
                  value={editedUser.street}
                  onChange={handleInputChange}
                  className="form-input"
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
                  className="form-input"
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
                  className="form-input"
                />
              ) : (
                <p className="font-semibold">{editedUser.zipcode}</p>
              )}
            </div>
            <div>
              <p className="text-gray-700">Email:</p>
              <p className="font-semibold">{editedUser.email}</p>
            </div>
            <div>
              <p className="text-gray-700">Mobile Number:</p>
              <p className="font-semibold">{editedUser.mobile}</p>
            </div>
          </div>
          <div className="mt-4">
            {editing ? (
              <button onClick={saveChanges} className="bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-4 mr-2">
                Save
              </button>
            ) : (
              <button onClick={toggleEditing} className="bg-green-500 hover:bg-green-600 text-white rounded-md py-2 px-4 mr-2">
                Edit
              </button>
            )}
            <p className="text-gray-500 text-sm mt-2">
              Contact <a href="mailto:deliverease_admin@gmail.com" className="underline">deliverease_admin@gmail.com</a> to edit Mobile Number or Email ID
            </p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="max-w-lg mx-auto mt-8"> {/* Centering container */}
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          {recentOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <p className="text-gray-700"><span className="font-semibold">Order ID:</span> {order.id}</p>
              <p className="text-gray-700"><span className="font-semibold">Date:</span> {order.date}</p>
              <p className="text-gray-700"><span className="font-semibold">Status:</span> {order.status}</p>
              <p className="text-gray-700"><span className="font-semibold">Items:</span> {order.items.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
