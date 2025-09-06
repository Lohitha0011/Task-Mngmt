# 🚀 Deployment Guide - Task Management App

## Backend (Render) Environment Variables Setup

### Step 1: Go to Render Dashboard
1. Visit [https://dashboard.render.com](https://dashboard.render.com)
2. Log in to your account
3. Find your backend service (should be named "task-mngmt-2")

### Step 2: Add Environment Variables
1. Click on your backend service
2. Go to **"Environment"** tab in the left sidebar
3. Click **"Add Environment Variable"** for each variable below:

#### Required Environment Variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement?retryWrites=true&w=majority
```

```
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-at-least-32-characters
```

```
NODE_ENV=production
```

```
FRONTEND_URL=https://task-mngmt-2m14.vercel.app
```

### Step 3: Save and Redeploy
1. Click **"Save Changes"** after adding all variables
2. Go to **"Deployments"** tab
3. Click **"Manual Deploy"** or wait for auto-deploy

## Frontend (Vercel) Environment Variables Setup

### Step 1: Go to Vercel Dashboard
1. Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Log in to your account
3. Find your project (task-mngmt-2m14)

### Step 2: Add Environment Variables
1. Click on your project
2. Go to **"Settings"** tab
3. Click **"Environment Variables"** in the left sidebar
4. Add these variables:

```
VITE_API_URL=https://task-mngmt-2.onrender.com
```

```
VITE_SOCKET_URL=https://task-mngmt-2.onrender.com
```

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment

## Testing the Connection

### Test Backend
```bash
# Test root endpoint
curl https://task-mngmt-2.onrender.com

# Test registration
curl -X POST https://task-mngmt-2.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"123456"}'
```

### Test Frontend
1. Visit: https://task-mngmt-2m14.vercel.app
2. Try to register a new account
3. Check browser console for any errors

## Troubleshooting

### Common Issues:

1. **500 Internal Server Error**: Missing MONGODB_URI
2. **CORS Error**: Frontend URL not added to backend CORS
3. **404 Not Found**: Routes not properly configured
4. **Connection Timeout**: Check if services are running

### Debug Steps:

1. Check Render logs for backend errors
2. Check Vercel logs for frontend errors
3. Verify environment variables are set correctly
4. Test API endpoints individually

## URLs

- **Frontend**: https://task-mngmt-2m14.vercel.app
- **Backend**: https://task-mngmt-2.onrender.com
- **GitHub**: https://github.com/Lohitha0011/Task-Mngmt
