"use client"

import { useState, useRef } from "react"
import { CustomDialog } from "@/components/custom-dialog"
import { CustomSelect } from "@/components/custom-select"
import { DatePicker } from "@/components/custom-calendar"
import { useToast } from "@/components/ui/toast-container"

export function AddProjectModal({ isOpen, onClose, onAddProject }) {
  const [projectTitle, setProjectTitle] = useState("")
  const [projectStatus, setProjectStatus] = useState("In Progress")
  // Initialize with today's date
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [date, setDate] = useState(today)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)
  const { showToast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!projectTitle.trim()) {
      showToast({
        type: "error",
        title: "Validation Error",
        message: "Project title is required"
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create a new project with a unique ID and other required fields
      const newProject = {
        id: `PRJ-${Date.now()}`,
        title: projectTitle,
        projectNumber: `PRJ-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        date: date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        // Note: owner will be set in the dashboard component
        status: projectStatus,
      }

      // Call the onAddProject function with the new project
      onAddProject(newProject)

      // Show success toast
      showToast({
        type: "success",
        title: "Project Created",
        message: `${projectTitle} has been successfully created`
      })

      // Reset form
      setProjectTitle("")
      setProjectStatus("In Progress")
      setDate(today) // Reset to today's date

      // Close the modal
      onClose()
    } catch (error) {
      // Show error toast
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to create project. Please try again."
      })
      console.error("Error creating project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CustomDialog isOpen={isOpen} onClose={onClose} title="Add New Project">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="project-title" className="block text-sm font-medium text-gray-700">
            Project Title
          </label>
          <input
            id="project-title"
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Enter project title"
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <div className="space-y-2">
          <DatePicker id="project-date" label="Creation Date" selectedDate={date} onDateChange={setDate} />
        </div>

        <div className="space-y-2">
          <CustomSelect
            id="project-status"
            label="Project Status"
            value={projectStatus}
            onChange={setProjectStatus}
            options={[
              { value: "Planning", label: "Planning" },
              { value: "In Progress", label: "In Progress" },
              { value: "Completed", label: "Completed" },
            ]}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-md transition-colors mt-6 flex items-center justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : (
            "Create Project"
          )}
        </button>
      </form>
    </CustomDialog>
  )
}
