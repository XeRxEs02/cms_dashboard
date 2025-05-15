"use client"

import React, { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = ({ children, open, onOpenChange }) => {
  return open ? children : null
}

const SheetTrigger = ({ children, onClick }) => {
  return React.cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation()
      if (onClick) onClick(e)
    }
  })
}

const SheetPortal = ({ children }) => {
  return children
}

const SheetOverlay = ({ className, onClick, ...props }) => {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      onClick={onClick}
      {...props}
    />
  )
}

const SheetContent = ({
  className,
  children,
  position = "right",
  onClose,
  ...props
}) => {
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

  const positionClasses = {
    top: "inset-x-0 top-0 border-b",
    bottom: "inset-x-0 bottom-0 border-t",
    left: "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm border-r",
    right: "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm border-l",
  }

  const slideAnimations = {
    top: "slide-in-from-top",
    bottom: "slide-in-from-bottom",
    left: "slide-in-from-left",
    right: "slide-in-from-right",
  }

  return (
    <SheetPortal>
      <SheetOverlay onClick={handleBackdropClick} />
      <div
        className="fixed inset-0 z-50 flex"
        data-position={position}
      >
        <div
          ref={contentRef}
          className={cn(
            "bg-white shadow-lg",
            positionClasses[position],
            "animate-in duration-300",
            slideAnimations[position],
            className
          )}
          {...props}
        >
          {children}
          <button
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    </SheetPortal>
  )
}

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
)

const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)

const SheetTitle = ({ className, ...props }) => (
  <h3
    className={cn("text-lg font-semibold text-stone-900", className)}
    {...props}
  />
)

const SheetDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-stone-500", className)}
    {...props}
  />
)

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription
}
