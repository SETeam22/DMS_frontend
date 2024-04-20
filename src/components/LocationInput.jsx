import React from 'react';

// Assuming you have a function that can geocode coordinates to an address
// This should be handled in your backend or via a secured method to protect your API keys
const geocodeLocation = async (lat, lng, setAddress) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAFan3MhzVuK8fnXJKO4yBkLnPEuMmcqnE`);
  const data = await response.json();
  if (data.results.length > 0) {
    const address = data.results[0].formatted_address;
    setAddress(address); // This should update your state with the new address
  }
};

const useCurrentLocation = () => {
  const [location, setLocation] = React.useState(null);

  const handleFetchLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      // Optionally call geocodeLocation here if you want to auto-fill the address
      geocodeLocation(latitude, longitude, (address) => {
        console.log(address); // You can split this address into street, city, etc., depending on your needs
      });
    });
  };

  return { location, fetchLocation: handleFetchLocation };
};

// LocationInput component now also takes a prop for handling the fetched address
const LocationInput = ({ onLocationSelect, setAddress }) => {
  const { fetchLocation } = useCurrentLocation();

  return (
    <button onClick={fetchLocation} title="Use current location">
      📍
    </button>
  );
};

export default LocationInput;
