import React, { useState } from 'react';
import CampaignTemplates from './ChatTempaltemap';

const Popup = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null); // State to hold selected template

  const onSelectTemplate = (template) => {
    setSelectedTemplate(template);
   
    console.log('Selected Template:', template);
  };

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
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-full overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4">Popup Heading</h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full shadow-lg bg-white border-gray-200 rounded-xl border-solid border overflow-y-scroll p-4 md:p-8 max-h-64">
            <CampaignTemplates onSelectTemplate={onSelectTemplate} />
          </div>
          <div className="flex justify-end mt-4">
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

export default Popup;
