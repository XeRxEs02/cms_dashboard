"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, ChevronDown } from "lucide-react"

export function CustomCalendar({ selectedDate, onDateChange, onClose }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate))

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Format date as YYYY-MM-DD for comparison
  const formatDateForComparison = (date) => {
    return date.toISOString().split("T")[0]
  }

  // Check if a date is in the past (before today)
  const isDateInPast = (date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Get month name
  const getMonthName = (date) => {
    return date.toLocaleString("default", { month: "long" })
  }

  // Handle date selection
  const handleDateSelect = (day) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)

    // Don't allow selection of past dates
    if (isDateInPast(newDate)) {
      return
    }

    onDateChange(newDate)
    if (onClose) {
      onClose()
    }
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDayOfMonth = getFirstDayOfMonth(year, month)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isSelected = formatDateForComparison(date) === formatDateForComparison(selectedDate)
      const isToday = formatDateForComparison(date) === formatDateForComparison(new Date())
      const isPast = isDateInPast(date) && !isToday

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateSelect(day)}
          disabled={isPast}
          className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
            isSelected
              ? "bg-amber-600 text-white"
              : isToday
                ? "bg-stone-200 text-stone-800"
                : isPast
                  ? "text-stone-300 cursor-not-allowed"
                  : "hover:bg-stone-100"
          }`}
        >
          {day}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="p-3 bg-white rounded-md shadow-md" onClick={(e) => e.stopPropagation()}>
      {/* Header with month/year and navigation */}
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-1 rounded-full hover:bg-stone-100">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="font-medium">
          {getMonthName(currentMonth)} {currentMonth.getFullYear()}
        </div>
        <button type="button" onClick={nextMonth} className="p-1 rounded-full hover:bg-stone-100">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="h-8 w-8 flex items-center justify-center text-xs text-stone-500">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">{generateCalendarDays()}</div>
    </div>
  )
}

export function DatePicker({ selectedDate, onDateChange, id, label }) {
  const [isOpen, setIsOpen] = useState(false)
  const [containerRef, setContainerRef] = useState(null)

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef && !containerRef.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [containerRef])

  return (
    <div className="relative" ref={setContainerRef}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        className="flex w-full items-center justify-between rounded-md border border-stone-300 bg-white px-3 py-2 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <CalendarIcon className="mr-2 h-4 w-4 text-stone-500" />
          <span>{formatDate(selectedDate)}</span>
        </div>
        <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1">
          <CustomCalendar selectedDate={selectedDate} onDateChange={onDateChange} onClose={() => setIsOpen(false)} />
        </div>
      )}
    </div>
  )
}
