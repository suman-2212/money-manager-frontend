import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { CATEGORIES, DIVISIONS } from '../utils/constants';

const FilterPanel = ({ onApply, onClose }) => {
    const [filters, setFilters] = useState({
        type: '',
        category: '',
        division: '',
        startDate: '',
        endDate: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const handleApply = () => {
        // Remove empty filters
        const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
            if (value) acc[key] = value;
            return acc;
        }, {});

        onApply(activeFilters);
    };

    const handleReset = () => {
        setFilters({
            type: '',
            category: '',
            division: '',
            startDate: '',
            endDate: '',
        });
        onApply({});
    };

    const filteredCategories = filters.type
        ? CATEGORIES.filter(cat => cat.type === filters.type)
        : CATEGORIES;

    return (
        <div className="glass-card p-6 animate-slide-down">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-display font-bold text-white">Filters</h3>
                <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
                >
                    <FaTimes className="text-slate-400 text-sm" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Type Filter */}
                <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                        Type
                    </label>
                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleChange}
                        className="select-field"
                    >
                        <option value="">All Types</option>
                        <option value="income">💰 Income</option>
                        <option value="expense">💸 Expense</option>
                    </select>
                </div>

                {/* Category Filter */}
                <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                        Category
                    </label>
                    <select
                        name="category"
                        value={filters.category}
                        onChange={handleChange}
                        className="select-field"
                    >
                        <option value="">All Categories</option>
                        {filteredCategories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.icon} {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Division Filter */}
                <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                        Division
                    </label>
                    <select
                        name="division"
                        value={filters.division}
                        onChange={handleChange}
                        className="select-field"
                    >
                        <option value="">All Divisions</option>
                        {DIVISIONS.map((div) => (
                            <option key={div.id} value={div.id}>
                                {div.icon} {div.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Start Date */}
                <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                        Start Date
                    </label>
                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>

                {/* End Date */}
                <div>
                    <label className="block text-slate-300 font-semibold mb-2 text-sm">
                        End Date
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleChange}
                        className="input-field"
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
                <button
                    onClick={handleReset}
                    className="btn-secondary flex-1"
                >
                    Reset
                </button>
                <button
                    onClick={handleApply}
                    className="btn-primary flex-1"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;
