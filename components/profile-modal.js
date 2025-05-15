"use client"

import { useState, useRef, useEffect } from "react"
import { CustomDialog } from "@/components/custom-dialog"
import { useToast } from "@/components/ui/toast-container"

export function ProfileModal({ isOpen, onClose, currentUser, onSave }) {
  const [name, setName] = useState(currentUser?.name || "")
  const [email, setEmail] = useState(currentUser?.email || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const formRef = useRef(null)
  const { showToast } = useToast()

  // Update form when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "")
      setEmail(currentUser.email || "")
    }
  }, [currentUser])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name.trim()) {
      showToast({
        type: "error",
        title: "Validation Error",
        message: "Name is required"
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Create updated user profile
      const updatedUser = {
        ...currentUser,
        name: name.trim(),
        email: email.trim(),
        updatedAt: new Date().toISOString()
      }

      // Call the onSave function with the updated user
      onSave(updatedUser)

      // Show success toast
      showToast({
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been successfully updated"
      })

      // Close the modal
      onClose()
    } catch (error) {
      // Show error toast
      showToast({
        type: "error",
        title: "Error",
        message: "Failed to update profile. Please try again."
      })
      console.error("Error updating profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <CustomDialog isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-4">
          <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-stone-200 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mb-2">
            {name ? (
              <span>{name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
            ) : (
              <span>?</span>
            )}
          </div>
          <p className="text-sm text-stone-500">Profile photo will use your initials</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="user-name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="user-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="user-email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="user-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
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
              Saving...
            </>
          ) : (
            "Save Profile"
          )}
        </button>
      </form>
    </CustomDialog>
  )
}
