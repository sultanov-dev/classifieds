import Link from 'next/link'

import { KeyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Container from '@/shared/container'

import LangDropMenu from './lang.dropMenu'
import ProfileMenu from './profile.menu'

export default function Header() {
  return (
    <header>
      <Container>
        <div className="mb-6 flex items-center justify-end gap-x-5 pt-4">
          <LangDropMenu />
          <Button variant={'ghost'} className="text-base font-normal capitalize">
            <Link href={'/register'} className="flex items-center gap-x-1">
              <KeyIcon className="h-4 w-4" />
              register
            </Link>
          </Button>
          {/* user loading */}
          <ProfileMenu />
        </div>
      </Container>
      {/* bottom header */}
    </header>
  )
}
