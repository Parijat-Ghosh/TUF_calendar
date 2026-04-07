import React from 'react';
import { motion } from 'motion/react';

interface ImageSectionProps {
  monthName: string;
  year: number;
}

const ImageSection: React.FC<ImageSectionProps> = ({ monthName, year }) => {
  // Use a high-quality placeholder image that changes with the month
  const imageUrl = `https://picsum.photos/seed/calendar-${monthName.toLowerCase()}/1200/800`;

  return (
    <div className="relative h-64 md:h-auto md:w-1/3 overflow-hidden group">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src={imageUrl} 
          alt={monthName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </motion.div>
      
      <div className="absolute bottom-8 left-8 text-white z-10">
        <motion.h2 
          key={monthName}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-serif italic mb-1"
        >
          {monthName}
        </motion.h2>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl font-light tracking-widest uppercase opacity-80"
        >
          {year}
        </motion.p>
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-0 right-0 p-6">
        <div className="w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-xl" />
      </div>
    </div>
  );
};

export default ImageSection;
