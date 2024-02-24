import React, { useState } from 'react';

const OrderForm = () => {
  const [order, setOrder] = useState({
    customerName: '',
    deliveryService: '',
    deliveryAddress: '',
    orderItems: [{ itemName: '', quantity: 0, price: 0 }]
  });
  const [orderConfirmation, setOrderConfirmation] = useState(null);

  const handleInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newOrderItems = order.orderItems.map((item, i) => {
      if (index === i) {
        return { ...item, [e.target.name]: e.target.value };
      }
      return item;
    });
    setOrder({ ...order, orderItems: newOrderItems });
  };

  const addItem = () => {
    setOrder({
      ...order,
      orderItems: [...order.orderItems, { itemName: '', quantity: 0, price: 0 }]
    });
  };

  const removeItem = (index) => {
    setOrder({
      ...order,
      orderItems: order.orderItems.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      const data = await response.json();
      setOrderConfirmation(data);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-8">Place Order</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="customerName" className="block text-gray-700 text-sm font-bold mb-2">
            Customer Name:
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            placeholder="Enter your name"
            value={order.customerName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="deliveryService" className="block text-gray-700 text-sm font-bold mb-2">
            Delivery Service ID:
          </label>
          <input
            id="deliveryService"
            name="deliveryService"
            type="text"
            placeholder="Enter delivery service ID"
            value={order.deliveryService}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="deliveryAddress" className="block text-gray-700 text-sm font-bold mb-2">
            Delivery Address:
          </label>
          <input
            id="deliveryAddress"
            name="deliveryAddress"
            type="text"
            placeholder="Enter delivery address"
            value={order.deliveryAddress}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        {order.orderItems.map((item, index) => (
          <div key={index} className="mb-4">
            <label htmlFor={`itemName-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Item Name:
            </label>
            <input
              id={`itemName-${index}`}
              name="itemName"
              type="text"
              placeholder="Enter item name"
              value={item.itemName}
              onChange={(e) => handleItemChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor={`quantity-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Quantity:
            </label>
            <input
              id={`quantity-${index}`}
              name="quantity"
              type="number"
              placeholder="Enter quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <label htmlFor={`price-${index}`} className="block text-gray-700 text-sm font-bold mb-2">
              Price:
            </label>
            <input
              id={`price-${index}`}
              name="price"
              type="number"
              placeholder="Enter price"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button type="button" onClick={() => removeItem(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2">
              Remove Item
            </button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
          Add Item
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit Order
        </button>
      </form>
      {orderConfirmation && (
        <div>
          <h2>Order Confirmation</h2>
          <p>Order ID: {orderConfirmation._id}</p>
          <p>Customer Name: {orderConfirmation.customerName}</p>
          {/* Render other order details */}
        </div>
      )}
    </div>
  );
};

export default OrderForm;
