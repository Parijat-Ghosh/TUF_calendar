import type { DayData } from './types';

/**
 * Calendar Utility Functions
 */

export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const formatDateKey = (date: Date | string | number | null): string | null => {
  if (!date) return null;
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const formatRangeKey = (start: Date | string | number | null, end: Date | string | number | null): string | null => {
  if (!start || !end) return null;
  const s = new Date(start);
  const e = new Date(end);
  
  // Ensure start is always before end in the key
  const [first, second] = s < e ? [s, e] : [e, s];
  
  return `${formatDateKey(first)}_to_${formatDateKey(second)}`;
};

export const isDateInRangeKey = (date: Date | string | number | null, rangeKey: string | null): boolean => {
  if (!date || !rangeKey) return false;
  const [startStr, endStr] = rangeKey.split('_to_');
  
  const d = new Date(date).setHours(0, 0, 0, 0);
  const s = new Date(startStr).setHours(0, 0, 0, 0);
  const e = new Date(endStr).setHours(0, 0, 0, 0);
  
  return d >= s && d <= e;
};

export const isSameDay = (d1: Date | null, d2: Date | null): boolean => {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export const isBetween = (date: Date | null, start: Date | null, end: Date | null): boolean => {
  if (!date || !start || !end) return false;
  const d = new Date(date).setHours(0, 0, 0, 0);
  const s = new Date(start).setHours(0, 0, 0, 0);
  const e = new Date(end).setHours(0, 0, 0, 0);
  
  const min = Math.min(s, e);
  const max = Math.max(s, e);
  
  return d > min && d < max;
};

export const getMonthData = (year: number, month: number): DayData[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  
  const days: DayData[] = [];
  
  // Padding from previous month
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false
    });
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true
    });
  }
  
  // Padding for next month
  const remainingCells = 42 - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      day: i,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false
    });
  }
  
  return days;
};
