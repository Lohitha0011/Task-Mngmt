"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Tag, Calendar } from "lucide-react"
import SearchBar from "../components/SearchBar"
import FilterDropdown from "../components/FilterDropdown"
import TaskCard from "../components/TaskCard"

const Tasks = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("deadline")
  const [currentSection, setCurrentSection] = useState(0)

  // Mock data - in real app, this would come from API
  const [categories] = useState([
    { value: "ui-ux", label: "UI/UX Design" },
    { value: "web-dev", label: "Web Development" },
    { value: "mobile", label: "Mobile Development" },
    { value: "design", label: "Design" },
  ])

  const [sortOptions] = useState([
    { value: "deadline", label: "Deadline" },
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Popular" },
    { value: "difficulty", label: "Difficulty" },
  ])

  const [timeLimitTasks] = useState([
    {
      id: 1,
      title: "Creating Awesome Mobile Apps",
      category: "UI/UX Design",
      progress: 90,
      deadline: "2024-01-15",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [
        { name: "User 1", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
        { name: "User 2", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
      ],
    },
    {
      id: 2,
      title: "Creating Fresh Website",
      category: "Web Developer",
      progress: 85,
      deadline: "2024-01-18",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [
        { name: "User 3", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face" },
        { name: "User 4", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
      ],
    },
    {
      id: 3,
      title: "Creating Color Palettes",
      category: "UI/UX Design",
      progress: 100,
      deadline: "2024-01-12",
      thumbnail: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [{ name: "User 5", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" }],
    },
    {
      id: 4,
      title: "Awesome Mobile Design",
      category: "Web Developer",
      progress: 65,
      deadline: "2024-01-25",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [
        { name: "User 6", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
        { name: "User 7", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
      ],
    },
  ])

  const [newTasks] = useState([
    {
      id: 5,
      title: "Creating Mobile App Design",
      category: "UI/UX Design",
      progress: 75,
      deadline: "2024-02-01",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [
        { name: "User 8", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
        { name: "User 9", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face" },
      ],
    },
    {
      id: 6,
      title: "Creating Perfect Website",
      category: "Web Developer",
      progress: 85,
      deadline: "2024-02-05",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [{ name: "User 10", avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face" }],
    },
    {
      id: 7,
      title: "Mobile App Design",
      category: "UI/UX Design",
      progress: 65,
      deadline: "2024-02-08",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [
        { name: "User 11", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face" },
        { name: "User 12", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" },
      ],
    },
    {
      id: 8,
      title: "Creating Modern Interface",
      category: "Android Developer",
      progress: 45,
      deadline: "2024-02-12",
      thumbnail: "https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=200&fit=crop&crop=center",
      assignedUsers: [{ name: "User 13", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" }],
    },
  ])

  const sections = [
    { title: "Time Limit", tasks: timeLimitTasks },
    { title: "New Task", tasks: newTasks },
  ]

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`)
  }

  const navigateSection = (direction) => {
    if (direction === "prev" && currentSection > 0) {
      setCurrentSection(currentSection - 1)
    } else if (direction === "next" && currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const filteredTasks = sections[currentSection].tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || task.category.toLowerCase().includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Explore Task</h1>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search Task" />
          </div>

          <div className="flex gap-3">
            <FilterDropdown
              label="Category"
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              icon={Tag}
            />

            <FilterDropdown label="Sort By" options={sortOptions} value={sortBy} onChange={setSortBy} icon={Calendar} />
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">{sections[currentSection].title}</h2>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateSection("prev")}
            disabled={currentSection === 0}
            className={`p-2 rounded-lg ${
              currentSection === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigateSection("next")}
            disabled={currentSection === sections.length - 1}
            className={`p-2 rounded-lg ${
              currentSection === sections.length - 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleTaskClick(task.id)}
            className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">
            <Tag className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default Tasks
