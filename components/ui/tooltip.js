"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

const TooltipProvider = ({ children }) => {
  return children
}

const Tooltip = ({ children, open, defaultOpen = false, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  const actualOpen = open !== undefined ? open : isOpen
  const actualOnOpenChange = onOpenChange || setIsOpen
  
  return React.Children.map(children, child => 
    React.cloneElement(child, { 
      open: actualOpen, 
      onOpenChange: actualOnOpenChange 
    })
  )
}

const TooltipTrigger = ({ children, open, onOpenChange }) => {
  return React.cloneElement(children, {
    onMouseEnter: () => onOpenChange && onOpenChange(true),
    onMouseLeave: () => onOpenChange && onOpenChange(false),
    onFocus: () => onOpenChange && onOpenChange(true),
    onBlur: () => onOpenChange && onOpenChange(false),
  })
}

const TooltipContent = ({ 
  className, 
  children, 
  sideOffset = 4, 
  align = "center",
  open,
  ...props 
}) => {
  const ref = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [triggerElement, setTriggerElement] = useState(null)

  useEffect(() => {
    // Find the trigger element (the previous sibling)
    if (ref.current) {
      const trigger = ref.current.parentElement.querySelector('[data-tooltip-trigger="true"]')
      if (trigger) {
        setTriggerElement(trigger)
      }
    }
  }, [open])

  useEffect(() => {
    if (!triggerElement || !ref.current || !open) return
    
    const triggerRect = triggerElement.getBoundingClientRect()
    const tooltipRect = ref.current.getBoundingClientRect()
    
    let top, left
    
    // Position below the trigger
    top = triggerRect.bottom + sideOffset
    
    // Align based on preference
    if (align === "start") {
      left = triggerRect.left
    } else if (align === "end") {
      left = triggerRect.right - tooltipRect.width
    } else { // center
      left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)
    }
    
    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth
    if (left < 10) left = 10
    if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10
    }
    
    setPosition({ top, left })
  }, [triggerElement, open, align, sideOffset])

  if (!open) return null

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 50
      }}
      className={cn(
        "z-50 overflow-hidden rounded-md bg-stone-900 px-3 py-1.5 text-xs text-stone-50 animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
