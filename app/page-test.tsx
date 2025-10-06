export default function TestPage() {
  return (
    <div className="pt-20 p-8">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Test Page</h1>
      <p className="text-lg text-gray-600">This is a test to see if the page renders correctly.</p>
      <div className="mt-8 p-4 bg-blue-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Debug Info:</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Page is rendering</li>
          <li>Tailwind CSS is working</li>
          <li>Layout is functioning</li>
        </ul>
      </div>
    </div>
  );
}
