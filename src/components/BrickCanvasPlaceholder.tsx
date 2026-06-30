/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Center, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { Orbit, RefreshCw, Layers, ShieldCheck, Eye } from 'lucide-react';

// Elegant 3D Brick Mesh inside the Canvas
function LuxuryBrick3D() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Custom slow elegant rotation and gentle floating
  useFrame((state) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      
      // Float
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.08 + 0.1;
    }
  });

  return (
    <group>
      {/* Gentle glow underneath */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshBasicMaterial 
          color="#d4af37" 
          transparent 
          opacity={0.06} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Solid Red Brick */}
      <mesh ref={meshRef} castShadow receiveShadow position={[0, 0, 0]}>
        {/* Box dimensions: Standard brick proportions 2.3 x 0.76 x 1.1 */}
        <boxGeometry args={[2.3, 0.76, 1.1]} />
        <meshStandardMaterial
          color="#b04131" // Terracotta luxury red ochre
          roughness={0.85}
          metalness={0.08}
          bumpScale={0.05}
          flatShading={false}
        />
      </mesh>

      {/* Gold Pedestal Accent */}
      <mesh position={[0, -0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.6, 0.2, 32]} />
        <meshStandardMaterial 
          color="#d4af37" 
          roughness={0.3} 
          metalness={0.8} 
        />
      </mesh>

      {/* Dark Marble Pedestal Base */}
      <mesh position={[0, -1.3, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.7, 1.8, 1.0, 32]} />
        <meshStandardMaterial 
          color="#121212" 
          roughness={0.1} 
          metalness={0.1} 
        />
      </mesh>
    </group>
  );
}

export default function BrickCanvasPlaceholder() {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'3d' | 'provenance'>('3d');
  const [activeAnatomy, setActiveAnatomy] = useState<string | null>(null);

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
    
    // Simulate initial loading for luxurious tension
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const dimensions = [
    { label: "Absolute Length", value: "230 mm", code: "L-AXIS" },
    { label: "Nominal Width", value: "110 mm", code: "W-AXIS" },
    { label: "Imperial Height", value: "76 mm", code: "H-AXIS" },
    { label: "Exhibition Mass", value: "3.20 kg", code: "M-SPEC" }
  ];

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] bg-luxury-charcoal/40 rounded-xl border border-luxury-gold/15 overflow-hidden flex flex-col items-center justify-center museum-vignette">
      {/* Decorative Museum Showcase Overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col space-y-1 bg-luxury-charcoal/80 backdrop-blur-md px-3 py-1.5 rounded border border-luxury-gold/20">
        <span className="font-mono text-[9px] tracking-widest text-luxury-gold/70">EXHIBITION ID</span>
        <span className="font-serif text-sm tracking-wide text-luxury-offwhite font-bold">BRK-001 / GENESIS</span>
      </div>

      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2">
        <button
          onClick={() => setViewMode(viewMode === '3d' ? 'provenance' : '3d')}
          className="bg-luxury-charcoal/80 hover:bg-luxury-gold/20 text-luxury-offwhite hover:text-luxury-gold border border-luxury-gold/20 px-3 py-1.5 rounded text-xs font-mono tracking-wider transition-all duration-300 flex items-center space-x-1.5 cursor-pointer"
        >
          {viewMode === '3d' ? (
            <>
              <Layers className="w-3.5 h-3.5" />
              <span>VIEW BLUEPRINT</span>
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              <span>ACTIVATE 3D</span>
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-luxury-emerald-950"
          >
            <div className="w-12 h-12 rounded-full border-2 border-luxury-gold/10 border-t-luxury-gold animate-spin mb-4" />
            <span className="font-mono text-xs tracking-[0.25em] text-luxury-gold/70 uppercase">Calibrating Showcase Optics...</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Showcase Stage */}
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait">
          {viewMode === '3d' ? (
            <motion.div
              key="stage-3d"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              {hasWebGL ? (
                <div className="w-full h-full">
                  <Canvas shadows>
                    <PerspectiveCamera makeDefault position={[0, 1.2, 4.5]} fov={45} />
                    <color attach="background" args={['#020c08']} />
                    
                    {/* Atmospheric Fog */}
                    <fog attach="fog" args={['#020c08', 3, 8]} />
                    
                    {/* Soft Museum Ambient Light */}
                    <ambientLight intensity={1.2} />
                    
                    {/* Drama Spotlight from Top Left */}
                    <spotLight 
                      position={[4, 5, 3]} 
                      angle={0.3} 
                      penumbra={0.8} 
                      intensity={4.5} 
                      castShadow 
                      color="#f5f2eb"
                    />

                    {/* Muted Gold Accent Light from Bottom Right */}
                    <directionalLight 
                      position={[-3, -2, -1]} 
                      intensity={1.5} 
                      color="#d4af37" 
                    />

                    {/* Pedestal Accent Spotlight */}
                    <spotLight 
                      position={[0, 4, 0]} 
                      angle={0.4} 
                      penumbra={1} 
                      intensity={3.5} 
                      color="#dfc57d"
                    />

                    <Suspense fallback={null}>
                      <Center>
                        <LuxuryBrick3D />
                      </Center>
                      {/* Floating Gold/Bronze Dust particles */}
                      <Sparkles 
                        count={35} 
                        scale={4} 
                        size={1.5} 
                        speed={0.4} 
                        color="#d4af37" 
                        opacity={0.4}
                      />
                    </Suspense>

                    <OrbitControls 
                      enableZoom={true} 
                      minDistance={3}
                      maxDistance={6}
                      enablePan={false}
                      maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from going underground
                      autoRotate={false}
                    />
                  </Canvas>

                  {/* Tactile Control Overlay for User */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-luxury-charcoal/90 backdrop-blur-md px-4 py-2 rounded-full border border-luxury-gold/20 text-[10px] font-mono tracking-widest text-luxury-gold-light/80">
                    <span className="flex items-center"><Orbit className="w-3.5 h-3.5 mr-1.5 text-luxury-gold animate-pulse" /> DRAG TO INSPECT</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold/30" />
                    <span className="flex items-center"><RefreshCw className="w-3.5 h-3.5 mr-1.5 text-luxury-gold animate-spin" style={{ animationDuration: '8s' }} /> AUTOPLAY STABLE</span>
                  </div>
                </div>
              ) : (
                /* Fallback Elegant CSS 3D/Isometric representation if WebGL is disabled */
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#020c08] to-[#041c13] relative p-6">
                  <div className="absolute inset-0 tailored-stripes pointer-events-none" />
                  
                  {/* Floating 2.5D Styled Brick */}
                  <div className="relative w-72 h-44 flex items-center justify-center transform hover:scale-105 transition-all duration-700 cursor-pointer group">
                    <div className="absolute w-56 h-20 bg-[#b04131] rounded-sm transform rotate-[-12deg] skew-x-[15deg] shadow-[15px_30px_60px_rgba(0,0,0,0.7)] group-hover:bg-[#c14a38] transition-colors duration-500">
                      {/* Brick texture details */}
                      <div className="absolute top-2 left-4 right-4 h-1.5 bg-black/10 rounded-full opacity-30" />
                      <div className="absolute top-6 left-12 right-6 h-1.5 bg-black/15 rounded-full opacity-30" />
                      <div className="absolute bottom-4 left-6 right-16 h-1.5 bg-black/10 rounded-full opacity-20" />
                    </div>
                    {/* Gold Trim Pedestal Base */}
                    <div className="absolute bottom-8 w-60 h-4 bg-luxury-gold/70 rounded-full blur-[2px] opacity-25 animate-pulse" />
                  </div>

                  <span className="font-serif italic text-base text-luxury-gold/80 mt-6 tracking-wide text-center">
                    "Terracotta Earth & Fire: Unyielding Mass"
                  </span>
                  <span className="font-mono text-[9px] text-luxury-offwhite/50 uppercase tracking-[0.2em] mt-1">
                    [ WebGL standard bypass active — Rendering static gallery ]
                  </span>
                </div>
              )}
            </motion.div>
          ) : (
            /* Blueprint Specification Mode */
            <motion.div
              key="stage-blueprint"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full bg-gradient-to-b from-luxury-emerald-950 to-[#020c08] p-8 md:p-12 flex flex-col justify-between"
            >
              <div className="absolute inset-0 tailored-stripes pointer-events-none opacity-40" />
              
              {/* Grid blueprint pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full z-10">
                {/* Visual Technical Diagram */}
                <div className="flex flex-col items-center justify-center p-6 border border-luxury-gold/10 rounded bg-luxury-charcoal/50 backdrop-blur-sm relative">
                  <div className="absolute top-2 left-2 font-mono text-[8px] text-luxury-gold/50">DIAGRAM-09 // RATIO</div>
                  
                  {/* Stylized wireframe rectangle */}
                  <div className="relative w-64 h-32 border border-luxury-gold/30 rounded flex items-center justify-center">
                    <span className="absolute -top-5 font-mono text-[10px] text-luxury-gold-light">230mm (Length)</span>
                    <span className="absolute -right-14 rotate-90 font-mono text-[10px] text-luxury-gold-light">110mm (Width)</span>
                    <span className="absolute -bottom-5 font-mono text-[10px] text-luxury-gold-light">76mm (Height)</span>
                    
                    {/* Inner core chambers indicators */}
                    <div className="flex space-x-6">
                      <div className="w-10 h-10 rounded-full border border-dashed border-luxury-gold/20 flex items-center justify-center text-[8px] text-luxury-gold/30 font-mono">CORE-A</div>
                      <div className="w-10 h-10 rounded-full border border-dashed border-luxury-gold/20 flex items-center justify-center text-[8px] text-luxury-gold/30 font-mono">CORE-B</div>
                      <div className="w-10 h-10 rounded-full border border-dashed border-luxury-gold/20 flex items-center justify-center text-[8px] text-luxury-gold/30 font-mono">CORE-C</div>
                    </div>
                  </div>
                </div>

                {/* Technical data table */}
                <div className="flex flex-col justify-center space-y-4">
                  <h4 className="font-serif text-lg text-luxury-gold tracking-wider border-b border-luxury-gold/20 pb-2">
                    GEOMETRICAL ANATOMY
                  </h4>
                  <div className="space-y-3">
                    {dimensions.map((dim) => (
                      <div 
                        key={dim.code}
                        onMouseEnter={() => setActiveAnatomy(dim.code)}
                        onMouseLeave={() => setActiveAnatomy(null)}
                        className={`flex justify-between items-center p-2 rounded transition-all duration-300 border cursor-pointer ${
                          activeAnatomy === dim.code 
                            ? 'bg-luxury-gold/10 border-luxury-gold/40 pl-4' 
                            : 'bg-transparent border-transparent'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="font-sans text-xs text-luxury-offwhite/75">{dim.label}</span>
                          <span className="font-mono text-[8px] text-luxury-gold/50">{dim.code}</span>
                        </div>
                        <span className="font-mono text-sm text-luxury-gold font-bold">{dim.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-[9px] font-mono text-luxury-offwhite/40 mt-4 border-t border-luxury-gold/10 pt-3">
                <span>SCALED ARCHITECTURAL STANDARD</span>
                <span className="flex items-center text-luxury-gold/80"><ShieldCheck className="w-3.5 h-3.5 mr-1 text-luxury-gold" /> ACCREDITED LABORATORY CALIBRATION</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
