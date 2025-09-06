import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const ActivityChart = () => {
  const data = [
    { day: "M", tasks: 1 },
    { day: "T", tasks: 2 },
    { day: "W", tasks: 1.5 },
    { day: "T", tasks: 2.5 },
    { day: "F", tasks: 2 },
    { day: "S", tasks: 1.8 },
    { day: "S", tasks: 2.2 },
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Activity</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">This Week</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
            <span className="text-xs text-gray-600">2 Task</span>
          </div>
        </div>
      </div>

      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
            <YAxis hide />
            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ActivityChart
