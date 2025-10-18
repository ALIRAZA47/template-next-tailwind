import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarStore {
  isCollapsed: boolean
  width: number
  toggleCollapse: () => void
  setCollapsed: (collapsed: boolean) => void
  setWidth: (width: number) => void
}

const MIN_WIDTH = 200
const MAX_WIDTH = 400
const DEFAULT_WIDTH = 256 // 64 * 4 = w-64

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isCollapsed: false,
      width: DEFAULT_WIDTH,
      toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      setWidth: (width) => 
        set({ width: Math.min(Math.max(width, MIN_WIDTH), MAX_WIDTH) }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
)

export { MIN_WIDTH, MAX_WIDTH, DEFAULT_WIDTH }

