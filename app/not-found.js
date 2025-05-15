"use client"

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="inline-block bg-amber-600 rounded-full p-3 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-stone-800 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-stone-700 mb-4">Page Not Found</h2>
        <p className="text-stone-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/dashboard" 
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white py-2 px-6 rounded-md transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
