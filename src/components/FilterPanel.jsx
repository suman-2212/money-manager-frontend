import { useState } from 'react';
import { FaCalendarAlt, FaFilter, FaTimes } from 'react-icons/fa';

const FilterPanel = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        startDate: '',
        endDate: '',
        category: '',
        type: 'all'
    });
    const [isExpanded, setIsExpanded] = useState(false);

    const categories = [
        'Salary', 'Freelance', 'Investment', 'Business', 'Gift',
        'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment',
        'Health', 'Education', 'Other'
    ];

    const handleChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            startDate: '',
            endDate: '',
            category: '',
            type: 'all'
        };
        setFilters(clearedFilters);
        onFilterChange?.(clearedFilters);
    };

    const hasActiveFilters = filters.startDate || filters.endDate || filters.category || filters.type !== 'all';

    return (
        <div className="glass-card p-6 sm:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 gap-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-3 text-gray-900 font-bold hover:text-gray-700 transition-colors flex-shrink-0"
                >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)',
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)'
                        }}>
                        <FaFilter className="text-white text-lg" />
                    </div>
                    <span className="text-xl sm:text-2xl">Filters</span>
                    {hasActiveFilters && (
                        <span className="badge-primary text-sm px-3 py-1">Active</span>
                    )}
                </button>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-base text-red-600 hover:text-red-700 font-semibold flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
                    >
                        <FaTimes />
                        <span>Clear All</span>
                    </button>
                )}
            </div>

            {/* Filter Options */}
            {isExpanded && (
                <div className="space-y-5 sm:space-y-6 pt-6 border-t-2 border-gray-300">
                    {/* Type Filter */}
                    <div>
                        <label className="block text-base font-bold text-gray-900 mb-3">
                            Transaction Type
                        </label>
                        <div className="grid grid-cols-3 gap-3 sm:gap-4">
                            <button
                                onClick={() => handleChange('type', 'all')}
                                className={`py-3 px-4 rounded-lg text-base font-semibold transition-all ${filters.type === 'all'
                                    ? 'bg-gray-800 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => handleChange('type', 'income')}
                                className={`py-3 px-4 rounded-lg text-base font-semibold transition-all ${filters.type === 'income'
                                    ? 'bg-gray-700 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Income
                            </button>
                            <button
                                onClick={() => handleChange('type', 'expense')}
                                className={`py-3 px-4 rounded-lg text-base font-semibold transition-all ${filters.type === 'expense'
                                    ? 'bg-gray-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Expense
                            </button>
                        </div>
                    </div>

                    {/* Date Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-base font-bold text-gray-900 mb-3">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                value={filters.startDate}
                                onChange={(e) => handleChange('startDate', e.target.value)}
                                className="input-field text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-base font-bold text-gray-900 mb-3">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                value={filters.endDate}
                                onChange={(e) => handleChange('endDate', e.target.value)}
                                className="input-field text-base"
                            />
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                        <label htmlFor="category" className="block text-base font-bold text-gray-900 mb-3">
                            Category
                        </label>
                        <select
                            id="category"
                            value={filters.category}
                            onChange={(e) => handleChange('category', e.target.value)}
                            className="select-field text-base"
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterPanel;
