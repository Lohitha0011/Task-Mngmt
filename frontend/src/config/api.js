// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://task-mngmt-2.onrender.com'
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'https://task-mngmt-2.onrender.com'

export { API_BASE_URL, SOCKET_URL }

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  },
  USERS: {
    PROFILE: `${API_BASE_URL}/api/users/profile`,
    UPDATE: `${API_BASE_URL}/api/users/update`,
  },
  TASKS: {
    LIST: `${API_BASE_URL}/api/tasks`,
    CREATE: `${API_BASE_URL}/api/tasks`,
    UPDATE: (id) => `${API_BASE_URL}/api/tasks/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/tasks/${id}`,
  },
  CATEGORIES: {
    LIST: `${API_BASE_URL}/api/categories`,
    CREATE: `${API_BASE_URL}/api/categories`,
  },
  MESSAGES: {
    CONVERSATIONS: `${API_BASE_URL}/api/messages/conversations`,
    MESSAGES: (conversationId) => `${API_BASE_URL}/api/messages/${conversationId}`,
  },
  HEALTH: `${API_BASE_URL}/api/health`,
}
