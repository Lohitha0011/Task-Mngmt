import express from "express"
import Message from "../models/Message.js"
import Conversation from "../models/Conversation.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// @desc    Get user's conversations
// @route   GET /api/messages/conversations
// @access  Private
router.get("/conversations", protect, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
      isActive: true,
    })
      .populate("participants", "name avatar isActive lastSeen")
      .populate("lastMessage")
      .sort({ lastActivity: -1 })

    res.json({
      success: true,
      conversations,
    })
  } catch (error) {
    console.error("Get conversations error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @desc    Get messages for a conversation
// @route   GET /api/messages/conversation/:id
// @access  Private
router.get("/conversation/:id", protect, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id)

    if (!conversation || !conversation.participants.includes(req.user.id)) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      })
    }

    const messages = await Message.find({
      conversation: req.params.id,
      isDeleted: false,
    })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 })

    res.json({
      success: true,
      messages,
    })
  } catch (error) {
    console.error("Get messages error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { conversationId, content, type = "text" } = req.body

    const conversation = await Conversation.findById(conversationId)

    if (!conversation || !conversation.participants.includes(req.user.id)) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found",
      })
    }

    const message = await Message.create({
      conversation: conversationId,
      sender: req.user.id,
      content,
      type,
    })

    await message.populate("sender", "name avatar")

    res.status(201).json({
      success: true,
      message,
    })
  } catch (error) {
    console.error("Send message error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

export default router
