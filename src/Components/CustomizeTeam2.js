import React, { useState, useEffect } from 'react';
import profilImage from '../assests/19021603.jpg';
import Card from './CumstomizeCard'; // Assuming this is the correct import statement
import Cookies from 'js-cookie';

const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
console.log("datas", chat);

function CustomizeTeams() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/Teams/displayTeamMember', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phone_number_id: chat.phone_number_id,
            company_name: chat.company_name,
          }), // Assuming your backend expects an object with `phone_number_id` and `company_name`
        });

        if (!response.ok) {
          throw new Error('Failed to fetch initial data');
        }

        // Log the raw response text
        const responseText = await response.text();
        console.log("Raw response:", responseText);

        const initialData = JSON.parse(responseText);
        console.log("Parsed:", initialData);
        setData(initialData.teammember);
        console.log("Parsed data:", data);

      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchData(); // Call the function to fetch data when component mounts
  }, []); // Empty dependency array ensures this runs only once when component mounts

  const handleRemoveCard = async (id) => {
    try {
      // Remove the card from UI immediately

      // Send a POST request to your backend API
      const response = await fetch(`https://ci4backend.smartyuppies.com/Teams/deleteTeams/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(), // Assuming your backend expects an object with `id`
      });

      if (!response.ok) {
        throw new Error('Failed to remove card');
      }

      console.log('Card removed successfully');
    } catch (error) {
      console.error('Error removing card:', error);
      // Optionally, you might want to revert the UI state if the request fails
      setData([...data]); // Restore previous state
    }
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10">
      {data.map(user => (
        <Card
          id={user.id}
          title={user.username}
          description={user.password}
          imageUrl={user.image || profilImage} // Use profilImage as fallback if user.image is null
          remove={handleRemoveCard}
        />
      ))}
    </div>
  );
}

export default CustomizeTeams;
