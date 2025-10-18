'use client'

import { useState, useRef } from 'react'
import { Send, Paperclip, Smile, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { EmojiPicker } from '@/components/common/EmojiPicker'
import { Message } from '@/types/chat.types'
import { cn } from '@/utils/cn'

interface ChatInputProps {
  onSendMessage: (content: string, files?: File[]) => void
  replyTo?: Message | null
  onCancelReply?: () => void
  placeholder?: string
}

export function ChatInput({
  onSendMessage,
  replyTo,
  onCancelReply,
  placeholder = 'Type a message...',
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const emojiButtonRef = useRef<HTMLButtonElement>(null)

  const handleSend = () => {
    if (message.trim() || attachedFiles.length > 0) {
      onSendMessage(message.trim(), attachedFiles.length > 0 ? attachedFiles : undefined)
      setMessage('')
      setAttachedFiles([])
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleEmojiSelect = (emoji: any) => {
    setMessage((prev) => prev + emoji.native)
    setShowEmojiPicker(false)
    textareaRef.current?.focus()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    // Auto-resize textarea
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="border-t bg-background">
      {/* Reply Preview */}
      {replyTo && (
        <div className="px-4 pt-3 pb-1 bg-muted/30 border-b">
          <div className="flex items-start gap-2 text-sm">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-xs text-muted-foreground mb-0.5">
                Replying to {replyTo.sender.name}
              </p>
              <p className="text-sm truncate opacity-80">
                {replyTo.content}
              </p>
            </div>
            <button
              onClick={onCancelReply}
              className="flex-shrink-0 p-1 hover:bg-background rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Attached Files */}
      {attachedFiles.length > 0 && (
        <div className="px-4 pt-3 space-y-2">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-muted rounded-lg p-2"
            >
              <Paperclip className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="flex-shrink-0 p-1 hover:bg-background rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-end gap-2 p-4">
        {/* File Attachment */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileSelect}
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          className="flex-shrink-0"
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        {/* Emoji Picker */}
        <div className="relative flex-shrink-0">
          <Button
            ref={emojiButtonRef as any}
            variant="ghost"
            size="icon"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile className="h-5 w-5" />
          </Button>
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiSelect={handleEmojiSelect}
              onClickOutside={() => setShowEmojiPicker(false)}
              triggerRef={emojiButtonRef as any}
            />
          )}
        </div>

        {/* Message Input */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className={cn(
            'flex-1 resize-none bg-muted rounded-lg px-4 py-2',
            'focus:outline-none focus:ring-2 focus:ring-primary',
            'placeholder:text-muted-foreground',
            'max-h-[150px] overflow-y-auto'
          )}
        />

        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim() && attachedFiles.length === 0}
          className="flex-shrink-0"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

