"use client"

import { useState, useRef, useEffect } from "react"
import { PlusIcon } from "@/components/icons"
import { ProjectCard } from "@/components/project-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { AddProjectModal } from "@/components/add-project-modal"
import { EditProjectModal } from "@/components/edit-project-modal"
import { ProfileModal } from "@/components/profile-modal"
import { CustomDropdown } from "@/components/custom-dropdown"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast-container"

// No initial projects - we'll start with an empty array

export default function DashboardPage() {
  const [projects, setProjects] = useState([])
  const [projectFilter, setProjectFilter] = useState("All Projects")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState(null)
  const [user, setUser] = useState(null)
  const projectsContainerRef = useRef(null)
  const { showToast } = useToast()

  // Load projects and user profile from localStorage on mount
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Try to load any previously saved projects from localStorage
      try {
        const savedProjects = localStorage.getItem('constructionProjects')
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects))
        }

        // Load user profile
        const savedUser = localStorage.getItem('constructionUser')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        } else {
          // Set default user if none exists
          const defaultUser = {
            name: 'Guest User',
            email: '',
            createdAt: new Date().toISOString()
          }
          setUser(defaultUser)
          localStorage.setItem('constructionUser', JSON.stringify(defaultUser))
        }
      } catch (error) {
        console.error('Failed to load data from localStorage:', error)
      }
    }
  }, [])

  // Save projects to localStorage whenever they change
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('constructionProjects', JSON.stringify(projects))
      } catch (error) {
        console.error('Failed to save projects to localStorage:', error)
      }
    }
  }, [projects])

  // Save user profile to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && user) {
      try {
        localStorage.setItem('constructionUser', JSON.stringify(user))
      } catch (error) {
        console.error('Failed to save user profile to localStorage:', error)
      }
    }
  }, [user])

  // Handle profile update
  const handleUpdateProfile = (updatedUser) => {
    setUser(updatedUser)
    showToast({
      type: "success",
      title: "Profile Updated",
      message: "Your profile has been successfully updated"
    })
  }

  // Filter projects based on selected filter
  const filteredProjects = projects.filter((project) => {
    if (projectFilter === "All Projects") return true
    if (projectFilter === "Active") return project.status === "In Progress" || project.status === "Planning"
    if (projectFilter === "Completed") return project.status === "Completed"
    return true
  })

  // Handle project creation
  const handleAddProject = (newProject) => {
    try {
      // Add the current user as the owner
      const projectWithOwner = {
        ...newProject,
        owner: user?.name || "Guest User" // Use the current user's name
      }

      // Add the new project to the projects array
      setProjects((prevProjects) => [projectWithOwner, ...prevProjects])

      // Note: Toast is shown by the AddProjectModal component
    } catch (error) {
      console.error("Error adding project:", error)
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to add project to the dashboard"
      })
    }
  }

  // Handle project deletion
  const handleDeleteProject = (projectId) => {
    try {
      // Remove the project from the projects array
      setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId))

      // Show success toast
      showToast({
        type: "info",
        title: "Project Deleted",
        message: "The project has been removed"
      })
    } catch (error) {
      console.error("Error deleting project:", error)
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to delete project"
      })
    }
  }

  // Handle project edit
  const handleEditProject = (project) => {
    setCurrentProject(project)
    setIsEditModalOpen(true)
  }

  // Handle project update
  const handleUpdateProject = (updatedProject) => {
    try {
      // Update the project in the projects array
      setProjects((prevProjects) =>
        prevProjects.map(project =>
          project.id === updatedProject.id ? updatedProject : project
        )
      )

      // Note: Toast is shown by the EditProjectModal component
    } catch (error) {
      console.error("Error updating project:", error)
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to update project"
      })
    }
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <DashboardHeader
        user={user}
        onEditProfile={() => setIsProfileModalOpen(true)}
      />

      <main className="container mx-auto px-4 pt-4 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 mt-0">
          <h2 className="text-2xl font-bold text-stone-800">Projects</h2>
          <div className="flex items-center gap-4">
            <CustomDropdown
              value={projectFilter}
              onChange={setProjectFilter}
              options={[
                { value: "All Projects", label: "All Projects" },
                { value: "Active", label: "Active" },
                { value: "Completed", label: "Completed" },
              ]}
              buttonClassName="border border-stone-300 bg-white hover:bg-stone-100 transition-colors px-4 py-2 rounded-md"
            />

            {projects.length > 0 ? (
              <Button
                variant="default"
                size="icon"
                className="rounded-full shadow-md hover:shadow-lg"
                onClick={() => setIsAddModalOpen(true)}
              >
                <PlusIcon className="h-5 w-5" />
                <span className="sr-only">Add Project</span>
              </Button>
            ) : (
              <Button
                variant="default"
                className="shadow-md hover:shadow-lg flex items-center"
                onClick={() => setIsAddModalOpen(true)}
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                Add Project
              </Button>
            )}
          </div>
        </div>

        {/* Scrollable container for projects */}
        <div ref={projectsContainerRef} className="max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 pt-4 px-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDeleteProject}
                  onEdit={handleEditProject}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <div className="inline-block bg-amber-100 rounded-full p-4 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8"
                  >
                    {projectFilter !== "All Projects" ? (
                      // Filter icon for filtered views
                      <>
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                      </>
                    ) : (
                      // Folder plus icon for empty state
                      <>
                        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
                        <line x1="12" x2="12" y1="10" y2="16" />
                        <line x1="9" x2="15" y1="13" y2="13" />
                      </>
                    )}
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-stone-800 mb-2">
                  {projectFilter !== "All Projects"
                    ? "No matching projects"
                    : "No projects yet"}
                </h3>
                <p className="text-stone-600 mb-6 max-w-md mx-auto">
                  {projectFilter !== "All Projects"
                    ? `There are no ${projectFilter.toLowerCase()} projects to display. Try changing the filter or create a new project.`
                    : "Get started by creating your first construction project. Click the button below to add a new project."}
                </p>
                <Button
                  variant="default"
                  onClick={() => setIsAddModalOpen(true)}
                  className="mx-auto px-6 py-2 shadow-md hover:shadow-lg transition-all"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Create Your First Project
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProject={handleAddProject}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={user}
        onSave={handleUpdateProfile}
      />

      <EditProjectModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={currentProject}
        onSave={handleUpdateProject}
      />
    </div>
  )
}