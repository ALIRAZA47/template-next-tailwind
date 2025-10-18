'use client'

import { useState, useRef } from 'react'
import { Smile, Reply } from 'lucide-react'
import { Reaction } from '@/types/chat.types'
import { EmojiPicker } from '@/components/common/EmojiPicker'
import { cn } from '@/utils/cn'

interface MessageReactionsProps {
  reactions?: Reaction[]
  onAddReaction: (emoji: string) => void
  onReply?: () => void
  currentUserId: string
}

export function MessageReactions({
  reactions = [],
  onAddReaction,
  onReply,
  currentUserId,
}: MessageReactionsProps) {
  const [showPicker, setShowPicker] = useState(false)
  const emojiButtonRef = useRef<HTMLButtonElement>(null)

  const handleEmojiSelect = (emoji: any) => {
    onAddReaction(emoji.native)
    setShowPicker(false)
  }

  const handleReactionClick = (emoji: string) => {
    onAddReaction(emoji)
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {reactions.map((reaction, index) => {
        const hasReacted = reaction.users.includes(currentUserId)
        return (
          <button
            key={index}
            onClick={() => handleReactionClick(reaction.emoji)}
            className={cn(
              'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs border transition-colors',
              hasReacted
                ? 'bg-primary/10 border-primary text-primary'
                : 'bg-muted border-border hover:bg-muted/80'
            )}
          >
            <span>{reaction.emoji}</span>
            <span className="font-medium">{reaction.count}</span>
          </button>
        )
      })}

      <div className="relative">
        <button
          ref={emojiButtonRef}
          onClick={() => setShowPicker(!showPicker)}
          className="inline-flex items-center justify-center h-6 w-6 rounded-full hover:bg-muted transition-colors"
          title="Add reaction"
        >
          <Smile className="h-4 w-4 text-muted-foreground" />
        </button>

        {showPicker && (
          <EmojiPicker
            onEmojiSelect={handleEmojiSelect}
            onClickOutside={() => setShowPicker(false)}
            triggerRef={emojiButtonRef}
          />
        )}
      </div>

      {/* Reply Button */}
      {onReply && (
        <button
          onClick={onReply}
          className="inline-flex items-center justify-center h-6 w-6 rounded-full hover:bg-muted transition-colors"
          title="Reply"
        >
          <Reply className="h-4 w-4 text-muted-foreground" />
        </button>
      )}
    </div>
  )
}

