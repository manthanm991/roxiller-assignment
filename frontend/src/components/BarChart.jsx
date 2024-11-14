import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const BarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-3 rounded shadow-sm">
        <h3 className="h5 font-weight-bold mb-3">Price Range Distribution</h3>
        <p>No data available to display.</p>
      </div>
    );
  }
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h3 className="h5 font-weight-bold mb-3">Price Range Distribution</h3>
      <RechartsBarChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </RechartsBarChart>
    </div>
  );
};

export default BarChart;