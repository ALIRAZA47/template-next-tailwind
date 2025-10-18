'use client'

import { Pin, X } from 'lucide-react'
import { Message } from '@/types/chat.types'
import { Button } from '@/components/ui/Button'

interface PinnedMessageProps {
  message: Message
  onUnpin: () => void
  onNavigate: () => void
}

export function PinnedMessage({ message, onUnpin, onNavigate }: PinnedMessageProps) {
  return (
    <div className="flex items-center gap-2 bg-primary/5 border-b px-4 py-2">
      <Pin className="h-4 w-4 text-primary flex-shrink-0" />
      <button
        onClick={onNavigate}
        className="flex-1 text-left text-sm truncate hover:underline"
      >
        <span className="font-medium">{message.sender.name}: </span>
        <span className="text-muted-foreground">{message.content}</span>
      </button>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 flex-shrink-0"
        onClick={onUnpin}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}

