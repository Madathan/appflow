import React from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { PiChecksBold } from "react-icons/pi";

const ReportSidebars = ({ onClick, data }) => {
  return (
    <div className='relative'>
      {/* Black overlay */}
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>

      {/* Sidebar */}
      {data && (
        <div className="fixed right-0 top-0 h-full bg-white w-full lg:w-1/3 md:w-1/2 sm:w-3/4 p-4 duration-700 z-20 overflow-y-auto">
          <div className='flex justify-between items-center'>
            <h2 className="text-lg font-bold mb-4">Campaign Report</h2>
            <button onClick={onClick} className='text-red-600'><MdOutlineCancel size={24} /></button>
          </div>
          <hr className="mb-4" />
          <div className="space-y-4">
            {/* Inputs */}
            <div className='grid grid-cols-2 gap-5'>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl relative'>
                <p className='text-sm'>Total Sents</p>
                <p className='absolute right-5 top-2'><GiCheckMark /></p>
                <p className='text-lg font-bold'>{data.sent_count}</p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl relative'>
                <p className='text-sm'>Total Delivery</p>
                <p className='absolute right-5 top-2'><PiChecksBold /></p>
                <p className='text-lg font-bold'>{data.delivered_count}</p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl relative'>
                <p className='text-sm'>Total Read</p>
                <p className='absolute right-5 top-2'><GiCheckMark /></p>
                <p className='text-lg font-bold'>{data.read_count}</p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl relative'>
                <p className='text-sm'>Total Fails</p>
                <p className='absolute right-5 top-2'><GiCheckMark /></p>
                <p className='text-lg font-bold'>{data.failed_count}</p>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
                <p>Owner Name: <span className='font-bold'>{data.owner_name}</span></p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
                <p>Status: <span className='font-bold'>Delivered</span></p>
              </div>
              <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
                <p>Channel: <span className='font-bold'>Official</span></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportSidebars;
