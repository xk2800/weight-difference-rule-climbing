"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            You&apos;re Offline
          </h1>
          <p className="text-gray-600">
            {isOnline
              ? "Connection restored! You can now browse normally."
              : "No internet connection. The app will work with cached content."
            }
          </p>
        </div>

        <div className="space-y-4">
          {isOnline ? (
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Calculator
            </Link>
          ) : (
            <div className="text-sm text-gray-500">
              <p className="mb-2">While offline, you can still:</p>
              <ul className="list-disc list-inside space-y-1 text-left">
                <li>Use the weight difference calculator</li>
                <li>Access saved climber/belayer pairs</li>
                <li>View safety recommendations</li>
              </ul>
            </div>
          )}

          <Link
            href="/"
            className="block w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Try Calculator Anyway
          </Link>
        </div>

        <div className="mt-6 text-xs text-gray-400">
          <p>Lead Climbing Safety Calculator</p>
          <p>Works offline after first visit</p>
        </div>
      </div>
    </div>
  );
} 