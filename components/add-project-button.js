"use client"

import { useState } from "react"
import { Plus, Building, Ruler, Hammer } from "lucide-react"

export function AddProjectButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="bg-amber-600 hover:bg-amber-700 h-12 px-4 shadow-lg transition-all duration-300 flex items-center gap-2 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="relative w-6 h-6">
          {/* Construction crane icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M20 6H4M12 6V18M12 18L6 12M4 20L20 20M4 9L4 20M20 9L20 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="font-medium text-base">Add Project</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 bg-white rounded-lg shadow-xl p-4 z-50 w-72 border border-stone-200">
          <h3 className="text-base font-medium mb-3 text-stone-700">Create New Project</h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              className="h-auto py-4 flex flex-col items-center justify-center border border-amber-200 rounded-md hover:bg-amber-50 hover:border-amber-300"
              onClick={() => (window.location.href = "/projects/new?type=building")}
            >
              <Building className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-sm">Building</span>
            </button>

            <button
              className="h-auto py-4 flex flex-col items-center justify-center border border-amber-200 rounded-md hover:bg-amber-50 hover:border-amber-300"
              onClick={() => (window.location.href = "/projects/new?type=renovation")}
            >
              <Hammer className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-sm">Renovation</span>
            </button>

            <button
              className="h-auto py-4 flex flex-col items-center justify-center border border-amber-200 rounded-md hover:bg-amber-50 hover:border-amber-300"
              onClick={() => (window.location.href = "/projects/new?type=infrastructure")}
            >
              <Ruler className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-sm">Infrastructure</span>
            </button>

            <button
              className="h-auto py-4 flex flex-col items-center justify-center border border-amber-200 rounded-md hover:bg-amber-50 hover:border-amber-300"
              onClick={() => (window.location.href = "/projects/new?type=custom")}
            >
              <Plus className="h-8 w-8 text-amber-600 mb-2" />
              <span className="text-sm">Custom</span>
            </button>
          </div>
        </div>
      )}

      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
