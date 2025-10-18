'use client'

import { Users, Activity, DollarSign, TrendingUp, UserPlus, FileText, Download, Settings } from 'lucide-react'
import { MetricCard } from '@/components/dashboard/MetricCard'
import { ChartCard } from '@/components/dashboard/ChartCard'
import { SimpleChart } from '@/components/dashboard/SimpleChart'
import { ActivityFeed, Activity as ActivityType } from '@/components/dashboard/ActivityFeed'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { ProgressBar } from '@/components/dashboard/ProgressBar'
import { Badge } from '@/components/dashboard/Badge'
import { DataTable, Column } from '@/components/dashboard/DataTable'
import { DashboardData } from '@/types'
import { formatCurrency, formatNumber } from '@/utils/formatters'

interface DashboardViewProps {
  data: DashboardData
}

interface UserData {
  id: string
  name: string
  email: string
  status: string
  role: string
}

export function DashboardView({ data }: DashboardViewProps) {
  const { stats, activities, chartData } = data

  // Sample data for DataTable
  const userData: UserData[] = [
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'active', role: 'User' },
    { id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'inactive', role: 'User' },
    { id: '4', name: 'Alice Brown', email: 'alice@example.com', status: 'active', role: 'Manager' },
  ]

  const columns: Column<UserData>[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (user) => (
        <Badge variant={user.status === 'active' ? 'success' : 'error'}>
          {user.status}
        </Badge>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (user) => <Badge variant="default">{user.role}</Badge>,
    },
  ]

  const formattedActivities: ActivityType[] = activities.map((activity) => ({
    id: activity.id,
    user: {
      name: activity.user,
      initials: activity.user
        .split(' ')
        .map((n) => n[0])
        .join(''),
    },
    action: activity.action,
    timestamp: activity.timestamp,
    type: activity.type,
  }))

  const quickActions = [
    {
      id: '1',
      label: 'Add User',
      icon: UserPlus,
      onClick: () => console.log('Add user'),
    },
    {
      id: '2',
      label: 'Generate Report',
      icon: FileText,
      onClick: () => console.log('Generate report'),
    },
    {
      id: '3',
      label: 'Export Data',
      icon: Download,
      onClick: () => console.log('Export data'),
    },
    {
      id: '4',
      label: 'Settings',
      icon: Settings,
      onClick: () => console.log('Settings'),
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Users"
          value={formatNumber(stats.totalUsers)}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          description="from last month"
        />
        <MetricCard
          title="Active Users"
          value={formatNumber(stats.activeUsers)}
          icon={Activity}
          trend={{ value: 8, isPositive: true }}
          description="from last month"
        />
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          trend={{ value: 15, isPositive: true }}
          description="from last month"
        />
        <MetricCard
          title="Growth Rate"
          value={`${stats.growthRate}%`}
          icon={TrendingUp}
          trend={{ value: 3, isPositive: false }}
          description="from last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard title="Monthly Activity" description="User activity for the past 6 months">
          <SimpleChart data={chartData} type="bar" height={250} />
        </ChartCard>
        <ChartCard title="Growth Trend" description="Revenue growth over time">
          <SimpleChart data={chartData} type="line" height={250} />
        </ChartCard>
      </div>

      {/* Middle Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <ChartCard title="Recent Users" description="Latest registered users">
            <DataTable
              data={userData}
              columns={columns}
              searchable
              searchPlaceholder="Search users..."
            />
          </ChartCard>
        </div>
        <div className="space-y-4">
          <QuickActions actions={quickActions} />
          <ChartCard title="Project Progress" description="Current sprint status">
            <div className="space-y-4">
              <ProgressBar label="Backend API" value={85} showValue variant="success" />
              <ProgressBar label="Frontend UI" value={60} showValue variant="default" />
              <ProgressBar label="Testing" value={40} showValue variant="warning" />
              <ProgressBar label="Documentation" value={25} showValue variant="error" />
            </div>
          </ChartCard>
        </div>
      </div>

      {/* Activity Feed */}
      <ActivityFeed activities={formattedActivities} />
    </div>
  )
}

