import React from 'react';
import { useState } from 'react';
import CustomizeTeam from '../assests/19021603.jpg';


const CustomizeTeams1 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [role, setRole] = useState('');

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const roles = ['Developer', 'Designer', 'Manager', 'Other'];

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8">
      <div className="flex justify-center">
        <imgage
          src={CustomizeTeam}
          alt="Create team image"
          className="w-full max-w-lg h-auto rounded-md"
        />
      </div>
      <div className="flex justify-center text-center">
        <h1 className="text-lg sm:text-xl lg:text-2xl mt-4">
          Add Your <span className="text-green-600">Team Member</span> to
          Collaborate
        </h1>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={togglePopup}
          className="bg-green-700 text-white rounded-xl px-4 py-2 hover:bg-green-800 transition-colors"
        >
          Add a Team
        </button>
    
      </div>
      {isPopupOpen &&(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
          <div
            className="bg-white rounded-lg max-w-xl w-full sm:w-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-20">
             
              <h2 className="text-xl font-semibold mb-10">Add Team Member</h2>
              <hr/>
              <br/>
             <div className='shadow-lg p-10  rounded-lg'>
              <div className="mb-2 ">
                <label htmlFor="name" className="block mb-2 text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter team member name"
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600  bg-gray-200 "
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-gray-700">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter team member email"
                  className="border border-gray-400 py-2 px-10 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-200"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="role" className="block mb-2 text-gray-700">
                  Role:
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={handleRoleChange}
                  className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-200"
                >
                  <option value="">Select a role</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                <hr className="shadow-lg"/>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={togglePopup}
                  className="mt-3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Close
                </button>
              </div>
              </div>
             <br/>
             <hr/>
            </div>
           
          </div>
        </div>
        )}
    </div>
  );
};

export default CustomizeTeams1;