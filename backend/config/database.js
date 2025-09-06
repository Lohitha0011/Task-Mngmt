import mongoose from "mongoose"

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
    })

    console.log("MongoDB Atlas Connected:", conn.connection.host)
    console.log("Database Name:", conn.connection.name)
  } catch (error) {
    console.error("MongoDB Atlas connection error:", error.message)
    process.exit(1)
  }
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to MongoDB Atlas")
})

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err)
})

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB Atlas")
})

process.on("SIGINT", async () => {
  await mongoose.connection.close()
  console.log("MongoDB Atlas connection closed through app termination")
  process.exit(0)
})

export default connectDB
