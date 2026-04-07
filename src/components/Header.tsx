import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  monthName: string;
  year: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const Header: React.FC<HeaderProps> = ({ monthName, year, onPrev, onNext, onToday }) => {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      <div className="flex flex-col">
        <motion.h1 
          key={monthName}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-serif font-bold text-ink"
        >
          {monthName}
        </motion.h1>
        <span className="text-sm font-medium text-stone-400 tracking-tighter uppercase">
          Wall Calendar Edition
        </span>
      </div>
      
      <div className="flex items-center gap-0">
        <button 
          onClick={() => onPrev()}
          className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-600 active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => onToday()}
          className="px-2 py-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-accent transition-colors"
        >
          Today
        </button>
        <button 
          onClick={() => onNext()}
          className="p-2 rounded-full hover:bg-stone-100 transition-colors text-stone-600 active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;
