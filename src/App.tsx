import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import CalendarGrid from './components/CalendarGrid';
import NotesPanel from './components/NotesPanel';
import ImageSection from './components/ImageSection';
import NoteModal from './components/NoteModal';
import { MONTHS, formatDateKey } from './utils';
import type { DateRange, Note, Notes } from './types';

export default function App() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [range, setRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<Notes>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // Load notes from localStorage (v2 for new structure)
  useEffect(() => {
    const savedNotes = localStorage.getItem('calendarNotes_v2');
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to parse notes from localStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save notes to localStorage (v2)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('calendarNotes_v2', JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    if (!range.start || (range.start && range.end)) {
      // Start new selection
      setRange({ start: date, end: null });
    } else {
      // Complete range selection
      // Ensure start is before end
      if (date < range.start) {
        setRange({ start: date, end: range.start });
      } else {
        setRange({ ...range, end: date });
      }
    }
  };

  const handleSaveNote = (rangeKey: string, noteData: Note) => {
    if (!noteData.title.trim() || !noteData.content.trim()) return;
    
    setNotes(prev => ({ 
      ...prev, 
      [rangeKey]: {
        title: noteData.title,
        content: noteData.content,
        rangeLabel: noteData.rangeLabel
      } 
    }));
  };

  const handleDeleteNote = (rangeKey: string) => {
    const newNotes = { ...notes };
    delete newNotes[rangeKey];
    setNotes(newNotes);
  };

  const clearRange = () => {
    setRange({ start: null, end: null });
  };

  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const handleDateHover = (date: Date) => {
    if (range.start && !range.end) {
      setHoveredDate(date);
    } else {
      setHoveredDate(null);
    }
  };

  const displayRange = useMemo<DateRange>(() => {
    if (range.start && !range.end && hoveredDate) {
      return {
        start: range.start < hoveredDate ? range.start : hoveredDate,
        end: range.start < hoveredDate ? hoveredDate : range.start
      };
    }
    return range;
  }, [range, hoveredDate]);

  const monthName = MONTHS[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-stone-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl bg-paper rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[700px]"
      >
        {/* Left: Hero Image Section */}
        <ImageSection monthName={monthName} year={year} />

        {/* Right: Calendar & Notes */}
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="flex-1 p-6 md:p-10 flex flex-col">
            <Header 
              monthName={monthName} 
              year={year} 
              onPrev={handlePrevMonth} 
              onNext={handleNextMonth} 
              onToday={() => setCurrentDate(new Date())}
            />
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${year}-${monthName}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex-1 flex flex-col"
              >
                <CalendarGrid 
                  currentDate={currentDate}
                  range={displayRange}
                  notes={notes}
                  onDateClick={handleDateClick}
                  onDateHover={handleDateHover}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Notes Panel */}
          <NotesPanel 
            range={range}
            notes={notes}
            onSaveNote={handleSaveNote}
            onDeleteNote={handleDeleteNote}
            onClearRange={clearRange}
            onViewNote={setActiveNote}
          />
        </div>
      </motion.div>

      {/* Note View Modal */}
      <NoteModal 
        note={activeNote} 
        onClose={() => setActiveNote(null)} 
      />
      
      {/* Background decoration */}
      <div className="fixed -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="fixed -top-24 -right-24 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl -z-10" />
    </div>
  );
}

