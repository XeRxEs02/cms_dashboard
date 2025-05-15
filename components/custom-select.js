"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export function CustomSelect({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  label,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef(null)

  // Close select when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className="relative" ref={selectRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        className={`flex w-full items-center justify-between rounded-md border border-stone-300 bg-white px-3 py-2 text-left ${className}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={!selectedOption ? "text-gray-400" : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-stone-200">
          <ul className="max-h-60 overflow-auto rounded-md py-1 text-base" role="listbox">
            {options.map((option) => (
              <li
                key={option.value}
                className={`cursor-pointer select-none px-4 py-2 hover:bg-stone-100 ${
                  value === option.value ? "bg-stone-100" : ""
                }`}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                role="option"
                aria-selected={value === option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
