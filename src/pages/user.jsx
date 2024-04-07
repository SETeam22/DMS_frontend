import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackPackagePage = () => {
  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  const handleTracking = () => {
    // Logic to handle tracking
    console.log('Tracking package with ID:', trackingId);
    // navigate('/tracking-results'); // Navigate to the tracking results page
  };

  return (
    <div className="track-package-page">
      <header className="header">
        <h1>Helping you get back to business</h1>
      </header>
      <div className="navigation-options">
        {/* Icons and buttons for different functionalities */}
        {/* You can use icons from 'react-icons' or any other library */}
      </div>
      <div className="tracking-section">
        <input
          type="text"
          placeholder="TRACKING ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="tracking-input"
        />
        <button onClick={handleTracking} className="track-button">TRACK</button>
      </div>
      <div className="status-display">
        {/* Visual tracking status will go here */}
        <p>Delivered Thursday 12/05/2019 at 1:06 pm</p>
        {/* Implement a timeline or progress bar */}
      </div>
    </div>
  );
};

export default TrackPackagePage;
