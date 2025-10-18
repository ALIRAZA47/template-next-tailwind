import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { API_BASE_URL, API_TIMEOUT, API_HEADERS } from '@/constants/api.const'
import { LOCAL_STORAGE_KEYS } from '@/constants/app.const'
import type { ApiResponse, ApiError } from '@/types'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: API_HEADERS,
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error: AxiosError<ApiError>) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - redirect to login
          localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN)
          localStorage.removeItem(LOCAL_STORAGE_KEYS.USER)
          window.location.href = '/login'
        }

        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          status: error.response?.status || 500,
          errors: error.response?.data?.errors,
        }

        return Promise.reject(apiError)
      }
    )
  }

  async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return this.client.get(url, { params })
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.client.post(url, data)
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.client.put(url, data)
  }

  async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.client.patch(url, data)
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.client.delete(url)
  }
}

export const apiClient = new ApiClient()

