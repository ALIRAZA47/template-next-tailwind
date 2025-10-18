export const APP_NAME = import.meta.env.VITE_APP_NAME || 'React Shadcn Template'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'A production-ready React template with Shadcn UI'

export const ITEMS_PER_PAGE = 10
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const LOCAL_STORAGE_KEYS = {
  THEME: 'app-theme',
  AUTH_TOKEN: 'auth-token',
  USER: 'app-user',
} as const

