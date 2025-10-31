import { SkeletonLoader } from '@/components/SkeletonLoader';

export default function BlogLoading() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header Skeleton */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-6">
            <SkeletonLoader variant="line" width="200px" height="60px" className="mx-auto" />
            <SkeletonLoader variant="line" width="100px" height="2px" className="mx-auto" />
            <SkeletonLoader variant="line" width="400px" height="20px" className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Blog Posts Skeleton */}
      <section className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {Array.from({ length: 3 }).map((_, i) => (
            <article key={i} className="border-b border-neutral-200 dark:border-neutral-800 pb-8">
              <div className="space-y-4">
                <SkeletonLoader variant="line" width="80%" height="32px" />
                <SkeletonLoader variant="line" width="100%" height="20px" />
                <SkeletonLoader variant="line" width="90%" height="20px" />
                <SkeletonLoader variant="line" width="70%" height="20px" />
                <div className="flex gap-4 mt-4">
                  <SkeletonLoader variant="line" width="120px" height="16px" />
                  <SkeletonLoader variant="line" width="80px" height="16px" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}




