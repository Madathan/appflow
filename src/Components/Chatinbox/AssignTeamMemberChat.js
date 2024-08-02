import React, { useState } from 'react';

const ChatAssignMember = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
     
     
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white w-1/5 h-80vh p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Form Example</h2>
            <div className="mb-4">
              <label
                htmlFor="selectOption"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Option:
              </label>
              <select
                id="selectOption"
                name="selectOption"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                <option value="option4">Option 4</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-sm">Check me!</span>
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
    
    </div>
  );
};

export default ChatAssignMember;
