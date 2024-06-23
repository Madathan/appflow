import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import OrderDetail from './OrderDetail'; // Import the modal component
import Cookies from 'js-cookie';

const OrderTable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [data, setData] = useState([]);
    const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://ci4backend.smartyuppies.com/OrderController/listOrders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        phone_number_id: userData.phone_number_id

                    }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log("Response Data:", jsonData); // Print the response to the console
                setData(jsonData.orders); // Adjust this based on the actual structure of your response
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleView = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="rounded-xl shadow-xl overflow-x-scroll h-[500px]">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="order table">
                    <TableHead>
                        <TableRow className="bg-gray-100 sticky top-0">
                            <TableCell align="center" className="px-4 py-2">Order name</TableCell>
                            <TableCell align="center" className="px-4 py-2">Order ID</TableCell>
                            <TableCell align="center" className="px-4 py-2">Ordered Placed</TableCell>
                            <TableCell align="center" className="px-4 py-2">Amount</TableCell>
                            <TableCell align="center" className="px-4 py-2">Payment Status</TableCell>
                            <TableCell align="center" className="px-4 py-2">Order Status</TableCell>
                            <TableCell align="center" className="px-4 py-2">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((order) => (
                            <TableRow key={order.id} className="bg-white hover:bg-gray-50">
                                <TableCell align="center" className="px-4 py-2">{order.customer_name}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{order.order_id}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{order.date}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{order.total_amount?"got":"not get"}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{order.payment_status?"got":"not get"}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{order.order_status?"got":"not get"}</TableCell>
                                <TableCell align="center" className="px-4 py-2">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-700 focus:outline-none"
                                        onClick={() => handleView(order)}
                                    >
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal */}
            <OrderDetail isOpen={isOpen} onClose={handleCloseModal} order={selectedOrder} />
        </div>
    );
};

export default OrderTable;
