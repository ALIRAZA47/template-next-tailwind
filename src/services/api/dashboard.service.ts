import { apiClient } from './client'
import { API_ENDPOINTS } from '@/constants/api.const'
import type { DashboardData } from '@/types'

export class DashboardService {
  static async getDashboardData(): Promise<DashboardData> {
    const response = await apiClient.get<DashboardData>(API_ENDPOINTS.DASHBOARD)
    return response.data
  }

  static async getAnalytics(dateRange?: { start: string; end: string }): Promise<any> {
    const response = await apiClient.get(API_ENDPOINTS.ANALYTICS, dateRange)
    return response.data
  }
}

