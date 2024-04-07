import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const orderLocation = { lat: 40.730610, lng: -73.935242 }; // Dummy location for the order

const TrackOrder = () => {
  // Dummy order data
  const order = {
    orderId: "123456",
    status: "In Transit",
    estimatedDelivery: "March 25, 2024",
    shippingAddress: "123 Main Street, Anytown, USA",
    items: [
      { name: "Product 1", quantity: 2 },
      { name: "Product 2", quantity: 1 }
    ]
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-500 p-4">
          <h2 className="text-2xl font-bold text-white mb-4">Track Order</h2>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <p className="text-lg text-green-600">Order ID: <span className="font-semibold text-black">{order.orderId}</span></p>
            <p className="text-lg text-green-600">Status: <span className="font-semibold text-black">{order.status}</span></p>
            <p className="text-lg text-green-600">Estimated Delivery: <span className="font-semibold text-black">{order.estimatedDelivery}</span></p>
            <p className="text-lg text-green-600">Shipping Address: <span className="font-semibold text-black">{order.shippingAddress}</span></p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-500 mb-2">Items</h3>
            {order.items.map((item, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg mb-3">
                <p className="text-md font-semibold">{item.name}</p>
                <p className="text-sm">Quantity: {item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Live Tracking Map */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-green-500 mb-4">Live Tracking</h3>
            <MapContainer center={orderLocation} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={orderLocation}>
                <Popup>
                  Order {order.orderId} is here.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
