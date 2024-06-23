// CustomizeTeams.js
import React, { useState } from 'react';
import profilImage from '../assests/19021603.jpg';
import Card from './CumstomizeCard';

function CustomizeTeams() {
  const initialData = [
    { id: 1, name: 'wasim', password: 12345, image: profilImage },
    { id: 2, name: 'wasim', password: 12345, image: profilImage },
    { id: 3, name: 'wasim', password: 12345, image: profilImage },
    { id: 4, name: 'wasim', password: 12345, image: profilImage },
    { id: 4, name: 'wasim', password: 12345, image: profilImage }
  ];

  const [data, setData] = useState(initialData);

  const handleRemoveCard = (id) => {
    setData(data.filter(user => user.id !== id));
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10 z-0">
      {data.map(user => (
        <Card
          key={user.id}
          id={user.id}
          title={user.name}
          description={user.password}
          imageUrl={user.image}
          onRemove={handleRemoveCard}
        />
      ))}
    </div>
  );
}

export default CustomizeTeams;
