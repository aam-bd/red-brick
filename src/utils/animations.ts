/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Variants } from 'motion/react';

// Premium luxury easing curve: fast start, long elegant slow decay
export const LUXURY_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: LUXURY_EASE,
    },
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: LUXURY_EASE,
    },
  },
};

export const slideUpStaggered: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.4,
      ease: LUXURY_EASE,
    },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.4,
      ease: LUXURY_EASE,
    },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.4,
      ease: LUXURY_EASE,
    },
  },
};

export const scaleExhibit: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.6,
      ease: LUXURY_EASE,
    },
  },
};

export const goldGlow: Variants = {
  initial: { boxShadow: '0 0 0px rgba(212, 175, 55, 0)' },
  hover: {
    boxShadow: '0 0 15px rgba(212, 175, 55, 0.35)',
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

export const brickRotation = {
  animate: {
    y: [0, -10, 0],
    rotateY: [0, 360],
    transition: {
      y: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
      rotateY: {
        duration: 25,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
};
