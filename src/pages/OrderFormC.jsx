

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const OrderFormC = () => {
//   const [order, setOrder] = useState({
//     customerName: '',
//     deliveryService: '',
//     pickupAddress: '',
//     deliveryAddress: '',
//     orderItems: [{ itemName: '', quantity: '', price: '' }]
//   });
//   const [orderConfirmation, setOrderConfirmation] = useState(null);
//   const navigate = useNavigate();
//   // Handle input changes for customer details
//   const handleInputChange = (e) => {
//     setOrder({ ...order, [e.target.name]: e.target.value });
//   };

//   // Handle input changes for order items
//   const handleItemChange = (index, e) => {
//     const newOrderItems = order.orderItems.map((item, i) => {
//       if (index === i) {
//         return { ...item, [e.target.name]: e.target.value };
//       }
//       return item;
//     });
//     setOrder({ ...order, orderItems: newOrderItems });
//   };

//   // Add a new item to the order
//   const addItem = () => {
//     setOrder({
//       ...order,
//       orderItems: [...order.orderItems, { itemName: '', quantity: '', price: '' }]
//     });
//   };

//   // Remove an item from the order
//   const removeItem = (index) => {
//     const newOrderItems = order.orderItems.filter((_, i) => i !== index);
//     setOrder({ ...order, orderItems: newOrderItems });
//   };

//   // Submit the order form
//   // 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3000/api/orders', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(order)
//       });
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       //setOrderConfirmation(data);
//       navigate('/payment', { state: { order: data } });
//     } catch (error) {
//       console.error('Error placing order:', error);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex items-center justify-center p-10">
//       <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
//         <h2 className="text-3xl font-bold text-center text-[#00df9a] mb-6">Place Order</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
//           <label className="block">
//             <span className="text-gray-700">Customer Name:</span>
//             <input
//               type="text"
//               name="customerName"
//               placeholder="Enter your name"
//               value={order.customerName}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               required
//             />
//           </label>
//           <label className="block">
//             <span className="text-gray-700">Delivery Service ID:</span>
//             <input
//               type="text"
//               name="deliveryService"
//               placeholder="Enter delivery service ID"
//               value={order.deliveryService}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               required
//             />
//           </label>
//           <label className="block">
//             <span className="text-gray-700">Pickup Address:</span>
//             <input
//               type="text"
//               name="pickupAddress"
//               placeholder="Enter pickup address"
//               value={order.pickupAddress}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               required
//             />
//           </label>
//           <label className="block">
//             <span className="text-gray-700">Delivery Address:</span>
//             <input
//               type="text"
//               name="deliveryAddress"
//               placeholder="Enter delivery address"
//               value={order.deliveryAddress}
//               onChange={handleInputChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               required
//             />
//           </label>
//           {order.orderItems.map((item, index) => (
//             <div key={index} className="space-y-2">
//               <label className="block">
//                 <span className="text-gray-700">Item Name:</span>
//                 <input
//                   type="text"
//                   name="itemName"
//                   placeholder="Enter item name"
//                   value={item.itemName}
//                   onChange={(e) => handleItemChange(index, e)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                   required
//                 />
//               </label>
//               <label className="block">
//                 <span className="text-gray-700">Quantity:</span>
//                 <input
//                   type="number"
//                   name="quantity"
//                   placeholder="0"
//                   value={item.quantity}
//                   onChange={(e) => handleItemChange(index, e)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                   required
//                 />
//               </label>
//               <label className="block">
//                 <span className="text-gray-700">Price:</span>
//                 <input
//                   type="number"
//                   name="price"
//                   placeholder="0.00"
//                   value={item.price}
//                   onChange={(e) => handleItemChange(index, e)}
//                   className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                   required
//                 />
//               </label>
//               {order.orderItems.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeItem(index)}
//                   className="text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-medium py-2 px-4 rounded"
//                 >
//                   Remove Item
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addItem}
//             className="text-green-500 border border-green-500 hover:bg-green-500 hover:text-white font-medium py-2 px-4 rounded"
//           >
//             Add Item
//           </button>
//           <button
//             type="submit"
//             className="bg-[#00df9a] hover:bg-[#00b882] text-white font-medium py-2 px-4 rounded"
//           >
//             Checkout
//           </button>
//         </form>
//         {orderConfirmation && (
//           <div className="mt-4 p-5 bg-green-100 border border-green-400 text-green-700">
//             <h3 className="font-semibold">Order Confirmation</h3>
//             <p>Your order has been placed successfully!</p>
//             <p>Order ID: {orderConfirmation._id}</p>
//             <p>Customer Name: {orderConfirmation.customerName}</p>
//             {/* Here you'd render more of the order confirmation details */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderFormC;

             

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderFormC = () => {
  const [order, setOrder] = useState({
    customerName: '',
    deliveryService: '',
    pickupAddress: '',
    deliveryAddress: '',
    orderItems: [{ itemName: '', quantity: '', price: '' }]
  });
  const navigate = useNavigate();

  // Handle changes in customer details inputs
  const handleInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  // Handle changes in order items
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

  // Submit the form and navigate to the checkout page
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/checkout', { state: { order } });
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
            <span className="text-gray-700">Pickup Address:</span>
            <input
              type="text"
              name="pickupAddress"
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
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderFormC;
