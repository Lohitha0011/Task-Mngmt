import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
    color: {
      type: String,
      default: "#3b82f6",
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Please enter a valid hex color"],
    },
    icon: {
      type: String,
      default: "folder",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    taskCount: {
      type: Number,
      default: 0,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Update task count when tasks are added/removed
categorySchema.methods.updateTaskCount = async function () {
  const Task = mongoose.model("Task")
  this.taskCount = await Task.countDocuments({ category: this._id, isActive: true })
  return this.save()
}

export default mongoose.model("Category", categorySchema)
