import React, { useState } from 'react';

const ContactEdit = ({ contact, onClose,forceUpdate }) => {
  const [formData, setFormData] = useState({
    id: contact?.id || '',
    name: contact?.name || '',
    email: contact?.email || '',
    country: contact?.country || '',
    phone_number: contact?.phone_number|| '', // Assuming phone_number is the mobile number
    column1: contact?.column1 || '',
    column2: contact?.column2 || '',
    column3: contact?.column3 || '',
    column4: contact?.column4 || '',
    column5: contact?.column5 || '',
    column6: contact?.column6 || '',
  });
console.log("contat",formData.mobileNo)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/Contact/updateContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle successful response here if needed
      const data = await response.json();
      console.log('Contact updated successfully:', data);
      onClose();
    } catch (error) {
      console.error('Error updating contact:', error);
      // Handle error state or display an error message
    }
    forceUpdate()
  };

  return (
    <div className="fixed inset-0 z-50 flex  left-0 justify-end items-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 ">Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Mobile No</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2">Column 1</label>
              <input
                type="text"
                name="column1"
                value={formData.column1}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Column 2</label>
              <input
                type="text"
                name="column2"
                value={formData.column2}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Column 3</label>
              <input
                type="text"
                name="column3"
                value={formData.column3}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Column 4</label>
              <input
                type="text"
                name="column4"
                value={formData.column4}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Column 5</label>
              <input
                type="text"
                name="column5"
                value={formData.column5}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Column 6</label>
              <input
                type="text"
                name="column6"
                value={formData.column6}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-300 rounded-lg focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-700 text-white rounded-lg focus:outline-none"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactEdit;
