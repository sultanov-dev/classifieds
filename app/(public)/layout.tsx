import type { ReactNode } from 'react'

import Header from '@/components/layout/header'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col items-center">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  )
}
