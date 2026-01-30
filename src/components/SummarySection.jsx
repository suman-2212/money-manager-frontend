import { useState, useEffect, useRef } from 'react';
import { dashboardAPI } from '../services/api';
import { FaArrowUp, FaArrowDown, FaWallet } from 'react-icons/fa';

const SummarySection = ({ refreshTrigger }) => {
    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        transactionCount: 0
    });
    const [loading, setLoading] = useState(true);
    const [displayValues, setDisplayValues] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    useEffect(() => {
        fetchSummary();
    }, [refreshTrigger]);

    // Animated counter effect
    useEffect(() => {
        const duration = 1000; // 1 second
        const steps = 60;
        const stepDuration = duration / steps;

        const animateValue = (start, end, key) => {
            const increment = (end - start) / steps;
            let current = start;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current += increment;

                if (step >= steps) {
                    current = end;
                    clearInterval(timer);
                }

                setDisplayValues(prev => ({
                    ...prev,
                    [key]: Math.round(current)
                }));
            }, stepDuration);

            return timer;
        };

        if (!loading) {
            const timers = [
                animateValue(displayValues.totalIncome, summary.totalIncome, 'totalIncome'),
                animateValue(displayValues.totalExpense, summary.totalExpense, 'totalExpense'),
                animateValue(displayValues.balance, summary.balance, 'balance')
            ];

            return () => timers.forEach(timer => clearInterval(timer));
        }
    }, [summary, loading]);

    const fetchSummary = async () => {
        setLoading(true);
        try {
            const data = await dashboardAPI.getSummary();
            setSummary({
                totalIncome: data.totalIncome || 0,
                totalExpense: data.totalExpense || 0,
                balance: data.balance || 0,
                transactionCount: data.transactionCount || 0
            });
        } catch (err) {
            console.error('Failed to fetch summary:', err);
        } finally {
            setLoading(false);
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

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 animate-slide-up">
            {/* Total Income */}
            <div className="stat-card stat-card-income group flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center icon-pulse flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                        }}>
                        <FaArrowUp className="text-white text-xl sm:text-2xl" />
                    </div>
                    <span className="badge-success text-xs sm:text-sm">Income</span>
                </div>
                <h3 className="text-gray-700 text-xs sm:text-sm font-bold mb-3 uppercase tracking-wide">Total Income</h3>
                <div className="flex-1 flex items-end">
                    {loading ? (
                        <div className="h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg loading-shimmer" />
                    ) : (
                        <p className="text-3xl sm:text-4xl font-bold gradient-text-success animate-count break-words">
                            {formatAmount(displayValues.totalIncome)}
                        </p>
                    )}
                </div>
                <div className="mt-4 flex items-center text-xs sm:text-sm font-semibold" style={{ color: '#059669' }}>
                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span>Earnings</span>
                </div>
            </div>

            {/* Total Expense */}
            <div className="stat-card stat-card-expense group flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center icon-pulse flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                        }}>
                        <FaArrowDown className="text-white text-xl sm:text-2xl" />
                    </div>
                    <span className="badge-danger text-xs sm:text-sm">Expense</span>
                </div>
                <h3 className="text-gray-700 text-xs sm:text-sm font-bold mb-3 uppercase tracking-wide">Total Expense</h3>
                <div className="flex-1 flex items-end">
                    {loading ? (
                        <div className="h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg loading-shimmer" />
                    ) : (
                        <p className="text-3xl sm:text-4xl font-bold gradient-text-danger animate-count break-words">
                            {formatAmount(displayValues.totalExpense)}
                        </p>
                    )}
                </div>
                <div className="mt-4 flex items-center text-xs sm:text-sm font-semibold" style={{ color: '#dc2626' }}>
                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                    </svg>
                    <span>Spending</span>
                </div>
            </div>

            {/* Balance */}
            <div className="stat-card stat-card-balance group flex flex-col h-full sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center icon-pulse flex-shrink-0"
                        style={{
                            background: 'linear-gradient(135deg, #1a202c 0%, #000000 100%)',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)'
                        }}>
                        <FaWallet className="text-white text-xl sm:text-2xl" />
                    </div>
                    <span className="badge-primary text-xs sm:text-sm">Balance</span>
                </div>
                <h3 className="text-gray-700 text-xs sm:text-sm font-bold mb-3 uppercase tracking-wide">Current Balance</h3>
                <div className="flex-1 flex items-end">
                    {loading ? (
                        <div className="h-10 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg loading-shimmer" />
                    ) : (
                        <p className={`text-3xl sm:text-4xl font-bold animate-count break-words ${displayValues.balance >= 0 ? 'gradient-text' : 'gradient-text-danger'
                            }`}>
                            {formatAmount(displayValues.balance)}
                        </p>
                    )}
                </div>
                <div className={`mt-4 flex items-center text-xs sm:text-sm font-semibold`}
                    style={{ color: displayValues.balance >= 0 ? '#2563eb' : '#dc2626' }}>
                    <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                    <span>
                        {displayValues.balance >= 0 ? 'Positive' : 'Negative'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default SummarySection;
