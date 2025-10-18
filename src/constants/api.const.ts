export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  USERS: '/users',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  PRODUCTS: '/products',
} as const

export const API_TIMEOUT = 10000

export const API_HEADERS = {
  'Content-Type': 'application/json',
} as const

