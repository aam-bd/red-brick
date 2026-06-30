/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Calendar, Send, Loader2, Sparkles, MapPin, RefreshCw, HelpCircle, ArrowRight } from 'lucide-react';
import { slideUp, fadeIn, staggerContainer, LUXURY_EASE } from '../utils/animations';
import { InquiryFormState } from '../types';

type GameState = 'idle' | 'playing' | 'won' | 'lost';

export default function AcquisitionSection() {
  // Game states
  const [gameState, setGameState] = useState<GameState>('idle');
  const [scannedCells, setScannedCells] = useState<boolean[]>(new Array(50).fill(false));
  const [timeLeft, setTimeLeft] = useState<number>(5.0);
  const [shakeTrigger, setShakeTrigger] = useState<number>(0);
  const [formUnlocked, setFormUnlocked] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Sound effect procedures using Web Audio API to prevent 404s
  const playWinChime = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50, 2093.00]; // C5, E5, G5, C6, C7 sparkle
      
      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        
        // Premium metallic chime envelope
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.04 + i * 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 1.9);
      });
    } catch (e) {
      console.warn('Win audio failed:', e);
    }
  };

  const playTick = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(250, now + 0.04);
      
      gain.gain.setValueAtTime(0.012, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) {}
  };

  const playFailSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(70, now + 0.4);
      
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.45);
    } catch (e) {}
  };

  const playUnlockClick = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      
      // Node 1: High metallic click snap
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(2200, now);
      osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.02);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.04);

      // Node 2: Latch spring back resonator
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now);
      osc2.frequency.setValueAtTime(150, now + 0.015);
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(0.05, now + 0.005);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.15);
    } catch (e) {}
  };

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.05) {
          clearInterval(interval);
          handleFail();
          return 0.0;
        }
        return Math.max(0, prev - 0.05);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameState]);

  const handleFail = () => {
    setGameState('lost');
    playFailSound();
    setShakeTrigger((prev) => prev + 1);
  };

  const resetGame = () => {
    setGameState('idle');
    setScannedCells(new Array(50).fill(false));
    setTimeLeft(5.0);
  };

  // Grid Cell Interaction Handler
  const handleCellScan = (index: number) => {
    if (gameState === 'won' || gameState === 'lost') return;
    
    // Start game on first scan
    if (gameState === 'idle') {
      setGameState('playing');
    }

    if (!scannedCells[index]) {
      const updated = [...scannedCells];
      updated[index] = true;
      setScannedCells(updated);
      playTick();

      // Check win condition
      const scannedCount = updated.filter(Boolean).length;
      if (scannedCount === 50) {
        setGameState('won');
        setFormUnlocked(true);
        playWinChime();
      }
    }
  };

  const totalScanned = scannedCells.filter(Boolean).length;
  const progressPercentage = (totalScanned / 50) * 100;

  // Inquiry Form State
  const [form, setForm] = useState<InquiryFormState>({
    fullName: '',
    email: '',
    institution: '',
    intendedDisplay: 'private_gallery',
    message: '',
    acknowledgement: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acknowledgement) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, acknowledgement: e.target.checked }));
  };

  // Custom shackle & lock animation variants for the lock breaking apart
  const shackleVariants = {
    locked: { y: 0, rotate: 0 },
    unlocked: { y: -8, rotate: -45, x: -6, opacity: [1, 0.8, 0], transition: { duration: 0.6, ease: 'easeOut' as const } }
  };

  const lockBodyVariants = {
    locked: { scale: 1 },
    unlocked: { scale: 0.8, rotate: 15, y: 12, opacity: 0, transition: { duration: 0.6, ease: 'easeIn' as const } }
  };

  return (
    <section className="w-full min-h-screen bg-luxury-emerald-950 flex flex-col justify-center relative overflow-hidden py-16 px-6 border-t border-luxury-gold/15">
      {/* Background patterns */}
      <div className="absolute inset-0 tailored-stripes pointer-events-none opacity-20" />
      <div className="absolute inset-0 vignette pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!showForm ? (
            /* ================= STEP 1: INTERACTIVE SCANNING CHALLENGE ================= */
            <motion.div
              key="scanner-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: LUXURY_EASE }}
              className="w-full flex flex-col items-center max-w-4xl"
            >
              {/* Header section */}
              <div className="text-center flex flex-col items-center mb-10 space-y-3">
                <span className="font-mono text-[9px] tracking-[0.3em] text-luxury-gold uppercase font-bold">
                  EXHIBITION QUALIFICATION CODE // VER_REQ_77
                </span>
                
                <h2 className="font-serif text-4xl md:text-5xl text-luxury-offwhite tracking-tight italic font-medium">
                  Ownership <span className="text-luxury-gold not-italic">Must Be Earned.</span>
                </h2>
                
                <p className="font-mono text-[10px] text-luxury-offwhite/50 uppercase tracking-[0.15em] max-w-lg mt-2 leading-relaxed">
                  This artifact is not for passive consumers. Move your cursor over the mineral lattice of the brick below to complete a resonance scan within 5 seconds.
                </p>
              </div>

              {/* Grid / Calibration Panel Container */}
              <motion.div
                animate={shakeTrigger ? {
                  x: [0, -10, 10, -10, 10, -5, 5, 0],
                } : {}}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-luxury-charcoal/95 border border-luxury-gold/30 rounded-lg p-6 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.9)] relative flex flex-col items-center overflow-hidden"
              >
                {/* Embedded golden backglow for scanned illumination */}
                <div className="absolute inset-0 bg-radial-gradient from-luxury-gold/5 via-transparent to-transparent pointer-events-none" />

                {/* Laser scan lines sweeping when active */}
                {gameState === 'playing' && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-luxury-gold shadow-[0_0_8px_#B8860B] opacity-50 animate-bounce pointer-events-none z-10" />
                )}

                {/* Status HUD Header */}
                <div className="w-full flex justify-between items-center border-b border-luxury-gold/15 pb-4 mb-6">
                  <div className="flex items-center space-x-2.5 font-mono text-[9px] text-luxury-gold-light tracking-wider font-bold">
                    <span className={`w-2 h-2 rounded-full ${
                      gameState === 'won' ? 'bg-emerald-500 animate-pulse' :
                      gameState === 'lost' ? 'bg-luxury-crimson animate-ping' :
                      gameState === 'playing' ? 'bg-amber-500 animate-pulse' : 'bg-luxury-gold/50'
                    }`} />
                    <span className="uppercase">
                      {gameState === 'idle' && 'SYSTEM READY // WAITING FOR CURSOR'}
                      {gameState === 'playing' && 'SCAN IN PROGRESS // DETECTING CRYSTALLINE LATTICE'}
                      {gameState === 'won' && 'VERIFICATION COMPLETE // METRIC APPROVED'}
                      {gameState === 'lost' && 'SCAN TIMEOUT // LATTICE DISSISSIPATION'}
                    </span>
                  </div>

                  {/* Digital precision timer */}
                  <div className="font-mono text-base font-bold text-luxury-offwhite bg-luxury-emerald-950 px-3 py-1 rounded border border-luxury-gold/15 shadow-inner">
                    <span className={`transition-colors duration-300 ${timeLeft <= 2.0 && gameState === 'playing' ? 'text-luxury-crimson' : 'text-luxury-gold-light'}`}>
                      0{timeLeft.toFixed(2)}s
                    </span>
                  </div>
                </div>

                {/* The Center Interactive Scan Display Platform */}
                <div className="relative w-full max-w-lg aspect-[2] flex items-center justify-center bg-luxury-emerald-950/40 rounded border border-luxury-gold/10 p-4">
                  
                  {/* Outer Pedestal under brick */}
                  <div className="absolute bottom-1 w-48 h-3 bg-luxury-charcoal border border-luxury-gold/20 rounded-sm z-0" />
                  <div className="absolute bottom-4 w-40 h-1 bg-luxury-gold/20 rounded-full blur-[1px]" />

                  {/* STEP A: Bottom Secret Emblem Layer (grows in opacity as we scan cells) */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 transition-opacity duration-500"
                    style={{ opacity: gameState === 'won' ? 1 : progressPercentage / 100 * 0.4 }}
                  >
                    {/* Glowing gold seal vector */}
                    <svg viewBox="0 0 100 100" className="w-28 h-28 text-luxury-gold-light animate-pulse">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
                      <path fill="none" stroke="currentColor" strokeWidth="1" d="M30 40 L50 20 L70 40 L50 80 Z" />
                      <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.75" />
                      <path fill="none" stroke="currentColor" strokeWidth="0.5" d="M10 50 L90 50 M50 10 L50 90" />
                      <text x="50" y="53" textAnchor="middle" fill="currentColor" fontSize="8" className="font-mono tracking-tighter uppercase font-bold">FOUND</text>
                    </svg>
                  </div>

                  {/* STEP B: Classic Terracotta Brick layer */}
                  <div 
                    className={`brick-artistic w-64 h-32 transform relative z-10 transition-all duration-500 overflow-hidden ${
                      gameState === 'won' ? 'shadow-[0_0_40px_rgba(184,134,11,0.35)] scale-[1.03]' : ''
                    }`}
                    style={{
                      transformStyle: 'preserve-3d',
                      perspective: 1000,
                      transform: 'rotateX(12deg) rotateY(-18deg)',
                    }}
                  >
                    {/* Brick internal shade texture */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/35 pointer-events-none" />

                    {/* Emblem signature on brick surface (visible when won) */}
                    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
                      gameState === 'won' ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="w-14 h-14 rounded-full border border-luxury-gold/50 bg-luxury-emerald-950/80 flex items-center justify-center animate-ping">
                        <Sparkles className="w-6 h-6 text-luxury-gold" />
                      </div>
                    </div>

                    {/* STEP C: Interactive Sensor grid overlay mapped exactly over brick */}
                    <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 select-none z-20">
                      {scannedCells.map((scanned, idx) => (
                        <div
                          key={idx}
                          onMouseEnter={() => handleCellScan(idx)}
                          onTouchStart={() => handleCellScan(idx)}
                          onTouchMove={() => handleCellScan(idx)}
                          className="relative cursor-crosshair w-full h-full border-[0.5px] border-luxury-emerald-950/15"
                        >
                          {/* Dark mineral layer that covers emblem. Opacity 0 if scanned to reveal emblem underneath */}
                          <div className={`absolute inset-0 bg-luxury-crimson/5 bg-gradient-to-br from-luxury-crimson to-black/80 transition-all duration-700 pointer-events-none ${
                            scanned ? 'opacity-0 scale-90 blur-sm' : 'opacity-100'
                          }`} />

                          {/* Glowing scanner ring on scan */}
                          {scanned && (
                            <div className="absolute inset-0 bg-luxury-gold/15 animate-pulse rounded-full border border-luxury-gold/30 pointer-events-none" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Calibration metrics indicators */}
                <div className="w-full mt-6 space-y-3.5">
                  <div className="flex justify-between items-end font-mono text-[9px] text-luxury-offwhite/50">
                    <span>LATTICE RECONSTRUCTION PROGRESS</span>
                    <span className="text-luxury-gold-light font-bold">{progressPercentage.toFixed(0)}%</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-luxury-emerald-950 border border-luxury-gold/10 rounded overflow-hidden p-0.5 shadow-inner">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-luxury-bronze via-luxury-gold to-luxury-gold-light rounded"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>

                  {/* HUD controls and help notes */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-mono text-[8px] text-luxury-offwhite/30 tracking-widest uppercase">
                      Laser Resonance Metrology // Unit 4
                    </span>

                    {gameState === 'lost' && (
                      <button
                        onClick={resetGame}
                        className="flex items-center space-x-2 bg-luxury-crimson/10 border border-luxury-crimson text-luxury-offwhite hover:bg-luxury-crimson/20 font-mono text-[9px] tracking-widest font-bold px-4 py-2 rounded-sm cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>RETRY CALIBRATION</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* ================= OWNERSHIP ACTION SECTION BELOW SCANNER ================= */}
              <div className="mt-10 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  {gameState === 'won' ? (
                    /* Activated Emblem / Success HUD Text */
                    <motion.div
                      key="win-text"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mb-4 flex flex-col items-center"
                    >
                      <div className="flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/30 px-4 py-1.5 rounded-full mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span className="font-mono text-[9px] text-emerald-400 tracking-widest uppercase font-bold">
                          PATRON ACCOUNT AUTHORIZED FOR DISPENSATION
                        </span>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* THE LOCKED / UNLOCKED BUTTON */}
                <motion.button
                  whileHover={formUnlocked ? { scale: 1.04, boxShadow: '0 0 35px rgba(185, 28, 28, 0.4)' } : {}}
                  whileTap={formUnlocked ? { scale: 0.96 } : {}}
                  disabled={!formUnlocked}
                  onClick={() => {
                    playUnlockClick();
                    setShowForm(true);
                  }}
                  className={`relative font-mono text-xs tracking-[0.2em] font-bold py-5 px-14 rounded-sm flex items-center justify-center space-x-3 transition-all duration-500 group select-none min-w-[280px] ${
                    formUnlocked
                      ? 'bg-luxury-crimson text-luxury-offwhite border border-luxury-crimson hover:bg-red-800 cursor-pointer'
                      : 'bg-[#5e4b3c]/20 border border-luxury-bronze/35 text-luxury-offwhite/40 cursor-not-allowed'
                  }`}
                >
                  {/* Lock icon with split animation */}
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <motion.svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-current"
                    >
                      {/* Shackle piece */}
                      <motion.path
                        d="M7 11V7a5 5 0 0 1 10 0v4"
                        variants={shackleVariants}
                        animate={formUnlocked ? 'unlocked' : 'locked'}
                        initial="locked"
                      />
                      {/* Lock body piece */}
                      <motion.rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                        variants={lockBodyVariants}
                        animate={formUnlocked ? 'unlocked' : 'locked'}
                        initial="locked"
                      />
                    </motion.svg>
                  </div>

                  <span>ACQUIRE THE FOUNDATION</span>
                  
                  {formUnlocked && (
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* ================= STEP 2: DOSSIER SUBMISSION FORM ================= */
            <motion.div
              key="form-step"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: LUXURY_EASE }}
              className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left Side Info */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="flex items-center space-x-2">
                  <span className="w-8 h-px bg-luxury-gold" />
                  <span className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase">PATRON REGISTRATION // SEC. IV</span>
                </div>

                <h2 className="font-serif text-4xl md:text-5xl text-luxury-offwhite tracking-tight leading-tight">
                  Acquire <br />
                  Specimen <span className="italic text-luxury-gold">BRK-001</span>
                </h2>

                <p className="font-sans text-sm text-luxury-offwhite/70 font-light leading-relaxed max-w-sm">
                  Your lattice verification hash <span className="font-mono text-xs text-luxury-gold">#LTC-VER-PASS</span> is saved. Acquisitions are strictly limited to verified collections, cultural foundations, or bespoke private galleries. Due to high interest, pricing is disclosed solely upon formal vetting.
                </p>

                <div className="space-y-4 pt-4 border-t border-luxury-gold/15">
                  <div className="flex items-start space-x-3">
                    <div className="bg-luxury-gold/10 p-2 rounded-sm shrink-0 border border-luxury-gold/25 mt-0.5">
                      <Calendar className="w-4 h-4 text-luxury-gold" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-luxury-gold uppercase tracking-widest block font-bold">Curator Consultation</span>
                      <p className="font-sans text-xs text-luxury-offwhite/60 leading-relaxed max-w-xs">
                        Every acquisition includes an optional 30-minute private video call with our lead archaeologist and kiln-master.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="bg-luxury-gold/10 p-2 rounded-sm shrink-0 border border-luxury-gold/25 mt-0.5">
                      <MapPin className="w-4 h-4 text-luxury-gold" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-luxury-gold uppercase tracking-widest block font-bold">Courier & Delivery</span>
                      <p className="font-sans text-xs text-luxury-offwhite/60 leading-relaxed max-w-xs">
                        Shipped worldwide in a custom temperature-controlled solid oak case, padded with museum-grade conservation velvet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side Application form */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="acquisition-form"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.5 }}
                      className="bg-luxury-charcoal/90 backdrop-blur-md border border-luxury-gold/25 p-8 md:p-12 rounded-lg shadow-2xl relative"
                    >
                      <div className="absolute top-2 left-4 font-mono text-[8px] text-luxury-gold/50">VAULT LEDGER ENTRY CODE: SEC_VAULT_91</div>
                      
                      <h3 className="font-serif text-2xl text-luxury-offwhite tracking-wide mb-6 pt-4">
                        Request Private Catalogue & Valuation
                      </h3>

                      <form onSubmit={handleSubmitForm} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Full Name */}
                          <div className="flex flex-col space-y-1">
                            <label htmlFor="fullName" className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase font-bold">Full Name / Patron Title</label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              required
                              value={form.fullName}
                              onChange={handleInputChange}
                              className="bg-luxury-emerald-950/40 border border-luxury-gold/20 focus:border-luxury-gold rounded p-3 text-sm text-luxury-offwhite font-sans focus:outline-none transition-colors"
                              placeholder="e.g., Lord Sterling, Sir Julian"
                            />
                          </div>

                          {/* Email */}
                          <div className="flex flex-col space-y-1">
                            <label htmlFor="email" className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase font-bold">Private Email Address</label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              required
                              value={form.email}
                              onChange={handleInputChange}
                              className="bg-luxury-emerald-950/40 border border-luxury-gold/20 focus:border-luxury-gold rounded p-3 text-sm text-luxury-offwhite font-sans focus:outline-none transition-colors"
                              placeholder="e.g., julian@heritagefoundation.org"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Institution */}
                          <div className="flex flex-col space-y-1">
                            <label htmlFor="institution" className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase font-bold">Affiliated Institution</label>
                            <input
                              type="text"
                              id="institution"
                              name="institution"
                              value={form.institution}
                              onChange={handleInputChange}
                              className="bg-luxury-emerald-950/40 border border-luxury-gold/20 focus:border-luxury-gold rounded p-3 text-sm text-luxury-offwhite font-sans focus:outline-none transition-colors"
                              placeholder="e.g., Louvre Curation, Private Trust"
                            />
                          </div>

                          {/* Intended Display */}
                          <div className="flex flex-col space-y-1">
                            <label htmlFor="intendedDisplay" className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase font-bold">Intended Environment</label>
                            <select
                              id="intendedDisplay"
                              name="intendedDisplay"
                              value={form.intendedDisplay}
                              onChange={handleInputChange}
                              className="bg-luxury-emerald-950 border border-luxury-gold/20 focus:border-luxury-gold rounded p-3 text-sm text-luxury-offwhite font-sans focus:outline-none transition-colors"
                            >
                              <option value="private_gallery">Bespoke Private Art Gallery</option>
                              <option value="museum_hall">Permanent Museum Exhibition</option>
                              <option value="corporate_atrium">High-Society Executive Office</option>
                              <option value="vault_safe">Curated Steel Security Vault</option>
                            </select>
                          </div>
                        </div>

                        {/* Message to Curator */}
                        <div className="flex flex-col space-y-1">
                          <label htmlFor="message" className="font-mono text-[9px] tracking-widest text-luxury-gold uppercase font-bold">Statement of Acquisition Intent</label>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            value={form.message}
                            onChange={handleInputChange}
                            className="bg-luxury-emerald-950/40 border border-luxury-gold/20 focus:border-luxury-gold rounded p-3 text-sm text-luxury-offwhite font-sans focus:outline-none transition-colors resize-none text-luxury-offwhite"
                            placeholder="Explain how this fine terracotta specimen aligns with your collection's aesthetic philosophy..."
                          />
                        </div>

                        {/* Acknowledgement Checkbox */}
                        <div className="flex items-start space-x-3 pt-2">
                          <input
                            type="checkbox"
                            id="acknowledgement"
                            required
                            checked={form.acknowledgement}
                            onChange={handleCheckboxChange}
                            className="mt-1 w-4 h-4 rounded border-luxury-gold bg-luxury-emerald-950/50 text-luxury-gold focus:ring-0 cursor-pointer"
                          />
                          <label htmlFor="acknowledgement" className="font-sans text-xs text-luxury-offwhite/60 leading-relaxed select-none">
                            I understand that Specimen BRK-001 is a genuine structural clay brick, catalogued with scientific exactness, and that completing this form initiates a formal curation audit.
                          </label>
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting || !form.acknowledgement}
                          className={`w-full py-4 rounded-sm font-mono text-xs tracking-widest font-bold border transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                            form.acknowledgement 
                              ? 'bg-luxury-gold border-luxury-gold text-luxury-emerald-950 hover:bg-luxury-gold-light hover:shadow-xl hover:shadow-luxury-gold/5' 
                              : 'bg-transparent border-luxury-gold/15 text-luxury-offwhite/30 cursor-not-allowed'
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-luxury-emerald-950" />
                              <span>PROCESSING VETTING STATUS...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>SUBMIT DOSSIER TO CURATOR</span>
                            </>
                          )}
                        </button>
                      </form>
                    </motion.div>
                  ) : (
                    /* Success / Sealed Envelope State */
                    <motion.div
                      key="acquisition-success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-gradient-to-b from-luxury-emerald-900 to-[#020c08] border border-luxury-gold/40 p-8 md:p-12 rounded-lg text-center shadow-2xl relative"
                    >
                      {/* Gold Seal element */}
                      <div className="w-16 h-16 rounded-full bg-luxury-gold/10 border border-luxury-gold/50 flex items-center justify-center mx-auto mb-6 relative">
                        <Sparkles className="w-8 h-8 text-luxury-gold animate-pulse" />
                      </div>

                      <span className="font-mono text-[9px] tracking-[0.25em] text-luxury-gold uppercase font-bold block mb-1">
                        PATRON APPLICATION SUBMITTED
                      </span>
                      
                      <h3 className="font-serif text-3xl text-luxury-offwhite tracking-wide mb-4">
                        Dossier Under Review
                      </h3>

                      <p className="font-sans text-sm text-luxury-offwhite/75 font-light leading-relaxed max-w-md mx-auto mb-8">
                        Thank you, <span className="text-luxury-gold font-medium">{form.fullName}</span>. Your request has been sealed and catalogued under Ledger Code <span className="font-mono text-xs text-luxury-gold font-bold">#REQ-BRK-918</span>. Our lead archivist will contact you within 24 standard solar hours.
                      </p>

                      <div className="border-t border-luxury-gold/15 pt-6 max-w-sm mx-auto flex items-center justify-center space-x-3 text-[10px] font-mono text-luxury-offwhite/50">
                        <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                        <span>SECURED PATRON RECORDS // EST. 2026</span>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
                        <button
                          onClick={() => {
                            setIsSubmitted(false);
                            setFormUnlocked(false);
                            setShowForm(false);
                            resetGame();
                          }}
                          className="font-mono text-[10px] tracking-widest text-luxury-gold hover:text-luxury-gold-light border-b border-luxury-gold/20 hover:border-luxury-gold transition-all duration-300 pb-0.5 cursor-pointer"
                        >
                          RESET CALIBRATION
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
