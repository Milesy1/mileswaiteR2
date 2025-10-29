'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface UseKeyboardShortcutsProps {
  onSearchOpen: () => void
  onModalClose?: () => void
  isModalOpen?: boolean
}

// Konami music function
const triggerKonamiMusic = () => {
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
  
  audio.play().then(() => {
    console.log('Audio playing successfully');
  }).catch(error => {
    console.log('Audio play failed:', error);
  });
};

export function useKeyboardShortcuts({
  onSearchOpen,
  onModalClose,
  isModalOpen = false
}: UseKeyboardShortcutsProps) {
  const router = useRouter()

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in inputs, textareas, or contenteditable elements
    const target = e.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true' ||
      target.closest('[contenteditable="true"]')
    ) {
      return
    }

    // Cmd+K or Ctrl+K for search
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      onSearchOpen()
      return
    }

    // Escape to close modals
    if (e.key === 'Escape' && isModalOpen && onModalClose) {
      e.preventDefault()
      onModalClose()
      return
    }

    // Arrow keys for navigation (when no modal is open)
    if (!isModalOpen) {
      // Track Konami sequence for arrow keys
      const konamiSequence = (window as any).konamiSequence || [];
      
      if (e.key === 'ArrowUp') {
        konamiSequence.push('ArrowUp');
        (window as any).konamiSequence = konamiSequence;
        e.preventDefault()
        return
      }
      
      if (e.key === 'ArrowDown') {
        konamiSequence.push('ArrowDown');
        (window as any).konamiSequence = konamiSequence;
        e.preventDefault()
        return
      }
      
      if (e.key === 'ArrowLeft') {
        konamiSequence.push('ArrowLeft');
        (window as any).konamiSequence = konamiSequence;
        e.preventDefault()
        return
      }

      if (e.key === 'ArrowRight') {
        konamiSequence.push('ArrowRight');
        (window as any).konamiSequence = konamiSequence;
        e.preventDefault()
        return
      }

      // Number keys for quick navigation
      if (e.key >= '1' && e.key <= '9') {
        e.preventDefault()
        const number = parseInt(e.key)
        
        // Quick navigation to main sections
        switch (number) {
          case 1:
            router.push('/')
            break
          case 2:
            router.push('/projects')
            break
          case 3:
            router.push('/about')
            break
          case 4:
            router.push('/code')
            break
          case 5:
            router.push('/music')
            break
          case 6:
            router.push('/now')
            break
        }
        return
      }

      // 'H' for home
      if (e.key === 'h' || e.key === 'H') {
        e.preventDefault()
        router.push('/')
        return
      }

      // 'P' for projects
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        router.push('/projects')
        return
      }

      // 'B' for Konami code
      if (e.key === 'b' || e.key === 'B') {
        const konamiSequence = (window as any).konamiSequence || [];
        konamiSequence.push('KeyB');
        (window as any).konamiSequence = konamiSequence;
        e.preventDefault()
        return
      }

      // 'A' for about (but check for Konami code first)
      if (e.key === 'a' || e.key === 'A') {
        // Check if this is part of Konami code sequence
        const konamiSequence = (window as any).konamiSequence || [];
        konamiSequence.push('KeyA');
        
        // Check if we have a complete Konami code
        const fullKonamiCode = [
          'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
          'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
          'KeyB', 'KeyA'
        ];
        
        if (konamiSequence.length === fullKonamiCode.length && 
            konamiSequence.every((key, index) => key === fullKonamiCode[index])) {
          // Konami code completed!
          console.log('Konami code completed!');
          (window as any).konamiSequence = [];
          // Trigger music
          triggerKonamiMusic();
          return;
        } else if (konamiSequence.length > fullKonamiCode.length) {
          // Reset sequence if too long
          (window as any).konamiSequence = ['KeyA'];
        } else {
          // Store the sequence
          (window as any).konamiSequence = konamiSequence;
        }
        
        e.preventDefault()
        router.push('/about')
        return
      }
    }
  }, [onSearchOpen, onModalClose, isModalOpen, router])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return {
    // Expose any additional functionality if needed
  }
}
