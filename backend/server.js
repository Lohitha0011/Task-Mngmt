import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/database.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import categoryRoutes from "./routes/categories.js";
import messageRoutes from "./routes/messages.js";

// ---------- Fix dotenv path so it always loads ----------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Look for .env in project root first, fallback to backend/
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Debug log
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing. Check your .env file!");
  process.exit(1);
}

// Connect to database
connectDB();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.FRONTEND_URL] 
      : ["http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.FRONTEND_URL] 
      : ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/messages", messageRoutes);


app.get("/api/health", (req, res) => {
  res.json({ message: "✅ DNX Dashboard API is running!" });
});

io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
    console.log(`✅ ${socket.id} joined ${conversationId}`);
  });

  socket.on("leave_conversation", (conversationId) => {
    socket.leave(conversationId);
    console.log(`🚪 ${socket.id} left ${conversationId}`);
  });

  socket.on("send_message", (data) => {
    try {
      const { conversationId, content, type = "text" } = data;

      const message = {
        _id: `msg_${Date.now()}`,
        content,
        type,
        conversation: conversationId,
        sender: {
          _id: socket.userId || "temp-user",
          name: "User",
          avatar: "/diverse-group-avatars.png",
        },
        createdAt: new Date().toISOString(),
      };

      io.to(conversationId).emit("new_message", message);
    } catch (error) {
      console.error("❌ Send message error:", error.message);
      socket.emit("message_error", { error: "Failed to send message" });
    }
  });

  socket.on("typing_start", (data) => {
    socket.to(data.conversationId).emit("user_typing", {
      userId: socket.userId,
      conversationId: data.conversationId,
    });
  });

  socket.on("typing_stop", (data) => {
    socket.to(data.conversationId).emit("user_stop_typing", {
      userId: socket.userId,
      conversationId: data.conversationId,
    });
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
