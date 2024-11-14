import React from 'react';

const MonthSelector = ({ selectedMonth, onChange }) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    return (
      <select
        value={selectedMonth}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
    );
};

export default MonthSelector;