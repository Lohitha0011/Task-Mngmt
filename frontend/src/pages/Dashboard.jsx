"use client"

import { useState } from "react"
import { Bell, MoreHorizontal } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import CircularProgress from "../components/CircularProgress"
import ActivityChart from "../components/ActivityChart"
import Calendar from "../components/Calendar"
import TaskCard from "../components/TaskCard"
import MentorCard from "../components/MentorCard"
import Logo from "../components/Logo"

const Dashboard = () => {
  const { user } = useAuth()

  // Mock data - in real app, this would come from API
  const [runningTask] = useState({
    completed: 65,
    total: 100,
    percentage: 45,
  })

  const [todayTask] = useState({
    title: "Creating Awesome Mobile Apps",
    category: "UI/UX Designer",
    progress: 90,
    timeLeft: "1 Hour",
    thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&crop=center",
    assignedUsers: [
      { name: "User 1", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
      { name: "User 2", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
      { name: "User 3", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
      { name: "User 4", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" },
    ],
  })

  const [upcomingTasks] = useState([
    {
      id: 1,
      title: "Creating Mobile App Design",
      category: "UI/UX Design",
      progress: 75,
      deadline: "2024-01-20",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [
        { name: "User 1", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
        { name: "User 2", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
      ],
    },
    {
      id: 2,
      title: "Creating Perfect Website",
      category: "Web Developer",
      progress: 85,
      deadline: "2024-01-25",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [
        { name: "User 3", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face" },
        { name: "User 4", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
      ],
    },
  ])

  const [monthlyMentors] = useState([
    {
      _id: "1",
      name: "Curious George",
      role: "UI/UX Design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      tasksCompleted: 40,
      rating: 4.7,
      reviewCount: 750,
      isFollowing: false,
    },
    {
      _id: "2",
      name: "Abraham Lincoln",
      role: "3D Design",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      tasksCompleted: 32,
      rating: 4.9,
      reviewCount: 510,
      isFollowing: true,
    },
  ])

  const handleFollowToggle = (mentorId) => {
    // In real app, this would make API call
    console.log("Toggle follow for mentor:", mentorId)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Logo size="sm" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Hi, {user?.name || 'User'}</h1>
            <p className="text-gray-600">Let's finish your task today!</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"}
            alt={user?.name || 'User'}
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Running Task & Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Running Task Card */}
            <div className="bg-gray-900 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Running Task</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold mb-1">{runningTask.completed}</div>
                  <div className="text-gray-300 text-sm">{runningTask.percentage}%</div>
                  <div className="text-gray-400 text-sm mt-2">{runningTask.total} Task</div>
                </div>
                <CircularProgress percentage={runningTask.percentage} size={100} color="#60a5fa" />
              </div>
            </div>

            {/* Activity Chart */}
            <ActivityChart />
          </div>

          {/* Monthly Mentors */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Mentors</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {monthlyMentors.map((mentor) => (
                <MentorCard
                  key={mentor._id}
                  mentor={mentor}
                  isFollowing={mentor.isFollowing}
                  onFollowToggle={handleFollowToggle}
                />
              ))}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Task</h3>
              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Calendar */}
          <Calendar />

          {/* Task Today */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Task Today</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-gray-100 rounded-lg mb-4 overflow-hidden">
              <img
                src={todayTask.thumbnail || "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&crop=center"}
                alt={todayTask.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h4 className="font-semibold text-gray-900 mb-1">{todayTask.title}</h4>
            <p className="text-sm text-gray-600 mb-4">{todayTask.category}</p>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm font-medium text-primary-600">{todayTask.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${todayTask.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <span>{todayTask.timeLeft}</span>
              </div>

              <div className="flex -space-x-1">
                {todayTask.assignedUsers.map((user, index) => (
                  <img
                    key={index}
                    src={user.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"}
                    alt={user.name}
                    className="w-6 h-6 rounded-full border-2 border-white"
                  />
                ))}
              </div>
            </div>

            <button className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
              Go To Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
