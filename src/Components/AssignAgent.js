import React from 'react';
import { motion } from 'framer-motion';
import CustomSelect from './tables/CustomSelect';
import Assign from '../assests/task.png';
import Button from '@mui/material/Button';
const AssignAgent = ({ open }) => {
  return (
    <div className="p-6 rounded-lg bg-gray-100 border border-2 shadow-2">
      <h1 className="py-3 pb-8 font-semibold lg:text-3xl sm:text-2xl sm:text-center">
        Keyword Based <span className="text-[--second]">Assignment</span> / Transfer To{' '}
        <span className="">CRM</span>
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-center">
        <div className="flex-grow sm:w-3/4 px-8 py-4">
          <form action="">
            <div className="mb-8">
              <label htmlFor="phone_number_id" className="block mb-2 text-md font-[600] text-black dark-text-black">
                Phone Number ID
              </label>
              <input
                type="text"
                id="phone_number_id"
                name="phone_number_id"
                className="border border-[--second] border-2 p-2 text-gray-900 text-md rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5"
                placeholder=""
                required
              />
            </div>
            <div className="mb-8">
              <label htmlFor="whatsapp_id" className="block mb-2 text-sm text-gray-900 uppercase font-[600] dark-text-black">
                Whatsapp Business Account ID
              </label>
              <CustomSelect />
            </div>
            <div className="my-11 text-center">
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#00a727', color: '#FFFFFF' }}
                
                
              >
                Assign to Agent
              </Button>

            </div>
          </form>
        </div>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 120, duration: 2.5, delay: 0.1 }}
          className="lg:w-3/4 lg:flex hidden"
        >
          <img src={Assign} alt="" className="object-cover h-full w-80 lg:w-full" />
        </motion.div>




      </div>
    </div>
  );
};

export default AssignAgent;
