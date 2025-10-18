import { DashboardView } from '@/components/views/DashboardView'

// This would be a Server Component that fetches data
// For demo, we're using mock data
export default function DashboardPage() {
  const mockData = {
    stats: {
      totalUsers: 2543,
      activeUsers: 1893,
      totalRevenue: 45231,
      growthRate: 12.5,
    },
    activities: [
      {
        id: '1',
        user: 'John Doe',
        action: 'Created a new project',
        timestamp: new Date().toISOString(),
        type: 'info' as const,
      },
      {
        id: '2',
        user: 'Jane Smith',
        action: 'Updated user settings',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        type: 'success' as const,
      },
      {
        id: '3',
        user: 'Bob Johnson',
        action: 'Deleted a file',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        type: 'warning' as const,
      },
    ],
    chartData: [
      { label: 'Jan', value: 400 },
      { label: 'Feb', value: 300 },
      { label: 'Mar', value: 600 },
      { label: 'Apr', value: 800 },
      { label: 'May', value: 500 },
      { label: 'Jun', value: 900 },
    ],
  }

  return <DashboardView data={mockData} />
}

