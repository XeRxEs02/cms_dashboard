"use client"

import { useState, useRef, useEffect } from "react"
import { Plus } from "lucide-react"

export function AddProjectDropdown({ isOpen, onOpenChange, onAddProject }) {
  const [projectTitle, setProjectTitle] = useState("")
  const [projectStatus, setProjectStatus] = useState("In Progress")
  const dropdownRef = useRef(null)

  // Get current date in format: May 9, 2025
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onOpenChange(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onOpenChange])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!projectTitle.trim()) return

    onAddProject({
      title: projectTitle,
      status: projectStatus,
    })

    // Reset form
    setProjectTitle("")
    setProjectStatus("In Progress")
  }

  return (
    <div className="relative">
      <button
        className="bg-amber-600 hover:bg-amber-700 h-10 w-10 p-0 rounded-full shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group flex items-center justify-center text-white"
        onClick={() => onOpenChange(!isOpen)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Plus className="h-5 w-5 relative z-10" />
        <span className="sr-only">Add Project</span>
      </button>
      
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 top-12 bg-white rounded-lg shadow-xl p-4 z-50 w-80 border border-stone-200"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-stone-800 mb-4">Add New Project</h3>
            </div>

            <div className="space-y-2">
              <label htmlFor="project-title" className="block text-sm font-medium text-gray-700">
                Project Title
              </label>
              <input
                id="project-title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Enter project title"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Creation Date</label>
              <input 
                value={currentDate} 
                disabled 
                className="w-full px-3 py-2 bg-stone-100 text-stone-500 border border-stone-300 rounded-md" 
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Project Status</label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="planning"
                    name="status"
                    value="Planning"
                    checked={projectStatus === "Planning"}
                    onChange={() => setProjectStatus("Planning")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="planning" className="cursor-pointer">
                    Planning
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="in-progress"
                    name="status"
                    value="In Progress"
                    checked={projectStatus === "In Progress"}
                    onChange={() => setProjectStatus("In Progress")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="in-progress" className="cursor-pointer">
                    In Progress
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="completed"
                    name="status"
                    value="Completed"
                    checked={projectStatus === "Completed"}
                    onChange={() => setProjectStatus("Completed")}
                    className="text-amber-600 focus:ring-amber-500"
                  />
                  <label htmlFor="completed" className="cursor-pointer">
                    Completed
                  </label>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition-colors"
            >
              Create Project
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
