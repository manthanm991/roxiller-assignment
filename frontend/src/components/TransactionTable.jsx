import React from 'react';

const TransactionTable = ({ transactions, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="bg-white rounded shadow-sm">
      {transactions.length === 0 ? (
        <div className="p-4 text-center">
          <h5>No transactions found for this month.</h5>
        </div>
      ) : (
        <>
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Sold</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.title}</td>
                  <td>{transaction.description}</td>
                  <td>${transaction.price}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.sold ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-outline-secondary"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-outline-secondary"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionTable;