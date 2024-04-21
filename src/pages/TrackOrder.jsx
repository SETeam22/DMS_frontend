import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LoginNavBar from '../components/LoginNavBar';

const mapStyles = {
  container: "h-80 w-full",
  map: "h-full w-full"
};
const bloomingtonLocation = { lat: 39.1653, lng: -86.5264 }; // Coordinates for Bloomington
const newYorkLocation = { lat: 40.7128, lng: -74.0060 }; // Coordinates for New York
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
};
 // Default location, update accordingly

const TrackOrder = () => {
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState("");
  
  const handleSearch = async () => {
    // Example fetch call, replace with your actual API endpoint
    const response = await fetch(`http://localhost:3000/api/orders/${orderId}`);
    const data = await response.json();
    setOrder(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginNavBar />
      <div className="flex flex-col items-center justify-center  pt-20"></div>
      <div className="flex flex-col items-center justify-center  pt-20">
      <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center pt-20">
  <input
    type="text"
    placeholder="Enter Order ID..."
    className="input input-bordered w-full border border-gray-300 rounded p-2 mb-4"
    value={orderId}
    onChange={(e) => setOrderId(e.target.value)}
  />
  <button
    className="bg-white hover:bg-gray-400 text-[#00df9a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    onClick={handleSearch}
  >
    Track Order
  </button>
</div>



        {order && (
          <div className="bg-white p-6 rounded-lg shadow-lg mt-6 w-full max-w-2xl">
            
            <h2 className="text-2xl font-bold mb-4 text-center">Order Details</h2>
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Delivery Service: </strong>{order.deliveryService}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Estimated Delivery:</strong> {order.estimatedDelivery}</p>
            <p><strong>Pickup Address:</strong> {`${order.pickupAddress.street}, ${order.pickupAddress.city}, ${order.pickupAddress.state} ${order.pickupAddress.postalCode}`}</p>
            <p><strong>Delivery Address:</strong> {`${order.deliveryAddress.street}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.postalCode}`}</p>

            <MapContainer center={newYorkLocation} zoom={5} style={{ height: 400, width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={bloomingtonLocation}>
            <Popup>Bloomington Location</Popup>
          </Marker>
          <Marker position={newYorkLocation}>
            <Popup>New York Location</Popup>
          </Marker>
        </MapContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
