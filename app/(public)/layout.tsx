import type { ReactNode } from 'react'

import Header from '@/components/layout/header'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <main>{children}</main>
    </div>
  )
}
