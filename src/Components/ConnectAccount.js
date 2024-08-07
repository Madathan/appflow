import { useState, useEffect, useReducer } from "react";
import { ImLocation2 } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri"; // Import delete icon
import ConnectAccountModal from './ConnectAccountModal';
import Cookies from 'js-cookie';
import { AiOutlineEdit } from "react-icons/ai"; // Import edit icon
import ConnectAccountUpdate from './ConnectAccountUpdate';

const ConnectAccount = () => {
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  const [show, setShow] = useState(false);
  const [fetchData, setFetchData] = useState({});
  const [apiData, setApiData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [count, setCount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(null); // For updating
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://ci4backend.smartyuppies.com/fetchbusiness-acct/${userData.phone_number_id}/${userData.access_token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFetchData(data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData function on component mount
  }, [count, forceUpdate]);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ConnectAccount/AccountUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user_id: userData.id })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const activeAccount = Cookies.get('activeAccount');
        if (activeAccount) {
          const activeAccountData = JSON.parse(activeAccount);
          data.forEach(item => {
            item.active = item.business_name === activeAccountData.business_name;
          });
        }
        setApiData(data); // Set fetched data to state
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDatas(); // Call fetchDatas function on component mount
  }, [userData, fetchData]);

  // Toggle update modal
  const handleEdit = (account) => {
    setSelectedAccount(account);
    setUpdate(!update);
  };

  // Handle switching accounts
  const handleSwitch = (data) => {
    setCount(c => c + 1);
    if (data) {
      userData.access_token = data.access_token;
      userData.app_id = data.app_id;
      userData.phone_number = data.phone_number;
      userData.phone_number_id = data.phone_number_id;
      Cookies.set('userData', JSON.stringify(userData), { expires: 7 });

      Cookies.set('activeAccount', JSON.stringify(data), { expires: 7 });

      setApiData(apiData.map(item => ({
        ...item,
        active: item.business_name === data.business_name
      })));
    }
  };

  // Handle deleting a template
  const handleDelete = async (templateId) => {
    try {
      const response = await fetch(`https://ci4backend.smartyuppies.com/DeleteAccount/${templateId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_id: userData.id })
      });
      if (!response.ok) {
        throw new Error('Failed to delete template');
      }
      setApiData(apiData.filter(item => item.templateId !== templateId));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  return (
    <>
      <h1 className="text-center text-2xl font-semibold mb-6">Connect Account</h1>
      <div className="flex justify-center mb-6">
        <button
          className="bg-green-500 rounded-lg p-3 text-white hover:bg-green-600 transition duration-200"
          onClick={() => setShow(true)}
        >
          Create More Account
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {fetchData.data?.map((data, index) => (
          <div key={index} className="relative max-w-sm rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300">
            {/* Edit Icon Button */}
            <button
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 transition duration-200"
              aria-label="Edit"
              onClick={() => handleEdit(data)}
            >
              <AiOutlineEdit className="text-lg" />
            </button>

            <div className="flex justify-center p-6">
              <img className="object-cover h-48 w-48 rounded-full" src={data.profile_picture_url} alt="Profile" />
            </div>
            <div className="p-4 text-center">
              <h5 className="mb-2 text-xl font-semibold text-gray-900">{data.email}</h5>
              <p className="mb-4 text-gray-700 font-medium">Description</p>
              <p className="text-gray-700">{data.description}</p>
            </div>
            <hr/>
            <div className="p-4">
              <div className="flex flex-col items-center md:items-start">
                <p className="text-gray-700 mb-2">About: <span className="font-medium">{data.about}</span></p>
                <div className="flex items-center mb-2">
                  <p className="text-gray-700 mr-2">Address: <span>{data.address}</span></p>
                 
                </div>
                <p className="text-gray-700">Websites: <span>{data.websites}</span></p>
              </div>
            </div>
          </div>
        ))}

{apiData.map((data, index) => (
  <div key={index} className="max-w-sm rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300">
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-xl font-semibold text-gray-900">{data.business_name}</h5>
        <div className="flex">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg transition duration-200 ${data.active ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'}`}
            onClick={() => handleSwitch(data)}
          >
            {data.active ? "Active" : "Switch Account"}
          </button>
          <RiDeleteBin6Line
            className="ml-4 text-gray-700 cursor-pointer text-xl"
            onClick={() => handleDelete(data.id)}
          />
        </div>
      </div>
      <hr className="my-4" />
      <p className="text-gray-700 mb-2">Business Phone Number: <span className="font-medium">{data.phone_number}</span></p>
      <p className="text-gray-700 mb-2">Phone Number ID: <span className="font-medium">{data.phone_number_id}</span></p>
      <p className="text-gray-700 mb-2">App ID: <span className="font-medium">{data.app_id}</span></p>
      <p className="text-black font-medium">AccessToken: <span className="text-gray-700">{data.access_token.slice(0, 10)}{data.access_token.length > 10 ? '...' : ''}</span></p>
    </div>
  </div>
))}


        {show && <ConnectAccountModal onClose={() => setShow(false)} />}
        {update && <ConnectAccountUpdate onClose={() => setUpdate(false)} forceUpdate={forceUpdate} account={selectedAccount} />}
      </div>
    </>
  );
};

export default ConnectAccount;
