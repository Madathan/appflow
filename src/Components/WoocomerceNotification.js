// BackgroundWithButtons.jsx

import React from 'react';

const BackgroundWithButtons = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-200">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gray-900 opacity-75"></div>

      {/* Content */}
      <div className="relative z-10 text-white text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome!</h1>
        <div className="space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Button 1
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Button 2
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundWithButtons;
