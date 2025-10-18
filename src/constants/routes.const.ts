export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const

export type RouteKey = keyof typeof ROUTES
export type RouteValue = typeof ROUTES[RouteKey]

