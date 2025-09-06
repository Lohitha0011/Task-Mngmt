import express from "express"
import Category from "../models/Category.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

// @desc    Get all categories
// @route   GET /api/categories
// @access  Private
router.get("/", protect, async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1, name: 1 })

    res.json({
      success: true,
      categories,
    })
  } catch (error) {
    console.error("Get categories error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
})

export default router
