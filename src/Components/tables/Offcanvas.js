import React, { useState } from "react";

const Offcanvas = ({ isOpen, onClose }) => (
  <div
    className={`fixed inset-y-0 right-0 w-1/2 bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-300 ${
      isOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={onClose}
      >
        Close
      </button>
    </div>
);

const OffcanvasExample = ({open}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffcanvas = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
        <button
                      className={`bg-[--primary] ${open && "bg-[--third]"} text-white font-bold py-2 px-4 rounded-full hover:bg-[--third] hover:${open && "bg-[--primary]"} hover:scale-105  
                      focus:ring-[--third] transition-all duration-200`}
                      onClick={toggleOffcanvas}
                    >
                      View
                    </button>

      <Offcanvas isOpen={isOpen} onClose={toggleOffcanvas} />
    </div>
  );
};

export default OffcanvasExample;
