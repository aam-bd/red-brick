/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Landmark, Box, Flame, Shield, ArrowDown } from 'lucide-react';
import { LUXURY_EASE } from '../utils/animations';

export default function ScrollStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(true);

  // Monitor screen size to switch between mobile-first linear layout and cinematic desktop pinning
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll progress around the viewport center so the plaques become legible while they are in view, not only near the top.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Smooth out the scroll progress for cinematic ease
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Left side display properties: shrinks slightly as we scroll down
  const displayScale = useTransform(smoothProgress, [0, 1], [1, 0.94]);
  const displayY = useTransform(smoothProgress, [0, 1], [0, -10]);

  // Plaque visibility now ramps up earlier so the cards read clearly while they are still centered in the viewport.
  const plaque1Opacity = useTransform(smoothProgress, [0.04, 0.2], [0.25, 1.0]);
  const plaque1Scale = useTransform(smoothProgress, [0.04, 0.2], [0.95, 1.0]);
  const plaque1Border = useTransform(smoothProgress, [0.04, 0.2], ['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.65)']);
  const plaque1Shadow = useTransform(smoothProgress, [0.04, 0.2], ['0 4px 15px rgba(0, 0, 0, 0.45)', '0 10px 30px rgba(184, 134, 11, 0.15)']);

  const plaque2Opacity = useTransform(smoothProgress, [0.16, 0.32], [0.25, 1.0]);
  const plaque2Scale = useTransform(smoothProgress, [0.16, 0.32], [0.95, 1.0]);
  const plaque2Border = useTransform(smoothProgress, [0.16, 0.32], ['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.65)']);
  const plaque2Shadow = useTransform(smoothProgress, [0.16, 0.32], ['0 4px 15px rgba(0, 0, 0, 0.45)', '0 10px 30px rgba(184, 134, 11, 0.15)']);

  const plaque3Opacity = useTransform(smoothProgress, [0.28, 0.44], [0.25, 1.0]);
  const plaque3Scale = useTransform(smoothProgress, [0.28, 0.44], [0.95, 1.0]);
  const plaque3Border = useTransform(smoothProgress, [0.28, 0.44], ['rgba(212, 175, 55, 0.15)', 'rgba(212, 175, 55, 0.65)']);
  const plaque3Shadow = useTransform(smoothProgress, [0.28, 0.44], ['0 4px 15px rgba(0, 0, 0, 0.45)', '0 10px 30px rgba(184, 134, 11, 0.15)']);

  // Active status indicator line mapping
  const activeIndicatorY = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-x-hidden bg-luxury-emerald-950 ${
        isDesktop ? 'h-[120vh] lg:h-[130vh]' : 'h-auto py-16'
      }`}
    >
      {/* Decorative background grids and spotlights */}
      <div className="absolute inset-0 tailored-stripes pointer-events-none opacity-20 z-0" />
      <div className="absolute inset-0 vignette pointer-events-none z-10" />

      {isDesktop ? (
        /* ================= DESKTOP STICKY CINEMATIC EXPERIMENT ================= */
        <div className="sticky top-24 left-0 w-full min-h-[calc(100vh-6rem)] flex items-center justify-center overflow-hidden z-20 py-10 lg:py-12">
          
          {/* Subtle Ambient backglow highlights */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-luxury-gold/5 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-luxury-crimson/5 blur-[110px] pointer-events-none" />

          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 xl:gap-14 xl:px-10 2xl:px-12 relative z-10">
            
            {/* Left Column: Pinned Glass Showcase displaying the 3D brick */}
            <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-center justify-center relative">
              <motion.div
                style={{
                  scale: displayScale,
                  y: displayY,
                }}
                className="w-full max-w-[22rem] sm:max-w-[24rem] xl:max-w-[28rem] aspect-[1.1] bg-luxury-charcoal/95 border border-luxury-gold/30 rounded-lg p-5 sm:p-6 shadow-[0_25px_50px_rgba(0,0,0,0.85)] relative flex flex-col justify-between overflow-hidden group museum-vignette"
              >
                {/* Brushed reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-luxury-offwhite/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[2.2s] ease-out pointer-events-none" />
                
                {/* Glass showcase headers */}
                <div className="flex justify-between items-center border-b border-luxury-gold/15 pb-3">
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-crimson animate-pulse" />
                    <span className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase font-bold">SECURE EXHIBIT UNIT // A-01</span>
                  </div>
                  <span className="font-mono text-[8px] text-luxury-offwhite/40">SYS: OPERATIONAL</span>
                </div>

                {/* Centered Exhibit Representation */}
                <div className="relative my-6 flex items-center justify-center h-44">
                  {/* Micro pedestals underneath the brick representation */}
                  <div className="absolute bottom-2 w-48 h-3 pedestal-glass rounded-sm shadow-inner z-0" />
                  <div className="absolute bottom-5 w-40 h-1 bg-luxury-gold/30 rounded-full blur-[1.5px] opacity-25" />

                  {/* The beautifully suspended physical Crimson Brick model */}
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotateX: [11, 13, 11],
                      rotateY: [-22, -18, -22],
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="brick-artistic w-40 h-20 sm:w-44 sm:h-24 xl:w-52 xl:h-28 transform relative z-10 hover:scale-105 transition-transform duration-500 cursor-help"
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1000,
                    }}
                  >
                    {/* Subtle shadows & highlights inside brick */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/35 pointer-events-none" />
                    
                    {/* Embossed Luxury seal on brick */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-luxury-gold/20 flex items-center justify-center opacity-60">
                        <Landmark className="w-4 h-4 text-luxury-gold-light" />
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Metadata */}
                <div className="flex justify-between items-end border-t border-luxury-gold/15 pt-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] text-luxury-gold/70 uppercase">Exhibit Class</span>
                    <span className="font-serif text-xs italic text-luxury-offwhite">Solidus Architectural Terracotta</span>
                  </div>
                  <div className="flex items-center space-x-1 font-mono text-[9px] text-luxury-gold-light">
                    <Box className="w-3.5 h-3.5" />
                    <span>01 // STANDARD SPEC</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Dynamic vertical storytelling with museum plaques */}
            <div className="lg:col-span-7 xl:col-span-6 relative min-h-[30rem] lg:min-h-[34rem] xl:min-h-[34rem] flex items-center pl-4 sm:pl-8 lg:pl-10 xl:pl-12 2xl:pl-16">
              
              {/* Timeline track vertical line indicator */}
              <div className="absolute left-0 top-4 bottom-4 sm:top-6 sm:bottom-6 w-0.5 bg-luxury-gold/10">
                <motion.div 
                  style={{ height: activeIndicatorY }}
                  className="w-full bg-gradient-to-b from-luxury-bronze via-luxury-gold to-luxury-gold-light rounded shadow-[0_0_8px_#dfa824]"
                />
              </div>

              {/* Plaques Container with vertical static list layout */}
              <div className="w-full h-full flex flex-col justify-start gap-3 sm:gap-4 py-2">
                
                {/* ================= PLAQUE 1: Origin ================= */}
                <motion.div
                  style={{
                    opacity: plaque1Opacity,
                    scale: plaque1Scale,
                    borderColor: plaque1Border,
                    boxShadow: plaque1Shadow,
                  }}
                  whileHover={{ opacity: 1, scale: 1.01, y: -2, borderColor: 'rgba(212, 175, 55, 0.65)', boxShadow: '0 10px 30px rgba(184, 134, 11, 0.15)' }}
                  className="border bg-luxury-charcoal/95 p-4 rounded relative group hover:-translate-y-0.5 transition-all duration-300 cursor-default overflow-hidden"
                >
                  {/* Corner Rivets */}
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />
                  <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />
                  <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />

                  {/* Double Thin Gold Borders inside */}
                  <div className="absolute inset-1 border border-luxury-gold/15 pointer-events-none rounded" />

                  <div className="relative z-10 pt-1 px-1">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-luxury-gold uppercase font-bold block mb-1">
                      Plaque 1 // Origin
                    </span>
                    
                    <h3 className="font-mono text-base tracking-tight text-luxury-offwhite font-bold mb-3 border-b border-luxury-gold/20 pb-1.5 uppercase">
                      Origin
                    </h3>

                    <div className="space-y-2 font-mono text-xs text-luxury-offwhite/90 leading-relaxed">
                      <p className="flex items-start space-x-2">
                        <span className="text-luxury-gold font-bold">»</span>
                        <span>Compressed from earth.</span>
                      </p>
                      <p className="flex items-start space-x-2">
                        <span className="text-luxury-gold font-bold">»</span>
                        <span>Refined by fire.</span>
                      </p>
                      <p className="flex items-start space-x-2">
                        <span className="text-luxury-gold font-bold">»</span>
                        <span>Built to survive generations.</span>
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* ================= PLAQUE 2: Material Integrity ================= */}
                <motion.div
                  style={{
                    opacity: plaque2Opacity,
                    scale: plaque2Scale,
                    borderColor: plaque2Border,
                    boxShadow: plaque2Shadow,
                  }}
                  whileHover={{ opacity: 1, scale: 1.01, y: -2, borderColor: 'rgba(212, 175, 55, 0.65)', boxShadow: '0 10px 30px rgba(184, 134, 11, 0.15)' }}
                  className="border bg-luxury-charcoal/95 p-4 rounded relative group hover:-translate-y-0.5 transition-all duration-300 cursor-default overflow-hidden"
                >
                  {/* Corner Rivets */}
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />
                  <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />
                  <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />

                  {/* Double Thin Gold Borders inside */}
                  <div className="absolute inset-1 border border-luxury-gold/15 pointer-events-none rounded" />

                  <div className="relative z-10 pt-1 px-1">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-luxury-gold uppercase font-bold block mb-1">
                      Plaque 2 // Specs
                    </span>
                    
                    <h3 className="font-mono text-base tracking-tight text-luxury-offwhite font-bold mb-3 border-b border-luxury-gold/20 pb-1.5 uppercase">
                      Material Integrity
                    </h3>

                    <div className="space-y-2 font-mono text-xs text-luxury-offwhite/90">
                      <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-1">
                        <span className="text-luxury-offwhite/60">Density</span>
                        <span className="text-luxury-gold-light font-bold">1920 kg/m³</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-1">
                        <span className="text-luxury-offwhite/60">Firing Temp</span>
                        <span className="text-luxury-gold-light font-bold">1050°C</span>
                      </div>
                      <div className="flex justify-between items-center pb-0.5">
                        <span className="text-luxury-offwhite/60">Compression</span>
                        <span className="text-luxury-crimson font-bold uppercase tracking-wider text-[10px]">Exceptional</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ================= PLAQUE 3: Collector Statement ================= */}
                <motion.div
                  style={{
                    opacity: plaque3Opacity,
                    scale: plaque3Scale,
                    borderColor: plaque3Border,
                    boxShadow: plaque3Shadow,
                  }}
                  whileHover={{ opacity: 1, scale: 1.01, y: -2, borderColor: 'rgba(212, 175, 55, 0.65)', boxShadow: '0 10px 30px rgba(184, 134, 11, 0.15)' }}
                  className="border bg-luxury-charcoal/95 p-4 rounded relative group hover:-translate-y-0.5 transition-all duration-300 cursor-default overflow-hidden"
                >
                  {/* Corner Rivets */}
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />
                  <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />
                  <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />
                  <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-luxury-gold/40 border border-luxury-gold/20" />

                  {/* Double Thin Gold Borders inside */}
                  <div className="absolute inset-1 border border-luxury-gold/15 pointer-events-none rounded" />

                  <div className="relative z-10 pt-1 px-1">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-luxury-gold uppercase font-bold block mb-1">
                      Plaque 3 // Statement
                    </span>
                    
                    <h3 className="font-mono text-base tracking-tight text-luxury-offwhite font-bold mb-3 border-b border-luxury-gold/20 pb-1.5 uppercase">
                      Collector Statement
                    </h3>

                    <p className="font-mono text-xs text-luxury-offwhite/90 leading-relaxed italic mb-3">
                      "Every civilization begins with a single foundation. This one simply looks better."
                    </p>

                    <div className="flex justify-between items-center border-t border-luxury-gold/10 pt-2 font-mono text-[8px]">
                      <span className="text-luxury-gold/55">REG: 000-1B</span>
                      <span className="text-luxury-crimson font-bold uppercase tracking-wider">Curator Signed</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>

        </div>
      ) : (
        /* ================= MOBILE-FIRST LAYOUT (NO CLIPPING, NO CROP) ================= */
        <div className="w-full max-w-xl mx-auto px-6 space-y-12 relative z-10">
          
          {/* Static Glass Showcase for mobile layout */}
          <div className="w-full bg-luxury-charcoal border border-luxury-gold/25 rounded-lg p-5 shadow-2xl relative flex flex-col justify-between overflow-hidden">
            {/* Glass showcase headers */}
            <div className="flex justify-between items-center border-b border-luxury-gold/15 pb-2.5">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-crimson animate-pulse" />
                <span className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase font-bold">EXHIBIT UNIT A-01</span>
              </div>
              <span className="font-mono text-[8px] text-luxury-offwhite/40">SECURE SHOWCASE</span>
            </div>

            {/* Suspended physical brick representation */}
            <div className="relative my-8 flex items-center justify-center h-36">
              <div className="absolute bottom-1 w-40 h-2.5 pedestal-glass rounded-sm shadow-inner z-0" />
              <div className="absolute bottom-4 w-32 h-1 bg-luxury-gold/30 rounded-full blur-[1px] opacity-25" />

              <motion.div
                animate={{
                  y: [0, -4, 0],
                  rotateX: [11, 13, 11],
                  rotateY: [-22, -18, -22],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="brick-artistic w-40 h-20 transform relative z-10"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: 1000,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/35 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Landmark className="w-4 h-4 text-luxury-gold-light opacity-60" />
                </div>
              </motion.div>
            </div>

            {/* Showcase Footer */}
            <div className="flex justify-between items-end border-t border-luxury-gold/15 pt-2.5">
              <span className="font-serif text-[11px] italic text-luxury-offwhite">Solidus Terracotta Specimen</span>
              <span className="font-mono text-[9px] text-luxury-gold-light">01 // STANDARD</span>
            </div>
          </div>

          {/* Scrolling sequential display of the plaques */}
          <div className="space-y-8 pt-4">
            
            {/* PLAQUE 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
              className="border border-luxury-gold/45 bg-luxury-charcoal/95 p-6 rounded shadow-xl relative overflow-hidden"
            >
              {/* Rivets */}
              <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute inset-1 border border-luxury-gold/10 rounded pointer-events-none" />

              <span className="font-mono text-[8px] tracking-[0.25em] text-luxury-gold uppercase font-bold block mb-1">
                Plaque 1 // Origin
              </span>
              <h3 className="font-mono text-lg tracking-tight text-luxury-offwhite font-bold mb-4 border-b border-luxury-gold/15 pb-1.5 uppercase">
                Origin
              </h3>
              <div className="space-y-3 font-mono text-xs text-luxury-offwhite/90">
                <p className="flex items-center space-x-2">
                  <span className="text-luxury-gold font-bold">»</span>
                  <span>Compressed from earth.</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-luxury-gold font-bold">»</span>
                  <span>Refined by fire.</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-luxury-gold font-bold">»</span>
                  <span>Built to survive generations.</span>
                </p>
              </div>
            </motion.div>

            {/* PLAQUE 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
              className="border border-luxury-gold/45 bg-luxury-charcoal/95 p-6 rounded shadow-xl relative overflow-hidden"
            >
              {/* Rivets */}
              <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute inset-1 border border-luxury-gold/10 rounded pointer-events-none" />

              <span className="font-mono text-[8px] tracking-[0.25em] text-luxury-gold uppercase font-bold block mb-1">
                Plaque 2 // Specs
              </span>
              <h3 className="font-mono text-lg tracking-tight text-luxury-offwhite font-bold mb-4 border-b border-luxury-gold/15 pb-1.5 uppercase">
                Material Integrity
              </h3>
              <div className="space-y-2.5 font-mono text-xs text-luxury-offwhite/90">
                <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-1.5">
                  <span className="text-luxury-offwhite/60">Density</span>
                  <span className="text-luxury-gold-light font-bold">1920 kg/m³</span>
                </div>
                <div className="flex justify-between items-center border-b border-luxury-gold/10 pb-1.5">
                  <span className="text-luxury-offwhite/60">Firing Temperature</span>
                  <span className="text-luxury-gold-light font-bold">1050°C</span>
                </div>
                <div className="flex justify-between items-center pb-0.5">
                  <span className="text-luxury-offwhite/60">Compression Rating</span>
                  <span className="text-luxury-crimson font-bold uppercase tracking-wider">Exceptional</span>
                </div>
              </div>
            </motion.div>

            {/* PLAQUE 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
              className="border border-luxury-gold/45 bg-luxury-charcoal/95 p-6 rounded shadow-xl relative overflow-hidden"
            >
              {/* Rivets */}
              <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-luxury-gold/40" />
              <div className="absolute inset-1 border border-luxury-gold/10 rounded pointer-events-none" />

              <span className="font-mono text-[8px] tracking-[0.25em] text-luxury-gold uppercase font-bold block mb-1">
                Plaque 3 // Statement
              </span>
              <h3 className="font-mono text-lg tracking-tight text-luxury-offwhite font-bold mb-3 border-b border-luxury-gold/15 pb-1.5 uppercase">
                Collector Statement
              </h3>
              <p className="font-mono text-xs text-luxury-offwhite/90 leading-relaxed italic mb-4">
                "Every civilization begins with a single foundation. This one simply looks better."
              </p>
              <div className="flex justify-between items-center border-t border-luxury-gold/10 pt-2 font-mono text-[8px]">
                <span className="text-luxury-gold/50">REG: 000-1B</span>
                <span className="text-luxury-crimson font-bold uppercase tracking-wider">Curator Verified</span>
              </div>
            </motion.div>

          </div>

        </div>
      )}
    </div>
  );
}
