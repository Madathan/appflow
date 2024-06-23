import React from 'react';
import order from "../assests/whats_commerce.1.png";

const CommerceSettings = () => {

    return (
        <div className="flex flex-col md:flex-row h-2/3">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-gray-100 p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold mb-6">Configure Commerce Settings</h2>
                <form className="w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 font-sans	" htmlFor="input1">
                        Order Form ID
                        </label>
                        <input
                            className="shadow appearance-none  text-sm border-none rounded-xl w-full py-2 px-3 text-gray-700 leading-tight ring-none outline-none focus:outline-none"
                            id="input1"
                            type="text"
                            placeholder="Enter Input 1"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2  font-sans	" htmlFor="input2">
                        Payment Type
                        </label>
                        <input
                            className="shadow appearance-none text-sm border-none rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="input2"
                            type="text"
                            placeholder="Enter Input 2"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2 font-sans" htmlFor="input3">
                        Payment Config ID                        </label>
                        <input
                            className="shadow appearance-none  text-sm border-none rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="input3"
                            type="text"
                            placeholder="Enter Input 3"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold font-mono py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Update Settings
                        </button>
                    </div>
                </form>
            </div>

            {/* Right side - Image */}
            <div className="hidden md:block w-full md:w-1/2">
                <img
                    src={order} // Replace with your image URL
                    alt="Commerce settings"
                    className="object-cover w-full h-full rounded-xl"
                />
            </div>
        </div>
    );
};

export default CommerceSettings;
