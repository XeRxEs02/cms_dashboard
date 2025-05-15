"use client"

import { useState, useRef, useEffect } from "react"
import { CustomDialog } from "@/components/custom-dialog"
import { CustomSelect } from "@/components/custom-select"
import { DatePicker } from "@/components/custom-calendar"
import { useToast } from "@/components/ui/toast-container"

export function EditProjectModal({ isOpen, onClose, project, onSave }) {
  const [projectTitle, setProjectTitle] = useState("")
  const [projectStatus, setProjectStatus] = useState("In Progress")
  const [date, setDate] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)
  const { showToast } = useToast()

  // Initialize form with project data when it changes
  useEffect(() => {
    if (project) {
      setProjectTitle(project.title || "")
      setProjectStatus(project.status || "In Progress")
      
      // Parse the date string to a Date object
      if (project.date) {
        try {
          // Try to parse the date string (format: "Month Day, Year")
          const dateParts = project.date.split(',')
          if (dateParts.length === 2) {
            const monthDay = dateParts[0].trim()
            const year = parseInt(dateParts[1].trim())
            const dateObj = new Date(`${monthDay}, ${year}`)
            
            if (!isNaN(dateObj.getTime())) {
              setDate(dateObj)
            } else {
              // Fallback to today if parsing fails
              setDate(new Date())
            }
          } else {
            setDate(new Date())
          }
        } catch (error) {
          console.error("Error parsing date:", error)
          setDate(new Date())
        }
      } else {
        setDate(new Date())
      }
    }
  }, [project])

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
      // Create updated project object
      const updatedProject = {
        ...project,
        title: projectTitle,
        date: date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        status: projectStatus,
      }

      // Call the onSave function with the updated project
      onSave(updatedProject)

      // Show success toast
      showToast({
        type: "success",
        title: "Project Updated",
        message: `${projectTitle} has been successfully updated`
      })
      
      // Close the modal
      onClose()
    } catch (error) {
      // Show error toast
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to update project. Please try again."
      })
      console.error("Error updating project:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CustomDialog isOpen={isOpen} onClose={onClose} title="Edit Project">
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Project Number
          </label>
          <div className="px-3 py-2 border border-stone-300 rounded-md bg-stone-50 text-stone-500">
            {project?.projectNumber || "N/A"}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Owner
          </label>
          <div className="px-3 py-2 border border-stone-300 rounded-md bg-stone-50 text-stone-500">
            {project?.owner || "N/A"}
          </div>
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
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </CustomDialog>
  )
}
