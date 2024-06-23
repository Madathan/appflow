import React from 'react';
import { LineChart, Line } from 'recharts';

const DashChart2 = () => {
    const data = [
        {name: 'G1', value :0},
        {name: 'G2', value :36},
        {name: 'G3', value :18},
        {name: 'G5', value :49},
        {name: 'G6', value :68},
          
            
      ];
  return (
    <LineChart width={150} height={50} data={data}>
          <Line type="monotone" dataKey="value" stroke="var(--whatsapp)" strokeWidth={2} />
        </LineChart>

  )
}

export default DashChart2