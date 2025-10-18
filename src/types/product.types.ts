import { BaseEntity, Status } from './common.types'

export interface Product extends BaseEntity {
  name: string
  description: string
  price: number
  category: string
  stock: number
  imageUrl?: string
  status: Status
  sku: string
}

export interface CreateProductDto {
  name: string
  description: string
  price: number
  category: string
  stock: number
  imageUrl?: string
  sku: string
}

export interface UpdateProductDto {
  name?: string
  description?: string
  price?: number
  category?: string
  stock?: number
  imageUrl?: string
  status?: Status
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  status?: Status
  inStock?: boolean
}

export interface ProductStats {
  totalProducts: number
  totalValue: number
  outOfStock: number
  lowStock: number
  categories: {
    name: string
    count: number
  }[]
}

