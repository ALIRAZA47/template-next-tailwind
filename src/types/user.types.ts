import { BaseEntity, UserRole, Status } from './common.types'

export interface User extends BaseEntity {
  email: string
  name: string
  role: UserRole
  status: Status
  avatar?: string
  bio?: string
}

export interface CreateUserDto {
  email: string
  name: string
  password: string
  role?: UserRole
}

export interface UpdateUserDto {
  name?: string
  email?: string
  bio?: string
  avatar?: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

