import React, { useState, useEffect } from 'react';

const OrderModal = ({ isOpen, onClose, order }) => {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        if (isOpen && order) {
            fetchOrderDetails(order.order_id);
        }
    }, [isOpen, order]);

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await fetch(`https://ci4backend.smartyuppies.com/OrderController/orderDetails`,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                 phone_number_id: "105581585784909",
                order_id : orderId
                })
              }
                
            );
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            console.log("details",data.order_address[0]);
            setOrderDetails(data.order_address[0]);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 overflow-hidden ${isOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="fixed inset-y-0 right-0 max-w-full w-96 bg-white overflow-y-auto shadow-xl">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold">Order Details</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                        Close
                    </button>
                </div>
                <div className="p-4">
                    {orderDetails ? (
                        <>
                            <p className="text-gray-600 mb-2">Order ID: {orderDetails.name}</p>
                            {console.log('names',orderDetails.name)}
                            <p className="text-gray-600 mb-2">Ordered Placed: {orderDetails.orderedPlaced}</p>
                            <p className="text-gray-600 mb-2">Amount: {orderDetails.amount}</p>
                            <p className="text-gray-600 mb-2">Payment Status: {orderDetails.paymentStatus}</p>
                            <p className="text-gray-600 mb-2">Order Status: {orderDetails.orderStatus}</p>
                            {/* Add more order details here */}
                        </>
                    ) : (
                        <>
                       
                        
                        <p className="animate-pulse text-gray-600 bg-gray-300 rounded-full w-full h-10"></p>
                        
                                </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderModal;
