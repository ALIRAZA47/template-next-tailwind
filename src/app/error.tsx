'use client'

import { useEffect } from 'react'
import ErrorIllustration from '@/assets/illustrations/something-went-wrong-illus.svg'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-lg mx-auto text-center space-y-8">
        <div className="w-full max-w-md mx-auto">
          <img 
            src={ErrorIllustration.src} 
            alt="Error occurred" 
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>
        
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Oops! Something went wrong
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
            An unexpected error occurred. Don't worry, we're on it!
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm font-mono text-left break-all text-red-800 dark:text-red-200">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 max-w-xs mx-auto">
          <button
            onClick={() => (window.location.href = '/')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
          >
            Go to Home
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

