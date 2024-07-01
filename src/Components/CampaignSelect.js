import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import background from '../assests/undraw_Add_tasks_re_s5yj.png'; // Import your background image
import CampaignSend from './CampaignSend';

const CampaignSelect = () => {
  const location = useLocation();
  const { selectedTemplate,formData } = location.state || {};
  const { name, components, language } = selectedTemplate || {};
 console.log("formate",formData);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const dateInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDateButtonClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleSubmit = async () => {
    // Construct the data to be sent in the POST request
    const data = {
      templateName: name,
      templateLanguage: language,
      fileUrl: file,
      components: components,
    };

    try {
      const response = await fetch('YOUR_API_ENDPOINT', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      // Handle success (e.g., show a success message, navigate to another page, etc.)
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    }
  };

  if (!selectedTemplate) {
    return <div className="text-center text-gray-600 py-8">No template data available</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Submit
        </button>
        <button
          onClick={handleDateButtonClick}
          className="px-4 py-2 mt-4 ml-5 text-white bg-green-500 rounded hover:bg-green-700"
        >
          Pick a Date
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row">
        <div className="max-w-lg mx-auto md:w-1/2 rounded-lg overflow-hidden shadow-xl bg-white border border-gray-200 my-4 hover:shadow-xl transition-transform duration-300">
          <div className="p-6">
            <h5 className="text-xl font-bold text-gray-900 uppercase text-center mb-4">
              {name} <span className="text-gray-600">({language})</span>
            </h5>

            {components.map((component, index) => (
              <div key={index} className="mb-4">
                {component.type === 'HEADER' && (
                  <>
                    {component.format === 'IMAGE' && (
                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                        {file ? (
                          <img
                            src={file}
                            alt="Selected Image"
                            className="block w-full h-auto"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                          />
                        ) : (
                          <>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              ref={fileInputRef}
                              style={{ display: 'none' }}
                            />
                            <div
                              className="cursor-pointer"
                              onClick={handleIconClick}
                              style={{
                                width: '100%',
                                height: '200px',
                                backgroundImage: `url(${file || background})`, // Use file or default background
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                              }}
                            />
                          </>
                        )}
                      </div>
                    )}

                    {component.format === 'VIDEO' && (
                      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                        {file ? (
                          <video
                            controls
                            className="block w-full h-auto"
                            style={{ maxWidth: '100%', maxHeight: '200px' }}
                          >
                            <source src={file} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <>
                            <input
                              type="file"
                              accept="video/mp4"
                              onChange={handleFileChange}
                              ref={fileInputRef}
                              style={{ display: 'none' }}
                            />
                            <div
                              className="cursor-pointer"
                              onClick={handleIconClick}
                              style={{
                                width: '100%',
                                height: '200px',
                                backgroundImage: `url(${background})`, // Default background for video
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '8px',
                                border: '1px solid #E5E7EB',
                              }}
                            />
                          </>
                        )}
                      </div>
                    )}
                  </>
                )}

                {component.type === 'BODY' && component.text && (
                  <div className="text-gray-700 text-sm leading-relaxed">
                    {component.text.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex}>{line}</p>
                    ))}
                  </div>
                )}

                {component.type === 'BUTTONS' && component.buttons && (
                  <div className="mt-4">
                    {component.buttons.map((button, btnIndex) => (
                      <button
                        key={btnIndex}
                        className="block w-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg shadow-md focus:ring-4 focus:ring-blue-300 hover:bg-gray-100"
                      >
                        {button.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <CampaignSend file={file} />
        </div>
      </div>

      <div className="mt-20 flex justify-center">
        <input
          type="date"
          ref={dateInputRef}
          style={{ display: 'none',marginLeft:'100px' }}
          className="text-center"
        />
      </div>
    </div>
  );
};

export default CampaignSelect;
