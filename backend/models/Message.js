import mongoose from "mongoose"

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: [true, "Message content is required"],
      maxlength: [2000, "Message cannot exceed 2000 characters"],
    },
    type: {
      type: String,
      enum: ["text", "image", "file", "system"],
      default: "text",
    },
    attachments: [
      {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        url: String,
      },
    ],
    readBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        readAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    editedAt: Date,
    deletedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    replyTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    reactions: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        emoji: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
)

// Index for better query performance
messageSchema.index({ conversation: 1, createdAt: -1 })
messageSchema.index({ sender: 1 })

// Update conversation's last message and activity
messageSchema.post("save", async function () {
  try {
    const Conversation = mongoose.model("Conversation")
    await Conversation.findByIdAndUpdate(this.conversation, {
      lastMessage: this._id,
      lastActivity: this.createdAt,
    })
  } catch (error) {
    console.error("Error updating conversation:", error)
  }
})

export default mongoose.model("Message", messageSchema)
