import React from 'react';
import { Link } from 'react-router-dom';
import LoginNavBar from '../components/LoginNavBar';

const PastOrders = () => {
  const pastOrders = [
    {
      orderId: "1",
      status: "Delivered",
      deliveryService: "FedEx",
      deliveryDate: "March 15, 2024",
      items: [
        { name: "Product 1", quantity: 2 },
        { name: "Product 2", quantity: 1 }
      ],
      price: 100
    },
    {
      orderId: "2",
      status: "Delivered",
      deliveryService: "UPS",
      deliveryDate: "March 10, 2024",
      items: [
        { name: "Product 3", quantity: 1 },
        { name: "Product 4", quantity: 3 }
      ],
      price: 120
    },
    {
      orderId: "3",
      status: "Delivered",
      deliveryService: "DHL",
      deliveryDate: "March 5, 2024",
      items: [
        { name: "Product 5", quantity: 2 },
        { name: "Product 6", quantity: 1 }
      ],
      price: 80
    },
    {
      orderId: "4",
      status: "Delivered",
      deliveryService: "USPS",
      deliveryDate: "March 2, 2024",
      items: [
        { name: "Product 7", quantity: 3 },
        { name: "Product 8", quantity: 2 }
      ],
      price: 60
    },
    {
      orderId: "5",
      status: "Delivered",
      deliveryService: "Amazon Prime",
      deliveryDate: "February 28, 2024",
      items: [
        { name: "Product 9", quantity: 1 },
        { name: "Product 10", quantity: 1 }
      ],
      price: 150
    }
  ];

  return (
    <div>
      <LoginNavBar />
      <div className="mt-24">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#00df9a] bg-black p-2 rounded-lg">Past Orders</h1>
          {pastOrders.map((order, index) => (
            <div key={index} className="w-full mx-auto mb-6 bg-gray-100 rounded-lg shadow-md p-8 text-black">
              <h2 className="text-2xl font-bold mb-4">Order {order.orderId}</h2>
              <div className="mb-4">
                <p className="font-semibold">Status: {order.status}</p>
                <p className="font-semibold">Delivery Service: {order.deliveryService}</p>
                <p className="font-semibold">Delivery Date: {order.deliveryDate}</p>
                <p className="font-semibold">Price: ${order.price}</p>
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
    </div>
  );
};

export default PastOrders;
