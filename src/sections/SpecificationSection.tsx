/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Ruler, Percent, Radio, Scale } from 'lucide-react';
import { slideUp, fadeIn, staggerContainer } from '../utils/animations';
import { SpecificationItem } from '../types';

export default function SpecificationSection() {
  const [hoveredSpec, setHoveredSpec] = useState<string | null>(null);

  const specs: SpecificationItem[] = [
    { id: 'compressive', label: 'COMPRESSIVE STRENGTH', value: '45.8 N/mm²', scientificNotation: '4.58 × 10⁷ Pa', importance: 'critical' },
    { id: 'thermal', label: 'THERMAL CONDUCTIVITY', value: '0.82 W/m·K', scientificNotation: 'λ = 0.82', importance: 'standard' },
    { id: 'absorption', label: 'WATER ABSORPTION CAPACITY', value: '8.45%', scientificNotation: 'H₂O Max Cap', importance: 'standard' },
    { id: 'density', label: 'GEOLOGICAL DENSITY', value: '1,980 kg/m³', scientificNotation: 'ρ = 1.98 g/cm³', importance: 'critical' },
    { id: 'iron', label: 'IRON OXIDE CONCENTRATION', value: '6.42% Fe₂O₃', scientificNotation: 'Crimson Element', importance: 'microscopic' },
    { id: 'acoustics', label: 'ACOUSTIC SHIELDING RATING', value: '52.5 dB', scientificNotation: 'R_w = 52.5', importance: 'microscopic' },
  ];

  // Visual percentages to power beautiful circular or bar gauges
  const getProgressPercentage = (id: string) => {
    switch (id) {
      case 'compressive': return 92; // Top of construction standard
      case 'thermal': return 45; // Energy isolation standard
      case 'absorption': return 35; // Perfect clay breathability
      case 'density': return 85; // Solid earth compaction
      case 'iron': return 64; // Perfect terracotta hue balance
      case 'acoustics': return 78; // Silent vault standard
      default: return 50;
    }
  };

  return (
    <section className="w-full min-h-screen py-28 px-6 bg-luxury-emerald-950/20 relative overflow-hidden flex flex-col justify-center border-t border-luxury-gold/10">
      {/* Blueprint background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 tailored-stripes pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Technical Meters and Visual Blueprint */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-px bg-luxury-gold" />
            <span className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase">ELEMENTAL RATIOS // SEC. III</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-luxury-offwhite tracking-tight leading-tight">
            Scientific Blueprint <br />
            & <span className="italic text-luxury-gold">Elemental Composition</span>
          </h2>

          <p className="font-sans text-sm text-luxury-offwhite/70 font-light leading-relaxed max-w-sm">
            Behind its humble appearance lies a molecular structure calibrated for eternity. Explore the performance specs that allow our specimen to withstand the ages.
          </p>

          {/* Real-time Technical Gauge Display */}
          <motion.div 
            whileHover={{ 
              y: -5,
              borderColor: 'rgba(212, 175, 55, 0.4)',
              boxShadow: '0 30px 60px rgba(0, 0, 0, 0.65), 0 0 40px rgba(184, 134, 11, 0.08)'
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-luxury-charcoal/90 border border-luxury-gold/20 p-6 rounded-md shadow-2xl relative transition-colors"
          >
            <div className="absolute top-2 left-3 font-mono text-[8px] text-luxury-gold/60">MOLECULAR METER MODULE</div>
            <div className="pt-4 space-y-6">
              {specs.map((item) => {
                const isHovered = hoveredSpec === item.id;
                const percentage = getProgressPercentage(item.id);
                return (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setHoveredSpec(item.id)}
                    onMouseLeave={() => setHoveredSpec(null)}
                    className="flex flex-col space-y-1.5 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className={`font-mono tracking-wider transition-colors duration-300 ${
                        isHovered ? 'text-luxury-gold font-bold' : 'text-luxury-offwhite/85'
                      }`}>
                        {item.label}
                      </span>
                      <span className="font-mono text-luxury-gold font-bold text-xs">{item.value}</span>
                    </div>

                    {/* Progress Bar with animated gold/bronze flow */}
                    <div className="w-full h-1.5 bg-luxury-emerald-950 rounded-full overflow-hidden border border-luxury-gold/10 p-[1px]">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className={`h-full rounded-full ${
                          item.importance === 'critical' 
                            ? 'bg-gradient-to-r from-luxury-bronze to-luxury-gold' 
                            : 'bg-gradient-to-r from-luxury-emerald-800 to-luxury-gold/65'
                        }`}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-mono text-luxury-offwhite/40">
                      <span>{item.scientificNotation}</span>
                      <span className="uppercase text-luxury-gold/40">{item.importance} variable</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Side: Geometrical Ratio Diagram & Micro Specs Table */}
        <div className="lg:col-span-6 flex flex-col space-y-8">
          {/* Aesthetic Blueprint Render Card */}
          <div className="border border-luxury-gold/15 bg-luxury-charcoal/50 p-8 rounded-lg relative overflow-hidden flex flex-col justify-between h-96">
            <div className="absolute top-3 left-4 font-mono text-[9px] text-luxury-gold-light/60">DIMENSIONAL METROLOGY</div>
            
            {/* Elegant diagram overlay lines */}
            <div className="w-full flex items-center justify-center py-6 h-56 relative">
              {/* Golden circular ratio diagram */}
              <div className="w-44 h-44 rounded-full border border-dashed border-luxury-gold/25 flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
                <div className="w-24 h-24 rounded-full border border-luxury-gold/10" />
              </div>
              <div className="absolute font-serif text-3xl italic text-luxury-gold/80">
                1 : 1.5 : 3
              </div>
              {/* Connecting pointer labels */}
              <div className="absolute top-1/2 left-2 w-8 h-px bg-luxury-gold/30" />
              <div className="absolute top-1/2 right-2 w-8 h-px bg-luxury-gold/30" />
            </div>

            <div className="border-t border-luxury-gold/15 pt-4">
              <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-[0.2em] block mb-1">PROPORTION NOTE</span>
              <p className="font-sans text-xs text-luxury-offwhite/60 leading-relaxed font-light">
                The sacred ratio (Length = 2 × Width + Joint) matches standard classic masonry ratios established in Babylon, creating a modular lock-grid holding architecture for centuries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
