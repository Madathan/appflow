import { useState, useEffect } from "react";
import { ImLocation2 } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri"; // Import delete icon
import order from "../assests/task.png";
import ConnectAccountModal from './ConnectAccountModal';
import Cookies from 'js-cookie';

const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

const ConnectAccount = () => {
  const [show, setShow] = useState(false);
  const [feach, setFeach] = useState({});
  const [apiData, setApiData] = useState([]);

  // Function to fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://ci4backend.smartyuppies.com/Home/fetchBusinessData/${userData.access_token}/${userData.phone_number_id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
         
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const datas = await response.json();
        setFeach(datas); // Set fetched data to state
        console.log("connectaccount",apiData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call fetchData function on component mount
  }, []); // Empty dependency array ensures effect runs only once on mount

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await fetch('https://ci4backend.smartyuppies.com/ConnectAccount/AccountUser',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id: userData.id})
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApiData(data); // Set fetched data to state
        console.log("connectaccount",apiData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDatas(); // Call fetchData function on component mount
  }, []);
  // Function to handle switching accounts
  const handleSwitch = (data) => {
    if (data) {
      // Update userData with new values
      userData.access_token = data.access_token;
      userData.app_id = data.app_id;
      userData.phone_number = data.phone_number;
      userData.phone_number_id = data.phone_number_id;
      Cookies.set('userData', JSON.stringify(userData), { expires: 7 });

      // Update apiData to toggle active status based on business_name match
      setApiData(apiData.map(item => ({
        ...item,
        active: item.business_name === data.business_name
      })));
    }
  };

  // Function to handle deleting a template
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
      // Remove the deleted template from apiData
      setApiData(apiData.filter(item => item.templateId !== templateId));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center py-6 space-y-4">
        <button
          className="mt-4 bg-green-500 rounded-lg p-2 py-3 text-white hover:bg-green-600 transition duration-200"
          onClick={() => setShow(true)}
        >
          Create More Account
        </button>
      </div>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10 justify-center p-10">
        {feach.data?.map((data,index)=>
      <div key={index} className="max-w-lg rounded-lg shadow-lg bg-white border border-gray-200 hover:scale-105 transition duration-300">
          <div className="flex justify-center p-6">
            <img className="object-cover h-48 w-96 rounded-full" src={order} alt="Order" />
          </div>
          <div className="p-6 text-center">
            <h5 className="mb-2 text-xl font-bold text-gray-900">Hello</h5>
            <p className="mb-4 text-gray-700">Description</p>
            <p className="text-gray-700">{data.description}</p>
          </div>
        </div>)}
        {feach.data?.map((data,index)=>
        <div key={index} className="max-w-lg rounded-lg shadow-lg bg-white border border-gray-200 hover:scale-105 transition duration-300">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <p className="text-gray-700 mr-2">About:{data.address}</p>
              <ImLocation2 className="text-green-500" />
            </div>
            <div className="flex items-center mb-4">
              <p className="text-gray-700 mr-2">Address:</p>
              <ImLocation2 className="text-green-500" />
            </div>
            <p className="mb-4 text-gray-700">Websites:</p>
          </div>
        </div>)}
        {apiData.map((data,index) => (
          <div key={index} style={{ wordWrap: 'break-word' }} className="max-w-lg rounded-lg shadow-lg bg-white border border-gray-200 hover:scale-105 transition duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <h5 className="text-xl font-bold text-gray-900">{data.business_name}</h5>
                <div className="flex">
                  <button
                    className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-600 transition duration-200 focus:ring-4 focus:ring-blue-300"
                    onClick={() => handleSwitch(data)}
                  >
                    {data.active ? "Active" : "Switch Account"}
                  </button>
                  <RiDeleteBin6Line
                    className="ml-4 text-red-500 cursor-pointer"
                    onClick={() => handleDelete(data.templateId)}
                  />
                </div>
              </div>
              <hr className="my-4" />
              <p className="mb-4 text-gray-700">Business Phone Number: {data.phone_number}</p>
              <p className="mb-4 text-gray-700">Phone Number ID: {data.phone_number_id}</p>
              <p className="mb-4 text-gray-700">App ID: {data.app_id}</p>
              <p className="mb-4 text-gray-700">Access Token: {data.access_token}</p>
            </div>
          </div>
        ))}

        

        {show && <ConnectAccountModal onClose={() => setShow(false)} />}
      </div>
    </>
  );
};

export default ConnectAccount;
