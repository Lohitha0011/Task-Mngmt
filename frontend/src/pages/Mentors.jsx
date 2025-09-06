"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Users, TrendingUp } from "lucide-react"
import SearchBar from "../components/SearchBar"
import FilterDropdown from "../components/FilterDropdown"
import MentorCard from "../components/MentorCard"
import MentorProfileCard from "../components/MentorProfileCard"

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("popular")
  const [followingStatus, setFollowingStatus] = useState({})

  // Mock data - in real app, this would come from API
  const [categories] = useState([
    { value: "ui-ux", label: "UI/UX Design" },
    { value: "web-dev", label: "Web Development" },
    { value: "mobile", label: "Mobile Development" },
    { value: "3d-design", label: "3D Design" },
    { value: "android", label: "Android Development" },
    { value: "ios", label: "iOS Development" },
  ])

  const [sortOptions] = useState([
    { value: "popular", label: "Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "tasks", label: "Most Tasks" },
    { value: "newest", label: "Newest" },
  ])

  const [recentMentors] = useState([
    {
      _id: "1",
      name: "Jessica Jane",
      role: "Web Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      tasksCompleted: 40,
      rating: 4.7,
      reviewCount: 750,
      isFollowing: false,
    },
    {
      _id: "2",
      name: "Abraham Lincoln",
      role: "3D Design",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      tasksCompleted: 32,
      rating: 4.9,
      reviewCount: 510,
      isFollowing: true,
    },
    {
      _id: "3",
      name: "Curious George",
      role: "UI/UX Design",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      tasksCompleted: 40,
      rating: 4.7,
      reviewCount: 750,
      isFollowing: false,
    },
    {
      _id: "4",
      name: "Sarah Wilson",
      role: "Mobile Developer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      tasksCompleted: 28,
      rating: 4.8,
      reviewCount: 420,
      isFollowing: false,
    },
  ])

  const [allMentors] = useState([
    {
      _id: "5",
      name: "Jessica Jane",
      role: "Web Developer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      bio: "Hi, I'm Jessica Jane. I am a doctoral student at Harvard University majoring in Web Development with 5+ years of experience.",
      skills: ["React", "Node.js", "JavaScript", "TypeScript", "MongoDB"],
      location: "Boston, MA",
      tasksCompleted: 40,
      rating: 4.7,
      reviewCount: 750,
      isFollowing: false,
    },
    {
      _id: "6",
      name: "Alex Stanton",
      role: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
      bio: "Hi, I'm Alex Stanton. I am a doctoral student at Oxford University majoring in UI/UX Design.",
      skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"],
      location: "Oxford, UK",
      tasksCompleted: 60,
      rating: 4.9,
      reviewCount: 970,
      isFollowing: false,
    },
    {
      _id: "7",
      name: "Antoine Griezmann",
      role: "Android Developer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      bio: "Hi, I'm Antoine Griezmann. I'm an Android Developer at Google company with expertise in mobile app development.",
      skills: ["Kotlin", "Java", "Android SDK", "Firebase"],
      location: "Mountain View, CA",
      tasksCompleted: 50,
      rating: 4.8,
      reviewCount: 830,
      isFollowing: false,
    },
    {
      _id: "8",
      name: "Anna White",
      role: "3D Designer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      bio: "Hi, I'm Anna White. I'm a professional 3D Designer at Blender company specializing in architectural visualization.",
      skills: ["Blender", "3ds Max", "Maya", "Cinema 4D"],
      location: "Amsterdam, NL",
      tasksCompleted: 60,
      rating: 4.8,
      reviewCount: 870,
      isFollowing: true,
    },
    {
      _id: "9",
      name: "Richard Kyle",
      role: "2D Designer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Hi, I'm Richard Kyle. I'm a professional 2D Designer at Photoshop company with focus on digital illustration.",
      skills: ["Photoshop", "Illustrator", "InDesign", "After Effects"],
      location: "San Jose, CA",
      tasksCompleted: 60,
      rating: 4.7,
      reviewCount: 730,
      isFollowing: false,
    },
    {
      _id: "10",
      name: "Julia Philips",
      role: "iOS Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      bio: "Hi, I'm Julia Philips. I'm a senior manager at Apple company specializing in iOS app development.",
      skills: ["Swift", "Objective-C", "Xcode", "Core Data"],
      location: "Cupertino, CA",
      tasksCompleted: 60,
      rating: 4.9,
      reviewCount: 910,
      isFollowing: false,
    },
  ])

  const handleFollowToggle = (mentorId) => {
    setFollowingStatus((prev) => ({
      ...prev,
      [mentorId]: !prev[mentorId],
    }))
    // In real app, this would make API call
    console.log("Toggle follow for mentor:", mentorId)
  }

  const filteredMentors = allMentors.filter((mentor) => {
    const matchesSearch =
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (mentor.skills && mentor.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())))

    const matchesCategory = !selectedCategory || mentor.role.toLowerCase().includes(selectedCategory.replace("-", " "))

    return matchesSearch && matchesCategory
  })

  // Sort mentors
  const sortedMentors = [...filteredMentors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "tasks":
        return b.tasksCompleted - a.tasksCompleted
      case "popular":
        return b.reviewCount - a.reviewCount
      default:
        return 0
    }
  })

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Explore Mentors</h1>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search Mentors" />
          </div>

          <div className="flex gap-3">
            <FilterDropdown
              label="Category"
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              icon={Users}
            />

            <FilterDropdown
              label="Sort By"
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              icon={TrendingUp}
            />
          </div>
        </div>
      </div>

      {/* Recent Mentors */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Mentors</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {recentMentors.map((mentor) => (
            <MentorCard
              key={mentor._id}
              mentor={mentor}
              isFollowing={followingStatus[mentor._id] ?? mentor.isFollowing}
              onFollowToggle={handleFollowToggle}
            />
          ))}
        </div>
      </div>

      {/* All Mentors */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Mentors</h2>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMentors.map((mentor) => (
            <MentorProfileCard
              key={mentor._id}
              mentor={mentor}
              isFollowing={followingStatus[mentor._id] ?? mentor.isFollowing}
              onFollowToggle={handleFollowToggle}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedMentors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Users className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No mentors found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mentors
