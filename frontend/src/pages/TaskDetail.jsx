"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Play, Pause, Volume2, Maximize, Calendar, Clock, CheckCircle2 } from "lucide-react"

const TaskDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180) // 3 minutes in seconds

  // Mock task data - in real app, this would come from API
  const [task] = useState({
    id: id,
    title: "Creating Awesome Mobile Apps",
    category: "UI/UX Designer",
    description:
      "Explore the latest design principles. Create your first mobile app and build the first prototype and connect with the design system. Also learn the fundamental principles and components of the system.",
    videoUrl: "/video-player.jpg",
    progress: 90,
    deadline: "2024-01-15",
    timeLeft: "1 Hour",
    assignedUsers: [
      { name: "User 1", avatar: "/diverse-group-avatars.png" },
      { name: "User 2", avatar: "/diverse-group-avatars.png" },
      { name: "User 3", avatar: "/diverse-group-avatars.png" },
      { name: "User 4", avatar: "/diverse-group-avatars.png" },
    ],
    assessments: [
      {
        id: 1,
        title: "Understanding the tools in Figma",
        completed: true,
      },
      {
        id: 2,
        title: "Mastering the basics of making designs",
        completed: true,
      },
      {
        id: 3,
        title: "Designing a mobile application with figma",
        completed: false,
      },
      {
        id: 4,
        title: "Understanding the design flow",
        completed: false,
      },
    ],
    details: {
      assignedDate: "2024-01-10",
      dueDate: "2024-01-15",
      priority: "High",
      status: "In Progress",
    },
  })

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newTime = (clickX / rect.width) * duration
    setCurrentTime(Math.floor(newTime))
  }

  const toggleAssessment = (assessmentId) => {
    // In real app, this would update the assessment status via API
    console.log("Toggle assessment:", assessmentId)
  }

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, duration])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Tasks</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Detail Task</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Player */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden mb-4">
              <div className="aspect-video flex items-center justify-center">
                <img
                  src={task.videoUrl || "/placeholder.svg"}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={togglePlayPause}
                    className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-gray-900" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-900 ml-1" />
                    )}
                  </button>
                </div>
              </div>

              {/* Video Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="flex items-center space-x-4 text-white">
                  <button onClick={togglePlayPause}>
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>

                  <div className="flex-1">
                    <div className="h-1 bg-gray-600 rounded-full cursor-pointer" onClick={handleProgressClick}>
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <span className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  <Volume2 className="w-5 h-5" />
                  <Maximize className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Task Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h2>
            <p className="text-gray-600 mb-4">{task.category}</p>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{task.description}</p>
            </div>

            {/* Essence of Assessment */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Essence of Assessment</h3>
              <div className="space-y-3">
                {task.assessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleAssessment(assessment.id)}
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        assessment.completed
                          ? "bg-primary-600 border-primary-600 text-white"
                          : "border-gray-300 hover:border-primary-600"
                      }`}
                    >
                      {assessment.completed && <CheckCircle2 className="w-3 h-3" />}
                    </button>
                    <span className={`${assessment.completed ? "text-gray-900 line-through" : "text-gray-700"}`}>
                      {assessment.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Assignment Details</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">{task.details.status}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Priority</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded-full">{task.details.priority}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Due Date</span>
                <span className="text-gray-900 font-medium">Jan 15, 2024</span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Progress</h3>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm font-medium text-primary-600">{task.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{task.timeLeft}</span>
              </div>

              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Due Jan 15</span>
              </div>
            </div>

            {/* Assigned Users */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Assigned Team</h4>
              <div className="flex -space-x-2">
                {task.assignedUsers.map((user, index) => (
                  <img
                    key={index}
                    src={user.avatar || "/placeholder.svg"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    title={user.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetail
