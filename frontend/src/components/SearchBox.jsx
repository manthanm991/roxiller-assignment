import React from 'react';

const SearchBox = ({ value, onChange }) => {
    return (
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search transactions..." className="form-control w-100" style={{ maxWidth: '400px' }}/>
    );
};

export default SearchBox;