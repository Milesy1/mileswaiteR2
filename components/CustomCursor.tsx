'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect if device is touch-enabled
    const checkTouchDevice = () => {
      return (
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };
    
    setIsTouchDevice(checkTouchDevice());
    
    // Don't add event listeners on touch devices
    if (checkTouchDevice()) {
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateFollower = (e: MouseEvent) => {
      setTimeout(() => {
        setFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousemove', updateFollower);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousemove', updateFollower);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Don't render cursor on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        className={`custom-cursor-follower ${isHovering ? 'hover' : ''}`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}


