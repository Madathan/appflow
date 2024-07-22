import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Cookies from 'js-cookie';

const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

const Logout = () => {
  const [inputs, setInputs] = useState({
    username:chat.username ,
    password: '',
    email: '',
    phonenumber:chat.phone_number

  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = () => {
    // Remove the 'userData' cookie
    Cookies.remove('userData');

    // Redirect to a login page or update the UI to reflect the logout
    window.location.reload(); // For simplicity, reload the page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <div className='mr-[30px] bg-gray-300 h-[150px] w-[150px] text-white ml-2 rounded-full text-[90px]'>
          <h1 className='text-center'>{chat?.username?.charAt(0)}</h1>
        </div>
        <div className='mt-8 ml-6 p-6'>
          <button onClick={handleLogout} className='border border-solid border-black p-3 rounded-lg text-green-600'>
            Logout
          </button>
        </div>
      </div>
      <div className="bg-white p-8 rounded-lg ml-20 shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">User Details</h1>
        <form>
          <div className="mb-4">
            <label htmlFor="input1" className="block text-gray-700">Name:-</label>
            <input
              type="text"
              id="input1"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="input2" className="block text-gray-700">email:-</label>
            <input
              type="text"
              id="input2"
              name="email"
              value={inputs.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="input3" className="block text-gray-700">Password:-</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="input3"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash className='mt-6 text-gray-500' /> : <FaEye className='mt-6  text-gray-500'/>}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="input4" className="block text-gray-700">phoneNo:-</label>
            <input
              type="text"
              id="input4"
              name="phonenumber"
              value={inputs.phonenumber}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-green-800 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Logout;
