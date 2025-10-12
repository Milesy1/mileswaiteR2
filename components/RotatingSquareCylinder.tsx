'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RotatingSquareCylinderProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function RotatingSquareCylinder({ 
  width = 400, 
  height = 400, 
  className = '' 
}: RotatingSquareCylinderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0F4C3A); // Dark teal background to match your design
    
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Better performance
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create cylinder made of squares
    const group = new THREE.Group();
    
    const squareGeometry = new THREE.PlaneGeometry(0.3, 0.3);
    
    // Create materials with colors from your design
    const colors = [0x4FD1C7, 0xFFB4A2, 0xFFFFFF]; // Teal, coral, white
    const materials = colors.map(color => 
      new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        wireframe: true,
        transparent: true,
        opacity: 0.8
      })
    );

    const radius = 2;
    const height_cyl = 4;
    const segmentsAround = 24;
    const segmentsHeight = 20;

    // Create squares arranged in a cylinder
    for (let i = 0; i < segmentsHeight; i++) {
      for (let j = 0; j < segmentsAround; j++) {
        const material = materials[j % materials.length];
        const square = new THREE.Mesh(squareGeometry, material);
        
        const angle = (j / segmentsAround) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (i / segmentsHeight) * height_cyl - height_cyl / 2;

        square.position.set(x, y, z);
        square.lookAt(0, y, 0);
        
        // Add some variation to make it more interesting
        square.rotation.x = Math.sin(i * 0.5) * 0.1;
        square.rotation.z = Math.cos(j * 0.3) * 0.1;
        
        group.add(square);
      }
    }

    scene.add(group);

    // Animation
    function animate() {
      animationIdRef.current = requestAnimationFrame(animate);
      
      // Rotate the entire group
      group.rotation.y += 0.005;
      
      // Add some subtle movement to individual squares
      group.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          child.rotation.x += 0.002;
          child.rotation.z += 0.001;
          
          // Pulsing effect
          const scale = 1 + Math.sin(Date.now() * 0.001 + index * 0.1) * 0.05;
          child.scale.setScalar(scale);
        }
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
      
      // Dispose geometries and materials
      squareGeometry.dispose();
      materials.forEach(material => material.dispose());
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


