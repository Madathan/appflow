import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MUIDataTable from 'mui-datatables';
import Button from '@mui/material/Button';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReportSidebars from './Reportsidebar';
import Cookies from 'js-cookie';

const Reports = ({ open }) => {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1); // Initial page number
  const [popup, setPopup] = useState(false);
  
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://ci4backend.smartyuppies.com/analytics/reports/getReports?page=${page}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone_number_id: userData.phone_number_id

          })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.campaignInfo);

        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [page]);

  const handleToggle = (rowData) => {
    setSelectedRow(rowData);
    setPopup(!popup);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
    setPopup(false);
  };

  const getMuiTheme = () =>
    createTheme({
      typography: {
        fontFamily: '',
      },
      components: {
        MuiTableCell: {
          styleOverrides: {
            head: {
              padding: '10px 4px',
              textAlign: 'center', // Center align header text
            },
            body: {
              padding: '7px 15px',
              marginRight: '', // Center align body text
            },
          },
        },
      },
    });

  const columns = [
    {
      name: 'campaign_name',
      label: 'Campaign Name',
      options: {
        customBodyRender: (value) => (
          <div style={{ textAlign: 'center' }}>{value}</div>
        ),
      },
    },
    {
      name: 'date',
      label: 'Date',
      options: {
        customBodyRender: (value) => (
          <div style={{ textAlign: 'center' }}>{value}</div>
        ),
      },
    },
    {
      name: 'owner_name',
      label: 'Owner Name',
      options: {
        customBodyRender: (value) => (
          <div style={{ textAlign: 'center' }}>{value}</div>
        ),
      },
    },
    {
      name: 'contacts',
      label: 'Contacts',
      options: {
        customBodyRender: (value) => (
          <div style={{ textAlign: 'center' }}>{value}</div>
        ),
      },
    },
    {
      name: 'sent_count',
      label: 'Sent',
      options: {
        customBodyRender: (value) => (
          <div style={{ textAlign: 'center' }}>{value}</div>
        ),
      },
    },
    {
      name: 'failed_count',
      label: 'Failed',
      options: {
        customBodyRender: (value) => (
          <div style={{ textAlign: 'center' }}>{value}</div>
        ),
      },
    },
    {
      name: 'actions',
      label: 'Actions',
      options: {
        customBodyRender: (value, tableMeta) => (
          <Button
            variant="contained"
            onClick={() => handleToggle(data[tableMeta.rowIndex])}
            sx={{
              backgroundColor: 'white',
              color: '#00a727',
              padding: '4px 12px',
              textAlign: 'center',
              borderRadius: '20px',
              border: '3px solid #00a727',
              textTransform: 'lowercase',
              fontSize: '15px',
              fontWeight: '600',
              '&:hover': {
                backgroundColor: '#00a727',
                scale: '1.0',
                textAlign: 'center',
                color: 'white',
              },
              '&:focus': {
                backgroundColor: '#00a727',
                color: 'white'
              },
            }}
          >
            View
          </Button>
        ),
        filter: false,
      },
    },
  ];

  const handleIncrement = () => {
    setPage(page + 1);
  };

  const handleDecrement = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const options = {
    filter: true,
    filterType: 'dropdown',
    responsive: 'standard',
    selectableRows: 'none',
    download: true,
    print: false,
    viewColumns: true,
    elevation: 0,
  };

  return (
    <div>
      <div>
        <div className={`bg-white  border-solid border shadow-lg   mb-4 border-gary-200 rounded-xl px-5 py-3`}>
          <div className={`flex  justify-between items-center  text-lg font-bold`}>
            <h2>LATEST CAMPAIGNS</h2>
            <button className="flex gap-x-1  group  py-2.5 px-3.5 items-center border-[3px] rounded-full hover:bg-[--second]  border-[--second] ">
              <span className="text-sm text-[--second] group-hover:text-white">EXPORT</span>
            </button>
          </div>
        </div>
        <div className={`bg-white mb-4 border-gray-300   border border-solid shadow-lg rounded-xl px-5 py-3`}>
          <ThemeProvider theme={getMuiTheme()}>
            <div style={{ textTransform: 'uppercase', fontWeight: '900', height: '90%', width: '100%' }}>
              <MUIDataTable
                title={'Campaign Report'}
                data={data}
                columns={columns}
                options={options}
                style={{ width: '100%', margin: '0', padding: '0' }}
              />
              <div>
                {popup && (
                  <div className='translate-x duration-700'>
                    <ReportSidebars onClick={handleCloseModal} data={selectedRow} />
                  </div>
                )}
              </div>
              <div className='relative'>
                <div className='flex gap-5 lg:ml-[1250px]'>
                  <button onClick={handleDecrement} className='bg-green-500 p-2 text-white rounded-full text-sm'><FaChevronLeft /></button>
                  <button onClick={handleIncrement} className='bg-green-500 p-2 text-white rounded-full text-sm'><FaChevronRight /></button>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default Reports;
