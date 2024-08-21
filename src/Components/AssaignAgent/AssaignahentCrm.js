
import React, { useState } from 'react';
import Button from '@mui/material/Button';

function KeywordSelect() {
  const [keyword, setKeyword] = useState('');
  const [selectedMember, setSelectedMember] = useState('');

  const handleSave = async () => {
    const data = {
      keyword: keyword,
      member: selectedMember,
    };

    try {
      const response = await fetch('/api/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data saved successfully');
        // Optionally, you can clear the form or provide feedback to the user
      } else {
        console.error('Failed to save data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-4 w-full max-w-md mx-auto p-4 mb-[200px]">
      {/* Input Box */}
      <div className="flex flex-col  mb-8">
        <label htmlFor="keyword" className="text-black font-poppis">Keyword</label>
        <input 
          type="text" 
          id="keyword" 
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Select Tag */}
      <div className="flex flex-col">
        <label htmlFor="member" className="text-black font-poppins mb-2">Select a Member</label>
        <select 
          id="member" 
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a member</option>
          <option value="member1">Member 1</option>
          <option value="member2">Member 2</option>
          <option value="member3">Member 3</option>
        </select>
      </div>

      {/* Save Button */}
      <Button
       type="submit"
       variant="contained"
       style={{ backgroundColor: '#00a727', color: '#FFFFFF' }}
       onClick={handleSave}
         >

        Assign to Agent
       </Button>
    </div>
  );
}

export default KeywordSelect;
