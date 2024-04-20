import React, { useState, useEffect } from 'react';
import LoginNavBar from '../components/LoginNavBar';
import { secureFetch } from '../helper/SecureFetch.jsx'; // Ensure this is the correct import for your secureFetch utility
import RatingComponent from '../components/RatingComponent.jsx'; // Ensure this component is correctly imported

const PastOrders = () => {
  const [pastOrders, setPastOrders] = useState([]);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('');
  // Define the options for the dropdown
  const statusOptions = ['', "Delivered", "Pending", "InTransit"];
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await secureFetch('http://localhost:3000/api/orders/email');
        if (response.response.ok) {
          // const data = await response.json();
          setPastOrders(response.data); // Assuming that `data` contains the array of orders
        } else {
          const errorData = await response.text(); // Get the text if JSON parsing fails
          throw new Error(errorData || 'Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching past orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    fetchOrders();
  }, []);

  

  const handleFilterChange = (event) => {
    const filteredOrders = filterStatus === "All"
    ? pastOrders
    : pastOrders.filter(order => order.status === filterStatus);
    setFilterStatus(event.target.value);
  };

  

  const submitReview = async (order) => {
    // Assuming `rating` and `comments` are state variables holding current user input.
    const payload = {
      delivery: order.deliveryService,
      customer: order.customerName,
      rating: rating.stars, // Ensure 'rating' is a state like `const [rating, setRating] = useState({stars: 0});`
      comments: comments // Assuming `comments` is a simple string state.
    };

    console.log(payload); // Check what's being sent

    try {
      const response = await secureFetch('http://localhost:3000/api/orders/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
     
      if (response.ok) {
        alert('Review submitted successfully');
        // Optionally reset form or update UI state here
      } else {
        const errorData = await response.json(); // Get more detailed error info if possible
        throw new Error(errorData.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      // Optionally update UI to show error message
    }
};



  // Get current orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = pastOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div>
      <LoginNavBar />
      <div className="mt-24">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8 text-left text-[#00df9a]  rounded-lg">Past Orders</h1>
          <select onChange={handleFilterChange} value={filterStatus} className="mb-4 form-select">
          <option value="" disabled>Filter by Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

          {error && <p className="text-red-500 text-center">{error}</p>}
          {!error && currentOrders.filter(order => order.status.includes(filterStatus)).map((order, index) => (
            <div key={index} className="w-full mx-auto mb-6 bg-gray-100 rounded-lg shadow-md p-8 text-black">
              <h2 className="text-2xl font-bold mb-4">Order {order._id}</h2>
              <div className="mb-4">
                <p className="font-semibold">Status: {order.status}</p>
                <p className="font-semibold">Delivery Service: {order.deliveryService}</p>
                <p className="font-semibold">Delivery Date: {order.deliveryDate}</p>
                <p className="font-semibold">Price: ${order.total}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Items</h3>
                {order.orderItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-b border-gray-300 pb-2 mb-2">
                    <p>{item.itemName}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                ))}
                {order.status === 'Delivered' && (
                  <form onSubmit={() => submitReview(order)} className="mt-4">
                    <h4 className="font-bold">Leave a Review</h4>
                    <RatingComponent initialRating={rating} onRatingChange={setRating} />
                    <textarea placeholder="Comments" value={comments} onChange={(e) => setComments(e.target.value)} className="textarea textarea-bordered w-full"></textarea>
                    <button type="submit" className="btn btn-primary mt-2 border border-gray-300 rounded p-2 mr-2 flex-grow">Submit Review</button>
                  </form>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="btn">
              Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage * ordersPerPage >= pastOrders.length} className="btn">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastOrders;
