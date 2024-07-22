import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ScrollableTable = ({ datas }) => {
  return (
    <div className="rounded-lg shadow-xl overflow-x-scroll h-[610px]">
    <div className="p-4 flex justify-between items-center">
    </div>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="order table">
        <TableHead>
          <TableRow     className="bg-gray-100 sticky top-0">
            <TableCell align="center" className="px-4 py-2">ID</TableCell>
            <TableCell align="center" className="px-4 py-2">Name</TableCell>
            <TableCell align="center" className="px-4 py-2">SmartBanner Token</TableCell>
            <TableCell align="center" className="px-4 py-2" >API Link</TableCell>
            {/* Add more headers as needed */}
          </TableRow>
        </TableHead>
        <TableBody>
          {datas.map((chat) => (
            <TableRow key={chat.id}  className="bg-white hover:bg-gray-50">
              <TableCell align="center" className="px-4 font-Poppins py-2">{chat.id}</TableCell>
              <TableCell align="center" className="px-4 font-Poppins py-2">{chat.name}</TableCell>
              <TableCell align="center" className="px-4 font-Poppins py-2">{chat.smartbanner_token}</TableCell>
              <TableCell align="center" className="px-4 font-Poppins py-2">{chat.access_token}</TableCell>
              {/* Add more cells as needed */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default ScrollableTable;
