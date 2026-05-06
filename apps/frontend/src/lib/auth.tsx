'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { api, ApiError } from './api'
import type { Organization, LoginResponse, RegisterResponse } from '../types/api'

// ---------------------------------------------------------------------------
// Context type
// ---------------------------------------------------------------------------

interface AuthContextValue {
  user: Organization | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string, totpCode?: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<Organization | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Hydrate user from stored token on mount
  useEffect(() => {
    const stored = localStorage.getItem('accessToken')
    if (!stored) {
      setIsLoading(false)
      return
    }
    setToken(stored)

    api.get<Organization>('/v1/auth/me')
      .then((org) => {
        setUser(org)
      })
      .catch(() => {
        // Token expired or invalid — clear it
        localStorage.removeItem('accessToken')
        setToken(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const login = useCallback(
    async (email: string, password: string, totpCode?: string) => {
      const res = await api.post<LoginResponse>('/v1/auth/login', {
        email,
        password,
        ...(totpCode ? { totpCode } : {}),
      })

      if (res.requiresTotp) {
        throw new ApiError(200, 'TOTP required')
      }

      if (!res.token) {
        throw new ApiError(0, 'No token received')
      }

      localStorage.setItem('accessToken', res.token)
      setToken(res.token)

      const org = await api.get<Organization>('/v1/auth/me')
      setUser(org)
    },
    [],
  )

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      const res = await api.post<RegisterResponse>('/v1/auth/register', {
        email,
        password,
        name,
      })

      localStorage.setItem('accessToken', res.token)
      setToken(res.token)

      const org = await api.get<Organization>('/v1/auth/me')
      setUser(org)
    },
    [],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    setToken(null)
    setUser(null)
    router.push('/login')
  }, [router])

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
