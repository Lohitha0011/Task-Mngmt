import { Clock, Users } from "lucide-react"

const TaskCard = ({ task, showProgress = true, className = "" }) => {
  const getTimeLeft = (deadline) => {
    const now = new Date()
    const deadlineDate = new Date(deadline)
    const diffTime = deadlineDate - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due today"
    if (diffDays === 1) return "1 Day Left"
    if (diffDays < 7) return `${diffDays} Days Left`
    return `${Math.ceil(diffDays / 7)} Week${Math.ceil(diffDays / 7) > 1 ? "s" : ""} Left`
  }

  const getProgressColor = (progress) => {
    if (progress >= 90) return "bg-green-500"
    if (progress >= 70) return "bg-blue-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div
      className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${className}`}
    >
      <div className="aspect-video bg-gray-100 rounded-lg mb-3 overflow-hidden">
        <img
          src={task.thumbnail || "/placeholder.svg?height=120&width=200&query=task"}
          alt={task.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">{task.title}</h4>
      <p className="text-sm text-gray-600 mb-2">{task.category}</p>

      {showProgress && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-900">{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(task.progress)}`}
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{getTimeLeft(task.deadline)}</span>
        </div>

        {task.assignedUsers && task.assignedUsers.length > 0 && (
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <div className="flex -space-x-1">
              {task.assignedUsers.slice(0, 3).map((user, index) => (
                <img
                  key={index}
                  src={user.avatar || "/placeholder.svg?height=20&width=20&query=avatar"}
                  alt={user.name}
                  className="w-5 h-5 rounded-full border-2 border-white"
                />
              ))}
              {task.assignedUsers.length > 3 && (
                <div className="w-5 h-5 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">+{task.assignedUsers.length - 3}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
