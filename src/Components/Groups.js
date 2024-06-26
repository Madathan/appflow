import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DropdownMenu from './GroupDropdownMenu';
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Groupcreate from './GroupCreateGroup'

function Groups() {
  const [groups, setGroups] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;
  const [show, setShow] = useState(false);
  const[contact,setContact]=useState([]);
  const[share,setShare]=useState(null);


  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/groups', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userData.username }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }

        const data = await response.json();
        setGroups(data.distinctGroupsData || []);
        setContact(data.contacts);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    if (userData) {
      fetchGroups();
    }
  }, [userData]);

  const toggleDropdown = (id) => {
    setShare(id)
    setOpenDropdown((prevId) => (prevId === id ? null : id));
   
  };

const handleShow=(()=>{setShow(!show)})
 const handleShare=(item)=>{ };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      
      <motion.div 
        className="w-full max-w-4xl mx-auto rounded overflow-hidden shadow-lg"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <div className="px-6  py-4y lg:flex justify-between	 ">
          <h1 className="font-bold text-xl sm:text-2xl mb-2">Recent Groups</h1>
          <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: '#00a727', color: '#FFFFFFF',marginBottom:'10px' }}
                onClick={handleShow}
              >Create Group</Button>
            
        </div>
        <div className="px-6 bg-white h-[498px] pt-4 pb-2 h-[553px] rounded-lg shadow-lg border-solid border-gray-200 border  overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-lg sm:text-sm text-left text-black uppercase border-b">Group Name</th>
                <th className="px-4 py-2 text-lg sm:text-sm text-left text-black uppercase border-b">Date</th>
                <th className="px-4 py-2 text-lg sm:text-sm text-left text-black uppercase border-b">Total Members</th>
                <th className="px-4 py-2 text-sm sm:text-sm text-left text-black uppercase border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((item, index) => (
                <tr key={item.groupname} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-100"}`}>
                  <td className="px-4 py-2 border-b text-sm">{item.groupname}</td>
                  <td className="px-4 py-2 border-b text-sm">{item.date}</td>
                  <td className="px-4 py-2 border-b text-sm">{item.group_member_count}</td>
                  <td className="px-4 py-2 border-b  relative text-sm">
                    <DropdownMenu
                      isOpen={openDropdown === item.groupname}
                      toggleDropdown={() => toggleDropdown(item.groupname) }
                      share={share}  datas={contact}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div> 
      {show &&(<Groupcreate onClick={handleShow} data={contact}/>)}
      
    </motion.div>
  );
}

export default Groups;
