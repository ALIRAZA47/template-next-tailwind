'use client'

import { useConfirmationStore } from '@/store/confirmationStore'

export function ConfirmationDialog() {
  const { isOpen, options, handleConfirm, handleCancel } =
    useConfirmationStore()

  if (!isOpen || !options) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 space-y-4 animate-[scale-in_0.2s_ease-out]">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {options.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{options.message}</p>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg border border-gray-300 dark:border-gray-600 transition-colors font-medium"
          >
            {options.cancelText || 'Cancel'}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 rounded-lg transition-colors font-medium ${
              options.variant === 'destructive'
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {options.confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  )
}

