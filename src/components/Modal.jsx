import React, { useState } from 'react';

const Modal = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        company: '',
        description: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);  // Pass form data back to the parent component
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded">
                <h2 className="text-lg font-bold mb-4">Add New Service</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
                    <input type="text" name="type" placeholder="Type" value={formData.type} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
                    <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="block w-full p-2 border rounded mb-2"></textarea>
                    <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="block w-full p-2 border rounded mb-2" />
                    <div className="flex justify-between">
                        <button type="submit" className="bg-[#00df9a] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add</button>
                        <button type="button" onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
