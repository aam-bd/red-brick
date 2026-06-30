/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Shield, Award, Landmark, MapPin } from 'lucide-react';

export default function MuseumFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-luxury-gold/15 bg-luxury-charcoal/80 text-luxury-offwhite/70 py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 tailored-stripes opacity-15 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Gallery Intro */}
        <div className="md:col-span-2 flex flex-col space-y-4">
          <div className="flex items-center space-x-2 text-luxury-gold">
            <Landmark className="w-4 h-4" />
            <span className="font-serif text-sm tracking-[0.2em] font-bold">L'ART DE LA TERRE</span>
          </div>
          <p className="font-sans text-xs text-luxury-offwhite/50 leading-relaxed max-w-sm">
            An international curation of elemental artifacts. We discover, document, and preserve ordinary earthly forms, casting them into high-luxury collectible records of civilization and geology.
          </p>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-luxury-gold-light/60 pt-2">
            <MapPin className="w-3 h-3 text-luxury-gold" />
            <span>KILN GRID REF: 51.5074° N, 0.1278° W</span>
          </div>
        </div>

        {/* Geological Metadata */}
        <div className="flex flex-col space-y-3">
          <span className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase">Geological Ledger</span>
          <ul className="space-y-1.5 font-mono text-[10px] text-luxury-offwhite/50">
            <li>FORM: Terracotta Brick Specimen</li>
            <li>ORIGIN: Deep-well alluvial clay beds</li>
            <li>FORMATION: Early Devonian Epoch (~400M BCE)</li>
            <li>KILN TEMP: 1,120°C Thermal Constant</li>
          </ul>
        </div>

        {/* Certificates & Curation */}
        <div className="flex flex-col space-y-3">
          <span className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase">Exhibition Curation</span>
          <div className="space-y-3 font-sans text-xs text-luxury-offwhite/50">
            <div className="flex items-start space-x-2">
              <Shield className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
              <span>Full geological provenance ledger provided with physical acquisition.</span>
            </div>
            <div className="flex items-start space-x-2">
              <Award className="w-3.5 h-3.5 text-luxury-gold shrink-0 mt-0.5" />
              <span>Museum registration stamp and certificate included.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Fine Print */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-luxury-gold/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-luxury-offwhite/40 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row md:space-x-6">
          <span>© {currentYear} L'ART DE LA TERRE. All rights reserved.</span>
          <a href="#privacy" className="hover:text-luxury-gold transition-colors">EXHIBITION PROTOCOL</a>
          <a href="#terms" className="hover:text-luxury-gold transition-colors">ACQUISITION CHARTER</a>
        </div>
        <div className="tracking-widest text-luxury-gold/60 text-right">
          CATALOGUE NO: BRK-001 // COLLECTOR SPECIAL EDITION
        </div>
      </div>
    </footer>
  );
}
