import React, { useState, useEffect } from 'react';
import TemplateFetch from './TempalateFeach';
import Cookies from 'js-cookie';

const Templates = () => {
  const [templates, setTemplates] = useState([]);
  const userData = Cookies.get('userData') ? JSON.parse(Cookies.get('userData')) : null;

  useEffect(() => {
    const fetchData = async () => {
      if (userData) {
        try {
          const response = await fetch('https://ci4backend.smartyuppies.com/Templates/fetchTemplate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              access_token: userData.access_token,
              app_id: userData.app_id,
              username: userData.username
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          console.log("Template data:", result.data);
          setTemplates(result.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [userData]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Templates</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <TemplateFetch key={index} template={template} />
        ))}
      </div>
    </div>
  );
};

export default Templates;
