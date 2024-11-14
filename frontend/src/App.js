import React, { useState, useEffect } from 'react';
import { initializeDatabase, fetchTransactions, fetchStatistics, fetchBarChartData, fetchPieChartData } from './services/api';
import MonthSelector from './components/MonthSelector';
import SearchBox from './components/SearchBox';
import Statistics from './components/Statistics';
import TransactionTable from './components/TransactionTable';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAndFetchData = async () => {
      try {
        await initializeDatabase();
        const [transData, statsData, barData, pieData] = await Promise.all([
          fetchTransactions(selectedMonth, searchQuery, currentPage),
          fetchStatistics(selectedMonth),
          fetchBarChartData(selectedMonth),
          fetchPieChartData(selectedMonth),
        ]);

        setTransactions(transData.transactions);
        setTotalPages(transData.totalPages);
        setStatistics(statsData);
        setBarChartData(barData);
        setPieChartData(pieData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    initializeAndFetchData();
  }, [selectedMonth, searchQuery, currentPage]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-5">
      <div className="container">
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <MonthSelector selectedMonth={selectedMonth} onChange={handleMonthChange} />
          </div>
          <div className="col-md-6">
            <SearchBox value={searchQuery} onChange={handleSearch} />
          </div>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Statistics data={statistics} />
            <div className="mb-4">
              <TransactionTable transactions={transactions} currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
            </div>
            <div className="row g-4" style={{display:'flex', alignItems: 'self-start',justifyContent:'center', flexDirection: 'column'}}>
              <div className="bar-chart" style={{display:'flex', alignItems: 'self-start',justifyContent:'flex-start'}}>
                <BarChart data={barChartData} />
              </div>
              <div className="pie-chart" style={{display:'flex', alignItems: 'self-start',justifyContent:'flex-start'}}>
                <PieChart data={pieChartData} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;