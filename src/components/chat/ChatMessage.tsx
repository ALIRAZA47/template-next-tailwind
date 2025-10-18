'use client'

import { useState, useRef } from 'react'
import { MoreVertical, Pin, Download, Smile, Reply, X } from 'lucide-react'
import { Message } from '@/types/chat.types'
import { Avatar } from '@/components/ui/Avatar'
import { MessageReactions } from './MessageReactions'
import { EmojiPicker } from '@/components/common/EmojiPicker'
import { cn } from '@/utils/cn'

interface ChatMessageProps {
  message: Message
  isOwnMessage: boolean
  currentUserId: string
  onAddReaction: (messageId: string, emoji: string) => void
  onPin: (messageId: string) => void
  onReply: (message: Message) => void
  showSender?: boolean
}

export function ChatMessage({
  message,
  isOwnMessage,
  currentUserId,
  onAddReaction,
  onPin,
  onReply,
  showSender = true,
}: ChatMessageProps) {
  const [showActions, setShowActions] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const emojiButtonRef = useRef<HTMLButtonElement>(null)
  const messageRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchStartY = useRef<number>(0)

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  // Double-click handler
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
    setShowContextMenu(true)
  }

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    setIsSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwiping) return

    const touchX = e.touches[0].clientX
    const touchY = e.touches[0].clientY
    const deltaX = touchX - touchStartX.current
    const deltaY = touchY - touchStartY.current

    // Only track horizontal swipe if it's more horizontal than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault()
      // Limit swipe to reasonable distance
      const maxSwipe = 80
      const clampedDelta = Math.max(-maxSwipe, Math.min(maxSwipe, deltaX))
      setSwipeOffset(clampedDelta)
    }
  }

  const handleTouchEnd = () => {
    setIsSwiping(false)
    
    // If swiped enough (> 50px), trigger reply
    if (Math.abs(swipeOffset) > 50) {
      onReply(message)
    }
    
    // Reset swipe
    setSwipeOffset(0)
  }

  // Close context menu when clicking outside
  const handleClickOutside = () => {
    setShowContextMenu(false)
  }

  return (
    <div
      ref={messageRef}
      className={cn(
        'group relative flex gap-3 px-4 py-2 hover:bg-muted/20 transition-colors',
        isOwnMessage ? 'flex-row-reverse' : 'flex-row',
        isSwiping && 'select-none'
      )}
      style={{
        transform: `translateX(${swipeOffset}px)`,
        transition: isSwiping ? 'none' : 'transform 0.3s ease-out',
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Avatar */}
      {showSender && !isOwnMessage && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          {message.sender.avatar ? (
            <img
              src={message.sender.avatar}
              alt={message.sender.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-sm">
              {message.sender.name.charAt(0)}
            </div>
          )}
        </Avatar>
      )}

      {/* Message Content */}
      <div className={cn(
        'flex flex-col gap-1 max-w-[70%]',
        isOwnMessage ? 'items-end' : 'items-start',
        !showSender && !isOwnMessage && 'ml-11'
      )}>
        {showSender && !isOwnMessage && (
          <div className="flex items-center gap-2 px-1">
            <span className="font-medium text-sm">{message.sender.name}</span>
            {message.isPinned && (
              <Pin className="h-3 w-3 text-primary" />
            )}
          </div>
        )}

        <div
          className={cn(
            'rounded-2xl px-4 py-2 shadow-sm',
            isOwnMessage
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-muted rounded-bl-sm'
          )}
        >
          {/* Reply Preview */}
          {message.replyTo && (
            <div className={cn(
              'mb-2 pb-2 border-l-2 pl-2 border-opacity-50',
              isOwnMessage ? 'border-primary-foreground' : 'border-primary'
            )}>
              <p className="text-xs font-medium opacity-80">
                {message.replyTo.sender.name}
              </p>
              <p className="text-xs opacity-70 truncate">
                {message.replyTo.content}
              </p>
            </div>
          )}

          <p className="text-sm whitespace-pre-wrap break-words">
            {message.content}
          </p>

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.attachments.map((file) => (
                <div
                  key={file.id}
                  className={cn(
                    'flex items-center gap-2 rounded-lg p-2 border',
                    isOwnMessage
                      ? 'bg-primary-foreground/10 border-primary-foreground/20'
                      : 'bg-background border-border'
                  )}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs opacity-70">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    className="flex-shrink-0 p-1 hover:bg-background/20 rounded"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Time and Status */}
        <div className={cn(
          'flex items-center gap-1 px-1',
          isOwnMessage && 'flex-row-reverse'
        )}>
          <span className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
          {message.isPinned && isOwnMessage && (
            <Pin className="h-3 w-3 text-muted-foreground" />
          )}
        </div>

        {/* Reactions - Always present but opacity-hidden when no reactions */}
        <div className={cn(
          'transition-opacity',
          isOwnMessage && 'self-end',
          (!message.reactions || message.reactions.length === 0) && !showActions && 'opacity-0'
        )}>
          <MessageReactions
            reactions={message.reactions}
            onAddReaction={(emoji) => onAddReaction(message.id, emoji)}
            onReply={() => onReply(message)}
            currentUserId={currentUserId}
          />
        </div>
      </div>

      {/* Actions - Positioned absolutely near message bubble to avoid layout shift */}
      <div className={cn(
        'absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none',
        isOwnMessage ? 'left-0 -translate-x-full pl-2' : 'right-0 translate-x-full pr-2'
      )}>
        <div className="flex gap-0.5 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg p-0.5 pointer-events-auto">
          <button
            ref={emojiButtonRef}
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1.5 hover:bg-muted rounded transition-colors"
            title="Add reaction"
          >
            <Smile className="h-4 w-4" />
          </button>
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelect={(emoji: any) => {
                onAddReaction(message.id, emoji.native)
                setShowEmojiPicker(false)
              }}
              onClickOutside={() => setShowEmojiPicker(false)}
              triggerRef={emojiButtonRef}
            />
          )}
          <button
            onClick={() => onReply(message)}
            className="p-1.5 hover:bg-muted rounded transition-colors"
            title="Reply"
          >
            <Reply className="h-4 w-4" />
          </button>
          <button
            onClick={() => onPin(message.id)}
            className="p-1.5 hover:bg-muted rounded transition-colors"
            title="Pin message"
          >
            <Pin className="h-4 w-4" />
          </button>
          <button
            className="p-1.5 hover:bg-muted rounded transition-colors"
            title="More actions"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Swipe Reply Indicator */}
      {Math.abs(swipeOffset) > 20 && (
        <div className={cn(
          'absolute top-1/2 -translate-y-1/2 opacity-70',
          swipeOffset > 0 ? 'left-4' : 'right-4'
        )}>
          <Reply className="h-5 w-5 text-primary" />
        </div>
      )}

      {/* Context Menu (Double-click) */}
      {showContextMenu && (
        <>
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={handleClickOutside}
          />
          <div
            style={{
              position: 'fixed',
              top: `${contextMenuPosition.y}px`,
              left: `${contextMenuPosition.x}px`,
              zIndex: 9999,
            }}
            className="bg-background border rounded-lg shadow-lg p-1 min-w-[180px] animate-in fade-in zoom-in-95 duration-150"
          >
            <button
              onClick={() => {
                onReply(message)
                setShowContextMenu(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
            >
              <Reply className="h-4 w-4" />
              Reply
            </button>
            <button
              onClick={() => {
                onPin(message.id)
                setShowContextMenu(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
            >
              <Pin className="h-4 w-4" />
              {message.isPinned ? 'Unpin' : 'Pin'} Message
            </button>
            <button
              onClick={() => {
                navigator.clipboard.writeText(message.content)
                setShowContextMenu(false)
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded transition-colors"
            >
              <Download className="h-4 w-4" />
              Copy Text
            </button>
            <button
              onClick={() => setShowContextMenu(false)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded transition-colors text-muted-foreground"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>
        </>
      )}
    </div>
  )
}

