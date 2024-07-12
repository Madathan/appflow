import { useState } from "react";
import { ImLocation2 } from "react-icons/im";
import order from "../assests/task.png";
import ConnectAccountModal from './ConnectAccountModal';
import Cookies from 'js-cookie';

const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

const ConnectAccount = () => {
  const [show, setShow] = useState(false);

  const handleOpen = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className="flex flex-col items-center py-6 space-y-4">
        <button className="mt-4 bg-green-500 rounded-lg p-2 py-3 px- text-white hover:bg-green-600 transition duration-200" onClick={handleOpen}>
          Create More Account
        </button>
      </div>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-10 justify-center p-10">
        <div className="max-w-lg rounded-lg shadow-lg bg-white border border-gray-200 hover:scale-105 transition duration-300">
          <div className="flex justify-center p-6">
            <img className="object-cover h-48 w-96 rounded-full" src={order} alt="Order" />
          </div>
          <div className="p-6 text-center">
            <h5 className="mb-2 text-xl font-bold text-gray-900">Hello</h5>
            <p className="mb-4 text-gray-700">Description</p>
            <p className="text-gray-700">Detailed description text goes here.</p>
          </div>
        </div>

        <div className="max-w-lg rounded-lg shadow-lg bg-white border border-gray-200 hover:scale-105 transition duration-300">
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h5 className="text-xl font-bold text-gray-900">Hello</h5>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-600 transition duration-200 focus:ring-4 focus:ring-blue-300">
                Click
              </button>
            </div>
            <hr className="my-4" />
            <p className="mb-4 text-gray-700">Business Phone Number</p>
            <p className="mb-4 text-gray-700">Phone Number ID:</p>
            <p className="mb-4 text-gray-700">App ID:</p>
            <p className="mb-4 text-gray-700">Access Token:</p>
          </div>
        </div>

        <div className="max-w-lg rounded-lg shadow-lg bg-white border border-gray-200 hover:scale-105 transition duration-300">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <p className="text-gray-700 mr-2">About:</p>
              <ImLocation2 className="text-green-500" />
            </div>
            <div className="flex items-center mb-4">
              <p className="text-gray-700 mr-2">Address:</p>
              <ImLocation2 className="text-green-500" />
            </div>
            <p className="mb-4 text-gray-700">Websites:</p>
          </div>
        </div>

        <div className="max-w-lg rounded-lg shadow-lg bg-white border border-gray-200 hover:scale-105 transition duration-300">
          <div className="p-6">
            <div className="flex justify-between mb-4 items-center">
              <h5 className="text-xl font-bold text-gray-900">Hello</h5>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-500 transition duration-200 focus:ring-4 focus:ring-blue-300">
                Click
              </button>
            </div>
            <hr className="my-4" />
            <p className="mb-4 text-gray-700">Business Phone Number</p>
            <p className="mb-4 text-gray-700">Phone Number ID: jdjbdfjbfbfh</p>
            <p className="mb-4 text-gray-700">App ID: bjdwbdj</p>
            <p className="mb-4 text-gray-700">Access Token: nwnjwjdb</p>
          </div>
        </div>

        {show && (
          <ConnectAccountModal onClose={handleClose} />
        )}
      </div>
    </>
  );
};

export default ConnectAccount;
