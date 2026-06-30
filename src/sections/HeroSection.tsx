/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useTransform } from 'motion/react';
import { ShieldCheck, Compass, Award, CornerDownRight } from 'lucide-react';
import { slideUp, fadeIn, staggerContainer, LUXURY_EASE } from '../utils/animations';
import BrickCanvasPlaceholder from '../components/BrickCanvasPlaceholder';
import { ExhibitionSection } from '../types';

interface HeroSectionProps {
  onNavigate: (section: ExhibitionSection) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  // Track mouse coordinates for premium GPU-accelerated parallax movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setCoords({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Generate stable floating gold particles
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    }));
    setParticles(generatedParticles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      className="w-full h-screen relative flex flex-col items-center justify-center overflow-hidden bg-luxury-emerald-950 tailored-bg"
    >
      {/* Editorial Vertical Stripes Grid */}
      <div className="tailored-stripes" />

      {/* Very subtle Arabic-inspired decorative calligraphic watermark behind the hero */}
      <motion.div 
        style={{
          x: coords.x * -15,
          y: coords.y * -15,
        }}
        className="absolute w-[80vh] h-[80vh] opacity-[0.025] pointer-events-none select-none z-0 text-luxury-gold flex items-center justify-center"
      >
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 120,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Decorative Islamic/Arabic calligraphic-inspired geometry */}
          <path 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            d="M50 5 Q55 35 80 35 Q95 50 80 65 Q55 65 50 95 Q45 65 20 65 Q5 50 20 35 Q45 35 50 5 Z" 
          />
          <path 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.3" 
            d="M50 15 Q53 40 75 40 Q85 50 75 60 Q53 60 50 85 Q47 60 25 60 Q15 50 25 40 Q47 40 50 15 Z" 
          />
          <circle cx="50" cy="50" r="8" fill="none" stroke="currentColor" strokeWidth="0.4" />
          <path 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.25" 
            d="M10 50 L90 50 M50 10 L50 90 M22 22 L78 78 M22 78 L78 22" 
          />
          <path 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.2" 
            d="M50 50 C 40 30, 30 40, 50 50 C 60 30, 70 40, 50 50 C 60 70, 70 60, 50 50 C 40 70, 30 60, 50 50" 
          />
        </svg>
        </motion.div>
      </motion.div>

      {/* Floating Gold/Bronze Ambient Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: '100vh' }}
            animate={{ 
              opacity: [0, 0.4, 0.4, 0],
              y: '-10vh',
              x: [`${p.x}vw`, `${p.x + (Math.random() * 4 - 2)}vw`]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear'
            }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: '#B8860B',
            }}
          />
        ))}
      </div>

      {/* Giant Stacked Editorial Typography behind the product showcase */}
      <motion.div 
        style={{
          x: coords.x * 20,
          y: coords.y * 20,
        }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0"
      >
        <h1 className="font-serif text-[10vw] md:text-[8vw] font-bold text-center tracking-tighter leading-[0.8] opacity-[0.035] text-luxury-offwhite">
          A BRICK.
        </h1>
        <h2 className="font-serif text-[7vw] md:text-[5.5vw] font-bold text-center tracking-tighter leading-[0.8] opacity-[0.035] text-luxury-gold italic mt-2">
          WORTH PAUSING FOR.
        </h2>
      </motion.div>

      {/* Main Premium Centered Showcase Frame */}
      <div className="relative z-20 w-full max-w-4xl px-6 flex flex-col items-center justify-center">
        {/* Exhibition Tag and Collection Metadata */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center space-y-2 mb-6"
        >
          <div className="flex items-center space-x-1.5 font-mono text-[9px] tracking-[0.3em] text-luxury-gold uppercase">
            <Award className="w-3 h-3 text-luxury-gold animate-pulse" />
            <span>Museum Collection 01</span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" />
        </motion.div>

        {/* The Premium Glowing Display Frame container */}
        <motion.div
          style={{
            x: coords.x * -8,
            y: coords.y * -8,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: LUXURY_EASE }}
          className="w-full relative group"
        >
          {/* Gold ambient glow borders around product area */}
          <div className="absolute -inset-1 bg-gradient-to-r from-luxury-gold/5 via-luxury-gold/15 to-luxury-gold/5 rounded-2xl blur-xl opacity-80 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          
          {/* Framed Exhibit display area containing 3D Canvas Placeholder */}
          <div className="relative border-2 border-luxury-gold/25 rounded-xl overflow-hidden bg-luxury-charcoal/80 p-2 shadow-[0_0_50px_rgba(184,134,11,0.08)]">
            <BrickCanvasPlaceholder />
            
            {/* Visual indicator labeled: 3D Canvas Placeholder */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-luxury-charcoal/90 backdrop-blur-md border border-luxury-gold/30 px-4 py-1.5 rounded-full shadow-lg">
              <span className="font-mono text-[9px] tracking-[0.3em] text-luxury-gold-light uppercase font-bold">
                3D Canvas Placeholder
              </span>
            </div>
          </div>
        </motion.div>

        {/* Centered Editorial Supporting Copy & Call To Actions */}
        <motion.div
          variants={staggerContainer(0.12, 0.5)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center mt-8 space-y-5"
        >
          {/* Slogans */}
          <motion.div variants={slideUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[10px] tracking-[0.2em] text-luxury-offwhite/70">
            <span className="flex items-center">Crafted by pressure.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/50" />
            <span className="flex items-center">Perfected by fire.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/50" />
            <span className="flex items-center">Desired by collectors.</span>
          </motion.div>

          {/* Premium Interaction Buttons */}
          <motion.div variants={slideUp} className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(212, 175, 55, 0.08)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate(ExhibitionSection.ACQUISITION)}
              className="bg-transparent text-luxury-gold border border-luxury-gold hover:border-luxury-gold-light font-mono text-xs tracking-widest font-bold px-10 py-4 rounded-sm transition-all duration-300 cursor-pointer text-center min-w-[220px]"
            >
              REQUEST ACQUISITION
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onNavigate(ExhibitionSection.PROVENANCE)}
              className="font-mono text-xs tracking-widest text-luxury-offwhite/85 hover:text-luxury-gold flex items-center space-x-2 transition-all duration-300 group cursor-pointer"
            >
              <span>ENTER THE ARCHIVE</span>
              <CornerDownRight className="w-4 h-4 text-luxury-gold group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Downward Navigation Cue */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 2.2, duration: 1, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        onClick={() => onNavigate(ExhibitionSection.PROVENANCE)}
      >
        <span className="font-mono text-[8px] tracking-[0.3em] text-luxury-gold mb-1">SCROLL GALLERY</span>
        <div className="w-px h-6 bg-gradient-to-b from-luxury-gold to-transparent" />
      </motion.div>
    </section>
  );
}
