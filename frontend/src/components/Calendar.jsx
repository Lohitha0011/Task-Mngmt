"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(prev.getMonth() + direction)
      return newDate
    })
  }

  const days = getDaysInMonth(currentDate)
  const today = new Date().getDate()
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  const isCurrentMonth = currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigateMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h3 className="font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button onClick={() => navigateMonth(1)} className="p-1 hover:bg-gray-100 rounded">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className={`
              text-center text-sm py-1.5 cursor-pointer rounded
              ${day ? "hover:bg-gray-100" : ""}
              ${
                day && isCurrentMonth && day === today
                  ? "bg-primary-600 text-white font-semibold"
                  : day
                    ? "text-gray-700"
                    : ""
              }
            `}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
