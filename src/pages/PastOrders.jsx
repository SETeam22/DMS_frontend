// PastOrders.jsx

import React from 'react';

const PastOrders = () => {
  // Dummy past orders data
  const pastOrders = [
    {
      orderId: "1",
      status: "Delivered",
      deliveryDate: "March 15, 2024",
      items: [
        { name: "Product 1", quantity: 2 },
        { name: "Product 2", quantity: 1 }
      ]
    },
    {
      orderId: "2",
      status: "Delivered",
      deliveryDate: "March 10, 2024",
      items: [
        { name: "Product 3", quantity: 1 },
        { name: "Product 4", quantity: 3 }
      ]
    },
   
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-lg mx-auto bg-green-400 rounded-lg shadow-md p-8 text-black">
        <h2 className="text-2xl font-bold mb-4">Past Orders</h2>
        {pastOrders.slice(0, 5).map((order, index) => (
          <div key={index} className="mb-6">
            <div className="mb-4">
              <p className="font-semibold">Order ID: {order.orderId}</p>
              <p className="font-semibold">Status: {order.status}</p>
              <p className="font-semibold">Delivery Date: {order.deliveryDate}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Items</h3>
              {order.items.map((item, itemIndex) => (
                <div key={itemIndex} className="border-b border-gray-300 pb-2 mb-2">
                  <p>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastOrders;
