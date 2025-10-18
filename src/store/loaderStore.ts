import { create } from 'zustand'

interface LoaderStore {
  isLoading: boolean
  loadingCount: number
  message: string
  startLoading: (message?: string) => void
  stopLoading: () => void
  setMessage: (message: string) => void
}

export const useLoaderStore = create<LoaderStore>((set) => ({
  isLoading: false,
  loadingCount: 0,
  message: '',
  startLoading: (message = '') =>
    set((state) => ({
      loadingCount: state.loadingCount + 1,
      isLoading: true,
      message,
    })),
  stopLoading: () =>
    set((state) => {
      const newCount = Math.max(0, state.loadingCount - 1)
      return {
        loadingCount: newCount,
        isLoading: newCount > 0,
        message: newCount === 0 ? '' : state.message,
      }
    }),
  setMessage: (message) => set({ message }),
}))

