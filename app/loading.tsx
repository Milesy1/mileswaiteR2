export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-12 h-12 border-4 border-neutral-200 border-t-primary-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <p className="text-neutral-600 font-medium">Loading...</p>
          <p className="text-neutral-500 text-sm">Please wait while we prepare your experience</p>
        </div>
      </div>
    </div>
  );
}

