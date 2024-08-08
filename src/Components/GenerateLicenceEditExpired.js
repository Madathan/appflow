import React, { useState, useEffect } from 'react';
import { DatePicker, Space, message } from 'antd';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const GenerateLicense = ({ details,forceUpdate }) => {
  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  console.log("details",details)
  const [formData, setFormData] = useState({
    client_username: details?.username || '',
    password: details?.password || '',
    phone_number: details?.phone_number || '',
    validity_period: details?.date ||'',
    phone_number_id: details?.phone_number_id || '',
    whatsapp_id: details?.app_id || '',
    access_token: details?.access_token || '',
    crm_db_name: details?.crm_db_name || '',
    crm_db_username: details?.crm_db_username || '',
    crm_db_password: details?.crm_db_password || '',
    is_catalog: details?.iscatalogue || '',
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (details) {
      setFormData({
        client_username: details.username || '',
        password: details.password || '',
        phone_number: details.phone_number || '',
        validity_period: details.date || '',
        phone_number_id: details.phone_number_id || '',
        whatsapp_id: details.app_id || '',
        access_token: details.access_token || '',
        crm_db_name: details.crm_db_name || '',
        crm_db_username: details.crm_db_username || '',
        crm_db_password: details.crm_db_password || '',
        is_catalog: details.iscatalogue || '',
      });
      setModalOpen(true); // Automatically open the modal when component mounts
    }
  }, [details]);

  const onChange = (date, dateString) => {
    setFormData({ ...formData, validity_period: dateString });
  };

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://ci4backend.smartyuppies.com/Home/updateLicense/${details.id}`, { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.client_username,
          password: formData.password,
          app_id: chat.app_id,
          phone_number_id: formData.phone_number_id,
          access_token: formData.access_token,
          phone_number: formData.phone_number,
          validity: formData.validity_period,
          expiry_date: formData.validity_period,
          crm_db_username: formData.crm_db_username || null,
          crm_db_password: formData.crm_db_password || null,
          crm_db_name: formData.crm_db_name || null,
          iscatalogue: formData.is_catalog,
        }),
      });

      if (response.ok) {
        message.success('License generated successfully');
        setFormData({
          client_username: '',
          password: '',
          phone_number: '',
          validity_period: null,
          phone_number_id: '',
          whatsapp_id: '',
          access_token: '',
          crm_db_name: '',
          crm_db_username: '',
          crm_db_password: '',
          is_catalog: '',
        });
        handleModalClose();
      } else {
        const errorResponse = await response.json();
        message.error(`Failed to generate license: ${errorResponse.message}`);
        console.error('Failed to generate license', response.status, response.statusText);
      }
    } catch (error) {
      message.error('Error generating license');
      console.error('Error:', error);
    }
    forceUpdate()
  };

  return (
    <Dialog open={modalOpen} onClose={handleModalClose}>
      <DialogTitle>Generate New License</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form to generate a new license.
        </DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="client_username"
            name="client_username"
            label="Client Username"
            type="text"
            fullWidth
            value={formData.client_username}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="text"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            type="text"
            fullWidth
            value={formData.phone_number}
            onChange={handleChange}
            required
          />
          <Space direction="vertical" style={{ width: '100%' }}>
            <DatePicker style={{ padding: '10px', border: '2px solid var(--second)', width: '100%' }} onChange={onChange} />
          </Space>
          <TextField
            margin="dense"
            id="phone_number_id"
            name="phone_number_id"
            label="Phone Number ID"
            type="text"
            fullWidth
            value={formData.phone_number_id}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="whatsapp_id"
            name="whatsapp_id"
            label="WhatsApp Business Account ID"
            type="text"
            fullWidth
            value={formData.whatsapp_id}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="access_token"
            name="access_token"
            label="Permanent Access Token"
            type="text"
            fullWidth
            value={formData.access_token}
            onChange={handleChange}
            required
          />
          <Select
            labelId="is_catalog-label"
            id="is_catalog"
            name="is_catalog"
            value={formData.is_catalog}
            onChange={handleChange}
            fullWidth
            displayEmpty
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
          <TextField
            margin="dense"
            id="crm_db_name"
            name="crm_db_name"
            label="CRM DB Name"
            type="text"
            fullWidth
            value={formData.crm_db_name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="crm_db_username"
            name="crm_db_username"
            label="CRM DB Username"
            type="text"
            fullWidth
            value={formData.crm_db_username}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="crm_db_password"
            name="crm_db_password"
            label="CRM DB Password"
            type="text"
            fullWidth
            value={formData.crm_db_password}
            onChange={handleChange}
          />
          <DialogActions>
            <Button onClick={handleModalClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Generate
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateLicense;
