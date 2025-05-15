"use client"

import React from "react"

export function Button({ 
  children, 
  className = "", 
  variant = "default", 
  size = "default", 
  onClick, 
  type = "button",
  disabled = false,
  ...props 
}) {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none"
  
  const variants = {
    default: "bg-amber-600 text-white hover:bg-amber-700",
    outline: "border border-stone-300 bg-white hover:bg-stone-100 text-stone-800",
    ghost: "hover:bg-stone-100 text-stone-800",
    link: "text-amber-600 underline-offset-4 hover:underline"
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6 text-lg",
    icon: "h-10 w-10 p-0"
  }
  
  const variantStyle = variants[variant] || variants.default
  const sizeStyle = sizes[size] || sizes.default
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
