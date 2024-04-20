import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginNavBar from '../components/LoginNavBar';
import DirectChatPage from '../components/DirectChatPage';

const Faq = () => {
  const [showMessagePrompt, setShowMessagePrompt] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const faqs = [
    {
      question: "How do I choose a delivery service on your platform?",
      answer: (
        <>
          After entering your destination address and the type of delivery, our system will provide you with a variety of delivery services to choose from and suggest the best possible quote based on your specific needs.
          {' '}
          <Link to="/Service" className="text-green-500 underline">Explore our services</Link>
        </>
      )
    },
    {
      question: "Can delivery services register on your platform?",
      answer: (
        <>
          Yes, delivery services can register on our platform to offer their different types of services and respective quotes, allowing them to reach a broader customer base.
          {' '}
          <Link to="/Register" className="text-green-500 underline">Register here</Link>
        </>
      )
    },
    {
      question: "Is it possible to track my order?",
      answer: (
        <>
          Yes, customers can track their orders in real-time using a unique tracking ID provided at the time of order confirmation.
          {' '}
          <Link to="/track-orders" className="text-green-500 underline">Track your order here</Link>
        </>
      )
    },
    {
      question: "How can I review a delivery service?",
      answer: (
        <>
          After your order is completed, you'll have the option to submit a review of your delivery experience through our website.
          {' '}
          <Link to="/submit-reviews" className="text-green-500 underline">Submit Reviews here</Link>
        </>
      )
    },
    {
      question: "What types of users can use the system?",
      answer: "Our system is designed for three main types of users: customers, delivery service managers (admins), and delivery drivers, each with specific functionalities and access."
    },
    {
      question: "How do I reset my password?",
      answer: (
        <>
          If you've forgotten your password, you can reset it by answering security questions, receiving a one-time password (OTP) via email or text message, or using a third-party OTP provider like Duo.
          {' '}
          <Link to="/Forgotpass" className="text-green-500 underline">Forgot Password? Click Here</Link>
        </>
      )
    },
    {
      question: "Can I search for specific types of delivery services?",
      answer: (
        <>
          Yes, customers can search for delivery services based on various criteria, such as the nature of the item (small, medium, etc.), to find the most suitable service.
          {' '}
          <Link to="/Service" className="text-green-500 underline">Search here</Link>
        </>
      )
    },
    {
      question: "What is the Duo authentication?",
      answer: "Duo authentication is an additional security feature we offer, providing an extra layer of protection for your account through two-factor authentication."
    },
    {
      question: "How does the recommendation system work?",
      answer: "Our system recommends the best possible delivery deal based on the specifications of the item you wish to send, such as suggesting USPS for small orders and UPS for large orders."
    },
    {
      question: "Can I view my delivery on a map?",
      answer: (
        <>
          Yes, customers can view their in-progress deliveries on a map, and delivery managers can also see the locations of their delivery drivers.
          {' '}
          <Link to="/track-orders" className="text-green-500 underline">Track your order here</Link>
        </>
      )
    },
    {
      question: "How do I make a payment for my order?",
      answer: "Customers can make payments through our payment portal, available after placing an order and choosing a delivery service."
    },
    {
      question: "Can delivery drivers update their location?",
      answer: "Yes, delivery drivers can update their locations on the map, providing real-time tracking for managers and customers."
    },
    {
      question: "How are delivery drivers notified of their deliveries?",
      answer: "Delivery drivers are informed of the pickup addresses and destination addresses through the system once an order is assigned to them."
    },
    {
      question: "What is the process for a delivery service manager to manage deliveries?",
      answer: "Delivery service managers can delegate deliveries to available drivers, track old customer orders, view reviews, and adjust prices and services offered."
    },
    {
      question: "Can I chat with the delivery manager or delivery person?",
      answer: "Yes, our system includes a messaging and chat feature allowing customers, delivery managers, and delivery drivers to communicate directly."
    },
    {
      question: "What statistics are available for customers and managers?",
      answer: (
        <>
          Customers can view total amount spent, and delivery managers can see total revenue generated and hours spent on deliveries.
          {' '}
          <Link to="/user-profile" className="text-green-500 underline">View statistics</Link>
        </>
      )
    },
    {
      question: "What happens once a delivery is completed?",
      answer: "Once a delivery is completed, the customer will be notified through email, and they will then have the option to review the service."
    }
  ];

  return (
    <div>
      <LoginNavBar />
      <div className="flex flex-wrap justify-center p-20">
        {/* Service Details Section */}
        <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
          <div className="container mx-auto">
            {/* FAQ Section */}
            <h2 className="text-3xl font-bold text-center mb-8 text-[#00df9a] p-2 rounded-lg">Frequently Asked Questions (FAQs)</h2>
            <div className="divide-y divide-gray-200">
              {faqs.map((faq, index) => (
                <div key={index} className="py-4">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="text-gray-700 mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#00df9a] p-2 rounded-lg">Contact Manager</h2>
          <DirectChatPage/>
        {/* {!showMessagePrompt && (
                    <button
                        onClick={() => setShowMessagePrompt(true)}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Need to message a manager?
                    </button>
                )}
                {showMessagePrompt && !showChat && (
                    <button
                        onClick={() => setShowChat(true)}
                        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Yes, open chat
                    </button>
                )}
                {showChat && (
                    <div className="bg-white max-w-2xl mx-auto p-8 shadow-lg w-full rounded-2xl">
                        <DirectChatPage />
                    </div>
                )} */}
        </div>
      </div>
    </div>
  );
};

export default Faq;


