const Transaction = require('../models/Transaction');
const axios = require('axios');

const initializeDB = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        if (!response || !response.data) {
            throw new Error('Invalid response from the data source');
        }
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data, status code: ${response.status}`);
        }
        await Transaction.deleteMany({});
        await Transaction.insertMany(response.data);
        res.json({ message: 'Database initialized successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const { month, search = '', page = 1, perPage = 10 } = req.query;
        const monthNumber = new Date(`${month} 1`).getMonth() + 1;

        const query = {
            $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
        };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { price: isNaN(search) ? undefined : Number(search) }
            ].filter(Boolean);
        }

        const total = await Transaction.countDocuments(query);
        const transactions = await Transaction.find(query).sort({ dateOfSale: 1 }).skip((page - 1) * perPage).limit(perPage);

        res.json({
            transactions,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / perPage)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;
        const monthNumber = new Date(`${month} 1`).getMonth() + 1;

        const query = {
            $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
        };

        const stats = await Transaction.aggregate([
            { $match: query },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: '$price' },
                    totalSoldItems: { $sum: { $cond: ['$sold', 1, 0] } },
                    totalNotSoldItems: { $sum: { $cond: ['$sold', 0, 1] } }
                }
            }
        ]);

        res.json(stats[0] || {
            totalSaleAmount: 0,
            totalSoldItems: 0,
            totalNotSoldItems: 0
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;
        const monthNumber = new Date(`${month} 1`).getMonth() + 1;

        const ranges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity }
        ];

        const query = {
            $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
        };

        const transactions = await Transaction.find(query);

        const chartData = ranges.map(range => ({
            range: `${range.min} - ${range.max === Infinity ? 'above' : range.max}`,
            count: transactions.filter(t =>
                t.price >= range.min && t.price <= range.max
            ).length
        }));

        res.json(chartData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;
        const monthNumber = new Date(`${month} 1`).getMonth() + 1;

        const query = {
            $expr: { $eq: [{ $month: '$dateOfSale' }, monthNumber] }
        };

        const categoryData = await Transaction.aggregate([
            { $match: query },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(categoryData.map(item => ({
            category: item._id,
            count: item.count
        })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;

        const [statistics, barChart, pieChart] = await Promise.all([
            axios.get(`/api/statistics?month=${month}`),
            axios.get(`/api/bar-chart?month=${month}`),
            axios.get(`/api/pie-chart?month=${month}`)
        ]);

        res.json({
            statistics: statistics.data,
            barChart: barChart.data,
            pieChart: pieChart.data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { initializeDB, getTransactions, getStatistics, getBarChartData, getPieChartData, getCombinedData };
