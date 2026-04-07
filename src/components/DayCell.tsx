import React from 'react';
import { motion } from 'motion/react';

interface DayCellProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  hasNote: boolean;
  onClick: (date: Date) => void;
  onMouseEnter: (date: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({ 
  date, 
  isCurrentMonth, 
  isToday, 
  isStart, 
  isEnd, 
  isInRange, 
  hasNote,
  onClick,
  onMouseEnter
}) => {
  const day = date.getDate();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(date)}
      onMouseEnter={() => onMouseEnter(date)}
      className={`
        relative h-16 md:h-24 p-2 cursor-pointer border-t border-l border-stone-100
        flex flex-col items-center justify-center transition-all duration-300
        ${!isCurrentMonth ? 'text-stone-300 bg-stone-50/30' : 'text-ink'}
        ${isInRange ? 'bg-accent-soft/40' : ''}
        ${isStart ? 'rounded-l-xl bg-accent text-white z-10 shadow-lg' : ''}
        ${isEnd ? 'rounded-r-xl bg-accent text-white z-10 shadow-lg' : ''}
        ${isStart && isEnd ? 'rounded-xl' : ''}
      `}
    >
      {/* Range background for middle dates */}
      {isInRange && !isStart && !isEnd && (
        <div className="absolute inset-0 bg-accent-soft/60" />
      )}

      <span className={`
        text-lg font-medium relative z-10
        ${isToday && !isStart && !isEnd ? 'text-accent font-bold' : ''}
      `}>
        {day}
      </span>
      
      {isToday && !isStart && !isEnd && (
        <motion.div 
          layoutId="today-indicator"
          className="absolute bottom-2 w-1 h-1 bg-accent rounded-full" 
        />
      )}
      
      {hasNote && !isStart && !isEnd && (
        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-sm" />
      )}

      {/* Hover effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-accent/5 transition-opacity rounded-lg" />
    </motion.div>
  );
};

export default DayCell;
