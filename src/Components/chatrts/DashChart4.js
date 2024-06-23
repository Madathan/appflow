import React from 'react';
import { LineChart, Line } from 'recharts';

const DashChart4 = () => {
    const data = [
        {name: 'G1', value :351},
        {name: 'G2', value :547},
        {name: 'G3', value :450},
        {name: 'G5', value :547},
        {name: 'G6', value :600},
          
            
      ];
  return (
    <LineChart width={150} height={50} data={data}>
          <Line type="monotone" dataKey="value" stroke="var(--whatsapp)" strokeWidth={2} />
        </LineChart>

  )
}

export default DashChart4;