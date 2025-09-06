import express from "express"
import User from "../models/User.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// @desc    Get all mentors
// @route   GET /api/users/mentors
// @access  Private
router.get("/mentors", protect, async (req, res) => {
  try {
    const { search, sort = "rating", page = 1, limit = 10 } = req.query

    const query = { role: "mentor", isActive: true }

    // Search functionality
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { skills: { $in: [new RegExp(search, "i")] } }]
    }

    // Sort options
    let sortOption = {}
    switch (sort) {
      case "rating":
        sortOption = { rating: -1, reviewCount: -1 }
        break
      case "tasks":
        sortOption = { tasksCompleted: -1 }
        break
      case "popular":
        sortOption = { "followers.length": -1 }
        break
      default:
        sortOption = { createdAt: -1 }
    }

    const mentors = await User.find(query)
      .select("-password -email")
      .populate("followers", "name")
      .sort(sortOption)
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await User.countDocuments(query)

    res.json({
      success: true,
      mentors,
      pagination: {
        page: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    })
  } catch (error) {
    console.error("Get mentors error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @desc    Follow/Unfollow user
// @route   POST /api/users/:id/follow
// @access  Private
router.post("/:id/follow", protect, async (req, res) => {
  try {
    const userToFollow = await User.findById(req.params.id)
    const currentUser = await User.findById(req.user.id)

    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if (userToFollow._id.toString() === currentUser._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      })
    }

    const isFollowing = currentUser.following.includes(userToFollow._id)

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter((id) => id.toString() !== userToFollow._id.toString())
      userToFollow.followers = userToFollow.followers.filter((id) => id.toString() !== currentUser._id.toString())
    } else {
      // Follow
      currentUser.following.push(userToFollow._id)
      userToFollow.followers.push(currentUser._id)
    }

    await currentUser.save()
    await userToFollow.save()

    res.json({
      success: true,
      message: isFollowing ? "Unfollowed successfully" : "Followed successfully",
      isFollowing: !isFollowing,
    })
  } catch (error) {
    console.error("Follow/Unfollow error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

// @desc    Get user profile
// @route   GET /api/users/:id
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password -email")
      .populate("followers", "name avatar")
      .populate("following", "name avatar")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("Get user profile error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

export default router
