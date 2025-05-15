// Utility function to combine class names (replacement for cn from Radix UI)
export function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

// Legacy function for backward compatibility
export function combineClasses(...classes) {
  return classes.filter(Boolean).join(" ")
}
