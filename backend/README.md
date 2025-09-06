# DNX Dashboard Backend

A Node.js + Express.js backend API for the DNX Task Management Dashboard with MongoDB Atlas integration.

## Features

- JWT Authentication
- User Management
- Task Management with Categories
- Real-time Messaging with Socket.io
- Mentor System with Reviews
- MongoDB Atlas Database

## Setup Instructions

### 1. Install Dependencies
\`\`\`bash
cd backend
npm install
\`\`\`

### 2. Environment Variables
Copy `.env.example` to `.env` and update the values:

\`\`\`bash
cp .env.example .env
\`\`\`

### 3. MongoDB Atlas Setup
1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string from Atlas
5. Replace the `MONGODB_URI` in your `.env` file with your actual connection string

**Example MongoDB Atlas Connection String:**
\`\`\`
mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/dnx-dashboard?retryWrites=true&w=majority
\`\`\`

### 4. JWT Secret
Generate a secure JWT secret (at least 32 characters):
\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

### 5. Start the Server
\`\`\`bash
# Development mode
npm run dev

# Production mode
npm start
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/follow/:id` - Follow/unfollow user

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create new category

### Messages
- `GET /api/messages/conversations` - Get user conversations
- `GET /api/messages/:conversationId` - Get conversation messages
- `POST /api/messages` - Send new message

## Database Models

- **User** - User accounts with authentication
- **Task** - Tasks with progress tracking
- **Category** - Task categories
- **Message** - Chat messages
- **Conversation** - Chat conversations
- **Review** - Mentor reviews and ratings
- **Notification** - User notifications

## Socket.io Events

### Client to Server
- `join_conversation` - Join a conversation room
- `leave_conversation` - Leave a conversation room
- `send_message` - Send a message
- `typing_start` - Start typing indicator
- `typing_stop` - Stop typing indicator

### Server to Client
- `new_message` - Receive new message
- `user_typing` - User is typing
- `user_stop_typing` - User stopped typing
- `message_error` - Message sending error

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_EXPIRE` | JWT expiration time | `30d` |
| `NODE_ENV` | Environment mode | `development` |

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong JWT secret
3. Configure MongoDB Atlas IP whitelist
4. Set up proper CORS origins
5. Use environment variables for all sensitive data
