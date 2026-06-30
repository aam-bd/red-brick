/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function MuseumCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Core coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for the beautiful delayed organic outer circle
  const springConfig = { stiffness: 220, damping: 28, mass: 0.6 };
  const trailX = useSpring(mouseX, springConfig);
  const trailY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch-capable/mobile systems to disable custom cursor safely
    const detectMobile = () => {
      const match = window.matchMedia('(pointer: coarse)');
      setIsMobile(match.matches || window.innerWidth < 768);
    };

    detectMobile();
    window.addEventListener('resize', detectMobile);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Detect clickables hovers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer') ||
        target.closest('[role="button"]');

      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', detectMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // Honor Reduced Motion settings
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isMobile || prefersReducedMotion || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Outer Springing Laser/Ring */}
      <motion.div
        style={{
          left: trailX,
          top: trailY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          borderColor: isHovered ? '#dfa824' : '#B8860B',
          backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.08)' : 'rgba(212, 175, 55, 0)',
        }}
        transition={{ duration: 0.25 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-luxury-gold pointer-events-none z-[9999] mix-blend-screen"
      />

      {/* Tiny Instant Golden Core Dot */}
      <motion.div
        style={{
          left: mouseX,
          top: mouseY,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.75 : 1,
          backgroundColor: isHovered ? '#dfa824' : '#B8860B',
        }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] mix-blend-screen shadow-[0_0_8px_#dfa824]"
      />
    </>
  );
}
