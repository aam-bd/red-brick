/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Flame, Shield, Compass, Calendar, ArrowRight, CornerDownRight } from 'lucide-react';
import { slideUp, fadeIn, staggerContainer } from '../utils/animations';
import { ProvenanceRecord } from '../types';

export default function ProvenanceSection() {
  const [activeEra, setActiveEra] = useState<string>('alluvial');

  const timeline: ProvenanceRecord[] = [
    {
      id: 'alluvial',
      year: '400,000,000 BCE',
      era: 'THE DEVONIAN EPOCH',
      event: 'Sedimentation of the Clay Beds',
      location: 'Deep Ancient Alluvial Estuaries',
      description: 'Slow erosion of quartz and feldspar rocks accumulates in prehistoric estuaries. This geological deposition creates an ultra-dense, mineral-rich red silt structure characterized by incredible iron oxide concentration, providing the core molecular substrate for our specimen.',
      curatorNote: 'This clay contains fossilized traces of primeval vegetation, locking in high-pressure thermal qualities.'
    },
    {
      id: 'shaping',
      year: 'CONTEMPORARY CRAFT',
      era: 'HUMAN INTERVENTION',
      event: 'Extraction & Hand-Pressing',
      location: 'Traditional Riverbed Kilns',
      description: 'The mud is slowly extracted, hydrated, and wedged to purge air chambers. It is then hand-pressed into wooden templates lined with fine-grit riverbed sand, giving our specimen its rugged, unique, museum-grade surface texture.',
      curatorNote: 'Every surface grain registers the thumbprint of the mold maker, elevating it to an individual sculpture.'
    },
    {
      id: 'firing',
      year: 'THERMAL RECORD',
      era: 'TRANSFORMATIONAL FUSION',
      event: 'Firing at 1,120 Degrees Celsius',
      location: 'Anaerobic Brick Kiln',
      description: 'A 72-hour firing process. The clay crystals undergo molecular alteration, merging silica and alumina into an unyielding mullite matrix. Iron minerals oxidize fully, bleeding into the distinctive rich, crimson terracotta glow.',
      curatorNote: 'Slight cooling variances create subtle, beautiful bronze-tinged flash lines along the brick corners.'
    },
    {
      id: 'curation',
      year: 'TODAY',
      era: 'CURATOR SEAL OF TRUST',
      event: 'Microscopic Inspection & Registry',
      location: 'L’Art de la Terre Curation Lab',
      description: 'The fired brick is scanned, weighed to 0.01g precision, and audited for resonance. Verified perfect specimens are branded with the official signature seal, numbered, and locked inside our protective velvet showcase vault.',
      curatorNote: 'Specimen BRK-001 has been registered in the international artifact ledger. All matching duplicates destroyed.'
    }
  ];

  const activeRecord = timeline.find(t => t.id === activeEra) || timeline[0];

  return (
    <section className="w-full min-h-screen py-28 px-6 bg-luxury-emerald-950/40 relative overflow-hidden flex flex-col justify-center border-t border-luxury-gold/10">
      {/* Editorial Watermark */}
      <div className="absolute right-0 top-1/4 text-[14vw] font-serif italic text-luxury-gold/3 uppercase tracking-widest pointer-events-none select-none">
        Provenance
      </div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Side: Header and Editorial Copy */}
        <div className="lg:col-span-5 flex flex-col space-y-6 lg:sticky lg:top-28">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-px bg-luxury-gold" />
            <span className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase">CATALOGUE EXPANSION // VOL. II</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-luxury-offwhite tracking-tight leading-tight">
            Geological Origins <br />
            & <span className="italic text-luxury-gold">Thermal Transmutation</span>
          </h2>

          <p className="font-sans text-sm text-luxury-offwhite/70 font-light leading-relaxed max-w-sm">
            How does raw silt turn into a timeless luxury collectible? Follow the monumental timeline of geological deposition, tactile craftsmanship, and elemental fire.
          </p>

          {/* Interactive Timeline Tabs */}
          <div className="flex flex-col space-y-2 pt-4">
            {timeline.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveEra(item.id)}
                className={`flex items-center justify-between p-3.5 rounded text-left border transition-all duration-300 cursor-pointer ${
                  activeEra === item.id 
                    ? 'bg-luxury-gold/15 border-luxury-gold/40 pl-6' 
                    : 'bg-transparent border-luxury-gold/5 hover:border-luxury-gold/20'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <span className="font-mono text-xs text-luxury-gold font-bold">0{idx + 1}</span>
                  <div className="flex flex-col">
                    <span className="font-mono text-[8px] tracking-widest text-luxury-gold-light/60 uppercase">{item.year}</span>
                    <span className="font-serif text-sm text-luxury-offwhite font-medium">{item.event}</span>
                  </div>
                </div>
                <CornerDownRight className={`w-3.5 h-3.5 text-luxury-gold transition-transform duration-300 ${
                  activeEra === item.id ? 'translate-x-1 opacity-100' : 'opacity-30'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Showcase of Selected Era */}
        <div className="lg:col-span-7 flex flex-col h-full justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRecord.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileHover={{ 
                y: -5, 
                borderColor: 'rgba(212, 175, 55, 0.4)',
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.65), 0 0 40px rgba(184, 134, 11, 0.08)'
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="bg-luxury-charcoal/90 backdrop-blur-md border border-luxury-gold/20 p-8 md:p-12 rounded-lg shadow-2xl relative transition-colors"
            >
              {/* Highlight Light Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/5 blur-2xl rounded-full" />
              
              <div className="flex justify-between items-start mb-8">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] tracking-widest text-luxury-gold-light/60 uppercase">ERA RECORD</span>
                  <span className="font-mono text-xs text-luxury-gold font-semibold">{activeRecord.year}</span>
                </div>
                <div className="bg-luxury-gold/10 border border-luxury-gold/25 p-2 rounded-full">
                  {activeRecord.id === 'alluvial' && <Layers className="w-5 h-5 text-luxury-gold" />}
                  {activeRecord.id === 'shaping' && <Compass className="w-5 h-5 text-luxury-gold" />}
                  {activeRecord.id === 'firing' && <Flame className="w-5 h-5 text-luxury-gold" />}
                  {activeRecord.id === 'curation' && <Shield className="w-5 h-5 text-luxury-gold" />}
                </div>
              </div>

              {/* Event Name */}
              <h3 className="font-serif text-2xl md:text-3xl text-luxury-offwhite tracking-wide mb-2">
                {activeRecord.event}
              </h3>
              
              <div className="flex items-center space-x-2 font-mono text-[10px] text-luxury-gold/80 mb-6 bg-luxury-gold/5 border border-luxury-gold/10 px-3 py-1 rounded w-fit">
                <span>LOCATION: {activeRecord.location}</span>
              </div>

              {/* Large Narrative Description */}
              <p className="font-sans text-sm text-luxury-offwhite/80 leading-relaxed font-light mb-8 border-l border-luxury-gold/25 pl-6">
                {activeRecord.description}
              </p>

              {/* Curator Seal Quote */}
              {activeRecord.curatorNote && (
                <div className="bg-luxury-emerald-950/50 border border-luxury-gold/10 p-5 rounded-md relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 text-5xl font-serif text-luxury-gold/10 italic select-none">“</div>
                  <span className="font-mono text-[9px] text-luxury-gold uppercase tracking-[0.25em] block mb-2 font-bold">Curator Commentary</span>
                  <p className="font-sans italic text-xs text-luxury-gold-light/85 leading-relaxed">
                    "{activeRecord.curatorNote}"
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
