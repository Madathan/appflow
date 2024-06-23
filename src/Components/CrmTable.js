
// src/components/PhoneTable.js

import React from 'react';

const CrmTable = () => {
    // Example data (replace with your actual data or fetch from API)
    const phoneData = [
        { id: 1, name: 'John Doe', phoneNumber: '+123456789', status: 'Active', source: 'Web', assignedTo: 'John Doe' },
        { id: 2, name: 'Jane Smith', phoneNumber: '+987654321', status: 'Inactive', source: 'App', assignedTo: 'Jane Smith' },
        { id: 3, name: 'Michael Johnson', phoneNumber: '+111222333', status: 'Active', source: 'Phone', assignedTo: 'Michael Johnson' },
        { id: 4, name: 'Emily Brown', phoneNumber: '+444555666', status: 'Active', source: 'Web', assignedTo: 'Emily Brown' },
        { id: 5, name: 'David Wilson', phoneNumber: '+777888999', status: 'Inactive', source: 'App', assignedTo: 'David Wilson' },
    ];

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded my-6">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Phone Number</th>
                        <th className="py-3 px-6 text-left">Status</th>
                        <th className="py-3 px-6 text-left">Source</th>
                        <th className="py-3 px-6 text-left">Assigned To</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {phoneData.map((phone) => (
                        <tr key={phone.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left">{phone.name}</td>
                            <td className="py-3 px-6 text-left">{phone.phoneNumber}</td>
                            <td className="py-3 px-6 text-left">{phone.status}</td>
                            <td className="py-3 px-6 text-left">{phone.source}</td>
                            <td className="py-3 px-6 text-left">{phone.assignedTo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CrmTable;
