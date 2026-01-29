import { format, parseISO, differenceInHours, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';

export const formatDate = (date, formatStr = 'MMM dd, yyyy') => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
};

export const formatDateTime = (date) => {
    return formatDate(date, 'MMM dd, yyyy hh:mm a');
};

export const canEditTransaction = (createdAt) => {
    if (!createdAt) return false;
    const created = typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;
    const now = new Date();
    const hoursDiff = differenceInHours(now, created);
    return hoursDiff < 12;
};

export const getRemainingEditTime = (createdAt) => {
    if (!createdAt) return 0;
    const created = typeof createdAt === 'string' ? parseISO(createdAt) : createdAt;
    const now = new Date();
    const hoursDiff = differenceInHours(now, created);
    return Math.max(0, 12 - hoursDiff);
};

export const getCurrentWeekRange = () => {
    const now = new Date();
    return {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 }),
    };
};

export const getCurrentMonthRange = () => {
    const now = new Date();
    return {
        start: startOfMonth(now),
        end: endOfMonth(now),
    };
};

export const getCurrentYearRange = () => {
    const now = new Date();
    return {
        start: startOfYear(now),
        end: endOfYear(now),
    };
};

export const toAPIFormat = (date) => {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, "yyyy-MM-dd'T'HH:mm:ss");
};

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
