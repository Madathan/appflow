    import React, { useState } from 'react';
    import { MdOutlineTipsAndUpdates } from 'react-icons/md';
    import { motion } from 'framer-motion';
    import GroupView from './GroupView';
    import GroupAdd from './GroupAdd.js';
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';


    const DropdownMenu = ({ isOpen, toggleDropdown, share ,datas}) => {
    const [view, setView] = useState(false);
    const [add,setAdd]=useState(false);
    // Animation variants for the dropdown
    const dropdownVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -20 }, // Start from a slightly smaller size and above
        visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
    };

    const handleView = () => {
        setView(!view);
    };
    const handleAdd=()=>
        {
            setAdd(!add);
        }
    const handleDelete = async () => {
        try {
        // Perform your delete API call here
        const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/deleteGroup', {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            // Add any required headers (e.g., authentication headers)
            },
            body: JSON.stringify({
            // Add any parameters required for the delete operation
            username: "smartyuppies",
            group_name: share
            })
        });

        if (!response.ok) {
            throw new Error('Failed to delete item');
        }

        // Optionally handle success response
        console.log('Item deleted successfully');
        toast.success('Successfully Deleted', {
            position: 'top-center',
            autoClose: 2000,
          });
        // Close dropdown or perform any other action after deletion
        toggleDropdown(); // Example: close dropdown after delete
        } catch (error) {
        console.error('Error deleting item:', error);
        }
    };

    return (
        <div className="relative inline-block text-left">
          <ToastContainer />
        <button onClick={toggleDropdown} className='bg-white rounded-lg  border-solid border-gray-200 border shadow-lg p-2 text-white focus:outline-none'>
            <MdOutlineTipsAndUpdates className='text-black' size="18px" />
        </button>
        {isOpen && (
            <motion.div
            initial="hidden"
            animate="visible"
            variants={dropdownVariants}
            className="absolute z-50 top-0 right-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-visible"
            >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button onClick={handleView} className="block px-4 py-2  w-full text-sm text-gray-700 hover:bg-gray-100">View</button>
                <button  onClick={handleAdd}className="block px-4 py-2  w-full  text-sm text-gray-700 hover:bg-gray-100">Add</button>
                <button onClick={handleDelete} className="block px-4  w-full  py-2 text-sm text-gray-700 hover:bg-gray-100">Delete</button>
            </div>
            </motion.div>
        )}
        {view && (<GroupView onClose={handleView} onClick={share} />)}
        {add &&(<GroupAdd onClose={handleAdd} onClick={datas} share={share}/> )}
        </div>
    );
    };

    export default DropdownMenu;
