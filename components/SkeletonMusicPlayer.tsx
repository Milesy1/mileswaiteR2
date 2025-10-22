'use client';

export function SkeletonMusicPlayer() {
  return (
    <div className="flex items-center space-x-3 sm:space-x-4 py-2">
      <div className="p-2">
        {/* Play button skeleton */}
        <div className="w-11 h-11 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 rounded animate-pulse"></div>
      </div>
      
      {/* Track title skeleton */}
      <div className="h-5 w-32 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 rounded animate-pulse"></div>
      
      {/* Time display skeleton */}
      <div className="h-4 w-16 bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 rounded animate-pulse"></div>
    </div>
  );
}
