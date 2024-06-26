import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';
import { PiChecksBold } from 'react-icons/pi';

const ContactAdd = ({ onClick }) => {
  const [show, setShow] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    country: '',
    email: '',
    mobile: '',
    column1: '',
    column2: '',
    column3: '',
    column4: '',
    column5: '',
    column6: '',
    imageType: '',  // Added for image type selection
    imageFile: null,  // Added for image file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to backend
    console.log('Form submitted:', formData);

    // Reset form fields if needed
    setFormData({
      name: '',
      country: '',
      email: '',
      mobile: '',
      column1: '',
      column2: '',
      column3: '',
      column4: '',
      column5: '',
      column6: '',
      imageType: '',
      imageFile: null,
    });
  };
  const handleshow=()=>{setShow(!show)};
  return (
    <div className='relative'>
      {/* Black overlay */}
      <div className='fixed inset-0 bg-black opacity-50 z-10'></div>

      {/* Sidebar */}
      <div className='fixed right-0 top-0 h-full bg-white w-full max-w-lg p-4 duration-700 z-20 overflow-y-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold'>Campaign Report</h2>
          <button onClick={onClick} className='text-red-600'>
            <MdOutlineCancel size={24} />
          </button>
        </div>
        <hr className='mb-4' />
        
        {/* Dropdown and country input */}
        <button type='button' onClick={handleshow} className='bg-white text-black w-full mb-3 border-gray-200 border-solid border  shadow-lg  font-bold py-2 px-4 rounded'>
        import via excel
            </button>     
         {show &&(<div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl mb-4'>
          <div className='flex items-center mb-4'>
            <label htmlFor='imageType' className='mr-2'>Image Type:</label>
            <select
              id='imageType'
              name='imageType'
              className='border rounded px-2 py-1'
              onChange={handleChange}
              value={formData.imageType}
            >
              <option value=''>Select Image Type</option>
              <option value='jpeg'>JPEG</option>
              <option value='png'>PNG</option>
              <option value='gif'>GIF</option>
            </select>
          </div>
          {/* File upload for image */}
          <div className='flex items-center mb-4'>
            <label htmlFor='imageFile' className='mr-2'>Upload Image:</label>
            <input
              type='file'
              id='imageFile'
              name='imageFile'
              onChange={handleImageChange}
              accept='.jpeg,.png,.gif'
              className='border rounded px-2 py-1'
            />
          </div>
          <div className='flex items-center mb-4'>
            <label htmlFor='country' className='mr-2'>Country:</label>
            <input
              type='text'
              id='country'
              name='country'
              value={formData.country}
              onChange={handleChange}
              className='border rounded px-2 py-1 flex-1'
            />
          </div>
          <div className='text-center'>
            <button type='button' className='bg-blue-500  w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Your Button Text
            </button>
          </div>
        </div>)}

        {/* Form for additional inputs */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
            <label htmlFor='name'>Name:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='ml-2 px-2 py-1 border rounded w-full'
              required
            />
          </div>
          <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='ml-2 px-2 py-1 border rounded w-full'
              required
            />
          </div>
          <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
            <label htmlFor='mobile'>Mobile Number:</label>
            <input
              type='text'
              id='mobile'
              name='mobile'
              value={formData.mobile}
              onChange={handleChange}
              className='ml-2 px-2 py-1 border rounded w-full'
              required
            />
          </div>
          <div className='grid grid-cols-2 gap-5'>
            <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
              <label htmlFor='column1'>Column 1:</label>
              <input
                type='text'
                id='column1'
                name='column1'
                value={formData.column1}
                onChange={handleChange}
                className='ml-2 px-2 py-1 border rounded w-full'
              />
            </div>
            <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
              <label htmlFor='column2'>Column 2:</label>
              <input
                type='text'
                id='column2'
                name='column2'
                value={formData.column2}
                onChange={handleChange}
                className='ml-2 px-2 py-1 border rounded w-full'
              />
            </div>
            <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
              <label htmlFor='column3'>Column 3:</label>
              <input
                type='text'
                id='column3'
                name='column3'
                value={formData.column3}
                onChange={handleChange}
                className='ml-2 px-2 py-1 border rounded w-full'
              />
            </div>
            <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
              <label htmlFor='column4'>Column 4:</label>
              <input
                type='text'
                id='column4'
                name='column4'
                value={formData.column4}
                onChange={handleChange}
                className='ml-2 px-2 py-1 border rounded w-full'
              />
            </div>
            <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
              <label htmlFor='column5'>Column 5:</label>
              <input
                type='text'
                id='column5'
                name='column5'
                value={formData.column5}
                onChange={handleChange}
                className='ml-2 px-2 py-1 border rounded w-full'
              />
            </div>
            <div className='bg-white border-solid border-gray border p-4 rounded-xl shadow-xl'>
              <label htmlFor='column6'>Column 6:</label>
              <input
                type='text'
                id='column6'
                name='column6'
                value={formData.column6}
                onChange={handleChange}
                className='ml-2 px-2 py-1 border rounded w-full'
              />
            </div>
          </div>
          <div className='text-center'>
            <button type='submit' className='bg-blue-500 w-full shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactAdd;
