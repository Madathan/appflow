    import React from 'react';

    const ScrollableTable = ({datas}) => {
    return (
        <div className="overflow-x-auto rounded-xl shadow-xl h-[500px] mb-4 mt-4 ">
        <table className="table-auto min-w-full bg-white shadow-md border-collapse">
            <thead>
            <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-600 uppercase tracking-wider">ID
                </th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-600 uppercase tracking-wider">NAME </th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-600 uppercase tracking-wider">SMARTBANNER TOKEN
                </th>
                <th className="px-6 py-3 text-left text-lg font-medium text-gray-600 uppercase tracking-wider">API LINK
                </th>
                {/* Add more headers as needed */}
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {/* Example rows */}
        {datas.map((chats)=>(
            <tr key={chats.id}>
                <td className="px-6 py-4 whitespace-nowrap">{chats.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{chats.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{chats.smartbanner_token}</td>
                <td className="px-6 py-4 whitespace-nowrap">{chats.access_token}</td>
            </tr>))}
            
            {/* Add more rows as needed */}
            </tbody>
        </table>
        </div>
    );
    };

    export default ScrollableTable;
