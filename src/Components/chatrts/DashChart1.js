import React from 'react';
import { LineChart, Line } from 'recharts';

const DashChart1 = () => {
    const data = [
        {name: 'G1', value :200},
        {name: 'G2', value :400},
        {name: 'G3', value :300},
        {name: 'G5', value :600},
        {name: 'G6', value :650},
     
      ];
  return (
    <LineChart width={150} height={50} data={data}>
          <Line type="monotone" dataKey="value" stroke="var(--whatsapp)" strokeWidth={2} />
        </LineChart>

  )
}

export default DashChart1