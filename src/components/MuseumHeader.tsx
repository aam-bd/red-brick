/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Landmark, Compass, Award } from 'lucide-react';
import { ExhibitionSection, NavigationItem } from '../types';

interface MuseumHeaderProps {
  activeSection: ExhibitionSection;
  onNavigate: (section: ExhibitionSection) => void;
}

export default function MuseumHeader({ activeSection, onNavigate }: MuseumHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: NavigationItem[] = [
    { id: ExhibitionSection.UNVEILING, label: 'THE UNVEILING', serialNumber: 'CAT.I', description: 'Genesis' },
    { id: ExhibitionSection.PROVENANCE, label: 'PROVENANCE', serialNumber: 'CAT.II', description: 'Geology & Fire' },
    { id: ExhibitionSection.ANATOMY, label: 'ANATOMY & RATIO', serialNumber: 'CAT.III', description: 'Specification' },
    { id: ExhibitionSection.ACQUISITION, label: 'ACQUISITION', serialNumber: 'CAT.IV', description: 'The Vault' },
  ];

  const handleLinkClick = (id: ExhibitionSection) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-40 border-b border-luxury-gold/10 bg-luxury-emerald-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        {/* Museum Identity */}
        <div 
          onClick={() => handleLinkClick(ExhibitionSection.UNVEILING)}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <Landmark className="w-5 h-5 text-luxury-gold group-hover:rotate-6 transition-transform duration-300" />
          <div className="flex flex-col">
            <span className="font-serif text-base sm:text-lg tracking-[0.1em] text-luxury-offwhite font-bold group-hover:text-luxury-gold transition-colors duration-300">
              L'ART DE LA TERRE
            </span>
            <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.3em] text-luxury-gold-light/60 uppercase">
              Curated Museum Exhibition
            </span>
          </div>
        </div>

        {/* Desktop Exhibition Catalogue Navigation */}
        <nav className="hidden lg:flex items-center gap-x-4 xl:gap-x-6 2xl:gap-x-8">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className="relative py-2 px-1 flex flex-col items-center group cursor-pointer"
              >
                <span className="font-mono text-[7px] xl:text-[8px] tracking-[0.2em] text-luxury-gold/60 group-hover:text-luxury-gold transition-colors duration-300 mb-0.5">
                  {item.serialNumber}
                </span>
                <span className={`font-sans text-[10px] xl:text-xs tracking-[0.25em] transition-all duration-300 ${
                  isActive ? 'text-luxury-gold font-medium' : 'text-luxury-offwhite/60 group-hover:text-luxury-offwhite'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="header-active-dot"
                    className="absolute -bottom-1.5 w-1 h-1 bg-luxury-gold rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Catalog Status and CTA */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
          <div className="flex flex-col items-end border-r border-luxury-gold/15 pr-4 2xl:pr-6 font-mono text-[8px] 2xl:text-[9px] tracking-widest text-luxury-offwhite/45">
            <span>STATUS: INDIVIDUAL PIECE AVAILABLE</span>
            <span>SPECIMEN ID: #0001-A</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, backgroundColor: 'rgba(212, 175, 55, 0.08)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleLinkClick(ExhibitionSection.ACQUISITION)}
            className="border border-luxury-gold/40 hover:border-luxury-gold text-luxury-gold px-4 2xl:px-5 py-2 rounded text-[10px] 2xl:text-xs font-mono tracking-widest transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            REQUEST PRIVATE CATALOGUE
          </motion.button>
        </div>

        {/* Mobile Navigation Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-luxury-offwhite hover:text-luxury-gold p-2 cursor-pointer transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="absolute top-20 left-0 w-full bg-luxury-emerald-950 border-b border-luxury-gold/20 flex flex-col px-6 py-8 sm:px-8 lg:hidden shadow-2xl z-50"
          >
            {/* Visual background accents */}
            <div className="absolute inset-0 tailored-stripes opacity-20 pointer-events-none" />
            
            <div className="flex flex-col space-y-5 z-10">
              {menuItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className="flex justify-between items-center text-left py-2 border-b border-luxury-gold/10"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] text-luxury-gold/80">{item.serialNumber} — {item.description}</span>
                      <span className={`font-serif text-lg tracking-wider ${
                        isActive ? 'text-luxury-gold' : 'text-luxury-offwhite'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    <Compass className={`w-4 h-4 text-luxury-gold/30 ${isActive ? 'rotate-45 text-luxury-gold' : ''}`} />
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handleLinkClick(ExhibitionSection.ACQUISITION)}
              className="w-full text-center border border-luxury-gold text-luxury-gold bg-luxury-gold/5 py-3 rounded text-xs font-mono tracking-widest cursor-pointer hover:bg-luxury-gold/10 transition-colors"
            >
              REQUEST PRIVATE ACQUISITION
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
