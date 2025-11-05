'use client';

interface SkeletonLoaderProps {
  variant?: 'text' | 'card' | 'circle' | 'image' | 'avatar' | 'line';
  width?: string | number;
  height?: string | number;
  className?: string;
  count?: number;
}

export function SkeletonLoader({
  variant = 'line',
  width,
  height,
  className = '',
  count = 1,
}: SkeletonLoaderProps) {
  const baseClasses = 'bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-pulse rounded';

  const variants = {
    text: 'h-4',
    card: 'h-48',
    circle: 'rounded-full',
    image: 'aspect-video',
    avatar: 'rounded-full w-12 h-12',
    line: 'h-4',
  };

  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  if (count > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`${baseClasses} ${variants[variant]}`}
            style={style}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={style}
    />
  );
}





