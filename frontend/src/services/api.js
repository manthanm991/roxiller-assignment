const BASE_URL = process.env.REACT_APP_BASE_URL;

export const initializeDatabase = async () => {
    const response = await fetch(`${BASE_URL}/initialize-db`);
    if (!response.ok) {
        throw new Error('Failed to initialize the database');
    }
    return response.json();
};

export const fetchTransactions = async (month, search = '', page = 1) => {
    const response = await fetch(
        `${BASE_URL}/transactions?month=${month}&search=${search}&page=${page}`
    );
    return response.json();
};

export const fetchStatistics = async (month) => {
    const response = await fetch(`${BASE_URL}/statistics?month=${month}`);
    return response.json();
};

export const fetchBarChartData = async (month) => {
    const response = await fetch(`${BASE_URL}/bar-chart?month=${month}`);
    return response.json();
};

export const fetchPieChartData = async (month) => {
    const response = await fetch(`${BASE_URL}/pie-chart?month=${month}`);
    return response.json();
};
