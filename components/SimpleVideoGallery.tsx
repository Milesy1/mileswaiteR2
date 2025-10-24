'use client';

import { Canvas } from '@react-three/fiber';
import { Video, OrbitControls, Text } from '@react-three/drei';
import { useRef, useState } from 'react';

interface VideoItem {
  id: string;
  title: string;
  videoPath: string;
  position: [number, number, number];
}

interface VideoScreenProps {
  videoPath: string;
  position: [number, number, number];
  title: string;
  isActive: boolean;
  onSelect: () => void;
}

function VideoScreen({ videoPath, position, title, isActive, onSelect }: VideoScreenProps) {
  return (
    <group position={position}>
      {/* Video */}
      <Video
        src={videoPath}
        loop
        muted
        autoPlay={isActive}
        width={3}
        height={2}
        onClick={onSelect}
      />
      
      {/* Title */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.2}
        color={isActive ? "#ffffff" : "#888888"}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  );
}

interface SimpleVideoGalleryProps {
  videos: VideoItem[];
}

export default function SimpleVideoGallery({ videos }: SimpleVideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div className="w-full h-[500px] bg-neutral-900 rounded-lg">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        
        {/* Video Screens */}
        {videos.map((video) => (
          <VideoScreen
            key={video.id}
            videoPath={video.videoPath}
            position={video.position}
            title={video.title}
            isActive={activeVideo === video.id}
            onSelect={() => setActiveVideo(activeVideo === video.id ? null : video.id)}
          />
        ))}
        
        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
}
