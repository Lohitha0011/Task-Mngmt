import { NavLink } from "react-router-dom"
import { LayoutDashboard, CheckSquare, Users, MessageCircle, Settings, HelpCircle, LogOut } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import Logo from "./Logo"

const Sidebar = () => {
  const { logout } = useAuth()

  const navItems = [
    { path: "/", icon: LayoutDashboard, label: "Overview" },
    { path: "/tasks", icon: CheckSquare, label: "Task" },
    { path: "/mentors", icon: Users, label: "Mentors" },
    { path: "/messages", icon: MessageCircle, label: "Message" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Logo size="sm" />
          <span className="text-xl font-bold text-gray-900">DNX</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700 border-r-2 border-primary-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Help Center Card */}
      <div className="p-4">
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <HelpCircle className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white font-semibold text-sm mb-1">Help Center</h3>
          <p className="text-gray-300 text-xs mb-3">
            Having Trouble in Learning. Please contact us for more questions.
          </p>
          <button className="w-full bg-white text-gray-900 text-xs font-medium py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors">
            Go To Help Center
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
