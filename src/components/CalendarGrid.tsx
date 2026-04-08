import React from 'react';
// import { motion, AnimatePresence } from 'motion/react';
import { DAYS_OF_WEEK, getMonthData, isSameDay, isBetween, formatDateKey } from '../utils';
import DayCell from './DayCell';
import type { DateRange, Notes } from '../types';

interface CalendarGridProps {
  currentDate: Date;
  range: DateRange;
  notes: Notes;
  onDateClick: (date: Date) => void;
  onDateHover?: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  currentDate, 
  range, 
  notes, 
  onDateClick, 
  onDateHover = () => {} 
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = getMonthData(year, month);
  const today = new Date();

  return (
    <div className="flex-1">
      <div className="calendar-grid mb-2">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="text-center py-2 text-xs font-bold text-stone-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-grid border-b border-r border-stone-100 rounded-xl overflow-hidden shadow-sm bg-white">
        {days.map((dayObj, idx) => {
          const date = new Date(dayObj.year, dayObj.month, dayObj.day);
          const dateKey = formatDateKey(date);
          
          return (
            <DayCell
              key={`${dayObj.year}-${dayObj.month}-${dayObj.day}-${idx}`}
              date={date}
              isCurrentMonth={dayObj.isCurrentMonth}
              isToday={isSameDay(date, today)}
              isStart={isSameDay(date, range.start)}
              isEnd={isSameDay(date, range.end)}
              isInRange={isBetween(date, range.start, range.end)}
              hasNote={Object.keys(notes).some(key => dateKey && key.startsWith(dateKey))}
              onClick={onDateClick}
              onMouseEnter={onDateHover}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;
