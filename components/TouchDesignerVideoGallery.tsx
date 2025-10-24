'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box } from '@react-three/drei';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface VideoItem {
  id: string;
  title: string;
  videoPath: string;
  position: [number, number, number];
  description: string;
}

interface VideoPlayerProps {
  videoPath: string;
  position: [number, number, number];
  isActive: boolean;
  onSelect: () => void;
}

function VideoPlayer({ videoPath, position, isActive, onSelect }: VideoPlayerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });
  
  return (
    <group position={position}>
      {/* Video Screen */}
      <Box args={[4, 2.25, 0.1]} onClick={onSelect}>
        <meshStandardMaterial color={isActive ? "#ffffff" : "#333333"} />
      </Box>
      
      {/* Video placeholder - using a plane with texture */}
      <mesh ref={meshRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[4, 2.25]} />
        <meshBasicMaterial 
          color={isActive ? "#4f46e5" : "#6b7280"} 
          transparent 
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

interface TouchDesignerVideoGalleryProps {
  videos: VideoItem[];
}

export default function TouchDesignerVideoGallery({ videos }: TouchDesignerVideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="w-full h-[600px] bg-neutral-900 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Video Players */}
        {videos.map((video) => (
          <VideoPlayer
            key={video.id}
            videoPath={video.videoPath}
            position={video.position}
            isActive={activeVideo === video.id}
            onSelect={() => setActiveVideo(activeVideo === video.id ? null : video.id)}
          />
        ))}
        
        {/* Video Titles */}
        {videos.map((video) => (
          <Text
            key={`title-${video.id}`}
            position={[video.position[0], video.position[1] - 1.5, video.position[2]]}
            fontSize={0.3}
            color={activeVideo === video.id ? "#ffffff" : "#888888"}
            anchorX="center"
            anchorY="middle"
          >
            {video.title}
          </Text>
        ))}
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
      
      {/* Video Information Panel */}
      {activeVideo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4"
        >
          <h3 className="text-white text-lg font-medium mb-2">
            {videos.find(v => v.id === activeVideo)?.title}
          </h3>
          <p className="text-neutral-300 text-sm">
            {videos.find(v => v.id === activeVideo)?.description}
          </p>
        </motion.div>
      )}
    </div>
  );
}
