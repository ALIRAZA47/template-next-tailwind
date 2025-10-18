import { UsersView } from '@/components/views/UsersView'
import { User, UserRole, Status } from '@/types'

export default function UsersPage() {
  // Mock data - in a real app, this would be fetched server-side
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: UserRole.ADMIN,
      status: Status.ACTIVE,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: UserRole.USER,
      status: Status.ACTIVE,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane',
      createdAt: '2024-01-16T10:00:00Z',
      updatedAt: '2024-01-16T10:00:00Z',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      role: UserRole.USER,
      status: Status.INACTIVE,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      createdAt: '2024-01-17T10:00:00Z',
      updatedAt: '2024-01-17T10:00:00Z',
    },
  ]

  return <UsersView users={mockUsers} />
}

