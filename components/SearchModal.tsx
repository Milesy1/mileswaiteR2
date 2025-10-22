'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '@/app/data/projects'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Use all projects for search (projectsData is already a flat array)
  const allProjects = projectsData || []

  // Filter projects based on query
  const filteredProjects = allProjects.filter(project => {
    if (!project || !project.title) return false
    return (
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      (project.description && project.description.toLowerCase().includes(query.toLowerCase())) ||
      (project.techStack && project.techStack.some(tech => tech.toLowerCase().includes(query.toLowerCase())))
    )
  })

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => Math.min(prev + 1, filteredProjects.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredProjects[selectedIndex]) {
          router.push(`/projects/${filteredProjects[selectedIndex].slug}`)
          onClose()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, filteredProjects, router, onClose])

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  const handleProjectClick = (project: any) => {
    if (project && project.slug) {
      router.push(`/projects/${project.slug}`)
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-4 left-4 right-4 sm:top-1/2 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 z-50 w-auto sm:w-full sm:max-w-2xl sm:mx-4"
          >
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
              {/* Search Input */}
              <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search projects..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-base sm:text-lg placeholder-neutral-400 focus:outline-none text-neutral-900 dark:text-white"
                  />
                  <kbd className="px-2 py-1 text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-64 sm:max-h-96 overflow-y-auto">
                {filteredProjects.length === 0 ? (
                  <div className="p-6 text-center text-neutral-500 dark:text-neutral-400">
                    {query ? 'No projects found' : 'Start typing to search...'}
                  </div>
                ) : (
                  <div className="py-2">
                    {filteredProjects.map((project, index) => (
                      <motion.div
                        key={project.slug || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`px-4 sm:px-6 py-3 cursor-pointer transition-colors ${
                          index === selectedIndex
                            ? 'bg-neutral-100 dark:bg-neutral-800'
                            : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                        }`}
                        onClick={() => handleProjectClick(project)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center overflow-hidden">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title || 'Project'}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-300 dark:bg-neutral-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-neutral-900 dark:text-white truncate">
                              {project.title || 'Untitled Project'}
                            </h3>
                            <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                              {project.description || 'No description available'}
                            </p>
                            {project.techStack && project.techStack.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {project.techStack.slice(0, 3).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-0.5 text-xs bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-6 py-3 bg-neutral-50 dark:bg-neutral-800/50 border-t border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="hidden sm:flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">↑↓</kbd>
                      <span>Navigate</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">↵</kbd>
                      <span>Select</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <kbd className="px-1.5 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded text-xs">1-6</kbd>
                      <span>Quick Nav</span>
                    </span>
                  </div>
                  <span className="text-center sm:text-right">{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
