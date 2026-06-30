/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark } from 'lucide-react';
import { LUXURY_EASE } from '../utils/animations';

interface MuseumLoaderProps {
  onComplete: () => void;
}

export default function MuseumLoader({ onComplete }: MuseumLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);

  const statusTexts = [
    'RETRIEVING ALLUVIAL SILT RECORDS...',
    'ANALYZING GEOLOGICAL PRESSURE METRICS...',
    'KILN TEMPERATURE CALIBRATION: 1120°C...',
    'COMPILING PROPORTIONAL ARCHITECTURAL CODES...',
    'SEALING MUSEUM VAULT SPECIMENS...',
  ];

  // Progress counter simulation
  useEffect(() => {
    let start = 0;
    const duration = 1800; // 1.8 seconds luxurious load
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      start += step + Math.random() * 2;
      if (start >= 100) {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 500);
      } else {
        setProgress(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Transitioning statuses
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % statusTexts.length);
    }, 380);

    return () => clearInterval(statusInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        opacity: 0,
        transition: { duration: 0.95, ease: LUXURY_EASE }
      }}
      className="fixed inset-0 bg-luxury-charcoal z-[999] flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Background grids */}
      <div className="absolute inset-0 tailored-stripes opacity-15 pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="max-w-md w-full flex flex-col items-center relative z-10 text-center space-y-8">
        
        {/* Emblem logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: LUXURY_EASE }}
          className="w-16 h-16 rounded-full border border-luxury-gold/30 bg-luxury-emerald-950/60 flex items-center justify-center relative shadow-[0_0_30px_rgba(184,134,11,0.05)]"
        >
          <Landmark className="w-6 h-6 text-luxury-gold" />
          {/* Subtle outer spin circle */}
          <div className="absolute inset-[-4px] rounded-full border border-dashed border-luxury-gold/15 animate-spin" style={{ animationDuration: '24s' }} />
        </motion.div>

        {/* Editorial Title */}
        <div className="space-y-1.5">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 0.6, letterSpacing: '0.3em' }}
            transition={{ duration: 1.4, ease: LUXURY_EASE }}
            className="font-mono text-[9px] tracking-[0.3em] text-luxury-gold uppercase block"
          >
            L'ART DE LA TERRE
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: LUXURY_EASE }}
            className="font-serif text-2xl text-luxury-offwhite tracking-wider italic font-medium"
          >
            Curator Labs <span className="text-luxury-gold not-italic">&</span> Archives
          </motion.h2>
        </div>

        {/* Cinematic Linear Progress Line */}
        <div className="w-64 space-y-3.5 pt-4">
          <div className="w-full h-[1px] bg-luxury-gold/10 relative overflow-hidden">
            <motion.div 
              className="absolute left-0 top-0 bottom-0 bg-luxury-gold-light"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="flex justify-between items-center font-mono text-[8px] text-luxury-gold-light/60 tracking-widest uppercase">
            {/* Status change animation */}
            <AnimatePresence mode="wait">
              <motion.span
                key={statusIdx}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
                className="inline-block truncate max-w-[200px]"
              >
                {statusTexts[statusIdx]}
              </motion.span>
            </AnimatePresence>
            
            <span className="font-bold">{progress}%</span>
          </div>
        </div>

      </div>

      {/* Security statement footer */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[7px] text-luxury-offwhite/20 tracking-[0.25em] uppercase text-center w-full max-w-xs">
        AUTHENTICATED RECORD VAULT INDUCTION ACTIVE
      </div>
    </motion.div>
  );
}
