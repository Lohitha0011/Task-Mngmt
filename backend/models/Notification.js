import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: [
        "task_assigned",
        "task_completed",
        "task_overdue",
        "message_received",
        "follow_request",
        "new_follower",
        "review_received",
        "mention",
        "system",
      ],
      required: true,
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      maxlength: [300, "Message cannot exceed 300 characters"],
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: Date,
    actionUrl: String,
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
notificationSchema.index({ recipient: 1, createdAt: -1 })
notificationSchema.index({ recipient: 1, isRead: 1 })

export default mongoose.model("Notification", notificationSchema)
