"use client"
import { Button } from "@/components/ui/button"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    name: string
    avatar: string
    description: string
    inProgressGoals: number
    completedGoals: number
    colleagues: number
  }
}

export function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-8 mx-4 w-full max-w-sm">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✕
        </Button>

        {/* Profile Picture with Blue Border */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-[#015bfa] overflow-hidden">
              <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
            </div>
            {/* Blue Badge */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-8 bg-[#015bfa] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-center text-[#000000] mb-2">{user.name}</h2>

        {/* Description */}
        <p className="text-center text-[#767676] mb-8">{user.description}</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-[#767676] mb-1">진행중인 목표</p>
            <p className="text-2xl font-bold text-[#000000]">{user.inProgressGoals}</p>
          </div>
          <div>
            <p className="text-sm text-[#767676] mb-1">완료한 목표</p>
            <p className="text-2xl font-bold text-[#000000]">{user.completedGoals}</p>
          </div>
          <div>
            <p className="text-sm text-[#767676] mb-1">함께한 동료</p>
            <p className="text-2xl font-bold text-[#000000]">{user.colleagues}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
