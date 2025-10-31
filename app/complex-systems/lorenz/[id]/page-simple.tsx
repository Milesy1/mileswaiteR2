export default function LorenzStudyPageSimple() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Lorenz Study Page
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          This is a simple test page to verify the dynamic route works.
        </p>
        <div className="mt-8 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Test Content</h2>
          <p>If you can see this, the dynamic route is working correctly.</p>
        </div>
      </div>
    </div>
  );
}







