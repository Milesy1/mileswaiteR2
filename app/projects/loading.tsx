import { SkeletonLoader } from '@/components/SkeletonLoader';
import { SkeletonCard } from '@/components/SkeletonCard';

export default function ProjectsLoading() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header Skeleton */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-6">
            <SkeletonLoader variant="line" width="200px" height="60px" className="mx-auto" />
            <SkeletonLoader variant="line" width="100px" height="2px" className="mx-auto" />
            <div className="flex justify-center gap-2">
              <SkeletonLoader variant="line" width="80px" height="20px" />
              <SkeletonLoader variant="line" width="100px" height="20px" />
              <SkeletonLoader variant="line" width="90px" height="20px" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid Skeleton */}
      <section className="pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}




