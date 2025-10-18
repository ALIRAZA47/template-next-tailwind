'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare } from 'lucide-react'
import { ChatList } from '@/components/chat/ChatList'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { ChatMessage } from '@/components/chat/ChatMessage'
import { ChatInput } from '@/components/chat/ChatInput'
import { PinnedMessage } from '@/components/chat/PinnedMessage'
import { AddUserModal } from '@/components/chat/AddUserModal'
import { Conversation, Message, User, Reaction } from '@/types/chat.types'

// Mock data
const CURRENT_USER_ID = 'user-1'

const mockUsers: User[] = [
  { id: 'user-1', name: 'You', avatar: undefined, online: true },
  { id: 'user-2', name: 'Alice Johnson', online: true },
  { id: 'user-3', name: 'Bob Smith', online: false },
  { id: 'user-4', name: 'Carol Williams', online: true },
  { id: 'user-5', name: 'David Brown', online: false },
  { id: 'user-6', name: 'Eve Davis', online: true },
]

const generateMockMessages = (conversationId: string): Message[] => {
  const baseMessages: Message[] = [
    {
      id: 'msg-1',
      content: 'Hey! How are you doing?',
      senderId: 'user-2',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      reactions: [{ emoji: '👍', users: ['user-1'], count: 1 }],
    },
    {
      id: 'msg-2',
      content: "I'm doing great! Just finished working on the new chat feature. 🎉",
      senderId: CURRENT_USER_ID,
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      reactions: [
        { emoji: '🎉', users: ['user-2', 'user-3'], count: 2 },
        { emoji: '❤️', users: ['user-2'], count: 1 },
      ],
    },
    {
      id: 'msg-3',
      content: 'That sounds amazing! Can you show me?',
      senderId: 'user-2',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: 'msg-4',
      content: 'Sure! Here are the design files.',
      senderId: CURRENT_USER_ID,
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      attachments: [
        {
          id: 'file-1',
          name: 'chat-design.pdf',
          type: 'application/pdf',
          size: 1024 * 500,
          url: '#',
        },
        {
          id: 'file-2',
          name: 'mockups.sketch',
          type: 'application/sketch',
          size: 1024 * 1024 * 2.5,
          url: '#',
        },
      ],
    },
    {
      id: 'msg-5',
      content: 'Thanks! I\'ll review them and get back to you.',
      senderId: 'user-2',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isPinned: conversationId === 'conv-1',
    },
    {
      id: 'msg-6',
      content: 'Perfect! Let me know if you have any questions.',
      senderId: CURRENT_USER_ID,
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ]

  return baseMessages
}

const mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    type: 'direct',
    name: 'Alice Johnson',
    participants: [mockUsers[0], mockUsers[1]],
    unreadCount: 2,
    online: true,
    lastMessage: {
      id: 'msg-last',
      content: "Thanks! I'll review them and get back to you.",
      senderId: 'user-2',
      sender: mockUsers[1],
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
  },
  {
    id: 'conv-2',
    type: 'group',
    name: 'Project Team',
    participants: [mockUsers[0], mockUsers[1], mockUsers[2], mockUsers[3]],
    unreadCount: 0,
    lastMessage: {
      id: 'msg-g1',
      content: 'Meeting at 3 PM today',
      senderId: 'user-3',
      sender: mockUsers[2],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
  },
  {
    id: 'conv-3',
    type: 'direct',
    name: 'Bob Smith',
    participants: [mockUsers[0], mockUsers[2]],
    unreadCount: 0,
    online: false,
    lastMessage: {
      id: 'msg-b1',
      content: 'See you tomorrow!',
      senderId: CURRENT_USER_ID,
      sender: mockUsers[0],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  },
  {
    id: 'conv-4',
    type: 'group',
    name: 'Design Team',
    participants: [mockUsers[0], mockUsers[3], mockUsers[5]],
    unreadCount: 5,
    lastMessage: {
      id: 'msg-d1',
      content: 'New designs are ready for review',
      senderId: 'user-4',
      sender: mockUsers[3],
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
    },
  },
  {
    id: 'conv-5',
    type: 'direct',
    name: 'Carol Williams',
    participants: [mockUsers[0], mockUsers[3]],
    unreadCount: 0,
    online: true,
    lastMessage: {
      id: 'msg-c1',
      content: 'Got it, thanks!',
      senderId: 'user-4',
      sender: mockUsers[3],
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
  },
]

export function ChatView() {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Record<string, Message[]>>({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages when conversation changes
  useEffect(() => {
    if (activeConversation && !messages[activeConversation.id]) {
      setMessages((prev) => ({
        ...prev,
        [activeConversation.id]: generateMockMessages(activeConversation.id),
      }))
    }
  }, [activeConversation])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, activeConversation])

  const handleSendMessage = (content: string, files?: File[]) => {
    if (!activeConversation) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      senderId: CURRENT_USER_ID,
      sender: mockUsers[0],
      timestamp: new Date(),
      attachments: files?.map((file, index) => ({
        id: `file-${Date.now()}-${index}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      })),
      replyTo: replyingTo ? {
        id: replyingTo.id,
        content: replyingTo.content,
        sender: replyingTo.sender,
      } : undefined,
    }

    setMessages((prev) => ({
      ...prev,
      [activeConversation.id]: [...(prev[activeConversation.id] || []), newMessage],
    }))

    // Clear reply state after sending
    setReplyingTo(null)
  }

  const handleReply = (message: Message) => {
    setReplyingTo(message)
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
  }

  const handleAddReaction = (messageId: string, emoji: string) => {
    if (!activeConversation) return

    setMessages((prev) => {
      const conversationMessages = prev[activeConversation.id] || []
      return {
        ...prev,
        [activeConversation.id]: conversationMessages.map((msg) => {
          if (msg.id !== messageId) return msg

          const reactions = msg.reactions || []
          const existingReaction = reactions.find((r) => r.emoji === emoji)

          if (existingReaction) {
            // Toggle reaction
            const hasReacted = existingReaction.users.includes(CURRENT_USER_ID)
            return {
              ...msg,
              reactions: reactions.map((r) =>
                r.emoji === emoji
                  ? {
                      ...r,
                      users: hasReacted
                        ? r.users.filter((id) => id !== CURRENT_USER_ID)
                        : [...r.users, CURRENT_USER_ID],
                      count: hasReacted ? r.count - 1 : r.count + 1,
                    }
                  : r
              ).filter((r) => r.count > 0),
            }
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [
                ...reactions,
                { emoji, users: [CURRENT_USER_ID], count: 1 },
              ],
            }
          }
        }),
      }
    })
  }

  const handlePinMessage = (messageId: string) => {
    if (!activeConversation) return

    setMessages((prev) => {
      const conversationMessages = prev[activeConversation.id] || []
      return {
        ...prev,
        [activeConversation.id]: conversationMessages.map((msg) => ({
          ...msg,
          isPinned: msg.id === messageId ? !msg.isPinned : false,
        })),
      }
    })
  }

  const handleUnpinMessage = () => {
    if (!activeConversation) return

    setMessages((prev) => {
      const conversationMessages = prev[activeConversation.id] || []
      return {
        ...prev,
        [activeConversation.id]: conversationMessages.map((msg) => ({
          ...msg,
          isPinned: false,
        })),
      }
    })
  }

  const handleAddUsers = (userIds: string[]) => {
    console.log('Adding users:', userIds)
    // In a real app, you would make an API call here
  }

  const currentMessages = activeConversation ? messages[activeConversation.id] || [] : []
  const pinnedMessage = currentMessages.find((msg) => msg.isPinned)

  return (
    <div className="flex h-full max-h-screen overflow-hidden animate-in fade-in duration-500">
      {/* Chat List */}
      <div className="w-80 flex-shrink-0 flex flex-col border-r bg-card">
        <ChatList
          conversations={conversations}
          activeConversationId={activeConversation?.id}
          onSelectConversation={setActiveConversation}
          onNewChat={() => setShowAddUserModal(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {activeConversation ? (
          <>
            <ChatHeader
              conversation={activeConversation}
              onShowInfo={() => {
                if (activeConversation.type === 'group') {
                  setShowAddUserModal(true)
                }
              }}
            />

            {pinnedMessage && (
              <PinnedMessage
                message={pinnedMessage}
                onUnpin={handleUnpinMessage}
                onNavigate={() => {
                  // Scroll to pinned message
                  console.log('Navigate to pinned message')
                }}
              />
            )}

            <div className="flex-1 overflow-y-auto bg-muted/20 min-h-0">
              <div className="py-4 space-y-1">
                {currentMessages.map((message, index) => {
                  const prevMessage = index > 0 ? currentMessages[index - 1] : null
                  const showSender =
                    !prevMessage || prevMessage.senderId !== message.senderId

                  return (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      isOwnMessage={message.senderId === CURRENT_USER_ID}
                      currentUserId={CURRENT_USER_ID}
                      onAddReaction={handleAddReaction}
                      onPin={handlePinMessage}
                      onReply={handleReply}
                      showSender={showSender}
                    />
                  )
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <ChatInput 
              onSendMessage={handleSendMessage}
              replyTo={replyingTo}
              onCancelReply={handleCancelReply}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-background">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">Select a conversation</h3>
              <p className="text-muted-foreground">
                Choose a conversation from the list to start chatting
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        onAddUsers={handleAddUsers}
        availableUsers={mockUsers.filter((u) => u.id !== CURRENT_USER_ID)}
        existingUserIds={activeConversation?.participants.map((p) => p.id) || []}
      />
    </div>
  )
}

