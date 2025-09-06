import mongoose from "mongoose"

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    type: {
      type: String,
      enum: ["direct", "group"],
      default: "direct",
    },
    name: {
      type: String,
      trim: true,
      maxlength: [100, "Conversation name cannot exceed 100 characters"],
    },
    avatar: {
      type: String,
      default: "",
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    settings: {
      notifications: {
        type: Boolean,
        default: true,
      },
      archived: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
conversationSchema.index({ participants: 1 })
conversationSchema.index({ lastActivity: -1 })

// Ensure direct conversations have exactly 2 participants
conversationSchema.pre("save", function (next) {
  if (this.type === "direct" && this.participants.length !== 2) {
    return next(new Error("Direct conversations must have exactly 2 participants"))
  }
  next()
})

export default mongoose.model("Conversation", conversationSchema)
