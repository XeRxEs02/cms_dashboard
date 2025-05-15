"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

export function CustomDialog({ isOpen, onClose, title, children }) {
  const dialogRef = useRef(null)

  // Handle ESC key to close dialog
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling on body when dialog is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        className="bg-white rounded-lg shadow-2xl z-50 w-full max-w-md p-6 animate-in fade-in-50 zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-stone-800">{title}</h2>
          <button
            type="button"
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-stone-100"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        {children}
      </div>
    </div>
  )
}

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, description }) {
  return (
    <CustomDialog isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-sm text-stone-600 mb-6">{description}</p>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          className="px-4 py-2 border border-stone-300 rounded-md hover:bg-stone-100"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={() => {
            onConfirm()
            onClose()
          }}
        >
          Delete
        </button>
      </div>
    </CustomDialog>
  )
}
