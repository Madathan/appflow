import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import Cookies from 'js-cookie';

const LoginPage = () => {
  const navigate=useNavigate()
  
  //console.log(userData)
 
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
   const redract = useNavigate();
 
  const handleLogin = async () => {
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/applogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username:username,
          password: password
         }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('MyLogin',data)
        // Assuming the server returns a token or some data upon successful login
        // You can save the token in localStorage or a context/state management solution
        Cookies.set('userData', JSON.stringify(data), { expires: 7,path :"/"});
        redract('/Team-Inbox');
        

      
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
 const handleSign=()=>
  {
   
    navigate('/signup')
  }
  return (
    <div className="fixed inset-0 bg-white flex justify-center items-center">
      <div className="bg-white border-solid border-gray-400 border shadow-2xl p-16 rounded-xl">
        <h1 className='mb-10 text-center text-2xl'>Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Enter your Username"
          value={username}
          onChange={handleInputChange}
          className="block w-full border rounded-md p-3 mb-3"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your Password"
          value={password}
          onChange={handleInputChange}
          className="block w-full border rounded-md p-3 mb-2 mt-6"
        />
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Login
        </button>
        {errorMessage && <p className="error-message text-red-500 mt-2">{errorMessage}</p>}
        <p className='mt-3'>Already have an Account<button className='pl-3 text-blue-500 cursor-pointer' onClick={handleSign}  >Sign up</ button ></p>
      </div>
    </div>
  );
};

export default LoginPage;
