'use client'

import { useState, useRef } from 'react'
import { 
  Users, 
  DollarSign, 
  Activity, 
  TrendingUp, 
  UserPlus, 
  FileText, 
  Download, 
  Settings,
  Package,
  Zap,
  Smile
} from 'lucide-react'
import {
  MetricCard,
  DataTable,
  Column,
  ChartCard,
  SimpleChart,
  ActivityFeed,
  Activity as ActivityType,
  QuickActions,
  ProgressBar,
  Badge
} from '@/components/dashboard'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmojiPicker } from '@/components/common/EmojiPicker'
import { Modal } from '@/components/common/Modal'

interface SampleUser {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive' | 'pending'
  role: string
  lastActive: string
}

export function ComponentsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [selectedEmoji, setSelectedEmoji] = useState('')
  const [showModal, setShowModal] = useState(false)
  const emojiButtonRef = useRef<HTMLButtonElement>(null)

  // Sample data
  const sampleUsers: SampleUser[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'active', role: 'Admin', lastActive: '2 min ago' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'active', role: 'User', lastActive: '1 hour ago' },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', status: 'inactive', role: 'User', lastActive: '2 days ago' },
    { id: '4', name: 'Diana Prince', email: 'diana@example.com', status: 'active', role: 'Manager', lastActive: '5 min ago' },
    { id: '5', name: 'Eve Wilson', email: 'eve@example.com', status: 'pending', role: 'User', lastActive: 'Never' },
  ]

  const columns: Column<SampleUser>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user) => (
        <Badge 
          variant={
            user.status === 'active' ? 'success' : 
            user.status === 'inactive' ? 'error' : 
            'warning'
          }
        >
          {user.status}
        </Badge>
      ),
    },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'lastActive', header: 'Last Active', sortable: false },
  ]

  const chartData = [
    { label: 'Mon', value: 400 },
    { label: 'Tue', value: 300 },
    { label: 'Wed', value: 600 },
    { label: 'Thu', value: 800 },
    { label: 'Fri', value: 500 },
    { label: 'Sat', value: 900 },
    { label: 'Sun', value: 700 },
  ]

  const activities: ActivityType[] = [
    {
      id: '1',
      user: { name: 'John Doe', initials: 'JD' },
      action: 'created a new project',
      target: 'Website Redesign',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      type: 'success',
    },
    {
      id: '2',
      user: { name: 'Jane Smith', initials: 'JS' },
      action: 'updated user settings',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'info',
    },
    {
      id: '3',
      user: { name: 'Mike Johnson', initials: 'MJ' },
      action: 'deleted a file',
      target: 'old-backup.zip',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      type: 'warning',
    },
    {
      id: '4',
      user: { name: 'Sarah Wilson', initials: 'SW' },
      action: 'reported an error',
      target: 'Payment Gateway',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      type: 'error',
    },
  ]

  const quickActions = [
    { id: '1', label: 'Add User', icon: UserPlus, onClick: () => console.log('Add User') },
    { id: '2', label: 'Generate Report', icon: FileText, onClick: () => console.log('Generate Report') },
    { id: '3', label: 'Export Data', icon: Download, onClick: () => console.log('Export Data') },
    { id: '4', label: 'Settings', icon: Settings, onClick: () => console.log('Settings') },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Component Showcase</h1>
        <p className="text-muted-foreground">
          Preview of all admin dashboard components
        </p>
      </div>

      {/* Metric Cards */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Metric Cards</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Display key metrics with trend indicators and icons
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$45,231"
            icon={DollarSign}
            trend={{ value: 12.5, isPositive: true }}
            description="from last month"
          />
          <MetricCard
            title="Active Users"
            value="2,543"
            icon={Users}
            trend={{ value: 8.2, isPositive: true }}
            description="from last month"
          />
          <MetricCard
            title="Conversions"
            value="45.2%"
            icon={Activity}
            trend={{ value: 3.1, isPositive: false }}
            description="from last month"
          />
          <MetricCard
            title="Growth Rate"
            value="23.5%"
            icon={TrendingUp}
            trend={{ value: 5.4, isPositive: true }}
            description="from last month"
          />
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Badges</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Status indicators with multiple variants and sizes
          </p>
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Variants</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Sizes</h3>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Progress Bars */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Progress Bars</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Visual progress indicators with multiple variants
          </p>
        </div>
        <Card className="p-6">
          <div className="space-y-4">
            <ProgressBar label="Default Progress" value={75} showValue variant="default" />
            <ProgressBar label="Success Progress" value={90} showValue variant="success" />
            <ProgressBar label="Warning Progress" value={60} showValue variant="warning" />
            <ProgressBar label="Error Progress" value={30} showValue variant="error" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Sizes</p>
              <ProgressBar value={70} size="sm" variant="success" />
              <ProgressBar value={70} size="md" variant="success" />
              <ProgressBar value={70} size="lg" variant="success" />
            </div>
          </div>
        </Card>
      </section>

      {/* Emoji Picker & Modal */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Emoji Picker & Modal</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Interactive emoji picker and modal dialog components
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Emoji Picker</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Button
                  ref={emojiButtonRef as any}
                  variant="outline"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="h-4 w-4 mr-2" />
                  {selectedEmoji || 'Select Emoji'}
                </Button>
                {selectedEmoji && (
                  <span className="text-sm text-muted-foreground">
                    Selected: {selectedEmoji}
                  </span>
                )}
              </div>
              {showEmojiPicker && (
                <EmojiPicker
                  onEmojiSelect={(emoji: any) => {
                    setSelectedEmoji(emoji.native)
                    setShowEmojiPicker(false)
                  }}
                  onClickOutside={() => setShowEmojiPicker(false)}
                  triggerRef={emojiButtonRef as any}
                />
              )}
              <p className="text-sm text-muted-foreground">
                Click the button to open the emoji picker. Smart positioning - it
                automatically finds the best available space!
              </p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Modal Dialog</h3>
            <div className="space-y-3">
              <Button onClick={() => setShowModal(true)}>
                Open Modal
              </Button>
              <p className="text-sm text-muted-foreground">
                Reusable modal component with backdrop, keyboard support (ESC),
                and customizable sizes.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Charts */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Charts</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Simple bar and line charts for data visualization
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <ChartCard title="Bar Chart" description="Weekly activity overview">
            <SimpleChart data={chartData} type="bar" height={250} />
          </ChartCard>
          <ChartCard title="Line Chart" description="Trend over time">
            <SimpleChart data={chartData} type="line" height={250} />
          </ChartCard>
        </div>
      </section>

      {/* Data Table */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Data Table</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Sortable and searchable table with custom cell rendering
          </p>
        </div>
        <ChartCard title="User Management" description="Search, sort, and filter users">
          <DataTable
            data={sampleUsers}
            columns={columns}
            searchable
            searchPlaceholder="Search users by name, email, or role..."
          />
        </ChartCard>
      </section>

      {/* Activity Feed & Quick Actions */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Activity & Actions</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Activity feed and quick action buttons
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <ActivityFeed activities={activities} title="Recent Activity" />
          </div>
          <QuickActions actions={quickActions} title="Quick Actions" />
        </div>
      </section>

      {/* Component Combinations */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Complex Layouts</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Example of combining multiple components
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Total Orders</h3>
                <p className="text-2xl font-bold">1,234</p>
              </div>
            </div>
            <ProgressBar value={68} showValue variant="default" />
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Target: 1,800</span>
              <Badge variant="info">68%</Badge>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-green-500/10 p-3">
                <Zap className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="font-semibold">Performance</h3>
                <p className="text-2xl font-bold">98.5%</p>
              </div>
            </div>
            <ProgressBar value={98.5} showValue variant="success" />
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Uptime</span>
              <Badge variant="success">Excellent</Badge>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-yellow-500/10 p-3">
                <Activity className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="font-semibold">API Calls</h3>
                <p className="text-2xl font-bold">456K</p>
              </div>
            </div>
            <ProgressBar value={45} showValue variant="warning" />
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Limit: 1M</span>
              <Badge variant="warning">45%</Badge>
            </div>
          </Card>
        </div>
      </section>

      {/* Usage Tips */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Usage Tips</h2>
        </div>
        <Card className="p-6">
          <div className="space-y-3 text-sm">
            <p>
              <strong>Import components:</strong> All components are exported from{' '}
              <code className="rounded bg-muted px-1 py-0.5">@/components/dashboard</code>
            </p>
            <p>
              <strong>TypeScript:</strong> All components are fully typed with proper interfaces
            </p>
            <p>
              <strong>Customization:</strong> Use the <code className="rounded bg-muted px-1 py-0.5">className</code>{' '}
              prop to customize styling
            </p>
            <p>
              <strong>Responsive:</strong> All components are mobile-first and fully responsive
            </p>
          </div>
        </Card>
      </section>

      {/* Sample Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Example Modal"
        size="md"
      >
        <div className="space-y-4">
          <p>This is an example modal component. It can be used for:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Adding users to a chat</li>
            <li>Confirming actions</li>
            <li>Displaying forms</li>
            <li>Showing additional information</li>
          </ul>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowModal(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

