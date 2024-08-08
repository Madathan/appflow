import React, { useState } from 'react';
import Cookies from 'js-cookie';


const CommerceSettings = () => {
    const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

    const [formData, setFormData] = useState({
        username: chat.username,
        phone_number_id: chat.phone_number_id,
        id: chat.id,
        order_form_id: chat.order_form_id,
        upi_type: chat.upi_type,
        payment_config_id: chat.payment_config_id,
        catalogue_spreadsheet_id: chat.catalogue_spreadsheet_id,
        catalogue_spreadsheet_name: chat.catalogue_spreadsheet_name,
        catalogue_spreadsheet_key: chat.catalogue_spreadsheet_key,
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('https://ci4backend.smartyuppies.com/OrderController/commerceSettings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            console.log("userobject", formData);
            console.log('Settings updated successfully!', response);
        } else {
            console.error('Failed to update settings.');
        }
    };

    return (
        <div className="flex items-center justify-center h-fit ">
            <div className="w-full md:w-2/3 bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl  mb-10 text-center">Configure <span className='text-green-600'>Commerce</span> Settings</h2>
                <form className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-900 text-md ml-8  mb-2" htmlFor="order_form_id">
                            Order Form ID
                        </label>
                        <input
                            className=" appearance-none rounded-lg   border-1  border-solid border-gray-600 ml-8 mt-4 w-full  py-3 px-3 text-gray-500  focus:outline-none focus:shadow-outline focus:ring-white"
                            id="order_form_id"
                            type="text"
                            placeholder="Enter Order Form ID"
                            value={formData.order_form_id}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="mb-4 ml-6">
                        <label className="block text-gray-900 text-md   ml-8 mb-1"  htmlFor="payment_config_id">
                            Payment Config ID
                        </label>
                        <input
                            className=" appearance-none rounded-lg   border-1  border-solid border-gray-600 ml-8  mt-5 w-full py-[14px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-white"
                            id="payment_config_id"
                            type="text"
                            placeholder="Enter Payment Config ID"
                            value={formData.payment_config_id}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-md  mb-2 ml-8" htmlFor="upi_type">
                            Payment Type
                        </label>
                        <select
                            className=" appearance-none rounded-lg   border-1  border-solid border-gray-600  ml-8 mt-4 w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-white"
                            id="upi_type"
                            value={formData.upi_type}
                            onChange={handleChange}
                        >
                            <option value="credit_card">{chat.upi_type}</option>
                            <option value="razerpay">{chat.upi_type === "razorpay" ? "upi" : "razerpay"}</option>
                        </select>
                    </div>

                    <div className="mb-4 ml-6">
                        <label className="block text-gray-700 text-md  mb-2 ml-8" htmlFor="catalogue_spreadsheet_id">
                            Spreadsheet ID
                        </label>
                        <input
                            className=" appearance-none rounded-lg mt-4  border-1  border-solid border-gray-600 ml-8  w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-white"
                            id="catalogue_spreadsheet_id"
                            type="text"
                            placeholder="Enter Spreadsheet ID"
                            value={formData.catalogue_spreadsheet_id}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-md mb-2 ml-8" htmlFor="catalogue_spreadsheet_name">
                            Spreadsheet Name
                        </label>
                        <input
                            className=" appearance-none rounded-lg   border-1  border-solid border-gray-600 text-sm ml-8  mt-4 rounded-sm-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-white"
                            id="catalogue_spreadsheet_name"
                            type="text"
                            placeholder="Enter Spreadsheet Name"
                            value={formData.catalogue_spreadsheet_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-6 ml-6">
                        <label className="block text-gray-700 text-md ml-8 mb-2" htmlFor="catalogue_spreadsheet_key">
                            Spreadsheet Key
                        </label>
                        <input
                            className="appearance-none 	 rounded-lg   border-1  border-solid border-gray-600 ml-8 mt-4   text-sm w-full py-4 px-3 text-gray-700 leading-tight focus:ring-white focus:outline-none focus:shadow-outline"
                            id="catalogue_spreadsheet_key"
                            type="text"
                            placeholder="Enter Spreadsheet Key"
                            value={formData.catalogue_spreadsheet_key}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 flex items-center justify-center">
                        <button
                            className="bg-green-700 hover:bg-green-800 text-white py-2 px-20 rounded-lg focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update <span className='ml-2'>Settings</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommerceSettings;
