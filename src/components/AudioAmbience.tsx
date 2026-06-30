/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Music, Play, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15); // Luxurious soft ambient volume
  const [isHovered, setIsHovered] = useState(false);
  
  // Web Audio Nodes references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const filterRef = useRef<BiquadFilterNode | null>(null);

  const startAmbience = () => {
    try {
      // Create audio context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Filter to keep it deeply atmospheric, cutting off high frequencies
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, ctx.currentTime); // Low deep rumbles
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      filterRef.current = filter;

      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGainRef.current = masterGain;

      // Connect nodes
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Synthesize a luxurious major chord of deep frequencies
      // Frequencies corresponding to an ambient museum drone: F2, C3, A3 (Warm, stable chord)
      const frequencies = [87.31, 130.81, 220.00, 329.63]; 
      const oscillators: OscillatorNode[] = [];

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        // Soft triangle and sine waves mixed
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        // Add subtle detuning for beautiful lush chorus movement
        osc.detune.setValueAtTime((idx - 1.5) * 6, ctx.currentTime);

        const oscGain = ctx.createGain();
        // Lower frequencies have more power, keep overall level soft
        const individualVolume = idx === 0 ? 0.4 : idx === 1 ? 0.35 : 0.25;
        oscGain.gain.setValueAtTime(individualVolume, ctx.currentTime);

        // Slow LFO-like volume swell for organic flow
        const swellTime = 4 + idx * 2.5;
        const now = ctx.currentTime;
        oscGain.gain.setValueAtTime(individualVolume * 0.5, now);
        
        // Setup oscillating gain changes
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start(0);
        
        oscillators.push(osc);
      });

      oscsRef.current = oscillators;
      setIsPlaying(true);
    } catch (error) {
      console.warn("Web Audio API not supported or user gesture required:", error);
    }
  };

  const stopAmbience = () => {
    // Graceful fade out
    if (masterGainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      masterGainRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
      
      setTimeout(() => {
        oscsRef.current.forEach(osc => {
          try { osc.stop(); } catch (e) {}
        });
        oscsRef.current = [];
        if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
          audioCtxRef.current.close();
        }
        audioCtxRef.current = null;
        masterGainRef.current = null;
        setIsPlaying(false);
      }, 1300);
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopAmbience();
    } else {
      startAmbience();
    }
  };

  // Keep volume nodes in sync
  useEffect(() => {
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.linearRampToValueAtTime(volume, audioCtxRef.current.currentTime + 0.1);
    }
  }, [volume]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      oscsRef.current.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed bottom-6 right-6 z-50 flex items-center bg-luxury-charcoal/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-luxury-gold/25 shadow-lg select-none transition-all duration-300"
    >
      <div className="flex items-center space-x-3">
        {/* Pulsing indicator */}
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <span className="relative flex h-2 w-2 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-luxury-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-luxury-gold"></span>
            </span>
          ) : (
            <span className="h-2 w-2 rounded-full bg-luxury-offwhite/30 mr-1" />
          )}
        </div>

        {/* Ambient Controls */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={togglePlayback}
            className="text-luxury-gold hover:text-luxury-gold-light transition-colors p-1 rounded-full hover:bg-luxury-gold/10 cursor-pointer flex items-center justify-center"
            title={isPlaying ? "Mute Gallery Hum" : "Unmute Gallery Hum"}
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-luxury-gold" />
            ) : (
              <VolumeX className="w-4 h-4 text-luxury-offwhite/50" />
            )}
          </button>

          <span className="font-mono text-[9px] tracking-widest text-luxury-offwhite/80 uppercase">
            {isPlaying ? "GALLERY HUM ACTIVE" : "AMB_MUTED"}
          </span>
        </div>

        {/* Expandable volume slider on hover */}
        <AnimatePresence>
          {isHovered && isPlaying && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center overflow-hidden pl-2"
            >
              <input
                type="range"
                min="0.0"
                max="0.3"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-16 accent-luxury-gold h-1 cursor-pointer bg-luxury-offwhite/10 rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
