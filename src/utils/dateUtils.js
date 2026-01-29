import { format, parseISO, differenceInHours, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

/**
 * Format a date to a readable string
 * @param {Date|string} date - Date to format
 * @param {string} formatStr - Format string (default: 'MMM dd, yyyy')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
};

/**
 * Format a date with time
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string with time
 */
export const formatDateTime = (date) => {
    return formatDate(date, 'MMM dd, yyyy hh:mm a');
};

/**
 * Check if a transaction can be edited (within 12 hours)
 * @param {Date|string} createdAt - Transaction creation date
 * @returns {boolean} True if can be edited
 */
export const canEditTransaction = (createdAt) => {
    if (!createdAt) return false;
    const created = typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;
    const now = new Date();
    const hoursDiff = differenceInHours(now, created);
    return hoursDiff < 12;
};

/**
 * Get remaining time to edit in hours
 * @param {Date|string} createdAt - Transaction creation date
 * @returns {number} Remaining hours
 */
export const getRemainingEditTime = (createdAt) => {
    if (!createdAt) return 0;
    const created = typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;
    const now = new Date();
    const hoursDiff = differenceInHours(now, created);
    return Math.max(0, 12 - hoursDiff);
};

/**
 * Get date range for current week
 * @returns {Object} Start and end dates
 */
export const getCurrentWeekRange = () => {
    const now = new Date();
    return {
        start: startOfWeek(now, { weekStartsOn: 1 }), // Monday
        end: endOfWeek(now, { weekStartsOn: 1 }),
    };
};

/**
 * Get date range for current month
 * @returns {Object} Start and end dates
 */
export const getCurrentMonthRange = () => {
    const now = new Date();
    return {
        start: startOfMonth(now),
        end: endOfMonth(now),
    };
};

/**
 * Get date range for current year
 * @returns {Object} Start and end dates
 */
export const getCurrentYearRange = () => {
    const now = new Date();
    return {
        start: startOfYear(now),
        end: endOfYear(now),
    };
};

/**
 * Convert date to API format
 * @param {Date|string} date - Date to convert
 * @returns {string} API formatted date
 */
export const toAPIFormat = (date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, "yyyy-MM-dd'T'HH:mm:ss");
};

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const now = new Date();
    const hours = differenceInHours(now, dateObj);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;

    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
};
