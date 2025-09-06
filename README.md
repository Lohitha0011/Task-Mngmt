# DNX Dashboard - Task Management & Community Platform

A full-stack task management and community dashboard built with React + Vite frontend and Node.js + Express backend.

## Tech Stack

### Frontend
- React 18 with Vite
- JavaScript (JSX)
- Tailwind CSS
- React Router DOM
- Recharts for data visualization
- Lucide React for icons

### Backend
- Node.js with Express.js
- MongoDB Atlas
- Socket.io for real-time messaging
- JWT authentication
- Bcrypt for password hashing

## Project Structure

\`\`\`
/
├── frontend/          # React Vite application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── ...
│   └── package.json
├── backend/           # Express.js API
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── server.js
└── README.md
\`\`\`

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Git

### Frontend Setup
1. Navigate to frontend directory:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The frontend will run on `http://localhost:3000`

### Backend Setup
1. Navigate to backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create environment file:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. Update `.env` with your MongoDB Atlas connection string and JWT secret

5. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

The backend will run on `http://localhost:5000`

## Features

### Current (Foundation)
- ✅ Project structure setup
- ✅ React + Vite frontend with routing
- ✅ Responsive sidebar navigation
- ✅ Express.js backend with Socket.io
- ✅ Basic page layouts

### Upcoming
- 🔄 JWT Authentication system
- 🔄 MongoDB models and database integration
- 🔄 Dashboard with charts and widgets
- 🔄 Task management system
- 🔄 Mentors system with follow/unfollow
- 🔄 Real-time messaging
- 🔄 Settings management
- 🔄 Dark/Light mode toggle

## Development

### Frontend Development
- Uses Vite for fast development and building
- Tailwind CSS for styling
- React Router for navigation
- Component-based architecture

### Backend Development
- Express.js REST API
- MongoDB with Mongoose ODM
- JWT for authentication
- Socket.io for real-time features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

