'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useTheme } from '@/hooks/useTheme'
import { ThemeMode } from '@/types'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: any) => void
  onClickOutside?: () => void
  triggerRef?: React.RefObject<HTMLElement>
}

export function EmojiPicker({ onEmojiSelect, onClickOutside, triggerRef }: EmojiPickerProps) {
  const { theme } = useTheme()
  const pickerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [placement, setPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('top')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClickOutside?.()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClickOutside])

  useEffect(() => {
    if (!triggerRef?.current) return

    const calculatePosition = () => {
      const trigger = triggerRef.current
      if (!trigger) return

      const triggerRect = trigger.getBoundingClientRect()
      const pickerWidth = 352 // emoji-mart default width
      const pickerHeight = 435 // emoji-mart default height
      const gap = 8

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Check available space in all directions
      const spaceAbove = triggerRect.top
      const spaceBelow = viewportHeight - triggerRect.bottom
      const spaceLeft = triggerRect.left
      const spaceRight = viewportWidth - triggerRect.right

      let top = 0
      let left = 0
      let finalPlacement: 'top' | 'bottom' | 'left' | 'right' = 'top'

      // Prefer top or bottom placement
      if (spaceAbove >= pickerHeight + gap) {
        // Show above
        top = triggerRect.top - pickerHeight - gap
        left = triggerRect.left + triggerRect.width / 2 - pickerWidth / 2
        finalPlacement = 'top'
      } else if (spaceBelow >= pickerHeight + gap) {
        // Show below
        top = triggerRect.bottom + gap
        left = triggerRect.left + triggerRect.width / 2 - pickerWidth / 2
        finalPlacement = 'bottom'
      } else if (spaceRight >= pickerWidth + gap) {
        // Show on right
        top = triggerRect.top + triggerRect.height / 2 - pickerHeight / 2
        left = triggerRect.right + gap
        finalPlacement = 'right'
      } else if (spaceLeft >= pickerWidth + gap) {
        // Show on left
        top = triggerRect.top + triggerRect.height / 2 - pickerHeight / 2
        left = triggerRect.left - pickerWidth - gap
        finalPlacement = 'left'
      } else {
        // Fallback: center in viewport
        top = (viewportHeight - pickerHeight) / 2
        left = (viewportWidth - pickerWidth) / 2
        finalPlacement = 'top'
      }

      // Ensure picker stays within viewport bounds
      if (left + pickerWidth > viewportWidth) {
        left = viewportWidth - pickerWidth - gap
      }
      if (left < gap) {
        left = gap
      }
      if (top + pickerHeight > viewportHeight) {
        top = viewportHeight - pickerHeight - gap
      }
      if (top < gap) {
        top = gap
      }

      setPosition({ top, left })
      setPlacement(finalPlacement)
    }

    calculatePosition()
    window.addEventListener('resize', calculatePosition)
    window.addEventListener('scroll', calculatePosition, true)

    return () => {
      window.removeEventListener('resize', calculatePosition)
      window.removeEventListener('scroll', calculatePosition, true)
    }
  }, [triggerRef])

  const pickerElement = (
    <div
      ref={pickerRef}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
      className="emoji-picker-wrapper animate-in fade-in zoom-in-95 duration-200"
    >
      <Picker
        data={data}
        onEmojiSelect={onEmojiSelect}
        theme={theme === ThemeMode.DARK ? 'dark' : 'light'}
        previewPosition="none"
        skinTonePosition="search"
      />
    </div>
  )

  return createPortal(pickerElement, document.body)
}

