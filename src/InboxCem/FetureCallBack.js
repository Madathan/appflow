import React, { useEffect, useState } from 'react';
import { Card, CardContent, TextField, Typography, Grid, Paper, Button, Box } from '@mui/material';
import Notes from './FetureNotes';

const FetureCallBack = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const [container, setContainer] = useState('');

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ChatInbox/futureRecords/future');
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter the data based on the search term
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNotes = (notes) => {
    // Toggle Notes component
    setShowComponent(!showComponent);
    setContainer(notes);
  };

  const handleHistory = async (id) => {
    // Handle another button click with POST request
    console.log('Another button clicked for item:', id);

    try {
      const response = await fetch(`https://ci4backend.smartyuppies.com/ChatInbox/historyStatus/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       
      });

      const result = await response.json();

      if (response.ok) {
        console.log('POST request successful:', result);
        // Handle success (e.g., show a message, update the UI)
      } else {
        console.error('POST request failed:', result);
        // Handle failure (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error in POST request:', error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <TextField
          label="Search by name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Grid container spacing={3}>
          {filteredData.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card component={Paper} elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Phone Number:</strong> {item.phone_number}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Remainder:</strong> {item.remainder}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Notes:</strong> {item.notes}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      onClick={() => handleNotes(item.notes)}
                      variant="contained"
                      color="primary"
                    >
                      Notes
                    </Button>
                    <Button
                      onClick={() => handleHistory(item.id)}
                      variant="outlined"
                      color="secondary"
                    >
                      Another Action
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        {showComponent && (<Notes content={container} onClose={handleNotes}/>)}
      </div>
    </>
  );
};

export default FetureCallBack;
