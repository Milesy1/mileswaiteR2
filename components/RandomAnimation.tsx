'use client';

import React, { useState, useEffect } from 'react';
import { CubeScene } from '@/components/CubeScene';
import RotatingCylinderLinesR3F from '@/components/RotatingCylinderLinesR3F';

interface RandomAnimationProps {
  className?: string;
}

export default function RandomAnimation({ className = '' }: RandomAnimationProps) {
  const [animationChoice, setAnimationChoice] = useState<'cubes' | 'cylinder' | null>(null);

  useEffect(() => {
    // Only run on client side to avoid hydration mismatch
    setAnimationChoice(Math.random() < 0.5 ? 'cubes' : 'cylinder');
  }, []);

  // Show loading state or default to cubes during hydration
  if (animationChoice === null) {
    return (
      <div className={className}>
        <CubeScene />
      </div>
    );
  }

  return (
    <div className={className}>
      {animationChoice === 'cubes' ? (
        <CubeScene />
      ) : (
        <RotatingCylinderLinesR3F />
      )}
    </div>
  );
}
