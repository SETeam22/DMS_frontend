import React, { useState , useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginNavBar from '../components/LoginNavBar';
import { renderStars } from '../components/utils' // Assume you have a utility for rendering star ratings
import LocationPicker from '../components/map';
import LocationInput from '../components/LocationInput';

const OrderFormC = () => {
  const { state } = useLocation()
  const navigate = useNavigate(); // Initialize navigate here

  const handleLocationSelect = (type, lat, lng) => {
    // Here you would typically use a Geocoding API to convert lat, lng to an address
    // For simplicity, let's assume you store lat, lng directly
    handleAddressChange(type, { target: { name: 'geolocation', value: `${lat}, ${lng}` } });
  };
  const service = state?.service || {
    deliveryServiceTitle: 'Default Title',
    deliverServicePrice: 0,
    deliverServiceType: '',
    deliveryServiceDescription: '',
    deliverServiceCompany: '',
    deliverServiceWeightLimit: 0,
    deliveryServiceDimensions: { length: 0, width: 0, height: 0 },
    deliverServiceLocations: [],
    estimateddelivery: '',
    rating: 0,
    noppl: 0,
    returnpolicy: ''
  };

  const [order, setOrder] = useState({
    customerName: '',
    deliveryService: service.deliveryServiceTitle, // Using service ID for internal reference
    pickupAddress: {
    street: '',
    city: '',
    state: '',
    postalCode: ''
  },
  deliveryAddress: {
    street: '',
    city: '',
    state: '',
    postalCode: ''
  },
    orderItems: [{ itemName: '', quantity: '', price: '' }]
  });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/orders/getreview/${service.deliveryServiceTitle}`);
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          throw new Error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [service.deliveryServiceTitle]);

  // Handle input changes for order fields
  const handleInputChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  // Handle item changes dynamically based on item index
  const handleItemChange = (index, e) => {
    const newOrderItems = order.orderItems.map((item, i) => {
      if (index === i) {
        if (e.target.name === 'quantity') {
          // Ensure quantity is a number
          const quantity = parseFloat(e.target.value);
          const newPrice = quantity * parseFloat(service.deliverServicePrice);
          return { ...item, quantity, price: newPrice };
        } else if (e.target.name === 'price') {
          // Convert string input to float
          const price = parseFloat(e.target.value);
          return { ...item, price };
        } else {
          return { ...item, [e.target.name]: e.target.value };
        }
      }
      return item;
    });

    setOrder({ ...order, orderItems: newOrderItems });
};


  // Add new item to the order list
  const addItem = () => {
    setOrder({
      ...order,
      orderItems: [...order.orderItems, { itemName: '', quantity: '1', price: service.deliverServicePrice.toString() }]
    });
  };
  
  const handleAddressChange = (addressType, e) => {
    setOrder({
      ...order,
      [addressType]: {
        ...order[addressType],
        [e.target.name]: e.target.value
      }
    });
  };
  

  const removeItem = (index) => {
    const newOrderItems = order.orderItems.filter((_, i) => i !== index);
    setOrder({ ...order, orderItems: newOrderItems });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Checkout', { state: { order } }); // Use navigate to go to the checkout page
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <LoginNavBar />
      <div className="flex flex-wrap justify-center p-20">
        {/* Service Details Section */}
        <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
          <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-center text-[#00df9a] mb-6">{service.deliveryServiceTitle}</h2>
            <p>Type: {service.deliverServiceType}</p>
            <p>Description: {service.deliveryServiceDescription}</p>
            <p>Company: {service.deliverServiceCompany}</p>
            <p>Price: ${service.deliverServicePrice}</p>
            <p>Weight Limit: {service.deliverServiceWeightLimit} kg</p>
            <div>
              Dimensions: {service.deliveryServiceDimensions.length} x {service.deliveryServiceDimensions.width} x {service.deliveryServiceDimensions.height} cm
            </div>
            <p>Locations: {service.deliverServiceLocations.join(", ")}</p>
            <p>Estimated Delivery: {service.estimateddelivery} days</p>
            <div className="flex items-center">
              {renderStars(service.rating)} <span>({service.noppl} reviews)</span>
            </div>
            <p>Return Policy: {service.returnpolicy}</p>
          </div>
          <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
         

            {/* Display Reviews */}
            {reviews.length > 0 ? (
              <div>
                <h3 className="text-xl font-bold mb-4">Reviews:</h3>
                {reviews.map((review, index) => (
                  <div key={index} className="bg-gray-200 p-4 rounded mb-2">
                    <p><strong>Rating:</strong> {renderStars(review.rating)}</p>
                    <p><strong>Comment:</strong> {review.comments}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          
        </div>
        </div>

        {/* Order Form Section */}
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
              value={service.deliveryServiceTitle}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </label>
          <div className="space-y-2">
  <h3 className="text-xl font-bold">Pickup Address:</h3>
  {Object.entries(order.pickupAddress).map(([key, value]) => (
    <div key={key} className="flex items-center space-x-2">
      <label className="flex-1 block">
        <span className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
        <input
          type="text"
          name={key}
          placeholder={`Enter ${key}`}
          value={value}
          onChange={(e) => handleAddressChange('pickupAddress', e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </label>
      {key === 'street' 
      //&&  <LocationInput setAddress={(address) => handleAddressChange('pickupAddress', { target: { name: 'street', value: address } })} />
      }
    </div>
  ))}
</div>
<div className="space-y-2">
  <h3 className="text-xl font-bold">Delivery Address:</h3>
  {Object.entries(order.deliveryAddress).map(([key, value]) => (
    <div key={key} className="flex items-center space-x-2">
      <label className="flex-1 block">
        <span className="text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
        <input
          type="text"
          name={key}
          placeholder={`Enter ${key}`}
          value={value}
          onChange={(e) => handleAddressChange('deliveryAddress', e)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </label>
      {key === 'street' 
      // && <LocationInput setAddress={(address) => handleAddressChange('pickupAddress', { target: { name: 'street', value: address } })} />
      }
    </div>
  ))}
</div>
          {/* <label className="block">
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
          </label> */}
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
            // OnClick={payment}
            className="bg-[#00df9a] hover:bg-[#00b882] text-white font-medium py-2 px-4 rounded"
          >
            Checkout
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default OrderFormC;
