import { useThemeStore } from '@/store/themeStore'
import { ThemeMode } from '@/types'

export function useTheme() {
  const { theme, setTheme } = useThemeStore()

  const toggleTheme = () => {
    const newTheme = theme === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT
    setTheme(newTheme)
  }

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === ThemeMode.DARK,
    isLight: theme === ThemeMode.LIGHT,
    isSystem: theme === ThemeMode.SYSTEM,
  }
}

