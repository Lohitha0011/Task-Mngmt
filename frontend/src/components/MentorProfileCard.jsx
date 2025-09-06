"use client"
import { Star, CheckCircle, MapPin } from "lucide-react"

const MentorProfileCard = ({ mentor, isFollowing = false, onFollowToggle }) => {
  const handleFollowClick = (e) => {
    e.stopPropagation()
    onFollowToggle && onFollowToggle(mentor._id)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
      {/* Profile Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <img
            src={mentor.avatar || "/mentor1.png"}
            alt={mentor.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-gray-600">{mentor.role}</p>
            {mentor.location && (
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{mentor.location}</span>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleFollowClick}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            isFollowing
              ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
              : "bg-primary-600 text-white hover:bg-primary-700"
          }`}
        >
          {isFollowing ? "Followed" : "+ Follow"}
        </button>
      </div>

      {/* Bio */}
      {mentor.bio && <p className="text-sm text-gray-600 mb-4 line-clamp-2">{mentor.bio}</p>}

      {/* Skills */}
      {mentor.skills && mentor.skills.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {mentor.skills.slice(0, 3).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                {skill}
              </span>
            ))}
            {mentor.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{mentor.skills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600">
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

export default MentorProfileCard
