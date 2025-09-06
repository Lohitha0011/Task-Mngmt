"use client"
import { Star, CheckCircle } from "lucide-react"

const MentorCard = ({ mentor, isFollowing = false, onFollowToggle }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 min-w-[280px]">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <img
            src={mentor.avatar || "/placeholder.svg?height=40&width=40&query=avatar"}
            alt={mentor.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="font-semibold text-gray-900">{mentor.name}</h4>
            <p className="text-sm text-gray-600">{mentor.role}</p>
          </div>
        </div>

        <button
          onClick={() => onFollowToggle && onFollowToggle(mentor._id)}
          className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
            isFollowing
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-primary-600 text-white hover:bg-primary-700"
          }`}
        >
          {isFollowing ? "Followed" : "+ Follow"}
        </button>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <CheckCircle className="w-4 h-4" />
          <span>{mentor.tasksCompleted} Task</span>
        </div>

        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>
            {mentor.rating} ({mentor.reviewCount} Reviews)
          </span>
        </div>
      </div>
    </div>
  )
}

export default MentorCard
