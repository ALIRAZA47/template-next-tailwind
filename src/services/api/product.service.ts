import { apiClient } from './client'
import { API_ENDPOINTS } from '@/constants/api.const'
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductFilters,
  ProductStats,
} from '@/types/product.types'
import type { ApiResponse, PaginatedResponse, QueryParams } from '@/types'

/**
 * Product Service
 * Handles all product-related API calls with full TypeScript typing
 */
export class ProductService {
  /**
   * Get all products with optional pagination and filters
   * @param params - Query parameters including pagination and filters
   * @returns Paginated list of products
   */
  static async getAll(
    params?: QueryParams & ProductFilters
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      API_ENDPOINTS.PRODUCTS,
      params
    )
    return response.data
  }

  /**
   * Get a single product by ID
   * @param id - Product ID
   * @returns Product details
   */
  static async getById(id: string): Promise<Product> {
    const response = await apiClient.get<Product>(
      `${API_ENDPOINTS.PRODUCTS}/${id}`
    )
    return response.data
  }

  /**
   * Create a new product
   * @param data - Product creation data
   * @returns Created product
   */
  static async create(data: CreateProductDto): Promise<Product> {
    const response = await apiClient.post<Product>(
      API_ENDPOINTS.PRODUCTS,
      data
    )
    return response.data
  }

  /**
   * Update an existing product
   * @param id - Product ID
   * @param data - Product update data
   * @returns Updated product
   */
  static async update(id: string, data: UpdateProductDto): Promise<Product> {
    const response = await apiClient.patch<Product>(
      `${API_ENDPOINTS.PRODUCTS}/${id}`,
      data
    )
    return response.data
  }

  /**
   * Delete a product
   * @param id - Product ID
   * @returns Success response
   */
  static async delete(id: string): Promise<void> {
    await apiClient.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`)
  }

  /**
   * Get product statistics
   * @returns Product statistics and analytics
   */
  static async getStats(): Promise<ProductStats> {
    const response = await apiClient.get<ProductStats>(
      `${API_ENDPOINTS.PRODUCTS}/stats`
    )
    return response.data
  }

  /**
   * Search products by name or description
   * @param query - Search query string
   * @param params - Additional query parameters
   * @returns Paginated search results
   */
  static async search(
    query: string,
    params?: QueryParams
  ): Promise<PaginatedResponse<Product>> {
    const response = await apiClient.get<PaginatedResponse<Product>>(
      `${API_ENDPOINTS.PRODUCTS}/search`,
      { ...params, q: query }
    )
    return response.data
  }

  /**
   * Bulk update products
   * @param updates - Array of product IDs and their updates
   * @returns Array of updated products
   */
  static async bulkUpdate(
    updates: { id: string; data: UpdateProductDto }[]
  ): Promise<Product[]> {
    const response = await apiClient.post<Product[]>(
      `${API_ENDPOINTS.PRODUCTS}/bulk-update`,
      { updates }
    )
    return response.data
  }

  /**
   * Bulk delete products
   * @param ids - Array of product IDs to delete
   * @returns Success response
   */
  static async bulkDelete(ids: string[]): Promise<void> {
    await apiClient.post(`${API_ENDPOINTS.PRODUCTS}/bulk-delete`, { ids })
  }
}

