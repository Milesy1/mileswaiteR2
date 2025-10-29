'use client';

import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export default function KonamiCode() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    console.log('KonamiCode component mounted!');
    // Check if already activated
    const activated = localStorage.getItem('konami-activated');
    if (activated === 'true') {
      setIsActivated(true);
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('Key pressed:', event.code);
      
      // Test: Press 'A' key to trigger music immediately
      if (event.code === 'KeyA') {
        console.log('A key pressed - testing music!');
        activateKonamiCode();
        return;
      }
      
      if (isActivated) {
        console.log('Already activated, ignoring');
        return;
      }

      const newSequence = [...sequence, event.code];
      console.log('Current sequence:', newSequence);
      
      // Check if current sequence matches the start of Konami code
      const isMatching = newSequence.every((key, index) => key === KONAMI_CODE[index]);
      console.log('Is matching:', isMatching);
      
      if (isMatching) {
        // Prevent default behavior for Konami code keys
        event.preventDefault();
        event.stopPropagation();
        
        if (newSequence.length === KONAMI_CODE.length) {
          // Konami code completed!
          console.log('Konami code completed!');
          activateKonamiCode();
          setSequence([]);
        } else {
          setSequence(newSequence);
        }
      } else {
        // Reset sequence if it doesn't match
        console.log('Sequence reset');
        setSequence([event.code]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [sequence, isActivated]);

  const activateKonamiCode = () => {
    // Play sound effect
    playKonamiSound();
    
    // Mark as activated
    setIsActivated(true);
    localStorage.setItem('konami-activated', 'true');
    
    // Add some visual flair
    document.body.style.animation = 'konami-flash 0.5s ease-in-out';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 500);
  };

  const playKonamiSound = () => {
    console.log('Konami code activated! Playing music...');
    
    // Your music tracks
    const musicTracks = [
      '/music/theremaxmw-edit.mp3',
      '/music/airychant.mp3',
      '/music/echobass.mp3'
    ];
    
    // Pick a random track
    const randomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
    console.log('Selected track:', randomTrack);
    
    // Play the randomly selected track
    const audio = new Audio(randomTrack);
    audio.volume = 0.7; // Set volume to 70%
    
    audio.addEventListener('loadstart', () => console.log('Audio loading started'));
    audio.addEventListener('canplay', () => console.log('Audio can play'));
    audio.addEventListener('error', (e) => console.log('Audio error:', e));
    
    audio.play().then(() => {
      console.log('Audio playing successfully');
    }).catch(error => {
      console.log('Audio play failed:', error);
      // Fallback to a simple beep if audio file fails
      playFallbackSound();
    });
  };

  const playFallbackSound = () => {
    // Fallback sound if your music file doesn't load
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  return (
    <>
      {/* Test if component is rendering */}
      <div style={{ position: 'fixed', top: 0, left: 0, background: 'red', color: 'white', padding: '5px', zIndex: 9999 }}>
        Konami Code Loaded
      </div>
      
      {/* Silent Konami Code - just plays music, no visual notifications */}
      <style jsx>{`
        @keyframes konami-flash {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(34, 197, 94, 0.2); }
        }
      `}</style>
    </>
  );
}
