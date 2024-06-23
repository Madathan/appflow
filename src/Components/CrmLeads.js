
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './style.css'
import { useNavigate } from 'react-router-dom';


const LeadTable = () => {
    // Example data (replace with your actual data or fetch from API)
    const navigate=useNavigate();
    const leads = [
        { id: 1, leadStatus: 'New', totalMembers: 10 },
        { id: 2, leadStatus: 'In Progress', totalMembers: 15 },
        { id: 3, leadStatus: 'Closed', totalMembers: 5 },
        { id: 4, leadStatus: 'New', totalMembers: 8 },
        { id: 5, leadStatus: 'In Progress', totalMembers: 12 },
        { id: 1, leadStatus: 'New', totalMembers: 10 },
        { id: 2, leadStatus: 'In Progress', totalMembers: 15 },
        { id: 3, leadStatus: 'Closed', totalMembers: 5 },
        { id: 4, leadStatus: 'New', totalMembers: 8 },
        { id: 5, leadStatus: 'In Progress', totalMembers: 12 },
        { id: 1, leadStatus: 'New', totalMembers: 10 },
        { id: 2, leadStatus: 'In Progress', totalMembers: 15 },
        { id: 3, leadStatus: 'Closed', totalMembers: 5 },
        { id: 4, leadStatus: 'New', totalMembers: 8 },
        { id: 5, leadStatus: 'In Progress', totalMembers: 12 },
        { id: 1, leadStatus: 'New', totalMembers: 10 },
        { id: 2, leadStatus: 'In Progress', totalMembers: 15 },
        { id: 3, leadStatus: 'Closed', totalMembers: 5 },
        { id: 4, leadStatus: 'New', totalMembers: 8 },
        { id: 5, leadStatus: 'In Progress', totalMembers: 12 },
                { id: 1, leadStatus: 'New', totalMembers: 10 },
        { id: 2, leadStatus: 'In Progress', totalMembers: 15 },
        { id: 3, leadStatus: 'Closed', totalMembers: 5 },
        { id: 4, leadStatus: 'New', totalMembers: 8 },
        { id: 5, leadStatus: 'In Progress', totalMembers: 12 },
    ];
  const handleView=()=>
    {
      navigate('/CrmTable')
    };
    return (
        <div className="rounded-xl shadow-[20px] overflow-x-scroll h-[500px]">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="lead table">
                    <TableHead>
                        <TableRow className="bg-gray-100 sticky top-0 ">
                            <TableCell align="center" className="px-4 py-2">Lead Status</TableCell>
                            <TableCell align="center" className="px-4 py-2">Total Members</TableCell>
                            <TableCell align="center" className="px-4 py-2">Action</TableCell>
                        </TableRow> 
                    </TableHead>
                    <TableBody>
                        {leads.map((lead) => (
                            <TableRow key={lead.id} className="bg-white hover:bg-gray-50">
                                <TableCell align="center" className="px-4 py-2">{lead.leadStatus}</TableCell>
                                <TableCell align="center" className="px-4 py-2">{lead.totalMembers}</TableCell>
                                <TableCell align="center" className="px-4 py-2">
                                    {/* Placeholder for action button */}
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded-xl hover:bg-green-700 focus:outline-none"
                                        onClick={handleView}
                                    >
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default LeadTable;
