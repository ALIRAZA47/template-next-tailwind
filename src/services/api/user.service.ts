import { apiClient } from './client'
import { API_ENDPOINTS } from '@/constants/api.const'
import type { User, CreateUserDto, UpdateUserDto, PaginatedResponse, QueryParams } from '@/types'

export class UserService {
  static async getUsers(params?: QueryParams): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<PaginatedResponse<User>>(
      API_ENDPOINTS.USERS,
      params
    )
    return response.data
  }

  static async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<User>(`${API_ENDPOINTS.USERS}/${id}`)
    return response.data
  }

  static async createUser(data: CreateUserDto): Promise<User> {
    const response = await apiClient.post<User>(API_ENDPOINTS.USERS, data)
    return response.data
  }

  static async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    const response = await apiClient.patch<User>(
      `${API_ENDPOINTS.USERS}/${id}`,
      data
    )
    return response.data
  }

  static async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.USERS}/${id}`)
  }
}

