import { useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillDelete } from 'react-icons/ai';
import { RiEdit2Line } from 'react-icons/ri'; // Import edit icon
import CustomizeEdit from './CustimizeTeamEdit';

const Card = ({ id, title, description, imageUrl, remove }) => {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState([]);

  const handleEdit = (id) => {
    setShow(true);
    setEdit(id);
  };

  const handleHide = () => {
    setShow(false);
  };

  return (
    <motion.div
      className="max-w-sm rounded-xl overflow-hidden bg-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl relative z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-end p-2">
        <button
          className="bg-green-500 text-white rounded-full p-1 mr-2 hover:bg-blue-600 transition"
          onClick={() => handleEdit(id)}
        >
          <RiEdit2Line size={20} />
        </button>
        <button
          className="bg-green-500 text-white rounded-full p-1 hover:bg-red-600 transition"
          onClick={() => remove(id)}
        >
          <AiFillDelete size={20} />
        </button>
      </div>
      <motion.img
        className="w-full h-48 object-cover rounded-full  "
        src={imageUrl}
        alt="Profile"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-center">
          <h3 className=" text-md">User Name:- {title}</h3>
          <motion.h3
            className="text-green-700 text-sm"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
          >
           
          </motion.h3>
        </div>
        <div className="text-center">
          <h3 className=" text-md">Password:- {description}</h3>
          <motion.p
            className="text-green-700 text-sm"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.8, type: 'spring', stiffness: 120 }}
          >
           
          </motion.p>
        </div>
      </div>
      {show && <div className='w-screen'><CustomizeEdit edit={edit} show={handleHide} /></div>}
    </motion.div>
  );
};

export default Card;
