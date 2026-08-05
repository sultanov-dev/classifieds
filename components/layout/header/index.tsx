import Link from 'next/link'

import { KeyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Container from '@/shared/container'

import AddButton from './add.button'
import CategoryMenu from './category.menu'
import LangDropMenu from './lang.dropMenu'
import ProfileMenu from './profile.menu'
import RegionSelect from './region.select'
import SearchInput from './searchInput'

export default function Header() {
  return (
    <header>
      <Container>
        <div className="mb-6 flex items-center justify-end gap-x-5 border-b py-4">
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
      <Container>
        <div className="mb-10 flex flex-wrap items-center gap-x-7 sm:flex-wrap lg:flex-nowrap">
          <CategoryMenu />
          <RegionSelect />
          <AddButton />
          <div className="order-3 mt-4 w-full md:order-2 md:w-auto md:min-w-0 md:flex-1 lg:mt-0 lg:max-w-135">
            <SearchInput />
          </div>
        </div>
      </Container>
    </header>
  )
}
