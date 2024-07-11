import {useState} from 'react';
import { motion } from 'framer-motion';
import { AiFillDelete } from 'react-icons/ai';
import { RiEdit2Line } from 'react-icons/ri'; // Import edit icon
import CustomizeEdit from './CustimizeTeamEdit'
const Card = ({ id, title, description, imageUrl, remove }) => {
  const [show,setShow]=useState(false);
  const [edit,setEdit]=useState([]);

  const handleEdit = (id) => {
    setShow(true)
    setEdit(id)
        
  };
  const handlehide=()=>{ setShow(false)}
  return (
    <motion.div
      className="max-w-sm rounded overflow-hidden shadow-lg h-fit relative z-0 hover:animate-flipUp" // Add z-index
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white rounded-full p-1 mr-2  animate-bounce"
          onClick={()=>handleEdit(id)}
        >
          <RiEdit2Line size={20} />
        </button>
        <button
          className="bg-red-500 text-white rounded-full p-1"
         
          onClick={() => remove(id)}
        >
           {console.log("mkza",id)}
          <AiFillDelete size={20} />
        </button>
      </div>
      <motion.img
        className="w-full object-cover rounded-lg"
        src={imageUrl}
        alt="Profile"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
      />
      <div className="px-6 py-4">
        <div className="flex justify-center">
          <h3 className="font-bold text-lg">User Name:</h3>
          <motion.h3
            className="text-green-700 text-lg"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
          >
            {title}
          </motion.h3>
        </div>
        <div className="flex justify-center">
          <h3 className="font-bold text-lg">Password:</h3>
          <motion.p
            className="text-green-700 text-base text-lg"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 120 }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    {show &&(
 <CustomizeEdit edit={edit} show={handlehide} />)} 
    </motion.div>
  );
};

export default Card;
