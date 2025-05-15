"use client"

import { useState } from 'react'
import Link from 'next/link'

export default function TestPage() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-stone-800 mb-4">Test Page</h1>
        <p className="text-stone-600 mb-4">
          This is a simple test page to verify that Next.js is working correctly.
        </p>
        
        <div className="flex items-center justify-center mb-6">
          <button 
            onClick={() => setCount(count + 1)}
            className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md"
          >
            Count: {count}
          </button>
        </div>
        
        <div className="flex justify-center">
          <Link 
            href="/dashboard" 
            className="text-amber-600 hover:text-amber-800 underline"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
