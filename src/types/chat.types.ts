export interface User {
  id: string
  name: string
  avatar?: string
  online?: boolean
}

export interface Reaction {
  emoji: string
  users: string[] // user IDs
  count: number
}

export interface Message {
  id: string
  content: string
  senderId: string
  sender: User
  timestamp: Date
  reactions?: Reaction[]
  attachments?: FileAttachment[]
  isPinned?: boolean
  replyTo?: {
    id: string
    content: string
    sender: User
  }
}

export interface FileAttachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

export interface Conversation {
  id: string
  type: 'direct' | 'group'
  name: string
  avatar?: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  pinnedMessage?: Message
  online?: boolean // for direct chats
}

export interface ChatState {
  conversations: Conversation[]
  activeConversation: Conversation | null
  messages: Record<string, Message[]> // conversationId -> messages
}

