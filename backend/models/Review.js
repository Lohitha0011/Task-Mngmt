import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema(
  {
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      maxlength: [500, "Review comment cannot exceed 500 characters"],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    helpfulVotes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        isHelpful: {
          type: Boolean,
          required: true,
        },
      },
    ],
    response: {
      content: String,
      respondedAt: Date,
    },
  },
  {
    timestamps: true,
  },
)

// Prevent duplicate reviews for the same task
reviewSchema.index({ reviewer: 1, reviewee: 1, task: 1 }, { unique: true })

// Update reviewee's rating after saving review
reviewSchema.post("save", async function () {
  try {
    const User = mongoose.model("User")
    const reviews = await mongoose.model("Review").find({
      reviewee: this.reviewee,
      isPublic: true,
    })

    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = totalRating / reviews.length

      await User.findByIdAndUpdate(this.reviewee, {
        rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
        reviewCount: reviews.length,
      })
    }
  } catch (error) {
    console.error("Error updating user rating:", error)
  }
})

export default mongoose.model("Review", reviewSchema)
