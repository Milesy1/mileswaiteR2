'use client';

export function Skeleton3D({ size = 'large' }: { size?: 'small' | 'medium' | 'large' }) {
  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-64 h-64',
    large: 'w-80 h-80 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] xl:w-[36rem] xl:h-[36rem]'
  };

  return (
    <div className={`${sizeClasses[size]} mx-auto bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center`}>
      <div className="w-full h-full bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-pulse rounded-lg"></div>
    </div>
  );
}
