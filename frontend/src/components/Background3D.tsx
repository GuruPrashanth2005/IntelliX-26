"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const [scrollY, setScrollY] = useState(0);

  // Track scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Base rotation
    const time = state.clock.getElapsedTime();
    
    // Rotate scene based on scroll and time
    // As user scrolls down, the entire 3D group rotates aggressively on the X and Y axes
    groupRef.current.rotation.y = time * 0.1 + scrollY * 0.002;
    groupRef.current.rotation.x = scrollY * 0.001;
    
    // Move the group slightly down/up based on scroll (parallax effect)
    groupRef.current.position.y = -scrollY * 0.005;
  });

  return (
    <group ref={groupRef}>
      {/* Central "AI Core" (Vector Brain) */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron args={[1.5, 1]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#6366f1" // Indigo
            wireframe 
            transparent 
            opacity={0.3} 
          />
        </Icosahedron>
        
        {/* Inner solid core */}
        <Icosahedron args={[0.8, 0]} position={[0, 0, 0]}>
          <meshStandardMaterial 
            color="#d946ef" // Fuchsia
            emissive="#d946ef"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </Icosahedron>
      </Float>

      {/* Floating Vector Embeddings / Particles */}
      <Sparkles 
        count={300} 
        scale={15} 
        size={3} 
        speed={0.4} 
        opacity={0.4} 
        color="#22d3ee" // Cyan
      />
      <Sparkles 
        count={200} 
        scale={20} 
        size={4} 
        speed={0.2} 
        opacity={0.3} 
        color="#6366f1" // Indigo
      />
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80 mix-blend-screen">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#d946ef" />
        <Scene />
      </Canvas>
    </div>
  );
}
