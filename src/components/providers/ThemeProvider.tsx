'use client'

import { useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { ThemeMode } from '@/types'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()

  useEffect(() => {
    const root = document.documentElement
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark')

    // Determine the actual theme
    let actualTheme = theme
    if (theme === ThemeMode.SYSTEM) {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? ThemeMode.DARK 
        : ThemeMode.LIGHT
    }

    // Apply theme
    root.classList.add(actualTheme)

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === ThemeMode.SYSTEM) {
        root.classList.remove('light', 'dark')
        root.classList.add(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  return <>{children}</>
}

