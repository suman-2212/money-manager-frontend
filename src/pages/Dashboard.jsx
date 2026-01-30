import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaPlus, FaChartLine, FaTrophy, FaArrowUp, FaArrowDown, FaWallet, FaPercentage } from 'react-icons/fa';
import { dashboardAPI, transactionAPI } from '../services/api';
import TransactionList from '../components/TransactionList';
import FilterPanel from '../components/FilterPanel';
import AddTransactionModal from '../components/AddTransactionModal';
import IncomeExpenseChart from '../components/Charts/IncomeExpenseChart';
import AdvancedAnalytics from '../components/AdvancedAnalytics';

const Dashboard = ({ refreshTrigger }) => {
    const [viewType, setViewType] = useState('monthly');
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        transactionCount: 0
    });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [localRefresh, setLocalRefresh] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetchDashboardData();
        fetchChartData();
        fetchTransactions();
    }, [viewType, refreshTrigger, localRefresh]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const data = await dashboardAPI.getSummary();
            setStats({
                totalIncome: data.totalIncome || 0,
                totalExpense: data.totalExpense || 0,
                balance: data.balance || 0,
                transactionCount: data.transactionCount || 0
            });
        } catch (err) {
            console.error('Failed to fetch dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchChartData = async () => {
        try {
            const transactions = await transactionAPI.getAll();
            const monthlyData = processTransactionsForChart(transactions.transactions || []);
            setChartData(monthlyData);
        } catch (err) {
            console.error('Failed to fetch chart data:', err);
        }
    };

    const processTransactionsForChart = (transactions) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();

        const monthlyData = months.map((month, index) => ({
            month,
            income: 0,
            expense: 0
        }));

        transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            if (date.getFullYear() === currentYear) {
                const monthIndex = date.getMonth();
                if (transaction.type === 'income') {
                    monthlyData[monthIndex].income += transaction.amount;
                } else {
                    monthlyData[monthIndex].expense += transaction.amount;
                }
            }
        });

        return monthlyData.slice(0, 6); // Show last 6 months
    };

    const handleAddSuccess = () => {
        setLocalRefresh(prev => prev + 1);
    };

    const fetchTransactions = async () => {
        try {
            const data = await transactionAPI.getAll();
            setTransactions(data.transactions || data || []);
        } catch (err) {
            console.error('Failed to fetch transactions:', err);
        }
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const savingsRate = stats.totalIncome > 0
        ? ((stats.balance / stats.totalIncome) * 100).toFixed(1)
        : 0;

    return (
        <div className="space-y-6 lg:space-y-8">
            {/* Header with Clean Design */}
            <div className="glass-card p-8 lg:p-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
                    {/* Title Section */}
                    <div className="flex-1">
                        <h1 className="text-4xl lg:text-5xl font-extrabold gradient-text mb-3">
                            Dashboard
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl whitespace-nowrap">
                            Visualize your financial data and track your spending patterns
                        </p>
                    </div>

                    {/* View Type Selector */}
                    <div className="flex items-center gap-3 glass-card p-4 border-2 border-gray-300 rounded-xl min-w-[180px]">
                        <FaCalendarAlt className="text-gray-700 text-xl flex-shrink-0" />
                        <select
                            value={viewType}
                            onChange={(e) => setViewType(e.target.value)}
                            className="bg-transparent border-none text-gray-900 font-bold focus:outline-none cursor-pointer text-lg flex-1"
                        >
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Stats Overview with Enhanced Design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
                <div className="stat-card stat-card-income flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
                            }}>
                            <FaArrowUp className="text-white text-xl" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">Total Income</h3>
                    </div>
                    <div className="flex-1 flex items-end">
                        {loading ? (
                            <div className="h-8 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg loading-shimmer" />
                        ) : (
                            <p className="text-2xl sm:text-3xl font-bold gradient-text-success break-words">{formatAmount(stats.totalIncome)}</p>
                        )}
                    </div>
                </div>

                <div className="stat-card stat-card-expense flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
                            }}>
                            <FaArrowDown className="text-white text-xl" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">Total Expense</h3>
                    </div>
                    <div className="flex-1 flex items-end">
                        {loading ? (
                            <div className="h-8 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg loading-shimmer" />
                        ) : (
                            <p className="text-2xl sm:text-3xl font-bold gradient-text-danger break-words">{formatAmount(stats.totalExpense)}</p>
                        )}
                    </div>
                </div>

                <div className="stat-card stat-card-balance flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, #1a202c 0%, #000000 100%)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
                            }}>
                            <FaWallet className="text-white text-xl" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">Net Balance</h3>
                    </div>
                    <div className="flex-1 flex items-end">
                        {loading ? (
                            <div className="h-8 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg loading-shimmer" />
                        ) : (
                            <p className={`text-2xl sm:text-3xl font-bold break-words ${stats.balance >= 0 ? 'gradient-text' : 'gradient-text-danger'}`}>
                                {formatAmount(stats.balance)}
                            </p>
                        )}
                    </div>
                </div>

                <div className="stat-card flex flex-col h-full" style={{
                    background: 'linear-gradient(135deg, rgba(74, 85, 104, 0.1) 0%, rgba(45, 55, 72, 0.05) 100%)',
                    borderLeft: '4px solid #4a5568'
                }}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                                background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
                            }}>
                            <FaPercentage className="text-white text-xl" />
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wide">Savings Rate</h3>
                    </div>
                    <div className="flex-1 flex items-end">
                        {loading ? (
                            <div className="h-8 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg loading-shimmer" />
                        ) : (
                            <p className="text-2xl sm:text-3xl font-bold break-words" style={{
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text'
                            }}>
                                {savingsRate}%
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="glass-card p-6 lg:p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3 mb-6">
                    <FaChartLine className="text-2xl sm:text-3xl gradient-text flex-shrink-0" />
                    <h2 className="text-xl sm:text-2xl font-bold gradient-text">
                        Income vs Expense Trend
                    </h2>
                </div>
                <div className="w-full">
                    <IncomeExpenseChart data={chartData} />
                </div>
            </div>

            {/* Filter Panel */}
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <FilterPanel />
            </div>

            {/* Advanced Analytics */}
            <div className="animate-slide-up" style={{ animationDelay: '0.35s' }}>
                <AdvancedAnalytics transactions={transactions} />
            </div>

            {/* Transaction List */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <TransactionList refreshTrigger={refreshTrigger + localRefresh} />
            </div>

            {/* Add Transaction Modal */}
            <AddTransactionModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSuccess={handleAddSuccess}
            />

            {/* Floating Action Button */}
            <button
                onClick={() => setShowAddModal(true)}
                className="fab"
                title="Add Transaction"
            >
                <FaPlus />
            </button>
        </div>
    );
};

export default Dashboard;
