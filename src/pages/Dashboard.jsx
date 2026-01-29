import { useState, useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { dashboardAPI } from '../services/api';
import { VIEW_TYPES } from '../utils/constants';
import IncomeExpenseChart from '../components/Charts/IncomeExpenseChart';
import SummarySection from '../components/SummarySection';

const Dashboard = ({ refreshTrigger }) => {
    const [viewType, setViewType] = useState(VIEW_TYPES.MONTHLY);
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, [viewType, refreshTrigger]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            let data;

            switch (viewType) {
                case VIEW_TYPES.WEEKLY:
                    data = await dashboardAPI.getWeekly();
                    break;
                case VIEW_TYPES.YEARLY:
                    data = await dashboardAPI.getYearly();
                    break;
                case VIEW_TYPES.MONTHLY:
                default:
                    data = await dashboardAPI.getMonthly();
                    break;
            }

            setDashboardData(data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setDashboardData(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-display font-bold text-gradient mb-2">
                        Dashboard
                    </h1>
                    <p className="text-slate-400">
                        Visualize your financial data and track your spending patterns
                    </p>
                </div>

                {/* View Type Selector */}
                <div className="glass-card p-2 flex items-center gap-2">
                    <FaCalendarAlt className="text-primary-400 ml-2" />
                    <select
                        value={viewType}
                        onChange={(e) => setViewType(e.target.value)}
                        className="bg-transparent border-none text-white font-semibold focus:outline-none cursor-pointer pr-4"
                    >
                        <option value={VIEW_TYPES.WEEKLY}>Weekly</option>
                        <option value={VIEW_TYPES.MONTHLY}>Monthly</option>
                        <option value={VIEW_TYPES.YEARLY}>Yearly</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500"></div>
                </div>
            ) : (
                <>
                    {/* Income vs Expense Chart */}
                    <div className="glass-card p-6">
                        <h2 className="text-2xl font-display font-bold text-white mb-6">
                            Income vs Expense
                        </h2>
                        <IncomeExpenseChart data={dashboardData} viewType={viewType} />
                    </div>

                    {/* Summary Section */}
                    <SummarySection refreshTrigger={refreshTrigger} />
                </>
            )}
        </div>
    );
};

export default Dashboard;
