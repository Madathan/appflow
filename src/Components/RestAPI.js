import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import api from '../assests/api.png';
import RestTable from './RestApitable';
import Cookies from 'js-cookie';

const RestAPI = ({ open }) => {
  const [showApi, setShowApi] = useState(false);
  const [opens, setOpens] = useState(false);
  const [show, setShow] = useState([]);
  const[get,setGet]=useState([]);
  const [restApiName, setRestApiName] = useState('');
 
  const chat = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;


  const handleToggleApiDetails = async () => {
    setOpens(!opens);
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/RestApi/getRestApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          username:chat.username

        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const data = await response.json();
      setGet(data);
      console.log('Data fetched from API:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const handleChangeRestApiName = (event) => {
    setRestApiName(event.target.value);
  };

  const handleShowApi = async () => {
    setShowApi(!showApi);
    try {
      const response = await fetch('https://ci4backend.smartyuppies.com/RestApi/createRestApi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Muthu Kumar",
          phone_number_id: "105581585784909",
          access_token: "EAASZCnjWBPK8BOx49xaeCINXe4VUl8VkCZBsihifacRZCKLLVD07lZCyF7yx4guKsyEKxsBOYZB6w5Wn3jStGIVPYNQQm9ApnshUKIe9LDErbyusXavkiOp1aZBc6ouASZCeZCtycYO7MggXQIwiNnDCMe9wmZAqjWWWFSVSfPcIYVjKN5I88SZA2gdWg1PBGDvDNNdHYpbPAf9cEtzNhd",
          username: restApiName,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }

      const data = await response.json();
      setShow(data);
      console.log('Data fetched from API:', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        style={{ backgroundColor: '#007bff', color: '#FFFFFF', marginBottom: '1rem' }}
        onClick={handleToggleApiDetails}
      >
        View
      </Button>
      <div className="mb-2 grid flex grid-cols-1 lg:grid-cols-1 sm:gap-y-8 lg:gap-8">
        <div className="border w-full pt-5 items-center px-7 sm:col-span-6 lg:col-span-8 border-2 rounded">
          <div className="grid grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-x-6">
            <div className="flex flex-col justify-between">
              <h1 className="text-center lg:py-2 pb-1 font-semibold text-black sm:text-[35px] text-[35px]">
                Build Your <span className="text-[--second]">REST API</span>
              </h1>
              <div className="p-4 mt-3">
                <label htmlFor="REST_API" className="block mb-1 text-md font-semibold text-black dark:text-black">
                  REST API NAME
                </label>
                <input
                  type="text"
                  id="REST_API"
                  name="REST_API"
                  className="border border-[--second] border-2 p-2 text-black font-bold text-md rounded-lg focus:ring-[--second] focus:border-[--second] block w-full"
                  placeholder=""
                  onChange={handleChangeRestApiName}
                  required
                />
              </div>
              <div>
                <div className="p-4">
                  <label htmlFor="phone_number_id" className="block mb-1 text-md font-semibold text-black dark:text-black">
                    Phone Number ID
                  </label>
                  <input
                    type="text"
                    id="phone_number_id"
                    name="phone_number_id"
                    className="border border-[--second] border-2 p-2 text-black font-bold text-md rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5"
                    placeholder=""
                    disabled
                    value={105581585784909}
                  />
                </div>
                <div className="p-4">
                  <label htmlFor="access_token" className="block mb-1 text-md font-semibold text-black dark:text-black">
                    ACCESS TOKEN
                  </label>
                  <input
                    type="text"
                    id="access_token"
                    name="access_token"
                    className="border border-[--second] border-2 p-3 text-black font-bold text-sm rounded-lg focus:ring-[--second] focus:border-[--second] block w-full p-2.5"
                    placeholder=""
                    disabled
                    value={"EAASZCnjWBPK8BO6kZcz...."}
                  />
                </div>
              </div>
              <div className="flex mt-5 lg:my-4 justify-center">
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: '#00a727', color: '#FFFFFF' }}
                  onClick={handleShowApi}
                >
                  Assign to Agent
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img className="h-full" src={api} alt="API Illustration" />
            </div>
          </div>
        </div>
        <div className="border p-4 col-span-8 border-2 rounded">
          <div>
            <h1 className="text-center lg:py-3 pb-1 font-semibold sm:text-[35px] text-[35px]">
              Capture Your <span className="text-[--second]">API</span>
            </h1>
            <p className="py-4 mb-4 lg:mx-10 rounded-[10px] border border-2 border-[--second] px-7 font-bold">
              The REST API enables authentication for building your own API and sending official WhatsApp messages, including text, variables, media, and more.
            </p>
            {showApi && (
              <div className="py-5 px-8 lg:mx-10 font-bold h-[330px] border border-2 rounded overflow-y-auto">
                {show.length > 0 ? (
                  <div>
                    <h2 className="text-[--second]">Name:</h2>
                    <p>{show[0].name}</p>
                    
                    <h6 className="mt-3 text-[--second]">smartbanner_token:</h6>
                    <p>{show[0].smartbanner_token}</p>
                    <h6 className='mt-4 text-[--second]'>API Link for Text Template: </h6>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, hic ipsam. Officia maiores voluptate vitae sint repellat voluptatum, assumenda deserunt, amet et facere inventore minus mollitia. Perspiciatis dolorem qui mollitia.</p>

                    {/* Add more fields as needed */}
                  </div>
                ) : (
                  <p>No data available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {opens && <RestTable datas={get} />}
    </>
  );
};

export default RestAPI;
