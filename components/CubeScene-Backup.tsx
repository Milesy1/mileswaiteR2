'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingCube({ size, color, position, reverse = false, colorCycle = false }: { size: number; color: string; position: [number, number, number]; reverse?: boolean; colorCycle?: boolean }) {
  const meshRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const rotationSpeed = reverse ? -0.02 : 0.01; // Slower outer cube rotation
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
    }

    // Color cycling for the red cube
    if (colorCycle && materialRef.current) {
      const time = state.clock.getElapsedTime();
      const cycleSpeed = 0.3; // Speed of color change (much slower)
      
      // Create a smooth color transition between red, blue, yellow
      const colors = [
        new THREE.Color(1, 0, 0), // Red
        new THREE.Color(0, 0, 1), // Blue  
        new THREE.Color(1, 1, 0), // Yellow
        new THREE.Color(1, 0, 0)  // Back to red
      ];
      
      const progress = (time * cycleSpeed) % 3;
      const index = Math.floor(progress);
      const t = progress - index;
      
      const color1 = colors[index];
      const color2 = colors[index + 1];
      
      const currentColor = new THREE.Color().lerpColors(color1, color2, t);
      materialRef.current.color = currentColor;
    }
  });

  return (
    <lineSegments ref={meshRef} position={position}>
      <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
      <lineBasicMaterial ref={materialRef} color={color} />
    </lineSegments>
  );
}

export function CubeScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="w-full h-full"
      >
        {/* Large black cube with color-cycling cube inside */}
        <RotatingCube size={3} color="#000000" position={[0, 0, 0]} />
        <RotatingCube size={1.5} color="#ff0000" position={[0, 0, 0]} reverse={true} colorCycle={true} />
      </Canvas>
    </div>
  );
}
