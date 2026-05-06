'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'

type Environment = 'sandbox' | 'production'

interface SandboxContextValue {
  environment: Environment
  isSandbox: boolean
  isProduction: boolean
  setEnvironment: (env: Environment) => void
  toggle: () => void
}

const SandboxContext = createContext<SandboxContextValue>({
  environment: 'sandbox',
  isSandbox: true,
  isProduction: false,
  setEnvironment: () => {},
  toggle: () => {},
})

export function SandboxProvider({ children }: { children: React.ReactNode }) {
  const [environment, setEnvironmentState] = useState<Environment>('sandbox')

  const setEnvironment = useCallback((env: Environment) => {
    setEnvironmentState(env)
  }, [])

  const toggle = useCallback(() => {
    setEnvironmentState((prev) => (prev === 'sandbox' ? 'production' : 'sandbox'))
  }, [])

  return (
    <SandboxContext.Provider value={{
      environment,
      isSandbox: environment === 'sandbox',
      isProduction: environment === 'production',
      setEnvironment,
      toggle,
    }}>
      {children}
    </SandboxContext.Provider>
  )
}

export function useSandbox() {
  return useContext(SandboxContext)
}
