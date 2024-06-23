import React from 'react';
import { LineChart, Line } from 'recharts';

const DashChart3 = () => {
    const data = [
        {name: 'G1', value :12},
        {name: 'G2', value :89},
        {name: 'G3', value :90},
        {name: 'G5', value :105},
        {name: 'G6', value :360},
          
            
      ];
  return (
    <LineChart width={150} height={50} data={data}>
          <Line type="monotone" dataKey="value" stroke="var(--whatsapp)" strokeWidth={2} />
        </LineChart>

  )
}

export default DashChart3