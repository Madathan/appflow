import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phoneId: '',
    issue: '',
    image: null,
  });

  const handleChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('https://your-api-endpoint.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });
      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          phoneId: '',
          issue: '',
          image: null,
        });
      } else {
        alert('Failed to submit form');
      }
    } catch (error) {
      alert('An error occurred while submitting the form');
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 font-poppins text-center text-blue-900">Smart Yuppies Support</h1>
        <form className="bg-white p-6 rounded shadow-md w-full" onSubmit={handleSubmit}>
          <h2 className="text-2xl text-blue-900 font-bold mb-4">Contact Us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-poppins text-gray-700 text-sm  mb-2" htmlFor="name">
                Name :-
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-white focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-poppins mb-2" htmlFor="email">
                Email :-
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-white focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-poppins mb-2" htmlFor="phone">
                Phone Number :-
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-white focus:outline-none focus:shadow-outline"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-poppins mb-2" htmlFor="phoneId">
                Phone Number ID :-
              </label>
              <input
                id="phoneId"
                type="text"
                value={formData.phoneId}
                onChange={handleChange}
                placeholder="Your Phone Number ID"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-white focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-poppins mb-2" htmlFor="issue">
              Issue :-
            </label>
            <textarea
              id="issue"
              value={formData.issue}
              onChange={handleChange}
              placeholder="Describe your issue"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-white  focus:outline-none focus:shadow-outline"
              rows="4"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-poppins mb-2" htmlFor="image">
              Upload Image
            </label>
            <div className="flex items-center">
              <label
                htmlFor="image"
                className="cursor-pointer flex items-center text-blue-900 hover:text-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.354l-1.414 1.414M6.343 9.172L5.93 5.93m.707-2.12L7.464 4.95m1.415 0L11.95 3.536m4.243 4.243l-1.415 1.415m1.415 1.415L16.95 14.95m0 4.243l-1.415 1.415m-2.828-2.829l-1.415 1.415m-4.243-4.243L3.05 12.05m4.243 4.243L6.343 15.88m-2.83-2.83l-1.415-1.415M12 19.646l1.414-1.414m0-2.828L15.88 14.95m2.83 2.83l1.414-1.414M4.95 4.95L3.536 6.364m0 0L2.121 7.778M2.12 12.05l1.415 1.414m0 4.243l1.414-1.414m2.828-2.829l1.415 1.415m0 0L6.343 17.88"
                  />
                </svg>
                Choose an image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-700 text-white font-poppins py-2 px-4 rounded focus:outline-none focus:ring-white focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
