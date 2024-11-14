import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const PieChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-3 rounded shadow-sm">
        <h3 className="h5 font-weight-bold mb-3">Category Distribution</h3>
        <p>No data available to display.</p>
      </div>
    );
  }
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h3 className="h5 font-weight-bold mb-3">Category Distribution</h3>
      <RechartsPieChart width={400} height={400}>
        <Pie data={data} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </RechartsPieChart>
    </div>
  );
};

export default PieChart;
