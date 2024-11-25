// pages/test.tsx
import { useState, useEffect, ErrorInfo } from "react";

export default function TestPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  async function testEndpoint() {
    try {
      const response = await fetch("/api/lightroom/albums?albumName=webRGB");
      const result = await response.json();
      console.log("API Response:", result);
      setData(result);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message);
    }
  }

  return (
    <div className="p-4">
      <button
        onClick={testEndpoint}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Test API
      </button>

      {error && <div className="text-red-500 mt-4">Error: {error}</div>}

      {data && (
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
