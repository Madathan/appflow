import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';
import { useNavigate, } from 'react-router-dom';

const FlowTable = () => {
  const [flows, setFlows] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    // Fetch data from your API or use static data
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ChatFlow/getFlows');
        const data = await response.json();
        setFlows(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
 const handleflow=()=>
 {
    navigate('/Keyword-Automation')
 }
  return (
    <Box sx={{ margin: 2 }}>
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }} onClick={handleflow}>
        Add Flow
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Flow Name</TableCell>
              <TableCell>Flow Key</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flows.map((flow) => (
              <TableRow key={flow.flow_key}>
                <TableCell>{flow.flow_name}</TableCell>
                <TableCell>{flow.flow_key}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FlowTable;
