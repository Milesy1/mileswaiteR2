'use client';

interface SkeletonSketchProps {
  className?: string;
}

export function SkeletonSketch({ className = '' }: SkeletonSketchProps) {
  return (
    <div className={`w-full h-full bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 rounded-lg flex items-center justify-center ${className}`}>
      <div className="animate-pulse space-y-4 w-full h-full flex items-center justify-center">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 border-4 border-neutral-300 dark:border-neutral-600 border-t-primary-500 dark:border-t-primary-400 rounded-full mx-auto animate-spin"></div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Loading visualization...</p>
        </div>
      </div>
    </div>
  );
}

