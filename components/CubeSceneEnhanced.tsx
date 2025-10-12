'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingCube({ size, color, position, reverse = false, colorCycle = false }: { size: number; color: string; position: [number, number, number]; reverse?: boolean; colorCycle?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.LineSegments>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const wireframeMaterialRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const rotationSpeed = reverse ? -0.02 : 0.01;
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
      
      // Add subtle floating motion
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }

    if (wireframeRef.current) {
      const rotationSpeed = reverse ? -0.02 : 0.01;
      wireframeRef.current.rotation.x += rotationSpeed;
      wireframeRef.current.rotation.y += rotationSpeed;
      wireframeRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }

    // Enhanced color cycling with your brand colors
    if (colorCycle && materialRef.current) {
      const time = state.clock.getElapsedTime();
      const cycleSpeed = 0.2;
      
      const colors = [
        new THREE.Color(0.31, 0.82, 0.78), // Teal
        new THREE.Color(1, 0.71, 0.64),    // Coral
        new THREE.Color(1, 1, 1),          // White
        new THREE.Color(0.2, 0.4, 0.8),    // Blue
        new THREE.Color(0.8, 0.2, 0.4),    // Pink
        new THREE.Color(0.31, 0.82, 0.78)  // Back to teal
      ];
      
      const progress = (time * cycleSpeed) % 5;
      const index = Math.floor(progress);
      const t = progress - index;
      
      const color1 = colors[index];
      const color2 = colors[index + 1];
      
      const currentColor = new THREE.Color().lerpColors(color1, color2, t);
      materialRef.current.color = currentColor;
      materialRef.current.emissive = currentColor.clone().multiplyScalar(0.1);
    }

    // Wireframe color cycling
    if (colorCycle && wireframeMaterialRef.current) {
      const time = state.clock.getElapsedTime();
      const cycleSpeed = 0.3;
      
      const colors = [
        new THREE.Color(0.31, 0.82, 0.78), // Teal
        new THREE.Color(1, 0.71, 0.64),    // Coral
        new THREE.Color(1, 1, 1),          // White
        new THREE.Color(0.31, 0.82, 0.78)  // Back to teal
      ];
      
      const progress = (time * cycleSpeed) % 3;
      const index = Math.floor(progress);
      const t = progress - index;
      
      const color1 = colors[index];
      const color2 = colors[index + 1];
      
      const currentColor = new THREE.Color().lerpColors(color1, color2, t);
      wireframeMaterialRef.current.color = currentColor;
    }
  });

  return (
    <group position={position}>
      {/* Solid cube with advanced materials */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial 
          ref={materialRef}
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={new THREE.Color(color).multiplyScalar(0.1)}
          transparent={true}
          opacity={0.9}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      <lineSegments ref={wireframeRef}>
        <edgesGeometry args={[new THREE.BoxGeometry(size, size, size)]} />
        <lineBasicMaterial 
          ref={wireframeMaterialRef}
          color={colorCycle ? "#4FD1C7" : color}
          linewidth={2}
        />
      </lineSegments>
    </group>
  );
}

export function CubeSceneEnhanced() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        className="w-full h-full"
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* Enhanced Lighting Setup */}
        <ambientLight intensity={0.3} />
        
        {/* Main directional light */}
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Rim light for dramatic effect */}
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.5}
          color="#4FD1C7"
        />
        
        {/* Point light for dynamic lighting */}
        <pointLight 
          position={[0, 0, 0]} 
          intensity={0.8}
          color="#FFB4A2"
          distance={20}
        />
        
        {/* Spot light for focused illumination */}
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={0.5}
          intensity={1}
          castShadow
          color="#FFFFFF"
        />
        
        {/* Enhanced cubes with amazing materials */}
        <RotatingCube 
          size={3} 
          color="#1a1a1a" 
          position={[0, 0, 0]} 
        />
        <RotatingCube 
          size={1.5} 
          color="#4FD1C7" 
          position={[0, 0, 0]} 
          reverse={true} 
          colorCycle={true} 
        />
        
        {/* Additional floating cubes for depth */}
        <RotatingCube 
          size={0.8} 
          color="#FFB4A2" 
          position={[2, 1, 0]} 
          reverse={true}
          colorCycle={true}
        />
        <RotatingCube 
          size={0.6} 
          color="#FFFFFF" 
          position={[-2, -1, 0]} 
          colorCycle={true}
        />
        
        {/* Ground plane for shadows */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial 
            color="#0F4C3A" 
            transparent 
            opacity={0.3}
            roughness={0.8}
          />
        </mesh>
      </Canvas>
    </div>
  );
}


