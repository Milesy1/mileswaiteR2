export default function ProjectLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <div className="h-[60vh] min-h-[500px] bg-neutral-200 animate-pulse">
        <div className="h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <div className="max-w-4xl space-y-6">
              {/* Category Badge Skeleton */}
              <div className="w-24 h-8 bg-neutral-300 rounded-full"></div>
              
              {/* Title Skeleton */}
              <div className="space-y-4">
                <div className="h-16 bg-neutral-300 rounded w-3/4"></div>
                <div className="h-16 bg-neutral-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections Skeleton */}
      <div className="py-20 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Overview Section */}
          <div className="space-y-6">
            <div className="h-8 bg-neutral-200 rounded w-48"></div>
            <div className="h-0.5 bg-neutral-200 rounded w-24"></div>
            <div className="space-y-3">
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-full"></div>
              <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
            </div>
          </div>

          {/* Problem/Solution Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-6 bg-neutral-200 rounded w-32"></div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-5/6"></div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-neutral-200 rounded w-32"></div>
              <div className="space-y-2">
                <div className="h-4 bg-neutral-200 rounded w-full"></div>
                <div className="h-4 bg-neutral-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tech Stack Skeleton */}
      <div className="py-20 lg:py-32 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <div className="h-8 bg-neutral-200 rounded w-48 mx-auto mb-6"></div>
            <div className="h-0.5 bg-neutral-200 rounded w-24 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-neutral-200 rounded mx-auto mb-3"></div>
                <div className="h-4 bg-neutral-200 rounded w-20 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center">
            <div className="h-8 bg-neutral-200 rounded w-48 mx-auto mb-6"></div>
            <div className="h-0.5 bg-neutral-200 rounded w-24 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="aspect-[4/3] bg-neutral-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

