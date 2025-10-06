'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

function RotatingCube() {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#0ea5e9" />
    </mesh>
  );
}

export function CubeScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 3, 3]} intensity={0.8} />
        <pointLight position={[-3, -3, -3]} intensity={0.3} />
        <RotatingCube />
      </Canvas>
    </div>
  );
}
