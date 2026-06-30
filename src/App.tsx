/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExhibitionSection } from './types';
import MuseumHeader from './components/MuseumHeader';
import MuseumFooter from './components/MuseumFooter';
import AudioAmbience from './components/AudioAmbience';
import MuseumLoader from './components/MuseumLoader';
import MuseumCursor from './components/MuseumCursor';
import DustParticles from './components/DustParticles';
import HeroSection from './sections/HeroSection';
import ScrollStorySection from './sections/ScrollStorySection';
import VerticalTimelineSection from './sections/VerticalTimelineSection';
import ProvenanceSection from './sections/ProvenanceSection';
import SpecificationSection from './sections/SpecificationSection';
import AcquisitionSection from './sections/AcquisitionSection';
import { Compass, Landmark, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<ExhibitionSection>(ExhibitionSection.UNVEILING);
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  // Smooth scroll to target section
  const navigateToSection = (section: ExhibitionSection) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Setup intersection observer to dynamically change active tab on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies the golden center of viewport
      threshold: 0.15
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as ExhibitionSection;
          setActiveSection(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const sections = Object.values(ExhibitionSection);
    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((sectionId) => {
        const el = document.getElementById(sectionId);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="min-h-screen relative bg-luxury-emerald-950 tailored-bg selection:bg-luxury-gold selection:text-luxury-emerald-950 font-sans text-luxury-offwhite overflow-x-hidden">
      {/* Tasteful Museum Loader before app is viewed */}
      <AnimatePresence>
        {!isLoaderComplete && (
          <MuseumLoader onComplete={() => setIsLoaderComplete(true)} />
        )}
      </AnimatePresence>

      {/* Floating Canvas Dust Particles */}
      <DustParticles />

      {/* Custom Luxurious Cursor */}
      <MuseumCursor />

      {/* Editorial Vertical Tailored Stripes Grid & Spotlights */}
      <div className="tailored-stripes pointer-events-none" />
      <div className="vignette pointer-events-none" />
      <div className="spotlight pointer-events-none" />

      {/* Dynamic Museum Catalogue Header */}
      <MuseumHeader 
        activeSection={activeSection} 
        onNavigate={navigateToSection} 
      />

      {/* Decorative vertical coordinates sidebar (desktop only) */}
      <div className="hidden xl:flex fixed left-4 2xl:left-8 bottom-16 xl:bottom-20 z-30 flex-col space-y-4 xl:space-y-5 items-center mix-blend-difference select-none pointer-events-none max-w-[12rem]">
        <span className="font-mono text-[8px] lg:text-[9px] tracking-[0.28em] text-luxury-gold/50 rotate-90 origin-left translate-x-2 pb-16 uppercase">
          [ DEPOSITION COORDS: DEVONIAN SILT BED ]
        </span>
        <div className="w-px h-14 bg-luxury-gold/30" />
        <span className="font-mono text-[10px] text-luxury-gold font-bold">BRK-001</span>
      </div>

      <div className="hidden xl:flex fixed right-4 2xl:right-8 top-24 xl:top-28 z-30 flex-col space-y-2.5 items-end mix-blend-difference select-none pointer-events-none max-w-[18rem]">
        <span className="font-mono text-[7px] lg:text-[8px] text-luxury-offwhite/40 uppercase tracking-[0.25em]">MUSEUM EXHIBIT STATUS</span>
        <div className="flex items-center space-x-1.5 font-mono text-[8px] lg:text-[9px] text-luxury-gold">
          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
          <span>INDIVIDUAL LEDGER PIECE #0001-A AVAILABLE</span>
        </div>
      </div>

      {/* Main Exhibition Slides */}
      <main className="relative z-10 w-full pt-24 px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-16">
        
        {/* Section 01: The Unveiling */}
        <div id={ExhibitionSection.UNVEILING} className="scroll-mt-20">
          <HeroSection onNavigate={navigateToSection} />
        </div>

        {/* Cinematic Scroll Storytelling Experience */}
        <ScrollStorySection />

        {/* Vertical Provenance Timeline */}
        <VerticalTimelineSection />

        {/* Section 02: Provenance */}
        <div id={ExhibitionSection.PROVENANCE} className="scroll-mt-20">
          <ProvenanceSection />
        </div>

        {/* Section 03: Anatomy & Specification */}
        <div id={ExhibitionSection.ANATOMY} className="scroll-mt-20">
          <SpecificationSection />
        </div>

        {/* Section 04: Acquisition Form Vault */}
        <div id={ExhibitionSection.ACQUISITION} className="scroll-mt-20">
          <AcquisitionSection />
        </div>

      </main>

      {/* Museum Curation Footer */}
      <MuseumFooter />

      {/* Interactive Web Audio Synthesizer Controls */}
      <AudioAmbience />
    </div>
  );
}
