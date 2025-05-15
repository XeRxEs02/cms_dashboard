"use client"

import { useState, useRef, useEffect } from "react"
import { CustomLink } from "@/components/custom-link"
import { LogOutIcon } from "@/components/icons"

export function DashboardHeader({ user, onEditProfile }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)

  // Default user name if not provided
  const userName = user?.name || "Guest"
  const userEmail = user?.email || ""

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="bg-stone-300 border-b border-stone-400">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CustomLink href="/dashboard">
              <div className="bg-amber-600 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7-7H4a2 2 0 0 0-2 2v17Z" />
                  <path d="M15 2v5a2 2 0 0 0 2 2h5" />
                  <path d="M8 12h8" />
                  <path d="M8 16h8" />
                </svg>
              </div>
            </CustomLink>
            <div>
              <h1 className="text-2xl font-bold text-stone-800">Welcome back,</h1>
              <p className="text-2xl font-bold text-stone-800">{userName.split(' ')[0]}.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
              onClick={() => {
                // Handle logout functionality here
                console.log("Logging out...")
                // You could redirect to login page or clear session
              }}
            >
              <LogOutIcon className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
