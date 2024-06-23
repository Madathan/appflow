import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://appnew.smartyuppies.com/appsignup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name,
          username: username,
          password: password,
          phoneNumber: phoneNumber
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the server returns a token or some data upon successful signup
        // You can save the token in localStorage or a context/state management solution
        localStorage.setItem('token', data.token);
        navigate('/Dashboard', { signUpData: data });
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Sign up failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'phoneNumber') {
      setPhoneNumber(value);
    }
  };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-gray-200 flex justify-center items-center">
      <div className="bg-white border-solid border-gray-400 border shadow-2xl p-16 rounded-xl">
        <h1 className='mb-10 text-center text-2xl text-green-600'>Sign Up</h1>
       
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          value={username}
          onChange={handleInputChange}
          className="block w-full border rounded-md p-3 mb-3 border-none bg-gray-200"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={password}
          onChange={handleInputChange}
          className="block w-full border rounded-md p-3 mb-3  border-none bg-gray-200"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Enter your Phone Number"
          value={phoneNumber}
          onChange={handleInputChange}
          className="block w-full border rounded-md p-3 mb-3  border-none bg-gray-200"
        />
        <button onClick={handleSignUp} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
          Sign Up
        </button>
        {errorMessage && <p className="error-message text-red-500 mt-2">{errorMessage}</p>}
        <p className='mt-3'>Already have an Account?<button className='pl-3 text-green-500 cursor-pointer' onClick={handleLogin}>Login</button></p>
      </div>
    </div>
  );
};

export default SignUpPage;
