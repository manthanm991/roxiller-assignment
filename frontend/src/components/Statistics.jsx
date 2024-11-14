import React from 'react';

const Statistics = ({ data }) => {
    return (
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="p-3 bg-white rounded shadow-sm">
            <h3 className="h5 font-weight-bold">Total Sale</h3>
            <p className="display-4">${data.totalSaleAmount.toFixed(2)}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-white rounded shadow-sm">
            <h3 className="h5 font-weight-bold">Sold Items</h3>
            <p className="display-4">{data.totalSoldItems}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 bg-white rounded shadow-sm">
            <h3 className="h5 font-weight-bold">Not Sold Items</h3>
            <p className="display-4">{data.totalNotSoldItems}</p>
          </div>
        </div>
      </div>
    );
};

export default Statistics;
