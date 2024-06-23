import React, { useEffect, useState } from 'react';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { generateCsv, mkConfig } from 'export-to-csv';
import ContactAdd from './ContactAdd'; // Assuming ContactAdd is correctly implemented and imported

const columnHelper = createMRTColumnHelper();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    size: 150,
    enableEditing: false,
  }),
  columnHelper.accessor('phone_number', { // Adjusted to match API response
    header: 'Phone Number',
    size: 150,
  }),
  columnHelper.accessor('country', {
    header: 'Country',
    size: 150,
  }),
  columnHelper.accessor('status', { // Adjusted to match API response
    header: 'Subscription Status',
    size: 150,
  }),
];

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: true,
  filename: 'all-data',
});

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/Contact/fetchAllContacts/pages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: 'smartyuppies' })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setContacts(data.contacts || []); // Ensure data.contacts is an array
        console.log(data.contacts);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);
 const handleshow= () => setOpen(!open)
  const handleExportData = () => {
    const csv = generateCsv(csvConfig);
    const csvContent = csv(contacts);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'all-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const table = useMaterialReactTable({
    columns,
    data: contacts,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: () => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>

        <Button
          variant="contained"
          style={{ backgroundColor: 'green', color: '#FFFFFF', marginBottom: '10px', marginRight: '20px' }}
          onClick={handleshow}
        >
          Assign data
        </Button>
      </Box>
    ),
  });

  return (
    <div className='rounded-xl'>
      <MaterialReactTable table={table} />
      {open && <ContactAdd  onClick={handleshow}/>} {/* Render ContactAdd component only if 'open' is true */}
    </div>
  );
};

export default Contacts;
