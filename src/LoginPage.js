import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = async () => {
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/applogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('userData', JSON.stringify(data), { expires: 7, path: "/" });
        navigate('/Team-Inbox');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Invalid username or password');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-blue-400 to-purple-500 flex justify-center items-center">
      <div className="bg-white border border-gray-200 shadow-2xl p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          value={username}
          onChange={handleInputChange}
          className="block w-full border border-gray-300 rounded-md p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your Password"
            value={password}
            onChange={handleInputChange}
            className="block w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            {showPassword ? (
              <FaEye className="text-gray-400" />
            ) : (
              < FaEyeSlash className="text-gray-400" />
            )}
          </button>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Login
        </button>
        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}
        <p className="mt-4 text-center text-gray-700">
          Don't have an account?{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={handleSignUp}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
