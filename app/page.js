"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="text-center">
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
            <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-7H4a2 2 0 0 0-2 2v17Z" />
            <path d="M15 2v5a2 2 0 0 0 2 2h5" />
            <path d="M8 12h8" />
            <path d="M8 16h8" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Construction Dashboard</h1>
        <p className="text-stone-600">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}
