import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LoginNavBar from '../components/LoginNavBar';

const mapStyles = {
  container: "h-80 w-full",
  map: "h-full w-full",
};

const orderLocation = { lat: 40.7128, lng: -74.0060 }; 

const TrackOrder = () => {
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
    <div>
      <LoginNavBar />
      <div className="mt-24">
        <div className="container mx-auto p-4">
          <div className="max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-4 text-[#00df9a] bg-black p-2 rounded-lg">Track Order</h2>
            </div>
            <div className="p-8 text-black">
              <p className="font-semibold">Order ID: <span className="font-normal">{order.orderId}</span></p>
              <p className="font-semibold">Status: <span className="font-normal">{order.status}</span></p>
              <p className="font-semibold">Estimated Delivery: <span className="font-normal">{order.estimatedDelivery}</span></p>
              <p className="font-semibold">Shipping Address: <span className="font-normal">{order.shippingAddress}</span></p>

              <div className="my-4">
                <h3 className="text-lg font-semibold mb-2">Items</h3>
                {order.items.map((item, index) => (
                  <div key={index} className="border-b border-gray-300 pb-2 mb-2">
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={mapStyles.container}>
              <MapContainer center={orderLocation} zoom={13} scrollWheelZoom={false} className={mapStyles.map}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={orderLocation}>
                  <Popup>
                    Order is here.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
