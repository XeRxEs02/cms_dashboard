"use client"

import { useState, useRef, useEffect } from "react"
import { LogOutIcon } from "@/components/icons"

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
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
  )
}
