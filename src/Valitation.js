import React from 'react'
import Cookies from 'js-cookie';
import { useNavigate, } from 'react-router-dom';
const Valitation = () => {
    const navigate=useNavigate()
    
    const userData=Cookies.get("userData")
    if(userData!==undefined){
        navigate("/dashboard",{replace:true})
      }
      else{
        navigate('./Login')
      }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Smart Yuppies Dashboard
        </h1>
        <h2 className="text-2xl text-gray-600">
          & Bulk WhatsApp Official
        </h2>
      </div>
    </div>
  )
  
}

export default Valitation