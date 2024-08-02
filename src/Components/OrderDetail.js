import React, { useState, useEffect } from 'react';
import { LiaRocketSolid } from 'react-icons/lia';
import { SiGooglesheets } from 'react-icons/si';

const OrderModal = ({ isOpen, onClose, order }) => {
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        if (isOpen && order) {
            fetchOrderDetails(order.order_id);
        }
    }, [isOpen, order]);

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await fetch('https://ci4backend.smartyuppies.com/OrderController/orderDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    phone_number_id: "105581585784909",
                    order_id: orderId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }

            const data = await response.json();
            setOrderDetails(data.order_details);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="fixed inset-y-0 right-0 max-w-full w-full sm:w-96 bg-white overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Order Details</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        Close
                    </button>
                </div>
                <div className="p-4">
                    <p className='bg-white shadow-sm rounded-sm p-3 mb-3 border border-solid border-gray-300'>
                        <span className='mr-2 font-bold'>Name:</span>{order?.customer_name}
                    </p>
                    <p className='bg-white shadow-sm rounded-sm p-3 mb-3 border border-solid border-gray-300'>
                        <span className='mr-2 font-bold'>Phone:</span>{order?.customer_phone_number}
                    </p>
                    <p className='bg-white shadow-sm rounded-sm p-3 mb-3 border border-solid border-gray-300'>
                        <span className='mr-2 font-bold'>Order Placed:</span>{order?.date}
                    </p>
                </div>
                <div className="p-4 bg-white shadow-xl mx-auto sm:w-80 border border-solid border-gray-300 rounded-sm">
                    <h1 className='mb-4 text-center text-lg text-white bg-green-700 w-full rounded py-2'>Order List</h1>
                    {orderDetails.map((item, index) => (
                        <div key={index} className="mb-4">
                            <p className="text-center p-2 mb-1">
                                <span className='font-bold'>Product Id:</span> {item.product_retailer_id}
                            </p>
                            <p className="text-center p-2 mb-1">
                                {item.quantity} x {item.item_price} = <span className='text-green-600'>{item.quantity * item.item_price}</span>
                            </p>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 mt-10">
                    <div className="flex flex-col items-center">
                        <LiaRocketSolid className="text-green-700 text-3xl" />
                        <p className="mt-2">ShipRocket</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <SiGooglesheets className="text-green-700 text-3xl" />
                        <p className="mt-2">Google Sheets</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
