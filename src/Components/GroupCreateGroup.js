import React, { useState, useEffect } from 'react';

const GroupCreateGroup = ({ onClick, data }) => {
  const [groupName, setGroupName] = useState('');
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [checkboxes, setCheckboxes] = useState({});

  useEffect(() => {
    const initialCheckboxes = data.reduce((acc, item) => {
      acc[item.id] = false;
      return acc;
    }, {});
    setCheckboxes(initialCheckboxes);
  }, []);

  const handleInputChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleSelectAllChange = (event) => {
    const checked = event.target.checked;
    setIsSelectAll(checked);
    const updatedCheckboxes = Object.keys(checkboxes).reduce((acc, key) => {
      acc[key] = checked;
      return acc;
    }, {});
    setCheckboxes(updatedCheckboxes);
  };

  const handleIndividualCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxes((prevCheckboxes) => {
      const updatedCheckboxes = {
        ...prevCheckboxes,
        [name]: checked,
      };
      setIsSelectAll(Object.values(updatedCheckboxes).every((value) => value));
      return updatedCheckboxes;
    });
  };

  const handleSubmit = async (event) => {
  

    const selectedContacts = data
      .filter(item => checkboxes[item.id])
      .map(item => `${item.phone_number}|${item.name || 'null'}`);

    const payload = {
      username: "smartyuppies",
      group_name: groupName,
      old_group_name: "",
      selected_contacts: selectedContacts,
    };

    console.log('Sending payload:', payload);

    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/createGroups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Group created:', responseData);
        // Handle success (e.g., close modal, show success message)
      } else {
        console.error('Failed to create group', response.status, response.statusText);
        const errorData = await response.json();
        console.error('Error details:', errorData);
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="fixed inset-y-0 right-0 max-w-full w-96 bg-white overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Create Group</h2>
          <button onClick={onClick} className="text-gray-600 hover:text-gray-800 focus:outline-none">
            Close
          </button>
        </div>
        <div className="p-4">
          <form >
            <div className="mb-4">
              <label htmlFor="group-name" className="block text-sm font-medium text-gray-700">
                Group Name
              </label>
              <input
                type="text"
                id="group-name"
                value={groupName}
                onChange={handleInputChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
                 <button
                type="submit"
                className="px-4 py-2 bg-blue-600 mt-3 w-full text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={isSelectAll}
                  onChange={handleSelectAllChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Select All</span>
              </label>
            </div>
            <div className="mb-4">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className='bg-white shadow-lg border-solid border-gray-300 border'>
                    <th className="px-4 py-2 text-xs sm:text-sm text-left text-black uppercase border-b">Select</th>
                    <th className="px-4 py-2 text-xs sm:text-sm text-left text-black uppercase border-b">Phone No</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} className='bg-white shadow-lg border-solid border-gray-300 border rounded-sm'>
                      <td className="px-4 py-2 border-b">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name={item.id}
                            checked={!!checkboxes[item.id]}
                            onChange={handleIndividualCheckboxChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </label>
                      </td>
                      <td className="px-4 py-2 border-b">
                        <p className="text-sm text-gray-700">{item.phone_number}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end">
           
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GroupCreateGroup;
