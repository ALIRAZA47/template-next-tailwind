import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'
import { LOCAL_STORAGE_KEYS } from '@/constants/app.const'

interface AuthStore {
  user: User | null
  token: string | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  clearAuth: () => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: LOCAL_STORAGE_KEYS.USER,
    }
  )
)

