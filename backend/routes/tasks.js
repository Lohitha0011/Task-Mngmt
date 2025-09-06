import express from "express"
import Task from "../models/Task.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// @desc    Get all tasks with filters
// @route   GET /api/tasks
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const { search, category, difficulty, status, sort = "deadline", page = 1, limit = 12 } = req.query

    const query = { isActive: true }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // Filter by category
    if (category) {
      query.category = category
    }

    // Filter by difficulty
    if (difficulty) {
      query.difficulty = difficulty
    }

    // Filter by user's assignment status
    if (status) {
      query["assignedUsers.user"] = req.user.id
      query["assignedUsers.status"] = status
    }

    // Sort options
    let sortOption = {}
    switch (sort) {
      case "deadline":
        sortOption = { deadline: 1 }
        break
      case "newest":
        sortOption = { createdAt: -1 }
        break
      case "popular":
        sortOption = { totalAssignments: -1 }
        break
      case "difficulty":
        sortOption = { difficulty: 1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }

    const tasks = await Task.find(query)
      .populate("category", "name color")
      .populate("creator", "name avatar")
      .populate("assignedUsers.user", "name avatar")
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Task.countDocuments(query)

    res.json({
      success: true,
      tasks,
      pagination: {
        page: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    })
  } catch (error) {
    console.error("Get tasks error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @desc    Get user's assigned tasks
// @route   GET /api/tasks/my-tasks
// @access  Private
router.get("/my-tasks", protect, async (req, res) => {
  try {
    const { status, limit = 10 } = req.query

    const query = {
      "assignedUsers.user": req.user.id,
      isActive: true,
    }

    if (status) {
      query["assignedUsers.status"] = status
    }

    const tasks = await Task.find(query)
      .populate("category", "name color")
      .populate("creator", "name avatar")
      .sort({ "assignedUsers.assignedAt": -1 })
      .limit(limit * 1)

    // Transform to include user's specific assignment data
    const userTasks = tasks.map((task) => {
      const userAssignment = task.assignedUsers.find((assignment) => assignment.user._id.toString() === req.user.id)

      return {
        ...task.toObject(),
        userAssignment,
      }
    })

    res.json({
      success: true,
      tasks: userTasks,
    })
  } catch (error) {
    console.error("Get user tasks error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate("category", "name color")
      .populate("creator", "name avatar role")
      .populate("assignedUsers.user", "name avatar")

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      })
    }

    // Check if user is assigned to this task
    const userAssignment = task.assignedUsers.find((assignment) => assignment.user._id.toString() === req.user.id)

    res.json({
      success: true,
      task: {
        ...task.toObject(),
        userAssignment,
      },
    })
  } catch (error) {
    console.error("Get task error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

export default router
