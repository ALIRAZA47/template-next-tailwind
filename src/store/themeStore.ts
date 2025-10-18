import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ThemeMode } from '@/types'
import { LOCAL_STORAGE_KEYS } from '@/constants/app.const'

interface ThemeStore {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: ThemeMode.SYSTEM,
      setTheme: (theme) => {
        set({ theme })
        
        // Apply theme to document
        const root = document.documentElement
        const isDark = theme === ThemeMode.DARK || 
          (theme === ThemeMode.SYSTEM && window.matchMedia('(prefers-color-scheme: dark)').matches)
        
        root.classList.toggle('dark', isDark)
      },
    }),
    {
      name: LOCAL_STORAGE_KEYS.THEME,
    }
  )
)

