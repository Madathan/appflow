import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import OrderDetail from './OrderDetail'; // Import the modal component

const GenarateTable = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Example data (replace with your actual data or fetch from API)
    const orders = [
        { id: 1, orderId: 'ORD001', orderedPlaced: '2024-06-15', amount: '$100.00', paymentStatus: 'Paid', orderStatus: 'Shipped' },
        { id: 2, orderId: 'ORD002', orderedPlaced: '2024-06-14', amount: '$75.50', paymentStatus: 'Pending', orderStatus: 'Processing' },
        { id: 3, orderId: 'ORD003', orderedPlaced: '2024-06-13', amount: '$250.00', paymentStatus: 'Paid', orderStatus: 'Delivered' },
        { id: 4, orderId: 'ORD004', orderedPlaced: '2024-06-12', amount: '$50.25', paymentStatus: 'Pending', orderStatus: 'Processing' },
        { id: 5, orderId: 'ORD005', orderedPlaced: '2024-06-11', amount: '$175.75', paymentStatus: 'Paid', orderStatus: 'Shipped' },
        { id: 6, orderId: 'ORD006', orderedPlaced: '2024-06-10', amount: '$120.00', paymentStatus: 'Paid', orderStatus: 'Shipped' },
    ];

    const handleView = (order) => {
        setSelectedOrder(order);
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setSelectedOrder(null);
    };

    return (
        <div className="rounded-xl shadow-[20px] overflow-x-scroll h-[500px]">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="order table">
                    <TableHead>
                        <TableRow className="bg-gray-100 sticky top-0">
                            <TableCell align="center" className="px-4 py-2">Order ID</TableCell>
                            <TableCell align="center" className="px-4 py-2">Ordered Placed</TableCell>
                            <TableCell align="center" className="px-4 py-2">Amount</TableCell>
                            <TableCell align="center" className="px-4 py-2">Payment Status</TableCell>
                            <TableCell align="center" className="px-4 py-2">Order Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="bg-white hover:bg-gray-50">
                                <TableCell align="center" className="px-4 py-2">{order.orderId}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{order.orderedPlaced}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{order.amount}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{order.paymentStatus}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{order.orderStatus}</TableCell>
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

export default GenarateTable;
