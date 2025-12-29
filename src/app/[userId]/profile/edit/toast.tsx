"use client"

import { useEffect } from "react"

interface ToastProps {
  message: string
  type?: "success" | "error"
  show?: boolean
  onHide: () => void
  duration?: number
}

export function Toast({ message, type = "success", show = true, onHide, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [show, onHide, duration])

  if (!show) return null

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div className="bg-[#7f8288] text-white px-4 py-3 rounded-2xl flex items-center shadow-lg">
        <div
          className={`w-6 h-6 ${type === "success" ? "bg-[#32c944]" : "bg-red-500"} rounded-full flex items-center justify-center mr-3 flex-shrink-0`}
        >
          <span className="text-white text-sm">{type === "success" ? "✓" : "✕"}</span>
        </div>
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  )
}
