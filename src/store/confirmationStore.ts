import { create } from 'zustand'

interface ConfirmationOptions {
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  variant?: 'default' | 'destructive'
  onConfirm: () => void | Promise<void>
  onCancel?: () => void
}

interface ConfirmationStore {
  isOpen: boolean
  options: ConfirmationOptions | null
  confirm: (options: ConfirmationOptions) => void
  close: () => void
  handleConfirm: () => Promise<void>
  handleCancel: () => void
}

export const useConfirmationStore = create<ConfirmationStore>((set, get) => ({
  isOpen: false,
  options: null,
  confirm: (options) => set({ isOpen: true, options }),
  close: () => set({ isOpen: false, options: null }),
  handleConfirm: async () => {
    const { options } = get()
    if (options?.onConfirm) {
      await options.onConfirm()
    }
    get().close()
  },
  handleCancel: () => {
    const { options } = get()
    if (options?.onCancel) {
      options.onCancel()
    }
    get().close()
  },
}))

