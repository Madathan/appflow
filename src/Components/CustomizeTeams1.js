import React, { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';
import Cookies from 'js-cookie';

const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

const CustomizeTeams1 = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [image, setImage] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [roles, setRoles] = useState([]);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', name);
      formData.append('password', email);
      formData.append('account_id', role);
      formData.append('access_token', chat.access_token);
      formData.append('app_id', chat.app_id);
      formData.append('company_name', chat.company_name);
      formData.append('phone_number_id', chat.phone_number_id);
      formData.append('phone_number', chat.phone_number);
      formData.append('catalogue_enabled', chat.catalogue_enabled);

      if (image) {
        formData.append('image', image);
      }

      const response = await fetch('https://ci4backend.smartyuppies.com/Teams/addTeamMembers', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        alert('Team member added successfully');
        setSavedData({ name, email, role, image });
        setName('');
        setEmail('');
        setRole('');
        setImage(null);
        setIsPopupOpen(false);
      } else {
        console.error('Failed to save data', response.status, response.statusText);
        const text = await response.text();
        console.
        console.error('Response text:', text);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/Teams/index', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
           
            id: chat.id
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setRoles(data.accounts); // Assuming data.accounts is an array of objects with `id` and `business_name`
        } else {
          console.error('Failed to fetch roles', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRoles();
  }, [roles]);

  return (
    <div className="mx-4 sm:mx-6 lg:mx-8">
      <div className="flex justify-center text-center">
        <h1 className="text-lg sm:text-xl lg:text-2xl mt-4">
          Add Your <span className="text-green-600">Team Member</span> to Collaborate
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
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div
            className="bg-white rounded-lg max-w-2xl w-full sm:w-auto shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 w-[600px]">
              <h2 className="text-xl font-semibold mb-4">Add Team Member</h2>
              <form onSubmit={handleSave}>
                <div className="mb-4">
                  <label htmlFor="name" className="block mb-2 text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter team member name"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-200"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block mb-2 text-gray-700">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter team member email"
                    className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-200"
                  />
                </div>
                <div className="mb-4">
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
                      <option key={role.id} value={role.id}>
                        {role.business_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="image" className="block mb-2 text-gray-700">
                    Image:
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="image"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="image"
                      className="flex items-center cursor-pointer text-green-600"
                    >
                      <FaUpload className="mr-2" />
                      {image ? image.name : 'Choose an image'}
                    </label>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={togglePopup}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizeTeams1;
