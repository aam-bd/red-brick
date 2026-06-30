/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export default function DustParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Subtle drift particle properties
    interface Particle {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeSpeed: number;
      pulseSpeed: number;
      pulseOffset: number;
    }

    // Keep it sparse and elegant (around 45 particles max for a whole screen)
    const particleCount = 40;
    const particles: Particle[] = [];

    const createParticle = (initialYAtBottom = false): Particle => {
      return {
        x: Math.random() * width,
        y: initialYAtBottom ? height + Math.random() * 20 : Math.random() * height,
        radius: Math.random() * 1.5 + 0.5, // Tiny premium specs
        speedY: -(Math.random() * 0.3 + 0.1), // Slow upward drift
        speedX: (Math.random() * 0.2 - 0.1), // Slight sway
        opacity: Math.random() * 0.4 + 0.1,
        fadeSpeed: 0.005 + Math.random() * 0.005,
        pulseSpeed: 0.01 + Math.random() * 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      };
    };

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(false));
    }

    const resizeHandler = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeHandler);

    // Audio interaction/render loops
    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick++;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move particle
        p.y += p.speedY;
        p.x += p.speedX;

        // Soft drift oscillation
        p.x += Math.sin(tick * 0.01 + p.pulseOffset) * 0.05;

        // Apply a smooth breath pulse to the opacity
        const pulse = Math.sin(tick * p.pulseSpeed + p.pulseOffset) * 0.15;
        const currentOpacity = Math.max(0.02, Math.min(0.65, p.opacity + pulse));

        // Draw particle as a delicate glowing orb
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradient.addColorStop(0, `rgba(184, 134, 11, ${currentOpacity})`); // Muted gold
        gradient.addColorStop(1, 'rgba(184, 134, 11, 0)');
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Recycle particle when it goes off screen
        if (p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles[i] = createParticle(true);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: 'screen' }}
      aria-hidden="true"
    />
  );
}
