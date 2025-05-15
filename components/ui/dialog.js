"use client"

import React, { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = ({ children, open, onOpenChange }) => {
  return open ? children : null
}

const DialogTrigger = ({ children, onClick }) => {
  return React.cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation()
      if (onClick) onClick(e)
    }
  })
}

const DialogPortal = ({ children }) => {
  return children
}

const DialogOverlay = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...props}
    />
  )
}

const DialogContent = ({ className, children, onClose, ...props }) => {
  const contentRef = useRef(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target) && onClose) {
      onClose()
    }
  }

  return (
    <DialogPortal>
      <DialogOverlay onClick={handleBackdropClick} />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          ref={contentRef}
          className={cn(
            "bg-white rounded-lg shadow-lg z-50 max-w-lg w-full p-6 animate-in fade-in-50 zoom-in-95 duration-300",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </div>
    </DialogPortal>
  )
}

const DialogHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
)

const DialogFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)

const DialogTitle = ({ className, ...props }) => (
  <h3
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
)

const DialogDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-stone-500", className)}
    {...props}
  />
)

const DialogClose = ({ className, onClick, ...props }) => (
  <button
    className={cn(
      "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      className
    )}
    onClick={onClick}
    {...props}
  >
    <X className="h-4 w-4" />
    <span className="sr-only">Close</span>
  </button>
)

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose
}
