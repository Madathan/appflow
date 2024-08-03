import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { BsSendArrowDown } from "react-icons/bs";
import ChartContact from './ChatContect'; // Corrected import path
import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineAttachFile } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import AssignChat from './AssignTeamMemberChat';
import ChatweCrm from './AssignWeCrm'
import { BulletList } from 'react-content-loader';
import { RiFunctionAddLine } from "react-icons/ri";
import SelectTemplates from './SelectTemplate'
const App = () => {
  const [chatData, setChatData] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [assignopen,setAgentopen]=useState(false);
  const [assignwecrmopen,setAssignwecrmopen]=useState(false);
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState(false);

  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;


  console.log("userdata",chat)

  const chatContainerRef = useRef(null);
 
  useEffect(() => {
    fetchContacts();
    
  }, []);

  useEffect(() => {
  
    if (selectedContact) {
      const intervalId = setInterval(() => {
        handleContactClick(selectedContact);
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }
  }, [selectedContact]);

  useEffect(() => {
    filterContacts(searchTerm);
  }, [searchTerm, contacts]);

  const fetchContacts = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://appnew.smartyuppies.com/applistchat/${chat.phone_number_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          client_role: chat.client_role,
          user_id: chat.id,
        })
      });
      const responseData = await response.json();
      if (responseData && responseData.customerData) {
        console.log("Fetched contacts for phone_number_id:", chat);
        setContacts(responseData.customerData);
        setFilteredContacts(responseData.customerData); // Initialize filteredContacts
        setLoading(false)
      
      } else {
        console.error('No customer data found in response');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleContactClick = async (contact) => {
    setSelectedContact(contact); // Store the selected contact
    try {
      const response = await fetch(`https://appnew.smartyuppies.com/appchatmessages/${chat.phone_number_id}/${contact.customer_phone_number}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
        
      if (responseData && Array.isArray(responseData.messages)) {
        scrollToBottom()  
        setChatData(responseData.messages);
      } else {
        console.error('No messages found for the contact');
        // Clear chat data if no messages found
      }
    } catch (error) {
      console.error('Error fetching messages:', error.message);
    }
  };

  const handleSend = async () => {
    if (selectedContact) {
      if (newMessage.trim() !== '') {
        // Prepare new text message data
        const currentTime = getTime();
        const newMessageData = {
          id: chatData.length + 1,
          way: 'out',
          message: newMessage,
          time: currentTime,
          last_message: 'New Message',
          name: 'Current User'
        };

        // Update the UI optimistically
        setChatData(prevChatData => [...prevChatData, newMessageData]);
        setNewMessage('');

        try {
          // Send the message to the backend
          const response = await fetch(`https://appnew.smartyuppies.com/appsendmessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              phone_number_id: chat.phone_number_id,
              customer_phone_number: selectedContact.customer_phone_number,
              message: newMessage,
              way: 'out'
            })
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log('Message sent successfully:', responseData);

        } catch (error) {
          console.error('Error sending message:', error.message);
          // Optionally, you could revert the optimistic update here
          setChatData(prevChatData => prevChatData.filter(msg => msg.id !== newMessageData.id));
        }
      }

      if (selectedFile) {
        // Handle sending file as Base64
        const fileBase64 = await convertFileToBase64(selectedFile);
          console.log('File uploaded successfully:', fileBase64);
        

        // Prepare new file message data
        const newFileMessage = {
          id: chatData.length + 1,
          way: 'out',
          message_type: 'image', // Ensure the message type is set to image
          message: fileBase64, // Include the base64 encoded file
          time: getTime(),
          last_message: 'New Image',
          name: 'Current User'
        };

        // Update the UI optimistically
        setChatData(prevChatData => [...prevChatData, newFileMessage]);
        setSelectedFile(null);

        try {
          // Send the file as Base64 to the backend
          const response = await fetch(`https://appnew.smartyuppies.com/appsendmessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              customer_name: selectedContact.customer_name,
              base64File: fileBase64,
              way: 'out',
              customer_phone_number: selectedContact.customer_phone_number,
              phone_number_id: chat.phone_number_id
            })
          });
         
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log('File uploaded successfully:',responseData);
          
        } catch (error) {
          console.error('Error uploading file:', error.message);
          // Optionally, you could revert the optimistic update here
        }
      }
    }
  };

  const filterContacts = (term) => {
    if (term === '') {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.customer_name?.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  function getTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  const firstItem = chatData[0];

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

 const handleToggleAgent=()=>
  {
    setAgentopen(!assignopen)
    setAssignwecrmopen(false)
  }
  
 const handleToggleAgentWeCrm=()=>
  {
    setAssignwecrmopen(!assignwecrmopen)
    setAgentopen(false)
  }


  const handleNewCavo=()=>
  {
    setTemplates(!templates)
  }
  return (
  <div className='grid grid-cols-1 md:grid-cols-2 '>
    <div className="flex h-[600px] mt-[50px] w-[1000px]  shadow-xl  ">
      {templates &&(<SelectTemplates onClose={handleNewCavo}/>)}
      <div className="w-1/3 bg-white rounded-xl text-white shadow-2xl">
        <div className='h-16 w-full  border-r border-solid border-gray-400 '>
          <div className='p-3 flex'>
            <p className='text-3xl bg-gradient-to-r  rounded-full from-[#01949A] to-[#004369] p-1'><FaUserCircle /></p>
            <p className='p-2 text-black '>{chat?.username.toUpperCase()}</p>
          </div>
        </div>
        <div className="flex flex-col h-[548px]  p-3">
          <div className='flex pb-2'>
            <p className='p-2  rounded-s-lg text-gray-600 bg-gray-100'><IoSearchSharp /></p>
            <input
              className='p-1 px-20  rounded-e-lg text-sm text-black bg-gray-100 outline-none  ring-none'
              placeholder='Search the Contact'
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className=" overflow-y-scroll l   shadow-xl bg-white w-full border-solid border-gray-200 border-y   bg-gray-100 text-black">
            {filteredContacts.map((contact, index) => (
              <div key={contact.customer_id} onClick={() => handleContactClick(contact)}>
                {loading ? (
                 <div className='text-center'>
                 <BulletList     foregroundColor={'#999'} className='text-gray-500' />
               </div>):(
                <ChartContact
                  name={contact.customer_name}
                  last_message={contact.last_message.message}
                  time={contact.last_message.received_at_ist}
                  status={contact.last_message.status}
                  Phone_no={contact.customer_phone_number}
                />
              )}
                {index !== filteredContacts.length - 1 && <hr className="my-2 border-gray-300 hover:bg-[#F0F2F5]" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-4/5 rounded-xl bg-[url('https://i.pinimg.com/originals/07/b3/7d/07b37d9e8af59caf15b0f8e1b49da368.jpg')] flex flex-col">
        <div className='h-16 w-full bg-white rounded-r-xl border border-solid border-gray-200   '>
          {firstItem && (
            <div className='ml-2 p-1'>
              {firstItem.customer_name && (
                <h1 className='   font-sans'>{firstItem.customer_name}</h1>
              )}
              {firstItem.customer_phone_number && (
                <p className=' text-gray-500 text-sm font-sans'>{firstItem.customer_phone_number}</p>
              )}
            </div>
          )}
          
  
        </div>
       
       
        <div className="flex-1 overflow-y-auto p-5" ref={chatContainerRef}>
        <button
             className="p-3 text-gary-800 rounded-xl   shadow-2xl border-solid  fixed left-[1060px] top-80 text-2xl"
             onClick={scrollToBottom}
           >
           <MdKeyboardDoubleArrowDown />
           </button>
          {chatData && (
            <>
              {chatData.map((chatt) => (
                <div
                  key={chatt.id}
                  className={`flex ${chatt.way === 'out' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`message ${chatt.way === 'out' ? 'bg-[#d9fdd3] self-end mt-3 mr-4 pr-10 p-1  font-Poppins' : 'bg-white text-black self-start mt-3 mr-4 pr-10 p-1  font-sans'} text-sm max-w-[250px] rounded-lg`}
                  >
                    {chatt.message_type === "image"  ? (
                     
                      <img src={chatt.message} alt={chatt.message} style={{ maxWidth: '100%', height: 'auto' }} />
                     
                    ) : (
                      <div style={{ wordWrap: 'break-word' }}>{chatt.message}</div>
                    )}
                    <div className="text-xs text-gray-500 text-right ml-6 relative left-8 top-1">
                      <p>{`${chatt.way === 'in' ? chatt.received_at_ist : chatt.received_at_ist}`}</p>
                    </div>
                  </div>
               
                </div>
                
              ))}
                
            </>
            
          )}
          
        </div>
        <div className="flex p-2 border-l rounded-r-xl border-gray-200 bg-white">
          {/* Input area */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          
          <label htmlFor="file-upload" className="p-3 bg-green-500 text-white rounded-full shadow-2xl border-solid border-gray-400 cursor-pointer mr-2">
            <MdOutlineAttachFile />
          </label>
          <button
            className={`p-3 ${selectedFile ?  'bg-black' : 'bg-green-500'} text-white rounded-full shadow-2xl border-solid border-gray-400`}
            onClick={handleNewCavo}
          >
            <RiFunctionAddLine />
          </button>
          <textarea
            rows="1"
            className="flex-1  border-none focus:ring-white rounded-md focus:outline-none resize-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button
            className={`p-3 ${selectedFile ?  'bg-black' : 'bg-green-500'} text-white rounded-full shadow-2xl border-solid border-gray-400`}
            onClick={handleSend}
          >
            <BsSendArrowDown />
          </button>
         
        </div>
      </div>
    </div>
    {firstItem &&
    <div className="w-[400px] h-[600px] mt-[50px] shadow-xl relative left-[310px] bg-white ">
    <div className='h-16 w-full  bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg p-x-6 border border-solid border-gray-200   '>
          {firstItem && (
            <div className='ml-2 p-1'>
              {firstItem.customer_name && (
                <h1 className=' text-white  font-poppins'>Name:-<span className='ml-2 font-poppins font-normal text-sm '>{firstItem.customer_name}</span></h1>
              )}
              {firstItem.customer_phone_number && (
                <p className=' text-white  font-poppins'>Phone No:-<span className='ml-2 font-poppins font-normal text-sm '>{firstItem.customer_phone_number}</span></p>
              )}
             
            </div>
          )}
        </div>
      <div className='flex flex-col p-4'>
       <button
         className="mt-2 flex items-center bg-blue-500 hover:bg-blue-600 text-white p-1 rounded-lg w-full justify-center"
         onClick={handleToggleAgent}
       >
         <MdKeyboardDoubleArrowDown size={24} />
         <span className="ml-2">Assign Team Member</span>
       </button>
       <button
         className="mt-2 flex items-center bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full justify-center"
         onClick={handleToggleAgentWeCrm}
       >
         <MdKeyboardDoubleArrowDown size={24} />
         <span className="ml-2">Assign WeCrm</span>
       </button>
       <button
         className="mt-2 flex items-center bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg w-full justify-center"
         onClick={""}
       >
         <MdKeyboardDoubleArrowDown size={24} />
         <span className="ml-2">Subscribe</span>
       </button>
       {assignopen && (
         <div className="mt-2">
           <AssignChat onClose={handleToggleAgent} name={firstItem?.customer_phone_number} />
         </div>
       )}
       {assignwecrmopen && (
         <div className="mt-2">
           <ChatweCrm onClose={handleToggleAgentWeCrm} />
         </div>
       )}
     </div>
     <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-poppins p-2 w-[40px] mb-2">Notes:</h2>
      <textarea
        className="w-full h-40 p-3 border resize-none border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
        placeholder="Write your notes here..."
      ></textarea>
    </div>
     </div> }
  </div>
  );
};

export default App;
