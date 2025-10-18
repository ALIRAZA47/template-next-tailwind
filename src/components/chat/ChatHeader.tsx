'use client'

import { Phone, Video, MoreVertical, Users as UsersIcon } from 'lucide-react'
import { Conversation } from '@/types/chat.types'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/dashboard/Badge'

interface ChatHeaderProps {
  conversation: Conversation
  onShowInfo: () => void
}

export function ChatHeader({ conversation, onShowInfo }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          {conversation.avatar ? (
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
              {conversation.name.charAt(0)}
            </div>
          )}
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{conversation.name}</h3>
            {conversation.type === 'group' && (
              <Badge variant="default" size="sm">
                <UsersIcon className="h-3 w-3 mr-1" />
                {conversation.participants.length}
              </Badge>
            )}
          </div>
          {conversation.type === 'direct' && (
            <p className="text-sm text-muted-foreground">
              {conversation.online ? 'Online' : 'Offline'}
            </p>
          )}
          {conversation.type === 'group' && (
            <p className="text-sm text-muted-foreground">
              {conversation.participants.length} members
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onShowInfo}>
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

