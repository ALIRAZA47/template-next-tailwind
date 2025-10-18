export interface DashboardStats {
  totalUsers: number
  activeUsers: number
  totalRevenue: number
  growthRate: number
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  timestamp: string
  type: 'info' | 'success' | 'warning' | 'error'
}

export interface ChartData {
  label: string
  value: number
  date?: string
}

export interface DashboardData {
  stats: DashboardStats
  activities: ActivityItem[]
  chartData: ChartData[]
}

