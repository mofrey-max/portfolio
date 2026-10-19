'use client'

import { ThemeProvider } from './ThemeProvider'
import { ToastProvider } from './Toast'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  )
}