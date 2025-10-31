'use client';

export default function TestPage() {
  console.log('Test page rendering');
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Page</h1>
      <button onClick={() => console.log('Button clicked!')}>
        Test Button
      </button>
    </div>
  );
}








