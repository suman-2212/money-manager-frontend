import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { CATEGORIES, DIVISIONS } from '../utils/constants';
import { transactionAPI } from '../services/api';
import { canEditTransaction, getRemainingEditTime } from '../utils/dateUtils';

const EditTransactionModal = ({ transaction, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        type: transaction.type,
        amount: transaction.amount,
        category: transaction.category,
        division: transaction.division,
        description: transaction.description || '',
        date: new Date(transaction.date).toISOString().slice(0, 16),
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const canEdit = canEditTransaction(transaction.createdAt);
    const remainingHours = getRemainingEditTime(transaction.createdAt);

    useEffect(() => {
        if (!canEdit) {
            setError('This transaction can no longer be edited (12-hour limit exceeded)');
        }
    }, [canEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!canEdit) {
            setError('Cannot edit transaction after 12 hours');
            return;
        }

        setError('');

        if (!formData.amount || !formData.category) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            await transactionAPI.update(transaction._id, {
                ...formData,
                amount: parseFloat(formData.amount),
            });

            onSuccess();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update transaction');
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = CATEGORIES.filter(cat => cat.type === formData.type);

    return (
        <div className="modal-overlay flex items-center justify-center" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-display font-bold text-white">Edit Transaction</h2>
                        {canEdit && (
                            <p className="text-sm text-success-400 mt-1">
                                Editable for {remainingHours} more hour{remainingHours !== 1 ? 's' : ''}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-200"
                    >
                        <FaTimes className="text-slate-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-danger-500/20 border border-danger-500/30 text-danger-300 px-4 py-3 rounded-xl">
                            {error}
                        </div>
                    )}

                    {/* Type (Read-only) */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Type
                        </label>
                        <div className={`input-field cursor-not-allowed ${formData.type === 'income' ? 'text-success-400' : 'text-danger-400'}`}>
                            {formData.type === 'income' ? '💰 Income' : '💸 Expense'}
                        </div>
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Amount <span className="text-danger-400">*</span>
                        </label>
                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter amount"
                            className="input-field"
                            required
                            min="0"
                            step="0.01"
                            disabled={!canEdit}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Category <span className="text-danger-400">*</span>
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="select-field"
                            required
                            disabled={!canEdit}
                        >
                            <option value="">Select category</option>
                            {filteredCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Division */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Division
                        </label>
                        <select
                            name="division"
                            value={formData.division}
                            onChange={handleChange}
                            className="select-field"
                            disabled={!canEdit}
                        >
                            {DIVISIONS.map((div) => (
                                <option key={div.id} value={div.id}>
                                    {div.icon} {div.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Brief description (optional)"
                            className="input-field"
                            maxLength="100"
                            disabled={!canEdit}
                        />
                    </div>

                    {/* Date & Time */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2">
                            Date & Time
                        </label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="input-field"
                            required
                            disabled={!canEdit}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn-secondary flex-1"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary flex-1"
                            disabled={loading || !canEdit}
                        >
                            {loading ? 'Updating...' : 'Update Transaction'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTransactionModal;
