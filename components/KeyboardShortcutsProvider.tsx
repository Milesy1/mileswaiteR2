'use client'

import { useState, createContext, useContext, ReactNode } from 'react'
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import SearchModal from './SearchModal'

interface KeyboardShortcutsContextType {
  isSearchOpen: boolean
  openSearch: () => void
  closeSearch: () => void
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | undefined>(undefined)

export function useKeyboardShortcutsContext() {
  const context = useContext(KeyboardShortcutsContext)
  if (!context) {
    // Return a default context instead of throwing an error
    return {
      isSearchOpen: false,
      openSearch: () => console.log('Search not available'),
      closeSearch: () => console.log('Close not available')
    }
  }
  return context
}

interface KeyboardShortcutsProviderProps {
  children: ReactNode
}

export default function KeyboardShortcutsProvider({ children }: KeyboardShortcutsProviderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const openSearch = () => setIsSearchOpen(true)
  const closeSearch = () => setIsSearchOpen(false)

  // Initialize keyboard shortcuts
  useKeyboardShortcuts({
    onSearchOpen: openSearch,
    onModalClose: closeSearch,
    isModalOpen: isSearchOpen
  })

  return (
    <KeyboardShortcutsContext.Provider value={{
      isSearchOpen,
      openSearch,
      closeSearch
    }}>
      {children}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </KeyboardShortcutsContext.Provider>
  )
}
