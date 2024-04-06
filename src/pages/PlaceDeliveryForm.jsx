{/*import React, { useState } from 'react';

const PlaceDeliveryForm = () => {
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    pickUpAddress: '',
    dropOffAddress: '',
    services: [{ serviceType: '' }],
  });

  // Handles changes to the service dropdowns
  const handleServiceChange = (value, index) => {
    const updatedServices = deliveryDetails.services.map((service, i) =>
      index === i ? { ...service, serviceType: value } : service
    );
    setDeliveryDetails({ ...deliveryDetails, services: updatedServices });
  };

  // Adds a new service selection dropdown
  const addService = () => {
    setDeliveryDetails({
      ...deliveryDetails,
      services: [...deliveryDetails.services, { serviceType: '' }]
    });
  };

  // Removes a service selection dropdown
  const removeService = (index) => {
    const filteredServices = deliveryDetails.services.filter((_, i) => i !== index);
    setDeliveryDetails({ ...deliveryDetails, services: filteredServices });
  };

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send deliveryDetails to the server
    console.log(deliveryDetails);
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl p-5">
        <h2 className="text-2xl text-center text-[#00df9a] font-bold mb-6">Place Delivery</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-semibold">Name:</label>
          <input className="p-2 rounded-xl border" type="text" placeholder="Enter your name" value={deliveryDetails.name} onChange={(e) => setDeliveryDetails({ ...deliveryDetails, name: e.target.value })} />
          
          <label className="text-sm font-semibold">Pick Up Address:</label>
          <input className="p-2 rounded-xl border" type="text" placeholder="Enter pick up address" value={deliveryDetails.pickUpAddress} onChange={(e) => setDeliveryDetails({ ...deliveryDetails, pickUpAddress: e.target.value })} />
          
          <label className="text-sm font-semibold">Drop Off Address:</label>
          <input className="p-2 rounded-xl border" type="text" placeholder="Enter drop off address" value={deliveryDetails.dropOffAddress} onChange={(e) => setDeliveryDetails({ ...deliveryDetails, dropOffAddress: e.target.value })} />
          
          {deliveryDetails.services.map((service, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm font-semibold">Service Type:</label>
              <select className="p-2 rounded-xl border" value={service.serviceType} onChange={(e) => handleServiceChange(e.target.value, index)}>
                <option value="">Select Service Type</option>
              
              </select>
              {index > 0 && (
                <button type="button" onClick={() => removeService(index)} className="mt-2 bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600">Remove Service</button>
              )}
            </div>
          ))}
          
          <button type="button" onClick={addService} className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600">Add Another Service</button>
          <button type="submit" className="mt-4 bg-[#00df9a] text-white py-2 px-4 rounded-xl hover:bg-[#00b882]">Place Delivery</button>
        </form>
      </div>
    </section>
  );
};

export default PlaceDeliveryForm; */}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const [order, setOrder] = useState({
    customerName: '',
    deliveryService: '',
    pickupAddress: '',
    deliveryAddress: '',
    orderItems: [{ itemName: '', quantity: '', price: '' }]
  });
  const [orderConfirmation, setOrderConfirmation] = useState(null);
  const navigate = useNavigate();
  // Handle input changes for customer details
  const handleInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  // Handle input changes for order items
  const handleItemChange = (index, e) => {
    const newOrderItems = order.orderItems.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setOrder({ ...order, orderItems: newOrderItems });
  };

  // Add a new item to the order
  const addItem = () => {
    setOrder({
      ...order,
      orderItems: [...order.orderItems, { itemName: '', quantity: '', price: '' }]
    });
  };

  // Remove an item from the order
  const removeItem = (index) => {
    const newOrderItems = order.orderItems.filter((_, i) => i !== index);
    setOrder({ ...order, orderItems: newOrderItems });
  };

  // Submit the order form
  // 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      //setOrderConfirmation(data);
      navigate('/payment', { state: { order: data } });
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-10">
      <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
        <h2 className="text-3xl font-bold text-center text-[#00df9a] mb-6">Place Order</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <label className="block">
            <span className="text-gray-700">Customer Name:</span>
            <input
              type="text"
              name="customerName"
              placeholder="Enter your name"
              value={order.customerName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Delivery Service ID:</span>
            <input
              type="text"
              name="deliveryService"
              placeholder="Enter delivery service ID"
              value={order.deliveryService}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Delivery Address:</span>
            <input
              type="text"
              name="deliveryAddress"
              placeholder="Enter pickup address"
              value={order.pickupAddress}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Delivery Address:</span>
            <input
              type="text"
              name="deliveryAddress"
              placeholder="Enter delivery address"
              value={order.deliveryAddress}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
          {order.orderItems.map((item, index) => (
            <div key={index} className="space-y-2">
              <label className="block">
                <span className="text-gray-700">Item Name:</span>
                <input
                  type="text"
                  name="itemName"
                  placeholder="Enter item name"
                  value={item.itemName}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Quantity:</span>
                <input
                  type="number"
                  name="quantity"
                  placeholder="0"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Price:</span>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  value={item.price}
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </label>
              {order.orderItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-medium py-2 px-4 rounded"
                >
                  Remove Item
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addItem}
            className="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white font-medium py-2 px-4 rounded"
          >
            Add Item
          </button>
          <button
            type="submit"
            className="bg-[#00df9a] hover:bg-[#00b882] text-white font-medium py-2 px-4 rounded"
          >
            Submit Order
          </button>
        </form>
        {orderConfirmation && (
          <div className="mt-4 p-5 bg-green-100 border border-green-400 text-green-700">
            <h3 className="font-semibold">Order Confirmation</h3>
            <p>Your order has been placed successfully!</p>
            <p>Order ID: {orderConfirmation._id}</p>
            <p>Customer Name: {orderConfirmation.customerName}</p>
            {/* Here you'd render more of the order confirmation details */}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;

             

