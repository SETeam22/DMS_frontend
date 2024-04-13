import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LoginNavBar from '../components/LoginNavBar';

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
    <div>
      <LoginNavBar />
      <div className="mt-24">
        <div className="flex justify-center items-center h-screen">
          <div className="max-w-lg p-8 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-[#00df9a] bg-black p-2 rounded-lg text-center">Submit Your Review</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Select Order:</label>
              <select
                value={selectedOrder}
                onChange={(e) => setSelectedOrder(e.target.value)}
                className="form-select w-full p-2 rounded border border-gray-300"
              >
                <option value="">Select an order</option>
                {pastOrders.map((order) => (
                  <option key={order.id} value={order.id}>{order.orderNumber}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex items-center">
              <label className="text-gray-700 font-bold mr-2">Rating:</label>
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  style={{ cursor: 'pointer', color: rating >= index + 1 ? '#ffc107' : '#e4e5e9' }}
                  onClick={() => setRating(index + 1)}
                />
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">Your Feedback:</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="form-textarea w-full p-2 rounded border border-gray-300"
                rows="4"
                placeholder="Tell us about your experience..."
              />
            </div>
            <button
              className="bg-black hover:bg-gray-400 text-[#00df9a] font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={handleSubmitReview}
            >
              Submit Review
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">Your feedback helps us improve our service. Thank you for taking the time!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitReview;
