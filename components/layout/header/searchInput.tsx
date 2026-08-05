'use client'

import { useState } from 'react'

import { XIcon } from 'lucide-react'

import { Input } from '@/components/ui/input'

export default function SearchInput() {
  const [search, setSeaerch] = useState('')

  return (
    <div className="relative w-full">
      <Input
        value={search}
        onChange={(e) => setSeaerch(e.target.value)}
        type="text"
        placeholder="Elon qidirish"
        className="w-full focus-visible:right-0 focus-visible:outline-none"
      />
      {search && (
        <XIcon
          onClick={() => setSeaerch('')}
          className="absolute top-1/2 right-2 size-5 -translate-y-1/2 cursor-pointer text-gray-500 transition hover:text-black"
        />
      )}

      {search && (
        <div
          className={
            'animate-in fade-in-0 zoom-in-95 absolute z-10 mt-2 w-full rounded-2xl bg-white p-6 text-base font-normal text-black shadow duration-400'
          }
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quidem cupiditate sit qui
          tenetur natus, atque unde ipsam in deleniti magnam sunt impedit eius voluptate obcaecati
          minus a modi culpa!
        </div>
      )}
    </div>
  )
}
