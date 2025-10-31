"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export interface TrajectoryPoint {
  x: number;
  y: number;
  z: number;
  timestep?: number;
  time?: number;
}

interface LorenzAttractor3DProps {
  points: TrajectoryPoint[];
  autoRotate?: boolean;
  lineColor?: string;
  lineWidth?: number;
}

function LorenzTrajectory({ points, lineColor = '#6366f1', lineWidth = 1.5 }: { points: TrajectoryPoint[]; lineColor: string; lineWidth: number }) {
  const lineRef = useRef<THREE.Line>(null!);
  
  const geometry = useMemo(() => {
    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);
    
    // Normalize points for better visualization
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;
    
    points.forEach(p => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
      minZ = Math.min(minZ, p.z);
      maxZ = Math.max(maxZ, p.z);
    });
    
    const scale = 1 / Math.max(maxX - minX, maxY - minY, maxZ - minZ) * 15;
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const centerZ = (minZ + maxZ) / 2;
    
    // Create gradient from blue to purple
    const color1 = new THREE.Color(0x3b82f6); // blue
    const color2 = new THREE.Color(0x8b5cf6); // purple
    
    points.forEach((p, i) => {
      const idx = i * 3;
      positions[idx] = (p.x - centerX) * scale;
      positions[idx + 1] = (p.y - centerY) * scale;
      positions[idx + 2] = (p.z - centerZ) * scale;
      
      // Gradient based on position in trajectory
      const t = i / points.length;
      const color = color1.clone().lerp(color2, t);
      colors[idx] = color.r;
      colors[idx + 1] = color.g;
      colors[idx + 2] = color.b;
    });
    
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geom;
  }, [points]);
  
  return (
    <line ref={lineRef}>
      <primitive object={geometry} />
      <lineBasicMaterial 
        vertexColors 
        linewidth={lineWidth}
        transparent
        opacity={0.8}
      />
    </line>
  );
}

function AutoRotateCamera({ autoRotate }: { autoRotate: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  
  useFrame(({ camera }) => {
    if (autoRotate && cameraRef.current) {
      const time = Date.now() * 0.0005;
      const radius = 25;
      camera.position.x = Math.cos(time) * radius;
      camera.position.z = Math.sin(time) * radius;
      camera.position.y = 10;
      camera.lookAt(0, 0, 0);
    }
  });
  
  return null;
}

export default function LorenzAttractor3D({ 
  points, 
  autoRotate = true,
  lineColor = '#6366f1',
  lineWidth = 1.5 
}: LorenzAttractor3DProps) {
  if (!points || points.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-neutral-900 rounded-lg">
        <p className="text-neutral-400">No trajectory data available</p>
      </div>
    );
  }
  
  return (
    <div className="w-full h-full bg-neutral-900 rounded-lg">
      <Canvas>
        <PerspectiveCamera makeDefault position={[20, 15, 20]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <LorenzTrajectory points={points} lineColor={lineColor} lineWidth={lineWidth} />
        
        {/* Axes helper */}
        <axesHelper args={[10]} />
        
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
        
        <AutoRotateCamera autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
}





