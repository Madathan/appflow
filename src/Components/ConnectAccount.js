import React from "react";
import { ImLocation2 } from "react-icons/im";
import order from "../assests/task.png";
const ConnectAccount = () => {
  return (
    <>
    <div className="">
   <button className=" bg-green-500 rounded-lg p-2 text-white relative left-10" > Create More account</button>
    </div>

    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-10 justify-center p-10">
      <div className="max-w-lg rounded-lg   shadow-lg bg-white border-solid border-gray-200 border hover:scale-110 transition duration-700">
        <div className="flex justify-center">
        <img
          className="object-cover h-48 w-96 rounded-full w-2/3 h-48 "
          src={order}
          alt="hellow"
        />
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl text-center font-bold text-gray-900 ">
            hellow
          </h5>
          <p className="mb-4 font-normal text-gray-700 ">description</p>
          <p>jskwndkwdwj dwnj 
             jwk cj centernsjcnjncn
          </p>
        </div>
      </div>
      <div className="max-w-lg rounded-lg  shadow-lg bg-white border-solid border-gray-200 border hover:scale-110 transition duration-700">
        <div className="p-6">
          <div className="flex justify-between">
            <h5 className="text-xl font-bold text-gray-900 ">hellow</h5>
            <button className="px-8 py-3 text-sm font-medium text-white bg-green-700 rounded-lg group-hover:bg-white group-hover:text-green-700 focus:ring-4 focus:ring-blue-300">
              click
            </button>
          </div>
          <hr className="my-4" />
          <p className="mb-4 font-normal text-gray-700">
            Business Phone Number
          </p>
          <p className="mb-4 font-normal text-gray-700 ">Phone Number Id:</p>
          <p className="mb-4 font-normal text-gray-700 ">App ID:</p>
          <p className="mb-4 font-normal text-gray-700 ">Access Token:</p>
        </div>
      </div>
      <div className="max-w-lg rounded-lg  shadow-lg bg-white border-solid border-gray-200 border hover:scale-110 transition duration-700">
        <div className="p-6">
          <div className="flex mb-4">
            <p className="font-normal text-gray-700 ">About:</p>
            <ImLocation2 className="text-green-500 " />
          </div>
          <div className="flex mb-4">
            <p className="font-normal text-gray-700 ">Address:</p>
            <ImLocation2 className="text-green-500 " />
          </div>
          <p className="mb-4 font-normal text-gray-700 ">Websites:</p>
        </div>
      </div>

      <div className="max-w-lg rounded-lg  shadow-lg bg-white border-solid border-gray-200 border hover:scale-110 transition duration-700">
        <div className="p-6">
          <div className="flex justify-between">
            <h5 className="text-xl font-bold text-gray-900 ">hellow</h5>
            <button className="px-8 py-3 text-sm font-medium text-center font-sans	 text-white bg-green-600 rounded-lg group-hover:bg-white group-hover:text-green-700 focus:ring-4 focus:ring-blue-300">
              <span >click</span>
            </button>
          </div>
          <hr className="my-4" />
          <p className="mb-4 font-normal text-gray-700 font-serif	 ">
            Business Phone Number
          </p>
          <p className="mb-4 font-normal text-gray-700 group font-serif		  ">Phone Number Id:jdjbdfjbfbfh</p>
          <p className="mb-4 font-normal text-gray-700 font-serif		  ">App ID:bjdwbdj</p>
          <p className="mb-4 font-normal text-gray-700 font-serif		 ">Access Token:nwnjwjdb</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default ConnectAccount;
