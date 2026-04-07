import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Type } from 'lucide-react';
import type { Note } from '../types';

interface NoteModalProps {
  note: Note | null;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ note, onClose }) => {
  if (!note) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        {/* Backdrop with blur */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-xl text-accent">
                <Type size={24} />
              </div>
              <h2 className="text-2xl font-serif font-bold text-ink leading-tight">
                {note.title}
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-stone-200 rounded-full transition-colors text-stone-400 hover:text-ink"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            <div className="flex items-center gap-2 mb-6 text-stone-400 text-sm font-medium uppercase tracking-widest">
              <Calendar size={16} />
              <span>{note.rangeLabel}</span>
            </div>
            
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-stone-700 leading-relaxed whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-stone-50/50 border-t border-stone-100 flex justify-end">
            <button 
              onClick={onClose}
              className="px-8 py-3 bg-ink text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-stone-800 transition-all active:scale-95 shadow-lg"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NoteModal;
