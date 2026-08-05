import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function AddButton() {
  return (
    <Button className="cursor-pointer bg-[#1D828E] hover:bg-[#1b93a0]">
      <PlusIcon className="size-5" />
      <span className="hidden text-base font-normal capitalize md:block">Qoshish</span>
    </Button>
  )
}
