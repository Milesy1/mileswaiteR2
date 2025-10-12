'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RotatingCylinderLinesProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function RotatingCylinderLines({ 
  width = 400, 
  height = 400, 
  className = '' 
}: RotatingCylinderLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const segmentsRef = useRef<{
    outer: Array<{ line: THREE.Line; speed: number }>;
    inner: Array<{ line: THREE.Line; speed: number }>;
    outerMost: Array<{ line: THREE.Line; speed: number }>;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background
    scene.fog = new THREE.Fog(0x000000, 10, 50);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create container for all cylinders
    const container = new THREE.Group();
    
    // Tilt the container toward the camera to see into the cylinders
    container.rotation.x = 0.5;
    container.rotation.z = 0.2;
    
    scene.add(container);

    // Create grid of curved lines arranged in cylinder shape
    const columns = 7;
    const rows = 5;
    const outerMostRadius = 1.2;
    const outerRadius = 1;
    const innerRadius = 0.8;
    const squareHeight = 0.55;
    const heightSpacing = 0.65;
    const anglePerSquare = (Math.PI * 2) / columns;
    const linesPerSquare = 7;

    // Random seed for consistent randomness
    const randomSeed = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Store segments for animation
    const outerSegments: Array<{ line: THREE.Line; speed: number }> = [];
    const innerSegments: Array<{ line: THREE.Line; speed: number }> = [];
    const outerMostSegments: Array<{ line: THREE.Line; speed: number }> = [];

    // All segments will rotate at normal speed

    // Create outer cylinder (red)
    for (let row = 0; row < rows; row++) {
      const yPos = (row - (rows - 1) / 2) * heightSpacing;
      
      for (let col = 0; col < columns; col++) {
        // Random chance to skip this entire column segment (about 40% chance to remove)
        const randomValue = randomSeed(row * 100 + col);
        if (randomValue < 0.4) continue;
        
        const startAngle = (col / columns) * Math.PI * 2 - anglePerSquare / 2;
        const endAngle = startAngle + anglePerSquare * 0.9;
        
        // Determine speed based on column (alternate between slow and fast)
        const isFast = (col % 2 === 1);
        const speed = isFast ? 0.05625 : 0.0225;
        
        // Create ALL horizontal curved lines for this square
        for (let line = 0; line < linesPerSquare; line++) {
          const lineYOffset = (line - (linesPerSquare - 1) / 2) * (squareHeight / linesPerSquare);
          const lineY = yPos + lineYOffset;
          
          // Create points along the curve
          const points = [];
          const segments = 20;
          for (let i = 0; i <= segments; i++) {
            const angle = startAngle + (endAngle - startAngle) * (i / segments);
            const x = Math.cos(angle) * outerRadius;
            const z = Math.sin(angle) * outerRadius;
            points.push(new THREE.Vector3(x, lineY, z));
          }
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xff0000, // Red
            linewidth: 2
          });
          const curvedLine = new THREE.Line(lineGeometry, lineMaterial);
          
          // Store segment info for animation
          outerSegments.push({ line: curvedLine, speed: speed });
          container.add(curvedLine);
        }
      }
    }

    // Create inner cylinder (green)
    for (let row = 0; row < rows; row++) {
      const yPos = (row - (rows - 1) / 2) * heightSpacing;
      
      for (let col = 0; col < columns; col++) {
        // Random chance to skip this entire column segment (about 40% chance to remove)
        const randomValue = randomSeed(row * 200 + col + 1000); // Different seed for inner cylinder
        if (randomValue < 0.4) continue;
        
        const startAngle = (col / columns) * Math.PI * 2 - anglePerSquare / 2;
        const endAngle = startAngle + anglePerSquare * 0.9;
        
        // Determine speed based on column (alternate between slow and fast)
        const isFast = (col % 2 === 1);
        const speed = isFast ? 0.05625 : 0.0225;
        
        // Create ALL horizontal curved lines for this square
        for (let line = 0; line < linesPerSquare; line++) {
          const lineYOffset = (line - (linesPerSquare - 1) / 2) * (squareHeight / linesPerSquare);
          const lineY = yPos + lineYOffset;
          
          // Create points along the curve
          const points = [];
          const segments = 20;
          for (let i = 0; i <= segments; i++) {
            const angle = startAngle + (endAngle - startAngle) * (i / segments);
            const x = Math.cos(angle) * innerRadius;
            const z = Math.sin(angle) * innerRadius;
            points.push(new THREE.Vector3(x, lineY, z));
          }
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x00ff00, // Green
            linewidth: 2
          });
          const curvedLine = new THREE.Line(lineGeometry, lineMaterial);
          
          // Store segment info for animation
          innerSegments.push({ line: curvedLine, speed: speed });
          container.add(curvedLine);
        }
      }
    }

    // Create outer-most cylinder (white)
    for (let row = 0; row < rows; row++) {
      const yPos = (row - (rows - 1) / 2) * heightSpacing;
      
      for (let col = 0; col < columns; col++) {
        // Random chance to skip this entire column segment (about 40% chance to remove)
        const randomValue = randomSeed(row * 300 + col + 2000); // Different seed for outer-most cylinder
        if (randomValue < 0.4) continue;
        
        const startAngle = (col / columns) * Math.PI * 2 - anglePerSquare / 2;
        const endAngle = startAngle + anglePerSquare * 0.9;
        
        // Determine speed based on column (alternate between slow and fast)
        const isFast = (col % 2 === 1);
        const speed = isFast ? 0.05625 : 0.0225;
        
        // Create ALL horizontal curved lines for this square
        for (let line = 0; line < linesPerSquare; line++) {
          const lineYOffset = (line - (linesPerSquare - 1) / 2) * (squareHeight / linesPerSquare);
          const lineY = yPos + lineYOffset;
          
          // Create points along the curve
          const points = [];
          const segments = 20;
          for (let i = 0; i <= segments; i++) {
            const angle = startAngle + (endAngle - startAngle) * (i / segments);
            const x = Math.cos(angle) * outerMostRadius;
            const z = Math.sin(angle) * outerMostRadius;
            points.push(new THREE.Vector3(x, lineY, z));
          }
          
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0xffffff, // White
            linewidth: 2
          });
          const curvedLine = new THREE.Line(lineGeometry, lineMaterial);
          
          // Store segment info for animation
          outerMostSegments.push({ line: curvedLine, speed: speed });
          container.add(curvedLine);
        }
      }
    }

    // Store segments reference
    segmentsRef.current = {
      outer: outerSegments,
      inner: innerSegments,
      outerMost: outerMostSegments
    };

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xff00ff, 0.5);
    pointLight.position.set(-5, 0, 3);
    scene.add(pointLight);

    // Animation loop
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);
      
      if (!segmentsRef.current) return;

      // Rotate outer cylinder segments around the cylinder axis at different speeds
      segmentsRef.current.outer.forEach((segment) => {
        segment.line.rotation.y += segment.speed;
      });
      
      // Rotate inner cylinder segments around the cylinder axis at different speeds
      segmentsRef.current.inner.forEach((segment) => {
        segment.line.rotation.y -= segment.speed;
      });
      
      // Rotate outer-most cylinder segments around the cylinder axis at different speeds
      segmentsRef.current.outerMost.forEach((segment) => {
        segment.line.rotation.y += segment.speed;
      });
      
      renderer.render(scene, camera);
    }
    
    animate();

    // Handle resize
    function handleResize() {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    }

    // Initial resize
    handleResize();
    
    // Listen for container resize
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      resizeObserver.disconnect();
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [width, height]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
}
