import React, { useState } from 'react';

const Popup = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected option:', selectedOption);
    onClose(); // Close the popup after submission
  };

 

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Popup Heading</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="options" className="block mb-2 text-sm font-medium text-gray-700">
              Select an option:
            </label>
            <select
              id="options"
              className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={selectedOption}
              onChange={handleSelectChange}
              required
            >
              <option value="">Select an option</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Popup ;
