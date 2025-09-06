import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

const Settings = () => {
  const { user, updatePreferences } = useAuth()

  const [language, setLanguage] = useState(user?.preferences?.language || "English")
  const [timezone, setTimezone] = useState(user?.preferences?.timezone || "GMT")
  const [timeFormat, setTimeFormat] = useState(user?.preferences?.timeFormat || "24Hours")

  const handleSave = async () => {
    await updatePreferences({
      language,
      timezone,
      timeFormat,
    })
    alert("Settings saved successfully!")
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-blue-100 rounded-lg mr-4 flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
          <label className="block font-semibold">Language</label>
        </div>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="English">English (Default)</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="German">German</option>
          {/* Add more languages as needed */}
        </select>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <label className="block font-semibold">Timezone</label>
        </div>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
        >
          <option value="GMT">GMT (Default)</option>
          <option value="EST">EST</option>
          <option value="PST">PST</option>
          <option value="CST">CST</option>
          {/* Add more timezones as needed */}
        </select>
      </div>

      <div className="mb-6">
        <div className="flex items-center mb-2">
          <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <label className="block font-semibold">Time Format</label>
        </div>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="timeFormat"
              value="24Hours"
              checked={timeFormat === "24Hours"}
              onChange={() => setTimeFormat("24Hours")}
              className="form-radio"
            />
            <span className="ml-2">24 Hours</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="timeFormat"
              value="12Hours"
              checked={timeFormat === "12Hours"}
              onChange={() => setTimeFormat("12Hours")}
              className="form-radio"
            />
            <span className="ml-2">12 Hours</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Save Changes
      </button>
    </div>
  )
}

export default Settings
