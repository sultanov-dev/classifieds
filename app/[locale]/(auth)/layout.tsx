import type { ReactNode } from 'react'

import Container from '@/shared/container'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-dvh items-center">
      <Container>{children}</Container>
    </main>
  )
}
