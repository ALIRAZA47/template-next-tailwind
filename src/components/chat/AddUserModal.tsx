'use client'

import { useState } from 'react'
import { Search, UserPlus, Check } from 'lucide-react'
import { Modal } from '@/components/common/Modal'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { User } from '@/types/chat.types'
import { cn } from '@/utils/cn'

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
  onAddUsers: (userIds: string[]) => void
  availableUsers: User[]
  existingUserIds?: string[]
}

export function AddUserModal({
  isOpen,
  onClose,
  onAddUsers,
  availableUsers,
  existingUserIds = [],
}: AddUserModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const filteredUsers = availableUsers.filter(
    (user) =>
      !existingUserIds.includes(user.id) &&
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    )
  }

  const handleAdd = () => {
    onAddUsers(selectedUsers)
    setSelectedUsers([])
    setSearchQuery('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Users" size="md">
      <div className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users..."
            className="pl-9"
          />
        </div>

        {/* User List */}
        <div className="max-h-[300px] overflow-y-auto space-y-1">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No users found
            </p>
          ) : (
            filteredUsers.map((user) => {
              const isSelected = selectedUsers.includes(user.id)
              return (
                <button
                  key={user.id}
                  onClick={() => toggleUser(user.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-lg transition-colors',
                    isSelected
                      ? 'bg-primary/10 border border-primary'
                      : 'hover:bg-muted border border-transparent'
                  )}
                >
                  <Avatar className="h-10 w-10">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="font-medium">{user.name}</p>
                    {user.online && (
                      <p className="text-sm text-green-500">Online</p>
                    )}
                  </div>
                  {isSelected && (
                    <Check className="h-5 w-5 text-primary" />
                  )}
                </button>
              )
            })
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              disabled={selectedUsers.length === 0}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Users
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

