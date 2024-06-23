import MUIDataTable from "mui-datatables";
import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import './reportTable.css';
import {createTheme} from '@mui/material/styles'
const DataTable = () => {
    const [selectedRow, setSelectedRow] = useState(null);

    const handleReportButtonClick = (rowData) => {
        setSelectedRow(rowData);
    };

    const handleCloseModal = () => {
        setSelectedRow(null);
    };

    const columns = [
        {
            name: 'campaignName',
            label: 'Campaign Name',
        },
        {
            name: 'date',
            label: 'Date',
        },
        {
            name: 'ownerName',
            label: 'Owner Name',
        },
        {
            name: 'contacts',
            label: 'Contacts',
        },
        {
            name: 'send',
            label: 'Send',
        },
        {
            name: 'failed',
            label: 'Failed',
        },
        {
            name: 'actions',
            label: 'Actions',
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Button
                        variant="contained"
                        onClick={() => handleReportButtonClick(data[tableMeta.rowIndex])}
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

    const getMuiTheme = ()=>
    createTheme({
      typography :{
        fontFamily : "Poppins",
      },
      components : {
        MuiTableCell : {
          styleOverrides: {
            head : {
                  padding: "10px 4px"
            },
            body:{
                padding: "7px 15px",
                color: "#e2e8f0"
            }
          }
        }
      }
    })

    const data = [
        { id: 1, campaignName: 'Campaign 1', date: '2024-04-12', ownerName: 'Owner 1', contacts: '2', send: 100, failed: 5 },
        { id: 2, campaignName: 'Campaign 2', date: '2024-04-13', ownerName: 'Owner 2', contacts: '3', send: 150, failed: 8 },
        { id: 3, campaignName: 'Campaign 3', date: '2024-04-14', ownerName: 'Owner 3', contacts: '4', send: 200, failed: 10 },
        { id: 4, campaignName: 'Campaign 4', date: '2024-04-15', ownerName: 'Owner 4', contacts: '5', send: 250, failed: 12 },
        { id: 5, campaignName: 'Campaign 5', date: '2024-04-16', ownerName: 'Owner 5', contacts: '6', send: 300, failed: 15 },
        { id: 6, campaignName: 'Campaign 6', date: '2024-04-17', ownerName: 'Owner 6', contacts: '7', send: 350, failed: 18 },
        { id: 7, campaignName: 'Campaign 7', date: '2024-04-18', ownerName: 'Owner 7', contacts: '8', send: 400, failed: 20 },
        { id: 8, campaignName: 'Campaign 8', date: '2024-04-19', ownerName: 'Owner 8', contacts: '9', send: 450, failed: 22 },
        { id: 9, campaignName: 'Campaign 9', date: '2024-04-20', ownerName: 'Owner 9', contacts: '10', send: 500, failed: 25 },
        { id: 10, campaignName: 'Campaign 10', date: '2024-04-21', ownerName: 'Owner 10', contacts: '11', send: 550, failed: 28 }
    ];

    const options = {
        filter: true,
        filterType: 'dropdown',
        responsive: 'standard',
        selectableRows: 'none',
        download:true,
        print: false,
        viewColumns: true,
        customToolbar: null,
        elevation: 0,
        rowsPerPage : 5,
        rowsPerPageOptions : [5, 10, 25, 30]
    };

    return (
        <div style={{ textAlign: '', height: '90%', width: '100%' }}>
            <MUIDataTable
                title={'Campaign Report'}
                data={data}
                columns={columns}
                options={options}
            />
            <Modal open={selectedRow !== null} onClose={handleCloseModal}>
                <div>
                    {selectedRow && (
                        <div>
                            <h2>{selectedRow.campaignName}</h2>
                            <p>Date: {selectedRow.date}</p>
                            <p>Owner name: {selectedRow.ownerName}</p>
                            <p>Contacts: {selectedRow.contacts}</p>
                            <p>Send: {selectedRow.send}</p>
                            <p>Failed: {selectedRow.failed}</p>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default DataTable;
