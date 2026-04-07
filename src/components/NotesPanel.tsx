import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { StickyNote, Save, Trash2, Calendar as CalendarIcon, X, CheckCircle2, List, ChevronRight } from 'lucide-react';
import { formatRangeKey, MONTHS, isDateInRangeKey } from '../utils';
import type { DateRange, Note, Notes } from '../types';

interface NotesPanelProps {
  range: DateRange;
  notes: Notes;
  onSaveNote: (rangeKey: string, noteData: Note) => void;
  onDeleteNote: (rangeKey: string) => void;
  onClearRange: () => void;
  onViewNote: (note: Note) => void;
}

const NotesPanel: React.FC<NotesPanelProps> = ({ range, notes, onSaveNote, onDeleteNote, onClearRange, onViewNote }) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  
  const isRangeSelected = !!(range.start && range.end);
  const currentRangeKey = isRangeSelected ? formatRangeKey(range.start, range.end) : null;
  const existingNote = currentRangeKey ? notes[currentRangeKey] : null;

  // Filter notes that include the currently selected date (start date)
  const notesForSelectedDate = useMemo(() => {
    if (!range.start) return [];
    return (Object.entries(notes) as [string, Note][])
      .filter(([key]) => isDateInRangeKey(range.start, key))
      .map(([key, value]) => ({ ...value, key }));
  }, [notes, range.start]);

  useEffect(() => {
    if (existingNote) {
      setNoteTitle(existingNote.title || '');
      setNoteContent(existingNote.content || '');
    } else {
      setNoteTitle('');
      setNoteContent('');
    }
  }, [existingNote, currentRangeKey]);

  const formatDateLabel = (date: Date | null) => {
    if (!date) return '';
    return `${MONTHS[date.getMonth()].substring(0, 3)} ${date.getDate()}`;
  };

  const handleSave = () => {
    if (!currentRangeKey || !noteTitle.trim() || !noteContent.trim() || !range.start || !range.end) return;
    
    onSaveNote(currentRangeKey, {
      title: noteTitle,
      content: noteContent,
      rangeLabel: `${formatDateLabel(range.start)} → ${formatDateLabel(range.end)}`
    });
    
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 3000);
    onClearRange();
  };

  const canSave = isRangeSelected && noteTitle.trim() && noteContent.trim();

  return (
    <div className="w-full md:w-96 bg-stone-50 p-6 border-l border-stone-100 flex flex-col h-full relative">
      {/* Persistent Feedback Message */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 text-green-600 bg-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg border border-green-100"
          >
            <CheckCircle2 size={14} />
            Note saved!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-serif font-bold flex items-center gap-2">
          <StickyNote size={20} className="text-accent" />
          Calendar Notes
        </h3>
        {range.start && (
          <button 
            onClick={onClearRange}
            className="text-stone-400 hover:text-ink transition-colors"
            title="Clear selection"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {/* Section 1: Note Creation */}
        <div className="flex flex-col gap-4">
          {!range.start ? (
            <div className="flex flex-col items-center justify-center py-8 text-center opacity-40 border-2 border-dashed border-stone-200 rounded-2xl">
              <CalendarIcon size={40} className="mb-3" />
              <p className="text-xs font-medium uppercase tracking-widest">Select a range to create</p>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="bg-white p-3 rounded-xl shadow-sm border border-stone-100">
                <p className="text-[10px] font-bold text-stone-400 uppercase mb-1">
                  {isRangeSelected ? 'Selected Range' : 'Selecting Range...'}
                </p>
                <div className="text-xs font-medium text-ink">
                  {isRangeSelected ? (
                    <span className="flex items-center gap-2">
                      {formatDateLabel(range.start)} — {formatDateLabel(range.end)}
                    </span>
                  ) : (
                    <span className="text-stone-400 italic">Please select an end date</span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <input 
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  disabled={!isRangeSelected}
                  placeholder="Note Title"
                  className={`w-full px-4 py-2 bg-white border border-stone-100 rounded-xl shadow-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all text-sm font-bold ${!isRangeSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  disabled={!isRangeSelected}
                  placeholder="Write your thoughts..."
                  className={`w-full h-32 p-4 bg-white border border-stone-100 rounded-xl shadow-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none text-sm leading-relaxed ${!isRangeSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                
                <div className="flex justify-end gap-2">
                  {existingNote && currentRangeKey && (
                    <button 
                      onClick={() => onDeleteNote(currentRangeKey)}
                      className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                      title="Delete note"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <button 
                    onClick={handleSave}
                    disabled={!canSave}
                    className="flex items-center gap-2 px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
                  >
                    <Save size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">Save Note</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Section 2: List of Notes for Selected Date */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-3 px-1">
            <List size={16} className="text-stone-400" />
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
              Notes for this date
            </h4>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
            {!range.start ? (
              <p className="text-center text-stone-300 italic text-xs py-4">
                Click a date to see its notes
              </p>
            ) : notesForSelectedDate.length === 0 ? (
              <p className="text-center text-stone-300 italic text-xs py-4">
                No notes found for this date
              </p>
            ) : (
              notesForSelectedDate.map((note) => (
                <motion.button
                  key={note.key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  onClick={() => onViewNote(note)}
                  className="w-full group bg-white p-4 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-accent/30 transition-all text-left flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <h5 className="text-sm font-bold text-ink truncate group-hover:text-accent transition-colors">
                      {note.title}
                    </h5>
                    <p className="text-[10px] text-stone-400 font-medium uppercase tracking-tighter">
                      {note.rangeLabel}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-stone-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-stone-200">
        <p className="text-[10px] text-stone-400 uppercase tracking-widest text-center">
          Secure Local Storage v2
        </p>
      </div>
    </div>
  );
};

export default NotesPanel;
