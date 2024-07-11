import React, { useState } from 'react';

const PopupForm = ({ edit, show }) => {
  console.log("array", edit);
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = () => {
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('image', formData.image);

    fetch(`https://ci4backend.smartyuppies.com/Home/Teams/updateTeamMember/${edit}`, {
      method: 'POST',
      body: formDataToSend,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Additional logic here if needed
        // Close the popup after submission
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-end z-[5000]"> {/* Ensure z-index is high */}
      <div className="bg-white p-8 rounded-l shadow-lg w-1/3 h-full overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Popup Form</h2>
        </div>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 mt-1 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label className="block mb-2">
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 mt-1 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <label className="block mb-2">
          Upload Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 mt-1 rounded w-full focus:outline-none focus:ring focus:border-blue-500"
          />
        </label>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={show} // Assuming show function is passed to close the popup
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
