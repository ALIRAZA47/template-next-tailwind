export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  ANALYTICS: '/analytics',
  CHAT: '/chat',
  PROFILE: '/profile',
  COMPONENTS: '/components',
} as const

export type RouteKey = keyof typeof ROUTES
export type RouteValue = typeof ROUTES[RouteKey]

