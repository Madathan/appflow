import React from 'react';
import { MdOutlineTipsAndUpdates } from 'react-icons/md';
import { motion } from 'framer-motion';

const DropdownMenu = ({ isOpen, toggleDropdown }) => {
    // Animation variants for the dropdown
    const dropdownVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -20 }, // Start from a slightly smaller size and above
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
    };
    return (
        <div className="relative inline-block text-left">
            <button onClick={toggleDropdown} className='bg-green-500 rounded-lg p-2 text-white focus:outline-none'>
                <MdOutlineTipsAndUpdates size="24px" />
            </button>
            {isOpen && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={dropdownVariants}
                    className="absolute z-50 top-0 right-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-visible"
                >
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">View</p>
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Add</p>
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</p>
                        <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Write</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DropdownMenu;