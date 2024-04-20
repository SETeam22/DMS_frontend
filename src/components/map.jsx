import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function LocationPicker({ onLocationSelect }) {
  const [marker, setMarker] = useState(null);

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
    onLocationSelect(lat, lng);
  }, [onLocationSelect]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAFan3MhzVuK8fnXJKO4yBkLnPEuMmcqnE">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onClick={onMapClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default LocationPicker;
