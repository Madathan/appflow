import React, { useState, useEffect } from 'react';
import CampaignTemplates from './CampaignTemplates';
import { RxUpdate } from "react-icons/rx";
import Select from '@mui/material/Select';
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

    const handleSubmit = () => {
        navigate('/campaignSelect', { state: { formData, selectedTemplate } });
    };

    const onSelectTemplate = (template) => {
        setSelectedTemplate(template);
        console.log('Selected Template:', selectedTemplate);
    };

    return (
        <div className="flex flex-col gap-10 md:flex-row h-screen overflow-hidden">
            {/* Left side - Form */}
            <div className="w-full md:w-1/2 h-4/5 shadow-lg bg-white border-gray-200 rounded-xl border-solid border flex flex-col justify-center items-center p-4 md:p-8 overflow-scroll">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center mt-16">Create <span className='text-green-600'>Campaign</span></h2>
                <form className="w-full max-w-sm">
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2" htmlFor="campaignName">
                            New Campaign Name
                        </label>
                        <input
                            className="appearance-none text-sm border-none bg-gray-100 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:ring-gray-100 focus:outline-none"
                            id="campaignName"
                            name="campaignName"
                            type="text"
                            value={formData.campaignName}
                            onChange={handleChange}
                            placeholder="Enter Order Form ID"
                        />
                    </div>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2" htmlFor="campaignOwner">
                            Campaign Owner
                        </label>
                        <input
                            className="shadow appearance-none text-sm border-none bg-gray-100 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                            id="campaignOwner"
                            name="campaignOwner"
                            type="text"
                            value={formData.campaignOwner}
                            onChange={handleChange}
                            placeholder="Enter Payment Type"
                        />
                    </div>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2" htmlFor="phoneNumber">
                            From Phone Number
                        </label>
                        <input
                            className="shadow appearance-none text-sm border-none bg-gray-100 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter Payment Config ID"
                        />
                    </div>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Select Audience:</label>
                        <div className="flex flex-wrap">
                            <label className="inline-flex items-center mr-4">
                                <input
                                    type="radio"
                                    className="form-radio text-green-500"
                                    name="audience"
                                    value="credit_card"
                                    checked={formData.audience === 'credit_card'}
                                    onChange={handleChange}
                                />
                                <span className="ml-2">Credit Card</span>
                            </label>
                        </div>
                    </div>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Groups:</label>
                        <select
                            className="shadow appearance-none text-sm border-none bg-gray-100 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                            name="group"
                            value={formData.group}
                            onChange={handleGroupChange}
                        >
                            <option value="">Select Shipping Method</option>
                            {groups.map((group, index) => (
                                <option key={index} value={group.groupname}>{group.groupname}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 md:mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">Leads:</label>
                        <select
                            className="shadow appearance-none text-sm border-none bg-gray-100 rounded-lg w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
                            name="lead"
                            value={formData.lead}
                            onChange={handleChange}
                        >
                            <option value="">Select Currency</option>
                            <option value="usd">USD - United States Dollar</option>
                            <option value="eur">EUR - Euro</option>
                            <option value="gbp">GBP - British Pound</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-green-700 hover:bg-green-800 text-white flex items-center justify-center py-2 px-16 rounded-lg focus:outline-none w-full md:w-auto"
                            type="button"
                            onClick={handleSubmit}
                        >
                            Update Settings
                            <RxUpdate className="ml-2" />
                        </button>
                    </div>
                </form>
            </div>
            {/* Right side - Campaign Templates */}
            <div className="w-full md:w-full h-4/5 shadow-lg bg-white border-gray-200 rounded-xl border-solid border overflow-y-auto mt-4 md:mt-0 p-4 md:p-8">
                <CampaignTemplates onSelectTemplate={onSelectTemplate} />
            </div>
        </div>
    );
};

export default CommerceSettings;
