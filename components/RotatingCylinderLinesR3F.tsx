'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CylinderSegmentProps {
  radius: number;
  color: number;
  speed: number;
  reverse?: boolean;
  startAngle: number;
  endAngle: number;
  y: number;
}

function CylinderSegment({ radius, color, speed, reverse = false, startAngle, endAngle, y }: CylinderSegmentProps) {
  const groupRef = useRef<THREE.Group>(null!);

  const points = useMemo(() => {
    const points = [];
    const segments = 20;
    for (let i = 0; i <= segments; i++) {
      const angle = startAngle + (endAngle - startAngle) * (i / segments);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      points.push(new THREE.Vector3(x, y, z));
    }
    return points;
  }, [radius, startAngle, endAngle, y]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += reverse ? -speed : speed;
    }
  });

  return (
    <group ref={groupRef}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
            args={[new Float32Array(points.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} />
      </line>
    </group>
  );
}

function CylinderContainer() {
  const containerRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // Rotate the entire container
    if (containerRef.current) {
      containerRef.current.rotation.x = 0.5;
      containerRef.current.rotation.z = 0.2;
    }
  });

  // Random seed for consistent randomness
  const randomSeed = (row: number, col: number, offset: number = 0) => {
    const seed = row * 100 + col + offset;
    return (Math.sin(seed) * 10000) % 1;
  };

  // Create all cylinder segments
  const segments = useMemo(() => {
    const columns = 7;
    const rows = 5;
    const outerMostRadius = 1.2;
    const outerRadius = 1;
    const innerRadius = 0.8;
    const squareHeight = 0.55;
    const heightSpacing = 0.65;
    const anglePerSquare = (Math.PI * 2) / columns;
    const linesPerSquare = 7;

    const allSegments = [];

    // Create outer cylinder (red)
    for (let row = 0; row < rows; row++) {
      const yPos = (row - (rows - 1) / 2) * heightSpacing;
      
      for (let col = 0; col < columns; col++) {
        // Random chance to skip this entire column segment (about 40% chance to remove)
        if (randomSeed(row, col) < 0.4) continue;
        
        const startAngle = (col / columns) * Math.PI * 2 - anglePerSquare / 2;
        const endAngle = startAngle + anglePerSquare * 0.9;
        
        // Determine speed based on column (alternate between slow and fast)
        const isFast = (col % 2 === 1);
        const speed = isFast ? 0.05625 : 0.0225;
        
        // Create ALL horizontal curved lines for this square
        for (let line = 0; line < linesPerSquare; line++) {
          const lineYOffset = (line - (linesPerSquare - 1) / 2) * (squareHeight / linesPerSquare);
          const lineY = yPos + lineYOffset;
          
          allSegments.push({
            key: `outer-${row}-${col}-${line}`,
            radius: outerRadius,
            color: 0xff0000, // Red
            speed,
            startAngle,
            endAngle,
            y: lineY,
          });
        }
      }
    }

    // Create inner cylinder (green)
    for (let row = 0; row < rows; row++) {
      const yPos = (row - (rows - 1) / 2) * heightSpacing;
      
      for (let col = 0; col < columns; col++) {
        // Random chance to skip this entire column segment (about 40% chance to remove)
        if (randomSeed(row, col, 1000) < 0.4) continue;
        
        const startAngle = (col / columns) * Math.PI * 2 - anglePerSquare / 2;
        const endAngle = startAngle + anglePerSquare * 0.9;
        
        // Determine speed based on column (alternate between slow and fast)
        const isFast = (col % 2 === 1);
        const speed = isFast ? 0.05625 : 0.0225;
        
        // Create ALL horizontal curved lines for this square
        for (let line = 0; line < linesPerSquare; line++) {
          const lineYOffset = (line - (linesPerSquare - 1) / 2) * (squareHeight / linesPerSquare);
          const lineY = yPos + lineYOffset;
          
          allSegments.push({
            key: `inner-${row}-${col}-${line}`,
            radius: innerRadius,
            color: 0x00ff00, // Green
            speed,
            reverse: true,
            startAngle,
            endAngle,
            y: lineY,
          });
        }
      }
    }

    // Create outer-most cylinder (white)
    for (let row = 0; row < rows; row++) {
      const yPos = (row - (rows - 1) / 2) * heightSpacing;
      
      for (let col = 0; col < columns; col++) {
        // Random chance to skip this entire column segment (about 40% chance to remove)
        if (randomSeed(row, col, 2000) < 0.4) continue;
        
        const startAngle = (col / columns) * Math.PI * 2 - anglePerSquare / 2;
        const endAngle = startAngle + anglePerSquare * 0.9;
        
        // Determine speed based on column (alternate between slow and fast)
        const isFast = (col % 2 === 1);
        const speed = isFast ? 0.05625 : 0.0225;
        
        // Create ALL horizontal curved lines for this square
        for (let line = 0; line < linesPerSquare; line++) {
          const lineYOffset = (line - (linesPerSquare - 1) / 2) * (squareHeight / linesPerSquare);
          const lineY = yPos + lineYOffset;
          
          allSegments.push({
            key: `outerMost-${row}-${col}-${line}`,
            radius: outerMostRadius,
            color: 0xffffff, // White
            speed,
            startAngle,
            endAngle,
            y: lineY,
          });
        }
      }
    }

    return allSegments;
  }, []);

  return (
    <group ref={containerRef}>
      {/* Render all cylinder segments */}
      {segments.map((segment) => (
        <CylinderSegment
          key={segment.key}
          radius={segment.radius}
          color={segment.color}
          speed={segment.speed}
          reverse={segment.reverse}
          startAngle={segment.startAngle}
          endAngle={segment.endAngle}
          y={segment.y}
        />
      ))}
    </group>
  );
}

export default function RotatingCylinderLinesR3F() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 75 }}
        className="w-full h-full"
        style={{ background: '#000000' }}
      >
        {/* Lighting */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 0, 3]} color="#ff00ff" intensity={0.5} />
        
        {/* Container group */}
        <CylinderContainer />
      </Canvas>
    </div>
  );
}
