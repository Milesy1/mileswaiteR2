export default function TestSimplePage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
          Simple Test Page
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400">
          This is a test page to verify routing works in the complex-systems/lorenz directory.
        </p>
        <div className="mt-8 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Success!</h2>
          <p>If you can see this, the routing is working correctly.</p>
        </div>
      </div>
    </div>
  );
}






