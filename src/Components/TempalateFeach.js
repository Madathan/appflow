import React from 'react';

const TemplateFetch = ({ template }) => {
  const { name, components } = template;

  return (
    <div className="max-w-lg mx-auto rounded-lg shadow-xl bg-white border border-gray-200 my-4 hover:shadow-xl transition-transform duration-300">
      <div className="p-6">
        <h5 className="text-xl font-bold text-gray-900 uppercase text-center mb-4">{name}</h5>

        {components.map((component, index) => {
          if (component.type === 'HEADER') {
            if (component.format === 'IMAGE' && component.example && component.example.header_handle) {
              return (
                <div key={index} className="mb-4">
                  {component.example.header_handle.map((image, imgIndex) => (
                    <img key={imgIndex} src={image} alt="Template Header" className="mx-auto  rounded-lg mb-2 border-gray-200 border-solid border shadow-xl" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                  ))}
                </div>
              );
            } else if (component.format === 'VIDEO' && component.example && component.example.header_handle) {
              // Assuming component example includes video_url as an array
              const videoUrls = component.example.header_handle;
              return (
                <div key={index} className="mb-4">
                  {videoUrls.map((videoUrl, vidIndex) => (
                    <video key={vidIndex} controls className="mx-auto rounded-lg mb-2 shadow-md" style={{ maxWidth: '100%', maxHeight: '200px' }}>
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ))}
                </div>
              );
            }
          } else if (component.type === 'BODY' && component.text) {
            return (
              <p key={index} className="text-gray-700 text-sm leading-relaxed">{component.text}</p>
            );
          } else if (component.type === 'BUTTONS' && component.buttons) {
            return (
              <div key={index} className="flex justify-center mt-4">
                {component.buttons.map((button, btnIndex) => (
                  <button
                    key={btnIndex}
                    className="px-6 py-2 text-sm font-medium bg-white border-gray-200 border shadow-lg rounded-lg focus:ring-4 focus:ring-blue-300 hover:bg-gray-100 mr-2"
                    style={{ minWidth: '120px' }}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TemplateFetch;
