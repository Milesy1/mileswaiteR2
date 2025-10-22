'use client'

import { useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface UseKeyboardShortcutsProps {
  onSearchOpen: () => void
  onModalClose?: () => void
  isModalOpen?: boolean
}

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
      // Left/Right arrows for project navigation
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        // Navigate to previous project (if on a project page)
        const currentPath = window.location.pathname
        if (currentPath.startsWith('/projects/')) {
          // This would need to be implemented with project data
          // For now, just navigate to projects page
          router.push('/projects')
        }
        return
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        // Navigate to next project (if on a project page)
        const currentPath = window.location.pathname
        if (currentPath.startsWith('/projects/')) {
          // This would need to be implemented with project data
          // For now, just navigate to projects page
          router.push('/projects')
        }
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

      // 'A' for about
      if (e.key === 'a' || e.key === 'A') {
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
