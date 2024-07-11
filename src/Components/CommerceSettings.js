import React, { useState } from 'react';
import Cookies from 'js-cookie';

const chat= Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
 console.log("datas",chat)
const CommerceSettings = () => {
    const [formData, setFormData] = useState({
        username:chat.username,
        phone_number_id:chat.phone_number_id,
        id:chat.id,
        order_form_id:chat.order_form_id,
        upi_type:chat. upi_type,
        payment_config_id:chat. payment_config_id        ,
        catalogue_spreadsheet_id:chat. catalogue_spreadsheet_id,
        catalogue_spreadsheet_name:chat. catalogue_spreadsheet_name,
        catalogue_spreadsheet_key:chat. catalogue_spreadsheet_key,

       
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
            console.log("userobject",formData)

            console.log('Settings updated successfully!',response);
        } else {
            console.error('Failed to update settings.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center">Configure <span className='text-green-600'>Commerce</span> Settings</h2>
                <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderFormId">
                            Order Form ID
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="order_form_id"
                            type="text"
                            placeholder="Enter Order Form ID"
                            value={formData.order_form_id}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentConfigId">
                            Payment Config ID
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="payment_config_id"
                            type="text"
                            placeholder="Enter Payment Config ID"
                            value={formData.payment_config_id}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentType">
                            Payment Type
                        </label>
                        <select
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="upi_type"
                            value={formData.upi_type}
                            onChange={handleChange}
                        >
                            <option value="credit_card">{chat.upi_type} </option>
                            <option value="razerpay">razerpay</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spreadsheetId">
                            Spreadsheet ID
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="catalogue_spreadsheet_id"
                            type="text"
                            placeholder="Enter Spreadsheet ID"
                            value={formData.catalogue_spreadsheet_id}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spreadsheetName">
                            Spreadsheet Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="catalogue_spreadsheet_name"
                            type="text"
                            placeholder="Enter Spreadsheet Name"
                            value={formData.catalogue_spreadsheet_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="spreadsheetKey">
                            Spreadsheet Key
                        </label>
                        <input
                            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="catalogue_spreadsheet_key"
                            type="text"
                            placeholder="Enter Spreadsheet Key"
                            value={formData.catalogue_spreadsheet_key}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommerceSettings;
