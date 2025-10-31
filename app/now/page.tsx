'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { SkeletonMusicPlayer } from '@/components/SkeletonMusicPlayer';
import VoiceAskMilesButton from '@/components/project/VoiceAskMilesButton';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

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
    listening: {
      title: "A Model of Reality",
      artist: "Sunnk",
      link: "https://music.amazon.co.uk/albums/B0BQCR5B27?trackAsin=B0BQCSQNWW&ref=dm_sh_3a94-44bc-60a0-a81f-ed5f5"
    },
    producing: [
      {
        title: "WIP Mix 01",
        file: "/music/theremaxmw-edit.mp3"
      },
      {
        title: "Track 2",
        file: "/music/airychant.mp3"
      },
      {
        title: "Track 3", 
        file: "/music/echobass.mp3"
      }
    ],
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
    listening: {
      title: "Previous Track Title",
      artist: "Previous Artist",
      link: ""
    },
    producing: [
      {
        title: "Previous Track 1",
        file: "/music/previous1.mp3"
      },
      {
        title: "Previous Track 2",
        file: "/music/previous2.mp3"
      }
    ],
    using: ["Previous tool 1", "Previous tool 2", "Previous tool 3", "Previous tool 4"],
    location: "Previous City, State/Country",
    openTo: ["Previous opportunity type 1", "Previous opportunity type 2"]
  }
  // Add new months here - copy the object above and update all values
]

// Collapsed Entry Summary Component
function CollapsedEntrySummary({ entry, onToggle }: { entry: any; onToggle: () => void }) {
  const summaryItems = [];
  
  if (entry.building && entry.building.length > 0) {
    summaryItems.push(`Building: ${entry.building.slice(0, 2).join(', ')}${entry.building.length > 2 ? '...' : ''}`);
  }
  if (entry.location) {
    summaryItems.push(`Location: ${entry.location}`);
  }
  if (entry.reading && entry.reading.length > 0) {
    summaryItems.push(`Reading: ${entry.reading[0].title}`);
  }
  if (entry.listening && entry.listening.title) {
    summaryItems.push(`Listening: ${entry.listening.title}`);
  }

  return (
    <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 bg-neutral-50 dark:bg-neutral-800/50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            {entry.lastUpdated}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {summaryItems.join(' • ')}
          </p>
        </div>
        <button
          onClick={onToggle}
          className="ml-4 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
        >
          Show details →
        </button>
      </div>
    </div>
  );
}

// Music Player Component - Touch-friendly and accessible
function MusicPlayer({ trackTitle, audioFile }: { trackTitle: string; audioFile: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [displayTitle, setDisplayTitle] = useState(trackTitle);
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
      
      // Try to get track name from metadata
      const audio = audioRef.current;
      if (audio.title) {
        setDisplayTitle(audio.title);
      } else if (audioFile) {
        // Fallback to filename
        const filename = audioFile.split('/').pop() || '';
        const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
        setDisplayTitle(nameWithoutExt);
      }
    }
  };

  // Update display title when audioFile changes
  useEffect(() => {
    if (audioFile) {
      const filename = audioFile.split('/').pop() || '';
      const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
      setDisplayTitle(nameWithoutExt);
    } else {
      setDisplayTitle(trackTitle);
    }
  }, [audioFile, trackTitle]);

  // If no audio file, show skeleton while loading or just track title
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

  // Show music player immediately, no skeleton delay

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
        {displayTitle}
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

// Ellipse Background Component
function EllipseBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<any>(null);

  useEffect(() => {
    // Load p5.js dynamically
    const loadP5 = async () => {
      if (typeof window !== 'undefined' && !window.p5) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js';
        script.onload = () => {
          initializeSketch();
        };
        document.head.appendChild(script);
      } else if (window.p5) {
        initializeSketch();
      }
    };

    const initializeSketch = () => {
      if (!containerRef.current || p5InstanceRef.current) return;

      // Ellipse sketch code from your ellipse-sketch.js
      const sketch = (p: any) => {
        let theta = 0;
        let npoints = 60;
        let anglestep: number;
        let anglestart = 0;
        let r: number;
        let colorIndex = 0;
        let colorProgress = 0;

        // Red, Green, White color cycle
        const COLORS = [
          [255, 0, 0],    // Red
          [0, 255, 0],    // Green  
          [255, 255, 255] // White
        ];

        p.setup = () => {
          p.createCanvas(window.innerWidth, window.innerHeight);
          r = Math.min(p.width, p.height) / 4.5; // Increased from /6 to /4.5 (30% larger)
          p.noStroke();
          
          p.colorMode(p.RGB, 255);
          anglestep = p.TWO_PI / npoints;
        };

        p.draw = () => {
          p.clear();
          
          // Slower color cycling (every 3 seconds instead of 1)
          let timeCycle = (p.millis() * 0.0003) % 3; // Use millis instead of frameCount
          colorIndex = p.floor(timeCycle);
          colorProgress = timeCycle - colorIndex; // Progress between colors (0-1)
          
          // Get current and next colors for smooth transition
          let currentColor = COLORS[colorIndex];
          let nextColor = COLORS[(colorIndex + 1) % 3];
          
          // Interpolate between colors for smooth fade
          let red = p.lerp(currentColor[0], nextColor[0], colorProgress);
          let green = p.lerp(currentColor[1], nextColor[1], colorProgress);
          let blue = p.lerp(currentColor[2], nextColor[2], colorProgress);
          
          p.fill(red, green, blue);
          
          p.translate(p.width / 2, p.height / 2);
          p.rotate(theta);
          
          for (let i = 0; i < npoints; i++) {
            let angle = anglestart + i * anglestep;
            p.ellipse(1.2 * r * p.cos(angle), 0.8 * r * p.sin(angle), 2, 2);
          }
          
          anglestart -= 0.02187; // Another 10% slower: 0.0243 * 0.9 = 0.02187
          theta += 0.00729; // Another 10% slower: 0.0081 * 0.9 = 0.00729
        };

        p.windowResized = () => {
          p.resizeCanvas(window.innerWidth, window.innerHeight);
          r = Math.min(p.width, p.height) / 4.5; // Increased from /6 to /4.5 (30% larger)
        };
      };

      p5InstanceRef.current = new window.p5(sketch, containerRef.current);
    };

    loadP5();

    // Cleanup
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
}

export default function NowPage() {
  const section = 'Now';
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const [dynamicData, setDynamicData] = useState(nowData);
  const [groupedData, setGroupedData] = useState<{[key: string]: any[]}>({});

  useEffect(() => {
    setIsLoaded(true);
    
    // Try to fetch dynamic data from API
    fetch('/api/now')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setDynamicData(data);
          
          // Group entries by month
          const grouped = data.reduce((acc: any, entry: any) => {
            if (!acc[entry.month]) {
              acc[entry.month] = [];
            }
            acc[entry.month].push(entry);
            return acc;
          }, {});
          
          setGroupedData(grouped);
        }
      })
      .catch(error => {
        console.log('Using fallback data:', error);
        // Keep using nowData as fallback
        const grouped = nowData.reduce((acc: any, entry: any) => {
          if (!acc[entry.month]) {
            acc[entry.month] = [];
          }
          acc[entry.month].push(entry);
          return acc;
        }, {});
        setGroupedData(grouped);
      });
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

  const toggleEntry = (entryKey: string) => {
    setExpandedEntries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(entryKey)) {
        newSet.delete(entryKey);
      } else {
        newSet.add(entryKey);
      }
      return newSet;
    });
  };

  const toggleAllEntries = (month: string, entries: any[]) => {
    const allEntryKeys = entries.map(entry => `${month}-${entry.lastUpdated}`);
    const allExpanded = allEntryKeys.every(key => expandedEntries.has(key));
    
    setExpandedEntries(prev => {
      const newSet = new Set(prev);
      if (allExpanded) {
        // Collapse all
        allEntryKeys.forEach(key => newSet.delete(key));
      } else {
        // Expand all
        allEntryKeys.forEach(key => newSet.add(key));
      }
      return newSet;
    });
  };

  return (
    <motion.div 
      className="pt-16 lg:pt-20 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Ellipse Animation */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden" style={{ opacity: 1.0 }}>
        <EllipseBackground />
      </div>
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
                Producing.
              </motion.span>
            </p>
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-xs text-neutral-500 dark:text-neutral-500"
            >
              Last updated: {Object.keys(groupedData).length > 0 ? Object.values(groupedData)[0][0].lastUpdated : dynamicData[0].lastUpdated}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-4 flex flex-col items-center"
            >
              <a
                href="/blog"
                className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors duration-200 underline decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-neutral-500 dark:hover:decoration-neutral-300"
              >
                Emergent →
              </a>
            </motion.div>
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
            {Object.entries(groupedData).map(([month, entries]) => {
              const isExpanded = expandedMonths.has(month);
              const latestEntry = entries[0]; // Most recent entry for this month
              
              return (
                <div key={month} className="relative">
                  {/* Month Header - Clickable */}
                  <button
                    onClick={() => toggleMonth(month)}
                    className="w-full text-left mb-6 sm:mb-8 group focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900 rounded-lg p-3 -m-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors duration-200"
                    aria-expanded={isExpanded}
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${month} content`}
                  >
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-neutral-900 dark:text-white mb-1 sm:mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {month}
                        </h2>
                        <p className="text-neutral-500 dark:text-neutral-500 text-xs sm:text-sm">
                          Latest: {latestEntry.lastUpdated}
                          {entries.length > 1 && (
                            <span className="ml-2 text-neutral-400 dark:text-neutral-500">
                              ({entries.length} updates)
                            </span>
                          )}
                        </p>
                        {!isExpanded && (
                          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                            Click to expand ↓
                          </p>
                        )}
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-neutral-400 dark:text-neutral-500 flex-shrink-0 ml-4 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors"
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
                        <div className="space-y-8">
                          {/* Show All/Expand All Button */}
                          {entries.length > 1 && (
                            <div className="text-center">
                              <button
                                onClick={() => toggleAllEntries(month, entries)}
                                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
                              >
                                {entries.every(entry => expandedEntries.has(`${month}-${entry.lastUpdated}`)) 
                                  ? 'Collapse all entries' 
                                  : `Show all ${entries.length} entries`}
                              </button>
                            </div>
                          )}

                          {entries.map((entry, entryIndex) => {
                            const entryKey = `${month}-${entry.lastUpdated}`;
                            const isEntryExpanded = expandedEntries.has(entryKey);
                            const isLatestEntry = entryIndex === 0;
                            
                            // Always show latest entry fully, others as summaries unless expanded
                            if (isLatestEntry || isEntryExpanded) {
                              return (
                                <div key={`${entry.lastUpdated}-${entryIndex}`} className="space-y-8 sm:space-y-10 lg:space-y-12">
                                  {/* Entry Header */}
                                  <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
                                    <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                      Updated: {entry.lastUpdated}
                                    </h3>
                                  </div>
                          {/* LISTENING */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                              LISTENING
                            </h3>
                            {entry.listening.link ? (
                              <p className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
                                "{entry.listening.title}" — {entry.listening.artist}{' '}
                                <a 
                                  href={entry.listening.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200"
                                >
                                  →
                                </a>
                              </p>
                            ) : (
                              <p className="text-neutral-500 dark:text-neutral-400 text-base">
                                No music currently selected
                              </p>
                            )}
                          </div>

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
                              {entry.reading.map((book: { title: string; author: string }, bookIndex: number) => (
                                <li key={bookIndex} className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
                                  · "{book.title}" — {book.author}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* PRODUCING */}
                          <div>
                            <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                              PRODUCING
                            </h3>
                            <div className="space-y-4">
                              {entry.producing.map((track: { title: string; file: string }, index: number) => (
                                <MusicPlayer 
                                  key={index}
                                  trackTitle={track.title} 
                                  audioFile={track.file} 
                                />
                              ))}
                            </div>
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

                                  {/* LEARNING */}
                                  {entry.learning && entry.learning.length > 0 && (
                                    <div>
                                      <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3 sm:mb-4">
                                        LEARNING
                                      </h3>
                                      
                                      <p className="text-neutral-900 dark:text-white text-base sm:text-lg leading-relaxed">
                                        {entry.learning.map((item: any, i: number) => (
                                          <span key={i}>
                                            <a
                                              href={item.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                            >
                                              {item.title}
                                            </a>
                                            {i < entry.learning.length - 1 && ' · '}
                                          </span>
                                        ))}
                                      </p>
                                      
                                      {entry.learningUpdatedAt && (
                                        <p className="text-xs text-neutral-500 mt-4">
                                          Updated {formatDistanceToNow(
                                            new Date(entry.learningUpdatedAt),
                                            { addSuffix: true }
                                          )}
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            } else {
                              // Show collapsed summary for older entries
                              return (
                                <CollapsedEntrySummary
                                  key={`${entry.lastUpdated}-${entryIndex}`}
                                  entry={entry}
                                  onToggle={() => toggleEntry(entryKey)}
                                />
                              );
                            }
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Divider between months */}
                  {Object.keys(groupedData).indexOf(month) < Object.keys(groupedData).length - 1 && (
                    <div className="mt-16 pt-16 border-t border-neutral-200 dark:border-neutral-800"></div>
                  )}
                </div>
              );
            })}
          </motion.div>

        </div>
      </section>

      {/* Ask Miles Button - Bottom Left Above Footer */}
      <div className="flex justify-start items-center py-8 px-[10%] sm:px-[8%] lg:px-[5%]">
        <VoiceAskMilesButton />
      </div>

    </motion.div>
  )
}
