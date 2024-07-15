import React, { useState, useEffect } from 'react';
import CampaignTemplates from './CampaignTemplates';
import { RxUpdate } from "react-icons/rx";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const CommerceSettings = () => {
    const [groups, setGroups] = useState([]);
    const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('https://ci4backend.smartyuppies.com/GroupController/groups', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: userData?.username }),
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }

                const data = await response.json();
                setGroups(data.distinctGroupsData || []);
            } catch (error) {
                console.error('Error fetching groups:', error);
                setGroups([]); // Ensure groups is always an array
            }
        };

        if (userData) {
            fetchGroups();
        }
    }, [userData]);

    const [formData, setFormData] = useState({
        campaignName: '',
        campaignOwner: '',
        phoneNumber: '',
        audience: '',
        group: '',
        lead: ''
    });
    const navigate = useNavigate();
    const [selectedTemplate, setSelectedTemplate] = useState([]); // State to hold selected template
    const [error, setError] = useState(''); // State to hold error message

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleGroupChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            audience: '' // Reset the audience state when group is selected
        });
    };

    const onSelectTemplate = (template) => {
        setSelectedTemplate(template);
        setError(''); // Clear any previous error message
        console.log('Selected Template:', selectedTemplate ?? null);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        if (selectedTemplate.length === 0) {
            setError('Please select a template before proceeding.');
        } else {
            navigate('/campaignSelect', { state: { userData, formData, selectedTemplate } });
        }
    };

    return (
        <div className="flex flex-col  md:flex-row gap-10 lg:h-screen  md:overflow-scroll">
            {/* Left side - Form */}
            <div className="w-[100px] md:w-1/2 md:h-4/5  shadow-lg bg-white  rounded-xl border-solid border flex flex-col justify-center items-center p-4 md:p-8 lg:overflow-y-hidden md:overflow-y-auto">
                <h2 className="text-xl md:text-3xl  mb-4 md:mb-6 text-center mt-4">Create <span className='text-green-600'>Campaign</span></h2>
                {error && (
                        <div className="mb-3 md:mb-4 text-red-500 text-sm font-bold">
                            {error}
                        </div>
                    )}
                <form onSubmit={handleSubmit} className="w-full max-w-sm">
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-md mb-1 md:mb-2" htmlFor="campaignName">
                            New Campaign Name:-
                        </label>
                        <input
                            className="appearance-none text-sm border-x-0  border-t-0 border- rounded-sm w-full py-3 px-3 text-gray-700 leading-tight focus:ring-gray-100 focus:outline-none focus:ring-white"
                            id="campaignName"
                            name="campaignName"
                            type="text"
                            value={formData.campaignName}
                            onChange={handleChange}
                            placeholder="Enter Campaign Name"
                            required
                        />
                    </div>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-md  mb-1 md:mb-2" htmlFor="campaignOwner">
                            Campaign Owner:-
                        </label>
                        <input
                            className=" appearance-none text-sm border-x-0  border-t-0 border rounded-sm w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-white"
                            id="campaignOwner"
                            name="campaignOwner"
                            type="text"
                            value={formData.campaignOwner}
                            onChange={handleChange}
                            placeholder="Enter Campaign Owner"
                            required
                        />
                    </div>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-md  mb-1 md:mb-2" htmlFor="phoneNumber">
                            From Phone Number:-
                        </label>
                        <input
                            className=" appearance-none text-sm border-x-0  border-t-0 border rounded-sm w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-white focus:ring-white" 
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={userData.phone_number}
                            onChange={handleChange}
                            placeholder="Enter Phone Number"
                            required
                        />
                    </div>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-md mb-1 text-md md:mb-2">Groups:-</label>
                        <select
                            className=" appearance-none text-sm border-x-0  border-t-0 border- rounded-sm w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-white"
                            name="group"
                            value={formData.group}
                            onChange={handleGroupChange}
                        >
                            <option value="">Select Group</option>
                            {groups.map((group, index) => (
                                <option key={index} value={group.groupname}>{group.groupname}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-md mb-1 md:mb-2">Select Audience:-</label>
                        <div className="flex flex-wrap">
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    className="form-radio text-green-500"
                                    name="audience"
                                    value="AllContacts"
                                    checked={formData.audience === 'AllContacts'}
                                    onChange={handleChange}
                                    
                                />
                                <span className="ml-2 text-sm">All Contacts</span>
                            </label>
                        </div>
                    </div>
                    {/* Error Message */}
                  
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-green-700 hover:bg-green-800 text-white flex items-center text-sm justify-center py-2 px-16 rounded-lg focus:outline-none w-full md:w-auto"
                            type="submit"
                        >
                           Start Campaign
                            <RxUpdate className="ml-2" />
                        </button>
                       
                    </div>
                </form>
            </div>
            {/* Right side - Campaign Templates */}
            <div className="w-full md:w-1/2 md:h-4/5 shadow-lg bg-white border-gray-200 rounded-xl border-solid border overflow-y-auto mt-4 md:mt-0 p-4 md:p-8">
                <CampaignTemplates onSelectTemplate={onSelectTemplate} />
            </div>
        </div>
    );
};

export default CommerceSettings;
