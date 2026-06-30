/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Flame, Compass, Eye, ShieldCheck, Award, Box, Layers, Landmark } from 'lucide-react';
import { LUXURY_EASE } from '../utils/animations';

interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  icon: React.ReactNode;
  bgGradient: string; // Background color accent
  badge: string;
}

export default function VerticalTimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const milestones: Milestone[] = [
    {
      id: 'clay',
      title: 'CLAY',
      subtitle: 'The Primordial Sediment',
      caption: 'Fossilized alluvial silt excavated from subterranean deep riverbed pools. Rich iron oxide substrate preserved over 400 million years of geological pressure.',
      badge: 'DEPOSITION // 400M BCE',
      icon: <Layers className="w-6 h-6 text-[#c18c5d]" />,
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(139, 90, 43, 0.15) 0%, transparent 70%)',
    },
    {
      id: 'pressure',
      title: 'PRESSURE',
      subtitle: 'Compact Wedging & Mold',
      caption: 'Hydrated mud mass is hand-slapped and pressed into custom cherry-wood templates, squeezing out air bubbles to guarantee maximum monolithic load capacity.',
      badge: 'CRAFT // COMPRESSION',
      icon: <Box className="w-6 h-6 text-luxury-bronze" />,
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(142, 94, 48, 0.15) 0%, transparent 70%)',
    },
    {
      id: 'fire',
      title: 'FIRE',
      subtitle: 'Crystalline Fusion',
      caption: 'Thermally converted at 1,120°C for 72 continuous hours. Clay minerals recrystallize into Mullite needles, fusing the structure into a vitrified, unyielding terracotta stone.',
      badge: 'KILN TRANSFORMATION // 1,120°C',
      icon: <Flame className="w-6 h-6 text-luxury-crimson" />,
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(128, 0, 0, 0.2) 0%, transparent 70%)',
    },
    {
      id: 'precision',
      title: 'PRECISION',
      subtitle: 'Metrology and Calibrations',
      caption: 'Scanned with optical laser sensors and weighted on balances down to 0.01g tolerance. Verified against the classic proportional ratio of Babylonian standard architecture.',
      badge: 'LAB AUDIT // 1:1.5:3',
      icon: <Compass className="w-6 h-6 text-luxury-gold" />,
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(184, 134, 11, 0.15) 0%, transparent 70%)',
    },
    {
      id: 'foundation',
      title: 'FOUNDATION',
      subtitle: 'Primary Element of History',
      caption: 'The modular atom that built the Hanging Gardens, Roman Aqueducts, and Modern Skylines. An honest block that holds the physical weight of human civilizations.',
      badge: 'ARCHITECTURAL CLASS',
      icon: <Landmark className="w-6 h-6 text-luxury-gold-light" />,
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(232, 211, 144, 0.1) 0%, transparent 70%)',
    },
    {
      id: 'artifact',
      title: 'ARTIFACT',
      subtitle: 'Exhibition Classification',
      caption: 'Individually signed, registry-branded, and catalogued with custom serial numbers. Transferred from standard construction utilities into custom museum-grade exhibition cases.',
      badge: 'MUSEUM STATUS // EXH_001',
      icon: <Award className="w-6 h-6 text-luxury-gold" />,
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(184, 134, 11, 0.18) 0%, transparent 70%)',
    },
    {
      id: 'collector',
      title: 'COLLECTOR EDITION',
      subtitle: 'The Ultimate Patron Possession',
      caption: 'Housed in custom velvet-lined raw oak cases with dual certificates of authenticity. Disclosed exclusively via closed-dossier review to selected cultural archives.',
      badge: 'SECURED ACQUISITION',
      icon: <ShieldCheck className="w-6 h-6 text-luxury-gold" />,
      bgGradient: 'radial-gradient(circle at 50% 50%, rgba(250, 249, 246, 0.08) 0%, transparent 70%)',
    }
  ];

  // Track scrolling progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // Track glowing indicator down the timeline track
  const indicatorY = useTransform(smoothProgress, [0, 1], ['5%', '95%']);

  // Handle setting active milestone index based on scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const index = Math.min(
        Math.floor(latest * milestones.length),
        milestones.length - 1
      );
      setActiveIdx(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, milestones.length]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-[#03110d] py-32 overflow-hidden border-t border-luxury-gold/10"
    >
      {/* Dynamic Earthy-to-Museum Background Light Glow shifting on scroll */}
      <div className="absolute inset-0 pointer-events-none transition-all duration-1000 z-0">
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-1000"
          style={{ background: milestones[activeIdx]?.bgGradient }}
        />
        <div className="absolute inset-0 tailored-stripes opacity-15" />
        <div className="absolute inset-0 vignette" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Title and Header */}
        <div className="text-center flex flex-col items-center mb-24 space-y-4">
          <span className="font-mono text-[9px] tracking-[0.3em] text-luxury-gold uppercase font-bold">
            CURATOR SERIES // PROVENANCE LABS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-offwhite tracking-tight italic font-medium">
            The Birth of <span className="text-luxury-gold not-italic">an Icon</span>
          </h2>
          <p className="font-mono text-[10px] text-luxury-offwhite/50 uppercase tracking-[0.2em] max-w-md">
            Follow the continuous material evolution from deep terrestrial sediment to the ultimate coveted collector piece.
          </p>
          <div className="w-12 h-px bg-luxury-gold/40 mt-6" />
        </div>

        {/* Timeline Path & Items Wrapper */}
        <div className="relative">
          
          {/* Elegant Central Connecting Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-luxury-gold/15 -translate-x-[0.5px]">
            {/* Glowing Indicator traveling on scroll */}
            <motion.div 
              style={{ top: indicatorY }}
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-luxury-gold shadow-[0_0_15px_#B8860B] z-30"
            >
              <div className="absolute inset-1 rounded-full bg-luxury-offwhite animate-ping" />
            </motion.div>
          </div>

          {/* Timeline Milestones list */}
          <div className="space-y-24">
            {milestones.map((item, idx) => {
              const isActive = activeIdx === idx;
              
              return (
                <div 
                  key={item.id} 
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 relative items-center transition-all duration-700 ${
                    isActive ? 'scale-[1.03] opacity-100' : 'scale-[0.97] opacity-25'
                  }`}
                >
                  
                  {/* Left Column: Title / Meta (Offset for alternating layout on desktop) */}
                  <div className={`pl-16 md:pl-0 flex flex-col ${
                    idx % 2 === 0 ? 'md:items-end md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'
                  }`}>
                    <div className="flex items-center space-x-3 mb-2 md:mb-1">
                      {idx % 2 !== 0 && (
                        <div className="bg-luxury-charcoal border border-luxury-gold/30 p-2.5 rounded-full shadow-lg hidden md:flex shrink-0">
                          {item.icon}
                        </div>
                      )}
                      
                      <div className="flex flex-col">
                        <span className="font-mono text-[8px] tracking-widest text-luxury-gold uppercase font-bold">
                          {item.badge}
                        </span>
                        <h3 className="font-mono text-2xl tracking-tighter text-luxury-offwhite font-extrabold uppercase mt-1">
                          {item.title}
                        </h3>
                      </div>

                      {idx % 2 === 0 && (
                        <div className="bg-luxury-charcoal border border-luxury-gold/30 p-2.5 rounded-full shadow-lg hidden md:flex shrink-0 ml-3">
                          {item.icon}
                        </div>
                      )}
                    </div>
                    
                    <span className="font-serif text-base text-luxury-gold italic">
                      {item.subtitle}
                    </span>
                  </div>

                  {/* Icon Node directly pinned on the line (mobile and backup) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex md:hidden items-center justify-center bg-luxury-charcoal border border-luxury-gold/40 w-10 h-10 rounded-full z-20 shadow-md">
                    {item.icon}
                  </div>

                  {/* Right Column: Narrative Caption Plaque */}
                  <div className={`pl-16 md:pl-0 ${
                    idx % 2 === 0 ? 'md:col-start-2 md:pl-12' : 'md:col-start-1 md:row-start-1 md:pr-12 md:text-right'
                  }`}>
                    <div className="border border-luxury-gold/30 bg-luxury-charcoal/95 p-6 rounded shadow-2xl relative overflow-hidden group hover:shadow-[0_10px_30px_rgba(184,134,11,0.08)] transition-all duration-500">
                      
                      {/* Decorative elements of museum plaque */}
                      <div className="absolute top-2 left-2 w-0.5 h-0.5 rounded-full bg-luxury-gold/40" />
                      <div className="absolute top-2 right-2 w-0.5 h-0.5 rounded-full bg-luxury-gold/40" />
                      <div className="absolute bottom-2 left-2 w-0.5 h-0.5 rounded-full bg-luxury-gold/40" />
                      <div className="absolute bottom-2 right-2 w-0.5 h-0.5 rounded-full bg-luxury-gold/40" />
                      <div className="absolute inset-1 border border-luxury-gold/10 rounded pointer-events-none" />

                      <p className="font-sans text-xs text-luxury-offwhite/80 leading-relaxed font-light">
                        {item.caption}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Cinematic Downward Indicator */}
        <div className="flex flex-col items-center justify-center mt-24 text-center">
          <div className="w-12 h-px bg-luxury-gold/20 mb-4" />
          <span className="font-mono text-[8px] tracking-[0.25em] text-luxury-gold/50 uppercase">
            SPECIMEN GEOLOGY TRANSFERS INTO SPECIFICATION METRIC RECORD BELOW
          </span>
        </div>

      </div>
    </div>
  );
}
