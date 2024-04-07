import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SubmitReview = () => {
  const [pastOrders] = useState([
    { id: 1, orderNumber: 'ORD123' },
    { id: 2, orderNumber: 'ORD456' },
    { id: 3, orderNumber: 'ORD789' },
    { id: 4, orderNumber: 'ORD234' },
    { id: 5, orderNumber: 'ORD567' },
  ]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmitReview = () => {
    if (!selectedOrder || !rating) {
      alert('Please select an order and provide a rating.');
      return;
    }

    console.log('Submitting review:', { orderId: selectedOrder, rating, feedback });

    // Reset form after submission
    setSelectedOrder('');
    setRating(0);
    setFeedback('');

    // Show feedback submission message
    alert('Your feedback was submitted. Thank you!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ maxWidth: '600px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <Link to="/" style={{ position: 'absolute', top: '20px', left: '20px', padding: '8px 12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Home</Link>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333', fontWeight: 'bold' }}>Submit Your Review</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginRight: '10px', color: '#333', fontWeight: 'bold' }}>Select Order:</label>
          <select value={selectedOrder} onChange={(e) => setSelectedOrder(e.target.value)} style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}>
            <option value="">Select an order</option>
            {pastOrders.map((order) => (
              <option key={order.id} value={order.id}>{order.orderNumber}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', color: '#333', fontWeight: 'bold' }}>
          <label style={{ marginRight: '10px' }}>Rating:</label>
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              style={{ cursor: 'pointer', color: rating >= index + 1 ? '#ffc107' : '#e4e5e9' }}
              onClick={() => setRating(index + 1)}
            />
          ))}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginRight: '10px', color: '#333', fontWeight: 'bold' }}>Your Feedback:</label>
          <textarea
            style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '100px' }}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us about your experience..."
          />
        </div>
        <button
          style={{
            padding: '12px 24px',
            backgroundColor: '#28a745', // Green color
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold',
          }}
          onClick={handleSubmitReview}
        >
          Submit Review
        </button>
        <p style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px', color: '#666' }}>Your feedback helps us improve our service. Thank you for taking the time!</p>
      </div>
    </div>
  );
};

export default SubmitReview;
