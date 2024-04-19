import React, { useState, useEffect } from 'react';
import Sidenav from '../components/Sidenav';
import Adminnav from '../components/Adminnav';
import Modal from '../components/Modal';  // Assume this is a modal component you have

const AdminServices = () => {
    const [services, setServices] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const response = await fetch('http://localhost:3000/api/services/delivery-services');
        const data = await response.json();
        setServices(data);
    };

   

    const handleDeleteService = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/services/delete/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Update the state to remove the deleted service from the list
                setServices(services.filter(service => service._id !== id));
            } else {
                // Handle situations where the server response was not OK (e.g., service not found or server error)
                console.error('Failed to delete the service:', response.status);
            }
        } catch (error) {
            console.error('Failed to delete the service:', error);
        }
    };
    

    const handleAddService = async (serviceData) => {
        const response = await fetch('http://localhost:3000/api/services/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData)
        });
        const newService = await response.json();
        setServices([...services, newService]);
        setModalOpen(false);  // Close modal after adding
    };

    return (
        <div className='flex w-full'>
            <Sidenav />
            <div className="flex flex-1 flex-col">
                <Adminnav />
                <div className="p-5">
                    <h1 className="font-semibold text-lg mb-4">Services </h1>
                    <button onClick={() => setModalOpen(true)} className="mb-4 bg-[#00df9a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Add New Service
                    </button>
                    {modalOpen && <Modal onClose={() => setModalOpen(false)} onSave={handleAddService} />}
                    <div className="flex flex-col gap-4">
                        {services.map((service) => (
                            <div key={service._id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center">
                                <h3 className="font-bold">{service.deliveryServiceTitle}</h3>
                                <p>Type: {service.deliverServiceType}</p>
                                <p>Description: {service.deliveryServiceDescription}</p>
                                <p>Company: {service.deliverServiceCompany}</p>
                                <p>Price: ${service.deliverServicePrice}</p>
                                <button onClick={() => handleDeleteService(service._id)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminServices;
