export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  USERS: '/users',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
} as const

export const API_TIMEOUT = 10000

export const API_HEADERS = {
  'Content-Type': 'application/json',
} as const

