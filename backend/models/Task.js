import mongoose from "mongoose"

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Task category is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Task thumbnail is required"],
    },
    videoUrl: {
      type: String,
      default: "",
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    estimatedTime: {
      type: Number, // in hours
      required: [true, "Estimated time is required"],
      min: [0.5, "Minimum time is 0.5 hours"],
    },
    deadline: {
      type: Date,
      required: [true, "Task deadline is required"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        assignedAt: {
          type: Date,
          default: Date.now,
        },
        progress: {
          type: Number,
          default: 0,
          min: 0,
          max: 100,
        },
        status: {
          type: String,
          enum: ["assigned", "in-progress", "completed", "overdue"],
          default: "assigned",
        },
        startedAt: Date,
        completedAt: Date,
        timeSpent: {
          type: Number, // in hours
          default: 0,
        },
      },
    ],
    requirements: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    assessments: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["checkbox", "text", "file", "url"],
          default: "checkbox",
        },
        isRequired: {
          type: Boolean,
          default: true,
        },
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    resources: [
      {
        title: String,
        url: String,
        type: {
          type: String,
          enum: ["link", "file", "video", "document"],
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
    totalAssignments: {
      type: Number,
      default: 0,
    },
    completionRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
taskSchema.index({ category: 1, difficulty: 1 })
taskSchema.index({ creator: 1 })
taskSchema.index({ "assignedUsers.user": 1 })
taskSchema.index({ deadline: 1 })

// Calculate completion rate before saving
taskSchema.pre("save", function (next) {
  if (this.assignedUsers.length > 0) {
    const completedTasks = this.assignedUsers.filter((assignment) => assignment.status === "completed").length
    this.completionRate = Math.round((completedTasks / this.assignedUsers.length) * 100)
  }
  this.totalAssignments = this.assignedUsers.length
  next()
})

export default mongoose.model("Task", taskSchema)
