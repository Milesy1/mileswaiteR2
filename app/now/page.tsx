'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// ============================================================================
// NOW PAGE DATA - Easy to update!
// ============================================================================
// To add a new month:
// 1. Copy the entire object below
// 2. Update the month name and all content
// 3. Add it to the beginning of the array (most recent first)
// 4. The "Last updated" date will automatically pull from the first entry

const nowData = [
  {
    month: "OCTOBER 2025",
    lastUpdated: "October 22, 2025",
    building: ["mileswaite.net", "Emergent Geometry", "TD - callbacks"],
    exploring: ["Python", "Next.js", "TouchDesigner: event-based triggering"],
    reading: [
      { title: "All Things Are Full of Gods", author: "David Bentley Hart" },
      { title: "Against The Day", author: "Thomas Pynchon" }
    ],
    listeningTrack: "WIP Mix 01",
    listeningFile: "/music/mileswaite.mp3",
    using: ["Prompt Engineering", "Cursor", "Claude - Sonnet 4.5" ],
    location: "London, UK",
    openTo: ["Live 12.3", "TouchDesigner"]
  },
  {
    month: "SEPTEMBER 2025",
    lastUpdated: "September 15, 2025",
    building: ["Previous project", "Another project", "Side project"],
    exploring: ["New technology", "Learning concept", "Experimenting with X"],
    reading: [
      { title: "Previous Book", author: "Previous Author" },
      { title: "Another Previous Book", author: "Another Previous Author" }
    ],
    listeningTrack: "Previous Track Title",
    listeningFile: "",
    using: ["Previous tool 1", "Previous tool 2", "Previous tool 3", "Previous tool 4"],
    location: "Previous City, State/Country",
    openTo: ["Previous opportunity type 1", "Previous opportunity type 2"]
  }
  // Add new months here - copy the object above and update all values
]

// Music Player Component - Touch-friendly and accessible
function MusicPlayer({ trackTitle, audioFile }: { trackTitle: string; audioFile: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current && audioFile) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      togglePlayPause();
    }
  };

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle time updates
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle duration loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // If no audio file, just show the track title
  if (!audioFile) {
    return (
      <div className="flex items-center space-x-3 sm:space-x-4">
        <span className="text-neutral-400 dark:text-neutral-500 text-sm sm:text-base">
          🎵
        </span>
        <span className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
          {trackTitle}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 sm:space-x-4 py-2">
      <div className="p-2">
        <button
          onClick={togglePlayPause}
          onKeyDown={handleKeyDown}
          className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white focus:text-neutral-900 dark:focus:text-white transition-colors duration-200 font-mono text-sm sm:text-base p-3 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          tabIndex={0}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
      <span className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
        {trackTitle}
      </span>
      {/* Time display */}
      <span className="text-neutral-500 dark:text-neutral-400 text-xs sm:text-sm font-mono">
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
      <audio
        ref={audioRef}
        src={audioFile}
        loop
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="metadata"
      />
    </div>
  );
}

export default function NowPage() {
  const section = 'Now';
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set(['OCTOBER 2025']));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleMonth = (month: string) => {
    setExpandedMonths(prev => {
      const newSet = new Set(prev);
      if (newSet.has(month)) {
        newSet.delete(month);
      } else {
        newSet.add(month);
      }
      return newSet;
    });
  };

  return (
    <motion.div 
      className="pt-16 lg:pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Header */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-neutral-900 dark:text-neutral-100">
              {section}
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto"></div>
            <p className="text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-[500px] mx-auto leading-[1.4]">
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
                className="inline-block"
              >
                Building.
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                className="inline-block"
              >
                Reading.
              </motion.span>
              {' '}
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
                className="inline-block"
              >
                Listening.
              </motion.span>
            </p>
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-xs text-neutral-500 dark:text-neutral-500"
            >
              Last updated: {nowData[0].lastUpdated}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Archive Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-16"
          >
            {nowData.map((entry, index) => {
              const isExpanded = expandedMonths.has(entry.month);
              
              return (
                <div key={entry.month} className="relative">
                  {/* Month Header - Clickable */}
                  <button
                    onClick={() => toggleMonth(entry.month)}
                    className="w-full text-left mb-6 sm:mb-8 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 rounded-lg p-2 -m-2"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${entry.month} content`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-neutral-900 dark:text-white mb-1 sm:mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {entry.month}
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-500 text-xs sm:text-sm">
                          Updated: {entry.lastUpdated}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-neutral-400 dark:text-neutral-500 flex-shrink-0 ml-4"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </motion.div>
                    </div>
                  </button>

                  {/* Collapsible Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
                          {/* BUILDING */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                              BUILDING
                            </h3>
                            <p className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
                              {entry.building.join(' · ')}
                            </p>
                          </div>

                          {/* EXPLORING */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                              EXPLORING
                            </h3>
                            <p className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
                              {entry.exploring.join(' · ')}
                            </p>
                          </div>

                          {/* READING */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                              READING
                            </h3>
                            <ul className="space-y-2">
                              {entry.reading.map((book, bookIndex) => (
                                <li key={bookIndex} className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
                                  · "{book.title}" — {book.author}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* LISTENING */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                              LISTENING
                            </h3>
                            <MusicPlayer trackTitle={entry.listeningTrack} audioFile={entry.listeningFile} />
                          </div>

                          {/* USING */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                              USING
                            </h3>
                            <p className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
                              {entry.using.join(' · ')}
                            </p>
                          </div>

                          {/* LOCATION */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                              LOCATION
                            </h3>
                            <p className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
                              {entry.location}
                            </p>
                          </div>

                          {/* OPEN TO */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                              OPEN TO
                            </h3>
                            <p className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
                              {entry.openTo.join(' · ')}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Divider between months */}
                  {index < nowData.length - 1 && (
                    <div className="mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800"></div>
                  )}
                </div>
              );
            })}
          </motion.div>

        </div>
      </section>
    </motion.div>
  )
}
