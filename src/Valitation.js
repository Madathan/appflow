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
   <>
   hii
   </>
  )
  
}

export default Valitation