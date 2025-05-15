"use client"

import React from 'react'

// Custom Link component to replace Next.js Link
export function CustomLink({ href, children, className = "", onClick, ...props }) {
  const handleClick = (e) => {
    e.preventDefault()
    
    // If onClick is provided, call it
    if (onClick) {
      onClick(e)
      return
    }
    
    // Otherwise, handle navigation
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', href)
      
      // Dispatch a custom navigation event that the app can listen for
      const navigationEvent = new CustomEvent('customNavigation', { 
        detail: { href } 
      })
      window.dispatchEvent(navigationEvent)
    }
  }
  
  return (
    <a 
      href={href} 
      onClick={handleClick} 
      className={className}
      {...props}
    >
      {children}
    </a>
  )
}

// Custom navigation hook to listen for navigation events
export function useCustomNavigation(callback) {
  React.useEffect(() => {
    const handleNavigation = (event) => {
      if (callback) {
        callback(event.detail.href)
      }
    }
    
    window.addEventListener('customNavigation', handleNavigation)
    
    return () => {
      window.removeEventListener('customNavigation', handleNavigation)
    }
  }, [callback])
}

// Custom router to replace Next.js useRouter
export function useCustomRouter() {
  const [currentPath, setCurrentPath] = React.useState('')
  
  React.useEffect(() => {
    // Set initial path
    if (typeof window !== 'undefined') {
      setCurrentPath(window.location.pathname)
      
      // Listen for path changes
      const handlePopState = () => {
        setCurrentPath(window.location.pathname)
      }
      
      window.addEventListener('popstate', handlePopState)
      
      // Listen for custom navigation events
      const handleCustomNavigation = (event) => {
        setCurrentPath(event.detail.href)
      }
      
      window.addEventListener('customNavigation', handleCustomNavigation)
      
      return () => {
        window.removeEventListener('popstate', handlePopState)
        window.removeEventListener('customNavigation', handleCustomNavigation)
      }
    }
  }, [])
  
  const push = (href) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', href)
      
      // Update current path
      setCurrentPath(href)
      
      // Dispatch a custom navigation event
      const navigationEvent = new CustomEvent('customNavigation', { 
        detail: { href } 
      })
      window.dispatchEvent(navigationEvent)
    }
  }
  
  return {
    pathname: currentPath,
    push,
    back: () => window.history.back(),
    forward: () => window.history.forward()
  }
}
