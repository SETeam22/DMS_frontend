// src/components/ServiceMap.jsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Correct the marker icons path
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ServiceMap = ({ services }) => {
  // Determine the map center. This should be calculated based on your services' locations.
  const mapCenter = [40.7128, -74.0060];

  return (
    <MapContainer center={mapCenter} zoom={13} style={{ height: '600px', width: 'full' }} className="w-full h-96 rounded-xl shadow-lg">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {services.map((service, index) => (
        <Marker key={index} position={[service.latitude, service.longitude]}>
          <Popup>
            {service.title} - {service.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ServiceMap;
