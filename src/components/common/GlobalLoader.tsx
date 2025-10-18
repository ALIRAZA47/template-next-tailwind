'use client'

import { useLoaderStore } from '@/store/loaderStore'
import { LoadingSpinner } from './LoadingSpinner'

export function GlobalLoader() {
  const { isLoading, message } = useLoaderStore()

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 flex flex-col items-center space-y-4 min-w-[200px]">
        <LoadingSpinner size="lg" />
        {message && (
          <p className="text-gray-900 dark:text-white text-sm font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

