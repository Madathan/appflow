import React, { useState } from 'react';
import { Modal, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const StaffModal = ({ open, handleClose, data }) => {
  // State variables
  const [keywordName, setKeywordName] = useState(data.keyword || ''); // Ensure keywordName is initialized correctly
  const [staffName, setStaffName] = useState(data.staff_name || ''); // Ensure staffName is initialized correctly
  const [status, setStatus] = useState(data.status_name    || ''); // Ensure status is initialized correctly
  const [source, setSource] = useState(data.source_name || ''); // Ensure source is initialized correctly
  
  
  // Handle save function
  const handleSave = async () => {
   

    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/AssignAgent/updateAgent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          source:source,
          status:status,
          staffid:staffName,
          update_id:data.id,
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
      handleClose(); // Close modal on successful save
    } catch (error) {
      console.error('Error:', error);
    }
  };

  
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          fullWidth
          label="KEYWORD NAME"
          value={data.keyword}
          onChange={(e) => setKeywordName(e.target.value)}
          sx={{ mb: 2 }}
         readonly
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>STAFF NAME</InputLabel>
          <Select
            value={staffName}
            onChange={(e) => setStaffName(e.target.value)}
            label="STAFF NAME"
          >
            <MenuItem value="Staff 1">Staff 1</MenuItem>
            <MenuItem value="Staff 2">Staff 2</MenuItem>
            <MenuItem value="Staff 3">Staff 3</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>STATUS</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="STATUS"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>SOURCE</InputLabel>
          <Select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            label="SOURCE"
          >
            <MenuItem value="Source 1">Source 1</MenuItem>
            
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
          Save
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default StaffModal;
