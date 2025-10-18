'use client'

import { useState, useEffect, useCallback } from 'react'
import { ProductService } from '@/services/api/product.service'
import { useLoaderStore } from '@/store/loaderStore'
import type { Product, ProductFilters } from '@/types/product.types'
import type { QueryParams, PaginatedResponse } from '@/types'

/**
 * Custom hook for managing products with API integration
 * Demonstrates typed React hooks with the product service
 */
export function useProducts(initialParams?: QueryParams & ProductFilters) {
  const [products, setProducts] = useState<Product[]>([])
  const [pagination, setPagination] = useState<
    PaginatedResponse<Product>['pagination'] | null
  >(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { startLoading, stopLoading } = useLoaderStore()

  const fetchProducts = useCallback(
    async (params?: QueryParams & ProductFilters, showGlobalLoader = false) => {
      try {
        setIsLoading(true)
        setError(null)
        if (showGlobalLoader) startLoading('Loading products...')

        const response = await ProductService.getAll(params || initialParams)
        setProducts(response.data)
        setPagination(response.pagination)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch products')
      } finally {
        setIsLoading(false)
        if (showGlobalLoader) stopLoading()
      }
    },
    [initialParams, startLoading, stopLoading]
  )

  const createProduct = useCallback(
    async (data: Parameters<typeof ProductService.create>[0]) => {
      try {
        startLoading('Creating product...')
        const newProduct = await ProductService.create(data)
        setProducts((prev) => [newProduct, ...prev])
        return newProduct
      } catch (err: any) {
        setError(err.message || 'Failed to create product')
        throw err
      } finally {
        stopLoading()
      }
    },
    [startLoading, stopLoading]
  )

  const updateProduct = useCallback(
    async (
      id: string,
      data: Parameters<typeof ProductService.update>[1]
    ) => {
      try {
        startLoading('Updating product...')
        const updatedProduct = await ProductService.update(id, data)
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? updatedProduct : p))
        )
        return updatedProduct
      } catch (err: any) {
        setError(err.message || 'Failed to update product')
        throw err
      } finally {
        stopLoading()
      }
    },
    [startLoading, stopLoading]
  )

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        startLoading('Deleting product...')
        await ProductService.delete(id)
        setProducts((prev) => prev.filter((p) => p.id !== id))
      } catch (err: any) {
        setError(err.message || 'Failed to delete product')
        throw err
      } finally {
        stopLoading()
      }
    },
    [startLoading, stopLoading]
  )

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return {
    products,
    pagination,
    error,
    isLoading,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  }
}

