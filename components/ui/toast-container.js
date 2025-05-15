"use client"

import React, { useState, useEffect, createContext, useContext } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

// Create a context for toast management
const ToastContext = createContext({
  showToast: () => {},
  hideToast: () => {},
})

// Toast types and their styles
const toastTypes = {
  success: "bg-green-100 border-green-500 text-green-800",
  error: "bg-red-100 border-red-500 text-red-800",
  warning: "bg-amber-100 border-amber-500 text-amber-800",
  info: "bg-blue-100 border-blue-500 text-blue-800",
}

// Individual Toast component
function Toast({ id, type = "info", title, message, duration = 5000, onClose }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  return (
    <div
      className={cn(
        "relative flex w-full max-w-sm items-start gap-3 rounded-lg border-l-4 p-4 shadow-md animate-in slide-in-from-right-full",
        toastTypes[type]
      )}
    >
      <div className="flex-1">
        {title && <h5 className="mb-1 font-medium">{title}</h5>}
        {message && <p className="text-sm">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="absolute right-2 top-2 rounded-full p-1 hover:bg-black/5"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
}

// Toast container component
export function ToastContainer({ children }) {
  const [toasts, setToasts] = useState([])

  // Keep track of the last ID to ensure uniqueness
  const idCounterRef = React.useRef(0);

  const showToast = (toast) => {
    // Create a unique ID by combining timestamp with a counter
    const timestamp = Date.now();
    const counter = idCounterRef.current++;
    const id = `toast-${timestamp}-${counter}`;

    setToasts((prev) => [...prev, { id, ...toast }])
    return id
  }

  const hideToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed bottom-0 right-0 z-50 m-4 flex flex-col gap-2">
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={hideToast} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

// Hook to use toast
export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastContainer")
  }
  return context
}
